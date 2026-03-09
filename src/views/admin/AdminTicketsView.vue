<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage } from 'element-plus'

import { User } from '@element-plus/icons-vue'



interface SupportTicket {

    id: number

    ticketId: string

    userId: number

    username: string

    subject: string

    content: string

    category: string

    priority: string

    status: string

    adminReply: string

    createdAt: string

}



const tickets = ref<SupportTicket[]>([])

const loading = ref(false)

const replyDialog = ref(false)

const replyingTicket = ref<SupportTicket | null>(null)

const replyContent = ref('')



const fetchTickets = async () => {

    loading.value = true

    try {

        const res = await fetch('/api/admin/tickets')

        if (res.ok) {

            tickets.value = await res.json()

        }

    } catch (e) {

        ElMessage.error('获取工单列表失败')

    } finally {

        loading.value = false

    }

}



const handleReply = (row: SupportTicket) => {

    replyingTicket.value = row

    replyContent.value = row.adminReply || ''

    replyDialog.value = true

}



const submitReply = async (status: string) => {

    if (!replyingTicket.value) return

    try {

        const res = await fetch('/api/admin/tickets/reply', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                id: replyingTicket.value.id,

                status: status,

                adminReply: replyContent.value

            })

        })

        if (res.ok) {

            ElMessage.success('回复成功')

            replyDialog.value = false

            fetchTickets()

        }

    } catch (e) {

        ElMessage.error('操作失败')

    }

}



const getStatusType = (status: string) => {
    if (status === '待处理' || status === 'OPEN') return 'primary'
    if (status === '已结案' || status === '已关闭' || status === 'CLOSED') return 'info'
    return 'warning'
}



const getCategoryLabel = (cat: string) => {
    const map: any = { 'Technical': '技术支持', 'Billing': '费用账单', 'Account': '账号权限', 'Other': '其他咨询' }
    return map[cat] || cat
}



const getStatusLabel = (s: string) => {
    const map: any = { 'OPEN': '待处理', 'CLOSED': '已结案', 'PROCESSING': '处理中' }
    return map[s] || s
}



onMounted(fetchTickets)

</script>



<template>

  <div class="admin-tickets-page">

    <div class="page-header">

      <div class="header-info">

        <h2>用户工单管理</h2>

        <p class="sub-title">处理用户提交的技术支持、财务咨询及投诉建议</p>

      </div>

      <div class="stats-mini">

          <div class="stat-item">
              <span class="lbl">待处理工单</span>
              <span class="val">{{ tickets.filter(t => t.status === '待处理' || t.status === 'OPEN').length }}</span>
          </div>

      </div>

    </div>



    <el-card shadow="never" class="table-card">

      <el-table :data="tickets" v-loading="loading" stripe border>

        <el-table-column label="工单信息" width="280">

          <template #default="{ row }">

            <div class="ticket-info-cell">

              <div class="ticket-id">{{ row.ticketId }}</div>

              <div class="ticket-subject">{{ row.subject }}</div>

              <div class="ticket-meta">

                  <el-tag size="small" type="info">{{ getCategoryLabel(row.category) }}</el-tag>

                  <el-tag size="small" :type="row.priority === 'HIGH' ? 'danger' : 'warning'">{{ row.priority }}级响应</el-tag>

              </div>

            </div>

          </template>

        </el-table-column>

        

        <el-table-column label="提交用户" width="180">

          <template #default="{ row }">

            <div class="user-info">

                <el-icon><User /></el-icon>

                <span>{{ row.username || '用户#'+row.userId }}</span>

            </div>

          </template>

        </el-table-column>



        <el-table-column label="当前状态" width="120">

          <template #default="{ row }">

            <el-tag :type="getStatusType(row.status)" effect="dark">

                {{ getStatusLabel(row.status) }}

            </el-tag>

          </template>

        </el-table-column>



        <el-table-column label="最后回复预览">

           <template #default="{ row }">

               <div class="reply-preview">

                   {{ row.adminReply || '暂无官方回复' }}

               </div>

           </template>

        </el-table-column>



        <el-table-column label="提交时间" width="180">

          <template #default="{ row }">

            <span class="time-text">{{ new Date(row.createdAt).toLocaleString() }}</span>

          </template>

        </el-table-column>



        <el-table-column label="操作" width="120" fixed="right">

          <template #default="{ row }">

            <el-button type="primary" size="small" link @click="handleReply(row)">处理工单</el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-card>



    <el-dialog v-model="replyDialog" :title="'处理工单: ' + replyingTicket?.ticketId" width="600px">

        <div v-if="replyingTicket" class="reply-container">

            <div class="user-content">

                <div class="msg-header">用户原始描述:</div>

                <div class="msg-body">{{ replyingTicket.content }}</div>

            </div>

            <div class="admin-action">

                <div class="msg-header">官方回复内容:</div>

                <el-input type="textarea" v-model="replyContent" :rows="5" placeholder="请输入您的回复..." />

            </div>

        </div>

        <template #footer>

            <el-button @click="replyDialog = false">取消</el-button>
            <el-button type="warning" @click="submitReply('PROCESSING')">回复并保持开启</el-button>
            <el-button type="success" @click="submitReply('CLOSED')">回复并完成结案</el-button>

        </template>

    </el-dialog>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }

.sub-title { color: #64748b; font-size: 0.9rem; margin: 4px 0 0 0; }

.stats-mini { background: #fff; padding: 12px 24px; border-radius: 8px; border: 1px solid #e2e8f0; }

.stat-item .lbl { font-size: 0.75rem; color: #64748b; margin-right: 8px; }

.stat-item .val { font-size: 1.25rem; font-weight: 850; color: #4f46e5; }



.table-card { border-radius: 12px; }

.ticket-info-cell .ticket-id { font-family: monospace; color: #94a3b8; font-size: 0.8rem; }

.ticket-info-cell .ticket-subject { font-weight: 700; color: #1e293b; margin: 4px 0 8px; }

.ticket-info-cell .ticket-meta { display: flex; gap: 8px; }



.user-info { display: flex; align-items: center; gap: 8px; color: #475569; }

.reply-preview { font-size: 0.85rem; color: #64748b; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 300px; }

.time-text { color: #94a3b8; font-size: 0.85rem; }



.reply-container { display: flex; flex-direction: column; gap: 24px; }

.msg-header { font-weight: 700; margin-bottom: 8px; color: #1e293b; }

.msg-body { background: #f8fafc; padding: 16px; border-radius: 8px; color: #475569; line-height: 1.6; }

</style>