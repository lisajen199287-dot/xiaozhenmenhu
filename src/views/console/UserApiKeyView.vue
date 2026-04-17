<script setup lang="ts">
import { ref, onMounted, defineAsyncComponent } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useUser } from '@/utils/userStore'
import {
  apiGetApiKeys,
  apiCreateApiKey,
  apiDeleteApiKey,
  apiToggleApiKeyStatus,
  apiGetApiUsage,
  apiGetFullKey
} from '@/api/newApi/index'

const ApiDocsTab = defineAsyncComponent(() => import('./components/ApiDocsTab.vue'))

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

const { user } = useUser()

// API Key 列表
const apiKeys = ref<ApiKey[]>([])
const loading = ref(false)

// 已加载完整密钥的 Key ID 集合
const loadedFullKeys = ref<Set<number>>(new Set())
// 正在加载完整密钥的 Key ID
const loadingFullKeys = ref<Set<number>>(new Set())

// 创建弹窗
const createDialogVisible = ref(false)
const newKeyName = ref('')
// 新创建的完整密钥（仅创建后显示一次）
const newCreatedKey = ref('')

// 当前显示的 Tab
const activeTab = ref('keys')

// 今日统计
const todayCalls = ref(0)
const todayCredits = ref(0)

// 获取使用量统计
const fetchUsage = async () => {
  try {
    const res = await apiGetApiUsage(1)
    const stats = res?.dailyStats || res?.data?.dailyStats || []
    if (Array.isArray(stats) && stats.length > 0) {
      const today = stats[stats.length - 1]
      todayCalls.value = today.callCount || 0
      todayCredits.value = today.actualTokens || 0
    }
  } catch {
    // 接口不可用时保持默认值 0
  }
}

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

// 状态颜色
const getStatusType = (status: number) => status === 1 ? 'success' : 'danger'
const getStatusText = (status: number) => status === 1 ? '启用' : '禁用'

onMounted(() => {
  fetchApiKeys()
  fetchUsage()
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
          <div class="stat-value">{{ todayCredits.toLocaleString() }}</div>
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
        <button :class="['tab', { active: activeTab === 'docs' }]" @click="activeTab = 'docs'">
          <i class="fas fa-book"></i> API文档
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

    <!-- API文档 -->
    <div v-show="activeTab === 'docs'" class="content-card docs-card">
      <ApiDocsTab />
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

/* API文档卡片 */
.docs-card {
  padding: 0;
  min-height: 600px;
  overflow: hidden;
}
</style>
