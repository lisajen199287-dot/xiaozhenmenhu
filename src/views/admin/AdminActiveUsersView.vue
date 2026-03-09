<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

import { ElMessage } from 'element-plus'

import { Clock, Location } from '@element-plus/icons-vue'



interface ActiveUser {

  userId: number

  username: string

  currentPage: string

  module: string

  ipAddress: string

  lastHeartbeat: string

  enterTime: string

  durationSeconds: number

}



const activeUsers = ref<ActiveUser[]>([])

const loading = ref(false)

let timer: any = null



const fetchActiveUsers = async () => {

  loading.value = true

  try {

    const res = await fetch('/api/admin/active-users')

    if (res.ok) {

      activeUsers.value = await res.json()

    }

  } catch (e) {

    ElMessage.error('获取在线用户失败')

  } finally {

    loading.value = false

  }

}



const formatDuration = (seconds: number) => {

  if (!seconds) return '刚刚进入'

  const h = Math.floor(seconds / 3600)

  const m = Math.floor((seconds % 3600) / 60)

  const s = seconds % 60

  return `${h > 0 ? h + 'h ' : ''}${m > 0 ? m + 'm ' : ''}${s}s`

}



const getPageLabel = (page: string) => {

  const mapping: Record<string, string> = {

    'overview': '控制台概览',

    'apps': '我的应用',

    'api': 'API管理',

    'billing': '费用中心',

    'support': '工单支持',

    'settings': '账号设置'

  }

  return mapping[page] || page

}



onMounted(() => {

  fetchActiveUsers()

  timer = setInterval(fetchActiveUsers, 10000)

})



onUnmounted(() => {

  if (timer) clearInterval(timer)

})

</script>



<template>

  <div class="active-users-page">

    <div class="page-header">

      <div class="header-info">

        <h2>在线活跃用户统计</h2>

        <p class="sub-title">实时监控全平台在线用户分布、停留时长及访问路径</p>

      </div>

      <div class="live-indicator">

        <span class="dot pulse"></span>

        <span class="count">{{ activeUsers.length }} 人在线</span>

      </div>

    </div>



    <el-card shadow="never" class="table-card">

      <el-table :data="activeUsers" v-loading="loading" stripe border>

        <el-table-column label="用户信息" width="220">

          <template #default="{ row }">

            <div class="user-cell">

              <el-avatar :size="32" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />

              <div class="name-info">

                <div class="username">{{ row.username || '匿名用户' }}</div>

                <div class="uid">ID: {{ row.userId }}</div>

              </div>

            </div>

          </template>

        </el-table-column>

        

        <el-table-column label="所在位置" width="180">

          <template #default="{ row }">

            <el-tag size="small" type="primary">{{ getPageLabel(row.currentPage) }}</el-tag>

          </template>

        </el-table-column>



        <el-table-column label="归属模块" width="120">

          <template #default="{ row }">

             <span class="module-text">{{ row.module }}</span>

          </template>

        </el-table-column>



        <el-table-column label="停留时长">

          <template #default="{ row }">

            <div class="duration-cell">

              <el-icon><Clock /></el-icon>

              <span>{{ formatDuration(row.durationSeconds) }}</span>

            </div>

          </template>

        </el-table-column>



        <el-table-column label="网络地址" width="150">

          <template #default="{ row }">

            <div class="ip-cell">

              <el-icon><Location /></el-icon>

              <span>{{ row.ipAddress }}</span>

            </div>

          </template>

        </el-table-column>



        <el-table-column label="最后活动时间" width="180">

          <template #default="{ row }">

            <span class="time-text">{{ new Date(row.lastHeartbeat).toLocaleTimeString() }}</span>

          </template>

        </el-table-column>



        <el-table-column label="状态" width="100" fixed="right">

          <template #default>

            <el-tag type="success" size="small" effect="dark">在线</el-tag>

          </template>

        </el-table-column>

      </el-table>

    </el-card>



    <div class="stats-summary-grid">

      <div class="summary-card">

         <h4>页面分布 Top 3</h4>

         <div class="chart-mock">

            <div class="bar-row"><span class="lbl">概览</span><div class="bar" style="width: 70%"></div></div>

            <div class="bar-row"><span class="lbl">应用</span><div class="bar" style="width: 45%"></div></div>

            <div class="bar-row"><span class="lbl">API</span><div class="bar" style="width: 20%"></div></div>

         </div>

      </div>

      <div class="summary-card">

         <h4>今日累计时长</h4>

         <div class="big-num">1.5 <small>hours</small></div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }

.sub-title { color: #64748b; font-size: 0.9rem; margin: 4px 0 0 0; }

.live-indicator { display: flex; align-items: center; gap: 8px; background: #f0fdf4; padding: 8px 16px; border-radius: 20px; border: 1px solid #bbf7d0; }

.count { font-weight: 700; color: #166534; font-size: 0.9rem; }

.dot { width: 8px; height: 8px; background: #22c55e; border-radius: 50%; }

.pulse { animation: pulse-green 2s infinite; }

@keyframes pulse-green { 0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); } 70% { box-shadow: 0 0 0 8px rgba(34, 197, 94, 0); } 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); } }



.user-cell { display: flex; align-items: center; gap: 12px; }

.username { font-weight: 700; color: #1e293b; }

.uid { font-size: 0.75rem; color: #94a3b8; }

.duration-cell, .ip-cell { display: flex; align-items: center; gap: 6px; color: #475569; font-size: 0.9rem; }

.module-text { font-family: monospace; color: #6366f1; font-weight: 700; }

.time-text { color: #64748b; font-size: 0.85rem; }



.table-card { border-radius: 12px; }

.stats-summary-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 24px; margin-top: 24px; }

.summary-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }

.summary-card h4 { margin: 0 0 16px 0; font-size: 1rem; color: #1e293b; }

.chart-mock { display: flex; flex-direction: column; gap: 12px; }

.bar-row { display: flex; align-items: center; gap: 12px; }

.lbl { width: 40px; font-size: 0.8rem; color: #64748b; }

.bar { height: 8px; background: #6366f1; border-radius: 4px; }

.big-num { font-size: 2.5rem; font-weight: 900; color: #1e293b; }

.big-num small { font-size: 1rem; color: #64748b; font-weight: 500; }

</style>