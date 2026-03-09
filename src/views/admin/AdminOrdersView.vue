<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage } from 'element-plus'

import { User, Timer } from '@element-plus/icons-vue'



interface AppOrder {

  id: number

  orderNo: string

  userId: number

  username: string

  appKey: string

  planKey: string

  amount: number

  status: 'PENDING' | 'PAID' | 'CANCELLED' | 'REFUNDED'

  payType: string

  tradeNo: string

  quotaAmount: number

  createdAt: string

  paidAt: string | null

}



const orders = ref<AppOrder[]>([])

const loading = ref(false)



const fetchOrders = async () => {

  loading.value = true

  try {

    const res = await fetch('/api/orders')

    if (res.ok) {

      orders.value = await res.json()

    }

  } catch (e) {

    ElMessage.error('获取订单列表失败')

  } finally {

    loading.value = false

  }

}



const getStatusType = (status: string) => {

  switch (status) {

    case 'PAID': return 'success'

    case 'PENDING': return 'warning'

    case 'CANCELLED': return 'info'

    case 'REFUNDED': return 'danger'

    default: return ''

  }

}



const getStatusLabel = (status: string) => {

  switch (status) {

    case 'PAID': return '已支付'

    case 'PENDING': return '待支付'

    case 'CANCELLED': return '已取消'

    case 'REFUNDED': return '已退款'

    default: return status

  }

}



const handleMockPay = async (orderNo: string) => {

  try {

    const res = await fetch('/api/orders/pay-mock', {

      method: 'POST',

      headers: { 'Content-Type': 'application/json' },

      body: JSON.stringify({ orderNo })

    })

    if (res.ok) {

      ElMessage.success('模拟支付成功，权限已同步更新')

      fetchOrders()

    }

  } catch (e) {

    ElMessage.error('模拟支付失败')

  }

}



onMounted(fetchOrders)

</script>



<template>

  <div class="admin-orders">

    <div class="page-header">

      <div class="header-info">

        <h2>订单财务管理</h2>

        <p class="sub-title">监控全平台付费记录、支付状态及资源发放情况</p>

      </div>

      <div class="header-stats">

        <div class="stat-card">

          <span class="label">今日营收</span>

          <span class="value">¥ {{ orders.filter(o => o.status === 'PAID').reduce((t, o) => t + o.amount, 0).toFixed(2) }}</span>

        </div>

      </div>

    </div>



    <el-card shadow="never" class="table-card">

      <el-table :data="orders" v-loading="loading" stripe border>

        <el-table-column prop="orderNo" label="订单编号" width="200" />

        <el-table-column label="下单用户" min-width="150">

          <template #default="{ row }">

            <div class="user-info">

              <el-icon><User /></el-icon>

              <span>{{ row.username || '未知用户' }} (ID: {{ row.userId }})</span>

            </div>

          </template>

        </el-table-column>

        <el-table-column label="选购内容" width="180">

          <template #default="{ row }">

            <div class="plan-info">

              <el-tag size="small">{{ row.appKey }}</el-tag>

              <span class="plan-name">{{ row.planKey }}</span>

            </div>

          </template>

        </el-table-column>

        <el-table-column label="订单金额" width="120">

          <template #default="{ row }">

            <span class="amount">¥ {{ row.amount }}</span>

          </template>

        </el-table-column>

        <el-table-column prop="status" label="状态" width="100">

          <template #default="{ row }">

            <el-tag :type="getStatusType(row.status)">{{ getStatusLabel(row.status) }}</el-tag>

          </template>

        </el-table-column>

        <el-table-column label="下单时间" width="180">

          <template #default="{ row }">

            <div class="time-cell">

              <el-icon><Timer /></el-icon>

              <span>{{ new Date(row.createdAt).toLocaleString() }}</span>

            </div>

          </template>

        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">

          <template #default="{ row }">

            <el-button 

              v-if="row.status === 'PENDING'" 

              size="small" 

              type="primary" 

              link 

              @click="handleMockPay(row.orderNo)"

            >

              模拟支付

            </el-button>

            <el-button v-else size="small" link disabled>已处理</el-button>

          </template>

        </el-table-column>

      </el-table>

    </el-card>

  </div>

</template>



<style scoped>

.admin-orders {

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

.header-stats {

  display: flex;

  gap: 16px;

}

.stat-card {

  background: white;

  padding: 12px 24px;

  border-radius: 8px;

  border: 1px solid #e2e8f0;

  display: flex;

  flex-direction: column;

}

.stat-card .label {

  font-size: 0.75rem;

  color: #64748b;

  font-weight: 600;

}

.stat-card .value {

  font-size: 1.25rem;

  font-weight: 800;

  color: #4f46e5;

}

.user-info, .plan-info, .time-cell {

  display: flex;

  align-items: center;

  gap: 8px;

}

.amount {

  font-family: 'Inter', sans-serif;

  font-weight: 700;

  color: #0f172a;

}

.plan-name {

  font-weight: 600;

  color: #475569;

  text-transform: capitalize;

}

.table-card {

  border-radius: 12px;

}

</style>