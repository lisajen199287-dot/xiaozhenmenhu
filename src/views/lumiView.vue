<script setup lang="ts">
import { ref, onMounted } from "vue";

import { RouterLink } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from "element-plus";
const categories = [
  {
    id: "short-video",
    title: "短视频创作",
    icon: "🎬",
    desc: "一键生成高质量短视频，轻松抓住流量密码",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "marketing",
    title: "营销广告",
    icon: "🎯",
    desc: "快速生成引人注目的产品展示和品牌宣传视频",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "entertainment",
    title: "娱乐动漫",
    icon: "🎮",
    desc: "丰富的二次元和创意风格，释放你的想象力",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "education",
    title: "教育科普",
    icon: "🎓",
    desc: "将复杂概念转化为生动直观的视频演示",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
  },
];

const sliderValue = ref(50);

const props = defineProps({
  title: {
    type: String,
    default: "炉米 Lumi - 字节跳动 AIGC 图像创作平台",
  },

  description: {
    type: String,
    default:
      "炉米 Lumi 是字节跳动推出的强大 AIGC 图像与视频创作平台。搭载全新 Seedance 2.0 模型，为您提供前所未有的 AI 视频生成体验。",
  },
});

onMounted(() => {
  document.title = props.title;

  // Set meta description

  let metaDesc = document.querySelector('meta[name="description"]');

  if (!metaDesc) {
    metaDesc = document.createElement("meta");

    metaDesc.setAttribute("name", "description");

    document.head.appendChild(metaDesc);
  }

  metaDesc.setAttribute("content", props.description);

  // Set meta keywords

  let metaKeywords = document.querySelector('meta[name="keywords"]');

  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");

    metaKeywords.setAttribute("name", "keywords");

    document.head.appendChild(metaKeywords);
  }

  metaKeywords.setAttribute(
    "content",
    "炉米, Lumi, 字节跳动, AIGC, 视频生成, Seedance 2.0, AI绘画, AI视频"
  );
});

const form = ref({
  company: "",
  contact: "",
  phone: "",
  demand: "",
});

const submitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  if (!form.value.contact || !form.value.phone)
    return alert("请填写联系人与手机号");

  submitting.value = true;
  try {
    const solutionName =
      document.querySelector("h1")?.innerText || "未知解决方案";
    newApi.apiAdmSolutionRequests(
      JSON.stringify({ ...form.value, solutionName })
    );
    submitted.value = true;
    form.value = { company: "", contact: "", phone: "", demand: "" };
    ElMessage.success("提交成功，我们会尽快联系您");
  } catch (e) {
    ElMessage.info("提交失败，请重试");
  } finally {
    submitting.value = false;
  }
};

const agreementContent = ref("");
const showAgreementModal = ref(false);
const goLumi = async () => {
  const res = await newApi.apiAgAgreementHasAgreed();
  if (res) {
    //已签协议
    const res1 = await newApi.apiGoLumi();
    window.open(res1.redirect_url, "_blank");
  } else {
    //获取协议接口
    const res1 = await newApi.apiAgAgreement();
    agreementContent.value = res1;
    //展示弹窗
    showAgreementModal.value = true;
  }
};

//同意协议
const agreeAgreement = async () => {
  try {
    const res = await newApi.apiAgAgreementSave({
      agreementContent: agreementContent.value,
    });
    const res1 = await newApi.apiGoLumi();
    window.open(res1.redirect_url, "_blank");
    showAgreementModal.value = false;
  } catch (e) {
    console.error("Error saving agreement:", e);
  }
};

//取消协议
const cancelAgreement = () => {
  showAgreementModal.value = false;
};
const scrollToForm = () => {
  const el = document.getElementById("consult-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};
</script>



<template>
  <div class="eco-landing">
    <!-- Navbar -->

    <nav class="eco-nav">
      <div class="wrapper">
        <div class="nav-content">
          <RouterLink to="/" class="eco-logo">
            <span class="logo-text">CII <span class="highlight">AI</span></span>
          </RouterLink>

          <div class="nav-links">
            <a href="#features">Seedance 2.0</a>
            <a href="#industries">创作场景</a>
            <a href="#toolbox">核心能力</a>
            <a href="#pricing">为什么选择 Lumi</a>
          </div>

          <div class="nav-actions">
            <RouterLink to="/login" class="btn-login">登录/注册</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->

    <section class="eco-hero">
      <div class="wrapper hero-layout">
        <div class="hero-text">
          <h1 class="hero-title">
            Lumi <br />
            <span class="gradient-text">AIGC 创作平台</span>
          </h1>

          <p class="hero-subtitle">
            全新推出 Seedance 2.0 视频生成模型。从文字到图像，从静态到动态，
            <br />
            突破想象边界，让创意无缝流转，为您带来影院级视觉震撼。
          </p>

          <div class="hero-cta">
            <button class="btn-primary-large" @click="goLumi()">
              立即体验 Lumi
            </button>
            <button
              class="btn-secondary-large"
              @click="scrollToForm"
              style="margin-left: 16px"
            >
              咨询解决方案
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="comparison-slider">
            <div
              class="comparison-slider-inner"
              style="
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <!-- 占位视频封面或实际视频 -->
              <img
                src="@/assets/images/swipe_4.png"
                alt="Seedance 2.0 视频生成演示"
                class="image-after"
                style="opacity: 0.8; object-fit: cover"
              />
            </div>
          </div>

          <div class="visual-labels">
            <span class="label-before">输入 Prompt</span>

            <span class="label-after">Seedance 2.0 视频</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Industry Section -->

    <section class="eco-industries" id="industries">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title">Seedance 2.0，重塑视频创作方式</h2>
        </div>

        <div class="industry-grid">
          <div v-for="cat in categories" :key="cat.id" class="industry-card">
            <div
              class="card-image"
              :style="{ backgroundImage: `url(${cat.image})` }"
            >
              <div class="card-overlay"></div>
            </div>

            <div class="card-content">
              <div class="card-icon">{{ cat.icon }}</div>

              <h3>{{ cat.title }}</h3>

              <p>{{ cat.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->

    <section class="eco-features" id="features">
      <div class="wrapper">
        <!-- Feature 1 -->

        <div class="feature-block">
          <div class="feature-info">
            <span class="feature-tag">核心能力 01</span>

            <h2>文字生视频 (Text-to-Video)</h2>

            <p class="feature-desc">
              只需输入一段文字描述，Seedance 2.0
              即可为您生成高质量、高连贯性的动态视频。
            </p>

            <ul class="feature-list">
              <li>
                <i class="fas fa-check"></i> 语义精准理解：完美还原您的创意构想
              </li>

              <li>
                <i class="fas fa-check"></i> 电影级画质：支持超高分辨率输出
              </li>

              <li>
                <i class="fas fa-check"></i>
                动态流畅：物理规律与运动轨迹自然逼真
              </li>
            </ul>
          </div>

          <div class="feature-visual">
            <div class="model-swap-demo">
              <img
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=600"
                alt="文字生视频演示"
              />

              <div class="swap-overlay">
                <div
                  class="prompt-typing"
                  style="
                    position: absolute;
                    bottom: 20px;
                    left: 20px;
                    background: rgba(0, 0, 0, 0.7);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 8px;
                  "
                >
                  "一只穿着宇航服的柯基在火星表面漫步..."
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2 -->

        <div class="feature-block reverse">
          <div class="feature-info">
            <span class="feature-tag">核心能力 02</span>

            <h2>图生视频 (Image-to-Video)</h2>

            <p class="feature-desc">
              让静态图片动起来。上传参考图，控制运动轨迹，赋予图像全新生命力。
            </p>

            <div class="prompt-mock">
              <div class="prompt-header">运动笔刷控制</div>

              <div class="prompt-content">
                精确指定图像中各元素的运动方向和速度，实现精细化动态控制。
              </div>
            </div>
          </div>

          <div class="feature-visual">
            <div class="scene-grid">
              <img
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400"
                alt="原图"
              />

              <img
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=400"
                alt="生成的动态视频"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbox Section -->

    <section class="eco-toolbox" id="toolbox">
      <div class="wrapper">
        <div class="section-header">
          <span class="header-label">FOR CREATORS</span>

          <h2 class="section-title text-white">更多 AIGC 创作工具</h2>

          <p class="section-desc">
            不止于视频，Lumi 提供全方位的智能图像处理能力
          </p>
        </div>

        <div class="toolbox-grid">
          <div class="tool-card">
            <i class="fas fa-video"></i>

            <h4>视频风格化</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-image"></i>

            <h4>文生图大模型</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-crop"></i>

            <h4>智能扩图/补全</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-magic"></i>

            <h4>一键智能消除</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-search-plus"></i>

            <h4>画质超清放大</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-users"></i>

            <h4>数字人生成</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing / Comparison Section -->

    <section class="eco-pricing" id="pricing">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title">为什么选择 Lumi Seedance 2.0</h2>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>对比维度</th>

                <th>传统视频制作</th>

                <th class="highlight-col">Lumi Seedance 2.0</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>制作周期</td>

                <td>数天至数周</td>

                <td class="highlight-row">几分钟内即刻生成</td>
              </tr>

              <tr>
                <td>制作成本</td>

                <td>高昂的拍摄和后期费用</td>

                <td class="highlight-row">极低的算力消耗成本</td>
              </tr>

              <tr>
                <td>创意门槛</td>

                <td>需要专业的拍摄和软件技能</td>

                <td class="highlight-row">自然语言输入，零门槛创作</td>
              </tr>

              <tr>
                <td>视觉表现</td>

                <td>受限于物理规律和拍摄条件</td>

                <td class="highlight-row">突破想象，生成影视级奇幻画面</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- Final CTA -->

    <section id="consult-form" class="consult-section-dark">
      <div class="wrapper">
        <div class="form-container">
          <div class="form-header">
            <div class="section-label">GET STARTED</div>

            <h2>现在就体验 Seedance 2.0 的魔法</h2>

            <p>提交您的需求，我们将为您提供专属的内测通道和解决方案</p>
          </div>

          <div v-if="!submitted" class="main-form">
            <div class="form-grid">
              <div class="input-group">
                <label>公司名称</label>

                <input
                  v-model="form.company"
                  type="text"
                  placeholder="请输入您的企业全称"
                />
              </div>

              <div class="input-group">
                <label>联系人姓名 *</label>

                <input
                  v-model="form.contact"
                  type="text"
                  placeholder="如何称呼您"
                />
              </div>

              <div class="input-group">
                <label>联系电话 *</label>

                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="方便我们为您回传方案"
                />
              </div>

              <div class="input-group full">
                <label>业务痛点/详细需求</label>

                <textarea
                  v-model="form.demand"
                  rows="4"
                  placeholder="例如：我需要AI生成营销短视频、数字人定制..."
                ></textarea>
              </div>
            </div>

            <button
              class="btn-submit"
              :disabled="submitting"
              @click="handleSubmit"
            >
              <span v-if="!submitting">立即预约免费演示与额度</span>

              <i v-else class="fas fa-spinner fa-spin"></i>
            </button>
          </div>

          <div v-else class="success-message">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>

            <h3>方案需求已成功提交</h3>

            <p>新用户注册即送 50 个免费生成点数！我们的专家将尽快与您联系。</p>

            <button class="btn-reset" @click="submitted = false">
              再次提交
            </button>
          </div>
        </div>
      </div>
    </section>
<div v-if="showAgreementModal" class="agreement-modal-overlay">
      <div class="agreement-modal">
        <div class="agreement-modal-header">
          <h3>用户协议</h3>
        </div>
        <div class="agreement-modal-content">
          <div v-html="agreementContent" class="agreement-text"></div>
        </div>
        <div class="agreement-modal-footer">
          <button class="btn-cancel" @click="cancelAgreement">取消</button>
          <button class="btn-agree" @click="agreeAgreement">同意</button>
        </div>
      </div>
    </div>
    <!-- Footer -->

    <footer class="eco-footer">
      <div class="wrapper">
        <p>&copy; 2026 CII Group AI & 字节跳动. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>



<style scoped>
/* 协议弹窗样式 */
.agreement-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.agreement-modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.agreement-modal-header {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
}

.agreement-modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.agreement-modal-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  max-height: 50vh;
}

.agreement-text {
  line-height: 1.6;
  color: #666;
}

.agreement-modal-footer {
  padding: 20px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-agree {
  padding: 8px 16px;
  border: 1px solid #1890ff;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-agree:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

.eco-landing {
  font-family: "Plus Jakarta Sans", -apple-system, sans-serif;

  background: #fff;

  color: #111;

  overflow-x: hidden;
}

.wrapper {
  max-width: 1200px;

  margin: 0 auto;

  padding: 0 24px;
}

/* Navbar */

.eco-nav {
  position: fixed;

  top: 0;

  left: 0;

  width: 100%;

  z-index: 100;

  background: rgba(255, 255, 255, 0.8);

  backdrop-filter: blur(12px);

  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-content {
  height: 80px;

  display: flex;

  align-items: center;

  justify-content: space-between;
}

.eco-logo {
  text-decoration: none;

  font-size: 1.5rem;

  font-weight: 800;

  color: #111;
}

.eco-logo .highlight {
  color: #4f46e5;
}

.nav-links {
  display: flex;

  gap: 32px;
}

.nav-links a {
  text-decoration: none;

  color: #4b5563;

  font-weight: 600;

  font-size: 0.95rem;

  transition: color 0.3s;
}

.nav-links a:hover {
  color: #4f46e5;
}

.btn-login {
  padding: 10px 24px;

  background: #111;

  color: #fff;

  border-radius: 8px;

  text-decoration: none;

  font-weight: 600;

  transition: opacity 0.3s;
}

/* Hero Section */

.eco-hero {
  padding: 160px 0 100px;

  background: radial-gradient(
    circle at top right,
    rgba(79, 70, 229, 0.05),
    transparent
  );
}

.hero-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-layout .hero-text {
  flex: 1;
  text-align: left;
  margin-bottom: 0;
}

.hero-layout .hero-subtitle {
  margin: 0 0 40px 0;
}

.hero-layout .hero-visual {
  flex: 1;
  max-width: 50%;
  margin: 0;
}

@media (max-width: 992px) {
  .hero-layout {
    flex-direction: column;
    text-align: center;
  }
  .hero-layout .hero-text {
    text-align: center;
    margin-bottom: 40px;
  }
  .hero-layout .hero-subtitle {
    margin: 0 auto 40px auto;
  }
  .hero-layout .hero-visual {
    max-width: 100%;
  }
}

.hero-text {
  text-align: center;

  margin-bottom: 60px;
}

.hero-title {
  font-size: 4rem;

  font-weight: 800;

  line-height: 1.1;

  letter-spacing: -0.04em;

  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);

  -webkit-background-clip: text;

  background-clip: text;

  -webkit-text-fill-color: transparent;
}

.hero-subtitle {
  font-size: 1.25rem;

  color: #4b5563;

  line-height: 1.6;

  max-width: 800px;

  margin: 0 auto 40px;
}

.btn-primary-large {
  padding: 18px 48px;

  background: #4f46e5;

  color: #fff;

  border: none;

  border-radius: 12px;

  font-size: 1.1rem;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  box-shadow: 0 10px 25px rgba(79, 70, 229, 0.25);

  display: inline-flex;

  align-items: center;

  gap: 12px;
}

.btn-primary-large:hover {
  transform: translateY(-2px) scale(1.02);

  box-shadow: 0 15px 35px rgba(79, 70, 229, 0.35);

  background: #4338ca;
}

.btn-secondary-large {
  padding: 18px 48px;
  background: #fff;
  color: #4f46e5;
  border: 2px solid #4f46e5;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: inline-flex;
  align-items: center;
  gap: 12px;
}

.btn-secondary-large:hover {
  background: #f3f4f6;
  transform: translateY(-2px) scale(1.02);
}

/* Hero Visual Slider */

.hero-visual {
  max-width: 900px;

  margin: 0 auto;
}

.comparison-slider:hover {
  transform: translateY(-5px);

  transition: transform 0.3s ease;
}

.comparison-slider-inner {
  position: relative;

  width: 100%;

  height: 500px;

  border-radius: 24px;

  overflow: hidden;

  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.1);

  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translateY(0px);
  }

  50% {
    transform: translateY(-10px);
  }

  100% {
    transform: translateY(0px);
  }
}

.comparison-slider img {
  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  object-fit: cover;
}

.before-container {
  position: absolute;

  top: 0;

  left: 0;

  height: 100%;

  overflow: hidden;

  border-right: 2px solid #fff;

  z-index: 1;
}

.slider-input {
  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  opacity: 0;

  z-index: 10;

  cursor: ew-resize;
}

.slider-handle {
  position: absolute;

  top: 0;

  height: 100%;

  pointer-events: none;

  z-index: 5;

  transform: translateX(-50%);
}

.handle-line {
  position: absolute;

  top: 0;

  left: 50%;

  width: 2px;

  height: 100%;

  background: #fff;
}

.handle-circle {
  position: absolute;

  top: 50%;

  left: 50%;

  transform: translate(-50%, -50%);

  width: 48px;

  height: 48px;

  background: #fff;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

  color: #4f46e5;
}

.visual-labels {
  display: flex;

  justify-content: space-between;

  margin-top: 16px;

  padding: 0 10px;
}

.label-before,
.label-after {
  font-weight: 700;

  font-size: 0.9rem;

  color: #9ca3af;

  text-transform: uppercase;

  letter-spacing: 0.1em;
}

/* Industry Section */

.eco-industries {
  padding: 100px 0;

  background: #f9fafb;
}

.section-header {
  text-align: center;

  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;

  font-weight: 800;

  letter-spacing: -0.02em;
}

.industry-grid {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  gap: 32px;
}

.industry-card {
  background: #fff;

  border-radius: 20px;

  overflow: hidden;

  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.03);

  transition: transform 0.3s;

  cursor: pointer;
}

.industry-card:hover {
  transform: translateY(-10px);
}

.card-image {
  height: 240px;

  background-size: cover;

  background-position: center;

  position: relative;
}

.card-overlay {
  position: absolute;

  bottom: 0;

  left: 0;

  width: 100%;

  height: 50%;

  background: linear-gradient(to top, rgba(0, 0, 0, 0.3), transparent);
}

.card-content {
  padding: 24px;
}

.card-icon {
  font-size: 2rem;

  margin-bottom: 12px;
}

.industry-card h3 {
  font-size: 1.25rem;

  font-weight: 800;

  margin-bottom: 8px;
}

.industry-card p {
  color: #6b7280;

  font-size: 0.95rem;

  line-height: 1.5;
}

/* Features Block */

.eco-features {
  padding: 100px 0;
}

.feature-block {
  display: flex;

  align-items: center;

  gap: 80px;

  margin-bottom: 120px;
}

.feature-block.reverse {
  flex-direction: row-reverse;
}

.feature-info {
  flex: 1;
}

.feature-tag {
  color: #4f46e5;

  font-weight: 800;

  font-size: 0.9rem;

  text-transform: uppercase;

  letter-spacing: 0.1em;

  margin-bottom: 12px;

  display: block;
}

.feature-info h2 {
  font-size: 2.8rem;

  font-weight: 800;

  margin-bottom: 24px;
}

.feature-desc {
  font-size: 1.25rem;

  color: #4b5563;

  margin-bottom: 32px;
}

.feature-list {
  list-style: none;

  padding: 0;
}

.feature-list li {
  display: flex;

  align-items: center;

  gap: 12px;

  margin-bottom: 16px;

  font-weight: 600;

  color: #111;
}

.feature-list i {
  color: #10b981;
}

.feature-visual {
  flex: 1.2;
}

.model-swap-demo {
  border-radius: 24px;

  overflow: hidden;

  position: relative;

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.model-swap-demo img {
  width: 100%;

  display: block;
}

.prompt-mock {
  background: #f3f4f6;

  padding: 24px;

  border-radius: 12px;

  border-left: 4px solid #4f46e5;
}

.prompt-header {
  font-size: 0.8rem;

  font-weight: 800;

  color: #9ca3af;

  margin-bottom: 8px;
}

.prompt-content {
  font-family: monospace;

  font-size: 1.1rem;

  color: #111;
}

/* Toolbox */

.eco-toolbox {
  padding: 100px 0;

  background: #000;

  color: #fff;
}

.text-white {
  color: #fff;
}

.toolbox-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 24px;
}

.tool-card {
  background: #111;

  padding: 40px;

  border-radius: 20px;

  text-align: center;

  border: 1px solid rgba(255, 255, 255, 0.05);

  transition: all 0.3s;
}

.tool-card:hover {
  background: #1a1a1a;

  border-color: #4f46e5;
}

.tool-card i {
  font-size: 2.5rem;

  margin-bottom: 20px;

  color: #4f46e5;
}

.tool-card h4 {
  font-size: 1.2rem;

  font-weight: 700;
}

/* Pricing Table */

.eco-pricing {
  padding: 100px 0;
}

.comparison-table-wrapper {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;

  border-collapse: separate;

  border-spacing: 0;

  margin-top: 40px;

  border-radius: 16px;

  overflow: hidden;

  border: 1px solid #e5e7eb;
}

.comparison-table th,
.comparison-table td {
  padding: 24px 32px;

  text-align: left;

  border-bottom: 1px solid #e5e7eb;
}

.comparison-table tr:last-child td {
  border-bottom: none;
}

.comparison-table th {
  font-size: 1.1rem;

  font-weight: 800;
}

.highlight-col {
  color: #4f46e5;

  background: rgba(79, 70, 229, 0.05);
}

.highlight-row {
  color: #4f46e5;

  font-weight: 700;

  background: rgba(79, 70, 229, 0.05);
}

/* Final CTA */

/* Consult Section & Form (Dark Theme) */
.consult-section-dark {
  padding: 120px 0;
  background: #111;
  color: white;
  position: relative;
}

.consult-section-dark .form-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  padding: 80px;
}

.consult-section-dark .form-header {
  text-align: center;
  margin-bottom: 60px;
}

.consult-section-dark .section-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4f46e5;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.consult-section-dark .form-header h2 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.consult-section-dark .form-header p {
  color: #94a3b8;
  font-size: 1.1rem;
}

.consult-section-dark .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.consult-section-dark .input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.consult-section-dark .input-group.full {
  grid-column: span 2;
}

.consult-section-dark .input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #cbd5e1;
}

.consult-section-dark .input-group input,
.consult-section-dark .input-group textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 18px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.consult-section-dark .input-group input:focus,
.consult-section-dark .input-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  background: rgba(255, 255, 255, 0.08);
}

.consult-section-dark .btn-submit {
  margin-top: 40px;
  width: 100%;
  padding: 22px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 40px rgba(79, 70, 229, 0.3);
}

.consult-section-dark .btn-submit:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 50px rgba(79, 70, 229, 0.4);
}

.consult-section-dark .success-message {
  text-align: center;
  padding: 40px 0;
}

.consult-section-dark .success-icon {
  font-size: 5rem;
  color: #10b981;
  margin-bottom: 24px;
}

.consult-section-dark .btn-reset {
  margin-top: 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
}

/* Footer */

.eco-footer {
  padding: 40px 0;

  text-align: center;

  border-top: 1px solid #e5e7eb;

  color: #9ca3af;

  font-size: 0.9rem;
}

/* Mobile Responsive */

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .feature-block {
    flex-direction: column;
    gap: 40px;
  }

  .feature-block.reverse {
    flex-direction: column;
  }

  .toolbox-grid {
    grid-template-columns: 1fr 1fr;
  }

  .nav-links {
    display: none;
  }
}
</style>