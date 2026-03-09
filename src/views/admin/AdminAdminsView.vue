<script setup lang="ts">

import { ref } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import { useAdminStore, type Admin, type Role } from '@/utils/adminStore'

import { menuGroups } from '@/utils/menuConfig'



const { admins, roles } = useAdminStore()



const activeTab = ref('admins')



// --- Admin Management Logic ---

const adminDialogVisible = ref(false)

const isAdminEdit = ref(false)

const adminForm = ref<Admin>({

    id: 0,

    username: '',

    realName: '',

    password: '',

    role: '', 

    lastLogin: '',

    twoFactorEnabled: false,

    phone: ''

})



// Flatten menuGroups to generate permissions list dynamically

const allPermissions = menuGroups.flatMap(group => 

    group.items.map(item => ({

        label: item.name,

        value: item.name // Using name as permission key for simplicity in this demo

    }))

)



const handleAddAdmin = () => {

    isAdminEdit.value = false

    adminForm.value = { 

        id: 0, 

        username: '', 

        realName: '', 

        password: '', 

        role: roles.value[0]?.name || '普通管理员',

        lastLogin: '-',

        twoFactorEnabled: false,

        phone: ''

    }

    adminDialogVisible.value = true

}



const handleEditAdmin = (row: Admin) => {

    isAdminEdit.value = true

    // Clone to avoid direct mutation

    adminForm.value = { ...row, password: '' } 

    adminDialogVisible.value = true

}



const handleDeleteAdmin = (row: Admin) => {

    ElMessageBox.confirm('确定要删除该管理员吗？', '警告', { type: 'warning' })

        .then(() => {

            const index = admins.value.findIndex(a => a.id === row.id)

            if (index !== -1) {

                admins.value.splice(index, 1)

                ElMessage.success('删除成功')

            }

        })

        .catch(() => {})

}



const saveAdmin = () => {

    if (!adminForm.value.username) return ElMessage.warning('请输入用户名')

    if (!isAdminEdit.value && !adminForm.value.password) return ElMessage.warning('请输入密码')

    if (!adminForm.value.role) return ElMessage.warning('请选择角色')



    if (isAdminEdit.value) {

        const index = admins.value.findIndex(a => a.id === adminForm.value.id)

        if (index !== -1) {

            const updated = { ...adminForm.value }

            if (!updated.password) delete updated.password 

            admins.value[index] = { ...admins.value[index], ...updated }

            ElMessage.success('更新成功')

        }

    } else {

        const newId = Math.max(...admins.value.map(a => a.id), 0) + 1

        const newAdmin = {

            ...adminForm.value,

            id: newId,

            lastLogin: '-',

            createdAt: new Date().toISOString()

        }

        admins.value.push(newAdmin)

        ElMessage.success('创建成功')

    }

    adminDialogVisible.value = false

}



// --- Role Management Logic ---

const roleDialogVisible = ref(false)

const isRoleEdit = ref(false)

const roleForm = ref<Role>({

    id: 0,

    name: '',

    description: '',

    permissions: []

})



const handleAddRole = () => {

    isRoleEdit.value = false

    roleForm.value = { id: 0, name: '', description: '', permissions: [] }

    roleDialogVisible.value = true

}



const handleEditRole = (row: Role) => {

    isRoleEdit.value = true

    roleForm.value = { ...row } // Clone

    roleDialogVisible.value = true

}



const handleDeleteRole = (row: Role) => {

    const isUsed = admins.value.some(a => a.role === row.name)

    if (isUsed) return ElMessage.warning('该角色正在被使用，无法删除')



    ElMessageBox.confirm('确定要删除该角色吗？', '警告', { type: 'warning' })

        .then(() => {

            const index = roles.value.findIndex(r => r.id === row.id)

            if (index !== -1) {

                roles.value.splice(index, 1)

                ElMessage.success('删除成功')

            }

        })

        .catch(() => {})

}



const saveRole = () => {

    if (!roleForm.value.name) return ElMessage.warning('请输入角色名称')



    if (isRoleEdit.value) {

        const index = roles.value.findIndex(r => r.id === roleForm.value.id)

        if (index !== -1) {

            roles.value[index] = { ...roleForm.value }

            ElMessage.success('角色更新成功')

        }

    } else {

        const newId = Math.max(...roles.value.map(r => r.id), 0) + 1

        roles.value.push({ ...roleForm.value, id: newId })

        ElMessage.success('角色创建成功')

    }

    roleDialogVisible.value = false

}

</script>



<template>

  <div class="admin-admins">

    <div class="page-header">

      <h2>权限管理</h2>

    </div>



    <el-tabs v-model="activeTab" type="card" class="demo-tabs">

        <el-tab-pane label="管理员列表" name="admins">

            <div class="tab-content">

                <div class="action-bar">

                    <el-button type="primary" @click="handleAddAdmin">

                        <i class="fas fa-plus" style="margin-right: 8px"></i>添加管理员

                    </el-button>

                </div>

                

                <el-table :data="admins" style="width: 100%" stripe border>

                    <el-table-column prop="id" label="ID" width="80" />

                    <el-table-column prop="username" label="用户名" />

                    <el-table-column prop="realName" label="真实姓名" />

                    <el-table-column prop="role" label="角色">

                        <template #default="scope">
                            <el-tag :type="scope.row.role === '超级管理员' ? 'danger' : 'success'">
                                {{ scope.row.role }}
                            </el-tag>
                        </template>

                    </el-table-column>

                    <el-table-column prop="lastLogin" label="最后登录时间" />

                    <el-table-column label="操作" width="200" align="center">

                        <template #default="scope">

                            <el-button size="small" @click="handleEditAdmin(scope.row)">编辑</el-button>

                            <el-button size="small" type="danger" @click="handleDeleteAdmin(scope.row)" :disabled="scope.row.id === 1">删除</el-button>

                        </template>

                    </el-table-column>

                </el-table>

            </div>

        </el-tab-pane>



        <el-tab-pane label="角色管理" name="roles">

            <div class="tab-content">

                <div class="action-bar">

                    <el-button type="primary" @click="handleAddRole">

                        <i class="fas fa-plus" style="margin-right: 8px"></i>新建角色

                    </el-button>

                </div>



                <el-table :data="roles" style="width: 100%" stripe border>

                    <el-table-column prop="id" label="ID" width="80" />

                    <el-table-column prop="name" label="角色名称" width="180" />

                    <el-table-column prop="description" label="角色描述" />

                    <el-table-column label="权限配置">

                        <template #default="scope">

                            <div class="permission-tags">

                                <el-tag v-for="p in scope.row.permissions" :key="p" size="small" type="info" style="margin-right: 4px;">

                                    {{ p === 'all' ? '全部权限' : p }}

                                </el-tag>

                            </div>

                        </template>

                    </el-table-column>

                    <el-table-column label="操作" width="200" align="center">

                        <template #default="scope">

                            <el-button size="small" @click="handleEditRole(scope.row)">编辑</el-button>

                            <el-button size="small" type="danger" @click="handleDeleteRole(scope.row)" :disabled="scope.row.id === 1">删除</el-button>

                        </template>

                    </el-table-column>

                </el-table>

            </div>

        </el-tab-pane>

    </el-tabs>



    <el-dialog v-model="adminDialogVisible" :title="isAdminEdit ? '编辑管理员' : '添加管理员'" width="500px">

        <el-form :model="adminForm" label-width="100px">

            <el-form-item label="用户名" required>

                <el-input v-model="adminForm.username" placeholder="登录账号" />

            </el-form-item>

            <el-form-item label="真实姓名">

                <el-input v-model="adminForm.realName" placeholder="员工姓名" />

            </el-form-item>

            <el-form-item label="密码" :required="!isAdminEdit">

                <el-input v-model="adminForm.password" type="password" show-password placeholder="***********" />

            </el-form-item>

            <el-form-item label="角色" required>

                <el-select v-model="adminForm.role" placeholder="选择角色">

                    <el-option v-for="r in roles" :key="r.id" :label="r.name" :value="r.name" />

                </el-select>

            </el-form-item>

            <el-divider content-position="left">安全设置</el-divider>

            <el-form-item label="双重验证 (2FA)">

                <el-switch v-model="adminForm.twoFactorEnabled" active-text="开启手机验证码验证" />

            </el-form-item>

            <el-form-item label="手机号码" v-if="adminForm.twoFactorEnabled">

                <el-input v-model="adminForm.phone" placeholder="用于接收 2FA 验证" />

            </el-form-item>

        </el-form>

        <template #footer>

            <span class="dialog-footer">

                <el-button @click="adminDialogVisible = false">取消</el-button>

                <el-button type="primary" @click="saveAdmin">确认保存</el-button>

            </span>

        </template>

    </el-dialog>



    <el-dialog v-model="roleDialogVisible" :title="isRoleEdit ? '编辑角色' : '新建角色'" width="600px">

        <el-form :model="roleForm" label-width="100px">

            <el-form-item label="角色名称" required>

                <el-input v-model="roleForm.name" placeholder="例如：内容运营专员" />

            </el-form-item>

            <el-form-item label="角色描述">

                <el-input v-model="roleForm.description" type="textarea" placeholder="该角色的主要职责说明" />

            </el-form-item>

            <el-form-item label="权限配置">

                <el-select v-model="roleForm.permissions" multiple placeholder="请选择权限" style="width: 100%">

                    <el-option label="全部权限 (Super Admin)" value="all" />

                    <el-option v-for="perm in allPermissions" :key="perm.value" :label="perm.label" :value="perm.value" />

                </el-select>

            </el-form-item>

        </el-form>

        <template #footer>

            <span class="dialog-footer">

                <el-button @click="roleDialogVisible = false">取消</el-button>

                <el-button type="primary" @click="saveRole">确认保存</el-button>

            </span>

        </template>

    </el-dialog>



  </div>

</template>



<style scoped>

.page-header {

    margin-bottom: 24px;

}

.page-header h2 {

    font-size: 1.5rem;

    font-weight: 700;

    color: #1e293b;

    margin: 0;

}

.tab-content {

    background: white;

    padding: 24px;

    border-radius: 0 0 8px 8px;

    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

    min-height: 500px;

}

:deep(.el-tabs__header) {

    margin-bottom: 0;

}

:deep(.el-tabs__content) {

    overflow: visible;

}

.action-bar {

    margin-bottom: 20px;

    display: flex;

    justify-content: flex-end;

}

.permission-tags {

    display: flex;

    flex-wrap: wrap;

    gap: 4px;

}

:deep(.el-button > span) {

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 4px; 

}

:deep(.el-button i) {

    margin-right: 0 !important;

    line-height: 1;

    position: relative;

    top: 1px;

}

</style>