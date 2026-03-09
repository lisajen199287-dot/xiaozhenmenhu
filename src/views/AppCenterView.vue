<script setup lang="ts">
import { ref, onMounted } from "vue";
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
}

interface AppCategory {
  title: string;
  icon: string;
  description: string;
  apps: Application[];
}

const router = useRouter();

const categories = ref<AppCategory[]>([
  {
    title: "内容与营销",
    icon: "fas fa-bullhorn",
    description:
      "通过智能内容生成大幅降低营销制作成本，提升品牌曝光率与内容转化效率。",
    apps: [],
  },
  {
    title: "获客与投放",
    icon: "fas fa-chart-line",
    description:
      "精准识别客户群体，深度研判商业趋势，重构全周期的多渠道投放网络。",
    apps: [],
  },
  {
    title: "销售与转化",
    icon: "fas fa-handshake",
    description:
      "智能化武装每一个前线阵地，通过数字助理提供沟通支持与销售成单背书。",
    apps: [],
  },
  {
    title: "经营与管理",
    icon: "fas fa-building",
    description:
      "数字化重塑企业行政、法务与人事生态节点，全面提升管理运营自动化。",
    apps: [],
  },
]);

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
const init = async () => {
  const res = await newApi.apiApplications();
  categories.value.forEach((category) => {
    category.apps = res.filter((app: any) => app.appType == category.title);
  });
};
onMounted(() => {
  init();
});
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

        <div class="app-grid" >
          <div v-for="app in category.apps" :key="app.name" class="app-card">
            <div
              class="app-card-image"
              @click="handleEnter(app)"
              style="cursor: pointer"
            >
              <img :src="app.coverImage" :alt="app.name" />
              <div class="app-tag" v-if="app.requirePayment">付费应用</div>
              <div class="app-tag free" v-else>免费体验</div>
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

.hero-title {
  font-size: 3.5rem;
  font-weight: 850;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.hero-sub {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.app-main {
  padding: 80px 0 100px;
}

.category-block {
  margin-bottom: 80px;
}

.category-header {
  margin-bottom: 40px;
  padding-bottom: 24px;
  border-bottom: 2px solid #e2e8f0;
}

.category-title-wrap {
  display: flex;
  align-items: center;
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
  margin: 0;
  margin-left: 72px; /* align with text */
  max-width: 800px;
  line-height: 1.6;
}

.app-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 32px;
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

.app-card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.app-card:hover .app-card-image img {
  transform: scale(1.08);
}

.app-tag {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 14px;
  background: rgba(239, 68, 68, 0.95);
  color: white;
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
  box-shadow: 0 4px 10px rgba(239, 68, 68, 0.2);
}

.app-tag.free {
  background: rgba(16, 185, 129, 0.95);
  box-shadow: 0 4px 10px rgba(16, 185, 129, 0.2);
}

.app-card-content {
  padding: 28px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.app-card-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
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

.app-card:hover .btn-enter {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  .category-title {
    font-size: 1.8rem;
  }
  .category-desc {
    margin-left: 0;
    margin-top: 12px;
  }
  .app-grid {
    grid-template-columns: 1fr;
  }
}
</style>