<script setup lang="ts">

import { ref } from 'vue'

import { useAdminStore } from '@/utils/adminStore'

import RichTextEditor from '@/components/RichTextEditor.vue'



const { platformIntro } = useAdminStore()

const content = ref(platformIntro.value)

const isSaving = ref(false)



const saveIntro = () => {

  isSaving.value = true

  platformIntro.value = content.value

  setTimeout(() => {

    isSaving.value = false

    alert('平台简介已成功更新')

  }, 500)

}

</script>



<template>

  <div class="intro-admin">

    <div class="admin-toolbar">

      <div class="toolbar-info">

        <h2>平台简介编辑</h2>

        <p>在此处修改“关于平台”页面的文字内容。</p>

      </div>

      <button class="btn-primary-admin" @click="saveIntro" :disabled="isSaving">

        <i class="fas" :class="isSaving ? 'fa-spinner fa-spin' : 'fa-save'"></i> 

        {{ isSaving ? '保存中...' : '保存更改' }}

      </button>

    </div>



    <div class="editor-container">

      <RichTextEditor v-model="content" />

    </div>

  </div>

</template>



<style scoped>

.admin-toolbar {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

  background: white;

  padding: 24px;

  border-radius: 8px;

  border: 1px solid #e2e8f0;

}



.toolbar-info h2 {

  font-size: 1.25rem;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 4px;

}



.toolbar-info p {

  font-size: 0.85rem;

  color: #64748b;

}



.btn-primary-admin {

  background: #4f46e5;

  color: white;

  border: none;

  padding: 10px 24px;

  border-radius: 4px;

  font-weight: 700;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

  transition: all 0.2s;

}



.btn-primary-admin:hover:not(:disabled) {

  background: #4338ca;

  transform: translateY(-1px);

}



.btn-primary-admin:disabled {

  opacity: 0.7;

  cursor: not-allowed;

}



.editor-container {

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  padding: 24px;

  height: calc(100vh - 200px);

}



.form-group {

  height: 100%;

}



.intro-textarea {

  width: 100%;

  height: 100%;

  padding: 24px;

  border: 1px solid #e2e8f0;

  border-radius: 4px;

  font-size: 1rem;

  line-height: 1.8;

  color: #334155;

  outline: none;

  resize: none;

  font-family: inherit;

  background: #f8fafc;

}



.intro-textarea:focus {

  border-color: #4f46e5;

  background: white;

  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);

}

</style>