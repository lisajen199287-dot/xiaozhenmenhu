<script setup lang="ts">

import { ref, onMounted, computed } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'

import { Plus, OfficeBuilding, Search } from '@element-plus/icons-vue'



interface Organization {

  id: number

  name: string

  code: string

  contactPerson: string

  contactPhone: string

  status: string

  address?: string

  description?: string

}



interface User {

  id: number

  userNo?: string

  username: string

  email: string

  phone: string

  role: string

  isActive: boolean

  orgId: number | null

  companyName: string

  createdAt: string

  balance?: number

  computePoints?: number

  wechatOpenId?: string

  password?: string

}



const activeTab = ref('users')

const users = ref<User[]>([])

const orgs = ref<Organization[]>([])

const loading = ref(false)



// Search

const userSearch = ref('')

const orgSearch = ref('')



const filteredUsers = computed(() => {

    const q = userSearch.value.trim().toLowerCase()

    if (!q) return users.value

    return users.value.filter(u =>

        u.username.toLowerCase().includes(q) ||

        u.email.toLowerCase().includes(q) ||

        (u.phone || '').includes(q) ||

        (u.userNo || '').toLowerCase().includes(q)

    )

})



const filteredOrgs = computed(() => {

    const q = orgSearch.value.trim().toLowerCase()

    if (!q) return orgs.value

    return orgs.value.filter(o =>

        o.name.toLowerCase().includes(q) ||

        (o.code || '').toLowerCase().includes(q) ||

        (o.contactPerson || '').toLowerCase().includes(q)

    )

})



// User Dialog State

const userDialogVisible = ref(false)

const isUserEdit = ref(false)

const userForm = ref<User>({

  id: 0, username: '', email: '', phone: '', role: 'user',

  isActive: true, orgId: null, companyName: '', createdAt: '', balance: 0, wechatOpenId: '', password: ''

})



// User Logs State

const userLogsVisible = ref(false)

const userLogs = ref<any[]>([])

const currentUserForLogs = ref<User | null>(null)



const handleViewLogs = async (row: User) => {

    currentUserForLogs.value = row

    userLogs.value = []

    userLogsVisible.value = true

    try {

        const res = await fetch(`/api/console-users/${row.id}/logs`)

        if (res.ok) userLogs.value = await res.json()

    } catch (e) {

        ElMessage.error('获取日志记录失败')

    }

}



// Compute Points State

const pointLogsVisible = ref(false)

const pointLogs = ref<any[]>([])

const chargeDialogVisible = ref(false)

const chargeForm = ref({
    userId: 0,
    username: '',
    amount: 100,
    description: '管理员充值'
})



const handleViewPointLogs = async (row: User) => {

    currentUserForLogs.value = row

    pointLogs.value = []

    pointLogsVisible.value = true

    try {

        const res = await fetch(`/api/console-users/${row.id}/compute-points-logs`)

        if (res.ok) pointLogs.value = await res.json()

    } catch (e) {

        ElMessage.error('获取算力日志失败')

    }

}



const handleChargePoints = (row: User) => {

    chargeForm.value = {

        userId: row.id,

        username: row.username,

        amount: 100,
        description: '管理员充值'
    }

    chargeDialogVisible.value = true

}



const submitCharge = async () => {

    try {

        const res = await fetch(`/api/console-users/${chargeForm.value.userId}/compute-points`, {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({

                amount: chargeForm.value.amount,

                description: chargeForm.value.description

            })

        })

        if (res.ok) {
            ElMessage.success('充值成功')
            chargeDialogVisible.value = false
            fetchUsers()
        } else {
            const err = await res.json().catch(() => ({}));
            ElMessage.error('充值失败: ' + (err.error || err.message || '服务器内部错误'))
        }
    } catch (e) {
        ElMessage.error('网络请求失败')
    }

}



// Org Dialog State

const orgDialogVisible = ref(false)

const isOrgEdit = ref(false)

const orgForm = ref<Organization>({

  id: 0, name: '', code: '', contactPerson: '', contactPhone: '', status: 'active', address: '', description: ''

})



const fetchUsers = async () => {

    loading.value = true

    try {

        const res = await fetch('/api/console-users')

        if (res.ok) users.value = await res.json()

    } catch (e) {

        ElMessage.error('获取用户列表失败')

    } finally { loading.value = false }

}



const fetchOrgs = async () => {

    loading.value = true

    try {

        const res = await fetch('/api/organizations')

        if (res.ok) orgs.value = await res.json()

    } catch (e) {

        ElMessage.error('获取机构列表失败')

    } finally { loading.value = false }

}



onMounted(() => { fetchUsers(); fetchOrgs() })



const getOrgName = (orgId: number | null) => {

    if (!orgId) return '个人主体'

    const org = orgs.value.find(o => o.id === orgId)

    return org ? org.name : '未知机构'

}



// User Actions

const handleAddUser = () => {

    isUserEdit.value = false

    userForm.value = { id: 0, username: '', email: '', phone: '', role: 'user', isActive: true, orgId: null, companyName: '', createdAt: '', balance: 0, wechatOpenId: '', password: '' }

    userDialogVisible.value = true

}



const handleEditUser = (row: User) => {

    isUserEdit.value = true

    userForm.value = { ...row, password: '' }

    userDialogVisible.value = true

}



const saveUser = async () => {

    if (!userForm.value.username || !userForm.value.email) return ElMessage.warning('请填写必填项')

    const method = isUserEdit.value ? 'PUT' : 'POST'

    const url = isUserEdit.value ? `/api/console-users/${userForm.value.id}` : '/api/console-users'

    try {

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userForm.value) })

        if (res.ok) { ElMessage.success('用户保存成功'); userDialogVisible.value = false; fetchUsers() }
        else {
            const err = await res.json().catch(() => ({}));
            ElMessage.error('保存失败: ' + (err.error || err.message || '服务器错误'))
        }
    } catch (e) { ElMessage.error('请求失败') }

}



const toggleUserStatus = async (user: User) => {

    const action = user.isActive ? '禁用' : '启用'

    const confirmMsg = user.isActive
        ? `确定要禁用账号「${user.username}」吗？禁用后该用户将无法登录。`
        : `确定要启用账号「${user.username}」吗？`

    try {

        await ElMessageBox.confirm(confirmMsg, `确认${action}账号`, {

            type: user.isActive ? 'warning' : 'info',

            confirmButtonText: `确认${action}`,

            cancelButtonText: '取消'

        })

        const updatedUser = { ...user, isActive: !user.isActive }
        const res = await fetch(`/api/console-users/${user.id}`, {
            method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(updatedUser)
        })
        if (res.ok) { ElMessage.success(`账号已${action}`); fetchUsers() }

    } catch (e) { /* cancelled */ }

}



// Org Actions

const handleAddOrg = () => {

    isOrgEdit.value = false

    orgForm.value = { id: 0, name: '', code: '', contactPerson: '', contactPhone: '', status: 'active', address: '', description: '' }

    orgDialogVisible.value = true

}



const handleEditOrg = (row: Organization) => {

    isOrgEdit.value = true

    orgForm.value = { ...row }

    orgDialogVisible.value = true

}



const saveOrg = async () => {

    if (!orgForm.value.name) return ElMessage.warning('请填写公司名称')

    const method = isOrgEdit.value ? 'PUT' : 'POST'

    const url = isOrgEdit.value ? `/api/organizations/${orgForm.value.id}` : '/api/organizations'

    try {

        const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orgForm.value) })

        if (res.ok) { ElMessage.success('机构保存成功'); orgDialogVisible.value = false; fetchOrgs() }
        else {
            const err = await res.json().catch(() => ({}));
            ElMessage.error('保存失败: ' + (err.error || err.message || '服务器错误'))
        }
    } catch (e) { ElMessage.error('请求失败') }

}



const getRoleLabel = (role: string) => {
    const map: any = { 'enterprise': '企业子账号', 'vip': '高级会员', 'user': '普通用户' }
    return map[role] || role
}

</script>



<template>

  <div class="users-admin">

    <div class="page-header">
      <div class="header-info">
        <h2>用户体系管理</h2>
        <p class="sub-title">维护前台用户账户及所属机构主体关系</p>
      </div>
    </div>



    <el-tabs v-model="activeTab" type="card">

      <!-- Tab 1: Users -->

      <el-tab-pane label="前台用户" name="users">

        <div class="tab-toolbar">

          <div class="toolbar-left">

            <el-button type="primary" @click="handleAddUser"><el-icon><Plus /></el-icon>添加用户</el-button>

          </div>

          <div class="toolbar-right">

            <el-input
              v-model="userSearch"
              placeholder="搜索用户 ID / 用户名 / 邮箱 / 手机号"
              :prefix-icon="Search"
              clearable
              style="width: 280px"
            />

            <span class="count-tip">共 {{ users.length }} 名注册用户</span>

          </div>

        </div>



        <div class="admin-table-container">

          <el-table :data="filteredUsers" v-loading="loading" border stripe>
            <el-table-column label="用户 ID" width="130">

              <template #default="{ row }">

                <span class="user-no">{{ row.userNo || '-' }}</span>

              </template>

            </el-table-column>

            <el-table-column label="账号信息" min-width="180">

              <template #default="{ row }">

                <div class="user-meta">

                  <div class="user-name">{{ row.username }}</div>

                  <div class="user-sub"><i class="fas fa-mobile-alt"></i> {{ row.phone || '-' }}</div>

                </div>

              </template>

            </el-table-column>

            <el-table-column label="组织 / 角色" width="200">

              <template #default="{ row }">

                <div class="org-line">

                  <el-icon><OfficeBuilding /></el-icon>

                  <span :class="row.orgId ? 'org-name-linked' : 'org-name-none'">{{ getOrgName(row.orgId) }}</span>

                </div>

                <span class="role-pill">{{ getRoleLabel(row.role) }}</span>

              </template>

            </el-table-column>

            <el-table-column label="算力额度" width="110" align="left">

              <template #default="{ row }">

                <el-tag effect="dark" type="success" style="font-weight: bold;">{{ row.computePoints || 0 }}</el-tag>

              </template>

            </el-table-column>

            <el-table-column label="注册时间" width="120">

              <template #default="{ row }">

                <span class="date-val">{{ row.createdAt ? new Date(row.createdAt).toLocaleDateString('zh-CN') : '-' }}</span>

              </template>

            </el-table-column>

            <el-table-column label="账号状态" width="100" align="center">

              <template #default="{ row }">

                <span class="status-pill" :class="row.isActive ? 'status-on' : 'status-off'">

                  <i class="status-dot"></i>{{ row.isActive ? '正常' : '禁用' }}

                </span>

              </template>

            </el-table-column>

            <el-table-column label="操作" width="280" align="center" fixed="right">

              <template #default="{ row }">

                <div class="action-btns">

                  <button class="act-btn act-weak" @click="handleViewLogs(row)">日志</button>

                  <button class="act-btn act-weak" @click="handleViewPointLogs(row)">算力</button>

                  <button class="act-btn act-weak" @click="handleChargePoints(row)">充值</button>

                  <button class="act-btn act-primary" @click="handleEditUser(row)">编辑</button>

                </div>

              </template>

            </el-table-column>

          </el-table>

          <div v-if="filteredUsers.length === 0 && !loading" class="empty-hint">未找到匹配的用户</div>

        </div>

      </el-tab-pane>



      <!-- Tab 2: Organizations -->

      <el-tab-pane label="公司/机构主体" name="orgs">

        <div class="tab-toolbar">

          <div class="toolbar-left">

            <el-button type="primary" @click="handleAddOrg"><el-icon><Plus /></el-icon>添加机构</el-button>

          </div>

          <div class="toolbar-right">

            <el-input

              v-model="orgSearch"

              placeholder="搜索公司名称 / 识别码 / 联系人"

              :prefix-icon="Search"

              clearable

              style="width: 280px"

            />

            <span class="count-tip">共 {{ orgs.length }} 个机构主体</span>

          </div>

        </div>



        <div class="admin-table-container">

          <el-table :data="filteredOrgs" v-loading="loading" border stripe>

            <el-table-column prop="id" label="ID" width="70" />

            <el-table-column prop="name" label="公司名称" min-width="200" />

            <el-table-column prop="code" label="识别码/税号" width="190" />

            <el-table-column label="联系人" width="160">

              <template #default="{ row }">

                <div class="user-name" style="font-size:13px">{{ row.contactPerson }}</div>

                <div class="user-sub">{{ row.contactPhone }}</div>

              </template>

            </el-table-column>

            <el-table-column label="状态" width="100" align="center">

              <template #default="{ row }">

                <span class="status-pill" :class="row.status === 'active' ? 'status-on' : 'status-off'">

                  <i class="status-dot"></i>{{ row.status === 'active' ? '正常' : '暂停' }}

                </span>

              </template>

            </el-table-column>

            <el-table-column label="操作" width="120" align="center">

              <template #default="{ row }">

                <div class="action-btns">

                  <button class="act-btn act-primary" @click="handleEditOrg(row)">编辑</button>

                </div>

              </template>

            </el-table-column>

          </el-table>

          <div v-if="filteredOrgs.length === 0 && !loading" class="empty-hint">未找到匹配的机构</div>

        </div>

      </el-tab-pane>

    </el-tabs>



    <!-- User Dialog -->

    <el-dialog v-model="userDialogVisible" :title="isUserEdit ? '编辑用户' : '添加新用户'" width="560px">

      <div v-if="isUserEdit && userForm.userNo" class="dialog-user-no">
        <span class="user-no-label">用户 ID</span>
        <span class="user-no-value">{{ userForm.userNo }}</span>

        <span class="user-no-tip">可将此用户号提供给用户，用于便捷查询账号</span>

      </div>

      <el-form :model="userForm" label-width="90px">
        <el-form-item label="用户名" required><el-input v-model="userForm.username" /></el-form-item>

        <el-form-item label="邮箱" required><el-input v-model="userForm.email" /></el-form-item>

        <el-form-item label="手机号"><el-input v-model="userForm.phone" /></el-form-item>

        <el-form-item label="密码"><el-input v-model="userForm.password" type="password" show-password placeholder="不重置请留空" /></el-form-item>

        <el-form-item label="微信 OpenID">

          <el-input v-model="userForm.wechatOpenId" placeholder="微信扫码后自动写入，也可手动填写" />

        </el-form-item>

        <el-divider />

        <el-form-item label="账户余额 (¥)">

          <el-input-number v-model="userForm.balance" :precision="2" :step="10" :min="0" style="width: 200px" />

        </el-form-item>

        <el-divider />

        <el-form-item label="角色体系">

          <el-radio-group v-model="userForm.role">

            <el-radio-button label="user">个人</el-radio-button>

            <el-radio-button label="vip">会员</el-radio-button>

            <el-radio-button label="enterprise">子账号</el-radio-button>

          </el-radio-group>

        </el-form-item>

        <el-form-item label="关联机构">

          <el-select v-model="userForm.orgId" clearable placeholder="选择所属主体" style="width: 100%">

            <el-option v-for="org in orgs" :key="org.id" :label="org.name" :value="org.id" />

          </el-select>

        </el-form-item>

        <template v-if="isUserEdit">

          <el-divider />

          <el-form-item label="账号状态">

            <div class="status-action-row">

              <span class="status-pill" :class="userForm.isActive ? 'status-on' : 'status-off'" style="margin-right:16px">
                <i class="status-dot"></i>{{ userForm.isActive ? '正常使用' : '已禁用' }}
              </span>

              <el-button v-if="userForm.isActive" size="small" plain @click="toggleUserStatus(userForm); userDialogVisible = false">

                禁用此账号

              </el-button>

              <el-button v-else type="primary" size="small" plain @click="toggleUserStatus(userForm); userDialogVisible = false">

                恢复启用

              </el-button>

            </div>

          </el-form-item>

        </template>

      </el-form>

      <template #footer>

        <el-button @click="userDialogVisible = false">取消</el-button>

        <el-button type="primary" @click="saveUser">确定保存</el-button>

      </template>

    </el-dialog>



    <!-- Org Dialog -->

    <el-dialog v-model="orgDialogVisible" :title="isOrgEdit ? '编辑机构' : '添加新机构'" width="550px">

      <el-form :model="orgForm" label-width="100px">

        <el-form-item label="公司名称" required><el-input v-model="orgForm.name" /></el-form-item>

        <el-form-item label="唯一识别码"><el-input v-model="orgForm.code" placeholder="如：统一社会信用代码" /></el-form-item>

        <el-row :gutter="20">

          <el-col :span="12"><el-form-item label="联系人"><el-input v-model="orgForm.contactPerson" /></el-form-item></el-col>

          <el-col :span="12"><el-form-item label="联系电话"><el-input v-model="orgForm.contactPhone" /></el-form-item></el-col>

        </el-row>

        <el-form-item label="办公地址"><el-input v-model="orgForm.address" type="textarea" /></el-form-item>

        <el-form-item label="主体状态">

          <el-select v-model="orgForm.status" style="width: 100%">

            <el-option label="正常合作 (Active)" value="active" />

            <el-option label="停止服务 (Inactive)" value="inactive" />

          </el-select>

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button @click="orgDialogVisible = false">取消</el-button>

        <el-button type="primary" @click="saveOrg">确定保存</el-button>

      </template>

    </el-dialog>



    <!-- User Logs Dialog -->

    <!-- User Logs Dialog -->

    <el-dialog v-model="userLogsVisible" :title="'操作日志: ' + (currentUserForLogs?.username || '')" width="700px">

      <el-table :data="userLogs" stripe border max-height="400">

        <el-table-column prop="action" label="操作类型" width="160" />

        <el-table-column prop="detail" label="详情" min-width="200" />

        <el-table-column prop="ipAddress" label="IP 地址" width="140" />

        <el-table-column label="时间" width="180">

          <template #default="{ row }">{{ new Date(row.createTime).toLocaleString() }}</template>

        </el-table-column>

      </el-table>

      <template #footer>

        <el-button @click="userLogsVisible = false">关闭</el-button>

      </template>

    </el-dialog>



    <!-- Compute Point Logs Drawer -->

    <el-drawer v-model="pointLogsVisible" :title="`算力变动明细 - ${currentUserForLogs?.username}`" size="600px">

      <el-table :data="pointLogs" stripe>

        <el-table-column prop="createdAt" label="时间" width="180">

          <template #default="{ row }">

            {{ row.createdAt ? new Date(row.createdAt).toLocaleString() : '-' }}

          </template>

        </el-table-column>

        <el-table-column prop="amount" label="变动数量" width="100">

          <template #default="{ row }">

            <span :style="{ color: row.amount >= 0 ? '#10b981' : '#ef4444', fontWeight: 'bold' }">

              {{ row.amount >= 0 ? '+' : '' }}{{ row.amount }}

            </span>

          </template>

        </el-table-column>

        <el-table-column prop="transactionType" label="类型" width="100">

          <template #default="{ row }">

            <el-tag :type="row.transactionType === 'RECHARGE' ? 'success' : 'warning'">

              {{ row.transactionType === 'RECHARGE' ? '充值' : '消费' }}

            </el-tag>

          </template>

        </el-table-column>

        <el-table-column prop="operator" label="操作者" width="100" />

        <el-table-column prop="description" label="备注" />

      </el-table>

    </el-drawer>



    <!-- Charge Points Dialog -->

    <el-dialog v-model="chargeDialogVisible" title="人工充值算力点" width="400px">

      <el-form label-width="100px">

        <el-form-item label="用户">

          <el-input :value="chargeForm.username" disabled />

        </el-form-item>

        <el-form-item label="充值数量">

          <el-input-number v-model="chargeForm.amount" :min="-100000" :max="100000" style="width: 100%" />

        </el-form-item>

        <el-form-item label="备注说明">

          <el-input v-model="chargeForm.description" type="textarea" placeholder="请输入充值原因" />

        </el-form-item>

      </el-form>

      <template #footer>

        <el-button @click="chargeDialogVisible = false">取消</el-button>

        <el-button type="primary" @click="submitCharge">确认充值</el-button>

      </template>

    </el-dialog>

  </div>

</template>



<style scoped>

/* ── Layout ── */

.users-admin { padding: 0; }

.page-header { margin-bottom: 24px; }

.sub-title { color: #94a3b8; font-size: 0.875rem; margin-top: 4px; }



/* ── Toolbar ── */

.tab-toolbar {

  display: flex;

  justify-content: space-between;

  align-items: center;

  padding: 16px 0 12px;

}

.toolbar-left { display: flex; gap: 8px; }

.toolbar-right { display: flex; align-items: center; gap: 14px; }

.count-tip { font-size: 0.82rem; color: #94a3b8; white-space: nowrap; }



/* ── Table ── */

.admin-table-container { border-radius: 8px; overflow: hidden; }

.empty-hint { text-align: center; padding: 32px; color: #94a3b8; font-size: 0.9rem; }



/* ── Cell: User Info ── */

.user-meta { display: flex; flex-direction: column; gap: 3px; }

.user-name { font-weight: 700; color: #1e293b; font-size: 14px; }

.user-sub  { font-size: 12px; color: #94a3b8; }



/* ── Cell: Org / Role ── */

.org-line { display: flex; align-items: center; gap: 6px; font-size: 13px; margin-bottom: 5px; }

.org-name-linked { color: #334155; font-weight: 600; }

.org-name-none   { color: #cbd5e1; }

.role-pill {

  display: inline-block;

  padding: 1px 8px;

  border-radius: 4px;

  font-size: 11px;

  font-weight: 600;

  background: #f1f5f9;

  color: #475569;

  border: 1px solid #e2e8f0;

}



/* ── Status Pill ── */

.status-pill {

  display: inline-flex; align-items: center; gap: 5px;

  padding: 3px 10px; border-radius: 20px; font-size: 12px; font-weight: 600;

}

.status-on  { background: #f0fdf4; color: #15803d; }

.status-off { background: #f8fafc; color: #94a3b8; }

.status-dot {

  width: 6px; height: 6px; border-radius: 50%;

  background: currentColor; flex-shrink: 0;

}



/* ── Action Buttons ── */

.action-btns { display: flex; gap: 6px; justify-content: center; }

.act-btn {

  display: inline-flex; align-items: center;

  padding: 5px 14px; border-radius: 5px;

  font-size: 12px; font-weight: 600; cursor: pointer;

  border: 1px solid #e2e8f0;

  background: #f8fafc; color: #475569;

  transition: all 0.15s;

  white-space: nowrap;

}

.act-btn:hover { background: #f1f5f9; border-color: #cbd5e1; color: #1e293b; }

.act-btn.act-primary { background: #4f46e5; color: #fff; border-color: #4338ca; }

.act-btn.act-primary:hover { background: #4338ca; border-color: #3730a3; transform: translateY(-1px); box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2); }

.act-btn.act-weak { background: transparent; border-color: transparent; color: #64748b; font-weight: 500; }

.act-btn.act-weak:hover { background: #f1f5f9; color: #1e293b; }



/* ── Status Action Row (dialog) ── */

.status-action-row { display: flex; align-items: center; }



/* ── Balance & Date cells ── */

.balance-val { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 13px; font-weight: 700; color: #1e293b; }

.date-val    { font-size: 12px; color: #64748b; }



/* ── User No ── */

.user-no {

  font-family: 'SFMono-Regular', Consolas, monospace;

  font-size: 12px; font-weight: 700; letter-spacing: 0.5px;

  color: #334155;

  background: #f1f5f9;

  padding: 2px 8px; border-radius: 4px;

}

.dialog-user-no {

  display: flex; align-items: center; gap: 10px;

  background: #f8fafc; border: 1px solid #e2e8f0;

  border-radius: 8px; padding: 10px 16px; margin-bottom: 20px;

}

.user-no-label { font-size: 12px; color: #94a3b8; font-weight: 600; }

.user-no-value { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 15px; font-weight: 800; color: #1e293b; letter-spacing: 1px; }

.user-no-tip   { font-size: 11px; color: #94a3b8; margin-left: 4px; }



/* ── Tabs ── */

:deep(.el-tabs__header) { margin-bottom: 0; }

:deep(.el-tabs__content) {

  background: white; padding: 0 20px 20px;

  border: 1px solid #e4e7ed; border-top: none;

  border-radius: 0 0 8px 8px;

  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.04);

}

</style>