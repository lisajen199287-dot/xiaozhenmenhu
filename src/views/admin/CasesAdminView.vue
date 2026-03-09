<script setup lang="ts">

import { ref, onMounted } from 'vue'

import RichTextEditor from '@/components/RichTextEditor.vue'



interface CaseStudy {

    id: number;

    industry: string;

    subIndustry?: string;

    category: string;

    client: string;

    logo: string;

    bigTitle: string;

    painPoint?: string;

    desc: string;

    description?: string; // backend field

    backgroundImage: string;

    stats: { value: string; label: string; }[];

    tag: string;

    content?: string;

}



const cases = ref<CaseStudy[]>([])



const fetchCases = async () => {

    try {

        const res = await fetch('/api/cases')

        if (res.ok) {

            const data = await res.json()

            cases.value = data.map((c: any) => ({

                ...c,

                desc: c.description || c.desc,

                stats: c.stats ? JSON.parse(c.stats) : []

            }))

        }

    } catch (e) {

        console.error(e)

    }

}



onMounted(fetchCases)



const showModal = ref(false)

const isEditing = ref(false)

const currentCase = ref<CaseStudy>({ 

    id: 0, 

    industry: '', 

    category: '', 

    subIndustry: '',

    client: '', 

    logo: 'fas fa-briefcase', 

    bigTitle: '', 

    painPoint: '',

    desc: '', 

    backgroundImage: '', // Default image

    stats: [

        { value: '', label: '' },

        { value: '', label: '' }

    ], 

    tag: '',

    content: ''

})



const openCreateModal = () => {

    isEditing.value = false

    currentCase.value = { 

        id: 0, 

        industry: '', 

        category: '', 

        subIndustry: '',

        client: '', 

        logo: 'fas fa-briefcase', 

        bigTitle: '', 

        painPoint: '',

        desc: '', 

        backgroundImage: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',

        stats: [

            { value: '', label: '' },

            { value: '', label: '' }

        ], 

        tag: '',

        content: ''

    }

    showModal.value = true

}



const openEditModal = (item: CaseStudy) => {

    isEditing.value = true

    // Deep copy to avoid direct mutation

    currentCase.value = JSON.parse(JSON.stringify(item))

    if(!currentCase.value.painPoint) currentCase.value.painPoint = ''

    if(!currentCase.value.desc) currentCase.value.desc = ''

    if(!currentCase.value.content) currentCase.value.content = ''

    showModal.value = true

}



const saveCase = async () => {

    if (!currentCase.value.client) return alert('请输入客户名称')

    

    // Prepare payload

    const payload = {

        ...currentCase.value,

        description: currentCase.value.desc,

        stats: JSON.stringify(currentCase.value.stats) // Convert array to JSON string for backend

    }



    try {

        let url = '/api/cases'

        let method = 'POST'

        if (isEditing.value && currentCase.value.id) {

            url = `/api/cases/${currentCase.value.id}`

            method = 'PUT'

        }



        const res = await fetch(url, {

            method,

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(payload)

        })



        if (res.ok) {

            const saved = await res.json()

            // Map back

            saved.desc = saved.description

            saved.stats = saved.stats ? JSON.parse(saved.stats) : []

            

            if (isEditing.value) {

                const idx = cases.value.findIndex(c => c.id === saved.id)

                if (idx !== -1) cases.value[idx] = saved

            } else {

                cases.value.push(saved)

            }

            showModal.value = false

            alert('保存成功')

        } else {

            console.error(await res.text())

            alert('保存失败')

        }

    } catch (e) {

        console.error(e)

        alert('网络错误')

    }

}



const deleteCase = async (id: number) => {

    if (confirm('确定要删除这个案例吗？')) {

        try {

            const res = await fetch(`/api/cases/${id}`, { method: 'DELETE' })

            if (res.ok) {

                cases.value = cases.value.filter(c => c.id !== id)

            }

        } catch (e) {

            console.error(e)

            alert('删除失败')

        }

    }

}

</script>



<template>

  <div class="cases-admin">

    <div class="admin-toolbar">

      <button class="btn-primary-admin" @click="openCreateModal"><i class="fas fa-plus-circle"></i> 新增案例</button>

    </div>



    <div class="admin-table-container">

      <table class="admin-table">

        <thead>

          <tr>

            <th>ID</th>

            <th>客户名称</th>

            <th>行业/分类</th>

            <th>核心标题</th>

            <th>标签</th>

            <th>操作</th>

          </tr>

        </thead>

        <tbody>

          <tr v-for="c in cases" :key="c.id">

            <td class="td-id">{{ c.id.toString().slice(-4) }}</td>

            <td class="td-title">

                {{ c.client }}

                <div class="sub-info logo-preview"><i :class="c.logo"></i> {{ c.logo }}</div>

            </td>

            <td>

                <div>{{ c.industry }}</div>

                <span class="mini-tag">{{ c.category }}</span>

            </td>

            <td>{{ c.bigTitle }}</td>

            <td><span class="table-tag">{{ c.tag }}</span></td>

            <td class="td-actions">

              <button class="btn-icon-action" title="编辑" @click="openEditModal(c)"><i class="fas fa-pencil-alt"></i></button>

              <button class="btn-icon-action delete" title="删除" @click="deleteCase(c.id)"><i class="fas fa-trash-alt"></i></button>

            </td>

          </tr>

        </tbody>

      </table>

    </div>



    <!-- Modal -->

    <div v-if="showModal" class="admin-modal-overlay">

      <div class="admin-modal wide-modal">

        <div class="modal-header">

          <h3>{{ isEditing ? '编辑案例' : '新增案例' }}</h3>

          <button class="btn-close" @click="showModal = false">&times;</button>

        </div>

        <div class="modal-body">

          <div class="form-row">

            <!-- Left Col -->

            <div class="form-column">

                <div class="form-group">

                    <label>客户名称</label>

                    <input v-model="currentCase.client" type="text" placeholder="例如：喜茶 x Lumi">

                </div>

                <div class="form-group">

                    <label>核心标题 (Big Title)</label>

                    <input v-model="currentCase.bigTitle" type="text" placeholder="例如：视觉艺术 AI 联名">

                </div>

                <div class="form-group">

                    <label>痛点 (Before)</label>

                    <RichTextEditor v-model="currentCase.painPoint" />

                </div>

                <div class="form-group">

                    <label>解决方案 (After)</label>

                    <RichTextEditor v-model="currentCase.desc" />

                </div>

            </div>

            

            <!-- Right Col -->

            <div class="form-column">

                <div class="form-row-inner">

                    <div class="form-group">

                        <label>行业 (ID)</label>

                        <input v-model="currentCase.industry" type="text" placeholder="例如：game (用于Tab键切换)">

                    </div>

                    <div class="form-group">

                        <label>分类名称</label>

                        <input v-model="currentCase.category" type="text" placeholder="例如：游戏电商">

                    </div>

                </div>

                <div class="form-row-inner">

                    <div class="form-group">

                        <label>Logo 图标 (FontAwesome)</label>

                        <input v-model="currentCase.logo" type="text">

                    </div>

                    <div class="form-group">

                        <label>前台显示标签</label>

                        <input v-model="currentCase.tag" type="text" placeholder="例如：游戏营销">

                    </div>

                </div>



                <div class="form-group">

                    <label>背景图片 URL</label>

                    <input v-model="currentCase.backgroundImage" type="text">

                    <img v-if="currentCase.backgroundImage" :src="currentCase.backgroundImage" class="img-preview" />

                </div>



                <div class="stats-editor">

                    <label>数据亮点 (Stats)</label>

                    <div class="stat-row-edit" v-for="(stat, idx) in currentCase.stats" :key="idx">

                        <input v-model="stat.value" placeholder="数值 (例如 30%)">
                        <input v-model="stat.label" placeholder="描述 (例如 成本降低)">

                    </div>

                </div>

            </div>

          </div>

          <div class="form-row-full" style="margin-top: 32px;">

              <div class="form-group">

                  <label>案例详情长文 (详细内容排版)</label>

                  <RichTextEditor v-model="currentCase.content" />

              </div>

          </div>

        </div>

        <div class="modal-footer">

          <button class="btn-cancel" @click="showModal = false">取消</button>

          <button class="btn-save" @click="saveCase">确定保存</button>

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.admin-toolbar {

  display: flex;

  justify-content: flex-end;

  margin-bottom: 24px;

}



.btn-primary-admin {

  background: #10b981;

  color: white;

  border: none;

  padding: 10px 24px;

  border-radius: 4px;

  font-weight: 800;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

}



.admin-table-container {

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 4px;

  overflow: hidden;

}



.admin-table {

  width: 100%;

  border-collapse: collapse;

}



.admin-table th {

  background: #f8fafc;

  text-align: left;

  padding: 16px 24px;

  font-size: 0.85rem;

  font-weight: 850;

  color: #64748b;

  border-bottom: 1px solid #e2e8f0;

}



.admin-table td {

  padding: 16px 24px;

  font-size: 0.9rem;

  border-bottom: 1px solid #f1f5f9;

  vertical-align: middle;

}



.td-id { width: 60px; color: #94a3b8; font-weight: 600; }

.td-title { font-weight: 700; color: #0f172a; }



.sub-info {

    font-size: 0.75rem;

    color: #94a3b8;

    margin-top: 4px;

}



.mini-tag {

    background: #f1f5f9;

    color: #64748b;

    padding: 2px 6px;

    border-radius: 4px;

    font-size: 0.75rem;

}



.table-tag {

  padding: 4px 10px;

  border-radius: 2px;

  background: #eef2ff;

  color: #4f46e5;

  font-size: 0.75rem;

  font-weight: 800;

}



.td-actions {

  display: flex;

  gap: 12px;

}



.btn-icon-action {

  background: none;

  border: 1px solid #e2e8f0;

  width: 32px;

  height: 32px;

  border-radius: 4px;

  color: #64748b;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  transition: all 0.2s;

}



.btn-icon-action:hover {

  background: #f1f5f9;

  color: #0f172a;

}



.btn-icon-action.delete:hover {

  background: #fee2e2;

  color: #dc2626;

  border-color: #fecaca;

}



/* Modal Styling Re-design */

.admin-modal-overlay {

  position: fixed;

  top: 0; left: 0; right: 0; bottom: 0;

  background: rgba(15, 23, 42, 0.7);

  backdrop-filter: blur(8px);

  display: flex;

  align-items: center;

  justify-content: center;

  z-index: 2000;

  padding: 20px;

}



.admin-modal {

  background: #ffffff;

  border-radius: 16px;

  overflow: hidden;

  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);

  display: flex;

  flex-direction: column;

  max-height: 90vh;

}



.wide-modal {

    width: 1100px;

    max-width: 100%;

}



.modal-header {

  padding: 24px 32px;

  border-bottom: 1px solid #f1f5f9;

  display: flex;

  justify-content: space-between;

  align-items: center;

  background: white;

}



.modal-header h3 { 

    font-size: 1.5rem;

    font-weight: 800; 

    margin: 0; 

    color: #0f172a;

}



.btn-close {

  background: #f1f5f9;

  border: none;

  width: 32px;

  height: 32px;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  color: #64748b;

  transition: all 0.2s;

}



.modal-body {

  padding: 32px;

  overflow-y: auto;

  background: #fafafa;

}



.form-row {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 32px;

}



.form-column {

    display: flex;

    flex-direction: column;

    gap: 20px;

}



.form-row-inner {

    display: grid;

    grid-template-columns: 1fr 1fr;

    gap: 20px;

}



.form-group label {

  display: block;

  font-size: 0.875rem;

  font-weight: 700;

  margin-bottom: 8px;

  color: #334155;

}



.form-group input, .form-group select {

  width: 100%;

  padding: 12px 16px;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  outline: none;

  transition: all 0.2s;

}



.form-group input:focus {

    border-color: #10b981;

    box-shadow: 0 0 0 4px rgba(16, 185, 129, 0.1);

}



.img-preview {

    width: 100%;

    height: 180px;

    object-fit: cover;

    border-radius: 12px;

    margin-top: 12px;

    border: 1px solid #e2e8f0;

}



.stats-editor {

    background: white;

    padding: 24px;

    border-radius: 12px;

    border: 1px solid #e2e8f0;

}



.stat-row-edit {

    display: grid;

    grid-template-columns: 1fr 1.5fr;

    gap: 16px;

    margin-bottom: 12px;

}



.modal-footer {

  padding: 24px 32px;

  background: white;

  border-top: 1px solid #f1f5f9;

  display: flex;

  justify-content: flex-end;

  gap: 16px;

}



.btn-cancel {

  padding: 12px 24px;

  background: #f8fafc;

  color: #64748b;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  font-weight: 700;

  cursor: pointer;

}



.btn-save {

  padding: 12px 32px;

  background: #10b981;

  color: white;

  border: none;

  border-radius: 8px;

  font-weight: 800;

  cursor: pointer;

  box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.4);

}

</style>