<template>
  <div class="writeoff-wrapper">
    <!-- 顶部导航栏 -->
    <nav class="top-navbar">
      <div class="navbar-inner">
        <div class="navbar-logo">AI算力消费券</div>
        <div class="navbar-links">
          <a href="#packages">应用包</a>
        </div>
        <button class="navbar-cta" @click="handleVerifyClick">立即核销</button>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge">
          福州市商务局 × 抖音集团 × 仓山区人工智能公共服务平台 联合推出
        </div>
        <h1 class="hero-title">全国首个<span class="highlight">AI算力消费券</span></h1>
        <div class="hero-features">
          <div class="hero-feature-item">
            <span class="feature-check">✓</span>
            AI能力一站式兑换
          </div>
          <div class="hero-feature-dot"></div>
          <div class="hero-feature-item">
            <span class="feature-check">✓</span>
            企业数字化应用加速落地
          </div>
        </div>
        <button class="hero-cta" @click="handleVerifyClick">
          <span class="cta-icon">🎫</span>
          立即核销
        </button>
      </div>
    </section>
    <!-- Application Packages Section -->
    <section class="packages-section" id="packages">
      <div class="section-header">
        <h2 class="section-title">选择适合您的应用包</h2>
        <p class="section-subtitle">一站式AI能力兑换，助力企业数字化转型</p>
      </div>
      <div class="packages-inner">
        <!-- 综合应用包 ¥469 -->
        <div class="pkg-card pkg-premium">
          <img src="@/assets/images/claw/469icon.png" alt="AI综合应用包 ¥469" class="pkg-bg-img" />
        </div>

        <!-- 基础应用包 ¥69 -->
        <div class="pkg-card pkg-basic">
          <img src="@/assets/images/claw/69icon.png" alt="AI基础应用包 ¥69" class="pkg-bg-img" />
        </div>
      </div>
    </section>

    <!-- Footer -->
    <!-- <footer class="page-footer">
      <div class="footer-inner">
        <div class="footer-brand">AI算力消费券</div>
        <div class="footer-right">
          <div class="footer-links">
            <a href="#">隐私协议</a>
            <a href="#">服务条款</a>
          </div>
          <div class="footer-copy">© 2024 仓山区人工智能公共服务平台</div>
        </div>
      </div>
    </footer> -->

    <!-- 核销弹窗 -->
    <el-dialog
      v-model="kamiDialogVisible"
      width="420px"
      :close-on-click-modal="false"
      class="kami-dialog"
      :show-close="true"
    >
      <template #header>
        <div class="dialog-header">
          <div class="dialog-icon">🎫</div>
          <h3 class="dialog-title">AI算力消费券核销</h3>
          <p class="dialog-subtitle">请输入您的卡号和密码完成核销</p>
        </div>
      </template>
      <div class="kami-form">
        <div class="form-group">
          <div class="form-item">
            <label class="form-label">卡号</label>
            <input
              v-model="certNo"
              type="text"
              placeholder="请输入您的卡号（32位）"
              maxlength="32"
              class="form-input"
            />
          </div>
          <div class="form-item">
            <label class="form-label">密码</label>
            <input
              v-model="certKey"
              type="password"
              placeholder="请输入您的密码（6位）"
              maxlength="6"
              class="form-input"
            />
          </div>
        </div>
        <button
          type="submit"
          class="btn-kami-submit"
          @click="verifyKami"
          :disabled="!certNo.trim() || !certKey.trim() || verifying"
        >
          <span v-if="verifying" class="loading-spinner"></span>
          {{ verifying ? '核验中...' : '立即核验' }}
        </button>
        <!-- <p class="form-tip">核销成功后，算力补贴将即刻到账</p> -->
      </div>
    </el-dialog>

    <!-- 核销成功弹窗 -->
    <el-dialog
      v-model="successDialogVisible"
      width="400px"
      :close-on-click-modal="false"
      class="success-dialog"
      :show-close="false"
    >
      <div class="success-content">
        <div class="success-icon">✅</div>
        <h3 class="success-title">核销成功！</h3>
        <button class="btn-success" @click="successDialogVisible = false">确定</button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from "element-plus";

const router = useRouter();

// 核销弹窗
const kamiDialogVisible = ref(false);
const successDialogVisible = ref(false);
const certNo = ref("");
const certKey = ref("");
const verifying = ref(false);

const handleVerifyClick = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push({ path: "/login", query: { redirect: "/writeOff" } });
    return;
  }
  kamiDialogVisible.value = true;
};

const verifyKami = async () => {
  if (!certNo.value.trim() || certNo.value.length !== 32) {
    ElMessage.warning("请输入32位卡号");
    return;
  }
  if (!certKey.value.trim() || certKey.value.length !== 6) {
    ElMessage.warning("请输入6位密码");
    return;
  }
  try {
    verifying.value = true;
    await newApi.apiWriteOffWithNaturalUser({
      certKey: certKey.value,
      certNo: certNo.value,
    });
    kamiDialogVisible.value = false;
    successDialogVisible.value = true;
    certKey.value = "";
    certNo.value = "";
  } catch (error: any) {
  } finally {
    verifying.value = false;
  }
};
</script>

<style scoped lang="scss">
/* ========== 变量 ========== */
$primary: #1664ff;
$primary-dark: #004dd0;
$primary-light: #b4c5ff;
$tertiary: #00dbe7;
$pink-start: #f472b6;
$pink-mid: #ec4899;
$purple-end: #a855f7;
$text-dark: #1c1b1c;
$text-secondary: #475569;
$text-muted: #94a3b8;
$bg-surface: #fcf8f9;
$border-color: #e5e2e3;

/* ========== 导航栏 ========== */
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 50;
  height: 80px;
  background: rgba(252, 248, 249, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba($border-color, 0.3);
  box-shadow: 0 0 30px rgba($primary, 0.05);
}

.navbar-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo {
  font-size: 24px;
  font-weight: 700;
  color: $text-dark;
  letter-spacing: -0.02em;
}

.navbar-links {
  display: flex;
  gap: 32px;
  a {
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: $text-secondary;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: $primary;
    }
  }
}

.navbar-cta {
  background: $primary;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba($primary, 0.3);
  transition: all 0.3s;
  &:hover {
    background: $primary-dark;
    box-shadow: 0 6px 16px rgba($primary, 0.4);
  }
  &:active {
    transform: scale(0.97);
  }
}

/* ========== Hero Section ========== */
.hero-section {
  position: relative;
  margin-top: 80px;
  min-height: 560px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("@/assets/images/claw/icon27.png");
  background-size: cover;
  background-position: center;
  border-radius: 2rem;
  margin: calc(80px + 16px) 16px 16px;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 80px 24px;
  max-width: 900px;
}

.hero-badge {
  display: inline-block;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(12px);
  color: #fff;
  padding: 8px 24px;
  border-radius: 999px;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-title {
  font-size: 72px;
  font-weight: 800;
  color: #fff;
  line-height: 1.1;
  letter-spacing: -0.04em;
  margin-bottom: 32px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-features {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.hero-feature-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  color: #fff;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
}

.feature-check {
  color: $tertiary;
  font-weight: bold;
}

.hero-feature-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: $border-color;
}

.hero-cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: $primary;
  color: #fff;
  border: none;
  padding: 18px 48px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 4px 20px rgba($primary, 0.4);
  .cta-icon {
    font-size: 20px;
  }
  &:hover {
    background: $primary-dark;
    box-shadow: 0 8px 30px rgba($primary, 0.5);
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.97);
  }
}

/* ========== Packages Section ========== */
$pkg-red: #e53935;
$pkg-red-dark: #c62828;
$pkg-gold: #f9a825;
$pkg-orange: #ef6c00;

.packages-section {
  padding: 80px 0 120px;
  background: #f8f9fb;
}

.section-header {
  text-align: center;
  margin-bottom: 48px;
}

.section-title {
  font-size: 32px;
  font-weight: 800;
  color: #1a1a2e;
  margin: 0 0 12px;
  letter-spacing: -0.02em;
}

.section-subtitle {
  font-size: 16px;
  color: #64748b;
  margin: 0;
}

.packages-inner {
  max-width: 1700px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
  align-items: start;
}

/* ---- Package Card ---- */
.pkg-card {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  &:hover {
    transform: translateY(-4px);
  }
}

.pkg-bg-img {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 24px;
}

.pkg-premium {
  border: 1px solid rgba(249, 168, 37, 0.25);
  box-shadow: 0 20px 60px rgba(74, 53, 0, 0.4);
  &:hover {
    box-shadow: 0 24px 72px rgba(74, 53, 0, 0.55);
  }
}

.pkg-basic {
  border: 1px solid rgba(229, 57, 53, 0.2);
  box-shadow: 0 8px 32px rgba(74, 16, 16, 0.3);
  &:hover {
    box-shadow: 0 12px 48px rgba(74, 16, 16, 0.45);
  }
}

/* ========== Footer ========== */
.page-footer {
  width: 100%;
  padding: 80px 0;
  background: $bg-surface;
  border-top: 1px solid rgba($border-color, 0.3);
}

.footer-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 16px;
}

.footer-brand {
  font-size: 20px;
  font-weight: 700;
  color: $text-dark;
}

.footer-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;
}

.footer-links {
  display: flex;
  gap: 24px;
  a {
    font-size: 14px;
    color: $text-muted;
    text-decoration: none;
    transition: color 0.3s;
    &:hover {
      color: $primary;
    }
  }
}

.footer-copy {
  font-size: 13px;
  color: $text-muted;
}

/* ========== 核销弹窗 ========== */
.kami-dialog {
  .dialog-header {
    text-align: center;
    padding: 8px 0 0;
  }
  .dialog-icon {
    font-size: 48px;
    margin-bottom: 12px;
  }
  .dialog-title {
    font-size: 22px;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 8px;
  }
  .dialog-subtitle {
    font-size: 14px;
    color: $text-secondary;
  }
}

.kami-form {
  padding: 8px 0 0;
  .form-group {
    margin-bottom: 24px;
  }
  .form-item {
    margin-bottom: 16px;
  }
  .form-label {
    display: block;
    font-size: 14px;
    font-weight: 600;
    color: $text-dark;
    margin-bottom: 8px;
  }
  .form-input {
    width: 100%;
    padding: 14px 16px;
    border: 2px solid #e2e8f0;
    border-radius: 12px;
    font-size: 15px;
    transition: border-color 0.2s;
    outline: none;
    &:focus {
      border-color: $primary;
      box-shadow: 0 0 0 3px rgba($primary, 0.1);
    }
    &::placeholder {
      color: $text-muted;
    }
  }
  .btn-kami-submit {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, $primary, #4f7eff);
    color: #fff;
    border: none;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    &:hover:not(:disabled) {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba($primary, 0.4);
    }
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
  .form-tip {
    text-align: center;
    font-size: 13px;
    color: $text-muted;
    margin-top: 16px;
  }
}

.loading-spinner {
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ========== 成功弹窗 ========== */
.success-dialog {
  .success-content {
    text-align: center;
    padding: 16px 0;
  }
  .success-icon {
    font-size: 64px;
    margin-bottom: 16px;
  }
  .success-title {
    font-size: 24px;
    font-weight: 800;
    color: $text-dark;
    margin-bottom: 24px;
  }
  .btn-success {
    background: linear-gradient(135deg, $primary, #4f7eff);
    color: #fff;
    border: none;
    padding: 14px 48px;
    border-radius: 12px;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba($primary, 0.4);
    }
  }
}

/* ========== 响应式 ========== */
@media (max-width: 1024px) {
  .hero-title {
    font-size: 48px;
  }
  .packages-inner {
    grid-template-columns: 1fr;
    max-width: 680px;
    gap: 24px;
  }
  .price-num { font-size: 36px; }
  .pkg-guarantees {
    grid-template-columns: repeat(2, 1fr);
  }
  .pkg-guarantees-basic {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .navbar-links {
    display: none;
  }
  .hero-section {
    margin: calc(80px + 8px) 8px 8px;
    border-radius: 1rem;
    min-height: 420px;
  }
  .hero-title {
    font-size: 36px;
  }
  .hero-features {
    flex-direction: column;
    gap: 8px;
  }
  .hero-feature-dot {
    display: none;
  }

  .section-title { font-size: 24px; }
  .section-subtitle { font-size: 14px; }
  .packages-section { padding: 48px 0 80px; }

  .pkg-card { padding: 24px 20px; border-radius: 18px; }
  .pkg-top {
    flex-direction: column;
    gap: 16px;
  }
  .pkg-price-area, .pkg-price-basic {
    align-self: flex-start;
    text-align: left;
  }
  .price-row { justify-content: flex-start; }
  .price-meta { justify-content: flex-start; }
  .pkg-name { font-size: 20px; }

  .feat-list li { font-size: 12px; }
  .guarantee-item { padding: 10px 6px; }

  .footer-inner {
    flex-direction: column;
    align-items: flex-start;
  }
  .footer-right {
    align-items: flex-start;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 28px;
  }
  .hero-badge {
    font-size: 12px;
    padding: 6px 16px;
  }
  .hero-cta {
    padding: 14px 32px;
    font-size: 16px;
  }
  .section-title { font-size: 22px; }
  .pkg-card { padding: 20px 16px; border-radius: 14px; }
  .pkg-name { font-size: 18px; }
  .price-num { font-size: 32px; }
  .pkg-guarantees {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
  .pkg-guarantees-basic {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
