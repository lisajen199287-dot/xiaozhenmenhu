<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

import { useUser } from "@/utils/userStore";

const { user, isLoggedIn, logout } = useUser();

const route = useRoute();

const menuItems = [
  { name: "基本信息", icon: "fas fa-user", path: "/profile" },
  { name: "API 管理", icon: "fas fa-key", path: "/apikeys" },
  { name: "lumi账单", icon: "fas fa-wallet", path: "/lumiBilling" },
  { name: "费用中心", icon: "fas fa-wallet", path: "/billing" },
];

const sidebarCollapsed = ref(false);

const handleLogout = async () => {
  await logout();
  window.location.href = "/";
};

const goHome = () => {
  window.location.href = "/";
};

// Heartbeat

const sendHeartbeat = async () => {
  if (!user.value) return;

  try {
    fetch("/api/activity/heartbeat", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        userId: user.value.id,

        page: route.name || route.path,

        module: "控制台模块",
      }),
    });
  } catch (e) {}
};

onMounted(() => {
  if (!isLoggedIn.value) {
    window.location.href = "/login";

    return;
  }

  setInterval(sendHeartbeat, 30000);

  sendHeartbeat();
});
</script>



<template>
  <div class="user-layout" :class="{ 'sidebar-collapsed': sidebarCollapsed }">
    <!-- Sidebar -->

    <aside class="user-sidebar">
      <div class="sidebar-header">
        <div class="user-logo" @click="goHome" style="cursor: pointer">
          <i class="fas fa-cube"></i>

          <span v-if="!sidebarCollapsed">CII CONSOLE</span>
        </div>

        <button
          class="btn-collapse"
          @click="sidebarCollapsed = !sidebarCollapsed"
        >
          <i :class="sidebarCollapsed ? 'fas fa-indent' : 'fas fa-outdent'"></i>
        </button>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="nav-menu-item"
          :title="sidebarCollapsed ? item.name : ''"
        >
          <div class="icon-box"><i :class="item.icon"></i></div>

          <span v-if="!sidebarCollapsed">{{ item.name }}</span>
        </router-link>
      </nav>

      <div class="sidebar-footer">
        <button class="nav-menu-item logout-btn" @click="handleLogout">
          <div class="icon-box"><i class="fas fa-sign-out-alt"></i></div>

          <span v-if="!sidebarCollapsed">退出登录</span>
        </button>
      </div>
    </aside>

    <!-- Main Content -->

    <main class="user-main">
      <header class="user-topbar">
        <div class="topbar-left">
          <h2 class="view-title">
            {{ menuItems.find((m) => route.path.startsWith(m.path))?.name || "控制台" }}
          </h2>
        </div>

        <div class="topbar-right">
          <!-- Removed Help Link (文档中心) -->

          <div class="user-profile">
            <div class="avatar">
              <img v-if="user?.avatar" :src="user.avatar" class="avatar-img" />
              <template v-else>{{
                (user?.nickname || user?.username || "U")
                  .substring(0, 2)
                  .toUpperCase()
              }}</template>
            </div>

            <div class="user-info">
              <span class="user-name">{{
                user?.nickname || user?.username || "企业开发者"
              }}</span>
              <span class="user-role">{{
                user?.role === "admin" ? "超级管理员" : "标准账户"
              }}</span>
            </div>
          </div>
        </div>
      </header>

      <section class="user-content-view">
        <router-view />
      </section>
    </main>
  </div>
</template>



<style scoped>
.user-layout {
  display: flex;
  height: 100vh;
  background: #f8fafc;
  color: #1e293b;
  overflow: hidden;
}

.user-sidebar {
  width: 240px;
  background: white;
  color: #64748b;
  display: flex;
  flex-direction: column;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border-right: 1px solid #e2e8f0;
  z-index: 1000;
}

.sidebar-collapsed .user-sidebar {
  width: 72px;
}

.sidebar-header {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f1f5f9;
}

.user-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #4f46e5;
  font-weight: 850;
  font-size: 1.1rem;
  overflow: hidden;
  white-space: nowrap;
}

.btn-collapse {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  font-size: 1rem;
}

.sidebar-nav {
  padding: 24px 12px;
  flex: 1;
  gap: 4px;
  display: flex;
  flex-direction: column;
}

.nav-menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  color: #64748b;
  text-decoration: none;
  border: none;
  background: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s;
  overflow: hidden;
  white-space: nowrap;
}

.icon-box {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  flex-shrink: 0;
}

.nav-menu-item:hover {
  background: #f1f5f9;
  color: #0f172a;
}

.router-link-active {
  background: #eff6ff !important;
  color: #4f46e5 !important;
}

.sidebar-footer {
  padding: 16px;
  border-top: 1px solid #f1f5f9;
}

.logout-btn:hover {
  background: #fef2f2 !important;
  color: #ef4444 !important;
}

.user-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.user-topbar {
  height: 64px;
  background: white;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
}

.view-title {
  font-size: 1.15rem;
  font-weight: 850;
  color: #0f172a;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 32px;
}

.help-link {
  color: #64748b;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
}

.help-link:hover {
  color: #4f46e5;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.avatar {
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  font-weight: 850;
}

.avatar-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 850;
  font-size: 0.95rem;
  color: #0f172a;
  line-height: 1.2;
}

.user-role {
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 600;
}

.user-content-view {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}
</style>