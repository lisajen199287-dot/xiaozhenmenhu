<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface Event {
    id: number;
    title: string;
    category: string;
    registrations: number;
    status: string;
    description: string;
    tag?: string;
    location?: string;
    deadline?: string;
}

const router = useRouter()
const events = ref<Event[]>([])

const fetchEvents = async () => {
    try {
        const res = await fetch('/api/events')
        if (res.ok) {
            events.value = await res.json()
        }
    } catch (e) {
        console.error(e)
    }
}

onMounted(fetchEvents)

const goToCreate = () => {
    router.push('/admin/events/create')
}

const goToEdit = (id: number) => {
    router.push(`/admin/events/edit/${id}`)
}

const deleteEvent = async (id: number) => {
    if (confirm('确定要删除这个活动吗？')) {
        try {
            const res = await fetch(`/api/events/${id}`, { method: 'DELETE' })
            if (res.ok) {
                events.value = events.value.filter(e => e.id !== id)
            }
        } catch (e) {
            console.error(e)
            alert('删除失败')
        }
    }
}

const previewEvent = (id: number) => {
    window.open(`/events/${id}`, '_blank')
}
</script>

<template>
  <div class="events-admin">
    <div class="admin-toolbar">
      <div class="toolbar-left">
          <h2>平台活动管理</h2>
          <p class="sub-text">发布各行业激励政策、智库沙龙及培训课</p>
      </div>
      <button class="btn-primary-admin" @click="goToCreate">
          <i class="fas fa-plus"></i> 发布新活动
      </button>
    </div>

    <div class="admin-table-container">
      <table class="admin-table">
        <thead>
          <tr>
            <th width="80">ID</th>
            <th>活动名称</th>
            <th width="120">分类</th>
            <th width="110">活动日期</th>
            <th>内容预览</th>
            <th width="100">已关注</th>
            <th width="120">状态</th>
            <th width="150" style="text-align: right;">操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ev in events" :key="ev.id">
            <td class="td-id">#{{ ev.id }}</td>
            <td class="td-title">
                <div class="title-main">{{ ev.title }}</div>
                <div class="sub-info" v-if="ev.location"><i class="fas fa-map-marker-alt"></i> {{ ev.location }}</div>
            </td>
            <td><span class="table-tag category">{{ ev.category }}</span></td>
            <td class="td-date"><i class="far fa-calendar-alt" style="color:#94a3b8;margin-right:4px;"></i>{{ ev.deadline ? ev.deadline.substring(0, 10) : '-' }}</td>
            <td class="td-desc">
                <div class="line-clamp" v-html="ev.description"></div>
            </td>
            <td><strong>{{ ev.registrations }}</strong> 人</td>
            <td>
              <span class="status-indicator" :class="ev.status">
                {{ ev.status }}
              </span>
            </td>
            <td class="td-actions">
              <button class="btn-icon-action" title="预览前端详情" @click="previewEvent(ev.id)"><i class="fas fa-eye"></i></button>
              <button class="btn-icon-action btn-edit" title="进入完整页面编辑" @click="goToEdit(ev.id)"><i class="fas fa-edit"></i></button>
              <button class="btn-icon-action delete" title="删除" @click="deleteEvent(ev.id)"><i class="fas fa-trash-alt"></i></button>
            </td>
          </tr>
          <tr v-if="events.length === 0">
              <td colspan="8" class="empty-row">暂无活动数据，点击右上方按钮开始发布</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.events-admin {
    padding: 10px;
}

.admin-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  background: white;
  padding: 20px 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.toolbar-left h2 {
    font-size: 1.4rem;
    font-weight: 850;
    color: #0f172a;
    margin: 0 0 4px;
}

.sub-text {
    font-size: 0.9rem;
    color: #64748b;
    margin: 0;
}

.btn-primary-admin {
  background: #10b981;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 800;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
  transition: all 0.2s;
}

.btn-primary-admin:hover {
    background: #059669;
    transform: translateY(-1px);
}

.admin-table-container {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
}

.admin-table th {
  background: #f8fafc;
  text-align: left;
  padding: 16px 24px;
  font-size: 0.85rem;
  font-weight: 850;
  color: #64748b;
  border-bottom: 1px solid #e2e8f0;
}

.admin-table td {
  padding: 20px 24px;
  font-size: 0.92rem;
  border-bottom: 1px solid #f1f5f9;
  vertical-align: middle;
}

.td-id { color: #94a3b8; font-family: monospace; font-weight: 600; }
.title-main { font-weight: 700; color: #1e293b; margin-bottom: 4px; }
.sub-info { font-size: 0.75rem; color: #94a3b8; }

.td-desc { max-width: 400px; color: #64748b; font-size: 0.85rem; }
.line-clamp {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}

.td-date {
  color: #475569;
  font-weight: 600;
  font-size: 0.85rem;
}

.table-tag {
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 800;
}
.table-tag.category { background: #f1f5f9; color: #475569; }

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  font-size: 0.85rem;
}
.status-indicator::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
.status-indicator.进行中:before { background: #10b981; }
.status-indicator.报名中:before { background: #3b82f6; }
.status-indicator.已结案:before { background: #94a3b8; }
.status-indicator.筹备中:before { background: #f59e0b; }

.td-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-icon-action {
  background: white;
  border: 1px solid #e2e8f0;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon-action:hover {
  background: #f8fafc;
  color: #0f172a;
  border-color: #cbd5e1;
}

.btn-icon-action.btn-edit:hover {
    background: #eff6ff;
    color: #2563eb;
    border-color: #bfdbfe;
}

.btn-icon-action.delete:hover {
  background: #fef2f2;
  color: #dc2626;
  border-color: #fecaca;
}

.empty-row {
    text-align: center;
    padding: 60px !important;
    color: #94a3b8;
    font-style: italic;
}
</style>