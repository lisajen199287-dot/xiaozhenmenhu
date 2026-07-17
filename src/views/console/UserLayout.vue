<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useRoute } from "vue-router";

import { useUser } from "@/utils/userStore";

const { user, isLoggedIn, logout } = useUser();

const route = useRoute();

const menuItems = [
  { name: "用户中心", icon: "fas fa-user-circle", path: "/profile" },
  { name: "我的工单", icon: "fas fa-clipboard-list", path: "/tickets" },
  { name: "词元中枢", icon: "fas fa-key", path: "/api" },
  { name: "费用中心", icon: "fas fa-wallet", path: "/billing" },
  { name: "帮助与反馈", icon: "fas fa-circle-question", path: "/help" },
];

const sidebarCollapsed = ref(false);
const switcherOpen = ref(false);
const activeIdentity = ref<'personal' | 'enterprise'>('enterprise');
const activeEnterpriseId = ref('ent-001');

const enterprises = [
  {
    id: 'ent-001',
    name: '福州某某科技有限公司',
    status: '认证完成',
    role: '企业管理员'
  },
  {
    id: 'ent-002',
    name: '仓山数字电商运营有限公司',
    status: '已认证',
    role: '运营负责人'
  },
  {
    id: 'ent-003',
    name: '福建云贸直播科技有限公司',
    status: '已认证',
    role: '标准成员'
  }
];

const activeEnterprise = () =>
  enterprises.find((item) => item.id === activeEnterpriseId.value) || enterprises[0];

const displayName = () => {
  if (activeIdentity.value === 'enterprise') return activeEnterprise().name;
  return user.value?.nickname || user.value?.username || '个人用户';
};

const displayRole = () => {
  if (activeIdentity.value === 'enterprise') return `${activeEnterprise().role} · ${activeEnterprise().status}`;
  return '个人用户 · 标准账户';
};

const switchIdentity = (identity: 'personal' | 'enterprise') => {
  activeIdentity.value = identity;
};

const switchEnterprise = (enterpriseId: string) => {
  activeIdentity.value = 'enterprise';
  activeEnterpriseId.value = enterpriseId;
};

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

          <span v-if="!sidebarCollapsed">小镇平台控制台</span>
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

          <div class="user-profile" @click="switcherOpen = !switcherOpen">
            <div class="avatar">
              <img v-if="user?.avatar" :src="user.avatar" class="avatar-img" />
              <template v-else>{{
                (activeIdentity === 'enterprise' ? activeEnterprise().name : user?.nickname || user?.username || "U")
                  .slice(-2)
                  .toUpperCase()
              }}</template>
            </div>

            <div class="user-info">
              <span class="user-name">{{ displayName() }}</span>
              <span class="user-role">{{ displayRole() }}</span>
            </div>
            <i class="fas fa-chevron-down switcher-arrow" :class="{ open: switcherOpen }"></i>

            <Transition name="identity-pop">
              <div v-if="switcherOpen" class="identity-switcher" @click.stop>
                <div class="switcher-title">
                  <strong>切换用户身份</strong>
                  <span>支持个人用户与多企业认证身份</span>
                </div>

                <button
                  class="identity-option"
                  :class="{ active: activeIdentity === 'personal' }"
                  @click="switchIdentity('personal')"
                >
                  <span class="option-icon personal"><i class="fas fa-user"></i></span>
                  <div>
                    <strong>个人用户</strong>
                    <p>使用个人资料、个人工单和基础服务</p>
                  </div>
                  <i v-if="activeIdentity === 'personal'" class="fas fa-check"></i>
                </button>

                <div class="enterprise-switch-block">
                  <div class="block-label">企业用户</div>
                  <button
                    v-for="enterprise in enterprises"
                    :key="enterprise.id"
                    class="identity-option enterprise"
                    :class="{ active: activeIdentity === 'enterprise' && activeEnterpriseId === enterprise.id }"
                    @click="switchEnterprise(enterprise.id)"
                  >
                    <span class="option-icon"><i class="fas fa-building"></i></span>
                    <div>
                      <strong>{{ enterprise.name }}</strong>
                      <p>{{ enterprise.role }} · {{ enterprise.status }}</p>
                    </div>
                    <i
                      v-if="activeIdentity === 'enterprise' && activeEnterpriseId === enterprise.id"
                      class="fas fa-check"
                    ></i>
                  </button>
                </div>

                <button class="add-enterprise-btn">
                  <i class="fas fa-plus"></i>
                  认证新的企业
                </button>
              </div>
            </Transition>
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
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px 10px;
  border-radius: 12px;
  transition: background 0.2s;
}

.user-profile:hover {
  background: #f8fafc;
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

.switcher-arrow {
  color: #94a3b8;
  font-size: 0.75rem;
  transition: transform 0.2s;
}

.switcher-arrow.open {
  transform: rotate(180deg);
}

.identity-switcher {
  position: absolute;
  right: 0;
  top: calc(100% + 12px);
  width: 390px;
  padding: 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 22px 60px rgba(15, 23, 42, 0.16);
  z-index: 30;
  cursor: default;
}

.identity-switcher::before {
  content: "";
  position: absolute;
  right: 24px;
  top: -7px;
  width: 14px;
  height: 14px;
  background: #fff;
  border-left: 1px solid #e2e8f0;
  border-top: 1px solid #e2e8f0;
  transform: rotate(45deg);
}

.switcher-title {
  margin-bottom: 12px;
}

.switcher-title strong,
.switcher-title span {
  display: block;
}

.switcher-title strong {
  color: #0f172a;
  font-size: 15px;
  margin-bottom: 4px;
}

.switcher-title span {
  color: #64748b;
  font-size: 12px;
}

.identity-option {
  width: 100%;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  text-align: left;
  cursor: pointer;
  transition: all 0.2s;
}

.identity-option + .identity-option,
.enterprise-switch-block .identity-option {
  margin-top: 8px;
}

.identity-option:hover {
  border-color: #bfdbfe;
  background: #f8fbff;
}

.identity-option.active {
  border-color: #4f46e5;
  background: #eef2ff;
}

.identity-option strong,
.identity-option p {
  display: block;
}

.identity-option strong {
  color: #0f172a;
  font-size: 13px;
  margin-bottom: 4px;
}

.identity-option p {
  margin: 0;
  color: #64748b;
  font-size: 12px;
  line-height: 1.4;
}

.identity-option > .fa-check {
  color: #4f46e5;
}

.option-icon {
  width: 34px;
  height: 34px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
}

.option-icon.personal {
  background: linear-gradient(135deg, #64748b, #0f172a);
}

.enterprise-switch-block {
  margin-top: 14px;
}

.block-label {
  margin-bottom: 8px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 800;
}

.add-enterprise-btn {
  width: 100%;
  height: 40px;
  margin-top: 12px;
  border: 1px dashed #93c5fd;
  border-radius: 12px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 800;
  cursor: pointer;
}

.add-enterprise-btn i {
  margin-right: 6px;
}

.identity-pop-enter-active,
.identity-pop-leave-active {
  transition: all 0.18s ease;
}

.identity-pop-enter-from,
.identity-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.user-content-view {
  padding: 32px;
  flex: 1;
  overflow-y: auto;
}

@media (max-width: 720px) {
  .user-info {
    display: none;
  }

  .identity-switcher {
    right: -8px;
    width: min(360px, calc(100vw - 32px));
  }
}
</style>
