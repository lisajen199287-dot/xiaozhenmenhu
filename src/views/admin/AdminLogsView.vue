<script setup lang="ts">

import { ref, onMounted } from 'vue'



interface LogEntry {

  id: number;

  adminId: number;

  username: string;

  module: string;

  action: string;

  detail: string;

  ip: string;

  createTime: string;

}



const logs = ref<LogEntry[]>([])

const loading = ref(false)



const fetchLogs = async () => {

  loading.value = true;

  try {

    const res = await fetch('/api/admin/logs');

    if (res.ok) {

      logs.value = await res.json();

    } else {

      console.error('Failed to fetch logs:', await res.text());

    }

  } catch (error) {

    console.error('Error fetching logs:', error);

  } finally {

    loading.value = false;

  }

}



onMounted(() => {

  fetchLogs();

})



const getActionTypeClass = (action: string) => {

  switch (action) {

    case 'CREATE': return 'success';

    case 'UPDATE': return 'warning';

    case 'DELETE': return 'danger';

    case 'LOGIN': return 'info';

    default: return '';

  }

}

</script>



<template>

  <div class="admin-logs-view">

    <div class="page-header">

      <h2>操作日志审计</h2>

      <button class="btn-primary" @click="fetchLogs" :disabled="loading">

        <i class="fas" :class="loading ? 'fa-spinner fa-spin' : 'fa-sync'"></i> 刷新日志

      </button>

    </div>



    <div class="logs-container">

      <el-table :data="logs" style="width: 100%" v-loading="loading" stripe border>

        <el-table-column prop="username" label="操作者" width="120">

          <template #default="scope">

            <div class="user-cell">

              <i class="fas fa-user-circle"></i> {{ scope.row.username }}

            </div>

          </template>

        </el-table-column>

        

        <el-table-column prop="ip" label="来源 IP" width="140" show-overflow-tooltip />

        

        <el-table-column prop="module" label="模块" width="100">

           <template #default="scope">

             <el-tag effect="plain">{{ scope.row.module }}</el-tag>

           </template>

        </el-table-column>

        

        <el-table-column prop="action" label="操作类型" width="100">

          <template #default="scope">

            <el-tag :type="getActionTypeClass(scope.row.action)">{{ scope.row.action }}</el-tag>

          </template>

        </el-table-column>

        

        <el-table-column prop="detail" label="操作详情" min-width="200" show-overflow-tooltip />

        

        <el-table-column prop="createTime" label="操作时间" width="180">

          <template #default="scope">

            {{ new Date(scope.row.createTime).toLocaleString() }}

          </template>

        </el-table-column>

      </el-table>

      

      <div v-if="logs.length === 0 && !loading" class="empty-state">

        <i class="fas fa-clipboard-list"></i>

        <p>暂无日志记录</p>

      </div>

    </div>

  </div>

</template>



<style scoped>

.page-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}



.page-header h2 {

  font-size: 1.5rem;

  font-weight: 700;

  color: #1e293b;

  margin: 0;

}



.logs-container {

  background: white;

  border-radius: 8px;

  padding: 24px;

  box-shadow: 0 1px 3px rgba(0,0,0,0.1);

}



.user-cell {

  display: flex;

  align-items: center;

  gap: 8px;

  font-weight: 500;

}



.user-cell i {

  color: #64748b;

}



.empty-state {

  text-align: center;

  padding: 48px;

  color: #94a3b8;

}



.empty-state i {

  font-size: 3rem;

  margin-bottom: 16px;

  opacity: 0.5;

}



.btn-primary {

  background: #4f46e5;

  color: white;

  border: none;

  padding: 8px 16px;

  border-radius: 4px;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

  font-weight: 500;

  transition: all 0.2s;

}



.btn-primary:active {

  transform: scale(0.98);

}



.btn-primary:disabled {

  opacity: 0.7;

  cursor: not-allowed;

}

</style>
