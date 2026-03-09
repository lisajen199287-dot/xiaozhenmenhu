<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from "element-plus";
interface EventDetail {
  id: number;
  title: string;
  category: string;
  registrations: number;
  status: string;
  description: string;
  tag: string;
  deadline: string;
  location: string;
  duration: string;
  icon: string;
  badge: string;
}

const route = useRoute();
const router = useRouter();
const eventData = ref<EventDetail | null>(null);
const loading = ref(true);

const fetchEventDetail = async () => {
  loading.value = true;
  try {
    const id = route.params.id;
    const res = await newApi.apiAdmEventDetail(Number(id));
    eventData.value = await res;
    document.title = `${eventData.value?.title} - 仓山区人工智能公共服务平台`;
  } catch (e) {
    console.error("Failed to fetch event detail:", e);
  } finally {
    loading.value = false;
  }
};

// Registration Logic
import { useUser } from "@/utils/userStore";
const { user, isLoggedIn } = useUser();
const showRegModal = ref(false);
const regLoading = ref(false);
const regForm = ref({
  realName: "",
  phone: "",
  company: "",
  position: "",
  remark: "",
});

const handleJoinClick = () => {
  if (!isLoggedIn.value) {
    alert("请先登录后再参与活动");
    router.push("/login?redirect=" + route.fullPath);
    return;
  }
  showRegModal.value = true;
};

const submitRegistration = async () => {
  if (!regForm.value.realName || !regForm.value.phone) {
    return alert("请填写姓名和联系电话");
  }

  regLoading.value = true;
  try {
    let body = JSON.stringify({
      ...regForm.value,
      userId: user.value?.id,
    });
    const res = await newApi.apiAdmEventRegisterDetail(
      body,
      eventData.value?.id
    );
    const data = await res;
    ElMessage.success(data.message)
    regForm.value = {
      realName: "",
      phone: "",
      company: "",
      position: "",
      remark: "",
    };
    showRegModal.value = false;
  } catch (e:any) {
    showRegModal.value = false;
  } finally {
    regLoading.value = false;
  }
};

const statusClass = computed(() => {
  if (!eventData.value) return "";
  const status = eventData.value.status;
  if (status.includes("进行")) return "status-active";
  if (status.includes("报名")) return "status-registering";
  if (status.includes("已结")) return "status-ended";
  return "status-preparing";
});

onMounted(fetchEventDetail);
</script>

<template>
  <div class="event-detail-page">
    <nav class="breadcrumb-nav">
      <div class="wrapper">
        <RouterLink to="/">首页</RouterLink>
        <span class="separator">/</span>
        <RouterLink to="/events">动态动态</RouterLink>
        <span class="separator">/</span>
        <span class="current">{{ eventData?.title || "活动详情" }}</span>
      </div>
    </nav>

    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>正在加载活动详情...</p>
    </div>

    <template v-else-if="eventData">
      <!-- Hero Header -->
      <header class="detail-hero">
        <div class="wrapper">
          <div class="hero-grid">
            <div class="hero-info">
              <div class="info-top">
                <span class="cat-tag">{{ eventData.category }}</span>
                <span :class="['status-pill', statusClass]">{{
                  eventData.status
                }}</span>
              </div>
              <h1 class="title">{{ eventData.title }}</h1>
              <p class="summary">{{ eventData.tag }}</p>

              <div class="meta-strip">
                <div class="meta-item" v-if="eventData.location">
                  <i class="fas fa-map-marker-alt"></i>
                  <span>{{ eventData.location }}</span>
                </div>
                <div class="meta-item" v-if="eventData.deadline">
                  <i class="far fa-calendar-alt"></i>
                  <span>截止时间：{{ eventData.deadline }}</span>
                </div>
                <div class="meta-item">
                  <i class="fas fa-users"></i>
                  <span>{{ eventData.registrations }} 人已关注/报名</span>
                </div>
              </div>
            </div>
            <div class="hero-action-card">
              <div class="card-inner">
                <div class="price-row">
                  <span class="label">参与费用</span>
                  <span class="price">免费</span>
                </div>
                <button class="btn-main-action" @click="handleJoinClick">
                  立即预约参与
                </button>
                <p class="hint">预约后我们的专业团队将与您联系</p>
                <div class="share-row">
                  <span>分享给好友</span>
                  <div class="share-btns">
                    <button><i class="fab fa-weixin"></i></button>
                    <button><i class="fab fa-weibo"></i></button>
                    <button><i class="fas fa-link"></i></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Content Area -->
      <div class="wrapper detail-body">
        <div class="main-content">
          <section class="content-section card-box">
            <h2 class="section-title">活动介绍</h2>
            <div
              class="html-content"
              v-html="eventData.description || '暂无详细介绍'"
            ></div>
          </section>
        </div>

        <aside class="side-bar">
          <div class="side-card">
            <h3>主办方</h3>
            <div class="host-info">
              <div class="host-logo">CII</div>
              <div class="host-text">
                <p class="name">仓山区人工智能公共服务平台</p>
                <p class="desc">由仓山产投集团建设运营</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Registration Modal -->
      <div v-if="showRegModal" class="modal-overlay">
        <div class="reg-modal">
          <div class="modal-header">
            <h3>预约参与报名</h3>
            <button class="btn-close" @click="showRegModal = false">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-grid">
              <div class="form-group">
                <label>真实姓名 <span class="req">*</span></label>
                <input
                  v-model="regForm.realName"
                  type="text"
                  placeholder="输入您的真实姓名"
                />
              </div>
              <div class="form-group">
                <label>联系电话 <span class="req">*</span></label>
                <input
                  v-model="regForm.phone"
                  type="text"
                  placeholder="手机或办公电话"
                />
              </div>
              <div class="form-group">
                <label>所在企业/机构</label>
                <input
                  v-model="regForm.company"
                  type="text"
                  placeholder="请输入单位全称"
                />
              </div>
              <div class="form-group">
                <label>担任职务</label>
                <input
                  v-model="regForm.position"
                  type="text"
                  placeholder="例如：架构师/采购经理"
                />
              </div>
              <div class="form-group full">
                <label>补充备注 (选填)</label>
                <textarea
                  v-model="regForm.remark"
                  placeholder="您希望了解的细节或对活动的期待"
                ></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn-reg-cancel" @click="showRegModal = false">
              取消
            </button>
            <button
              class="btn-reg-submit"
              @click="submitRegistration"
              :disabled="regLoading"
            >
              {{ regLoading ? "提交中..." : "提交报名申请" }}
            </button>
          </div>
        </div>
      </div>
    </template>

    <div v-else class="error-container">
      <i class="fas fa-exclamation-circle"></i>
      <h2>抱歉，活动信息未找到</h2>
      <RouterLink to="/events" class="btn-back">返回列表</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.event-detail-page {
  background: #f8fafc;
  min-height: 100vh;
  padding-top: 80px;
  padding-bottom: 100px;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Breadcrumb */
.breadcrumb-nav {
  padding: 20px 0;
  font-size: 0.9rem;
  color: #64748b;
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
  margin: 0 10px;
  color: #cbd5e1;
}

.current {
  color: #0f172a;
  font-weight: 600;
}

/* Hero Section */
.detail-hero {
  background: white;
  padding: 60px 0;
  border-bottom: 1px solid #e2e8f0;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 60px;
  align-items: center;
}

.info-top {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
}

.cat-tag {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
}

.status-pill {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 700;
  color: white;
}

.status-active {
  background: #10b981;
}
.status-registering {
  background: #3b82f6;
}
.status-ended {
  background: #94a3b8;
}
.status-preparing {
  background: #f59e0b;
}

.title {
  font-size: 2.8rem;
  font-weight: 900;
  color: #0f172a;
  line-height: 1.2;
  margin-bottom: 16px;
  letter-spacing: -0.02em;
}

.summary {
  font-size: 1.25rem;
  color: #64748b;
  margin-bottom: 40px;
}

.meta-strip {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #475569;
  font-weight: 500;
  font-size: 0.95rem;
}

.meta-item i {
  color: #4f46e5;
  font-size: 1.1rem;
}

/* Action Card */
.hero-action-card {
  background: #0f172a;
  border-radius: 24px;
  padding: 40px;
  color: white;
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.2);
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;
}

.price-row .label {
  opacity: 0.6;
  font-size: 0.9rem;
}
.price-row .price {
  font-size: 1.8rem;
  font-weight: 800;
  color: #10b981;
}

.btn-main-action {
  width: 100%;
  background: #4f46e5;
  color: white;
  border: none;
  padding: 18px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 16px;
}

.btn-main-action:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.4);
}

.hint {
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.5;
  margin-bottom: 32px;
}

.share-row {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.share-row span {
  font-size: 0.9rem;
  opacity: 0.7;
}
.share-btns {
  display: flex;
  gap: 12px;
}
.share-btns button {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  transition: all 0.2s;
}

.share-btns button:hover {
  background: white;
  color: #0f172a;
}

/* Body Content */
.detail-body {
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 40px;
  padding-top: 60px;
}

.card-box {
  background: white;
  padding: 48px;
  border-radius: 20px;
  border: 1px solid #f1f5f9;
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.6rem;
  font-weight: 850;
  color: #0f172a;
  margin-bottom: 32px;
  position: relative;
  padding-left: 20px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 15%;
  bottom: 15%;
  width: 4px;
  background: #4f46e5;
  border-radius: 4px;
}

.html-content {
  font-size: 1.15rem;
  line-height: 1.8;
  color: #334155;
}

.html-content :deep(p) {
  margin-bottom: 20px;
}
.html-content :deep(img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 24px 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.simple-text {
  font-size: 1.1rem;
  color: #475569;
}

/* Side Bar */
.side-card {
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
}

.side-card h3 {
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
}

.host-info {
  display: flex;
  gap: 16px;
  align-items: center;
}

.host-logo {
  width: 50px;
  height: 50px;
  background: #4f46e5;
  color: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
}

.host-text .name {
  font-weight: 700;
  font-size: 0.95rem;
  color: #0f172a;
  margin: 0;
}
.host-text .desc {
  font-size: 0.8rem;
  color: #64748b;
  margin: 4px 0 0;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.9rem;
  color: #475569;
  margin-bottom: 16px;
}

.contact-list li i {
  color: #94a3b8;
}

/* States */
.loading-container,
.error-container {
  padding: 120px 0;
  text-align: center;
}

.spinner {
  width: 50px;
  height: 50px;
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

.error-container i {
  font-size: 4rem;
  color: #cbd5e1;
  margin-bottom: 24px;
}
.error-container h2 {
  font-weight: 800;
  color: #64748b;
  margin-bottom: 32px;
}

.btn-back {
  display: inline-block;
  background: #4f46e5;
  color: white;
  padding: 12px 32px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
}

@media (max-width: 1024px) {
  .hero-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
  .detail-body {
    grid-template-columns: 1fr;
  }
  .side-bar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .title {
    font-size: 2rem;
  }
  .side-bar {
    grid-template-columns: 1fr;
  }
}
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.reg-modal {
  background: white;
  width: 100%;
  max-width: 600px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  animation: modalIn 0.3s ease-out;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-header {
  padding: 24px 30px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 850;
  color: #0f172a;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #94a3b8;
  cursor: pointer;
}

.modal-body {
  padding: 30px;
}

.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group.full {
  grid-column: span 2;
}

.form-group label {
  display: block;
  font-size: 0.85rem;
  font-weight: 700;
  color: #475569;
  margin-bottom: 8px;
}

.req {
  color: #ef4444;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.2s;
  background: #f8fafc;
}

.form-group input:focus,
.form-group textarea:focus {
  background: white;
  border-color: #3b82f6;
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  outline: none;
}

.form-group textarea {
  height: 100px;
  resize: vertical;
}

.modal-footer {
  padding: 20px 30px;
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-reg-cancel {
  padding: 12px 24px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  color: #64748b;
  font-weight: 700;
  cursor: pointer;
}

.btn-reg-submit {
  padding: 12px 30px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 10px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.btn-reg-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
