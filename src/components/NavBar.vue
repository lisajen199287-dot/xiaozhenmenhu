<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useUser } from "@/utils/userStore";
import * as LoginApi from "@/api/login/index";
import { resolveComponent } from "vue";

const isMobileMenuOpen = ref(false);
const isUserPopupOpen = ref(false);

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
  if (isMobileMenuOpen.value) isUserPopupOpen.value = false;
};

const toggleUserPopup = () => {
  isUserPopupOpen.value = !isUserPopupOpen.value;
  if (isUserPopupOpen.value) isMobileMenuOpen.value = false;
};

const router = useRouter();
const { user, isLoggedIn, logout, refreshCredits } = useUser();

interface NavigationMenu {
  id: number;
  parentId: number | null;
  title: string;
  titleEn: string;
  url: string;
  icon: string;
  type: "internal" | "external";
  position: "header" | "footer";
  sortOrder: number;
  isVisible: boolean;
  target: "_self" | "_blank";
  children?: NavigationMenu[];
}

const defaultNav: NavigationMenu[] = [
  {
    id: 1,
    parentId: null,
    title: "首页",
    titleEn: "Home",
    url: "/",
    icon: "",
    type: "internal",
    position: "header",
    sortOrder: 1,
    isVisible: true,
    target: "_self",
  },
  {
    id: 2,
    parentId: null,
    title: "电商产业",
    titleEn: "E-commerce Industry",
    url: "#",
    icon: "",
    type: "internal",
    position: "header",
    sortOrder: 2,
    isVisible: true,
    target: "_self",
    children: [
      {
        id: 21,
        parentId: 2,
        title: "电商运营全链路问数",
        titleEn: "Natural language BI for e-commerce operations",
        url: "/ecommerce-ask",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 1,
        isVisible: true,
        target: "_self",
      },
      {
        id: 22,
        parentId: 2,
        title: "直播电商数字员工",
        titleEn: "Digital employee for live commerce",
        url: "/digital-employee",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 2,
        isVisible: true,
        target: "_self",
      },
    ],
  },
  {
    id: 3,
    parentId: null,
    title: "AI普惠",
    titleEn: "Inclusive AI",
    url: "#",
    icon: "",
    type: "internal",
    position: "header",
    sortOrder: 3,
    isVisible: true,
    target: "_self",
    children: [
      {
        id: 31,
        parentId: 3,
        title: "企业龙虾 Claw KX",
        titleEn: "Enterprise AI productivity assistant",
        url: "/arkclaw",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 1,
        isVisible: true,
        target: "_self",
      },
      {
        id: 32,
        parentId: 3,
        title: "Hi-agent智能底座",
        titleEn: "Inclusive agent foundation platform",
        url: "/brain",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 2,
        isVisible: true,
        target: "_self",
      },
    ],
  },
  {
    id: 4,
    parentId: null,
    title: "数治流通",
    titleEn: "Data Governance & Flow",
    url: "#",
    icon: "",
    type: "internal",
    position: "header",
    sortOrder: 4,
    isVisible: true,
    target: "_self",
    children: [
      {
        id: 41,
        parentId: 4,
        title: "数据治理智能体",
        titleEn: "Data labeling, cleaning and quality inspection",
        url: "/data-governance",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 1,
        isVisible: true,
        target: "_self",
      },
      {
        id: 42,
        parentId: 4,
        title: "可信数据接入连接器",
        titleEn: "Trusted multi-source data connection",
        url: "/trusted-connector",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 2,
        isVisible: true,
        target: "_self",
      },
    ],
  },
  {
    id: 5,
    parentId: null,
    title: "园企协同",
    titleEn: "Park Enterprise Collaboration",
    url: "#",
    icon: "",
    type: "internal",
    position: "header",
    sortOrder: 5,
    isVisible: true,
    target: "_self",
    children: [
      {
        id: 51,
        parentId: 5,
        title: "园企协同平台",
        titleEn: "Park enterprise service landing page",
        url: "/park-collaboration",
        icon: "",
        type: "internal",
        position: "header",
        sortOrder: 1,
        isVisible: true,
        target: "_self",
      },
      {
        id: 52,
        parentId: 5,
        title: "词元中枢",
        titleEn: "Token operation center",
        url: "/console.html#/api",
        icon: "",
        type: "external",
        position: "header",
        sortOrder: 2,
        isVisible: true,
        target: "_self",
      },
    ],
  },
];

interface NavActivity {
  id: number;
  title: string;
  category: string;
  linkType: string;
  externalLink: string;
}

const navActivities = ref<NavActivity[]>([]);

const fetchNavActivities = async () => {
  try {
    const res = await LoginApi.nav();
    navActivities.value = res || [];
  } catch (e) {
    console.error("Failed to load nav activities", e);
  }
};

const headerMenus = ref<NavigationMenu[]>(defaultNav);

const goToLogin = () => router.push("/login");
const goToConsole = () => (window.location.href = "/console.html#/profile");

const normalizePath = (url: string) => url.split("#")[0].split("?")[0];

const isMenuActive = (item: NavigationMenu) => {
  const currentPath = router.currentRoute.value.path;
  const currentFullPath = router.currentRoute.value.fullPath;
  const itemPath = normalizePath(item.url || "");

  if (itemPath && itemPath !== "#" && currentPath === itemPath) return true;
  if (item.url && item.url.includes("#") && currentFullPath === item.url) return true;

  return Boolean(
    item.children?.some((child) => {
      const childPath = normalizePath(child.url || "");
      if (!childPath || childPath === "#") return false;
      return currentPath === childPath || currentPath.startsWith(`${childPath}/`);
    })
  );
};

const activityCategories = computed(() => {
  const map = new Map<string, NavActivity[]>();
  navActivities.value.forEach((a) => {
    if (!map.has(a.category)) map.set(a.category, []);
    map.get(a.category)!.push(a);
  });
  return Array.from(map.entries()).map(([k, v]) => ({ name: k, list: v }));
});

const windowWidth = ref(window.innerWidth);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
  if (windowWidth.value > 1024) {
    isMobileMenuOpen.value = false;
    isUserPopupOpen.value = false;
  }
};

onMounted(() => {
  fetchNavActivities();
  if (isLoggedIn.value) {
    refreshCredits();
  }
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<template>
  <nav class="nav-bar">
    <div
      class="wrapper nav-wrapper"
      :class="{ 'mobile-open': isMobileMenuOpen }"
    >
      <div class="nav-header-mobile">
        <RouterLink
          to="/"
          class="logo home-link-logo"
          title="返回首页"
          @click="isMobileMenuOpen = false"
        >
          <div class="logo-text">
            <span class="main">仓山区互联网小镇平台</span>
            <span class="sub">CANGSHAN INTERNET TOWN PLATFORM</span>
          </div>
        </RouterLink>

        <div class="nav-header-actions-mobile">
          <button
            class="mobile-user-trigger"
            @click="toggleUserPopup"
            :class="{ active: isUserPopupOpen }"
          >
            <i
              class="fas"
              :class="isLoggedIn ? 'fa-user-check' : 'fa-user'"
            ></i>
          </button>
          <button class="hamburger-btn" @click="toggleMobileMenu">
            <i
              class="fas"
              :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"
            ></i>
          </button>
        </div>
      </div>

      <!-- Mobile User Popup -->
      <Transition name="fade-slide">
        <div v-if="isUserPopupOpen" class="mobile-user-popup">
          <div class="user-popup-content">
            <template v-if="isLoggedIn">
              <div class="up-user-info">
                <div class="up-avatar"><i class="fas fa-user-circle"></i></div>
                <div class="up-details">
                  <span class="up-name">{{
                    user?.nickname || user?.username || "用户"
                  }}</span>
                  <span class="up-role">已登录账号</span>
                </div>
              </div>
              <div class="up-actions">
                <button
                  class="up-btn primary"
                  @click="
                    () => {
                      goToConsole();
                      isUserPopupOpen = false;
                    }
                  "
                >
                  <i class="fas fa-th-large"></i> 进入控制台
                </button>
                <button
                  class="up-btn outline"
                  @click="
                    () => {
                      logout();
                      isUserPopupOpen = false;
                    }
                  "
                >
                  <i class="fas fa-sign-out-alt"></i> 退出当前账号
                </button>
              </div>
            </template>
            <template v-else>
              <div class="up-actions">
                <button
                  class="up-btn primary"
                  @click="
                    () => {
                      goToLogin();
                      isUserPopupOpen = false;
                    }
                  "
                >
                  登录/注册
                </button>
              </div>
            </template>
          </div>
        </div>
      </Transition>

      <div class="nav-links" v-show="isMobileMenuOpen || windowWidth > 1024">
        <div
          v-for="item in headerMenus"
          :key="item.id"
          class="nav-item-container"
          :class="{
            'has-mega':
              (item.children && item.children.length > 0) ||
              item.url === '/news',
            'is-active': isMenuActive(item),
          }"
        >
          <template v-if="item.url && item.url !== '#'">
            <RouterLink
              v-if="item.type === 'internal'"
              :to="item.url"
              class="nav-link"
              :target="item.target"
              :class="{
                'router-link-active': isMenuActive(item),
              }"
            >
              {{ item.title }}
              <i
                v-if="
                  (item.children && item.children.length > 0) ||
                  item.url === '/news'
                "
                class="fas fa-chevron-down arrow"
              ></i>
            </RouterLink>
            <a
              v-else
              :href="item.url"
              class="nav-link"
              :target="item.target"
              :class="{ 'router-link-active': isMenuActive(item) }"
            >
              {{ item.title }}
              <i
                v-if="
                  (item.children && item.children.length > 0) ||
                  item.url === '/news'
                "
                class="fas fa-chevron-down arrow"
              ></i>
            </a>
          </template>
          <div v-else class="nav-link" :class="{ 'router-link-active': isMenuActive(item) }">
            {{ item.title }}
            <i class="fas fa-chevron-down arrow"></i>
          </div>

          <!-- Activity Mega Menu -->
          <div
            v-if="
              item.title === '最新活动' ||
              item.title === '最新动态' ||
              item.url === '/news'
            "
            class="mega-menu activity-mega"
          >
            <div class="wrapper activity-mega-wrapper">
              <div class="activity-mega-right" style="width: 100%">
                <div class="am-categories">
                  <div
                    v-for="cat in activityCategories"
                    :key="cat.name"
                    class="am-category-block"
                  >
                    <h3 class="am-cat-title">{{ cat.name }}</h3>
                    <div class="am-links-grid">
                      <template v-for="act in cat.list" :key="act.id">
                        <a
                          v-if="act.linkType === 'EXTERNAL_LANDING'"
                          :href="act.externalLink"
                          target="_blank"
                          class="am-link-card"
                        >
                          <div class="am-card-main">
                            <span class="am-link-title">{{ act.title }}</span>
                            <span class="am-badge" v-if="act.id % 2 === 0"
                              >HOT</span
                            >
                          </div>
                        </a>
                        <RouterLink
                          v-else
                          :to="'/news/' + act.id"
                          class="am-link-card"
                        >
                          <div class="am-card-main">
                            <span class="am-link-title">{{ act.title }}</span>
                            <span class="am-badge new" v-if="act.id % 3 === 0"
                              >NEW</span
                            >
                          </div>
                        </RouterLink>
                      </template>
                    </div>
                  </div>
                  <div
                    v-if="navActivities.length === 0"
                    style="padding: 20px 0; color: #94a3b8; font-size: 0.85rem"
                  >
                    目前暂无配置导航栏推荐活动
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Normal Mega Menu -->
          <div
            v-else-if="item.children && item.children.length > 0"
            class="mega-menu"
          >
            <div class="wrapper mega-wrapper">
              <div class="mega-column">
                <div class="mega-links">
                  <template v-for="child in item.children" :key="child.id">
                    <RouterLink
                      v-if="child.type === 'internal'"
                      :to="child.url"
                      class="mega-link"
                      :target="child.target"
                    >
                      <div class="link-text">
                        <span class="text">{{ child.title }}</span>
                        <span v-if="child.titleEn" class="sub">{{
                          child.titleEn
                        }}</span>
                      </div>
                    </RouterLink>
                    <a
                      v-else
                      :href="child.url"
                      class="mega-link"
                      :target="child.target"
                    >
                      <div class="link-text">
                        <span class="text">{{ child.title }}</span>
                        <span v-if="child.titleEn" class="sub">{{
                          child.titleEn
                        }}</span>
                      </div>
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="nav-actions" v-if="windowWidth > 1024">
        <template v-if="isLoggedIn">
          <div class="user-brief-minimal">
            <span class="mb-name">{{
              user?.nickname || user?.username || "用户"
            }}</span>
            <div class="mb-divider"></div>
            <button class="btn-console-primary" @click="goToConsole">
              进入控制台
            </button>
            <button class="btn-logout-icon" @click="logout" title="退出登录">
              <i class="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </template>
        <template v-else>
          <button class="btn-console" @click="goToConsole">控制台</button>
          <button class="btn-login-reg" @click="goToLogin">登录 / 注册</button>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid #f1f5f9;
  z-index: 2000;
  overflow: visible;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.nav-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  overflow: visible;
}

.nav-header-mobile {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-header-actions-mobile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hamburger-btn,
.mobile-user-trigger {
  display: none;
  background: none;
  border: none;
  font-size: 1.4rem;
  color: #475569;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.2s;
}

.mobile-user-trigger.active {
  color: #3b82f6;
  background: #eff6ff;
}

.logo {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: #0f172a;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-text .main {
  font-size: 1.09rem;
  font-weight: 850;
  letter-spacing: -0.01em;
}

.home-link-logo {
  position: relative;
  transition: opacity 0.2s ease;
}

.home-link-logo:hover {
  opacity: 0.75;
}

.home-link-logo::after {
  content: "返回首页";
  position: absolute;
  top: 50%;
  left: 100%;
  transform: translateY(-50%) translateX(10px);
  background: rgba(255, 255, 255, 0.9);
  color: #64748b;
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  font-size: 0.75rem;
  font-weight: 500;
  padding: 4px 12px;
  border-radius: 30px;
  pointer-events: none;
  opacity: 0;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 10;
  margin-left: 16px;
}

.home-link-logo:hover::after {
  opacity: 1;
  transform: translateY(-50%) translateX(0);
}

.logo-text .sub {
  font-size: 0.6rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.nav-links {
  display: flex;
  gap: 4px;
  height: 100%;
  overflow: visible;
}

.nav-item-container {
  display: flex;
  align-items: center;
  height: 100%;
}

.nav-link {
  padding: 0 16px;
  height: 40px;
  display: flex;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: #475569;
  font-size: 0.95rem;
  font-weight: 500;
  border-radius: 4px;
  transition: all 0.2s;
  cursor: pointer;
}

.nav-link:hover {
  background: transparent;
  color: #3b82f6;
}

.nav-item-container.is-active > .nav-link,
.nav-link.router-link-active:not(.logo) {
  color: #0f5fe8;
  font-weight: 800;
  background: linear-gradient(135deg, #eef6ff, #f7fbff);
  border: 1px solid #b9d7ff;
  box-shadow: 0 8px 20px rgba(15, 95, 232, 0.08);
}

.nav-item-container.is-active > .nav-link .arrow,
.nav-link.router-link-active:not(.logo) .arrow {
  opacity: 0.9;
}

.router-link-active:not(.logo) {
  font-weight: 800;
}

.arrow {
  font-size: 0.7rem;
  opacity: 0.5;
  transition: transform 0.3s;
}

.nav-item-container:hover .arrow {
  transform: rotate(180deg);
}

.mega-menu {
  display: none;
  position: fixed;
  top: 72px;
  left: 0;
  width: 100vw;
  background: white;
  border-bottom: 1px solid #f1f5f9;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  padding: 24px 0;
  z-index: 99999;
}

.nav-item-container:hover .mega-menu,
.mega-menu:hover {
  display: block;
}

.mega-wrapper {
  display: flex;
  justify-content: center;
  max-width: 1200px;
  margin: 0 auto;
}

.mega-column {
  width: 100%;
  padding: 20px 40px;
}

.mega-links {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.mega-link {
  padding: 20px 24px;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.2s;
  display: block;
  background: white;
  border: 1px solid transparent;
}

.mega-link:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  box-shadow: 0 8px 16px -4px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.mega-link:hover .text {
  color: #3b82f6;
}

.link-text .text {
  display: block;
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 2px;
}

.link-text .sub {
  display: block;
  font-size: 0.75rem;
  color: #64748b;
  font-weight: 500;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-brief-minimal {
  display: flex;
  align-items: center;
  gap: 16px;
}

.mb-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1e293b;
}

.mb-divider {
  width: 1px;
  height: 16px;
  background: #e2e8f0;
}

.btn-console-primary {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(59, 130, 246, 0.2);
}

.btn-console-primary:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.btn-logout-icon {
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 4px;
  font-size: 1rem;
  transition: color 0.2s;
}

.btn-logout-icon:hover {
  color: #ef4444;
}

.btn-console {
  background: #f1f5f9;
  color: #1e293b;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-console:hover {
  background: #e2e8f0;
}

.btn-login-reg {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 10px 24px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-login-reg:hover {
  background: #2563eb;
  transform: translateY(-1px);
}

.am-cat-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 16px;
  padding-bottom: 8px;
  border-bottom: 1px solid #f1f5f9;
}

.am-category-block {
  margin-bottom: 24px;
}
.am-category-block:last-child {
  margin-bottom: 0;
}

.am-links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.am-link-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  color: #475569;
  padding: 16px;
  border-radius: 8px;
  transition: all 0.2s;
  background: white;
  border: 1px solid transparent;
}

.am-link-card:not(:hover):visited {
  color: #475569;
}

.am-link-card:hover {
  background: #f8fafc;
  color: #3b82f6;
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
}

.am-card-main {
  display: flex;
  align-items: center;
  gap: 8px;
}

.am-link-title {
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
}

.am-badge {
  font-size: 0.65rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.am-badge.new {
  background: #fef2f2;
  color: #ef4444;
}

.am-badge:not(.new) {
  background: #fffbeb;
  color: #f59e0b;
}

@media (max-width: 1024px) {
  .nav-bar {
    height: auto;
    min-height: 72px;
  }

  .nav-wrapper {
    flex-direction: column;
    align-items: stretch;
    padding: 0;
  }

  .nav-header-mobile {
    height: 72px;
    padding: 0 16px;
  }

  .logo-text {
    flex-direction: column;
    gap: 2px;
  }

  .logo-text .main {
    font-size: clamp(0.75rem, 4vw, 0.9rem);
    font-weight: 700;
    letter-spacing: -0.01em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 60vw;
  }

  .logo-text .sub {
    font-size: clamp(0.45rem, 2.5vw, 0.55rem);
    font-weight: 600;
    letter-spacing: 0.03em;
  }

  .hamburger-btn,
  .mobile-user-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-links {
    flex-direction: column;
    padding: 10px 16px 30px;
    background: white;
    gap: 0;
    max-height: calc(100vh - 72px);
    overflow-y: auto;
  }

  .nav-item-container {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    margin-bottom: 4px;
  }

  .nav-link {
    justify-content: space-between;
    height: 48px;
    font-size: 1rem;
    padding: 0 12px;
  }

  .mega-menu {
    position: static;
    box-shadow: none;
    display: none !important; /* Hide sophisticated hover menus on mobile for now */
  }

  /* Mobile User Popup Styles */
  .mobile-user-popup {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: white;
    border-bottom: 1px solid #f1f5f9;
    box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
    z-index: 1999;
  }

  .user-popup-content {
    padding: 20px;
  }

  .up-welcome {
    text-align: center;
    margin-bottom: 24px;
  }

  .up-welcome i {
    font-size: 2.5rem;
    color: #3b82f6;
    margin-bottom: 12px;
    opacity: 0.8;
  }

  .up-welcome h3 {
    font-size: 1.15rem;
    font-weight: 800;
    color: #0f172a;
    margin-bottom: 8px;
  }

  .up-welcome p {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.5;
  }

  .up-user-info {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 12px;
    background: #f8fafc;
    border-radius: 12px;
    margin-bottom: 20px;
  }

  .up-avatar {
    font-size: 2.4rem;
    color: #3b82f6;
  }

  .up-details {
    display: flex;
    flex-direction: column;
  }

  .up-name {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
  }

  .up-role {
    font-size: 0.75rem;
    color: #64748b;
    margin-top: 2px;
  }

  .up-actions {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .up-btn {
    width: 100%;
    height: 48px;
    border-radius: 10px;
    font-weight: 700;
    font-size: 0.95rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: all 0.2s;
  }

  .up-btn.primary {
    background: #3b82f6;
    color: white;
    border: none;
  }

  .up-btn.outline {
    background: white;
    border: 1px solid #e2e8f0;
    color: #64748b;
  }

  .up-btn.text {
    background: transparent;
    border: none;
    color: #3b82f6;
    height: auto;
    padding: 10px;
  }

  /* Transition Animation */
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: all 0.3s ease;
  }
  .fade-slide-enter-from,
  .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
