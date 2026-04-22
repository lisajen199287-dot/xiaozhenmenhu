<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

const ApiDocsTab = defineAsyncComponent(() => import('@/views/console/components/ApiDocsTab.vue'))
</script>

<template>
  <div class="docs-standalone">
    <header class="docs-header">
      <a href="/" class="docs-logo">
        <i class="fas fa-cube"></i>
        <span>API 文档中心</span>
      </a>
      <div class="header-right">
        <a href="/" class="back-link"><i class="fas fa-arrow-left"></i> 返回首页</a>
        <a href="/console.html" class="back-link"><i class="fas fa-th-large"></i> 控制台</a>
      </div>
    </header>
    <main class="docs-body">
      <ApiDocsTab />
    </main>
  </div>
</template>

<style scoped>
.docs-standalone {
  min-height: 100vh;
  background: #f8fafc;
}
.docs-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  z-index: 2000;
}
.docs-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #4f46e5;
  font-weight: 850;
  font-size: 1.1rem;
}
.header-right {
  display: flex;
  gap: 20px;
}
.back-link {
  color: #64748b;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: color 0.2s;
}
.back-link:hover {
  color: #4f46e5;
}
.docs-body {
  padding-top: 60px;
}
</style>
