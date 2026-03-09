<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useUser } from '@/utils/userStore'

import { ElMessage } from 'element-plus'



interface SupportTicket {

  id: number; ticketId: string; subject: string; content: string; category: string; priority: string; status: string; adminReply: string; createdAt: string

}



const { user } = useUser()

const tickets = ref<SupportTicket[]>([])

const loading = ref(false)

const showCreateTicket = ref(false)

const selectedTicket = ref<SupportTicket | null>(null)

const newTicket = ref({ subject: '', content: '', category: '技术支持', priority: '普通' })



const fetchTickets = async () => {

  if (!user.value) return

  loading.value = true

  try {

    const res = await fetch(`/api/console/tickets/${user.value.id}`)

    if (res.ok) {

      tickets.value = await res.json()

    }

  } catch (e) {

    console.error(e)

  } finally {

    loading.value = false

  }

}



const submitTicket = async () => {

  if (!newTicket.value.subject || !newTicket.value.content) {

      ElMessage.warning('请填写完整工单信息')

      return

  }

  try {

    const res = await fetch('/api/console/tickets', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ ...newTicket.value, userId: user.value?.id })

    })

    if (res.ok) {

      ElMessage.success('工单提交成功')

      showCreateTicket.value = false

      newTicket.value = { subject: '', content: '', category: '技术支持', priority: '普通' }

      fetchTickets()

    }

  } catch (e) {

      ElMessage.error('网络错误，请稍后再试')

  }

}



const getCategoryLabel = (cat: string) => {

  const map: any = { 'Technical': '技术支持', 'Billing': '费用账单', 'Account': '账号权限', 'Other': '其他咨询' }
  return map[cat] || cat

}



const formatTime = (dateStr: string) => {

    if (!dateStr) return '-'

    const date = new Date(dateStr)

    const now = new Date()

    const diff = now.getTime() - date.getTime()

    const minutes = Math.floor(diff / (1000 * 60))

    const hours = Math.floor(diff / (1000 * 60 * 60))

    const days = Math.floor(diff / (1000 * 60 * 60 * 24))



    if (minutes < 1) return '刚刚'

    if (minutes < 60) return `${minutes} 分钟前`

    if (hours < 24) return `${hours} 小时前`

    if (days < 5) return `${days} 天前`

    return date.toLocaleDateString('zh-CN')

}



const getStatusType = (status: string) => {
    if (status === '待处理' || status === 'OPEN') return 'open'
    if (status === '已结案' || status === '已关闭' || status === 'CLOSED') return 'closed'
    return 'processing'
}



const getStatusLabel = (s: string) => {
    const map: any = { 'OPEN': '待处理', 'CLOSED': '已结案', 'PROCESSING': '处理中' }
    return map[s] || s
}



onMounted(fetchTickets)

</script>



<template>

  <div class="support-view">

    <div class="page-header">

      <div class="header-text">

        <h2>工单支持</h2>

        <p>提交技术问题或账户咨询</p>

      </div>

      <button class="btn-primary" @click="showCreateTicket = true">

          <i class="fas fa-plus"></i> 新建工单

      </button>

    </div>



    <div class="content-card">

      <div class="card-header">

        <h3>我的工单</h3>

        <div class="filter-actions">

           <button class="btn-filter active">所有工单</button>
           <button class="btn-filter">处理中</button>

        </div>

      </div>

      

      <div v-if="loading" class="loading-box">同步数据中...</div>

      

      <table v-else class="tickets-table">

        <thead>

          <tr>

            <th>工单 ID</th>

            <th>主题</th>

            <th>分类</th>

            <th>状态</th>

            <th>创建时间</th>

            <th>操作</th>
          </tr>
        </thead>

        <tbody>

          <tr v-for="ticket in tickets" :key="ticket.id">

            <td class="code-font">{{ ticket.ticketId }}</td>

            <td class="primary-text">{{ ticket.subject }}</td>

            <td><span class="category-badge">{{ getCategoryLabel(ticket.category) }}</span></td>

            <td>

               <span class="status-badge" :class="getStatusType(ticket.status)">{{ getStatusLabel(ticket.status) }}</span>

            </td>

            <td class="text-muted">{{ formatTime(ticket.createdAt) }}</td>

            <td><button class="btn-text" @click="selectedTicket = ticket">查看详情</button></td>

          </tr>

          <tr v-if="tickets.length === 0">

              <td colspan="6" class="empty-state">暂无工单信息</td>

          </tr>

        </tbody>

      </table>

    </div>



    <!-- Create Ticket Modal -->

    <el-dialog v-model="showCreateTicket" title="提交新工单" width="500px">
        <el-form :model="newTicket" label-position="top">
            <el-form-item label="工单主题">
                <el-input v-model="newTicket.subject" placeholder="请简述您的问题" />
            </el-form-item>
            <el-form-item label="工单类别">
                <el-select v-model="newTicket.category" style="width: 100%">
                    <el-option label="技术咨询" value="技术咨询" />
                    <el-option label="账单与财务" value="账单与财务" />
                    <el-option label="权限与账号" value="权限与账号" />
                    <el-option label="其他建议" value="其他建议" />
                </el-select>
            </el-form-item>
            <el-form-item label="详细内容">
                <el-input type="textarea" v-model="newTicket.content" rows="4" placeholder="请详细描述您遇到的问题或需求" />
            </el-form-item>
        </el-form>

        <template #footer>

            <el-button @click="showCreateTicket = false">取消</el-button>

            <el-button type="primary" @click="submitTicket">提交工单</el-button>

        </template>

    </el-dialog>



    <!-- Ticket Detail Modal -->

    <el-dialog :model-value="!!selectedTicket" :title="'工单详情: ' + selectedTicket?.ticketId" width="600px" @update:model-value="(v: boolean) => { if (!v) selectedTicket = null }" @close="selectedTicket = null">

        <div v-if="selectedTicket" class="ticket-detail">

            <div class="detail-row">
                <span class="lbl">主题：</span>
                <span class="val">{{ selectedTicket.subject }}</span>
            </div>
            <div class="detail-row">
                <span class="lbl">内容：</span>
                <div class="content-box-inner">{{ selectedTicket.content }}</div>
            </div>
            <div class="detail-row">
                <span class="lbl">分类：</span>
                <el-tag size="small">{{ getCategoryLabel(selectedTicket.category) }}</el-tag>
            </div>

            <div class="divider"></div>

            <div class="reply-section">

                <h4>官方回复</h4>

                <div v-if="selectedTicket.adminReply" class="reply-box">

                    {{ selectedTicket.adminReply }}

                </div>

                <p v-else class="no-reply">客服正在处理中，请耐心等待...</p>

            </div>

        </div>

    </el-dialog>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }



.btn-primary {

  background: #4f46e5; color: white; border: none; padding: 10px 20px;

  border-radius: 6px; font-weight: 600; cursor: pointer; display: flex;

  align-items: center; gap: 8px; transition: all 0.2s;

}

.btn-primary:hover { background: #4338ca; transform: translateY(-1px); }



.content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.card-header { padding: 20px 24px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f1f5f9; }

.filter-actions { display: flex; gap: 8px; }

.btn-filter { background: none; border: none; font-size: 0.9rem; font-weight: 600; color: #94a3b8; cursor: pointer; padding: 6px 12px; border-radius: 4px; }

.btn-filter.active { background: #f1f5f9; color: #0f172a; }



.tickets-table { width: 100%; border-collapse: collapse; }

.tickets-table th { text-align: left; padding: 12px 24px; background: #f8fafc; color: #64748b; font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }

.tickets-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #334155; vertical-align: middle; }

.code-font { font-family: monospace; color: #64748b; }

.primary-text { font-weight: 600; color: #0f172a; }



.category-badge { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; color: #475569; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }

.status-badge.open { background: #dbeafe; color: #1e40af; }

.status-badge.closed { background: #f1f5f9; color: #64748b; }

.status-badge.processing { background: #fef3c7; color: #92400e; }



.btn-text { background: none; border: none; color: #4f46e5; font-weight: 600; cursor: pointer; font-size: 0.9rem; }

.text-muted { color: #94a3b8; font-size: 0.85rem; }

.loading-box, .empty-state { padding: 60px; text-align: center; color: #94a3b8; }



.ticket-detail { padding: 10px 0; }

.detail-row { margin-bottom: 16px; }

.detail-row .lbl { font-weight: 700; color: #64748b; width: 60px; display: inline-block; }

.content-box-inner { background: #f8fafc; padding: 16px; border-radius: 8px; margin-top: 8px; line-height: 1.6; }

.divider { height: 1px; background: #e2e8f0; margin: 24px 0; }

.reply-section h4 { margin: 0 0 12px 0; font-size: 1rem; }

.reply-box { background: #fffbeb; border: 1px solid #fef3c7; padding: 16px; border-radius: 8px; color: #92400e; }

.no-reply { color: #94a3b8; font-style: italic; }

</style>