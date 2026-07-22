<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, RouterLink } from "vue-router";
import { useAdminStore } from "@/utils/adminStore";
import * as newApi from "@/api/newApi/index";

const route = useRoute();
const { articles } = useAdminStore();
const article = ref<any>(null);
const loading = ref(true);

const updateSEO = (title: string, description: string) => {
  document.title = `${title} - 仓山区互联网小镇数智化服务平台`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", description);
  } else {
    const meta = document.createElement("meta");
    meta.name = "description";
    meta.content = description;
    document.head.appendChild(meta);
  }
};

const fetchArticle = async (id: string) => {
  loading.value = true;
  try {
    // 1. 优先从 API 获取最新数据，确保后台修改实时生效
    const response = await newApi.apiAdmArticleDetail(Number(id));
    const data = response;
    processArticleData(data);
  } catch (error) {
    console.error("Failed to fetch article:", error);
    // 发生错误时再次尝试从本地查找
    article.value = null;
  } finally {
    loading.value = false;
  }
};

const processArticleData = (data: any) => {
  const d = new Date(data.date || new Date());
  data.formattedDate = `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(
    2,
    "0"
  )}月${String(d.getDate()).padStart(2, "0")}日`;

  if (!data.tag) {
    data.tag = data.category || "未分类";
    data.tagClass =
      data.category === "行业动态"
        ? "tag-event"
        : data.category === "技术教研"
        ? "tag-blog"
        : "tag-policy";
  }
  if (!data.content) data.content = "暂无内容...";

  article.value = data;
  updateSEO(
    data.title,
    data.summary || data.content.substring(0, 150).replace(/<[^>]*>/g, "")
  );
};

onMounted(() => {
  fetchArticle(route.params.id as string);
});

const copyLink = () => {
  const url = window.location.href;
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert("链接已复制到剪贴板");
    })
    .catch((err) => {
      console.error("无法复制链接: ", err);
      alert("复制失败，请手动记录浏览器地址栏链接");
    });
};
</script>

<template>
  <main class="news-detail-page">
    <!-- Breadcrumb -->
    <nav class="breadcrumb-nav">
      <RouterLink to="/">首页</RouterLink>
      <span class="separator">/</span>
      <RouterLink to="/news">资讯动态</RouterLink>
      <span class="separator">/</span>
      <span class="current" v-if="article">{{
        article.category || "详情"
      }}</span>
    </nav>

    <div v-if="loading" class="loading-state">
      <div class="spinner"></div>
      <p>正在加载精彩内容...</p>
    </div>

    <template v-else-if="article">
      <!-- Hero Header -->
      <header class="article-hero">
        <div class="hero-content">
          <div class="hero-meta">
            <span :class="['meta-tag', article.tagClass]">{{
              article.tag
            }}</span>
            <span class="meta-date">{{ article.formattedDate }}</span>
          </div>
          <h1 class="article-title-hero">{{ article.title }}</h1>
        </div>
      </header>

      <!-- Main Content (Centered) -->
      <div class="content-container">
        <article class="article-premium-card">
          <section class="article-content" v-html="article.content"></section>

          <footer class="article-footer-v2">
            <div class="footer-tags">
              <span class="tag-pill"># 人工智能</span>
              <span class="tag-pill"># {{ article.category }}</span>
              <span class="tag-pill"># 数字化转型</span>
            </div>

            <div class="footer-actions">
              <div class="share-group">
                <span>分享到：</span>
                <button class="social-btn" title="复制链接" @click="copyLink">
                  <i class="fab fa-weixin"></i>
                </button>
                <button class="social-btn" title="复制链接" @click="copyLink">
                  <i class="fab fa-weibo"></i>
                </button>
                <button class="social-btn" title="复制链接" @click="copyLink">
                  <i class="fas fa-link"></i>
                </button>
              </div>
              <RouterLink to="/news" class="btn-back">
                <i class="fas fa-arrow-left"></i> 返回动态列表
              </RouterLink>
            </div>
          </footer>
        </article>
      </div>
    </template>

    <div v-else class="error-state">
      <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 20px"></i>
      <p>没有权限，请先登录再查看详情</p>
      <RouterLink to="/news" class="back-link">返回列表</RouterLink>
    </div>
  </main>
</template>

<style scoped>
.news-detail-page {
  background: #f8fafc;
  min-height: 100vh;
  padding-bottom: 80px;
}

/* Breadcrumb */
.breadcrumb-nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 20px;
  color: #64748b;
  font-size: 0.9rem;
}

.breadcrumb-nav a {
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb-nav a:hover {
  color: #4f46e5;
}

.separator {
  margin: 0 8px;
  color: #cbd5e1;
}

.current {
  color: #0f172a;
  font-weight: 500;
}

/* Hero Header */
.article-hero {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 60px 0 80px;
  margin-bottom: -40px; /* Overlap effect */
}

.hero-content {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 40px;
  text-align: center;
}

.hero-meta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 24px;
}

.meta-tag {
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tag-event {
  background: #eef2ff;
  color: #4f46e5;
}
.tag-policy {
  background: #ecfdf5;
  color: #10b981;
}
.tag-blog {
  background: #fff7ed;
  color: #f59e0b;
}

.meta-date {
  color: #64748b;
  font-size: 0.9rem;
  font-weight: 500;
}

.article-title-hero {
  font-size: 2.8rem;
  font-weight: 850;
  color: #0f172a;
  line-height: 1.25;
  margin-bottom: 32px;
  letter-spacing: -0.02em;
}

/* New Premium Styles for Centered Layout */
.content-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  position: relative;
  z-index: 10;
}

.article-premium-card {
  background: white;
  padding: 60px 80px;
  border-radius: 24px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.04);
  border: 1px solid #f1f5f9;
}

.article-content {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
}

.article-content :deep(h2) {
  font-size: 1.8rem;
  color: #0f172a;
  margin: 40px 0 20px;
  font-weight: 800;
}

.article-content :deep(p) {
  margin-bottom: 24px;
}

.article-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 32px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.article-footer-v2 {
  margin-top: 60px;
  padding-top: 40px;
  border-top: 1px solid #f1f5f9;
}

.footer-tags {
  display: flex;
  gap: 12px;
  margin-bottom: 32px;
}

.tag-pill {
  background: #f1f5f9;
  color: #64748b;
  padding: 6px 16px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.share-group {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #64748b;
  font-size: 0.9rem;
}

.social-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}

.social-btn:hover {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
  transform: translateY(-2px);
}

.btn-back {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4f46e5;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  padding: 10px 20px;
  border-radius: 10px;
  background: #f5f3ff;
  transition: all 0.2s;
}

.btn-back:hover {
  background: #4f46e5;
  color: white;
  transform: translateX(-4px);
}

/* Bottom Banner */
.bottom-banner {
  margin-top: 40px;
}

.banner-glass {
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  padding: 40px;
  border-radius: 24px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.banner-glass::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.banner-glass h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 12px;
}

.banner-glass p {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 24px;
}

.btn-banner {
  background: white;
  color: #4f46e5;
  border: none;
  padding: 12px 32px;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s;
}

.btn-banner:hover {
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .article-premium-card {
    padding: 40px 20px;
  }
  .footer-actions {
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;
  }
}

.loading-state,
.error-state {
  text-align: center;
  padding: 100px 0;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e2e8f0;
  border-top-color: #4f46e5;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin: 0 auto 20px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>