<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useUser } from '@/utils/userStore'
import { track } from '@/utils/tracker'



interface AppOrder {

  id: number; orderNo: string; appKey: string; planKey: string; amount: number; status: string; createdAt: string

}



const { user } = useUser()

const transactions = ref<AppOrder[]>([])

const loading = ref(false)

const totalSpent = ref(0)



const fetchData = async () => {

    if (!user.value) return

    loading.value = true

    try {

        const res = await fetch(`/api/orders/user/${user.value.id}`)

        if (res.ok) {

            const data = await res.json()

            transactions.value = data

            totalSpent.value = data.reduce((sum: number, o: any) => sum + (o.status === 'PAID' ? o.amount : 0), 0)

        }

    } catch (e) {

        console.error(e)

    } finally {

        loading.value = false

    }

}



onMounted(fetchData)

// Tracking Action Handlers
const handleRecharge = () => {
    track({ event: 'conversion', feature: 'recharge_funds', value: 100 }) // Mock value, modify when real payment connects
    alert('系统级支付接口对接中，本次点击转化行为已记录测算分析 (UTM+Revenue)...')
}

const handleGetMorePoints = () => {
    track({ event: 'conversion', feature: 'buy_compute_points', value: 50 })
    alert('系统级支付接口对接中，已成功上报此转化意图。')
}

const handleManageMembership = (appName: string) => {
    track({ event: 'feature_use', feature: 'manage_membership_' + appName })
    alert(`管理 [${appName}] 实例，该操作已记录审计...`)
}

const handleOpenMembership = (appName: string) => {
    track({ event: 'conversion', feature: 'purchase_membership_' + appName, value: 299 })
    alert(`订购 [${appName}] 实例，系统已自动关联前置 UTM 漏斗！`)
}
</script>



<template>

  <div class="billing-view">

    <div class="page-header">

      <div class="header-text">

        <h2>费用中心</h2>

        <p>查看您的支付订单、消费明细与资金流向</p>

      </div>

      <button class="btn-primary"><i class="fas fa-file-invoice-dollar"></i> 申请发票</button>

    </div>



    <div class="billing-grid">

      <div class="balance-card">

        <div class="balance-header"><span>账户余额</span><i class="fas fa-wallet"></i></div>

        <div class="balance-amount"><span class="currency">¥</span><span class="value">{{ (user?.balance || 0).toFixed(2) }}</span></div>

        <div class="balance-label">可用资金余额</div>

        <div class="balance-actions">

          <button class="btn-recharge" @click="handleRecharge">立即充值</button>

        </div>

      </div>



      <div class="balance-card points-card">

        <div class="balance-header"><span>剩余算力</span><i class="fas fa-bolt"></i></div>

        <div class="balance-amount"><span class="value">{{ user?.computePoints || 0 }}</span></div>

        <div class="balance-label">单点价格：0.1 元/点</div>

        <div class="balance-actions">

          <button class="btn-secondary" @click="handleGetMorePoints">获取更多</button>

        </div>

      </div>

    </div>



    <!-- Application Membership Status -->

    <div class="content-card membership-section" style="margin-bottom: 32px;">

      <div class="card-header">

        <h3>各应用会员状态</h3>

      </div>

      <div class="memo-grid">

        <div class="memo-item">

          <div class="app-info">

             <i class="fas fa-robot"></i>

             <div>

                <div class="app-name">数字人克隆训练平台</div>

                <div class="app-status">专业版会员 · 剩余 24 天</div>

             </div>

          </div>

          <button class="btn-manage" @click="handleManageMembership('数字人克隆训练平台')">管理续费</button>

        </div>

        <div class="memo-item inactive">

          <div class="app-info">

             <i class="fas fa-cloud"></i>

             <div>

                <div class="app-name">大模型 API 聚合中心</div>

                <div class="app-status">未开通会员</div>

             </div>

          </div>

          <button class="btn-manage-outline" @click="handleOpenMembership('大模型 API 聚合中心')">立即开通</button>

        </div>

      </div>

    </div>



    <div class="content-card">

      <div class="card-header"><h3>近期交易记录</h3></div>

      <div v-if="loading" class="loading-state">交易加载中...</div>

      <table v-else class="tx-table">

        <thead>

          <tr><th>订单编号</th><th>交易时间</th><th>购买内容</th><th>金额</th><th>状态</th><th>凭据</th></tr>

        </thead>

        <tbody>

          <tr v-for="tx in transactions" :key="tx.id">

            <td class="code-font">{{ tx.orderNo }}</td>

            <td class="text-muted">{{ new Date(tx.createdAt).toLocaleString() }}</td>

            <td>{{ tx.appKey }} ({{ tx.planKey }})</td>

            <td class="text-slate">¥ {{ tx.amount }}</td>

            <td><span class="status-badge" :class="tx.status === 'PAID' ? 'success' : 'warning'">{{ tx.status === 'PAID' ? '支付成功' : '待支付' }}</span></td>

            <td><button class="btn-icon"><i class="fas fa-download"></i></button></td>

          </tr>

          <tr v-if="transactions.length === 0">

              <td colspan="6" class="empty-state">暂无交易记录</td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

</template>



<style scoped>

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }

.btn-primary { background: white; color: #0f172a; border: 1px solid #e2e8f0; padding: 10px 20px; border-radius: 6px; font-weight: 600; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }

.btn-primary:hover { background: #f8fafc; }



.billing-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 32px; }

.balance-card, .expense-card { background: white; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }

.balance-header { display: flex; justify-content: space-between; color: #64748b; font-weight: 600; margin-bottom: 16px; }

.balance-amount { font-size: 2.5rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.balance-amount .currency { font-size: 1.5rem; vertical-align: top; margin-top: 8px; display: inline-block; }

.balance-label { color: #94a3b8; font-size: 0.9rem; margin-bottom: 24px; font-weight: 600; }

.balance-actions { display: flex; gap: 16px; }

.btn-recharge { background: #0f172a; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 800; cursor: pointer; flex: 1; }

.btn-secondary { background: white; border: 1px solid #e2e8f0; color: #475569; padding: 12px 24px; border-radius: 8px; font-weight: 700; cursor: pointer; flex: 1; }



.expense-card h3 { font-size: 1.1rem; color: #64748b; margin-bottom: 16px; }

.expense-amount { font-size: 2.2rem; font-weight: 850; color: #0f172a; margin-bottom: 24px; }

.expense-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 24px; background: #f1f5f9; }

.expense-legend { display: flex; gap: 16px; }

.legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.9rem; color: #475569; font-weight: 700; }

.dot { width: 8px; height: 8px; border-radius: 50%; }



.content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }

.card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }

.tx-table { width: 100%; border-collapse: collapse; }

.tx-table th { text-align: left; padding: 12px 24px; background: #f8fafc; color: #64748b; font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }

.tx-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #334155; vertical-align: middle; }

.code-font { font-family: monospace; color: #64748b; }

.text-slate { color: #0f172a; font-weight: 800; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: 700; }

.status-badge.success { background: #dcfce7; color: #166534; }

.status-badge.warning { background: #fee2e2; color: #991b1b; }

.btn-icon { background: none; border: none; color: #94a3b8; cursor: pointer; }

.loading-state, .empty-state { padding: 80px; text-align: center; color: #94a3b8; }



/* Membership Section Styles */

.memo-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: #f1f5f9; }

.memo-item { background: white; padding: 24px; display: flex; justify-content: space-between; align-items: center; }

.memo-item.inactive { background: #fafafa; }

.app-info { display: flex; align-items: center; gap: 16px; }

.app-info i { font-size: 1.5rem; color: #4F46E5; background: #f0efff; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }

.memo-item.inactive i { color: #94a3b8; background: #f1f5f9; }

.app-name { font-weight: 800; color: #1e293b; margin-bottom: 4px; }

.app-status { font-size: 0.85rem; color: #64748b; font-weight: 600; }

.btn-manage { background: #f1f5f9; color: #475569; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }

.btn-manage:hover { background: #e2e8f0; color: #0f172a; }

.btn-manage-outline { background: white; color: #4F46E5; border: 1px solid #4F46E5; padding: 7px 16px; border-radius: 6px; font-size: 0.85rem; font-weight: 700; cursor: pointer; transition: all 0.2s; }

.btn-manage-outline:hover { background: #4F46E5; color: white; }

</style>