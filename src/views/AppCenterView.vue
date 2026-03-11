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

// 动态对应用进行分类分组
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
  return Object.values(groups);
});

onMounted(() => {
  fetchApps();
});

const getGridClass = (n: number) => {
  // 根据用户需求：
  // 3, 5, 6, 9... 采用 3 列基准
  // 4, 7, 8, 12... 采用 4 列基准
  if (n === 4 || n === 7 || n === 8) return "grid-base-4";
  if (n >= 12 && n % 4 === 0) return "grid-base-4";
  return "grid-base-3";
};

const handleEnter = (app: Application) => {
  if (app.url === "#") {
    console.log("Component not ready yet");
    return;
  }
  if (app.url.startsWith("http") || app.url.startsWith("https")) {
    const url = app.url + "?PermutationID=" + localStorage.getItem("token");
    window.open(url, "_blank");
  } else {
    router.push(app.url);
  }
};
</script>

<template>
  <div class="app-center-page">
    <NavBar />

    <header class="app-hero">
      <div class="wrapper">
        <h1 class="hero-title">应用中心</h1>
        <p class="hero-sub">全场景 AI 赋能，深度覆盖企业经营四大命脉</p>
      </div>
    </header>

    <main class="app-main wrapper">
      <div
        v-for="(category, idx) in categories"
        :key="idx"
        class="category-block"
      >
        <div class="category-header">
          <div class="category-title-wrap">
            <i :class="category.icon" class="category-icon"></i>
            <h2 class="category-title">{{ category.title }}</h2>
          </div>
          <p class="category-desc">{{ category.description }}</p>
        </div>

        <div class="app-grid" :class="getGridClass(category.apps.length)">
          <div v-for="app in category.apps" :key="app.name" class="app-card">
            <div
              class="app-card-image"
              @click="handleEnter(app)"
              style="cursor: pointer"
            >
              <img :src="app.coverImage" :alt="app.name" />
            </div>
            <div class="app-card-content">
              <div class="app-card-header">
                <div class="app-icon" :title="app.nameEn">
                  <i :class="app.icon"></i>
                </div>
                <div class="app-titles">
                  <h3 class="app-name">{{ app.name }}</h3>
                  <span class="app-name-en">{{ app.nameEn }}</span>
                </div>
              </div>
              <p class="app-desc">{{ app.description }}</p>
              <button class="btn-enter" @click="handleEnter(app)">
                立即进入 <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.app-center-page {
  background: #f8fafc;
  min-height: 100vh;
}

.app-hero {
  background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
    url("@/assets/images/people-app-bg.png");
  background-size: cover;
  background-position: center;
  padding: 160px 0 100px;
  color: white;
  text-align: center;
}

@media (max-width: 768px) {
  .app-hero {
    padding: 100px 0 50px;
  }
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 850;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.2rem;
    margin-bottom: 12px;
  }
}

.hero-sub {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-sub {
    font-size: 1rem;
    padding: 0 20px;
  }
}

.app-main {
  padding: 80px 0 100px;
}

@media (max-width: 768px) {
  .app-main {
    padding: 40px 0 60px;
  }
}

.category-block {
  margin-bottom: 80px;
}

@media (max-width: 768px) {
  .category-block {
    margin-bottom: 40px;
  }
}

.category-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e2e8f0;
  text-align: center;
}

@media (max-width: 768px) {
  .category-header {
    margin-bottom: 24px;
    padding-bottom: 16px;
  }
}

.category-title-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 12px;
}

.category-icon {
  font-size: 2rem;
  color: #4f46e5;
  background: #eef2ff;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.15);
}

.category-title {
  font-size: 2.2rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  letter-spacing: -0.02em;
}

.category-desc {
  font-size: 1.1rem;
  color: #64748b;
  margin: 0 auto;
  max-width: 800px;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .category-icon {
    width: 44px;
    height: 44px;
    font-size: 1.5rem;
    border-radius: 10px;
  }
  .category-title {
    font-size: 1.5rem;
  }
  .category-desc {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}

/* 方案九：动态比例均衡网格 */
.app-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 32px;
  margin-top: 40px;
  width: 100%;
}

@media (max-width: 768px) {
  .app-grid {
    gap: 16px;
    margin-top: 24px;
  }
}

@media (max-width: 480px) {
  .app-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}

.grid-base-3 .app-card {
  flex: 0 1 380px; /* 以 3 列为基准，但在 4, 7, 8 以外的情况能较好地排列 */
}

.grid-base-4 .app-card {
  flex: 0 1 310px; /* 稍微调小，确保在普通宽屏下能挤下 4 个 */
}

@media (max-width: 480px) {
  .grid-base-3 .app-card,
  .grid-base-4 .app-card {
    flex: none;
    width: 100%;
  }
}

/* 在超大宽屏下，限制 4 列模式的最大宽度，防止卡片被拉得太宽 */
.grid-base-4 {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.app-card {
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  border: 1px solid #f1f5f9;
  display: flex;
  flex-direction: column;
}

.app-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 48px -12px rgba(79, 70, 229, 0.15);
  border-color: #c7d2fe;
}

.app-card-image {
  height: 200px;
  position: relative;
  overflow: hidden;
}

@media (max-width: 768px) {
  .app-card-image {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .app-card-image {
    height: 110px;
  }
}

.app-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.app-card:hover .app-card-image img {
  transform: scale(1.08);
}

.app-card-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

@media (max-width: 768px) {
  .app-card-content {
    padding: 16px;
  }
}

@media (max-width: 480px) {
  .app-card-content {
    padding: 12px;
  }
}

.app-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .app-card-header {
    gap: 10px;
    margin-bottom: 12px;
  }
}

.app-icon {
  width: 50px;
  height: 50px;
  background: #f8fafc;
  color: #4f46e5;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  border: 1px solid #e2e8f0;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .app-icon {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
    border-radius: 8px;
  }
}

.app-titles {
  display: flex;
  flex-direction: column;
}

.app-name {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
  line-height: 1.2;
}

.app-name-en {
  font-size: 0.75rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 4px;
}

@media (max-width: 768px) {
  .app-name {
    font-size: 1rem;
  }
  .app-name-en {
    font-size: 0.65rem;
    margin-top: 2px;
  }
}

.app-desc {
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 32px;
  height: 3.2em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .app-desc {
    font-size: 0.85rem;
    margin-bottom: 16px;
    height: 2.8em;
  }
}

@media (max-width: 480px) {
  .app-desc {
    display: none; /* In 2-column mobile, hide description to save space */
  }
}

.btn-enter {
  margin-top: auto;
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  color: #0f172a;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

@media (max-width: 768px) {
  .btn-enter {
    padding: 10px;
    font-size: 0.85rem;
  }
}

@media (max-width: 480px) {
  .btn-enter {
    padding: 8px;
    font-size: 0.8rem;
    border-radius: 6px;
  }
  .btn-enter i {
    font-size: 0.7rem;
  }
}

.app-card:hover .btn-enter {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 1.8rem;
  }
  .app-hero {
    padding: 80px 0 30px;
  }
}
</style>