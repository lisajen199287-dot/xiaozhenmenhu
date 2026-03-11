<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import RichTextEditor from '@/components/RichTextEditor.vue'

interface Article {
    id: number;
    title: string;
    author: string;
    category: string;
    date: string;
    status: string;
    content: string;
    image: string;
    startTime: string; 
    endTime: string; 
    linkType: 'INTERNAL_RICH_TEXT' | 'EXTERNAL_LANDING';
    externalLink: string;
    pushToNav: boolean;
    
}

const activities = ref<Article[]>([])
const showForm = ref(false)
const isEditingForm = ref(false)

const router = useRouter()
const route = useRoute()

const formatForDatetimeLocal = (dbString?: string) => {
    if (!dbString) return ''
    // Convert "2026-02-27 10:00:00" to HTML5 datetime-local compatible "2026-02-27T10:00"
    if (dbString.includes(' ')) {
        const parts = dbString.split(' ')
        if (parts.length >= 2 && parts[1]) {
            return `${parts[0]}T${parts[1].substring(0, 5)}`
        }
    }
    return dbString.substring(0, 16) // If already ISO-like, trim to minute level
}

const parseFromDatetimeLocal = (dtLocal: string) => {
    if (!dtLocal) return ''
    // Convert "2026-02-27T10:00" back to MySQL DATETIME "2026-02-27 10:00:00"
    if (dtLocal.includes('T')) {
        let parts = dtLocal.split(':');
        let parsed = dtLocal.replace('T', ' ');
        if (parts.length === 2) {
            parsed += ':00'; // Add seconds resolution if missing
        }
        return parsed;
    }
    return dtLocal;
}

const getLocalDatetimeString = (d: Date) => {
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, '0')
    const dd = String(d.getDate()).padStart(2, '0')
    const hh = String(d.getHours()).padStart(2, '0')
    const min = String(d.getMinutes()).padStart(2, '0')
    return `${yyyy}-${mm}-${dd}T${hh}:${min}`
}

const emptyActivity = (): Article => ({
    id: 0, title: '', author: '运营专员', category: '最新资讯',
    date: new Date().toISOString().substring(0, 10), status: '已发布',
    content: '', image: '',
    startTime: getLocalDatetimeString(new Date()), 
    endTime: getLocalDatetimeString(new Date(Date.now() + 365 * 24 * 3600 * 1000)), 
    linkType: 'INTERNAL_RICH_TEXT', externalLink: '',
    pushToNav: false
})

const currentArticle = ref<Article>(emptyActivity())

const syncStateWithRoute = () => {
    if (route.query.action === 'create') {
        isEditingForm.value = false
        currentArticle.value = emptyActivity()
        showForm.value = true
    } else if (route.query.edit) {
        const id = Number(route.query.edit)
        const art = activities.value.find(a => a.id === id)
        if (art) {
            isEditingForm.value = true
            currentArticle.value = { ...art }
            if (!currentArticle.value.linkType) currentArticle.value.linkType = 'INTERNAL_RICH_TEXT'
            currentArticle.value.startTime = formatForDatetimeLocal(currentArticle.value.startTime) || getLocalDatetimeString(new Date())
            currentArticle.value.endTime = formatForDatetimeLocal(currentArticle.value.endTime) || getLocalDatetimeString(new Date(Date.now() + 365 * 24 * 3600 * 1000))
            showForm.value = true
        } else if (activities.value.length > 0) {
            // Document not found, gracefully return
            showForm.value = false
            router.replace({ query: {} })
        }
    } else {
        showForm.value = false
    }
}

watch(() => route.query, syncStateWithRoute)

const fetchActivities = async () => {
    try {
        const res = await fetch('/api/articles')
        if (res.ok) {
            activities.value = await res.json()
            syncStateWithRoute()
        }
    } catch (e) {
        console.error(e)
    }
}

onMounted(() => fetchActivities())

const openCreateForm = () => {
    router.push({ query: { action: 'create' } })
}

const openEditForm = (art: Article) => {
    router.push({ query: { edit: art.id } })
}

const saveActivity = async () => {
    if (!currentArticle.value.title) return alert('请输入文章标题')
    if (!currentArticle.value.date) return alert('请选择发布日期')
    if (!currentArticle.value.startTime || !currentArticle.value.endTime) return alert('请输入文章生效与结束时间')
    if (currentArticle.value.linkType === 'EXTERNAL_LANDING' && !currentArticle.value.externalLink) return alert('请输入外链地址')

    const payload: any = { ...currentArticle.value }
    payload.startTime = parseFromDatetimeLocal(payload.startTime) || payload.startTime
    payload.endTime = parseFromDatetimeLocal(payload.endTime) || payload.endTime

    try {
        let url = '/api/articles'
        let method = 'POST'
        if (isEditingForm.value && payload.id) {
            url = `/api/articles/${payload.id}`
            method = 'PUT'
        } else {
            delete payload.id // Remove id for creation
        }

        const res = await fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })

        if (res.ok) {
            await fetchActivities()
            router.push({ query: {} })
            alert('保存成功！')
        } else {
             // Extract text error from server to show to the user
             let errMsg = '服务端返回错误'
             try {
                const text = await res.text()
                if (text) errMsg = text
             } catch(e) {}
             alert(`保存失败: ${res.status} ${res.statusText}\n${errMsg}`)
        }
    } catch (e: any) {
        alert(`保存失败，网络故障或前端报错:\n${e.message || String(e)}`)
    }
}

const deleteActivity = async (id: number) => {
    if (window.confirm('确认彻底删除这篇文章吗？')) {
        try {
            const res = await fetch('/api/articles/' + id, { method: 'DELETE' })
            if (res.ok) {
                await fetchActivities()
            } else {
                alert('删除失败：服务端报错')
            }
        } catch (err) {
            alert('删除失败：网络无响应')
        }
    }
}

const previewArticle = (art: Article) => {
    if (art.linkType === 'EXTERNAL_LANDING' && art.externalLink) {
        window.open(art.externalLink, '_blank')
    } else {
        // Build absolute URL for frontend preview
        const previewUrl = window.location.origin + '/news/' + art.id
        window.open(previewUrl, '_blank')
    }
}

const isExpired = (endTime: string) => {
    if (!endTime) return false
    return new Date(endTime) < new Date()
}

const isActive = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return false
    const now = new Date()
    return new Date(startTime) <= now && new Date(endTime) >= now
}

// Stats
const heroActivities = computed(() => activities.value.filter(a => a.pushToHero))
const navActivities = computed(() => activities.value.filter(a => a.pushToNav && !isExpired(a.endTime)))
const activeCount = computed(() => activities.value.filter(a => isActive(a.startTime, a.endTime)).length)
</script>

<template>
  <div class="activity-admin">
    <!-- List View -->
    <div v-if="!showForm">
      <!-- Visual Dashboard -->
      <div class="radar-dashboard">
         <div class="radar-card">
            <div class="radar-header">
               <i class="fas fa-images text-blue-500"></i>
               <h3>首页轮播文章</h3>
            </div>
            <div class="radar-body">
               <div v-if="heroActivities.length === 0" class="empty-state">目前没有文章推送到首页</div>
               <div v-for="a in heroActivities" :key="a.id" class="radar-item" :class="{ 'expired': isExpired(a.endTime) }">
                  <span class="item-title" :title="a.title">{{ a.title }}</span>
                  <span v-if="isExpired(a.endTime)" class="status-badge error">已强制下线</span>
                  <span v-else class="status-badge success">展示中</span>
               </div>
            </div>
         </div>

         <div class="radar-card">
            <div class="radar-header">
               <i class="fas fa-chevron-circle-down text-purple-500"></i>
               <h3>导航菜单推荐</h3>
            </div>
            <div class="radar-body">
               <div v-if="navActivities.length === 0" class="empty-state">导航栏目前无推荐</div>
               <div v-for="a in navActivities" :key="a.id" class="radar-item">
                  <span class="item-title" :title="a.title">{{ a.title }} <span style="color:#a1a1aa; font-size: 0.75rem;">({{ a.category }})</span></span>
                  <span class="status-badge success">在线</span>
               </div>
            </div>
         </div>

         <div class="radar-card stats-card">
            <div class="stats-big">
               <span class="num">{{ activeCount }}</span>
               <span class="lbl">篇在线展示的文章</span>
            </div>
            <button class="btn-primary-admin grand-btn" @click="openCreateForm">
               <i class="fas fa-edit"></i> 发布新文章
            </button>
         </div>
      </div>

      <!-- Article List -->
      <div class="admin-table-container mt-6">
        <table class="admin-table">
          <thead>
            <tr>
              <th>文章标题</th>
              <th>发布渠道</th>
              <th>展示状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="art in activities" :key="art.id">
              <td class="td-title">
                 <div style="font-weight: bold; color: #1e293b;">{{ art.title }}</div>
                 <div style="font-size: 0.75rem; color: #64748b; margin-top: 4px;">{{ art.category }} | {{ art.linkType === 'EXTERNAL_LANDING' ? '外部链接' : '内部图文' }}</div>
              </td>
              <td>
                <div class="channel-tags">
                  <span v-if="art.pushToHero" class="channel hero">首页</span>
                  <span v-if="art.pushToNav" class="channel nav">导航</span>
                  <span class="channel news">列表</span>
                </div>
              </td>
              <td>
                 <div v-if="isExpired(art.endTime)" style="font-size: 0.75rem; color: #ef4444; font-weight: bold;"><i class="fas fa-times-circle"></i> 已过期</div>
                 <div v-else-if="isActive(art.startTime, art.endTime)" style="font-size: 0.75rem; color: #16a34a; font-weight: bold;"><i class="fas fa-check-circle"></i> 展示中</div>
                 <div v-else style="font-size: 0.75rem; color: #64748b; font-weight: bold;"><i class="fas fa-clock"></i> 待生效</div>
                 <div style="font-size: 0.65rem; color: #94a3b8; margin-top: 4px;">{{ art.startTime ? art.startTime.split('T').join(' ') : '未定' }} 至 {{ art.endTime ? art.endTime.split('T').join(' ') : '无限制' }}</div>
              </td>
              <td class="td-actions">
                <button class="btn-icon-action" title="预览" @click="previewArticle(art)"><i class="fas fa-eye"></i></button>
                <button class="btn-icon-action" title="编辑" @click="openEditForm(art)"><i class="fas fa-edit"></i></button>
                <button class="btn-icon-action delete" title="删除" @click="deleteActivity(art.id)"><i class="fas fa-trash-alt"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Form View -->
    <div v-else class="form-view">
      <div class="form-header">
         <h2 class="form-title">
            <button class="btn-back" @click="router.push({ query: {} })"><i class="fas fa-arrow-left"></i></button>
            {{ isEditingForm ? '编辑文章' : '发布新文章' }}
         </h2>
         <button class="btn-primary" @click="saveActivity">保存</button>
      </div>
      
      <div class="form-body">
         <div class="form-section">
            <h3 class="section-title">基本信息</h3>
            <div class="form-grid">
               <div class="form-group span-2">
                  <label>文章标题</label>
                  <input v-model="currentArticle.title" type="text" placeholder="输入文章的标题...">
               </div>
               <div class="form-group">
                  <label>文章类别</label>
                  <select v-model="currentArticle.category">
                     <option>最新资讯</option>
                     <option>行业动态</option>
                     <option>政策通知</option>
                     <option>技术沙龙</option>
                  </select>
               </div>
               <div class="form-group">
                  <label>内容发布日期</label>
                  <input v-model="currentArticle.date" type="date">
               </div>
               <div class="form-group span-2">
                  <label>文章封面图 (可选)</label>
                  <input v-model="currentArticle.image" type="text" placeholder="输入封面图 URL">
               </div>
               <div class="form-group span-2 link-type-toggle">
                  <label>内容呈现形式</label>
                  <div class="toggle-buttons">
                     <button :class="{ active: currentArticle.linkType === 'INTERNAL_RICH_TEXT' }" @click="currentArticle.linkType = 'INTERNAL_RICH_TEXT'">
                        本站图文
                     </button>
                     <button :class="{ active: currentArticle.linkType === 'EXTERNAL_LANDING' }" @click="currentArticle.linkType = 'EXTERNAL_LANDING'">
                        外部链接
                     </button>
                  </div>
               </div>
               
               <div v-if="currentArticle.linkType === 'EXTERNAL_LANDING'" class="form-group span-2">
                  <label>外链地址</label>
                  <input v-model="currentArticle.externalLink" type="text" placeholder="https://...">
               </div>
               
               <div v-if="currentArticle.linkType === 'INTERNAL_RICH_TEXT'" class="form-group span-2">
                  <label>正文内容</label>
                  <div class="rich-text-wrapper">
                     <RichTextEditor v-model="currentArticle.content" height="600px" />
                  </div>
               </div>
            </div>
         </div>

         <div class="form-section">
            <h3 class="section-title">展示控制</h3>
            <div class="form-grid">
               <div class="form-group">
                  <label>生效时间</label>
                  <input v-model="currentArticle.startTime" type="datetime-local">
               </div>
               <div class="form-group">
                  <label>过期时间</label>
                  <input v-model="currentArticle.endTime" type="datetime-local">
               </div>
            </div>
         </div>

         <div class="form-section">
            <h3 class="section-title">推荐与分发位置</h3>
            <div class="placements">
               <label class="placement-card">
                  <input type="checkbox" checked disabled>
                  <div class="p-details">
                     <h4>基础列表曝光</h4>
                     <p>发布后默认出现在全部文章列表中</p>
                  </div>
               </label>
               <label class="placement-card">
                  <input type="checkbox" v-model="currentArticle.pushToNav">
                  <div class="p-details">
                     <h4>顶部导航下拉推荐</h4>
                     <p>将文章推荐至网站顶部导航的下拉菜单中</p>
                  </div>
               </label>
            </div>
         </div>

         <div class="form-actions-sticky">
            <button class="btn-primary-large" @click="saveActivity"><i class="fas fa-save"></i> 提交保存</button>
         </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.activity-admin { padding: 20px 0; }

.radar-dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.radar-card {
  background: white; border-radius: 12px; border: 1px solid #e2e8f0; padding: 24px; box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.radar-header { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
.radar-header h3 { font-size: 1.1rem; font-weight: 700; color: #1e293b; margin: 0; }
.radar-header i { font-size: 1.4rem; }

.radar-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px dashed #e2e8f0; }
.radar-item:last-child { border: none; padding-bottom: 0; }

.item-title { font-size: 0.85rem; font-weight: 600; color: #475569; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 65%; }

.status-badge { padding: 4px 8px; border-radius: 4px; font-size: 0.65rem; font-weight: 700; text-transform: uppercase; }
.status-badge.success { background: #dcfce7; color: #16a34a; }
.status-badge.error { background: #fee2e2; color: #dc2626; }

.expired .item-title { text-decoration: line-through; color: #cbd5e1; }
.empty-state { font-size: 0.85rem; color: #94a3b8; text-align: center; padding: 20px 0; font-weight: 500; }

.stats-card { display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; background: #f8fafc; }
.stats-big .num { font-size: 3rem; font-weight: 800; color: #0f172a; line-height: 1; display: block; }
.stats-big .lbl { font-size: 0.85rem; font-weight: 600; color: #64748b; margin-top: 8px; display: block; }

.btn-primary-admin {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    transition: background 0.2s;
}
.btn-primary-admin:hover { background: #2563eb; }

.grand-btn { margin-top: 24px; width: 100%; height: 48px; font-size: 0.95rem; }

.admin-table-container { background: white; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
.admin-table { width: 100%; border-collapse: collapse; text-align: left; }
.admin-table th { background: #f8fafc; padding: 16px 24px; font-size: 0.85rem; font-weight: 600; color: #475569; border-bottom: 1px solid #e2e8f0; }
.admin-table td { padding: 16px 24px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }

.channel-tags { display: flex; gap: 8px; }
.channel { padding: 4px 10px; border-radius: 4px; font-size: 0.75rem; font-weight: 600; }
.channel.hero { background: #e0e7ff; color: #4338ca; }
.channel.nav { background: #fce7f3; color: #c026d3; }
.channel.news { background: #f1f5f9; color: #475569; }

.btn-icon-action { width: 32px; height: 32px; border-radius: 4px; border: 1px solid #e2e8f0; background: white; color: #64748b; cursor: pointer; transition: 0.2s; margin-right: 8px; display: inline-flex; align-items: center; justify-content: center; }
.btn-icon-action:hover { background: #f8fafc; color: #0f172a; border-color: #cbd5e1; }
.btn-icon-action.delete:hover { background: #fee2e2; color: #dc2626; border-color: #fca5a5; }

/* Form View Styling */
.form-view {
   background: white;
   border: 1px solid #e2e8f0;
   border-radius: 12px;
   padding: 32px;
   box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.form-header {
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 32px;
   padding-bottom: 24px;
   border-bottom: 1px solid #e2e8f0;
}

.form-title {
   font-size: 1.25rem;
   font-weight: 700;
   display: flex;
   align-items: center;
   gap: 16px;
   margin: 0;
   color: #0f172a;
}

.btn-back {
   width: 36px;
   height: 36px;
   background: #f1f5f9;
   border: none;
   border-radius: 6px;
   color: #475569;
   cursor: pointer;
   transition: background 0.2s;
}
.btn-back:hover { background: #e2e8f0; color: #0f172a; }

.btn-primary {
   background: #3b82f6;
   color: white;
   border: none;
   padding: 10px 24px;
   border-radius: 6px;
   font-weight: 600;
   cursor: pointer;
   transition: background 0.2s;
}
.btn-primary:hover { background: #2563eb; }

.form-body {
   display: flex;
   flex-direction: column;
   gap: 40px;
}

.form-section {
   display: flex;
   flex-direction: column;
   gap: 20px;
}

.section-title {
   font-size: 1.05rem;
   font-weight: 600;
   color: #1e293b;
   margin: 0;
}

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
.form-group { display: flex; flex-direction: column; gap: 8px; }
.form-group.span-2 { grid-column: span 2; }
.form-group label { font-weight: 600; font-size: 0.9rem; color: #475569; }

.form-group input, .form-group select {
   width: 100%; height: 44px; padding: 0 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; transition: 0.2s;
}
.form-group input:focus, .form-group select:focus {
   border-color: #3b82f6; outline: none; box-shadow: 0 0 0 3px rgba(59,130,246,0.1);
}

.toggle-buttons { display: flex; gap: 16px; }
.toggle-buttons button { flex: 1; height: 44px; border-radius: 6px; border: 1px solid #cbd5e1; background: white; font-weight: 600; color: #64748b; font-size: 0.95rem; cursor: pointer; transition: 0.2s; }
.toggle-buttons button:hover { background: #f8fafc; }
.toggle-buttons button.active { border-color: #3b82f6; background: #eff6ff; color: #2563eb; }

.rich-text-wrapper {
   border: 1px solid #cbd5e1;
   border-radius: 6px;
   overflow: hidden;
}

.placements { display: flex; flex-direction: column; gap: 16px; }
.placement-card { display: flex; align-items: flex-start; gap: 16px; padding: 16px 20px; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 8px; cursor: pointer; transition: 0.2s; margin: 0; }
.placement-card:hover { border-color: #cbd5e1; background: #fff; }
.placement-card input { margin-top: 3px; transform: scale(1.1); cursor: pointer; }
.p-details h4 { margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; color: #0f172a; }
.p-details p { margin: 0; font-size: 0.85rem; color: #64748b; line-height: 1.4; }

.hero-bg-config { margin-top: 16px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; gap: 8px; }
.hero-bg-config label { font-size: 0.9rem; font-weight: 600; color: #475569; }
.hero-bg-config input { width: 100%; height: 44px; padding: 0 14px; border: 1px solid #cbd5e1; border-radius: 6px; font-size: 0.95rem; }

.field-help {
   margin: 8px 0 0 0;
   font-size: 0.75rem;
   color: #64748b;
   line-height: 1.5;
   background: #f1f5f9;
   padding: 8px 12px;
   border-radius: 4px;
   border-left: 3px solid #3b82f6;
}
.field-help i { color: #3b82f6; margin-right: 4px; }

.form-actions-sticky {
   position: sticky;
   bottom: 24px;
   display: flex;
   justify-content: flex-end;
   margin-top: 40px;
   padding: 16px 24px;
   background: rgba(255, 255, 255, 0.9);
   backdrop-filter: blur(8px);
   border-radius: 12px;
   border: 1px solid #e2e8f0;
   box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1);
   z-index: 100;
}

.btn-primary-large {
   background: #3b82f6;
   color: white;
   border: none;
   padding: 12px 32px;
   border-radius: 8px;
   font-weight: 700;
   font-size: 1.05rem;
   cursor: pointer;
   transition: all 0.2s;
   display: flex;
   align-items: center;
   gap: 8px;
   box-shadow: 0 4px 6px -1px rgba(59,130,246,0.3);
}

.btn-primary-large:hover {
   background: #2563eb;
   transform: translateY(-2px);
   box-shadow: 0 6px 10px -1px rgba(59,130,246,0.4);
}
</style>