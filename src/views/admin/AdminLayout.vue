<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/utils/adminStore'
import { menuGroups as initialMenuGroups } from '@/utils/menuConfig'

const router = useRouter()
const route = useRoute()
const { logout } = useAuth()

// Add collapsed state to menu groups
const menuGroups = ref(initialMenuGroups)

const toggleGroup = (group: any) => {
  if (sidebarCollapsed.value) return
  
  const targetState = !group.isCollapsed
  
  // If we are expanding this group, collapse all others first (Accordion behavior)
  if (targetState === false) { // group.isCollapsed = false means it's expanded
     menuGroups.value.forEach(g => g.isCollapsed = true)
  }
  
  group.isCollapsed = targetState
}

const sidebarCollapsed = ref(false)

const getCurrentPageName = () => {
  for (const group of menuGroups.value) {
    const item = group.items.find(m => m.path === route.path)
    if (item) return item.name
  }
  return '管理后台'
}

const handleLogout = () => {
  if (confirm('确定要退出管理后台吗？')) {
    logout()
    router.push('/')
  }
}

const handleCommand = (command: string) => {
  if (command === 'logout') {
    handleLogout()
  } else if (command === 'profile') {
    router.push({ name: 'AdminProfile' })
  }
}
</script>

<template>
  <div class="admin-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- Sidebar -->
    <aside class="admin-sidebar">
      <div class="sidebar-header">
        <div class="admin-logo">
          <i class="fas fa-cube"></i>
          <span v-if="!sidebarCollapsed">仓之枢纽</span>
        </div>
        <button class="btn-collapse" @click="sidebarCollapsed = !sidebarCollapsed">
          <i :class="sidebarCollapsed ? 'fas fa-indent' : 'fas fa-outdent'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <div v-for="group in menuGroups" :key="group.title" class="menu-group" :class="{ 'is-collapsed': group.isCollapsed }">
          <div v-if="!sidebarCollapsed" class="group-header" @click="toggleGroup(group)">
            <span class="group-title">{{ group.title }}</span>
            <i class="fas" :class="group.isCollapsed ? 'fa-chevron-right' : 'fa-chevron-down'"></i>
          </div>
          <div class="group-items">
            <router-link 
              v-for="item in group.items" 
              :key="item.path" 
              :to="item.path"
              class="nav-menu-item"
              :title="sidebarCollapsed ? item.name : ''"
            >
              <i :class="item.icon"></i>
              <span v-if="!sidebarCollapsed">{{ item.name }}</span>
            </router-link>
          </div>
        </div>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-menu-item logout-btn" @click="handleLogout">
          <i class="fas fa-sign-out-alt"></i>
          <span v-if="!sidebarCollapsed">安全退出</span>
        </button>
        <a href="/" class="nav-menu-item home-btn">
          <i class="fas fa-home"></i>
          <span v-if="!sidebarCollapsed">回到首页</span>
        </a>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="admin-main">
      <header class="admin-topbar">
        <div class="topbar-left">
          <h2 class="view-title">{{ getCurrentPageName() }}</h2>
        </div>
        <div class="topbar-right">
          <el-dropdown trigger="click" @command="handleCommand">
            <div class="user-profile" style="cursor: pointer;">
              <div class="user-info">
                <span class="user-name">系统管理员</span>
                <span class="user-role">超级权限</span>
              </div>
              <i class="fas fa-angle-down" style="margin-left: 12px; color: #94a3b8; font-size: 0.8rem;"></i>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="profile">
                  <i class="fas fa-user-circle" style="margin-right: 8px; width: 16px; text-align: center;"></i>个人中心
                </el-dropdown-item>
                <el-dropdown-item divided command="logout" style="color: #ef4444;">
                  <i class="fas fa-sign-out-alt" style="margin-right: 8px; width: 16px; text-align: center;"></i>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <section class="admin-content-view">
        <router-view />
      </section>
    </main>
  </div>
</template>

<style scoped>
.admin-layout {
  display: flex;
  height: 100vh;
  background: #f1f5f9;
  color: #1e293b;
  overflow: hidden;
}

/* Sidebar Styling */
.admin-sidebar {
  width: 260px;
  background: #0f172a;
  color: #94a3b8;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 4px 0 20px rgba(0,0,0,0.15);
  z-index: 1000;
}

.sidebar-collapsed .admin-sidebar {
  width: 80px;
}

.sidebar-header {
  height: 72px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.admin-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  color: white;
  font-weight: 850;
  font-size: 1.2rem;
  overflow: hidden;
  white-space: nowrap;
}

.admin-logo i {
  color: #4f46e5;
}

.btn-collapse {
  background: none;
  border: none;
  color: #64748b;
  cursor: pointer;
  font-size: 1.1rem;
}

.btn-collapse:hover { color: white; }

.sidebar-nav {
  padding: 16px 12px;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.menu-group {
  margin-bottom: 20px;
}

.group-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.group-header:hover {
  opacity: 0.8;
}

.group-header i {
  font-size: 0.7rem;
  color: #475569;
}

.group-title {
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  color: #475569;
  letter-spacing: 0.05em;
}

.group-items {
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
  max-height: 500px;
}

.is-collapsed .group-items {
  max-height: 0;
}

.nav-menu-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 12px 20px;
  color: #94a3b8;
  text-decoration: none;
  border: none;
  background: none;
  width: 100%;
  border-radius: 4px;
  margin-bottom: 4px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  text-align: left;
}

.nav-menu-item i {
  width: 20px;
  text-align: center;
  font-size: 1.1rem;
}

.nav-menu-item:hover, .router-link-active {
  background: rgba(79, 70, 229, 0.1);
  color: white;
}

.router-link-active i {
  color: #4f46e5;
}

.sidebar-footer {
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,0.05);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.nav-menu-item {
  box-sizing: border-box; /* Ensure padding doesn't cause overflow */
}

.logout-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}

/* Main Content Area */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.admin-topbar {
  height: 72px;
  background: white;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  z-index: 10;
}

.view-title {
  font-size: 1.25rem;
  font-weight: 850;
  color: #0f172a;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 6px 16px;
  background: #f8fafc;
  border-radius: 4px;
  border: 1px solid #e2e8f0;
}

.avatar {
  width: 36px;
  height: 36px;
  background: #4f46e5;
  color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 800;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 800;
  font-size: 0.9rem;
  color: #0f172a;
}

.user-role {
  font-size: 0.7rem;
  color: #64748b;
  font-weight: 600;
}

.admin-content-view {
  padding: 40px;
  flex: 1;
  overflow-y: auto;
}
</style>
