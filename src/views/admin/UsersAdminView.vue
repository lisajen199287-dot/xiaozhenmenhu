<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'



interface ConsoleUser {

  id?: number

  email: string

  username: string

  companyName?: string

  industry?: string

  phone?: string

  role: string

  appPermissions?: string

  isActive: boolean

  createdAt?: string

}



const users = ref<ConsoleUser[]>([])

const dialogVisible = ref(false)

const isEdit = ref(false)

const form = ref<ConsoleUser>({

  email: '',

  username: '',

  companyName: '',

  industry: '',

  phone: '',

  role: 'user',

  appPermissions: '{}',
  isActive: true

})



const industries = ['跨境电商', '智能制造', '智慧政务', '金融科技', '教育培训', '医疗健康', '其他']
const roles = [
  { label: '普通用户', value: 'user' },
  { label: 'VIP用户', value: 'vip' },
  { label: '企业用户', value: 'enterprise' }
]



const fetchUsers = async () => {

    try {

        const res = await fetch('/api/console-users')

        if (res.ok) {

            users.value = await res.json()

        }

    } catch (e) {

        console.error(e)

    }

}



const handleAdd = () => {

    isEdit.value = false

    form.value = {

        email: '',

        username: '',

        companyName: '',

        industry: '',

        phone: '',

        role: 'user',

        appPermissions: JSON.stringify({ aigc: true, brain: true, infra: false }),

        isActive: true

    }

    dialogVisible.value = true

}



const handleEdit = (row: ConsoleUser) => {

    isEdit.value = true

    form.value = { ...row }

    dialogVisible.value = true

}



const handleDelete = async (row: ConsoleUser) => {

    try {

        await ElMessageBox.confirm('确定删除该用户吗？', '警告', { type: 'warning' })

        const res = await fetch(`/api/console-users/${row.id}`, { method: 'DELETE' })

        if (res.ok) {

            ElMessage.success('删除成功')

            fetchUsers()

        } else {

            ElMessage.error('删除失败')

        }

    } catch (e) {

        // User cancelled

    }

}



const save = async () => {

    const url = isEdit.value ? `/api/console-users/${form.value.id}` : '/api/console-users'

    const method = isEdit.value ? 'PUT' : 'POST'

    

    if (!form.value.email || !form.value.username) {

        return ElMessage.warning('邮箱和用户名必填')

    }



    try {

        const res = await fetch(url, {

            method,

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(form.value)

        })

        if (res.ok) {

            ElMessage.success('保存成功')

            dialogVisible.value = false

            fetchUsers()

        } else {

            ElMessage.error('操作失败')

        }

    } catch (e) {

        ElMessage.error('网络错误')

    }

}



onMounted(() => {

    fetchUsers()

})

</script>



<template>

  <div class="admin-users">

    <div class="page-header">

      <h2>前台用户管理</h2>

      <el-button type="primary" @click="handleAdd">添加用户</el-button>

    </div>



    <div class="table-container">

      <el-table :data="users" style="width: 100%">

        <el-table-column prop="id" label="UID" width="80" />

        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" width="200" />
        <el-table-column prop="companyName" label="企业名称" width="150" />
        <el-table-column prop="industry" label="行业" width="120" />
        <el-table-column prop="phone" label="手机号" width="120" />

        <el-table-column prop="role" label="角色权限" width="120">

            <template #default="scope">

                <el-tag v-if="scope.row.role === 'enterprise'" type="danger">企业用户</el-tag>

                <el-tag v-else-if="scope.row.role === 'vip'" type="warning">VIP</el-tag>

                <el-tag v-else type="info">普通用户</el-tag>

            </template>

        </el-table-column>

        <el-table-column prop="isActive" label="账号状态" width="100">

            <template #default="scope">

                <el-tag :type="scope.row.isActive ? 'success' : ''">

                    {{ scope.row.isActive ? '启用' : '禁用' }}

                </el-tag>

            </template>

        </el-table-column>

        <el-table-column label="操作" width="180">

            <template #default="scope">

                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>

            </template>

        </el-table-column>

      </el-table>

    </div>



    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑用户' : '添加用户'" width="600px">

        <el-form label-width="100px">

            <el-form-item label="邮箱">

                <el-input v-model="form.email" placeholder="user@example.com" />

            </el-form-item>

            <el-form-item label="用户名">
                <el-input v-model="form.username" />
            </el-form-item>

            <el-form-item label="企业名称">

                <el-input v-model="form.companyName" />

            </el-form-item>

            <el-form-item label="所属行业">

                <el-select v-model="form.industry" placeholder="请选择">

                    <el-option v-for="ind in industries" :key="ind" :label="ind" :value="ind" />

                </el-select>

            </el-form-item>

            <el-form-item label="手机号">

                <el-input v-model="form.phone" />

            </el-form-item>

            <el-form-item label="角色权限">

                <el-select v-model="form.role">

                    <el-option v-for="r in roles" :key="r.value" :label="r.label" :value="r.value" />

                </el-select>

            </el-form-item>

            <el-form-item label="账号状态">

                <el-switch v-model="form.isActive" active-text="启用" inactive-text="禁用" />

            </el-form-item>

        </el-form>

        <template #footer>

            <span class="dialog-footer">

                <el-button @click="dialogVisible = false">取消</el-button>

                <el-button type="primary" @click="save">保存</el-button>

            </span>

        </template>

    </el-dialog>

  </div>

</template>



<style scoped>

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;

}

.table-container {

    background: white;

    padding: 20px;

    border-radius: 8px;

    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

}

</style>