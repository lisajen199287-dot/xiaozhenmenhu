<script setup lang="ts">
import { ref, onMounted } from "vue";

import { RouterLink } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from 'element-plus'
const categories = [
  {
    id: "apparel",

    title: "服饰鞋包",

    icon: "👗",

    desc: "一键换模特、虚拟试衣、平铺转上身",

    image:
      "https://images.unsplash.com/photo-1539109139745-f61b1ca002fd?auto=format&fit=crop&q=80&w=600",
  },

  {
    id: "beauty",

    title: "个护美妆",

    icon: "💄",

    desc: "高级水波纹背景、质感光影、精修氛围感",

    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&q=80&w=600",
  },

  {
    id: "home",

    title: "家居电器",

    icon: "🛋",

    desc: "真实客厅场景融入、光影透视对齐、高级质感",

    image:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=600",
  },

  {
    id: "jewelry",

    title: "珠宝饰品",

    icon: "💍",

    desc: "极简微距背景、反光倒影生成、高亮质感提升",

    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb0ce33e?auto=format&fit=crop&q=80&w=600",
  },

  {
    id: "food",

    title: "食品生鲜",

    icon: "🍎",

    desc: "诱人色彩增强、清新场景搭配、食欲感拉满",

    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=600",
  },

  {
    id: "white-bg",

    title: "全品类白底图",

    icon: "📦",

    desc: "10秒极速抠图，生成符合各大电商平台规范的纯白底图",

    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?auto=format&fit=crop&q=80&w=600",
  },
];

const sliderValue = ref(50);

const props = defineProps({
  title: {
    type: String,
    default: "AI电商视觉实验- 您的全能AI电商摄影| CII AI",
  },

  description: {
    type: String,
    default:
      "CII AI电商视觉实验室为电商卖家提供一站式AI做图解决方案，包含AI模特换装、场景生成、抠图、超清放大等工具箱，10秒生成高转化商业海报 ",
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
    "AI电商, AI模特, 虚拟试衣, AI商品 电商外挂, 智能抠图, 商业摄影, CII AI"
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
            <a href="#features">AI模特换装</a>

            <a href="#features">照片级商品图</a>

            <a href="#toolbox">AI电商工具</a>

            <a href="#pricing">定价方案</a>
          </div>

          <div class="nav-actions">
            <RouterLink to="/login" class="btn-login">登录/注册</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->

    <section class="eco-hero">
      <div class="wrapper">
        <div class="hero-text">
          <h1 class="hero-title">
            您的全能 AI 电商摄影师 <br />

            <span class="gradient-text">做图 · 优化 · 提效，一站式搞定</span>
          </h1>

          <p class="hero-subtitle">
            专为电商卖家打造。无需高薪聘请模特与摄影团队，告别繁琐 PS 抠图
            <br />

            10 秒钟，将普通实拍图/白底图转化为高转化率的棚拍级商品主图
          </p>

          <div class="hero-cta">
            <button class="btn-primary-large" @click="scrollToForm">
              免费生成高转化商品图
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="comparison-slider">
            <div class="comparison-slider-inner">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800"
                alt="CII AI 生成的商业级运动鞋摄影大片"
                class="image-after"
              />

              <div
                class="before-container"
                :style="{ width: sliderValue + '%' }"
              >
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800&grayscale=1"
                  alt="普通手机拍摄的原始运动鞋照片"
                  class="image-before"
                />
              </div>

              <input
                type="range"
                min="0"
                max="100"
                v-model="sliderValue"
                class="slider-input"
              />

              <div class="slider-handle" :style="{ left: sliderValue + '%' }">
                <div class="handle-line"></div>

                <div class="handle-circle">
                  <i class="fas fa-arrows-alt-h"></i>
                </div>
              </div>
            </div>
          </div>

          <div class="visual-labels">
            <span class="label-before">手机实拍</span>

            <span class="label-after">AI 商业海报</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Industry Section -->

    <section class="eco-industries" id="industries">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title">覆盖全品类电商，一键直达您的爆款场景</h2>
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
            <span class="feature-tag">核心武器 01</span>

            <h2>AI 专属模特</h2>

            <p class="feature-desc">
              模特随心换，海量外籍/国模一键生成，彻底告别侵权风险
            </p>

            <ul class="feature-list">
              <li><i class="fas fa-check"></i> AI 换脸：自然对位，形神兼备</li>

              <li><i class="fas fa-check"></i> 换姿势：适配多种营销场景需求</li>

              <li><i class="fas fa-check"></i> 服装保真：纹理质感 100% 还原</li>
            </ul>
          </div>

          <div class="feature-visual">
            <div class="model-swap-demo">
              <img
                src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&q=80&w=600"
                alt="CII AI 虚拟模特换装演示"
              />

              <div class="swap-overlay">
                <div class="swap-marker" style="top: 20%; left: 50%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Feature 2 -->

        <div class="feature-block reverse">
          <div class="feature-info">
            <span class="feature-tag">核心武器 02</span>

            <h2>照片级场景生成</h2>

            <p class="feature-desc">随手拍变棚拍大片，百万级影棚场景自由定义</p>

            <div class="prompt-mock">
              <div class="prompt-header">AI 场景指令</div>

              <div class="prompt-content">
                "放在沙滩上，阳光透过树叶打下光斑，高级磨砂质感"
              </div>
            </div>
          </div>

          <div class="feature-visual">
            <div class="scene-grid">
              <img
                src="https://images.unsplash.com/photo-1595150983630-d39763740e53?auto=format&fit=crop&q=80&w=400"
                alt="AI生成的香水商业海报 - 沙滩场景"
              />

              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400"
                alt="AI生成的智能手表摄影大片 - 高级光影"
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
          <span class="header-label">FOR DESIGNERS</span>

          <h2 class="section-title text-white">电商提效工具</h2>

          <p class="section-desc">美工的超级外脑，繁琐工作交给 AI</p>
        </div>

        <div class="toolbox-grid">
          <div class="tool-card">
            <i class="fas fa-magic"></i>

            <h4>一键抠图</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-expand-alt"></i>

            <h4>画质超清放大</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-eraser"></i>

            <h4>AI 消除杂物</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-vector-square"></i>

            <h4>智能扩图/改尺寸</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-palette"></i>

            <h4>一键改色</h4>
          </div>

          <div class="tool-card">
            <i class="fas fa-pen-nib"></i>

            <h4>线稿转实景</h4>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing / Comparison Section -->

    <section class="eco-pricing" id="pricing">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title">为什么头部大卖都在用</h2>
        </div>

        <div class="comparison-table-wrapper">
          <table class="comparison-table">
            <thead>
              <tr>
                <th>对比维度</th>

                <th>传统商业拍摄</th>

                <th class="highlight-col">CII AI 出图</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>资金成本</td>

                <td>500 - 5000 / 张</td>

                <td class="highlight-row">低至 0.1 / 张</td>
              </tr>

              <tr>
                <td>时间周期</td>

                <td>3 - 7 天（需协调档期）</td>

                <td class="highlight-row">10 秒 / 张（即刻出图记忆）</td>
              </tr>

              <tr>
                <td>模特版权</td>

                <td>容易发生侵权纠纷</td>

                <td class="highlight-row">AI 生成 100% 安全商用</td>
              </tr>

              <tr>
                <td>场景局限</td>

                <td>受限于实地影棚和道具</td>

                <td class="highlight-row">无限场景，输入文字即刻生成</td>
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
            <div class="section-label">CONSULTATION</div>

            <h2>现在就解锁电商爆款的流量密码</h2>

            <p>提交您的需求，我们将为您提供专属的 AI 电商视觉解决方案</p>
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
                  placeholder="例如：我需要AI换模、海量场景图生成..."
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

    <!-- Footer -->

    <footer class="eco-footer">
      <div class="wrapper">
        <p>&copy; 2026 CII Group AI. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>



<style scoped>
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