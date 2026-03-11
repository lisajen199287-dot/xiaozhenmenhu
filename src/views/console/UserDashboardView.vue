<script setup lang="ts">
import { ref, onMounted } from "vue";

import { useUser } from "@/utils/userStore";

import { useRouter } from "vue-router";
import * as newApi from "@/api/newApi/index";

interface AppPermission {
  appKey: string;
  permissionLevel: string;
  quotaLimit: number;
  quotaUsed: number;
  expireAt: string;
}

interface Application {
  appKey: string;
  name: string;
  icon: string;
}

const { user } = useUser();

const router = useRouter();

const userApps = ref<(Application & AppPermission)[]>([]);

const totalOrders = ref(0);

const loading = ref(true);

const fetchData = async () => {
  if (!user.value) return;

  loading.value = true;

  try {
    const uid = user.value.userId;

    const [permRes, appsRes, orderRes] = await Promise.all([
      newApi.apiAppPermissions(uid),

      newApi.apiApplications(),

      newApi.apiOrders(uid),
    ]);

    const perms = permRes;

    const apps = appsRes;

    userApps.value = perms.map((p: any) => ({
      ...p,
      ...(apps.find((a: any) => a.appKey === p.appKey) || {
        name: p.appKey,
        icon: "fas fa-app",
      }),
    }));
    const orders = orderRes;

    totalOrders.value = orders.reduce(
      (sum: number, o: any) => sum + (o.status === "PAID" ? o.amount : 0),
      0
    );
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>



<template>
  <div class="user-dashboard">
    <div class="welcome-banner">
      <div class="welcome-text">
        <h1>欢迎回来，{{ user?.nickname || user?.username }} 👋</h1>

        <p>您的 AI 数字化助手运行状态良好，今日调用量稳步增长。</p>
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon" style="background: #4f46e515; color: #4f46e5">
          <i class="fas fa-rocket"></i>
        </div>

        <div class="stat-info">
          <span class="stat-label">活跃应用数</span>
          <h3 class="stat-value">{{ userApps.length }}</h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #10b98115; color: #10b981">
          <i class="fas fa-coins"></i>
        </div>

        <div class="stat-info">
          <span class="stat-label">总配额授权</span>
          <h3 class="stat-value">
            {{ userApps.reduce((t, a) => t + a.quotaLimit, 0) }}
          </h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #f59e0b15; color: #f59e0b">
          <i class="fas fa-coins"></i>
        </div>

        <div class="stat-info">
          <span class="stat-label">已消耗额度</span>
          <h3 class="stat-value">
            {{ userApps.reduce((t, a) => t + a.quotaUsed, 0) }}
          </h3>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon" style="background: #ef444415; color: #ef4444">
          <i class="fas fa-wallet"></i>
        </div>

        <div class="stat-info">
          <span class="stat-label">累计消费</span>
          <h3 class="stat-value">¥ {{ totalOrders }}</h3>
        </div>
      </div>
    </div>

    <div class="dashboard-content-grid">
      <div class="content-card main-card">
        <div class="card-header">
          <h3>我的应用</h3>

          <RouterLink to="/apps" class="link-more">查看全部</RouterLink>
        </div>

        <div v-if="loading" class="loading-state">同步中...</div>

        <table v-else class="app-table">
          <thead>
            <tr>
              <th>应用名称</th>
              <th>App Key</th>
              <th>版本</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="app in userApps.slice(0, 5)" :key="app.appKey">
              <td>
                <div class="app-name-cell">
                  <div class="app-icon-placeholder">
                    <i :class="app.icon"></i>
                  </div>

                  <span class="name-text">{{ app.name }}</span>
                </div>
              </td>

              <td class="code-font">{{ app.appKey }}</td>

              <td>
                <span class="type-tag">{{
                  app.permissionLevel === "basic" ? "基础版" : "进阶版"
                }}</span>
              </td>

              <td><span class="status-indicator active">运行中</span></td>

              <td>
                <button class="btn-icon" @click="router.push('/apps')">
                  <i class="fas fa-chevron-right"></i>
                </button>
              </td>
            </tr>

            <tr v-if="userApps.length === 0">
              <td
                colspan="5"
                style="text-align: center; padding: 40px; color: #94a3b8"
              >
                暂无应用授权
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="side-column">
        <div class="content-card side-card">
          <div class="card-header"><h3>快捷入口</h3></div>

          <div class="quick-links">
            <!-- API key shortcut removed -->
            <RouterLink to="/support" class="quick-link-item"
              ><i class="fas fa-life-ring"></i> 在线技术支持</RouterLink
            >

            <RouterLink to="/billing" class="quick-link-item"
              ><i class="fas fa-wallet"></i> 财务发票管理</RouterLink
            >
          </div>
        </div>

        <!-- Upgrade Promo removed -->
      </div>
    </div>
  </div>
</template>



<style scoped>
.user-dashboard {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.welcome-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.welcome-text h1 {
  font-size: 1.5rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 8px;
}

.welcome-text p {
  color: #64748b;
  font-size: 0.95rem;
}

.btn-create-app {
  background: #0f172a;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 6px -1px rgba(15, 23, 42, 0.1);
}

.btn-create-app:hover {
  background: #1e293b;
  transform: translateY(-2px);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.stat-card {
  background: white;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.stat-label {
  display: block;
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 600;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 850;
  color: #0f172a;
  margin: 0;
}

.dashboard-content-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;
}

.content-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-header {
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  font-size: 1.1rem;
  font-weight: 800;
  margin: 0;
  color: #0f172a;
}

.link-more {
  font-size: 0.85rem;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 600;
}

.app-table {
  width: 100%;
  border-collapse: collapse;
}

.app-table th {
  text-align: left;
  padding: 12px 24px;
  background: #f8fafc;
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 700;
  border-bottom: 1px solid #e2e8f0;
}

.app-table td {
  padding: 16px 24px;
  border-bottom: 1px solid #f1f5f9;
  font-size: 0.9rem;
  color: #334155;
  vertical-align: middle;
}

.app-name-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-icon-placeholder {
  width: 32px;
  height: 32px;
  background: #e0e7ff;
  color: #4f46e5;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.9rem;
}

.name-text {
  font-weight: 700;
  color: #0f172a;
}

.code-font {
  font-family: monospace;
  font-size: 0.85rem;
  color: #64748b;
}

.type-tag {
  background: #f1f5f9;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #475569;
}

.status-indicator {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-indicator::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.status-indicator.active {
  color: #10b981;
}

.status-indicator.active::before {
  background: #10b981;
}

.btn-icon {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
}

.side-column {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.quick-link-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 24px;
  text-decoration: none;
  color: #475569;
  font-weight: 600;
  font-size: 0.95rem;
  border-bottom: 1px solid #f1f5f9;
  transition: all 0.2s;
}

.quick-link-item:hover {
  background: #f8fafc;
  color: #4f46e5;
  padding-left: 28px;
}

.quick-link-item i {
  width: 20px;
  text-align: center;
}

.promo-card {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  padding: 24px;
  border: none;
}

.promo-card h4 {
  font-size: 1.2rem;
  font-weight: 800;
  margin-bottom: 8px;
}

.promo-card p {
  font-size: 0.9rem;
  opacity: 0.9;
  margin-bottom: 20px;
}

.btn-upgrade {
  background: white;
  color: #4f46e5;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s;
}

.loading-state {
  padding: 40px;
  text-align: center;
  color: #94a3b8;
}
</style>
