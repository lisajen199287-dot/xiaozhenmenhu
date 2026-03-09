<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useUser } from '@/utils/userStore'



interface AppPermission {

  appKey: string; permissionLevel: string; quotaLimit: number; quotaUsed: number; expireAt: string

}

interface Application {

  appKey: string; name: string; description: string; icon: string; url: string

}



const { user } = useUser()

const userApps = ref<(Application & AppPermission)[]>([])

const loading = ref(true)



const fetchData = async () => {

  if (!user.value) return

  loading.value = true

  try {

    const uid = user.value.id

    const [permRes, appsRes] = await Promise.all([

      fetch(`/api/app-permissions/user/${uid}`),

      fetch('/api/applications')

    ])

    

    if (permRes.ok && appsRes.ok) {

        const perms = await permRes.json()

        const apps = await appsRes.json()

        userApps.value = perms.map((p: any) => ({ ...p, ...(apps.find((a: any) => a.appKey === p.appKey) || { name: p.appKey, icon: 'fas fa-app', description: '' }) }))

    }

  } catch (e) {

    console.error(e)

  } finally {

    loading.value = false

  }

}



const handleOpenApp = (url: string) => {

    window.open(url, '_blank')

}



onMounted(fetchData)

</script>



<template>

  <div class="apps-view">

    <div class="page-header">

      <div class="header-text">

        <h2>我的应用</h2>

        <p>管理您的 AI 应用集成与资源额度</p>

      </div>

      <button class="btn-primary" @click="handleOpenApp('/app-center')">去应用中心挑选</button>

    </div>



    <div v-if="loading" class="loading-state">载入应用列表...</div>



    <div v-else class="apps-grid">

      <div v-for="app in userApps" :key="app.appKey" class="app-card">

        <div class="app-card-header">

          <div class="app-icon"><i :class="app.icon"></i></div>

          <div class="app-header-info">

            <h3>{{ app.name }}</h3>

            <span class="app-id">{{ app.appKey }}</span>

          </div>

          <div class="app-status">

             <span class="status-dot active"></span>

             运行中

          </div>

        </div>

        

        <div class="app-card-body">

          <div class="info-row">

            <span class="label">授权版本</span>

            <span class="value">{{ app.permissionLevel === 'basic' ? '基础版' : '进阶版' }}</span>

          </div>

          <div class="info-row">

            <span class="label">额度消耗</span>

            <span class="value">{{ app.quotaUsed }} / {{ app.quotaLimit }}</span>

          </div>

          <div class="info-row">

             <span class="label">过期时间</span>

             <span class="value">{{ app.expireAt ? new Date(app.expireAt).toLocaleDateString() : '长期有效' }}</span>

          </div>

        </div>



        <div class="app-card-footer">

          <button class="btn-primary-mini" @click="handleOpenApp(app.url)">进入工作空间</button>

          <button class="btn-text">查看日志</button>

          <div class="spacer"></div>

          <button class="btn-icon"><i class="fas fa-ellipsis-h"></i></button>

        </div>

      </div>

      <div v-if="userApps.length === 0" class="empty-state">

          您当前没有任何活跃应用，去应用中心看看吧！

      </div>

    </div>

  </div>

</template>



<style scoped>

.apps-view { display: flex; flex-direction: column; }

.page-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }

.header-text h2 { font-size: 1.8rem; font-weight: 850; color: #0f172a; margin-bottom: 8px; }

.header-text p { color: #64748b; }

.btn-primary { background: #4f46e5; color: white; border: none; padding: 12px 24px; border-radius: 6px; font-weight: 650; cursor: pointer; transition: all 0.2s; }

.btn-primary:hover { background: #4338ca; transform: translateY(-1px); }



.apps-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }

.app-card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; transition: all 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.app-card:hover { border-color: #cbd5e1; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); }

.app-card-header { display: flex; gap: 16px; margin-bottom: 24px; }

.app-icon { width: 48px; height: 48px; background: #f0f4ff; color: #4f46e5; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; }

.app-header-info { flex: 1; }

.app-header-info h3 { font-size: 1.1rem; font-weight: 800; color: #0f172a; margin-bottom: 4px; }

.app-id { font-family: monospace; font-size: 0.8rem; color: #94a3b8; }

.app-status { font-size: 0.85rem; display: flex; align-items: center; gap: 6px; height: fit-content; font-weight: 600; color: #10b981; }

.status-dot { width: 6px; height: 6px; border-radius: 50%; background: #10b981; }



.app-card-body { display: flex; flex-direction: column; gap: 12px; padding-bottom: 20px; border-bottom: 1px solid #f1f5f9; margin-bottom: 16px; }

.info-row { display: flex; justify-content: space-between; font-size: 0.9rem; }

.info-row .label { color: #64748b; }

.info-row .value { color: #1e293b; font-weight: 700; }



.app-card-footer { display: flex; align-items: center; gap: 12px; }

.btn-primary-mini { background: #0f172a; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; }

.btn-text { background: none; border: none; color: #64748b; font-weight: 600; font-size: 0.85rem; cursor: pointer; }

.btn-text:hover { color: #4f46e5; }

.btn-icon { background: none; border: none; color: #94a3b8; cursor: pointer; }



.loading-state, .empty-state { padding: 80px; text-align: center; color: #94a3b8; grid-column: 1 / -1; }

</style>
