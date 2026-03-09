<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useUser } from '@/utils/userStore'

import { ElMessage, ElMessageBox } from 'element-plus'



interface ApiKey {

  id: number; name: string; apiKey: string; status: string; createdAt: string

}



const { user } = useUser()

const apiKeys = ref<ApiKey[]>([])

const loading = ref(false)



const fetchData = async () => {

    if (!user.value) return

    loading.value = true

    try {

        const res = await fetch(`/api/console/api-keys/${user.value.id}`)

        if (res.ok) apiKeys.value = await res.json()

    } catch (e) {

        ElMessage.error('获取密钥列表失败')

    } finally {

        loading.value = false

    }

}



const handleCreateApiKey = async () => {

    const result = await ElMessageBox.prompt('请输入密钥名称', '新建 API 密钥', {
        confirmButtonText: '创建', cancelButtonText: '取消', inputPlaceholder: '如：生产环境Key', inputPattern: /.+/, inputErrorMessage: '名称不能为空'
    })
    const name = (result as any).value

    if (!name) return

    

    try {

        const res = await fetch('/api/console/api-keys', {

            method: 'POST',

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify({ userId: user.value?.id, name })

        })

        if (res.ok) { ElMessage.success('密钥创建成功'); fetchData() }

    } catch (e) { ElMessage.error('创建失败') }

}



const handleDeleteApiKey = async (id: number) => {

    try {

        await ElMessageBox.confirm('删除后，使用此密钥的应用将无法访问，确定要删除吗？', '确认删除', { type: 'warning' })

        const res = await fetch(`/api/console/api-keys/${id}?userId=${user.value?.id}`, { method: 'DELETE' })

        if (res.ok) { ElMessage.success('已删除'); fetchData() }

    } catch (e) {}

}



const copyToClipboard = (text: string) => {

    navigator.clipboard.writeText(text)

    ElMessage.success('已复制到剪贴板')

}



onMounted(fetchData)

</script>



<template>

  <div class="api-view">

    <div class="page-header">

      <div class="header-text">

        <h2>API 管理</h2>

        <p>管理您的开发密钥，用于集成 CII 服务到您的自有系统中</p>

      </div>

      <button class="btn-primary" @click="handleCreateApiKey"><i class="fas fa-plus"></i> 创建新密钥</button>

    </div>



    <div class="usage-summary">

      <div class="summary-card">

        <span class="label">本月调用总量</span>

        <div class="value">0 <span class="unit">Tokens</span></div>

        <div class="progress-bar"><div class="progress" style="width: 0%"></div></div>

        <span class="sub-text">额度充足</span>

      </div>

      <div class="summary-card">

        <span class="label">今日请求数</span>

        <div class="value">0 <span class="unit">Reqs</span></div>

        <div class="trend up">暂无数据</div>

      </div>

      <div class="summary-card">

        <span class="label">平均响应延迟</span>

        <div class="value">-- <span class="unit">ms</span></div>

        <div class="trend up">服务稳定</div>

      </div>

    </div>



    <div class="content-card">

      <div class="card-header"><h3>API 密钥列表</h3></div>

      <div v-if="loading" class="loading-state">密钥加载中...</div>

      <table v-else class="keys-table">

        <thead>

          <tr><th>显示名称</th><th>密钥内容 (Secret Key)</th><th>创建时间</th><th>状态</th><th>操作</th></tr>

        </thead>

        <tbody>

          <tr v-for="key in apiKeys" :key="key.id">

            <td class="name-cell">{{ key.name }}</td>

            <td class="code-font">

              {{ key.apiKey }}

              <button class="btn-copy" @click="copyToClipboard(key.apiKey)"><i class="far fa-copy"></i></button>

            </td>

            <td class="text-muted">{{ new Date(key.createdAt).toLocaleString() }}</td>

            <td><span class="status-badge active">{{ key.status === 'ACTIVE' ? '已启用' : '已停用' }}</span></td>

            <td><button class="btn-danger-text" @click="handleDeleteApiKey(key.id)">删除</button></td>

          </tr>

          <tr v-if="apiKeys.length === 0">

              <td colspan="5" class="empty-state">您尚未创建任何 API 密钥</td>

          </tr>

        </tbody>

      </table>

    </div>

  </div>

</template>



<style scoped>

.api-view { display: flex; flex-direction: column; }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }

.btn-primary { background: #0f172a; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: 700; cursor: pointer; display: flex; align-items: center; gap: 8px; transition: all 0.2s; }

.btn-primary:hover { background: #1e293b; transform: translateY(-1px); }



.usage-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-bottom: 32px; }

.summary-card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.summary-card .label { display: block; font-size: 0.9rem; color: #64748b; font-weight: 700; margin-bottom: 12px; }

.summary-card .value { font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 12px; }

.summary-card .unit { font-size: 0.9rem; color: #94a3b8; font-weight: 600; }

.progress-bar { width: 100%; height: 6px; background: #f1f5f9; border-radius: 3px; margin-bottom: 8px; overflow: hidden; }

.progress { height: 100%; background: #4f46e5; border-radius: 3px; }

.sub-text { font-size: 0.8rem; color: #64748b; }

.trend { font-size: 0.85rem; font-weight: 600; color: #10b981; }



.content-card { background: white; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; }

.card-header { padding: 20px 24px; border-bottom: 1px solid #f1f5f9; }

.card-header h3 { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin: 0; }

.keys-table { width: 100%; border-collapse: collapse; }

.keys-table th { text-align: left; padding: 12px 24px; background: #f8fafc; color: #64748b; font-size: 0.8rem; font-weight: 700; border-bottom: 1px solid #e2e8f0; }

.keys-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #334155; vertical-align: middle; }

.name-cell { font-weight: 700; color: #0f172a; }

.code-font { font-family: monospace; color: #64748b; background: #f8fafc; padding: 6px 10px; border-radius: 4px; display: inline-flex; align-items: center; gap: 8px; border: 1px solid #f1f5f9; }

.btn-copy { background: none; border: none; color: #94a3b8; cursor: pointer; padding: 0; font-size: 0.9rem; }

.btn-copy:hover { color: #4f46e5; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 700; background: #dcfce7; color: #166534; }

.btn-danger-text { background: none; border: none; color: #ef4444; font-weight: 700; font-size: 0.85rem; cursor: pointer; }

.loading-state, .empty-state { padding: 80px; text-align: center; color: #94a3b8; }

</style>