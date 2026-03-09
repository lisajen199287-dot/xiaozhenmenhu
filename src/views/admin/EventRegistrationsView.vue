<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface Registration {
    id: number;
    eventId: number;
    userId: number;
    realName: string;
    phone: string;
    company: string;
    position: string;
    remark: string;
    createTime: string;
    eventTitle: string;
    username: string;
}

const registrations = ref<Registration[]>([])
const loading = ref(false)

const fetchRegistrations = async () => {
    loading.value = true
    try {
        const res = await fetch('/api/event-registrations/registrations')
        if (res.ok) {
            registrations.value = await res.json()
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

onMounted(fetchRegistrations)

const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const d = new Date(dateStr)
    return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`
}
</script>

<template>
    <div class="reg-admin-page">
        <div class="page-header">
            <h2>活动报名名单管理</h2>
            <p>查看并导出所有活动的参与者信息</p>
        </div>

        <div class="table-card">
            <div v-if="loading" class="loading-state">
                <div class="spinner"></div>
                <p>数据加载中...</p>
            </div>
            
            <table v-else class="reg-table">
                <thead>
                    <tr>
                        <th width="80">序号</th>
                        <th>活动名称</th>
                        <th>报名人姓名</th>
                        <th>联系电话</th>
                        <th>企业/机构</th>
                        <th>职务</th>
                        <th>报名时间</th>
                        <th>备注</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(reg, index) in registrations" :key="reg.id">
                        <td class="td-idx">#{{ index + 1 }}</td>
                        <td class="td-event"><strong>{{ reg.eventTitle }}</strong></td>
                        <td class="td-name">{{ reg.realName }} <span class="u-tag">({{ reg.username }})</span></td>
                        <td class="td-phone">{{ reg.phone }}</td>
                        <td>{{ reg.company || '-' }}</td>
                        <td>{{ reg.position || '-' }}</td>
                        <td class="td-time">{{ formatDate(reg.createTime) }}</td>
                        <td class="td-remark"><div class="remark-text" :title="reg.remark">{{ reg.remark || '-' }}</div></td>
                    </tr>
                    <tr v-if="registrations.length === 0">
                        <td colspan="8" class="empty-state">目前暂无参与者报名数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style scoped>
.reg-admin-page {
    padding: 30px;
}

.page-header {
    margin-bottom: 30px;
}

.page-header h2 {
    font-size: 1.5rem;
    font-weight: 850;
    color: #0f172a;
    margin: 0 0 8px;
}

.page-header p {
    color: #64748b;
    margin: 0;
}

.table-card {
    background: white;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.reg-table {
    width: 100%;
    border-collapse: collapse;
}

.reg-table th {
    background: #f8fafc;
    padding: 16px 20px;
    text-align: left;
    font-size: 0.85rem;
    font-weight: 850;
    color: #475569;
    border-bottom: 1px solid #e2e8f0;
}

.reg-table td {
    padding: 16px 20px;
    font-size: 0.9rem;
    border-bottom: 1px solid #f1f5f9;
}

.td-idx { color: #94a3b8; font-family: monospace; }
.td-event { color: #1e293b; }
.td-name { font-weight: 700; color: #0f172a; }
.u-tag { font-weight: normal; color: #94a3b8; font-size: 0.8rem; margin-left: 4px; }
.td-phone { color: #2563eb; font-weight: 600; }
.td-time { color: #64748b; font-size: 0.85rem; white-space: nowrap; }

.remark-text {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #64748b;
    font-size: 0.85rem;
}

.empty-state {
    padding: 80px !important;
    text-align: center;
    color: #94a3b8;
    font-style: italic;
}

.loading-state {
    padding: 100px;
    text-align: center;
}

.spinner {
    width: 30px; height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
