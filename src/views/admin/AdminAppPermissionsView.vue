<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import { Plus, Edit, Delete, User } from '@element-plus/icons-vue'



interface AppPermission {

  id?: number

  userId: number

  appKey: string

  permissionLevel: 'basic' | 'advanced' | 'enterprise'

  quotaLimit: number

  quotaUsed: number

  expireAt: string | null

  isActive: boolean

  username?: string // Virtual property for UI

}



interface Application {

  appKey: string

  name: string

}



interface ConsoleUser {

  id: number

  username: string

}



const permissions = ref<AppPermission[]>([])

const apps = ref<Application[]>([])

const users = ref<ConsoleUser[]>([])

const loading = ref(false)

const dialogVisible = ref(false)

const isEdit = ref(false)



const form = ref<AppPermission>({

  userId: 0,

  appKey: '',

  permissionLevel: 'basic',

  quotaLimit: 0,

  quotaUsed: 0,

  expireAt: null,

  isActive: true

})



const fetchPermissions = async () => {

  loading.value = true

  try {

    const res = await fetch('/api/app-permissions')

    if (res.ok) permissions.value = await res.json()

  } catch (e) {

    ElMessage.error('获取权限列表失败')

  } finally {

    loading.value = false

  }

}



const fetchDependencies = async () => {

  try {

    const [appsRes, usersRes] = await Promise.all([

      fetch('/api/applications/public'),

      fetch('/api/users') // Assuming this endpoint returns console users

    ])

    if (appsRes.ok) apps.value = await appsRes.json()

    if (usersRes.ok) users.value = await usersRes.json()

  } catch (e) {

    console.error('Failed to fetch dependencies', e)

  }

}



const handleAdd = () => {

  isEdit.value = false

  form.value = {

    userId: users.value[0]?.id || 0,

    appKey: apps.value[0]?.appKey || '',

    permissionLevel: 'basic',

    quotaLimit: 0,

    quotaUsed: 0,

    expireAt: null,

    isActive: true

  }

  dialogVisible.value = true

}



const handleEdit = (row: AppPermission) => {

  isEdit.value = true

  form.value = { ...row }

  dialogVisible.value = true

}



const handleDelete = async (row: AppPermission) => {

  try {

    await ElMessageBox.confirm('确定取消该用户的权限吗？', '警告', { type: 'warning' })

    const res = await fetch(`/api/app-permissions/${row.id}`, { method: 'DELETE' })

    if (res.ok) {

      ElMessage.success('操作成功')

      fetchPermissions()

    }

  } catch (e) {}

}



const save = async () => {

  try {

    const res = await fetch('/api/app-permissions', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify(form.value)

    })

    if (res.ok) {

      ElMessage.success('保存成功')

      dialogVisible.value = false

      fetchPermissions()

    }

  } catch (e) {

    ElMessage.error('保存失败')

  }

}



onMounted(() => {

  fetchPermissions()

  fetchDependencies()

})

</script>



<template>

  <div class="admin-permissions">

    <div class="page-header">

      <div class="header-info">

        <h2>应用权限分发</h2>

        <p class="sub-title">管理用户对各个子系统的访问授权与额度限制</p>

      </div>

      <el-button type="primary" :icon="Plus" @click="handleAdd">分配新权限</el-button>

    </div>



    <el-card shadow="never" class="table-card">

      <el-table :data="permissions" v-loading="loading" stripe border>

        <el-table-column label="用户">

          <template #default="scope">

            <div class="user-cell">

              <el-avatar :size="24" :icon="User" />

              <span class="username">UID: {{ scope.row.userId }}</span>

            </div>

          </template>

        </el-table-column>

        <el-table-column prop="appKey" label="应用标识" width="120" />

        <el-table-column label="应用名称" min-width="150">

           <template #default="scope">

             {{ apps.find(a => a.appKey === scope.row.appKey)?.name || scope.row.appKey }}

           </template>

        </el-table-column>

        <el-table-column prop="permissionLevel" label="权限等级" width="120">

          <template #default="scope">

            <el-tag :type="scope.row.permissionLevel === 'enterprise' ? 'danger' : (scope.row.permissionLevel === 'advanced' ? 'warning' : 'info')">

              {{ scope.row.permissionLevel }}

            </el-tag>

          </template>

        </el-table-column>

        <el-table-column label="使用情况" width="200">

           <template #default="scope">

             <div class="usage-stat">

               <el-progress 

                :percentage="scope.row.quotaLimit > 0 ? (scope.row.quotaUsed / scope.row.quotaLimit * 100) : 0" 

                :status="scope.row.quotaLimit > 0 && scope.row.quotaUsed >= scope.row.quotaLimit ? 'exception' : ''"

               />

               <span class="quota-text">{{ scope.row.quotaUsed }} / {{ scope.row.quotaLimit === 0 ? '无限制' : scope.row.quotaLimit }}</span>

             </div>

           </template>

        </el-table-column>

        <el-table-column prop="isActive" label="状态" width="100">

          <template #default="scope">

            <el-tag :type="scope.row.isActive ? 'success' : 'info'">

              {{ scope.row.isActive ? '生效中' : '已禁用' }}

            </el-tag>

          </template>

        </el-table-column>

        <el-table-column label="操作" width="180" fixed="right">

          <template #default="scope">

            <el-button size="small" :icon="Edit" @click="handleEdit(scope.row)">调整</el-button>

            <el-button size="small" type="danger" :icon="Delete" @click="handleDelete(scope.row)">收回</el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-card>



    <el-dialog v-model="dialogVisible" :title="isEdit ? '调整权限' : '分配权限'" width="500px">

      <el-form :model="form" label-width="100px" label-position="left">

        <el-form-item label="选择用户">

          <el-select v-model="form.userId" filterable placeholder="选择或搜索用户" style="width: 100%" :disabled="isEdit">

            <el-option v-for="user in users" :key="user.id" :label="user.username" :value="user.id">

              <span style="float: left">{{ user.username }}</span>

              <span style="float: right; color: #8492a6; font-size: 13px">ID: {{ user.id }}</span>

            </el-option>

          </el-select>

        </el-form-item>

        <el-form-item label="授予应用">

          <el-select v-model="form.appKey" placeholder="请选择应用" style="width: 100%" :disabled="isEdit">

            <el-option v-for="app in apps" :key="app.appKey" :label="app.name" :value="app.appKey" />

          </el-select>

        </el-form-item>

        <el-form-item label="权限等级">

          <el-radio-group v-model="form.permissionLevel">

            <el-radio label="basic">基础版</el-radio>
            <el-radio label="advanced">专业版</el-radio>
            <el-radio label="enterprise">旗舰版</el-radio>

          </el-radio-group>

        </el-form-item>

        <el-form-item label="额度限制">

          <el-input-number v-model="form.quotaLimit" :min="0" />

          <span class="tip">(0表示无限)</span>

        </el-form-item>

        <el-form-item label="有效期至">

          <el-date-picker v-model="form.expireAt" type="datetime" placeholder="不限时间" style="width: 100%" value-format="YYYY-MM-DD HH:mm:ss" />

        </el-form-item>

        <el-form-item label="状态">

          <el-switch v-model="form.isActive" active-text="生效" inactive-text="锁定" />

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button @click="dialogVisible = false">取消</el-button>

        <el-button type="primary" @click="save">确认分配</el-button>

      </template>

    </el-dialog>

  </div>

</template>



<style scoped>

.admin-permissions {

  padding: 0;

}

.page-header {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}

.sub-title {

  color: #64748b;

  font-size: 0.9rem;

  margin: 4px 0 0 0;

}

.table-card {

  border-radius: 12px;

}

.user-cell {

  display: flex;

  align-items: center;

  gap: 8px;

}

.username {

  font-weight: 600;

  color: #1e293b;

}

.usage-stat {

  display: flex;

  flex-direction: column;

  gap: 4px;

}

.quota-text {

  font-size: 11px;

  color: #94a3b8;

}

.tip {

  margin-left: 12px;

  font-size: 12px;

  color: #94a3b8;

}

</style>