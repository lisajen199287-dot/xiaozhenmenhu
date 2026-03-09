<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { ElMessage, ElMessageBox } from 'element-plus'



interface HeroSlide {

  id?: number

  title: string

  subtitle: string

  image: string

  navTitle: string

  navDesc: string

  actionsJson: string

  sortOrder: number

  isVisible: boolean

}



const slides = ref<HeroSlide[]>([])

const dialogVisible = ref(false)

const isEdit = ref(false)

const form = ref<HeroSlide>({

  title: '',

  subtitle: '',

  image: '',

  navTitle: '',

  navDesc: '',

  actionsJson: '[]',

  sortOrder: 0,

  isVisible: true

})



const buttons = ref<{text: string, link: string, primary: boolean}[]>([])



const syncButtonsToForm = () => {

    try {

        form.value.actionsJson = JSON.stringify(buttons.value)

    } catch (e) {

        form.value.actionsJson = '[]'

    }

}



const addButton = () => {

    buttons.value.push({ text: '交流咨询', link: '/#appointment', primary: true })

    syncButtonsToForm()

}



const removeButton = (index: number) => {

    buttons.value.splice(index, 1)

    syncButtonsToForm()

}



const fetchSlides = async () => {

    try {

        const res = await fetch('/api/slides')

        if (res.ok) {

            slides.value = await res.json()

        }

    } catch (e) {

        console.error(e)

    }

}



const handleAdd = () => {

    isEdit.value = false

    form.value = {

      title: '',

      subtitle: '',

      image: '',

      navTitle: '',

      navDesc: '',

      actionsJson: '[]',

      sortOrder: slides.value.length,

      isVisible: true

    }

    dialogVisible.value = true

    buttons.value = []

    syncButtonsToForm()

}



const handleEdit = (row: HeroSlide) => {

    isEdit.value = true

    form.value = { ...row }

    try {

        buttons.value = JSON.parse(row.actionsJson || '[]')

    } catch (e) {

        buttons.value = []

    }

    dialogVisible.value = true

}



const handleDelete = async (row: HeroSlide) => {

    try {

        await ElMessageBox.confirm('确定要删除这个幻灯片吗？', '系统提示', { type: 'warning' })

        const res = await fetch(`/api/slides/${row.id}`, { method: 'DELETE' })

        if (res.ok) {

            ElMessage.success('已成功删除')

            fetchSlides()

        }

    } catch (e) {}

}



const save = async () => {

    const url = isEdit.value ? `/api/slides/${form.value.id}` : '/api/slides'

    const method = isEdit.value ? 'PUT' : 'POST'

    

    try {

        syncButtonsToForm()

        const res = await fetch(url, {

            method,

            headers: { 'Content-Type': 'application/json' },

            body: JSON.stringify(form.value)

        })

        if (res.ok) {

            ElMessage.success('保存成功')

            dialogVisible.value = false

            fetchSlides()

        }

    } catch (e) {

        ElMessage.error('保存失败')

    }

}



const fileInput = ref<HTMLInputElement | null>(null)

const triggerUpload = () => fileInput.value?.click()



const handleUpload = async (event: any) => {

  const file = event.target.files[0]

  if (!file) return

  

  const formData = new FormData()

  formData.append('file', file)

  

  try {

    const res = await fetch('/api/upload', {

      method: 'POST',

      body: formData

    })

    const data = await res.json()

    if (data.errno === 0 || data.code === 200) {

      form.value.image = data.url || data.data?.url

      ElMessage.success('上传成功')

    } else {

      ElMessage.error('上传失败: ' + (data.message || '错误'))

    }

  } catch (e) {

    console.error(e)

    ElMessage.error('上传过程发生错误')

  }

}



// Helper to resolve image URL securely

const resolveImageUrl = (url: string) => {

  if (!url) return ''

  if (url.startsWith('http') || url.startsWith('/') || url.startsWith('data:')) return url

  return `/uploads/${url}`

}



const handleImageError = () => {

  console.warn('Image preview failed to load')

}



onMounted(fetchSlides)

</script>



<template>

  <div class="admin-slides">

    <div class="page-header">

      <h2>首页轮播内容管理</h2>

      <el-button type="primary" @click="handleAdd">新增</el-button>

    </div>



    <el-table :data="slides" style="width: 100%" row-key="id">

        <el-table-column prop="sortOrder" label="排序" width="60" />

        <el-table-column prop="navTitle" label="导航标题" width="120" />

        <el-table-column prop="title" label="主标题" min-width="150" show-overflow-tooltip />

        <el-table-column prop="subtitle" label="描述文案" min-width="180" show-overflow-tooltip />

        <el-table-column prop="isVisible" label="是否上线" width="90">

            <template #default="scope">

                <el-tag size="small" :type="scope.row.isVisible ? 'success' : 'info'">{{ scope.row.isVisible ? '上线' : '下线' }}</el-tag>

            </template>

        </el-table-column>

        <el-table-column label="操作" width="180">

            <template #default="scope">

                <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>

                <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>

            </template>

        </el-table-column>

    </el-table>



    <el-dialog v-model="dialogVisible" :title="isEdit ? '编辑' : '新增'" width="600px">

        <el-form label-width="100px">

            <el-form-item label="导航标题">

                <el-input v-model="form.navTitle" />

            </el-form-item>

            <el-form-item label="导航描述">

                <el-input v-model="form.navDesc" />

            </el-form-item>

            <el-form-item label="主标题">

                <el-input v-model="form.title" type="textarea" :rows="2" />

            </el-form-item>

            <el-form-item label="描述文案">

                <el-input v-model="form.subtitle" type="textarea" :rows="3" />

            </el-form-item>

            <el-form-item label="背景大图">

                <div class="upload-container">

                    <el-input v-model="form.image" placeholder="输入链接或使用右侧上传按钮">

                        <template #append>

                            <el-button @click="triggerUpload">点击上传</el-button>

                        </template>

                    </el-input>

                    <div class="help-text premium">

                        <i class="fas fa-info-circle"></i> 推荐尺寸: 1920 x 800 px。支持通屏大图展示，请确保图片具有足够的分辨率。

                    </div>

                    <div class="preview-wrapper" v-if="form.image">

                        <div class="preview-label">实时预览</div>

                        <img :src="resolveImageUrl(form.image)" class="preview-img" @error="handleImageError" />

                        <div class="img-error-hint" v-if="form.image">预览失败时请检查链接或网络</div>

                    </div>

                    <input type="file" ref="fileInput" style="display: none" @change="handleUpload" accept="image/*" />

                </div>

            </el-form-item>

            <el-form-item label="排序值">

                <el-input-number v-model="form.sortOrder" />

            </el-form-item>

            <el-form-item label="是否上线">

                <el-switch v-model="form.isVisible" />

            </el-form-item>

            <el-form-item label="操作按钮">

                <div class="buttons-manager">

                    <div v-for="(btn, idx) in buttons" :key="idx" class="button-edit-row">

                        <el-input v-model="btn.text" placeholder="按钮文本" @input="syncButtonsToForm" style="width: 120px" />

                        <el-input v-model="btn.link" placeholder="链接" @input="syncButtonsToForm" style="flex: 1" />

                        <el-switch v-model="btn.primary" active-text="主按钮" @change="syncButtonsToForm" />

                        <el-button type="danger" icon="Trash" circle size="small" @click="removeButton(idx)">

                            <i class="fas fa-trash"></i>

                        </el-button>

                    </div>

                    <el-button type="dashed" @click="addButton" style="width: 100%; margin-top: 8px">

                        <i class="fas fa-plus"></i> 添加按钮

                    </el-button>

                </div>

            </el-form-item>

        </el-form>

        <template #footer>

            <span class="dialog-footer">

                <el-button @click="dialogVisible = false">取消</el-button>

                <el-button type="primary" @click="save">保存</el-button>

            </span>

        </template>

    </el-dialog>

  </div>

</template>



<style scoped>

.page-header {

    display: flex;

    justify-content: space-between;

    align-items: center;

    margin-bottom: 20px;

}

.help-text {

    font-size: 0.8rem;

    color: #999;

    margin-top: 4px;

}

.help-text.premium {

    color: #4F46E5;

    background: #f0f3ff;

    padding: 8px 12px;

    border-radius: 6px;

    margin-bottom: 8px;

}

.preview-label {

    font-size: 12px;

    font-weight: 700;

    color: #64748b;

    margin-bottom: 8px;

}

.upload-container {

    display: flex;

    flex-direction: column;

    gap: 8px;

    width: 100%;

}

.preview-wrapper {

    margin-top: 12px;

    display: flex;

    flex-direction: column;

    gap: 4px;

}

.preview-img {

    max-width: 200px;

    max-height: 150px;

    object-fit: contain;

    border-radius: 4px;

    border: 1px solid #e2e8f0;

    background: #f8fafc;

}

.color-dot {

    display: inline-block;

    width: 8px;

    height: 8px;

    border-radius: 50%;

    margin-right: 6px;

}

.hero-bg-default { background: #6366f1; }

.hero-bg-blue { background: #3b82f6; }

.hero-bg-red { background: #ef4444; }



.img-error-hint {

    font-size: 11px;

    color: #f87171;

}



.buttons-manager {

    background: #f8fafc;

    padding: 12px;

    border-radius: 8px;

    border: 1px dashed #cbd5e1;

    width: 100%;

}



.button-edit-row {

    display: flex;

    align-items: center;

    gap: 8px;

    margin-bottom: 8px;

    background: white;

    padding: 8px;

    border-radius: 4px;

    box-shadow: 0 2px 4px rgba(0,0,0,0.02);

}

</style>