<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import RichTextEditor from '@/components/RichTextEditor.vue'

interface Event {
    id: number;
    title: string;
    category: string;
    registrations: number;
    status: string;
    description: string;
    tag: string;
    deadline: string;
    location: string;
    duration: string;
    icon: string;
    badge: string;
}

const route = useRoute()
const router = useRouter()
const isEditing = ref(false)
const loading = ref(false)

const event = ref<Event>({
    id: 0,
    title: '',
    category: '市场活动',
    registrations: 0,
    status: '筹备中',
    description: '',
    tag: '线下',
    deadline: '',
    location: '',
    duration: '',
    icon: 'calendar-alt',
    badge: 'New'
})

const fetchEvent = async (id: string) => {
    loading.value = true
    try {
        const res = await fetch(`/api/events/${id}`)
        if (res.ok) {
            event.value = await res.json()
        } else {
            alert('活动不存在')
            router.push('/admin/events')
        }
    } catch (e) {
        console.error(e)
        alert('获取数据失败')
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    const id = route.params.id as string
    if (id) {
        isEditing.value = true
        fetchEvent(id)
    }
})

const saveEvent = async () => {
    if (!event.value.title) return alert('请输入活动名称')

    try {
        let url = '/api/events'
        let method = 'POST'
        if (isEditing.value) {
            url = `/api/events/${event.value.id}`
            method = 'PUT'
        }

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(event.value)
        })

        if (res.ok) {
            alert('保存成功')
            router.push('/admin/events')
        } else {
            alert('保存失败')
        }
    } catch (e) {
        console.error(e)
        alert('网络错误')
    }
}

const goBack = () => {
    router.push('/admin/events')
}
</script>

<template>
    <div class="event-edit-container">
        <div class="edit-header">
            <div class="header-left">
                <button class="btn-back" @click="goBack"><i class="fas fa-arrow-left"></i> 返回列表</button>
                <h2>{{ isEditing ? '编辑内容：' + event.title : '发布新活动' }}</h2>
            </div>
            <div class="header-right">
                <button class="btn-cancel-flat" @click="goBack">取消</button>
                <button class="btn-save-main" @click="saveEvent">
                    <i class="fas fa-check"></i> 确认保存发布
                </button>
            </div>
        </div>

        <div v-if="loading" class="loading-overlay">
            <div class="spinner"></div>
            <p>正在读取中...</p>
        </div>

        <div class="edit-content-layout" v-else>
            <!-- Main Content Area (Wide) -->
            <div class="main-form">
                <div class="form-card">
                    <div class="form-group">
                        <label>活动主标题 <span class="required">*</span></label>
                        <input v-model="event.title" type="text" class="input-title" placeholder="请在这里输入直观、吸引人的活动标题">
                    </div>

                    <div class="form-group editor-group">
                        <label>活动详细内容介绍</label>
                        <div class="editor-wrapper">
                            <RichTextEditor v-model="event.description" />
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sidebar Area (Narrow) -->
            <aside class="side-form">
                <div class="form-card compact">
                    <h3 class="card-title">基础配置</h3>
                    <div class="form-group">
                        <label>分类</label>
                        <select v-model="event.category">
                            <option>促销活动</option>
                            <option>市场活动</option>
                            <option>培训活动</option>
                            <option>其它专题</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>当前状态</label>
                        <select v-model="event.status">
                            <option>筹备中</option>
                            <option>进行中</option>
                            <option>报名中</option>
                            <option>已结案</option>
                        </select>
                    </div>
                </div>

                <div class="form-card compact">
                    <h3 class="card-title">延伸详情</h3>
                    <div class="form-group">
                        <label>活动标签 (Tag)</label>
                        <input v-model="event.tag" type="text" placeholder="例如：限时补贴">
                    </div>
                    <div class="form-group">
                        <label>角标文字 (Badge)</label>
                        <input v-model="event.badge" type="text" placeholder="例如：HOT">
                    </div>
                    <div class="form-group">
                        <label>活动地点</label>
                        <input v-model="event.location" type="text" placeholder="线下填写详细地址">
                    </div>
                    <div class="form-row-2">
                        <div class="form-group">
                            <label>活动日期</label>
                            <input v-model="event.deadline" type="date">
                        </div>
                        <div class="form-group">
                            <label>基数</label>
                            <input v-model.number="event.registrations" type="number">
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    </div>
</template>

<style scoped>
.event-edit-container {
    padding: 30px;
    background: #f8fafc;
    min-height: calc(100vh - 100px);
}

.edit-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    background: white;
    padding: 16px 24px;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    position: sticky;
    top: 0;
    z-index: 100;
}

.header-left {
    display: flex;
    align-items: center;
    gap: 20px;
}

.header-left h2 {
    font-size: 1.25rem;
    font-weight: 850;
    color: #0f172a;
    margin: 0;
}

.btn-back {
    background: #f1f5f9;
    border: none;
    color: #475569;
    padding: 8px 16px;
    border-radius: 6px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-back:hover {
    background: #e2e8f0;
    color: #0f172a;
}

.header-right {
    display: flex;
    gap: 12px;
}

.btn-save-main {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 24px;
    border-radius: 6px;
    font-weight: 800;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2);
    display: flex;
    align-items: center;
    gap: 8px;
}

.btn-save-main:hover {
    background: #059669;
    transform: translateY(-1px);
}

.btn-cancel-flat {
    background: transparent;
    border: 1px solid #e2e8f0;
    color: #64748b;
    padding: 8px 24px;
    border-radius: 6px;
    cursor: pointer;
}

/* Layout */
.edit-content-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 30px;
}

.form-card {
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 30px;
}

.form-card.compact {
    padding: 24px;
}

.card-title {
    font-size: 1rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 20px;
    padding-bottom: 12px;
    border-bottom: 1px solid #f1f5f9;
}

.form-group {
    margin-bottom: 24px;
}

.form-group:last-child {
    margin-bottom: 0;
}

.form-group label {
    display: block;
    font-size: 0.9rem;
    font-weight: 700;
    color: #475569;
    margin-bottom: 8px;
}

.required {
    color: #ef4444;
}

.input-title {
    width: 100%;
    font-size: 1.5rem;
    font-weight: 700;
    padding: 12px 0;
    border: none;
    border-bottom: 2px solid #f1f5f9;
    outline: none;
    transition: border-color 0.2s;
}

.input-title:focus {
    border-color: #3b82f6;
}

input[type="text"], 
input[type="date"], 
input[type="number"], 
select {
    width: 100%;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 6px;
    font-size: 0.95rem;
    color: #1e293b;
    outline: none;
}

input:focus, select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.form-row-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

/* Editor Height Fix */
.editor-group {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.editor-wrapper {
    min-height: 500px;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    overflow: hidden;
}

:deep(.rich-text-editor) {
    height: 100%;
    min-height: 500px;
}

/* States */
.loading-overlay {
    background: white;
    border-radius: 12px;
    padding: 100px;
    text-align: center;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 16px;
}

@keyframes spin { to { transform: rotate(360deg); } }

@media (max-width: 1200px) {
    .edit-content-layout {
        grid-template-columns: 1fr;
    }
    .side-form {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
    }
}

@media (max-width: 768px) {
    .side-form {
        grid-template-columns: 1fr;
    }
    .edit-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 16px;
    }
}
</style>
