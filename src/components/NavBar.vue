<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useUser } from '@/utils/userStore'

const isMobileMenuOpen = ref(false)
const isUserPopupOpen = ref(false)

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value
    if (isMobileMenuOpen.value) isUserPopupOpen.value = false
}

const toggleUserPopup = () => {
    isUserPopupOpen.value = !isUserPopupOpen.value
    if (isUserPopupOpen.value) isMobileMenuOpen.value = false
}

const router = useRouter()
const { user, isLoggedIn, logout, refreshCredits } = useUser()

interface NavigationMenu {
  id: number
  parentId: number | null
  title: string
  titleEn: string
  url: string
  icon: string
  type: 'internal' | 'external'
  position: 'header' | 'footer'
  sortOrder: number
  isVisible: boolean
  target: '_self' | '_blank'
  children?: NavigationMenu[]
}

const defaultNav: NavigationMenu[] = [
  {
      id: 3, parentId: null, title: 'AI应用', titleEn: 'Apps', url: '/app-center', icon: '', type: 'internal', position: 'header', sortOrder: 2, isVisible: true, target: '_self'
  },
  {
      id: 4, parentId: null, title: '行业解决方案', titleEn: 'Solutions', url: '/solutions', icon: '', type: 'internal', position: 'header', sortOrder: 3, isVisible: true, target: '_self',
      children: [
          { id: 41, parentId: 4, title: '电商与跨境出海', titleEn: 'Ecommerce', url: '/solutions/ecommerce', icon: '', type: 'internal', position: 'header', sortOrder: 1, isVisible: true, target: '_self' },
          { id: 42, parentId: 4, title: '互联网与游戏', titleEn: 'Internet & Game', url: '/solutions/internet', icon: '', type: 'internal', position: 'header', sortOrder: 2, isVisible: true, target: '_self' },
          { id: 43, parentId: 4, title: '汽车产业', titleEn: 'Automotive', url: '/solutions/auto', icon: '', type: 'internal', position: 'header', sortOrder: 3, isVisible: true, target: '_self' },
          { id: 44, parentId: 4, title: '消费品行业', titleEn: 'Consumer Goods', url: '/solutions/consumer', icon: '', type: 'internal', position: 'header', sortOrder: 4, isVisible: true, target: '_self' },
          { id: 45, parentId: 4, title: '智能制造', titleEn: 'Manufacturing', url: '/solutions/manufacturing', icon: '', type: 'internal', position: 'header', sortOrder: 5, isVisible: true, target: '_self' },
          { id: 46, parentId: 4, title: '园区与产业服务', titleEn: 'Smart Park', url: '/solutions/park', icon: '', type: 'internal', position: 'header', sortOrder: 6, isVisible: true, target: '_self' },
          { id: 47, parentId: 4, title: '医疗健康', titleEn: 'Medical & Healthcare', url: '/solutions/medical', icon: '', type: 'internal', position: 'header', sortOrder: 7, isVisible: true, target: '_self' },
          { id: 48, parentId: 4, title: '政务与融媒体', titleEn: 'Gov & Media', url: '/solutions/gov-media', icon: '', type: 'internal', position: 'header', sortOrder: 8, isVisible: true, target: '_self' }
      ]
  },
  {
      id: 5, parentId: null, title: '模型与算力', titleEn: 'Infrastructure', url: '/infra', icon: '', type: 'internal', position: 'header', sortOrder: 5, isVisible: true, target: '_self'
  },
  {
      id: 6, parentId: null, title: '案例', titleEn: 'Case Studies', url: '/cases', icon: '', type: 'internal', position: 'header', sortOrder: 6, isVisible: true, target: '_self'
  },
  {
      id: 2, parentId: null, title: '资讯与活动', titleEn: 'News', url: '/news', icon: '', type: 'internal', position: 'header', sortOrder: 7, isVisible: true, target: '_self'
  }
]

interface NavActivity {
  id: number;
  title: string;
  category: string;
  linkType: string;
  externalLink: string;
}

const navActivities = ref<NavActivity[]>([])

const fetchNavActivities = async () => {
    try {
        const res = await fetch('/api/articles/nav')
        if (res.ok) {
            navActivities.value = await res.json()
        }
    } catch(e) { console.error('Failed to load nav activities', e) }
}

const headerMenus = ref<NavigationMenu[]>(defaultNav)

const goToLogin = () => router.push('/login')
const goToConsole = () => window.location.href = '/console.html' 

const activityCategories = computed(() => {
    const map = new Map<string, NavActivity[]>()
    navActivities.value.forEach(a => {
        if (!map.has(a.category)) map.set(a.category, [])
        map.get(a.category)!.push(a)
    })
    return Array.from(map.entries()).map(([k, v]) => ({ name: k, list: v }))
})

const windowWidth = ref(window.innerWidth)
const handleResize = () => {
    windowWidth.value = window.innerWidth
    if (windowWidth.value > 1024) {
        isMobileMenuOpen.value = false
        isUserPopupOpen.value = false
    }
}

onMounted(() => {
    fetchNavActivities()
    if (isLoggedIn.value) {
        refreshCredits()
    }
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <nav class="nav-bar">
    <div class="wrapper nav-wrapper" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="nav-header-mobile">
        <RouterLink to="/" class="logo home-link-logo" title="返回首页" @click="isMobileMenuOpen = false">
          <div class="logo-text">
            <span class="main">仓山区人工智能公共服务平台</span>
            <span class="sub">CANGSHAN AI PUBLIC SERVICE PLATFORM</span>
          </div>
        </RouterLink>
        
        <div class="nav-header-actions-mobile">
          <button class="mobile-user-trigger" @click="toggleUserPopup" :class="{ 'active': isUserPopupOpen }">
            <i class="fas" :class="isLoggedIn ? 'fa-user-check' : 'fa-user'"></i>
          </button>
          <button class="hamburger-btn" @click="toggleMobileMenu">
            <i class="fas" :class="isMobileMenuOpen ? 'fa-times' : 'fa-bars'"></i>
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
                  <span class="up-name">{{ user?.nickname || user?.username || '用户' }}</span>
                  <span class="up-role">已登录账号</span>
                </div>
              </div>
              <div class="up-actions">
                <button class="up-btn primary" @click="() => { goToConsole(); isUserPopupOpen = false; }">
                  <i class="fas fa-th-large"></i> 进入控制台
                </button>
                <button class="up-btn outline" @click="() => { logout(); isUserPopupOpen = false; }">
                  <i class="fas fa-sign-out-alt"></i> 退出当前账号
                </button>
              </div>
            </template>
            <template v-else>
              <div class="up-actions">
                <button class="up-btn primary" @click="() => { goToLogin(); isUserPopupOpen = false; }">登录/注册</button>
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
          :class="{ 'has-mega': (item.children && item.children.length > 0) || item.url === '/news' }"
        >
          <template v-if="item.url && item.url !== '#'">
            <RouterLink 
              v-if="item.type === 'internal'" 
              :to="item.url" 
              class="nav-link" 
              :target="item.target"
              :class="{ 'router-link-active': $route.path === item.url || (item.url === '/app-center' && $route.path === '/apps') }"
            >
              {{ item.title }}
              <i v-if="(item.children && item.children.length > 0) || item.url === '/news'" class="fas fa-chevron-down arrow"></i>
            </RouterLink>
            <a 
              v-else 
              :href="item.url" 
              class="nav-link" 
              :target="item.target"
              :class="{ 'router-link-active': $route.path === item.url }"
            >
             {{ item.title }}
             <i v-if="(item.children && item.children.length > 0) || item.url === '/news'" class="fas fa-chevron-down arrow"></i>
            </a>
          </template>
          <div v-else class="nav-link">
            {{ item.title }}
            <i class="fas fa-chevron-down arrow"></i>
          </div>
          
          <!-- Activity Mega Menu -->
          <div v-if="item.title === '最新活动' || item.title === '最新动态' || item.url === '/news'" class="mega-menu activity-mega">
             <div class="wrapper activity-mega-wrapper">
                 <div class="activity-mega-right" style="width: 100%;">
                     <div class="am-categories">
                         <div v-for="cat in activityCategories" :key="cat.name" class="am-category-block">
                             <h3 class="am-cat-title">{{ cat.name }}</h3>
                             <div class="am-links-grid">
                                 <template v-for="act in cat.list" :key="act.id">
                                     <a v-if="act.linkType === 'EXTERNAL_LANDING'" :href="act.externalLink" target="_blank" class="am-link-card">
                                         <div class="am-card-main">
                                            <span class="am-link-title">{{ act.title }}</span>
                                            <span class="am-badge" v-if="act.id % 2 === 0">HOT</span>
                                         </div>
                                     </a>
                                     <RouterLink v-else :to="'/news/' + act.id" class="am-link-card">
                                         <div class="am-card-main">
                                            <span class="am-link-title">{{ act.title }}</span>
                                            <span class="am-badge new" v-if="act.id % 3 === 0">NEW</span>
                                         </div>
                                     </RouterLink>
                                 </template>
                             </div>
                         </div>
                         <div v-if="navActivities.length === 0" style="padding: 20px 0; color: #94a3b8; font-size: 0.85rem;">目前暂无配置导航栏推荐活动</div>
                     </div>
                 </div>
             </div>
          </div>
          
          <!-- Normal Mega Menu -->
          <div v-else-if="item.children && item.children.length > 0" class="mega-menu">
            <div class="wrapper mega-wrapper">
              <div class="mega-column">
                <div class="mega-links">
                  <template v-for="child in item.children" :key="child.id">
                    <RouterLink v-if="child.type === 'internal'" :to="child.url" class="mega-link" :target="child.target">
                        <div class="link-text">
                             <span class="text">{{ child.title }}</span>
                             <span v-if="child.titleEn" class="sub">{{ child.titleEn }}</span>
                        </div>
                    </RouterLink>
                    <a v-else :href="child.url" class="mega-link" :target="child.target">
                        <div class="link-text">
                             <span class="text">{{ child.title }}</span>
                             <span v-if="child.titleEn" class="sub">{{ child.titleEn }}</span>
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
              <span class="mb-name">{{ user?.nickname || user?.username || '用户' }}</span>
              <div class="mb-divider"></div>
              <button class="btn-console-primary" @click="goToConsole">进入控制台</button>
              <button class="btn-logout-icon" @click="logout" title="退出登录"><i class="fas fa-sign-out-alt"></i></button>
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

.hamburger-btn, .mobile-user-trigger {
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
  color: #3B82F6;
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
  font-size: 1.15rem;
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
  content: '返回首页';
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
  color: #3B82F6;
}

.router-link-active:not(.logo) {
  color: #475569;
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
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
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
  box-shadow: 0 8px 16px -4px rgba(0,0,0,0.05);
  transform: translateY(-2px);
}

.mega-link:hover .text {
  color: #3B82F6;
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
  background: #3B82F6;
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
  background: #3B82F6;
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
  color: #3B82F6;
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px -2px rgba(0,0,0,0.05);
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
  
  .hamburger-btn, .mobile-user-trigger {
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
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.1);
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
    color: #3B82F6;
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
    color: #3B82F6;
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
    background: #3B82F6;
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
    color: #3B82F6;
    height: auto;
    padding: 10px;
  }

  /* Transition Animation */
  .fade-slide-enter-active, .fade-slide-leave-active {
    transition: all 0.3s ease;
  }
  .fade-slide-enter-from, .fade-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
}
</style>
