<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface SolutionRequest {
    id: number;
    solutionName: string;
    company: string;
    contact: string;
    phone: string;
    demand: string;
    status: string;
    createdAt: string;
}

const requests = ref<SolutionRequest[]>([])
const loading = ref(true)

const fetchRequests = async () => {
    loading.value = true
    try {
        const res = await fetch('/api/solution-requests')
        if (res.ok) {
            requests.value = await res.json()
        }
    } catch (e) {
        console.error('Failed to fetch requests', e)
    } finally {
        loading.value = false
    }
}

const updateStatus = async (item: SolutionRequest) => {
    const newStatus = item.status === '待处理' ? '已联系' : '待处理'
    try {
        const res = await fetch(`/api/solution-requests/${item.id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        })
        if (res.ok) {
            item.status = newStatus
            alert('状态已更新')
        } else {
            alert('状态更新失败')
        }
    } catch (e) {
        console.error('Error updating status', e)
    }
}

const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return d.toLocaleString('zh-CN', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
}

onMounted(fetchRequests)
</script>

<template>
  <div class="admin-page">
    <div class="admin-header">
      <h2>解决方案咨询需求</h2>
      <p>管理并跟进来自各大解决方案详情页的用户咨询留言</p>
    </div>

    <div class="admin-content card-box">
      <div v-if="loading" class="loading-state">
        <i class="fas fa-spinner fa-spin"></i> 加载中...
      </div>
      
      <div v-else-if="requests.length === 0" class="empty-state">
        <i class="fas fa-inbox"></i>
        <p>暂无用户提交需求方案记录</p>
      </div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>意向方案</th>
            <th>企业/机构名称</th>
            <th>联系人</th>
            <th>联系电话</th>
            <th>核心诉求</th>
            <th>提交时间</th>
            <th>状态</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="req in requests" :key="req.id">
            <td>{{ req.id }}</td>
            <td><span class="solution-badge">{{ req.solutionName }}</span></td>
            <td>{{ req.company || '-' }}</td>
            <td>{{ req.contact }}</td>
            <td>{{ req.phone }}</td>
            <td class="demand-cell">{{ req.demand || '-' }}</td>
            <td>{{ formatDate(req.createdAt) }}</td>
            <td>
              <span :class="['status-badge', req.status === '待处理' ? 'pending' : 'contacted']">
                {{ req.status }}
              </span>
            </td>
            <td>
              <button class="btn-action" @click="updateStatus(req)">
                标记为{{ req.status === '待处理' ? '已联系' : '待处理' }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.admin-page {
  padding: 24px;
}

.admin-header {
  margin-bottom: 24px;
}

.admin-header h2 {
  font-size: 1.5rem;
  color: #1e293b;
  margin-bottom: 8px;
  font-weight: 700;
}

.admin-header p {
  color: #64748b;
  font-size: 0.95rem;
}

.card-box {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th, .data-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
}

.data-table th {
  background: #f8fafc;
  font-weight: 600;
  color: #475569;
}

.solution-badge {
    background: #eff6ff;
    color: #3b82f6;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 600;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

.status-badge.pending {
  background: #fef2f2;
  color: #ef4444;
}

.status-badge.contacted {
  background: #f0fdf4;
  color: #22c55e;
}

.demand-cell {
    max-width: 250px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.btn-action {
  background: #f8fafc;
  border: 1px solid #cbd5e1;
  padding: 6px 12px;
  border-radius: 4px;
  color: #475569;
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-action:hover {
  background: #f1f5f9;
  color: #0f172a;
  border-color: #94a3b8;
}

.loading-state, .empty-state {
  text-align: center;
  padding: 60px 0;
  color: #94a3b8;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #cbd5e1;
}
</style>
