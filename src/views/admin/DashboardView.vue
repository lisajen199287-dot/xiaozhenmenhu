<script setup lang="ts">

import { computed } from 'vue'

import { useRouter } from 'vue-router'

import { useAdminStore } from '@/utils/adminStore'



const router = useRouter()

const { articles, events, users, admins } = useAdminStore()



const stats = computed(() => [

  { label: '总文章数', value: articles.value.length.toString(), icon: 'fas fa-file-alt', color: '#6366f1' },

  { label: '活动报名', value: events.value.reduce((acc, curr) => acc + curr.registrations, 0).toString(), icon: 'fas fa-calendar-alt', color: '#10b981' },

  { label: '注册用户', value: users.value.length.toString(), icon: 'fas fa-users', color: '#f59e0b' },

  { label: '管理员', value: admins.value.length.toString(), icon: 'fas fa-user-shield', color: '#ef4444' },

])



const recentActivities = [
  { time: '刚刚', user: '系统', action: '刷新了数据统计面板' },
  { time: '10分钟前', user: '张大华', action: '在“行业沙龙”活动中新增报名' },
  { time: '35分钟前', user: '管理员', action: '发布了新文章《2026 AI 趋势预测》' }
]
// Suppress unused warning
console.debug(recentActivities)



const recentArticles = computed(() => articles.value.slice(0, 5))



const goTo = (path: string) => router.push(path)

</script>



<template>

  <div class="dashboard-view">

    <!-- Stat Cards -->

    <div class="stats-grid">

      <div v-for="s in stats" :key="s.label" class="stat-card">

        <div class="stat-icon" :style="{ background: s.color + '15', color: s.color }">

          <i :class="s.icon"></i>

        </div>

        <div class="stat-info">

          <span class="stat-label">{{ s.label }}</span>

          <h3 class="stat-value">{{ s.value }}</h3>

        </div>

      </div>

    </div>



    <div class="dashboard-bottom-grid">

      <!-- Recent Articles Table -->

      <div class="admin-table-card main-card">

        <div class="card-header">
          <h3>最新文章</h3>
          <button class="btn-more" @click="goTo('/admin/articles')">管理所有</button>
        </div>

        <div class="table-responsive">

            <table class="dashboard-table">

                <thead>

                    <tr>

                        <th>标题</th>

                        <th>分类</th>

                        <th>状态</th>

                        <th>发布时间</th>

                    </tr>

                </thead>

                <tbody>

                    <tr v-for="art in recentArticles" :key="art.id">

                        <td class="td-title-dash">{{ art.title }}</td>

                        <td><span class="mini-tag">{{ art.category }}</span></td>

                        <td>

                            <span class="status-dot" :class="art.status"></span> {{ art.status }}

                        </td>

                        <td class="td-date">{{ art.date }}</td>

                    </tr>

                </tbody>

            </table>

        </div>

      </div>



      <!-- Quick Actions -->

      <div class="admin-table-card side-card">

        <div class="card-header">

          <h3>快捷操作</h3>

        </div>

        <div class="quick-actions-list">

          <button class="btn-quick" @click="goTo('/admin/articles')"><i class="fas fa-plus"></i> 发布文章</button>

          <button class="btn-quick" @click="goTo('/admin/events')"><i class="fas fa-calendar-plus"></i> 创建活动</button>

          <button class="btn-quick" @click="goTo('/admin/users')"><i class="fas fa-user-plus"></i> 新增用户</button>

          <button class="btn-quick-outline" @click="goTo('/intro')"><i class="fas fa-info-circle"></i> 查看简介</button>

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.stats-grid {

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;

  margin-bottom: 32px;

}



.stat-card {

  background: white;

  padding: 24px;

  border-radius: 8px;

  border: 1px solid #e2e8f0;

  display: flex;

  align-items: center;

  gap: 20px;

}



.stat-icon {

  width: 52px;

  height: 52px;

  border-radius: 4px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.25rem;

}



.stat-label {

  font-size: 0.85rem;

  color: #64748b;

  font-weight: 600;

  margin-bottom: 4px;

  display: block;

}



.stat-value {

  font-size: 1.5rem;

  font-weight: 800;

  margin: 0;

}



.dashboard-bottom-grid {

  display: grid;

  grid-template-columns: 2fr 1fr;

  gap: 32px;

}



.admin-table-card {

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  overflow: hidden;

  height: 100%;

}



.card-header {

  padding: 20px 24px;

  border-bottom: 1px solid #f1f5f9;

  display: flex;

  justify-content: space-between;

  align-items: center;

}



.card-header h3 {

  font-size: 1.1rem;

  font-weight: 800;

  margin: 0;

}



.btn-more {

  background: none;

  border: none;

  color: #6366f1;

  font-weight: 700;

  font-size: 0.85rem;

  cursor: pointer;

}



.table-responsive {

    padding: 0;

}



.dashboard-table {

    width: 100%;

    border-collapse: collapse;

}



.dashboard-table th {

    text-align: left;

    padding: 12px 24px;

    font-size: 0.8rem;

    color: #94a3b8;

    background: #f8fafc;

    border-bottom: 1px solid #e2e8f0;

}



.dashboard-table td {

    padding: 16px 24px;

    border-bottom: 1px solid #f1f5f9;

    font-size: 0.9rem;

    color: #334155;

}



.td-title-dash {

    font-weight: 700;

    color: #0f172a;

    max-width: 300px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;

}



.mini-tag {

    background: #f1f5f9;

    color: #64748b;

    padding: 2px 8px;

    border-radius: 4px;

    font-size: 0.75rem;

    font-weight: 700;

}



.status-dot {

    display: inline-block;

    width: 6px;

    height: 6px;

    border-radius: 50%;

    margin-right: 6px;

}



.status-dot.已发布 { background: #10b981; }

.status-dot.草稿 { background: #f59e0b; }



.td-date {

    color: #94a3b8;

    font-size: 0.85rem;

}



.quick-actions-list {

  padding: 24px;

  display: flex;

  flex-direction: column;

  gap: 12px;

}



.btn-quick {

  background: #0f172a;

  color: white;

  border: none;

  padding: 12px;

  border-radius: 4px;

  font-weight: 700;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  cursor: pointer;

  transition: all 0.2s;

}



.btn-quick:hover { background: #1e293b; }



.btn-quick-outline {

  background: white;

  color: #1e293b;

  border: 1px solid #e2e8f0;

  padding: 12px;

  border-radius: 4px;

  font-weight: 700;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 10px;

  cursor: pointer;

  transition: all 0.2s;

}



.btn-quick-outline:hover { background: #f8fafc; }

</style>