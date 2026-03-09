<script setup lang="ts">

import { ref, onMounted, onUnmounted } from 'vue'

import { useRouter } from 'vue-router'

import { useUser } from '@/utils/userStore'

import NavBar from '@/components/NavBar.vue'



// Types

interface AppPermission {

  appKey: string; permissionLevel: string; quotaLimit: number; quotaUsed: number; expireAt: string

}

interface Application {

  appKey: string; name: string; description: string; icon: string; url: string; ssoEnabled: boolean; customDomain: string

}

interface AppOrder {

  id: number; orderNo: string; appKey: string; planKey: string; amount: number; status: string; createdAt: string; quotaAmount: number

}

interface ApiKey {

  id: number; name: string; apiKey: string; status: string; createdAt: string

}

interface SupportTicket {

  id: number; ticketId: string; subject: string; content: string; category: string; priority: string; status: string; adminReply: string; createdAt: string

}



// State
const { user, isLoggedIn, logout } = useUser()
const router = useRouter()
const activeTab = ref('overview')
const loading = ref(true)

const userApps = ref<(Application & AppPermission)[]>([])
const userOrders = ref<AppOrder[]>([])
const apiKeys = ref<ApiKey[]>([])
const tickets = ref<SupportTicket[]>([])

const showCreateTicket = ref(false)
const newTicket = ref({ subject: '', content: '', category: '技术支持', priority: '' })
const selectedTicket = ref<SupportTicket | null>(null)
const showTicketDetail = ref(false)

// Sidebar Navigation Items
const menuItems = [
  { id: 'overview', name: '控制台概览', icon: 'fas fa-chart-pie' },
  { id: 'apps', name: '我的应用', icon: 'fas fa-cubes' },
  { id: 'api', name: 'API 管理', icon: 'fas fa-key' },
  { id: 'billing', name: '费用中心', icon: 'fas fa-wallet' },
  { id: 'support', name: '工单支持', icon: 'fas fa-headset' },
  { id: 'settings', name: '账号设置', icon: 'fas fa-cog' }
]

// Heartbeat
let heartbeatTimer: any = null
const sendHeartbeat = async () => {
  if (!user.value) return
  try {
    fetch('/api/activity/heartbeat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.value.id,
        page: activeTab.value,
        module: '控制台'
      })
    })
  } catch (e) {}
}



const fetchData = async () => {

  if (!user.value) return

  loading.value = true

  try {

    const uid = user.value.id

    const [permRes, appsRes, orderRes, apiRes, ticketRes] = await Promise.all([

      fetch(`/api/app-permissions/user/${uid}`),

      fetch('/api/applications'),

      fetch(`/api/orders/user/${uid}`),

      fetch(`/api/console/api-keys/${uid}`),

      fetch(`/api/console/tickets/${uid}`)

    ])

    

    if (permRes.ok && appsRes.ok) {

        const perms = await permRes.json()

        const apps = await appsRes.json()

        userApps.value = perms.map((p:any) => ({...p, ...(apps.find((a:any)=>a.appKey===p.appKey) || {name:p.appKey, icon:'fas fa-app'})}))

    }

    if (orderRes.ok) userOrders.value = await orderRes.json()

    if (apiRes.ok) apiKeys.value = await apiRes.json()

    if (ticketRes.ok) tickets.value = await ticketRes.json()

  } catch (e) {

    console.error(e)

  } finally {

    loading.value = false

  }

}



// Actions

const handleOpenApp = async (app: (Application & AppPermission)) => {

    let targetUrl = app.customDomain || app.url

    

    // 如果是非 Iframe 模式或者显式开启了 SSO，则尝试注入 Token

    if (app.ssoEnabled) {

        try {

            const res = await fetch('/api/sso/token', {

                method: 'POST',

                headers: { 'Content-Type': 'application/json' },

                body: JSON.stringify({ userId: user.value?.id, appKey: app.appKey })

            })

            if (res.ok) {

                const { ssoToken } = await res.json()

                const connector = targetUrl.includes('?') ? '&' : '?'

                targetUrl = `${targetUrl}${connector}ssoToken=${ssoToken}`

            }

        } catch (e) {

            console.error('Failed to get SSO token', e)

        }

    }

    window.open(targetUrl, '_blank')

}



const handleDeleteApiKey = async (id: number) => {

    if (!confirm('确定要删除此密钥吗？')) return

    const res = await fetch(`/api/console/api-keys/${id}?userId=${user.value?.id}`, { method: 'DELETE' })

    if (res.ok) fetchData()

}



const handleCreateApiKey = async () => {

    const name = prompt('输入密钥名称')

    if (!name) return

    const res = await fetch('/api/console/api-keys', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ userId: user.value?.id, name })

    })

    if (res.ok) fetchData()

}



const submitTicket = async () => {

    if (!newTicket.value.subject || !newTicket.value.content) return

    const res = await fetch('/api/console/tickets', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({ ...newTicket.value, userId: user.value?.id })

    })

    if (res.ok) {

        showCreateTicket.value = false

        newTicket.value = { subject: '', content: '', category: '技术支持', priority: '' }

        fetchData()

    }

}



const getStatusType = (status: string) => {

    if (status === '待处理' || status === 'OPEN') return 'primary'
    if (status === '已结案' || status === '已关闭' || status === 'CLOSED') return 'info'

    return 'warning'

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



const getCategoryLabel = (cat: string) => {

    const map: any = { 'Technical': '技术支持', 'Billing': '费用账单', 'Account': '账号权限', 'Other': '其他咨询' }

    return map[cat] || cat

}



onMounted(() => {

  if (!isLoggedIn.value) { router.push('/login'); return }

  fetchData()

  heartbeatTimer = setInterval(sendHeartbeat, 30000)

  sendHeartbeat()

})



onUnmounted(() => { if (heartbeatTimer) clearInterval(heartbeatTimer) })

</script>



<template>

  <div class="console-page">

    <NavBar />

    

    <div class="console-layout wrapper">

      <aside class="console-sidebar">

        <div class="brand-mini">

           <i class="fas fa-box-open"></i>

           <span>CII 控制</span>

        </div>

        

        <nav class="sidebar-nav">

          <button 

            v-for="item in menuItems" 

            :key="item.id"

            @click="activeTab = item.id"

            :class="['nav-btn', { active: activeTab === item.id }]"

          >

            <i :class="item.icon"></i>

            <span>{{ item.name }}</span>

          </button>



          <div class="nav-divider"></div>



          <button class="nav-btn logout" @click="logout(); router.push('/')">

            <i class="fas fa-sign-out-alt"></i>

            <span>退出登录</span>

          </button>

        </nav>

      </aside>



      <main class="console-main">

        <div v-if="loading" class="loading-state">

            <div class="spinner"></div>

            <p>正在同步云端数据...</p>

        </div>



        <div v-else class="content-view animate-fade">

            <!-- 1. OVERVIEW -->

            <section v-if="activeTab === 'overview'">

                <div class="view-header">

                    <h1>控制台概览</h1>
                    <p>欢迎回来，{{ user?.username }}。这里是您的资产全景图</p>

                </div>



                <div class="stats-grid">

                    <div class="stat-card blue">

                        <div class="card-icon"><i class="fas fa-rocket"></i></div>

                        <div class="card-info">

                            <span class="label">活跃应用</span>

                            <span class="value">{{ userApps.length }}</span>

                        </div>

                    </div>

                    <div class="stat-card purple">

                        <div class="card-icon"><i class="fas fa-coins"></i></div>

                        <div class="card-info">

                            <span class="label">可用总配额</span>
                            <span class="value">{{ userApps.reduce((t, a) => t + a.quotaLimit, 0) || 0 }}</span>

                        </div>

                    </div>

                    <div class="stat-card green">

                        <div class="card-icon"><i class="fas fa-receipt"></i></div>

                        <div class="card-info">

                            <span class="label">累计订单</span>

                            <span class="value">{{ userOrders.length }}</span>

                        </div>

                    </div>

                </div>



                <div class="recent-grid">

                    <div class="panel-box">

                        <div class="panel-header"><h3>最近使用的应用</h3></div>

                        <div class="app-mini-list">

                            <div v-for="app in userApps.slice(0,3)" :key="app.appKey" class="app-mini-item">

                                <i :class="app.icon"></i>

                                <span>{{ app.name }}</span>

                                <el-tag size="small">{{ app.permissionLevel === 'basic' ? '基础版' : '进阶版' }}</el-tag>

                            </div>

                        </div>

                    </div>

                    <div class="panel-box">

                        <div class="panel-header"><h3>最近账单</h3></div>

                        <div class="order-mini-list">

                            <div v-for="order in userOrders.slice(0,3)" :key="order.id" class="order-mini-item">

                                <span class="date">{{ new Date(order.createdAt).toLocaleDateString() }}</span>

                                <span class="app">{{ order.appKey }}</span>

                                <span class="price">¥{{ order.amount }}</span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>



            <!-- 2. APPS -->

            <section v-if="activeTab === 'apps'">

                <div class="view-header">

                    <h1>我的应用</h1>

                    <p>管理您的软件授权与资源额度/p>

                </div>

                <div class="apps-grid">

                    <div v-for="app in userApps" :key="app.appKey" class="app-card-new">

                        <div class="app-head">

                            <div class="app-brand"><i :class="app.icon"></i></div>

                            <div class="app-meta">

                                <h3>{{ app.name }}</h3>

                                <span class="level-badge">{{ app.permissionLevel === 'basic' ? '基础版' : '进阶版' }}</span>
                            </div>
                        </div>
                        <div class="app-body">
                            <div class="quota-info">
                                <span>额度消耗</span>
                                <span>{{ app.quotaUsed }} / {{ app.quotaLimit }}</span>
                            </div>
                            <div class="progress"><div class="bar" :style="{ width: (app.quotaUsed / app.quotaLimit * 100) + '%' }"></div></div>
                            <p class="expiry">有效期至: {{ app.expireAt ? new Date(app.expireAt).toLocaleDateString() : '长期有效' }}</p>
                        </div>
                        <button class="btn-entry" @click="handleOpenApp(app)">进入工作流</button>

                    </div>

                </div>

            </section>



            <!-- 3. API -->

            <section v-if="activeTab === 'api'">

                <div class="view-header">

                    <h1>API 管理</h1>

                    <div class="header-actions">

                        <button class="btn-primary" @click="handleCreateApiKey"><i class="fas fa-plus"></i> 新建密钥</button>

                    </div>

                </div>

                <div class="panel-box table-box">

                    <table>

                        <thead>

                            <tr><th>名称</th><th>接口密钥 (Access Key)</th><th>状态</th><th>创建时间</th><th>操作</th></tr>

                        </thead>

                        <tbody>

                            <tr v-for="k in apiKeys" :key="k.id">

                                <td>{{ k.name }}</td>

                                <td><code>{{ k.apiKey }}</code></td>

                                <td><el-tag type="success" size="small">{{ k.status === 'ACTIVE' ? '已启用 : '已禁 }}}</el-tag></td>

                                <td>{{ new Date(k.createdAt).toLocaleString() }}</td>

                                <td><button class="btn-text danger" @click="handleDeleteApiKey(k.id)">删除</button></td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>



            <!-- 4. BILLING -->

            <section v-if="activeTab === 'billing'">

                <div class="view-header">

                    <h1>费用中心</h1>

                    <p>查看消费流水与充值记录/p>

                </div>

                <div class="panel-box table-box">

                    <table>

                        <thead>

                            <tr><th>订单编号</th><th>购买</th><th>金额</th><th>状</th><th>交易时间</th></tr>

                        </thead>

                        <tbody>

                            <tr v-for="o in userOrders" :key="o.id">

                                <td class="mono">{{ o.orderNo }}</td>

                                <td>{{ o.appKey }} - {{ o.planKey }}</td>

                                <td class="price">¥{{ o.amount }}</td>

                                <td><el-tag :type="o.status==='PAID'?'success':'warning'">{{ o.status === 'PAID' ? '交易成功' : '待支 }}'}</el-tag></td>

                                <td>{{ new Date(o.createdAt).toLocaleString() }}</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </section>



            <!-- 5. SUPPORT (Matches screenshot) -->

            <section v-if="activeTab === 'support'">

                <div class="view-header">

                    <div class="header-info">

                        <h1>工单支持</h1>

                        <p>提交技术问题或账户咨询</p>

                    </div>

                    <button class="btn-primary create-ticket-btn" @click="showCreateTicket = true">

                        <i class="fas fa-plus"></i> 新增工单

                    </button>

                </div>



                <div class="panel-box tickets-panel">

                    <div class="panel-title-bar">

                        <h3>我的工单</h3>

                        <div class="ticket-filters">

                            <span class="active">所有工</span>

                            <span>处理</span>

                        </div>

                    </div>



                    <div class="table-container">

                        <table>

                            <thead>

                                <tr>

                                    <th>工单 ID</th>

                                    <th>主题</th>

                                    <th>分类</th>

                                    <th>状</th>

                                    <th>创建时间</th>

                                    <th>操作</th>

                                </tr>

                            </thead>

                            <tbody>

                                <tr v-for="t in tickets" :key="t.id">

                                    <td class="id-cell">{{ t.ticketId }}</td>

                                    <td class="subject-cell">{{ t.subject }}</td>

                                    <td><span class="category-tag">{{ getCategoryLabel(t.category) }}</span></td>

                                    <td>

                                        <el-tag :type="getStatusType(t.status)" size="small">

                                            {{ t.status === 'OPEN' ? '待处理' : (t.status === 'CLOSED' ? '已结案' : t.status) }}

                                        </el-tag>

                                    </td>

                                    <td>{{ formatTime(t.createdAt) }}</td>

                                        <button class="btn-text primary" @click="selectedTicket = t; showTicketDetail = true">查看详情</button>

                                </tr>

                                <tr v-if="tickets.length === 0">

                                    <td colspan="6" class="empty-cell">无历史工单信息</td>

                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </section>



            <!-- 6. SETTINGS -->

            <section v-if="activeTab === 'settings'">

                <div class="view-header"><h1>账号设置</h1></div>

                <div class="panel-box settings-form">

                    <div class="form-group">

                        <label>用户/label>

                        <input type="text" :value="user?.username" disabled />

                    </div>

                    <div class="form-group">

                        <label>登录邮箱</label>

                        <input type="text" :value="user?.email" disabled />

                    </div>

                    <div class="form-group">

                        <label>企业名称</label>

                        <input type="text" :value="user?.companyName" placeholder="尚未完善企业信息" />

                    </div>

                    <button class="btn-primary">保存修改</button>

                </div>

            </section>

        </div>

      </main>

    </div>



    <!-- Create Ticket Modal -->

    <el-dialog v-model="showCreateTicket" title="提交新工 width="500px">

        <el-form :model="newTicket" label-position="top">

            <el-form-item label="工单主题">

                <el-input v-model="newTicket.subject" placeholder="请简述您的问 />

            </el-form-item>

            <el-form-item label="工单类别">

                <el-select v-model="newTicket.category" style="width: 100%">

                    <el-option label="技术咨 value="技术咨 />

                    <el-option label="账单与财 value="账单与财 />

                    <el-option label="权限与账 value="权限与账 />

                    <el-option label="其他建议" value="其他建议" />

                </el-select>

            </el-form-item>

            <el-form-item label="详细内容">

                <el-input type="textarea" v-model="newTicket.content" rows="4" placeholder="请详细描述您遇到的问题或需 />

            </el-form-item>

        </el-form>

        <template #footer>

            <el-button @click="showCreateTicket = false">取消</el-button>

            <el-button type="primary" @click="submitTicket">提交工单</el-button>

        </template>

    </el-dialog>



    <!-- Ticket Detail Modal -->

    <el-dialog v-model="showTicketDetail" :title="'工单详情: ' + selectedTicket?.ticketId" width="600px" @close="selectedTicket = null">

        <div v-if="selectedTicket" class="ticket-detail">

            <div class="detail-row">

                <span class="lbl">主题</span>

                <span class="val">{{ selectedTicket.subject }}</span>

            </div>

            <div class="detail-row">

                <span class="lbl">内容</span>

                <div class="content-box">{{ selectedTicket.content }}</div>

            </div>

            <div class="detail-row">

                <span class="lbl">分类</span>

                <el-tag size="small">{{ selectedTicket.category }}</el-tag>

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

.console-page { background: #f8fafc; min-height: 100vh; font-family: 'Inter', system-ui, sans-serif; }

.console-layout { display: flex; gap: 0; padding-top: 64px; height: calc(100vh - 64px); }



/* Sidebar */

.console-sidebar {

    width: 260px; background: #fff; border-right: 1px solid #e2e8f0;

    display: flex; flex-direction: column; padding: 24px 0;

}

.brand-mini {

    padding: 0 24px 32px; display: flex; align-items: center; gap: 12px;

    font-size: 1.25rem; font-weight: 850; color: #4f46e5;

}

.sidebar-nav { display: flex; flex-direction: column; gap: 4px; flex: 1; }

.nav-btn {

    display: flex; align-items: center; gap: 16px; padding: 14px 24px;

    border: none; background: none; color: #64748b; font-weight: 650;

    cursor: pointer; transition: all 0.2s; border-left: 4px solid transparent;

}

.nav-btn i { font-size: 1.1rem; width: 24px; text-align: center; }

.nav-btn:hover { background: #f8fafc; color: #4f46e5; }

.nav-btn.active {

    background: #eef2ff; color: #4f46e5; border-left-color: #4f46e5;

}

.nav-divider { height: 1px; background: #f1f5f9; margin: 16px 24px; }

.logout { margin-top: auto; color: #ef4444; }

.logout:hover { background: #fef2f2; color: #ef4444; }



/* Main Content */

.console-main { flex: 1; overflow-y: auto; padding: 40px; }

.view-header { margin-bottom: 32px; display: flex; justify-content: space-between; align-items: flex-end; }

.view-header h1 { font-size: 1.75rem; font-weight: 850; color: #0f172a; margin: 0 0 8px 0; }

.view-header p { color: #64748b; margin: 0; font-size: 0.95rem; }



/* Stats */

.stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }

.stat-card {

    background: #fff; padding: 24px; border-radius: 16px; display: flex; align-items: center; gap: 20px;

    box-shadow: 0 1px 3px rgba(0,0,0,0.1);

}

.card-icon { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }

.blue .card-icon { background: #e0e7ff; color: #4f46e5; }

.purple .card-icon { background: #f3e8ff; color: #7c3aed; }

.green .card-icon { background: #dcfce7; color: #16a34a; }

.card-info .label { display: block; font-size: 0.875rem; color: #64748b; font-weight: 600; }

.card-info .value { display: block; font-size: 1.75rem; font-weight: 850; color: #1e293b; }



/* Panels */

.recent-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }

.panel-box { background: #fff; border-radius: 12px; padding: 24px; border: 1px solid #e2e8f0; }

.panel-header h3 { font-size: 1.1rem; font-weight: 800; color: #1e293b; margin: 0 0 20px 0; }



.app-mini-item, .order-mini-item {

    display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid #f1f5f9;

}

.app-mini-item i { color: #4f46e5; font-size: 1.1rem; }

.order-mini-item .price { margin-left: auto; font-weight: 700; color: #1e293b; }

.order-mini-item .date { color: #94a3b8; font-size: 0.85rem; }



/* Apps */

.apps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 24px; }

.app-card-new { background: #fff; border-radius: 16px; padding: 24px; border: 1px solid #e2e8f0; }

.app-head { display: flex; gap: 16px; margin-bottom: 24px; }

.app-brand { width: 48px; height: 48px; background: #f8fafc; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: #4f46e5; font-size: 1.25rem; }

.app-meta h3 { margin: 0 0 4px 0; font-size: 1.1rem; }

.level-badge { background: #e0e7ff; color: #4338ca; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }



.quota-info { display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 600; color: #64748b; margin-bottom: 8px; }

.progress { height: 8px; background: #f1f5f9; border-radius: 4px; overflow: hidden; margin-bottom: 12px; }

.progress .bar { height: 100%; background: #4f46e5; }

.expiry { font-size: 0.8rem; color: #94a3b8; margin: 0; }

.btn-entry { width: 100%; margin-top: 20px; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; background: #fff; font-weight: 700; cursor: pointer; }

.btn-entry:hover { background: #0f172a; color: #fff; border-color: #0f172a; }



/* Tickets Section Design (Matches Image) */

.create-ticket-btn { background: #4f46e5; height: 42px; border-radius: 8px; display: flex; align-items: center; gap: 8px; }

.tickets-panel { padding: 0; }

.panel-title-bar { display: flex; justify-content: space-between; align-items: center; padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }

.panel-title-bar h3 { margin: 0; font-size: 1.05rem; }

.ticket-filters { display: flex; gap: 20px; font-size: 0.9rem; color: #64748b; font-weight: 600; }

.ticket-filters span { cursor: pointer; }

.ticket-filters span.active { color: #0f172a; border-bottom: 2px solid #4f46e5; padding-bottom: 4px; }



.table-container { padding: 0 24px 24px; }

table { width: 100%; border-collapse: collapse; }

th { text-align: left; padding: 16px 12px; font-size: 0.75rem; color: #94a3b8; font-weight: 600; border-bottom: 1px solid #f1f5f9; }

td { padding: 20px 12px; font-size: 0.9rem; color: #1e293b; border-bottom: 1px solid #f8fafc; }



.id-cell { color: #94a3b8; font-family: monospace; }

.subject-cell { font-weight: 600; }

.category-tag { background: #f1f5f9; color: #475569; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }

.empty-cell { text-align: center; padding: 60px 0; color: #94a3b8; }



/* Modals */

.ticket-detail { padding: 10px 0; }

.detail-row { margin-bottom: 16px; }

.detail-row .lbl { font-weight: 700; color: #64748b; width: 60px; display: inline-block; }

.content-box { background: #f8fafc; padding: 16px; border-radius: 8px; margin-top: 8px; line-height: 1.6; }

.divider { height: 1px; background: #e2e8f0; margin: 24px 0; }

.reply-section h4 { margin: 0 0 12px 0; font-size: 1rem; }

.reply-box { background: #fffbeb; border: 1px solid #fef3c7; padding: 16px; border-radius: 8px; color: #92400e; }

.no-reply { color: #94a3b8; font-style: italic; }



/* Form */

.settings-form { max-width: 500px; }

.form-group { margin-bottom: 20px; }

.form-group label { display: block; margin-bottom: 8px; font-weight: 600; color: #475569; }

.form-group input { width: 100%; padding: 10px; border: 1px solid #e2e8f0; border-radius: 8px; }

.form-group input:disabled { background: #f8fafc; color: #94a3b8; cursor: not-allowed; }



/* Utils */

.btn-primary { background: #4f46e5; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; transition: 0.2s; }

.btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }

.btn-text { background: none; border: none; font-weight: 700; cursor: pointer; padding: 0; }

.btn-text.primary { color: #4f46e5; }



.loading-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; color: #64748b; }

.spinner { width: 40px; height: 40px; border: 3px solid #e2e8f0; border-top-color: #4f46e5; border-radius: 50%; animation: spin 0.8s linear infinite; margin-bottom: 20px; }

@keyframes spin { to { transform: rotate(360deg); } }

.animate-fade { animation: fadeIn 0.4s ease-out; }

@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

</style>