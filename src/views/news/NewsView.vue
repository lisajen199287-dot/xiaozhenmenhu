<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as newApi from "@/api/newApi/index";

const router = useRouter();

// Article (News) types and state
interface Article {
  id: number;
  title: string;
  category: string;
  content: string;
  image: string;
  date: string;
  linkType: "INTERNAL_RICH_TEXT" | "EXTERNAL_LANDING";
  externalLink: string;
}

const activities = ref<Article[]>([]);
const activeCategory = ref("全部");
const loadingNews = ref(true);

// Event types and state
interface EventItem {
  id: number;
  title?: string;
  name?: string;
  description: string;
  category: string;
  startTime: string;
  endTime: string;
  deadline?: string;
  location: string;
  status: string;
}
const events = ref<EventItem[]>([]);
const loadingEvents = ref(true);

const categories = ["全部", "促销活动", "市场活动", "线下沙龙", "开发者沙龙"];

const fetchNews = async () => {
  loadingNews.value = true;
  try {
    const res = await newApi.apiAdmActiveArticles();
    activities.value = await res;
  } catch (e) {
    console.error("Failed to load active articles", e);
  } finally {
    loadingNews.value = false;
  }
};

const fetchEvents = async () => {
  loadingEvents.value = true;
  try {
    const res = await newApi.apiAdmActiveEvents();
    const data = await res;
    events.value = data.slice(0, 5); // Show top 5 upcoming events in sidebar
  } catch (e) {
    console.error("Failed to load events", e);
  } finally {
    loadingEvents.value = false;
  }
};

onMounted(() => {
  fetchNews();
  fetchEvents();
});

const filteredActivities = computed(() => {
  if (activeCategory.value === "全部") return activities.value;
  return activities.value.filter((a) => a.category === activeCategory.value);
});

const extractExcerpt = (html: string) => {
  if (!html) return "暂无简介";
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent || "";
  return text.length > 80 ? text.substring(0, 80) + "..." : text;
};

const parseDate = (isoString?: string) => {
  if (!isoString) return { day: "01", monthYear: "01/2026" };
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return { day: "01", monthYear: "01/2026" };
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return { day, monthYear: `${month}/${year}` };
  } catch {
    return { day: "01", monthYear: "01/2026" };
  }
};

const formatDateLine = (isoString?: string) => {
  if (!isoString) return "待定";
  try {
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return "待定";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(d.getDate()).padStart(2, "0")}`;
  } catch {
    return "待定";
  }
};

const handleNewsClick = (item: Article) => {
  if (item.linkType === "EXTERNAL_LANDING" && item.externalLink) {
    window.open(item.externalLink, "_blank");
  } else {
    router.push("/news/" + item.id);
  }
};

const goToEvent = (id: number) => {
  router.push("/events/" + id);
};
</script>

<template>
  <div class="news-events-hub">
    <!-- Ultra-Wide Hero -->
    <section class="neh-hero">
      <div class="content-wrapper wrapper">
        <h1 class="hero-title">资讯与活动中心</h1>
        <p class="hero-desc">掌握前沿 AI 趋势，参与平台精彩生态活动</p>
      </div>
    </section>

    <!-- Main Layout -->
    <section class="neh-main-layout wrapper">
      <!-- Left Content: News Stream (70%) -->
      <div class="neh-left-col">
        <div class="tabs-header">
          <div class="tabs">
            <button
              v-for="cat in categories"
              :key="cat"
              class="tab-btn"
              :class="{ active: activeCategory === cat }"
              @click="activeCategory = cat"
            >
              {{ cat }}
            </button>
          </div>
        </div>

        <div v-if="loadingNews" class="state-msg">
          <i class="fas fa-spinner fa-spin"></i> 资讯加载中...
        </div>
        <div v-else-if="filteredActivities.length === 0" class="state-msg">
          暂无资讯数据
        </div>

        <div class="news-list" v-else>
          <div
            v-for="item in filteredActivities"
            :key="'news-' + item.id"
            class="news-card-h"
            @click="handleNewsClick(item)"
          >
            <div class="nc-image">
              <img v-if="item.image" :src="item.image" :alt="item.title" />
              <div v-else class="nc-img-placeholder">
                <i class="fas fa-newspaper"></i>
              </div>
              <div class="nc-cat-badge">{{ item.category }}</div>
            </div>
            <div class="nc-content">
              <h3 class="nc-title">{{ item.title }}</h3>
              <p class="nc-desc">{{ extractExcerpt(item.content) }}</p>
              <div class="nc-meta">
                <span class="nc-date"
                  ><i class="far fa-clock"></i>
                  {{ formatDateLine(item.date) }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Content: Sticky Events Sidebar (30%) -->
      <div class="neh-right-col">
        <div class="sticky-sidebar">
          <div class="sidebar-header">
            <h3><i class="fas fa-calendar-alt"></i> 近期活动</h3>
            <span class="pulse-dot"></span>
          </div>

          <div v-if="loadingEvents" class="state-msg small">
            <i class="fas fa-spinner fa-spin"></i> 活动加载中...
          </div>
          <div v-else-if="events.length === 0" class="state-msg small">
            暂无近期活动
          </div>

          <div class="events-stack" v-else>
            <div
              v-for="ev in events"
              :key="'event-' + ev.id"
              class="sidebar-event-card"
              @click="goToEvent(ev.id)"
            >
              <div class="sev-date-box">
                <span class="sev-month"
                  >{{ parseDate(ev.deadline).monthYear.split("/")[0] }}月</span
                >
                <span class="sev-day">{{ parseDate(ev.deadline).day }}</span>
              </div>
              <div class="sev-info">
                <h4 class="sev-title" :title="ev.title || ev.name">
                  {{ ev.title || ev.name }}
                </h4>
                <div class="sev-meta">
                  <span
                    ><i class="fas fa-map-marker-alt"></i>
                    {{ ev.location || "线上/待定" }}</span
                  >
                </div>
                <button class="btn-reg-mini">了解详情 &rarr;</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.news-events-hub {
  min-height: 100vh;
  background: #f8fafc;
  padding-bottom: 60px;
}

/* Hero Section */
.neh-hero {
  background: linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.7)),
    url("@/assets/images/events-bg.jpg");
  background-size: cover;
  background-position: center;
  padding: 160px 0 100px;
  text-align: center;
  color: white;
  margin-bottom: 40px;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 850;
  margin-bottom: 20px;
  color: white;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.hero-desc {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  letter-spacing: 0.05em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

/* Layout */
.neh-main-layout {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  max-width: 1200px;
  margin: 0 auto;
}

.neh-left-col {
  flex: 7;
  min-width: 0;
}

.neh-right-col {
  flex: 3;
  min-width: 0;
}

/* Left: Tabs */
.tabs-header {
  margin-bottom: 24px;
}

.tabs {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 8px 20px;
  border-radius: 30px;
  border: 1px solid #e2e8f0;
  background: white;
  color: #64748b;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  background: #f1f5f9;
  color: #1e293b;
}

.tab-btn.active {
  background: #3b82f6;
  border-color: #3b82f6;
  color: white;
}

/* Left: News List */
.state-msg {
  padding: 40px;
  text-align: center;
  color: #94a3b8;
  background: white;
  border-radius: 12px;
}

.state-msg.small {
  padding: 20px;
  font-size: 0.9rem;
  background: none;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-card-h {
  display: flex;
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
  border: 1px solid #f1f5f9;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 200px;
}

.news-card-h:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.05);
  border-color: #e2e8f0;
}

.nc-image {
  width: 280px;
  flex-shrink: 0;
  position: relative;
  overflow: hidden;
}

.nc-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.news-card-h:hover .nc-image img {
  transform: scale(1.05);
}

.nc-img-placeholder {
  width: 100%;
  height: 100%;
  background: #f1f5f9;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: #cbd5e1;
}

.nc-cat-badge {
  position: absolute;
  top: 16px;
  left: 16px;
  background: rgba(255, 255, 255, 0.9);
  color: #3b82f6;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
  backdrop-filter: blur(4px);
}

.nc-content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.nc-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 12px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nc-desc {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin: 0 0 auto 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.nc-meta {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f1f5f9;
  font-size: 0.85rem;
  color: #94a3b8;
}

/* Right: Sticky Sidebar */
.sticky-sidebar {
  position: sticky;
  top: 100px;
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.05);
  border: 1px solid #f1f5f9;
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 2px solid #f8fafc;
}

.sidebar-header h3 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #1e293b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.sidebar-header h3 i {
  color: #3b82f6;
}

.pulse-dot {
  width: 8px;
  height: 8px;
  background-color: #ef4444;
  border-radius: 50%;
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(239, 68, 68, 0);
  }
}

.events-stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.sidebar-event-card {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  background: #f8fafc;
  cursor: pointer;
  transition: all 0.2s;
  border: 1px solid transparent;
}

.sidebar-event-card:hover {
  background: white;
  border-color: #e2e8f0;
  box-shadow: 0 4px 12px -4px rgba(0, 0, 0, 0.08);
  transform: translateX(4px);
}

.sev-date-box {
  width: 52px;
  height: 56px;
  background: white;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
}

.sev-month {
  font-size: 0.65rem;
  font-weight: 700;
  color: #ef4444;
  text-transform: uppercase;
}

.sev-day {
  font-size: 1.1rem;
  font-weight: 800;
  color: #1e293b;
  line-height: 1;
  margin-top: 2px;
}

.sev-info {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
}

.sev-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0 0 6px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.sev-meta {
  font-size: 0.75rem;
  color: #64748b;
  margin-bottom: auto;
}

.btn-reg-mini {
  align-self: flex-start;
  background: none;
  border: none;
  color: #3b82f6;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0;
  margin-top: 8px;
  cursor: pointer;
  transition: color 0.2s;
}

.sidebar-event-card:hover .btn-reg-mini {
  color: #2563eb;
}

@media (max-width: 1024px) {
  .neh-main-layout {
    flex-direction: column;
  }
  .neh-right-col,
  .neh-left-col {
    width: 100%;
  }
  .sticky-sidebar {
    position: static;
  }
}

@media (max-width: 768px) {
  .news-card-h {
    flex-direction: column;
    height: auto;
  }
  .nc-image {
    width: 100%;
    height: 200px;
  }
}
</style>