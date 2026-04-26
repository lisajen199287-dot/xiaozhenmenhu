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
            <!-- <p class="category-desc" v-if="category.description">{{ category.description }}</p> -->
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

/* 简单的点阵背景纹理，替代动态光斑 */
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
  padding: 80px 0 60px; /* 顶部留出 NavBar 空间 */
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  z-index: 1;
}

/* --- 独立模块外框 (核心修改) --- */
.category-module {
  /* 白色背景框 */
  background: #ffffff;
  /* 圆润边角 */
  border-radius: 24px;
  /* 细腻的边框 */
  border: 1px solid #e2e8f0;
  /* 柔和的投影 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  
  margin-bottom: 40px;
  padding: 40px; /* 内部留白 */
  
  /* 桌面端尝试保持一屏感，但不强制 */
  min-height: auto; 
  display: flex;
  flex-direction: column;
}

.module-content {
  width: 100%;
}

/* --- 分类头部 (静态版) --- */
.category-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 32px;
}

.category-title-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
  /* 去除玻璃拟态，改为简洁的浅色背景 */
  background: #f8fafc;
  padding: 8px 20px;
  border-radius: 50px;
  border: 1px solid #f1f5f9;
}

.category-icon {
  font-size: 1.4rem;
  color: #4f46e5; /* 固定品牌色，无渐变动画 */
}

.category-title {
  font-size: 1.5rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}

.category-desc {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  max-width: 600px;
  line-height: 1.5;
}

/* --- 网格布局 --- */
.app-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  width: 100%;
}

.app-grid .app-card.span-two {
  grid-column: span 2;
}

/* --- 静态卡片样式 (去特效) --- */
.app-card {
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  /* 静态边框和阴影 */
  border: 1px solid #f1f5f9;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  
  display: flex;
  flex-direction: column;
  height: 100%;
  /* 移除 transition */
}

/* 移除所有 hover 效果，保持静止 */
.app-card:hover {
  /* 可选：如果完全不需要任何反馈，可以留空 */
  /* 这里保留极轻微的边框加深，提示可点击，但无位移 */
  border-color: #cbd5e1;
}

.app-card-image {
  height: 160px; 
  position: relative;
  overflow: hidden;
  background: #f8fafc;
  flex-shrink: 0;
}

.app-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 移除缩放动画 */
}

.app-card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-card-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.app-icon-box {
  width: 40px;
  height: 40px;
  background: #f8fafc;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  /* 移除阴影和过渡 */
}

.app-icon {
  font-size: 1.1rem;
  color: #4f46e5;
}

.app-titles {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-name {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.app-name-en {
  font-size: 0.65rem;
  color: #94a3b8;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 2px;
}

.app-desc {
  color: #475569;
  font-size: 0.85rem;
  line-height: 1.5;
  margin-bottom: 20px;
  height: 2.6em; /* 固定两行 */
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

/* 静态按钮 */
.btn-enter {
  margin-top: auto;
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  /* 移除过渡动画 */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

/* 按钮悬停仅改变背景色，无光影特效 */
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
    grid-column: span 1; /* 平板上第一个不再占两列，保持整齐 */
  }
}

@media (max-width: 768px) {
  .app-main {
    padding: 70px 16px 40px; /* 两侧增加间距 */
  }

  .category-module {
    padding: 24px 16px; /* 减小模块内边距 */
    margin-bottom: 24px;
    border-radius: 16px;
  }

  .category-header {
    margin-bottom: 24px;
  }

  .category-title-wrap {
    padding: 6px 16px;
  }

  .category-icon {
    font-size: 1.2rem;
  }

  .category-title {
    font-size: 1.25rem;
  }

  .app-grid {
    grid-template-columns: repeat(2, 1fr); /* 手机端双列 */
    gap: 12px;
  }
  
  .app-grid .app-card.span-two {
    grid-column: span 2; /* 第一个占满一行 */
  }

  .app-card-image {
    height: 110px;
  }

  .app-card-content {
    padding: 12px;
  }

  .app-icon-box {
    width: 32px;
    height: 32px;
  }

  .app-icon {
    font-size: 0.9rem;
  }

  .app-name {
    font-size: 0.9rem;
  }
  
  .app-desc {
    display: none; /* 双列模式下隐藏描述以节省空间 */
  }
  
  .btn-enter {
    padding: 8px;
    font-size: 0.8rem;
  }
}

@media (max-width: 480px) {
  .app-grid {
    grid-template-columns: 1fr; /* 极小屏幕单列 */
  }

  .app-grid .app-card.span-two {
    grid-column: span 1;
  }

  .app-card-image {
    height: 140px;
  }
  
  .app-desc {
    display: -webkit-box; /* 单列重新显示描述 */
    height: 2.6em;
  }
}
</style>