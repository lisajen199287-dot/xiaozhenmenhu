<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAdminStore } from "@/utils/adminStore";
import * as newApi from "@/api/newApi/index";

const route = useRoute();
const router = useRouter();
const adminStore = useAdminStore();

const caseData = ref<any>(null);
const loading = ref(true);

const fetchCaseDetail = async () => {
  try {
    const id = Number(route.params.id);
    const res1 = await newApi.apiAdmCases();
    res1.forEach((item: any) => {
      item.stats = JSON.parse(item.stats);
    });
    // Try local store first
    const localCase = res1.find((c: any) => c.id === id);
    if (localCase) {
      caseData.value = {
        ...localCase,
        // Ensure field naming matches template expectations
        description: localCase.desc,
      };
      loading.value = false;
      return;
    }

    // const res2 = await newApi.apiAdmCaseDetail(id);
    // const data = await res2;
    // caseData.value = {
    //   ...data,
    //   stats: data.stats ? JSON.parse(data.stats) : [],
    // };
  } catch (e) {
    console.error("Failed to fetch case detail", e);
    router.replace("/cases");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCaseDetail();
  window.scrollTo(0, 0);
});

const copyLink = () => {
  navigator.clipboard.writeText(window.location.href);
  alert("链接已复制！");
};
</script>



<template>
  <div class="case-detail-page" v-if="loading">
    <div class="loader-overlay"><div class="spinner"></div></div>
  </div>

  <div class="case-detail-page" v-else-if="caseData">
    <!-- Module 1: Hero Header -->

    <header
      class="cd-hero"
      :style="{ backgroundImage: `url(${caseData.backgroundImage})` }"
    >
      <div class="cd-hero-overlay"></div>

      <div class="cd-hero-content wrapper">
        <!-- Breadcrumb -->

        <div class="cd-breadcrumb">
          <RouterLink to="/cases">案例库</RouterLink>

          <span class="sep">/</span>

          <span>{{
            caseData.subIndustry || caseData.category || caseData.industry
          }}</span>

          <span class="sep">/</span>

          <span class="current">{{ caseData.client }}</span>
        </div>

        <div class="cd-title-area">
          <div class="client-logo" v-if="caseData.logo">
            <i :class="caseData.logo"></i>
          </div>

          <h1 class="cd-title">
            {{ caseData.client }}：{{ caseData.bigTitle }}
          </h1>
        </div>

        <!-- Stats Grid (If available) -->

        <div
          class="cd-hero-stats"
          v-if="caseData.stats && caseData.stats.length > 0"
        >
          <div
            class="hero-stat-item"
            v-for="stat in caseData.stats"
            :key="stat.label"
          >
            <div class="hs-value">{{ stat.value }}</div>

            <div class="hs-label">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </header>

    <!-- Module 2: Main Content (3:7 Layout) -->

    <main class="cd-main-section wrapper">
      <div class="cd-layout-split">
        <!-- Left Sidebar: Structured Summary -->

        <aside class="cd-sidebar">
          <div class="cd-sidebar-inner sticky-sidebar">
            <div class="summary-card" v-if="caseData.painPoint">
              <div class="sc-header pain">
                <i class="fas fa-exclamation-triangle"></i> 核心痛点
              </div>

              <div class="sc-body" v-html="caseData.painPoint"></div>
            </div>

            <div class="summary-card" v-if="caseData.description">
              <div class="sc-header solution">
                <i class="fas fa-lightbulb"></i> 解决方案摘要
              </div>

              <div class="sc-body" v-html="caseData.description"></div>
            </div>

            <div class="summary-card share-card">
              <div class="sc-header base">
                <i class="fas fa-share-alt"></i> 分享案例
              </div>

              <div class="sc-body share-actions">
                <button class="icon-btn wx">
                  <i class="fab fa-weixin"></i>
                </button>

                <button class="icon-btn in">
                  <i class="fab fa-linkedin-in"></i>
                </button>

                <button class="icon-btn link" @click="copyLink">
                  <i class="fas fa-link"></i>
                </button>
              </div>
            </div>
          </div>
        </aside>

        <!-- Right Column: Rich Text Content -->

        <article class="cd-rich-content">
          <template v-if="caseData.content">
            <div class="rt-content-rendered" v-html="caseData.content"></div>
          </template>

          <template v-else>
            <div class="empty-content">
              <img
                src="https://illustrations.popsy.co/amber/freelancer.svg"
                alt="No detail content"
              />

              <h3>该案例的详细解读正在加紧撰写</h3>

              <p>
                您可以先参考左侧的执行摘要，或直接联系我们的行业专家获取内部资料
              </p>
            </div>
          </template>
        </article>
      </div>
    </main>

    <!-- Module 3: Call to Action Bottom -->

    <section class="cd-cta-bottom">
      <div class="wrapper cta-inner">
        <h2>
          {{ caseData.subIndustry || caseData.category || caseData.industry }}
          行业遇到类似的业务挑战？
        </h2>

        <p>
          立刻对话我们的行业架构师，为您量身定制专属 AI
          赋能方案，探索业务的无限可能
        </p>

        <div class="cta-actions">
          <RouterLink to="/solutions" class="btn-cta-primary">
            获取行业专属解决方案

            <i class="fas fa-arrow-right animate-arrow"></i>
          </RouterLink>

          <a href="#contact-sales" class="btn-cta-secondary"
            >联系销售咨询报价</a
          >
        </div>
      </div>

      <!-- Decorative background shapes -->

      <div class="cta-decor circle"></div>

      <div class="cta-decor grid"></div>
    </section>
  </div>
</template>



<style scoped>
.case-detail-page {
  background-color: #f8fafc;

  min-height: 100vh;

  padding-top: 72px; /* For fixed nav */

  font-family: "Inter", -apple-system, sans-serif;
}

.loader-overlay {
  height: 60vh;

  display: flex;

  align-items: center;

  justify-content: center;
}

.spinner {
  width: 40px;
  height: 40px;

  border: 4px solid #e2e8f0;

  border-top: 4px solid #4f46e5;

  border-radius: 50%;

  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}

/* Hero Section */

.cd-hero {
  position: relative;

  min-height: 50vh;

  background-size: cover;

  background-position: center;

  background-attachment: fixed;

  display: flex;

  align-items: flex-end;

  color: white;

  padding-bottom: 60px;

  padding-top: 120px;
}

.cd-hero-overlay {
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 0.4) 0%,
    rgba(15, 23, 42, 0.95) 100%
  );
}

.cd-hero-content {
  position: relative;

  z-index: 10;

  width: 100%;
}

.cd-breadcrumb {
  display: flex;

  gap: 12px;

  align-items: center;

  font-size: 0.85rem;

  font-weight: 600;

  margin-bottom: 32px;

  text-transform: uppercase;

  letter-spacing: 0.05em;

  opacity: 0.8;
}

.cd-breadcrumb a {
  color: white;
  text-decoration: none;
  transition: opacity 0.2s;
}

.cd-breadcrumb a:hover {
  opacity: 0.7;
}

.cd-breadcrumb .sep {
  color: rgba(255, 255, 255, 0.4);
}

.cd-breadcrumb .current {
  color: #a5b4fc;
}

.cd-title-area {
  display: flex;

  align-items: center;

  gap: 24px;

  margin-bottom: 48px;
}

.client-logo {
  font-size: 2.5rem;

  color: #a5b4fc;
}

.cd-title {
  font-size: 3.5rem;

  font-weight: 900;

  margin: 0;

  letter-spacing: -0.02em;

  line-height: 1.2;

  text-wrap: balance;
}

.cd-hero-stats {
  display: flex;

  gap: 40px;

  flex-wrap: wrap;

  padding-top: 32px;

  border-top: 1px solid rgba(255, 255, 255, 0.15);
}

.hero-stat-item {
  display: flex;

  flex-direction: column;
}

.hs-value {
  font-size: 2.5rem;

  font-weight: 900;

  color: #10b981;

  text-shadow: 0 2px 10px rgba(16, 185, 129, 0.2);
}

.hs-label {
  font-size: 0.9rem;

  font-weight: 600;

  color: #cbd5e1;

  text-transform: uppercase;

  letter-spacing: 0.05em;

  margin-top: 4px;
}

/* Main Layout */

.cd-main-section {
  padding: 60px 0 100px;
}

.cd-layout-split {
  display: grid;

  grid-template-columns: 280px 1fr;

  gap: 60px;

  align-items: start;
}

/* Sidebar */

.sticky-sidebar {
  position: sticky;

  top: 100px; /* Offset for fixed navbar */

  display: flex;

  flex-direction: column;

  gap: 24px;
}

.summary-card {
  background: white;

  border-radius: 12px;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05),
    0 2px 4px -2px rgba(0, 0, 0, 0.05);

  border: 1px solid #f1f5f9;

  overflow: hidden;
}

.sc-header {
  padding: 16px 20px;

  font-weight: 800;

  font-size: 0.95rem;

  display: flex;

  align-items: center;

  gap: 10px;
}

.sc-header.pain {
  background: #fff1f2;
  color: #be123c;
  border-bottom: 1px solid #ffe4e6;
}

.sc-header.solution {
  background: #eff6ff;
  color: #1d4ed8;
  border-bottom: 1px solid #dbeafe;
}

.sc-header.base {
  background: #f8fafc;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
}

.sc-body {
  padding: 20px;

  font-size: 0.9rem;

  color: #475569;

  line-height: 1.6;
}

.share-actions {
  display: flex;

  gap: 12px;

  justify-content: center;
}

.icon-btn {
  width: 40px;
  height: 40px;

  border-radius: 50%;

  border: 1px solid #e2e8f0;

  background: white;

  color: #64748b;

  font-size: 1.1rem;

  cursor: pointer;

  transition: all 0.2s;
}

.icon-btn:hover.wx {
  background: #10b981;
  color: white;
  border-color: #10b981;
}

.icon-btn:hover.in {
  background: #0ea5e9;
  color: white;
  border-color: #0ea5e9;
}

.icon-btn:hover.link {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

/* Rich Text Area */

.cd-rich-content {
  background: white;

  padding: 60px;

  border-radius: 16px;

  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05),
    0 8px 10px -6px rgba(0, 0, 0, 0.01);

  border: 1px solid #f1f5f9;
}

.rt-content-rendered {
  /* Scope styles strictly for the rich text from WangEditor */

  font-size: 1.1rem;

  line-height: 1.8;

  color: #334155;
}

.rt-content-rendered :deep(h2) {
  font-size: 1.8rem;

  font-weight: 850;

  color: #0f172a;

  margin: 48px 0 24px;

  padding-bottom: 12px;

  border-bottom: 2px solid #f1f5f9;
}

.rt-content-rendered :deep(h3) {
  font-size: 1.4rem;

  font-weight: 700;

  color: #1e293b;

  margin: 32px 0 16px;
}

.rt-content-rendered :deep(p) {
  margin-bottom: 24px;
}

.rt-content-rendered :deep(img) {
  max-width: 100%;

  height: auto;

  border-radius: 8px;

  margin: 32px 0;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  border: 1px solid #e2e8f0;
}

.rt-content-rendered :deep(.case-results-grid) {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin: 40px 0;
  background: #f1f5f9;
  padding: 30px;
  border-radius: 12px;
}

.rt-content-rendered :deep(.result-item) {
  text-align: center;
}

.rt-content-rendered :deep(.result-item h4) {
  font-size: 2rem;
  font-weight: 900;
  color: #4f46e5;
  margin: 0 0 10px;
}

.rt-content-rendered :deep(.result-item p) {
  font-size: 0.9rem;
  color: #64748b;
  margin: 0;
  font-weight: 600;
}

.rt-content-rendered :deep(blockquote) {
  border-left: 4px solid #4f46e5;

  background: #f8fafc;

  padding: 24px;

  margin: 32px 0;

  font-style: italic;

  font-size: 1.2rem;

  color: #475569;

  border-radius: 0 8px 8px 0;
}

.empty-content {
  text-align: center;

  padding: 60px 0;

  color: #64748b;
}

.empty-content img {
  height: 200px;

  margin-bottom: 24px;

  opacity: 0.8;
}

.empty-content h3 {
  font-size: 1.4rem;

  color: #0f172a;

  font-weight: 800;

  margin-bottom: 12px;
}

/* CTA Bottom */

.cd-cta-bottom {
  background: #0f172a;

  padding: 100px 0;

  position: relative;

  overflow: hidden;

  color: white;

  text-align: center;
}

.cta-inner {
  position: relative;

  z-index: 10;

  max-width: 800px;

  margin: 0 auto;
}

.cta-inner h2 {
  font-size: 2.2rem;

  font-weight: 900;

  margin-bottom: 24px;

  letter-spacing: -0.02em;
}

.cta-inner p {
  font-size: 1.2rem;

  color: #94a3b8;

  margin-bottom: 48px;

  line-height: 1.6;
}

.cta-actions {
  display: flex;

  justify-content: center;

  gap: 24px;
}

.btn-cta-primary {
  display: inline-flex;

  align-items: center;

  gap: 12px;

  background: #4f46e5;

  color: white;

  padding: 18px 36px;

  border-radius: 8px;

  font-weight: 800;

  font-size: 1.1rem;

  text-decoration: none;

  transition: all 0.3s;
}

.btn-cta-primary:hover {
  background: #4338ca;

  transform: translateY(-2px);

  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.animate-arrow {
  transition: transform 0.3s;
}

.btn-cta-primary:hover .animate-arrow {
  transform: translateX(4px);
}

.btn-cta-secondary {
  display: inline-flex;

  align-items: center;

  gap: 12px;

  background: rgba(255, 255, 255, 0.1);

  color: white;

  border: 1px solid rgba(255, 255, 255, 0.2);

  padding: 18px 36px;

  border-radius: 8px;

  font-weight: 800;

  font-size: 1.1rem;

  text-decoration: none;

  transition: all 0.3s;
}

.btn-cta-secondary:hover {
  background: rgba(255, 255, 255, 0.2);

  border-color: white;
}

.cta-decor {
  position: absolute;

  pointer-events: none;
}

.cta-decor.circle {
  width: 600px;
  height: 600px;

  border-radius: 50%;

  background: radial-gradient(
    circle,
    rgba(79, 70, 229, 0.2) 0%,
    transparent 70%
  );

  top: -100px;

  left: -200px;
}

.cta-decor.grid {
  width: 400px;
  height: 400px;

  background-image: radial-gradient(
    rgba(255, 255, 255, 0.1) 2px,
    transparent 2px
  );

  background-size: 30px 30px;

  bottom: 0;
  right: 0;

  opacity: 0.5;
}

@media (max-width: 992px) {
  .cd-layout-split {
    grid-template-columns: 1fr;
  }

  .sticky-sidebar {
    position: static;

    flex-direction: row;

    flex-wrap: wrap;
  }

  .summary-card {
    flex: 1;
    min-width: 280px;
  }

  .cd-title {
    font-size: 2.5rem;
  }

  .cd-rich-content {
    padding: 32px;
  }

  .cta-actions {
    flex-direction: column;
  }
}
</style>