<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import NavBar from "@/components/NavBar.vue";
import * as newApi from "@/api/newApi/index";

interface Application {
  name: string;
  nameEn: string;
  description: string;
  icon: string;
  coverImage: string;
  url: string;
  entryType: "iframe" | "redirect" | "vue";
  requirePayment: boolean;
  category: string;
  categoryIcon: string;
  categoryDescription: string;
  appType: string;
}

interface AppCategory {
  title: string;
  icon: string;
  description: string;
  apps: Application[];
}

const router = useRouter();
const apps = ref<Application[]>([]);
const loading = ref(true);

const fetchApps = async () => {
  try {
    const res = await newApi.apiPublicApplications();
    apps.value = res;
  } catch (e) {
    console.error("Failed to fetch apps:", e);
  } finally {
    loading.value = false;
  }
};

const categories = computed(() => {
  const groups: Record<string, AppCategory> = {};
  apps.value.forEach((app) => {
    const cat = app.category || "其他";
    if (!groups[cat]) {
      groups[cat] = {
        title: cat,
        icon: app.categoryIcon || "fas fa-th-large",
        description: app.categoryDescription || "",
        apps: [],
      };
    }
    groups[cat].apps.push(app);
  });

  let result = Object.values(groups);

  const aiToolIndex = result.findIndex(item => item.title === "AI 工具");
  if (aiToolIndex > 0) {
    const aiToolItem = result.splice(aiToolIndex, 1)[0];
    result.unshift(aiToolItem);
  }

  return result;
});

onMounted(() => {
  fetchApps();
});

const handleEnter = (app: Application) => {
  if (app.url === "#") {
    console.log("Component not ready yet");
    return;
  }
  if (app.url.startsWith("http") || app.url.startsWith("https")) {
    window.open(app.url, "_blank");
  } else {
    window.open(app.url, '_blank');
  }
};
</script>

<template>
  <div class="app-center-page">
    <!-- 静态背景 -->
    <div class="bg-pattern"></div>

    <NavBar />

    <main class="app-main wrapper">
      <!-- 每个分类作为一个独立的带框模块 -->
      <div v-for="(category, idx) in categories" :key="idx" class="category-module">
        
        <div class="module-content">
          <!-- 分类头部 -->
          <div class="category-header">
            <div class="category-title-wrap">
              <i :class="category.icon" class="category-icon"></i>
              <h2 class="category-title">{{ category.title }}</h2>
            </div>
          </div>

          <!-- 应用网格 -->
          <div class="app-grid">
            <div v-for="(app, index) in category.apps" :key="app.name" class="app-card" :class="{ 'span-two': index === 0 }">
              
              <div class="app-card-image" @click="handleEnter(app)">
                <img :src="app.coverImage" :alt="app.name" />
              </div>
              
              <div class="app-card-content">
                <div class="app-card-header">
                  <div class="app-icon-box">
                    <i :class="app.icon" class="app-icon"></i>
                  </div>
                  <div class="app-titles">
                    <h3 class="app-name">{{ app.name }}</h3>
                    <span class="app-name-en">{{ app.nameEn }}</span>
                  </div>
                </div>
                <p class="app-desc">{{ app.description }}</p>
                <button class="btn-enter" @click="handleEnter(app)">
                  <span class="btn-text">立即进入</span>
                  <i class="fas fa-arrow-right btn-icon"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* --- 全局背景 --- */
.app-center-page {
  background: #f8fafc;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
}

.bg-pattern {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  background-image: radial-gradient(#e2e8f0 1px, transparent 1px);
  background-size: 24px 24px;
  pointer-events: none;
}

.app-main {
  /* 顶部留出 NavBar 空间，底部留少许呼吸感 */
  padding: 80px 0 40px; 
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* --- 独立模块外框 (针对 13 寸屏优化) --- */
.category-module {
  background: #ffffff;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  
  margin-bottom: 30px;
  /* 关键：减小上下 padding，从 40px 减到 24px */
  padding: 24px 32px; 
  
  /* 关键：强制最小高度为视口高度减去导航栏和 margins */
  /* 100vh - 80px(top padding) - 40px(bottom padding) - 30px(margin) ≈ 85vh */
  min-height: calc(100vh - 150px);
  
  display: flex;
  flex-direction: column;
  justify-content: center; /* 垂直居中，让内容看起来充满屏幕 */
}

.module-content {
  width: 100%;
  /* 限制最大宽度，防止在大屏上拉得太长导致视觉空旷 */
  max-width: 1100px; 
  margin: 0 auto;
}

/* --- 分类头部 (紧凑版) --- */
.category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  /* 减小底部间距 */
  margin-bottom: 24px;
}

.category-title-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-bottom: 0;
  background: #f8fafc;
  /* 减小 padding */
  padding: 6px 18px;
  border-radius: 50px;
  border: 1px solid #f1f5f9;
}

.category-icon {
  font-size: 1.25rem;
  color: #4f46e5;
}

.category-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

/* --- 网格布局 --- */
.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px; /* 减小间距 */
  width: 100%;
}

.app-grid .app-card.span-two {
  grid-column: span 2;
}

/* --- 卡片样式 (紧凑版) --- */
.app-card {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.app-card:hover {
  border-color: #cbd5e1;
}

.app-card-image {
  /* 关键：大幅减小图片高度，从 160px 降到 120px */
  height: 120px; 
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  flex-shrink: 0;
}

.app-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-card-content {
  /* 减小内边距 */
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px; /* 减小间距 */
}

.app-icon-box {
  width: 32px; /* 减小图标盒 */
  height: 32px;
  background: #f8fafc;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
}

.app-icon {
  font-size: 0.9rem;
  color: #4f46e5;
}

.app-titles {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-name-en {
  font-size: 0.6rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 1px;
}

.app-desc {
  color: #475569;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 12px; /* 减小间距 */
  /* 严格限制为 2 行，高度约 2.2em */
  height: 2.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* 按钮 */
.btn-enter {
  margin-top: auto;
  width: 100%;
  padding: 8px; /* 减小按钮高度 */
  border-radius: 6px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.8rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.btn-enter:hover {
  background: #eef2ff;
  border-color: #c7d2fe;
  color: #4f46e5;
}

/* --- 移动端适配 --- */
@media (max-width: 1024px) {
  .app-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  .app-grid .app-card.span-two {
    grid-column: span 1;
  }
}

@media (max-width: 768px) {
  .app-main {
    padding: 70px 12px 30px;
  }

  .category-module {
    /* 移动端取消强制一屏高度，改为自然内容高度 */
    min-height: auto;
    padding: 20px 12px;
    margin-bottom: 20px;
    border-radius: 16px;
  }

  .category-header {
    margin-bottom: 20px;
  }

  .category-title-wrap {
    padding: 5px 14px;
  }

  .category-icon {
    font-size: 1.1rem;
  }

  .category-title {
    font-size: 1.15rem;
  }

  .app-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 10px;
  }
  
  .app-grid .app-card.span-two {
    grid-column: span 2;
  }

  .app-card-image {
    height: 100px;
  }

  .app-card-content {
    padding: 10px;
  }

  .app-icon-box {
    width: 28px;
    height: 28px;
  }

  .app-icon {
    font-size: 0.8rem;
  }

  .app-name {
    font-size: 0.85rem;
  }
  
  .app-desc {
    display: none;
  }
  
  .btn-enter {
    padding: 6px;
    font-size: 0.75rem;
  }
}

@media (max-width: 480px) {
  .app-grid {
    grid-template-columns: 1fr;
  }

  .app-grid .app-card.span-two {
    grid-column: span 1;
  }

  .app-card-image {
    height: 130px;
  }
  
  .app-desc {
    display: -webkit-box;
    height: 2.2em;
  }
}
</style>