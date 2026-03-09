<template>

    <div class="rich-editor-wrapper">

      <Toolbar

        class="editor-toolbar"

        :editor="editorRef"

        :defaultConfig="toolbarConfig"

        :mode="mode"

      />

      <div class="editor-scroll-container">

          <div class="editor-page-mock">

            <Editor

                class="editor-content"

                v-model="valueHtml"

                :defaultConfig="editorConfig"

                :mode="mode"

                @onCreated="handleCreated"

            />

          </div>

      </div>

    </div>

</template>



<script setup lang="ts">

import '@wangeditor/editor/dist/css/style.css' 

import { onBeforeUnmount, ref, shallowRef, watch } from 'vue'

// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'



const props = defineProps({

  modelValue: {

    type: String,

    default: ''

  },

  height: {

      type: String,

      default: '600px'

  }

})



const emit = defineEmits(['update:modelValue'])



const editorRef = shallowRef()

const valueHtml = ref(props.modelValue)



watch(() => props.modelValue, (newVal) => {

  if (newVal !== valueHtml.value) {

    valueHtml.value = newVal || ''

  }

})



watch(valueHtml, (newVal) => {

  emit('update:modelValue', newVal)

})



const mode = 'default' 



const toolbarConfig: any = {

    excludeKeys: [

        'fullScreen',

    ]

}

const editorConfig: any = { 

    placeholder: '从这里开始书写您的故事...',

    MENU_CONF: {

        uploadImage: {

            server: '/api/upload', 

            fieldName: 'file',

            maxFileSize: 5 * 1024 * 1024, 

            maxNumberOfFiles: 10,

            allowedFileTypes: ['image/*'],

            timeout: 10 * 1000,

            // Custom insert logic to ensure perfect mapping

            customInsert(res: any, insertFn: any) {

                if (res.errno === 0) {

                    const url = res.data.url || res.url

                    const alt = res.data.alt || ''

                    const href = res.data.href || ''

                    insertFn(url, alt, href)

                } else {

                    alert('图片上传失败: ' + (res.message || '未知错误'))

                }

            },

            // Failed callback

            onFailed(_file: File, res: any) {
                console.error('Upload failed', _file, res)

                alert('上传图像失败: ' + (res.message || '网络或服务器错误'))

            },

            // Error callback

            onError(_file: File, err: any, res: any) {
                console.error('Upload error', err, res)

                alert('图片上传出错，请检查网络')

            }

        },

        uploadVideo: {

            server: '/api/upload',

            fieldName: 'file',

            maxFileSize: 50 * 1024 * 1024,

            timeout: 30 * 1000,

            allowedFileTypes: ['video/*'],

            customInsert(res: any, insertFn: any) {

                if (res.errno === 0) {

                    const url = res.data.url || res.url

                    insertFn(url) // Videos only need URL in WangEditor V5

                } else {

                    alert('视频上传失败: ' + (res.message || '未知错误'))

                }

            }

        }

    }

}



onBeforeUnmount(() => {

    const editor = editorRef.value

    if (editor == null) return

    editor.destroy()

})



const handleCreated = (editor: any) => {

  editorRef.value = editor 

}

</script>



<style scoped>

.rich-editor-wrapper {

    border: 1px solid #e2e8f0;

    border-radius: 8px;

    background: #f1f5f9;

    display: flex;

    flex-direction: column;

    height: v-bind('props.height');

    overflow: hidden;

}



.editor-toolbar {

    border-bottom: 1px solid #e2e8f0 !important;

    background: white !important;

    padding: 0 16px !important;

    z-index: 100;

}



.editor-scroll-container {

    flex: 1;

    overflow-y: auto;

    padding: 32px;

    display: flex;

    justify-content: center;

}



.editor-page-mock {

    width: 100%;

    max-width: 840px;

    background: white;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);

    border: 1px solid #e2e8f0;

    min-height: 100%;

    padding: 60px 70px;

}



:deep(.w-e-text-container) {

    background-color: transparent !important;

    min-height: 100%;

}



:deep(.w-e-text-container [data-slate-editor]) {

    min-height: 600px;

    line-height: 1.8;

    color: #0f172a;

    font-size: 1.05rem;

    font-family: 'Inter', "PingFang SC", "Microsoft YaHei", sans-serif;

}



:deep(.w-e-container) {

    border: none !important;

}



.editor-scroll-container::-webkit-scrollbar {

  width: 6px;

}

.editor-scroll-container::-webkit-scrollbar-track {

  background: transparent;

}

.editor-scroll-container::-webkit-scrollbar-thumb {

  background: #cbd5e1;

  border-radius: 10px;

}

</style>