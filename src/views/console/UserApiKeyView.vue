<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { init } from 'echarts'
import type { EChartsOption } from 'echarts'
import { useUser } from '@/utils/userStore'
import {
  apiGetApiKeys,
  apiCreateApiKey,
  apiDeleteApiKey,
  apiToggleApiKeyStatus,
  apiGetApiCallLogs,
  apiGetApiUsage,
  apiGetFullKey
} from '@/api/newApi/index'

interface ApiKey {
  id: number
  name: string
  keyPreview: string  // 预览格式：sk-AbcD...7890
  fullKey?: string    // 完整密钥（点击眼睛后加载）
  status: number
  monthlyLimit: number
  monthlyUsage: number
  lastUsedAt: string
  createTime: string
}

interface ApiCallLog {
  id: number
  requestId: string
  model: string
  endpoint: string
  status: string
  durationMs: number
  promptTokens: number
  completionTokens: number
  totalTokens: number
  errorMsg: string
  createTime: string
}

interface DailyStat {
  date: string
  callCount: number
  promptTokens: number
  completionTokens: number
  totalTokens: number
}

const { user } = useUser()

// API Key 列表
const apiKeys = ref<ApiKey[]>([])
const loading = ref(false)

// 已加载完整密钥的 Key ID 集合
const loadedFullKeys = ref<Set<number>>(new Set())
// 正在加载完整密钥的 Key ID
const loadingFullKeys = ref<Set<number>>(new Set())

// 统计数据
const dailyStats = ref<DailyStat[]>([])
const todayCalls = ref(0)
const todayTokens = ref(0)

// 日志分页
const logs = ref<ApiCallLog[]>([])
const logsLoading = ref(false)
const logsPage = ref(1)
const logsPageSize = ref(10)
const logsTotal = ref(0)

// 创建弹窗
const createDialogVisible = ref(false)
const newKeyName = ref('')
// 新创建的完整密钥（仅创建后显示一次）
const newCreatedKey = ref('')

// 当前显示的 Tab
const activeTab = ref('keys')

// 图表引用
const chartRef = ref<HTMLElement | null>(null)
let chartInstance: any = null

// 获取 API Key 列表
const fetchApiKeys = async () => {
  loading.value = true
  try {
    const res = await apiGetApiKeys()
    console.log('API Keys response:', res)
    // 兼容不同的响应格式
    if (Array.isArray(res)) {
      apiKeys.value = res
    } else if (res?.data && Array.isArray(res.data)) {
      apiKeys.value = res.data
    } else if (res?.list && Array.isArray(res.list)) {
      apiKeys.value = res.list
    } else {
      apiKeys.value = []
    }
    // 清空已加载的完整密钥
    loadedFullKeys.value.clear()
  } catch (e) {
    console.error('Fetch API Keys error:', e)
    apiKeys.value = []
  } finally {
    loading.value = false
  }
}

// 获取使用量统计
const fetchUsage = async () => {
  try {
    const res = await apiGetApiUsage(7)
    console.log('API Usage response:', res)
    // 兼容不同的响应格式
    if (res?.dailyStats && Array.isArray(res.dailyStats)) {
      dailyStats.value = res.dailyStats
    } else if (res?.data?.dailyStats && Array.isArray(res.data.dailyStats)) {
      dailyStats.value = res.data.dailyStats
    } else {
      dailyStats.value = []
    }

    // 计算今日数据
    const today = new Date().toISOString().split('T')[0]
    const todayStat = dailyStats.value.find((s: DailyStat) => s.date === today)
    if (todayStat) {
      todayCalls.value = todayStat.callCount
      todayTokens.value = todayStat.totalTokens
    }

    // 渲染图表
    renderChart()
  } catch (e) {
    console.error('Fetch Usage error:', e)
    dailyStats.value = []
  }
}

// 获取调用日志
const fetchLogs = async () => {
  logsLoading.value = true
  try {
    const res = await apiGetApiCallLogs({ page: logsPage.value, size: logsPageSize.value })
    console.log('API Logs response:', res)
    // 兼容不同的响应格式
    if (res?.list && Array.isArray(res.list)) {
      logs.value = res.list
      logsTotal.value = res.total || 0
    } else if (res?.data?.list && Array.isArray(res.data.list)) {
      logs.value = res.data.list
      logsTotal.value = res.data.total || 0
    } else if (Array.isArray(res)) {
      logs.value = res
      logsTotal.value = res.length
    } else {
      logs.value = []
      logsTotal.value = 0
    }
  } catch (e) {
    console.error('Fetch Logs error:', e)
    logs.value = []
    logsTotal.value = 0
  } finally {
    logsLoading.value = false
  }
}

// 创建 API Key
const handleCreate = async () => {
  if (!newKeyName.value.trim()) {
    ElMessage.warning('请输入密钥名称')
    return
  }
  try {
    const res = await apiCreateApiKey({ name: newKeyName.value })
    console.log('Create API Key response:', res)
    // 获取新创建的完整密钥
    let key = ''
    if (typeof res === 'string') {
      key = res
    } else if (res?.key) {
      key = res.key
    } else if (res?.data?.key) {
      key = res.data.key
    }
    newCreatedKey.value = key

    if (!key) {
      ElMessage.error('创建成功但未获取到密钥，请刷新列表查看')
      createDialogVisible.value = false
      newKeyName.value = ''
      fetchApiKeys()
      return
    }

    // 显示成功弹窗
    ElMessageBox.alert(
      'API Key 创建成功！请立即复制并妥善保存，系统不会再次显示完整密钥。',
      '创建成功',
      {
        confirmButtonText: '我已保存',
        type: 'success',
        dangerouslyUseHTMLString: true,
        message: `
          <div style="margin: 16px 0;">
            <div style="margin-bottom: 8px; font-weight: bold;">密钥名称：${newKeyName.value}</div>
            <div style="display: flex; align-items: center; gap: 8px;">
              <code style="background: #f1f5f9; padding: 8px 12px; border-radius: 4px; font-family: monospace; flex: 1; word-break: break-all;">
                ${key}
              </code>
            </div>
          </div>
        `
      }
    )

    createDialogVisible.value = false
    newKeyName.value = ''
    fetchApiKeys()
  } catch (e: any) {
    console.error('Create API Key error:', e)
    ElMessage.error(e.message || '创建失败')
  }
}

// 切换显示完整密钥（点击眼睛图标）
const toggleShowFullKey = async (key: ApiKey) => {
  // 如果已经加载过，直接切换显示/隐藏
  if (loadedFullKeys.value.has(key.id)) {
    loadedFullKeys.value.delete(key.id)
    return
  }

  // 加载完整密钥
  loadingFullKeys.value.add(key.id)
  try {
    const res = await apiGetFullKey(key.id)
    console.log('Get full key response:', res)

    let fullKey = ''
    if (res?.fullKey) {
      fullKey = res.fullKey
    } else if (res?.data?.fullKey) {
      fullKey = res.data.fullKey
    } else if (typeof res === 'string') {
      fullKey = res
    }

    if (fullKey) {
      key.fullKey = fullKey
      loadedFullKeys.value.add(key.id)
    } else {
      ElMessage.error('获取完整密钥失败')
    }
  } catch (e: any) {
    console.error('Get full key error:', e)
    ElMessage.error(e.message || '获取完整密钥失败')
  } finally {
    loadingFullKeys.value.delete(key.id)
  }
}

// 获取显示的密钥文本
const getDisplayKey = (key: ApiKey) => {
  if (loadedFullKeys.value.has(key.id) && key.fullKey) {
    // 显示完整密钥
    return key.fullKey
  }
  // 显示预览格式
  return key.keyPreview
}

// 复制密钥
const copyKey = async (key: ApiKey) => {
  // 只有加载了完整密钥才能复制
  if (!loadedFullKeys.value.has(key.id) || !key.fullKey) {
    ElMessage.warning('请先点击眼睛图标显示完整密钥')
    return
  }
  try {
    await navigator.clipboard.writeText(key.fullKey)
    ElMessage.success('已复制到剪贴板')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}

// 复制新创建的密钥
const copyNewKey = async () => {
  try {
    await navigator.clipboard.writeText(newCreatedKey.value)
    ElMessage.success('已复制到剪贴板')
  } catch (e) {
    ElMessage.error('复制失败')
  }
}

// 启用/禁用
const handleToggleStatus = async (key: ApiKey) => {
  const newStatus = key.status === 1 ? 0 : 1
  try {
    await apiToggleApiKeyStatus(key.id, newStatus)
    ElMessage.success(newStatus === 1 ? '已启用' : '已禁用')
    fetchApiKeys()
  } catch (e: any) {
    ElMessage.error(e.message || '操作失败')
  }
}

// 删除
const handleDelete = async (key: ApiKey) => {
  try {
    await ElMessageBox.confirm(
      '删除后该密钥将立即失效，确定要删除吗？',
      '删除确认',
      { confirmButtonText: '确定', cancelButtonText: '取消', type: 'warning' }
    )
    await apiDeleteApiKey(key.id)
    ElMessage.success('删除成功')
    fetchApiKeys()
  } catch (e: any) {
    if (e !== 'cancel') {
      ElMessage.error(e.message || '删除失败')
    }
  }
}

// 渲染图表
const renderChart = () => {
  if (!chartRef.value || dailyStats.value.length === 0) return

  if (chartInstance) {
    chartInstance.dispose()
  }

  chartInstance = init(chartRef.value)

  const dates = dailyStats.value.map(s => s.date).reverse()
  const calls = dailyStats.value.map(s => s.callCount).reverse()
  const tokens = dailyStats.value.map(s => s.totalTokens).reverse()

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'cross' }
    },
    legend: {
      data: ['调用次数', 'Token 数量'],
      bottom: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: { lineStyle: { color: '#e2e8f0' } },
      axisLabel: { color: '#64748b' }
    },
    yAxis: [
      {
        type: 'value',
        name: '调用次数',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#64748b' },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      {
        type: 'value',
        name: 'Token 数',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#64748b' },
        splitLine: { show: false }
      }
    ],
    series: [
      {
        name: '调用次数',
        type: 'bar',
        data: calls,
        itemStyle: { color: '#4f46e5', borderRadius: [4, 4, 0, 0] },
        barWidth: '40%'
      },
      {
        name: 'Token 数量',
        type: 'line',
        yAxisIndex: 1,
        data: tokens,
        smooth: true,
        lineStyle: { color: '#10b981', width: 2 },
        itemStyle: { color: '#10b981' },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0, y: 0, x2: 0, y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(16, 185, 129, 0.3)' },
              { offset: 1, color: 'rgba(16, 185, 129, 0.05)' }
            ]
          }
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

// 日志分页改变
const handleLogsPageChange = (page: number) => {
  logsPage.value = page
  fetchLogs()
}

// 状态颜色
const getStatusType = (status: number) => status === 1 ? 'success' : 'danger'
const getStatusText = (status: number) => status === 1 ? '启用' : '禁用'

// 日志状态颜色
const getLogStatusType = (status: string) => {
  if (status === 'success') return 'success'
  if (status === 'failed') return 'danger'
  return 'warning'
}

onMounted(() => {
  fetchApiKeys()
  fetchUsage()
  fetchLogs()

  // 监听窗口大小变化
  window.addEventListener('resize', () => {
    if (chartInstance) {
      chartInstance.resize()
    }
  })
})
</script>

<template>
  <div class="api-key-view">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-text">
        <h2>API Key 管理</h2>
        <p>管理您的 API 密钥，查看调用统计和使用量</p>
      </div>
      <button class="btn-primary" @click="createDialogVisible = true">
        <i class="fas fa-plus"></i> 创建密钥
      </button>
    </div>

    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon"><i class="fas fa-key"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ apiKeys.length }}</div>
          <div class="stat-label">API Key 数量</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon calls"><i class="fas fa-chart-line"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ todayCalls }}</div>
          <div class="stat-label">今日调用次数</div>
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-icon tokens"><i class="fas fa-microchip"></i></div>
        <div class="stat-info">
          <div class="stat-value">{{ todayTokens.toLocaleString() }}</div>
          <div class="stat-label">今日 Token 消耗</div>
        </div>
      </div>
    </div>

    <!-- Tab 切换 -->
    <div class="tabs-wrapper">
      <div class="tabs">
        <button :class="['tab', { active: activeTab === 'keys' }]" @click="activeTab = 'keys'">
          <i class="fas fa-key"></i> 密钥管理
        </button>
        <button :class="['tab', { active: activeTab === 'usage' }]" @click="activeTab = 'usage'">
          <i class="fas fa-chart-bar"></i> 使用量统计
        </button>
        <button :class="['tab', { active: activeTab === 'logs' }]" @click="activeTab = 'logs'">
          <i class="fas fa-history"></i> 调用日志
        </button>
      </div>
    </div>

    <!-- 密钥管理 -->
    <div v-show="activeTab === 'keys'" class="content-card">
      <div v-if="loading" class="loading-state">加载中...</div>

      <div v-else-if="apiKeys.length === 0" class="empty-state">
        <i class="fas fa-key"></i>
        <p>暂无 API Key</p>
        <button class="btn-primary" @click="createDialogVisible = true">立即创建</button>
      </div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>名称</th>
            <th>密钥</th>
            <th>状态</th>
            <th>本月用量</th>
            <th>最后使用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="key in apiKeys" :key="key.id">
            <td class="key-name">{{ key.name }}</td>
            <td>
              <div class="key-display">
                <code class="key-value">{{ getDisplayKey(key) }}</code>
                <button
                  class="btn-icon"
                  @click="toggleShowFullKey(key)"
                  :title="loadedFullKeys.has(key.id) ? '隐藏' : '显示完整密钥'"
                  :disabled="loadingFullKeys.has(key.id)"
                >
                  <i v-if="loadingFullKeys.has(key.id)" class="fas fa-spinner fa-spin"></i>
                  <i v-else :class="loadedFullKeys.has(key.id) ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
                <button
                  v-if="loadedFullKeys.has(key.id)"
                  class="btn-icon"
                  @click="copyKey(key)"
                  title="复制"
                >
                  <i class="fas fa-copy"></i>
                </button>
              </div>
            </td>
            <td>
              <span :class="['status-badge', getStatusType(key.status)]">
                {{ getStatusText(key.status) }}
              </span>
            </td>
            <td>{{ key.monthlyUsage }} / {{ key.monthlyLimit || '不限' }}</td>
            <td class="text-muted">{{ key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleString() : '从未使用' }}</td>
            <td class="actions">
              <button
                :class="['btn-action', key.status === 1 ? 'warning' : 'success']"
                @click="handleToggleStatus(key)"
                :title="key.status === 1 ? '禁用' : '启用'"
              >
                <i :class="key.status === 1 ? 'fas fa-pause' : 'fas fa-play'"></i>
              </button>
              <button class="btn-action danger" @click="handleDelete(key)" title="删除">
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 使用量统计 -->
    <div v-show="activeTab === 'usage'" class="content-card">
      <div class="card-header">
        <h3>近 7 天使用趋势</h3>
      </div>
      <div ref="chartRef" class="chart-container"></div>
    </div>

    <!-- 调用日志 -->
    <div v-show="activeTab === 'logs'" class="content-card">
      <div v-if="logsLoading" class="loading-state">加载中...</div>

      <table v-else class="data-table">
        <thead>
          <tr>
            <th>请求 ID</th>
            <th>模型</th>
            <th>接口</th>
            <th>状态</th>
            <th>耗时</th>
            <th>Token</th>
            <th>时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="log in logs" :key="log.id">
            <td class="code-font">{{ log.requestId?.substring(0, 8) }}...</td>
            <td>{{ log.model }}</td>
            <td>{{ log.endpoint }}</td>
            <td>
              <span :class="['status-badge', getLogStatusType(log.status)]">
                {{ log.status }}
              </span>
            </td>
            <td>{{ log.durationMs }}ms</td>
            <td>{{ log.totalTokens }}</td>
            <td class="text-muted">{{ new Date(log.createTime).toLocaleString() }}</td>
          </tr>
          <tr v-if="logs.length === 0">
            <td colspan="7" class="empty-state">暂无调用记录</td>
          </tr>
        </tbody>
      </table>

      <div v-if="logsTotal > logsPageSize" class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="logsTotal"
          :page-size="logsPageSize"
          :current-page="logsPage"
          @current-change="handleLogsPageChange"
        />
      </div>
    </div>

    <!-- 创建弹窗 -->
    <el-dialog v-model="createDialogVisible" title="创建 API Key" width="480px">
      <el-form label-width="80px">
        <el-form-item label="密钥名称">
          <el-input v-model="newKeyName" placeholder="请输入密钥名称，如：生产环境" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="createDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreate">创建</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
.api-key-view {
  max-width: 1200px;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.header-text h2 {
  font-size: 1.8rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 8px;
}

.header-text p {
  color: #64748b;
}

.btn-primary {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: #4338ca;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 48px;
  height: 48px;
  background: #eef2ff;
  color: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-icon.calls {
  background: #ecfdf5;
  color: #10b981;
}

.stat-icon.tokens {
  background: #fef3c7;
  color: #f59e0b;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 850;
  color: #0f172a;
}

.stat-label {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 600;
}

/* Tab 切换 */
.tabs-wrapper {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 8px;
  background: white;
  padding: 6px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  width: fit-content;
}

.tab {
  background: none;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.tab:hover {
  color: #0f172a;
}

.tab.active {
  background: #4f46e5;
  color: white;
}

/* 内容卡片 */
.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #0f172a;
}

/* 数据表格 */
.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th {
  text-align: left;
  padding: 12px 24px;
  background: #f8fafc;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  border-bottom: 1px solid #e2e8f0;
}

.data-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
}

.key-name {
  font-weight: 700;
  color: #0f172a;
}

/* 密钥显示 */
.key-display {
  display: flex;
  align-items: center;
  gap: 8px;
}

.key-value {
  background: #f1f5f9;
  padding: 6px 12px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.85rem;
  letter-spacing: 0.5px;
}

.btn-icon {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-icon:hover:not(:disabled) {
  background: #f1f5f9;
  color: #4f46e5;
}

.btn-icon:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.status-badge {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-badge.success {
  background: #dcfce7;
  color: #166534;
}

.status-badge.warning {
  background: #fef3c7;
  color: #92400e;
}

.status-badge.danger {
  background: #fee2e2;
  color: #991b1b;
}

.text-muted {
  color: #94a3b8;
}

.code-font {
  font-family: monospace;
  color: #64748b;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-action.success {
  background: #dcfce7;
  color: #166534;
}

.btn-action.warning {
  background: #fef3c7;
  color: #92400e;
}

.btn-action.danger {
  background: #fee2e2;
  color: #991b1b;
}

.btn-action:hover {
  transform: scale(1.1);
}

/* 图表容器 */
.chart-container {
  height: 300px;
  padding: 24px;
}

/* 空状态 */
.empty-state {
  padding: 80px 24px;
  text-align: center;
  color: #94a3b8;
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 16px;
  display: block;
}

.empty-state p {
  margin-bottom: 24px;
}

.loading-state {
  padding: 80px 24px;
  text-align: center;
  color: #94a3b8;
}

/* 分页 */
.pagination {
  padding: 20px 24px;
  display: flex;
  justify-content: center;
  border-top: 1px solid #f1f5f9;
}
</style>
