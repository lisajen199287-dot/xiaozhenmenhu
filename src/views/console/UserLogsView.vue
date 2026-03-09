<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useUser } from '@/utils/userStore'

import { ElMessage } from 'element-plus'



const { user } = useUser()

const logs = ref<any[]>([])

const loading = ref(false)



const fetchLogs = async () => {

    if (!user.value) return

    loading.value = true

    try {

        const res = await fetch(`/api/console/users/${user.value.id}/logs`)

        if (res.ok) {

            logs.value = await res.json()

        }

    } catch (e) {

        ElMessage.error('获取操作记录失败')

    } finally {

        loading.value = false

    }

}



const formatTime = (dateStr: string) => {

    if (!dateStr) return '-'

    const date = new Date(dateStr)

    return date.toLocaleString('zh-CN', { hour12: false })

}



onMounted(() => {

    fetchLogs()

})

</script>



<template>

  <div class="user-logs-view">

    <div class="page-header">

      <div class="header-text">

        <h2>操作记录</h2>

        <p>查看您的账户活动与安全日志</p>

      </div>

      <el-button type="primary" :icon="'Refresh'" @click="fetchLogs">刷新记录</el-button>

    </div>



    <div class="content-card">

      <div class="card-header">

        <h3>最近操作</h3>

      </div>

      

      <div class="table-container">

        <el-table :data="logs" v-loading="loading" style="width: 100%" stripe border>

          <el-table-column prop="action" label="操作类型" width="180">

            <template #default="{ row }">

              <el-tag size="small" :type="row.action === 'LOGIN' ? 'success' : 'info'">

                {{ row.action }}

              </el-tag>

            </template>

          </el-table-column>

          <el-table-column prop="detail" label="详细描述" min-width="300" />

          <el-table-column prop="ipAddress" label="IP 地址" width="180">

            <template #default="{ row }">

              <span style="font-family: monospace; color: #64748b">{{ row.ipAddress || '-' }}</span>

            </template>

          </el-table-column>

          <el-table-column label="发生时间" width="200">

            <template #default="{ row }">

              {{ formatTime(row.createTime) }}

            </template>

          </el-table-column>

        </el-table>

        <div v-if="!loading && logs.length === 0" class="empty-state">

           暂无操作记录

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 800; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }



.content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }

.card-header h3 { margin: 0; font-size: 1.1rem; color: #1e293b; }



.table-container { padding: 0; }

.empty-state { padding: 40px; text-align: center; color: #94a3b8; }



:deep(.el-table) { border-radius: 0 0 12px 12px; }

:deep(.el-table th.el-table__cell) { background-color: #f8fafc; color: #475569; font-weight: 600; }

</style>
