<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import MarkdownIt from 'markdown-it'
import container from 'markdown-it-container'
import { config } from '@/config/axios/config'

// ==================== Doc list definition ====================
interface DocItem {
  id: string
  title: string
  icon: string
  fileName: string
}

interface DocGroup {
  id: string
  label: string
  icon: string
  items: DocItem[]
}

const docGroups: DocGroup[] = [
  {
    id: 'seedance',
    label: 'Seedance 视频生成',
    icon: 'fas fa-video',
    items: [
      { id: 'create-task', title: '创建视频生成任务', icon: 'fas fa-plus-circle', fileName: '创建视频生成任务 API.md' },
      { id: 'query-task', title: '查询视频生成任务', icon: 'fas fa-search', fileName: '查询视频生成任务 API.md' },
      { id: 'query-task-list', title: '查询视频生成任务列表', icon: 'fas fa-list', fileName: '查询视频生成任务列表.md' },
      { id: 'cancel-delete', title: '取消或删除任务', icon: 'fas fa-trash-alt', fileName: '取消或删除视频生成任务.md' },
    ]
  },
  {
    id: 'material',
    label: '素材库',
    icon: 'fas fa-box-open',
    items: [
      { id: 'create-material-group', title: '创建素材组', icon: 'fas fa-folder-plus', fileName: '创建素材组 API.md' },
      { id: 'list-material-group', title: '列表查询素材组', icon: 'fas fa-th-list', fileName: '列表查询素材组 API.md' },
      { id: 'query-material-group', title: '查询素材组详情', icon: 'fas fa-folder-open', fileName: '查询素材组详情 API.md' },
      { id: 'update-material-group', title: '更新素材组', icon: 'fas fa-edit', fileName: '更新素材组 API.md' },
      { id: 'create-material', title: '创建素材', icon: 'fas fa-file-upload', fileName: '创建素材 API.md' },
      { id: 'list-material', title: '列表查询素材', icon: 'fas fa-images', fileName: '列表查询素材 API.md' },
      { id: 'query-material', title: '查询素材详情', icon: 'fas fa-search-plus', fileName: '查询素材详情 API.md' },
      { id: 'update-material', title: '更新素材', icon: 'fas fa-pen', fileName: '更新素材 API.md' },
    ]
  },
  {
    id: 'image-gen',
    label: '图片生成',
    icon: 'fas fa-image',
    items: [
      { id: 'image-gen', title: 'Seedream 图片生成', icon: 'fas fa-image', fileName: '图片生成API.md' },
      { id: 'nano-banana-text2img', title: 'Doubao-Banana 文生图', icon: 'fas fa-paint-brush', fileName: 'nano banana 2 文生图 API.md' },
      { id: 'nano-banana-img2img', title: 'Doubao-Banana 图生图', icon: 'fas fa-magic', fileName: 'nano banana 2 图生图 API.md' },
      { id: 'gpt-image2-edit', title: 'Doubao-Image-2 图生图', icon: 'fas fa-crop-alt', fileName: 'GPT Image 2 编辑图片 API.md' },
      { id: 'gpt-image2-gen', title: 'Doubao-Image-2 文生图', icon: 'fas fa-palette', fileName: 'GPT Image 2 官方生图接口 API.md' },
    ]
  },
  {
    id: 'common',
    label: '通用',
    icon: 'fas fa-cog',
    items: [
      { id: 'error-codes', title: '错误码参考', icon: 'fas fa-exclamation-triangle', fileName: '错误码.md' },
    ]
  },
]

// Flat list for easy lookup by id
const docList = docGroups.flatMap(g => g.items)

// ==================== Reactive state ====================
const activeDocId = ref<string>('create-task')
const collapsedGroups = ref<Set<string>>(new Set())

function toggleGroup(groupId: string) {
  const next = new Set(collapsedGroups.value)
  if (next.has(groupId)) {
    next.delete(groupId)
  } else {
    next.add(groupId)
  }
  collapsedGroups.value = next
}
const gatewayDomain = config.gateway_domain
const allCollapsed = ref(false)
const collapseVersion = ref(0)

// ==================== Load markdown files at build time ====================
const docModules = import.meta.glob('/doc/*.md', { eager: true, query: '?raw', import: 'default' }) as Record<string, string>

// ==================== Markdown-it setup ====================
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
})

// Container plugin for :::tip, :::warning, :::danger
md.use(container, 'tip', {
  render(tokens: any, idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="doc-alert doc-alert-tip"><div class="doc-alert-title">提示</div>\n'
    }
    return '</div>\n'
  },
})
md.use(container, 'warning', {
  render(tokens: any, idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="doc-alert doc-alert-warning"><div class="doc-alert-title">注意</div>\n'
    }
    return '</div>\n'
  },
})
md.use(container, 'danger', {
  render(tokens: any, idx: number) {
    if (tokens[idx].nesting === 1) {
      return '<div class="doc-alert doc-alert-danger"><div class="doc-alert-title">警告</div>\n'
    }
    return '</div>\n'
  },
})

// ==================== Markdown preprocessing ====================
function preprocessMarkdown(raw: string): string {
  let text = raw

  // 1. Remove ```mixin-react ... ``` blocks
  text = text.replace(/```mixin-react[\s\S]*?```/g, '')

  // 1.5 Fix markdown formatting artifacts in source docs
  // Remove empty bold markers: ** **
  text = text.replace(/\*\* \*\*/g, '')
  // Fix trailing spaces inside bold: **word ** → **word**
  text = text.replace(/\*\*([^*\s]+)\s+\*\*/g, '**$1**')

  // 2. Remove [运行](url) and [ ](url) links
  text = text.replace(/\[运行\]\([^)]*\)/g, '')
  text = text.replace(/\[ \]\([^)]*\)/g, '')

  // 3. Convert %%require%% to badge
  text = text.replace(/%%require%%/g, '<span class="req-badge">必填</span>')

  // 4. Remove ==^new^== markers
  text = text.replace(/==\^new\^==/g, '')

  // 5. Handle ^^ cell merge markers in tables (show as empty)
  text = text.replace(/\|\s*\^\^\s*/g, '| ')

  // 6. Remove :::tip / :::warning / :::danger content inside table cells (they break tables)
  // Already handled by markdown-it-container for block-level usage

  return text
}

// ==================== Post-process rendered HTML ====================
function postprocessHtml(html: string): string {
  // Wrap HTTP method + URL lines in styled spans
  html = html.replace(
    /<code>(GET|POST|PUT|DELETE|PATCH)\s+(.*?)<\/code>/g,
    (_, method, url) => {
      const cls = method === 'GET' ? 'method-get' : method === 'POST' ? 'method-post' : method === 'DELETE' ? 'method-delete' : 'method-put'
      return `<code><span class="http-method ${cls}">${method}</span> ${url}</code>`
    }
  )

  // Replace gateway domain placeholder with actual value
  html = html.replace(/\{\{GATEWAY_DOMAIN\}\}/g, gatewayDomain || window.location.origin)

  // Wrap nested parameter paragraphs with depth-based indentation
  // After markdown-it: <p>content.<strong>type</strong> <code>string</code>...</p>
  html = html.replace(
    /<p>((?:[\w]+\.){1,4})<strong>([\s\S]*?)<\/p>/g,
    (_match, prefix: string, rest: string) => {
      const depth = (prefix.match(/\./g) || []).length
      return `<div class="param-nest depth-${depth}"><p>${prefix}<strong>${rest}</p></div>`
    }
  )

  // Wrap h2 sections in collapsible containers
  html = wrapSectionsInCollapsibles(html)

  return html
}

function wrapSectionsInCollapsibles(html: string): string {
  const sections = html.split(/(<h2[^>]*>)/)
  if (sections.length <= 1) return html

  let result = sections[0] // Content before first h2
  let i = 1

  while (i < sections.length) {
    // sections[i] is <h2...>, sections[i+1] is rest until next h2
    const h2Tag = sections[i]
    const rest = sections[i + 1] || ''

    // Extract the heading content (between <h2> and </h2>)
    const h2Match = rest.match(/^(.*?<\/h2>)([\s\S]*)$/)
    if (h2Match) {
      const h2Content = h2Match[1]
      const bodyContent = h2Match[2]
      result += `<div class="doc-section" data-collapsed="false">`
      result += `<div class="section-toggle" onclick="this.parentElement.dataset.collapsed = this.parentElement.dataset.collapsed === 'true' ? 'false' : 'true'">`
      result += h2Tag + h2Content
      result += `<i class="fas fa-chevron-down toggle-icon"></i>`
      result += `</div>`
      result += `<div class="section-body">${bodyContent}</div>`
      result += `</div>`
    } else {
      result += h2Tag + rest
    }
    i += 2
  }

  return result
}

// ==================== Computed rendered content ====================
const activeDoc = computed(() => docList.find(d => d.id === activeDocId.value))

const renderedContent = computed(() => {
  if (!activeDoc.value) return ''
  const filePath = `/doc/${activeDoc.value.fileName}`
  const raw = docModules[filePath]
  if (!raw) return '<p>文档加载失败</p>'

  const preprocessed = preprocessMarkdown(raw)
  const html = md.render(preprocessed)
  return postprocessHtml(html)
})

// ==================== Collapse / Expand ====================
function toggleAllSections() {
  allCollapsed.value = !allCollapsed.value
  collapseVersion.value++
}

// Apply collapse state to all sections after render
watch(collapseVersion, () => {
  nextTick(() => {
    const container = document.querySelector('.docs-content')
    if (!container) return
    const sections = container.querySelectorAll('.doc-section')
    sections.forEach((el: Element) => {
      ;(el as HTMLElement).dataset.collapsed = allCollapsed.value ? 'true' : 'false'
    })
  })
})

// ==================== Select doc ====================
function selectDoc(id: string) {
  activeDocId.value = id
  allCollapsed.value = false
}
</script>

<template>
  <div class="api-docs-container">
    <!-- Sidebar navigation -->
    <aside class="docs-sidebar">
      <div class="sidebar-title">API 文档</div>
      <nav class="sidebar-nav">
        <div v-for="group in docGroups" :key="group.id" class="sidebar-group">
          <div class="sidebar-group-header" @click="toggleGroup(group.id)">
            <i :class="group.icon" class="group-icon"></i>
            <span class="group-label">{{ group.label }}</span>
            <i :class="['fas fa-chevron-down', 'group-toggle', { collapsed: collapsedGroups.has(group.id) }]"></i>
          </div>
          <div class="sidebar-group-items" v-show="!collapsedGroups.has(group.id)">
            <a
              v-for="doc in group.items"
              :key="doc.id"
              :class="['sidebar-item', { active: activeDocId === doc.id }]"
              @click="selectDoc(doc.id)"
            >
              <i :class="doc.icon"></i>
              <span>{{ doc.title }}</span>
            </a>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Main content area -->
    <main class="docs-main">
      <!-- Toolbar -->
      <div class="docs-toolbar" v-if="activeDoc">
        <div class="toolbar-left">
          <h2 class="doc-title">{{ activeDoc.title }}</h2>
        </div>
        <div class="toolbar-right">
          <button class="btn-collapse-toggle" @click="toggleAllSections" :title="allCollapsed ? '展开所有内容' : '收起所有内容'">
            <i :class="allCollapsed ? 'fas fa-expand-alt' : 'fas fa-compress-alt'"></i>
            {{ allCollapsed ? '展开' : '收起' }}所有内容
          </button>
        </div>
      </div>

      <!-- Rendered markdown content -->
      <div v-if="activeDoc" class="docs-content" v-html="renderedContent"></div>

      <!-- Empty state -->
      <div v-else class="docs-empty">
        <i class="fas fa-book-open"></i>
        <p>请从左侧选择一个文档章节</p>
      </div>
    </main>
  </div>
</template>

<style scoped>
.api-docs-container {
  display: flex;
  min-height: 600px;
  background: white;
  border-radius: 12px;
  overflow: hidden;
}

/* ===== Sidebar ===== */
.docs-sidebar {
  width: 220px;
  min-width: 220px;
  background: #f8fafc;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
}

.sidebar-title {
  padding: 20px 20px 16px;
  font-size: 1rem;
  font-weight: 850;
  color: #0f172a;
  border-bottom: 1px solid #e2e8f0;
}

.sidebar-nav {
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  gap: 0;
  overflow-y: auto;
  flex: 1;
}

.sidebar-group {
  display: flex;
  flex-direction: column;
}

.sidebar-group-header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px 6px;
  cursor: pointer;
  user-select: none;
}

.sidebar-group-header .group-icon {
  width: 16px;
  text-align: center;
  font-size: 0.75rem;
  color: #94a3b8;
}

.sidebar-group-header .group-label {
  flex: 1;
  font-size: 0.72rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.sidebar-group-header .group-toggle {
  font-size: 0.6rem;
  color: #cbd5e1;
  transition: transform 0.2s;
}

.sidebar-group-header .group-toggle.collapsed {
  transform: rotate(-90deg);
}

.sidebar-group-items {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding-bottom: 4px;
}

.sidebar-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 6px;
  cursor: pointer;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.15s;
  text-decoration: none;
}

.sidebar-item:hover {
  background: #eef2ff;
  color: #4f46e5;
}

.sidebar-item.active {
  background: #eef2ff;
  color: #4f46e5;
  font-weight: 700;
}

.sidebar-item i {
  width: 18px;
  text-align: center;
  font-size: 0.85rem;
}

/* ===== Main content ===== */
.docs-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* ===== Toolbar ===== */
.docs-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 28px;
  border-bottom: 1px solid #f1f5f9;
  background: #fafbfc;
}

.doc-title {
  font-size: 1.1rem;
  font-weight: 850;
  color: #0f172a;
  margin: 0;
}

.btn-collapse-toggle {
  display: flex;
  align-items: center;
  gap: 6px;
  background: none;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 6px 14px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
  transition: all 0.15s;
}

.btn-collapse-toggle:hover {
  background: #f1f5f9;
  color: #4f46e5;
  border-color: #c7d2fe;
}

/* ===== Markdown content ===== */
.docs-content {
  padding: 28px;
  overflow-y: auto;
  flex: 1;
  line-height: 1.7;
  color: #334155;
  font-size: 0.9rem;
}

.docs-content :deep(h1) {
  display: none; /* Hide the first h1 (already shown in toolbar title) */
}

.docs-content :deep(h2) {
  font-size: 1.15rem;
  font-weight: 850;
  color: #0f172a;
  margin: 0;
}

.docs-content :deep(h3) {
  font-size: 1rem;
  font-weight: 700;
  color: #1e293b;
  margin: 20px 0 12px;
}

.docs-content :deep(h4) {
  font-size: 0.95rem;
  font-weight: 700;
  color: #334155;
  margin: 16px 0 8px;
}

.docs-content :deep(p) {
  margin: 8px 0;
}

.docs-content :deep(a) {
  color: #4f46e5;
  text-decoration: none;
}

.docs-content :deep(a:hover) {
  text-decoration: underline;
}

/* ===== Code blocks ===== */
.docs-content :deep(pre) {
  background: #1e293b;
  color: #e2e8f0;
  padding: 16px 20px;
  border-radius: 8px;
  overflow-x: auto;
  margin: 12px 0;
  font-size: 0.85rem;
  line-height: 1.5;
}

.docs-content :deep(pre code) {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
}

.docs-content :deep(code) {
  background: #f1f5f9;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 0.85em;
  color: #e11d48;
}

/* ===== Tables ===== */
.docs-content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 12px 0;
  font-size: 0.85rem;
}

.docs-content :deep(th) {
  text-align: left;
  padding: 10px 14px;
  background: #f8fafc;
  color: #64748b;
  font-weight: 700;
  font-size: 0.8rem;
  border-bottom: 2px solid #e2e8f0;
}

.docs-content :deep(td) {
  padding: 10px 14px;
  border-bottom: 1px solid #f1f5f9;
  color: #334155;
  vertical-align: top;
}

.docs-content :deep(tr:hover td) {
  background: #f8fafc;
}

/* ===== HTTP method badges ===== */
.docs-content :deep(.http-method) {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 800;
  margin-right: 8px;
}

.docs-content :deep(.method-get) {
  background: #dcfce7;
  color: #166534;
}

.docs-content :deep(.method-post) {
  background: #dbeafe;
  color: #1e40af;
}

.docs-content :deep(.method-put) {
  background: #fef3c7;
  color: #92400e;
}

.docs-content :deep(.method-delete) {
  background: #fee2e2;
  color: #991b1b;
}

/* ===== Required badge ===== */
.docs-content :deep(.req-badge) {
  display: inline-block;
  background: #fef3c7;
  color: #92400e;
  padding: 1px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 700;
  margin-left: 6px;
}

/* ===== Nested parameter indentation ===== */
.docs-content :deep(.param-nest) {
  margin: 8px 0;
}

.docs-content :deep(.param-nest.depth-1) {
  margin-left: 24px;
  padding-left: 12px;
  border-left: 2px solid #e2e8f0;
}

.docs-content :deep(.param-nest.depth-2) {
  margin-left: 48px;
  padding-left: 12px;
  border-left: 2px solid #c7d2fe;
}

.docs-content :deep(.param-nest.depth-3) {
  margin-left: 72px;
  padding-left: 12px;
  border-left: 2px solid #a5b4fc;
}

/* ===== Alert boxes (:::tip / :::warning / :::danger) ===== */
.docs-content :deep(.doc-alert) {
  padding: 14px 18px;
  border-radius: 8px;
  margin: 12px 0;
  border-left: 4px solid;
}

.docs-content :deep(.doc-alert-title) {
  font-weight: 700;
  margin-bottom: 4px;
}

.docs-content :deep(.doc-alert-tip) {
  background: #eff6ff;
  border-left-color: #3b82f6;
  color: #1e40af;
}

.docs-content :deep(.doc-alert-tip .doc-alert-title) {
  color: #2563eb;
}

.docs-content :deep(.doc-alert-warning) {
  background: #fffbeb;
  border-left-color: #f59e0b;
  color: #92400e;
}

.docs-content :deep(.doc-alert-warning .doc-alert-title) {
  color: #d97706;
}

.docs-content :deep(.doc-alert-danger) {
  background: #fef2f2;
  border-left-color: #ef4444;
  color: #991b1b;
}

.docs-content :deep(.doc-alert-danger .doc-alert-title) {
  color: #dc2626;
}

/* ===== Collapsible sections ===== */
.docs-content :deep(.doc-section) {
  margin: 16px 0;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  overflow: hidden;
}

.docs-content :deep(.section-toggle) {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 18px;
  background: #f8fafc;
  cursor: pointer;
  user-select: none;
  transition: background 0.15s;
}

.docs-content :deep(.section-toggle:hover) {
  background: #eef2ff;
}

.docs-content :deep(.section-toggle h2) {
  margin: 0;
  font-size: 1rem;
}

.docs-content :deep(.toggle-icon) {
  color: #94a3b8;
  font-size: 0.85rem;
  transition: transform 0.25s;
}

.docs-content :deep(.section-body) {
  padding: 18px;
  max-height: 5000px;
  transition: max-height 0.35s ease, padding 0.35s ease;
  overflow: hidden;
}

.docs-content :deep(.doc-section[data-collapsed="true"] .section-body) {
  max-height: 0;
  padding: 0 18px;
}

.docs-content :deep(.doc-section[data-collapsed="true"] .toggle-icon) {
  transform: rotate(-90deg);
}

/* ===== Lists ===== */
.docs-content :deep(ul),
.docs-content :deep(ol) {
  padding-left: 24px;
  margin: 8px 0;
}

.docs-content :deep(li) {
  margin: 4px 0;
}

.docs-content :deep(strong) {
  color: #0f172a;
  font-weight: 700;
}

.docs-content :deep(blockquote) {
  border-left: 3px solid #e2e8f0;
  padding-left: 16px;
  margin: 12px 0;
  color: #64748b;
}

.docs-content :deep(hr) {
  border: none;
  border-top: 1px solid #e2e8f0;
  margin: 20px 0;
}

/* ===== Empty state ===== */
.docs-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: #94a3b8;
  gap: 16px;
}

.docs-empty i {
  font-size: 3rem;
}

.docs-empty p {
  font-size: 1rem;
}
</style>
