<script setup lang="ts">
import { ref, onMounted } from "vue";

onMounted(() => {
  document.title =
    "AI真身口播数字人 - 你的原生数字分身 - 福州市仓山区人工智能公共服务平台";

  // Suggestion: In a real production app, use @vueuse/head for meta tags
});

const formData = ref({
  name: "",

  phone: "",

  company: "",

  demand: "",
});

const submitting = ref(false);

const submitted = ref(false);

const submitForm = async () => {
  submitting.value = true;

  // Simulate API call

  await new Promise((resolve) => setTimeout(resolve, 1500));

  submitting.value = false;

  submitted.value = true;
};

const steps = [
  {
    id: 1,
    title: "素材采集",
    desc: "手机固定拍摄一段不说话的本人视频（底片入库）",
  },
  {
    id: 2,
    title: "文案改写",
    desc: "输入文字，或通过同行链接一键智能提取改写",
  },
  { id: 3, title: "选声克隆", desc: "选择您的专属克隆音色或海量商业版权配音" },
  {
    id: 4,
    title: "一键出镜",
    desc: "AI自动对齐口型、添加字幕与背景音乐，即刻导出成品",
  },
];

const advantages = [
  {
    title: "100%原生画面，告别“一眼假”",
    desc: "摒弃传统 3D 建模、2D 贴片技术。我们直接使用您的原生手机拍摄视频作为底片，AI仅精准驱动唇部肌肉。保留您真实的眨眼、挑眉与手势，自然度远超传统“皮影戏”数字人",
  },

  {
    title: "0门槛免训练，3分钟极速上镜",

    desc: "传统数字人需要进棚录制半小时以上并等待数天训练。使用我们的系统，只需上传一段您不说话的视频素材，即可随时调用，真正做到即开即用",
  },

  {
    title: "内置AI改写工作流，解决“没内容”痛点",

    desc: "不仅仅是视频合成工具。系统内置AI文案引擎，支持一键提取同行爆款视频文案并进行智能改写，从源头解决您“不知道拍什么”的难题",
  },

  {
    title: "不受状态限制，产能无限放大",

    desc: "不需要化妆，不用管今天嗓子好不好，更不用担心背错台词。只要后台输入文字，您的分身就能以完美的精神状态为您持续创造商业价值",
  },
];

const scenarios = [
  {
    title: "实体门店与本地生活",
    tags: ["餐饮老板", "美业机构", "健身房"],
    description:
      "通过数字人批量化制作探店、日常口播，低成本覆盖同城流量，让门店全天候在线获客",
    icon: "fas fa-store",
  },

  {
    title: "专业服务与高客单行业",

    tags: ["房产中介", "律师", "保险/财税"],

    description:
      "快速建立专业的“个人IP”信任感。每日行业资讯播报、硬核知识解答，大幅缩短成单转化周期",

    icon: "fas fa-briefcase",
  },

  {
    title: "实体工厂与B2B制造",

    tags: ["工厂老板", "外贸企业"],

    description:
      "以车间实景为背景，老板“上线”讲解产品工艺、操作指南与验厂视频，有效打消客户疑虑",

    icon: "fas fa-industry",
  },

  {
    title: "知识付费与内容创作",

    tags: ["培训讲师", "读书博主", "自媒体IP"],

    description:
      "自动化课程录制与长视频转短视频，只需输入文案即可多语种出镜，一人活成一支视频团队",

    icon: "fas fa-graduation-cap",
  },
];

import { config } from "@/config/axios/config";
import { ElNotification, ElMessage } from "element-plus";
const handleClick = async () => {
  if (!localStorage.getItem("token")) {
    ElMessage.warning("请先登录");
  } else {
    // 先检查 broadcastApplication 权限
    try {
      const authRes = await newApi.apiGetUserAuthors();
      const authData = authRes?.data || authRes;
      if (authData?.broadcastApplication === false) {
        ElNotification.error({
          message: "<span style='font-size:16px;font-weight:900;color:#000000'>您的账号暂未开通数字人应用，请联系客服开通后使用</span>",
          duration: 4700,
          dangerouslyUseHTMLString: true,
        });
        return;
      }
    } catch (error) {
      console.error("检查权限失败:", error);
    }

    // 权限检查通过，继续检查积分
    const res = await newApi.apiAgUserGet();
    if (res.point >= PointsNumber.value) {
      const url =
        config.trueLoginUrl +
        "?token=" +
        localStorage.getItem("token") +
        "&refreshToken=" +
        localStorage.getItem("refreshToken");
      window.open(url, "_blank");
    } else {
      ElMessage.warning("您的积分不足，无法体验");
    }
  }
};
import * as newApi from "@/api/newApi/index";
const PointsNumber = ref(0);
const GetDictType = async () => {
  let res = await newApi.getDictDataByType({
    type: "Points",
  });
  PointsNumber.value = Number(res[0].value);
};
onMounted(() => {
  GetDictType();
});
</script>



<template>
  <div class="dh-landing">
    <!-- Removed local NavBar/AppFooter: App.vue handles them correctly -->

    <!-- Hero Section -->

    <header class="hero" id="hero-section">
      <div class="hero-bg-video-wrapper">
        <video
          :src="'/static/videos/dh-demo.mp4'"
          autoplay
          muted
          loop
          playsinline
          aria-label="AI数字人演示视频"
          class="hero-video-full"
        ></video>
      </div>

      <div class="container hero-content">
        <div class="text-area">
          <div class="tag">AI 数字人解决方案</div>
          <h1>你的原生数字分身，替你自信出镜</h1>

          <p class="subtitle">
            避免镜头焦虑，由AI驱动专属真身，为您输出自然流畅的高质量口播视频
          </p>

          <div class="cta-group">
            <button class="primary-btn pulse-glow" @click="handleClick">
              立即体验
            </button>
            <button class="primary-btn pulse-glow">免费咨询方案</button>
          </div>
        </div>
      </div>
    </header>

    <!-- Scenarios Section -->

    <section class="section-padding bg-white">
      <div class="container">
        <div class="section-title">
          <h2>适配多行业营销场景</h2>
        </div>

        <div class="scenario-grid-premium">
          <div
            v-for="(scene, index) in scenarios"
            :key="index"
            class="premium-card"
          >
            <div class="card-content">
              <div class="icon-box">
                <i :class="scene.icon"></i>
              </div>

              <h3>{{ scene.title }}</h3>

              <div class="tag-group">
                <span v-for="tag in scene.tags" :key="tag" class="pill-tag">{{
                  tag
                }}</span>
              </div>

              <p class="solve-text">{{ scene.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Advantages Section -->

    <section class="advantages section-padding dark-bg">
      <div class="container">
        <div class="section-title white">
          <h2>为什么选择“真身口播数字人”？</h2>
        </div>

        <div class="adv-list">
          <div
            v-for="(adv, index) in advantages"
            :key="index"
            class="adv-item"
            :class="{ reverse: index % 2 !== 0 }"
          >
            <div class="adv-text">
              <h3>{{ adv.title }}</h3>

              <p>{{ adv.desc }}</p>
            </div>

            <div class="adv-visual">
              <img
                :src="`/images/digital-human/advantage-${index + 1}.png`"
                :alt="adv.title + ' - AI数字人原生画面生成'"
                class="adv-img"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->

    <section class="process section-padding">
      <div class="container">
        <div class="section-title">
          <h2>仅需 4 步，一个人就是一支短视频团队</h2>
        </div>

        <div class="steps-container">
          <div v-for="step in steps" :key="step.id" class="step-card">
            <div class="step-num">{{ step.id }}</div>

            <h4>{{ step.title }}</h4>

            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer Form Section (Premium Split Layout) -->

    <section class="section-form bg-light">
      <div class="container">
        <div class="form-wrapper">
          <div class="form-content-left">
            <h2>
              开始构建您<br /><span class="highlight-text"
                >数字分身私域体系</span
              >
            </h2>

            <p class="form-lead">
              不论是短视频获客、自动化直播还是企业知识库，真身数字人都能为您提供最真实、最高效的视觉交互方案
            </p>

            <div class="trust-features">
              <div class="trust-feat-item">
                <i class="fas fa-video"></i>

                <div>
                  <h4>4K 高清唇形合成</h4>

                  <p>
                    基于原生底片，AI
                    像素级对齐口型，确保每一个发音细节都自然真实
                  </p>
                </div>
              </div>

              <div class="trust-feat-item">
                <i class="fas fa-shield-alt"></i>

                <div>
                  <h4>肖像权版权保障</h4>

                  <p>
                    签署法律合规协议，素材库独立加密存储，全方位保障数字资产安全
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="form-container-right">
            <div v-if="submitted" class="success-message">
              <i class="fas fa-check-circle"></i>

              <h3>申请已收到！</h3>

              <p>
                我们的数字化专家将在 24 小时内与您联系，<br />并为您开通演示体验账号
              </p>

              <button class="btn-reset" @click="submitted = false">
                重新填写
              </button>
            </div>

            <form v-else class="consult-form" @submit.prevent="submitForm">
              <div class="form-header-minimal">
                <h3>免费获取体验账号</h3>

                <p>提交信息，开启您1:1 分身复刻之旅</p>
              </div>

              <div class="form-group">
                <label>企业名称 / 个人IP</label>

                <input
                  v-model="formData.company"
                  type="text"
                  placeholder="怎么称呼您的组织或品牌"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>您的称呼 <span class="required">*</span></label>

                  <input
                    v-model="formData.name"
                    type="text"
                    placeholder="输入姓名"
                    required
                  />
                </div>

                <div class="form-group">
                  <label>联系电话 <span class="required">*</span></label>

                  <input
                    v-model="formData.phone"
                    type="tel"
                    placeholder="用于接收测试账号"
                    required
                  />
                </div>
              </div>

              <div class="form-group">
                <label>您的主要用途（选填）</label>

                <textarea
                  v-model="formData.demand"
                  rows="3"
                  placeholder="例如：我们要制作短视频投流、或者做数字人直播等.."
                ></textarea>
              </div>

              <button type="submit" class="btn-submit" :disabled="submitting">
                {{ submitting ? "信息加密传输.." : "申请免费试用" }}
              </button>

              <p class="privacy-note">
                <i class="fas fa-lock"></i> 您的隐私信息受企业级安全策略保护
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.dh-landing {
  background: #ffffff;

  color: #1e293b;
}

.container {
  max-width: 1400px;

  margin: 0 auto;

  padding: 0 40px;
}

.container.narrow {
  max-width: 600px;
}

.section-padding {
  padding: 100px 0;
}

.gradient-text {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;
}

/* Hero */

.hero {
  height: 600px;

  background: #1e293b;

  position: relative;

  overflow: hidden;

  display: flex;

  align-items: center;
}

.hero::after {
  content: "";

  position: absolute;

  top: 50%;

  right: -10%;

  width: 40%;

  height: 100%;

  background: radial-gradient(
    circle,
    rgba(79, 70, 229, 0.1) 0%,
    transparent 70%
  );

  transform: translateY(-50%);

  z-index: 0;
}

.tag {
  display: inline-block;

  padding: 6px 16px;

  background: rgba(79, 70, 229, 0.1);

  color: #4f46e5;

  border-radius: 20px;

  font-weight: 600;

  font-size: 0.9rem;

  margin-bottom: 24px;
}

h1 {
  font-size: 2.5rem;

  font-weight: 850;

  line-height: 1.2;

  margin-bottom: 24px;

  white-space: nowrap;
}

.subtitle {
  font-size: 1.1rem;

  color: #64748b;

  margin-bottom: 40px;

  max-width: 600px;

  white-space: nowrap;
}

.cta-group {
  display: flex;

  gap: 16px;
}

.primary-btn {
  padding: 16px 40px;

  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);

  color: white;

  border: none;

  border-radius: 50px;

  font-weight: 800;

  font-size: 1.1rem;

  cursor: pointer;

  box-shadow: 0 10px 25px -3px rgba(79, 70, 229, 0.4);

  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
  }

  70% {
    box-shadow: 0 0 0 15px rgba(79, 70, 229, 0);
  }

  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
}

.primary-btn:hover {
  transform: translateY(-3px) scale(1.05);

  background: linear-gradient(135deg, #4338ca 0%, #2563eb 100%);

  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
}

.secondary-btn {
  padding: 16px 32px;

  background: #f8fafc;

  color: #1e293b;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  font-weight: 700;

  cursor: pointer;
}

.hero h1 {
  color: #ffffff;
}

.hero .subtitle {
  color: #94a3b8;
}

.hero-content {
  display: grid;

  grid-template-columns: 1fr 1fr;

  align-items: center;

  position: relative;

  z-index: 2;

  height: 100%;
}

.text-area {
  text-align: left;

  position: relative;

  z-index: 3;

  max-width: 600px;
}

.hero-bg-video-wrapper {
  position: absolute;

  top: 0;

  right: calc(50% - 920px); /* Centering video roughly under Console button */

  width: 800px;

  height: 600px;

  z-index: 0;
}

@media (max-width: 1600px) {
  .hero-bg-video-wrapper {
    right: -120px;
  }
}

@media (max-width: 1200px) {
  .hero-bg-video-wrapper {
    right: -200px;

    opacity: 0.6; /* Slight fade on small screens to prioritize text */
  }
}

.hero-video-full {
  width: 100%;

  height: 100%;

  object-fit: cover;

  display: block;

  background: #1e293b;

  /* Hardware acceleration for better clarity */

  transform: translateZ(0);

  -webkit-backface-visibility: hidden;

  backface-visibility: hidden;

  /* Ultimate Feathering using Mask */

  mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    ),
    linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);

  -webkit-mask-image: linear-gradient(
      to right,
      transparent,
      black 15%,
      black 85%,
      transparent
    ),
    linear-gradient(to bottom, transparent, black 5%, black 95%, transparent);

  mask-composite: intersect;

  -webkit-mask-composite: source-in;
}

.ai-status-tag {
  position: absolute;

  top: 20px;

  right: 20px;

  background: rgba(15, 23, 42, 0.6);

  backdrop-filter: blur(8px);

  color: #4f46e5;

  padding: 6px 14px;

  border-radius: 20px;

  font-size: 0.8rem;

  font-weight: 700;

  display: flex;

  align-items: center;

  gap: 8px;

  border: 1px solid rgba(79, 70, 229, 0.3);
}

.ai-status-tag .dot {
  width: 6px;

  height: 6px;

  background: #10b981;

  border-radius: 50%;

  box-shadow: 0 0 8px #10b981;

  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
}

/* Scenarios */

.section-title {
  text-align: center;

  margin-bottom: 40px;
}

.section-title h2 {
  font-size: 2.5rem;

  font-weight: 800;

  margin-bottom: 16px;
}

.section-title p {
  font-size: 1.25rem;

  color: #64748b;
}

.scenario-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 32px;
}

.scenario-card {
  background: #f8fafc;

  padding: 40px;

  border-radius: 20px;

  border: 1px solid #e2e8f0;

  transition: all 0.3s;
}

.scenario-card:hover {
  background: #ffffff;

  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);

  border-color: #4f46e5;
}

.icon {
  font-size: 3rem;

  margin-bottom: 24px;
}

.scenario-card h3 {
  font-size: 1.5rem;

  font-weight: 700;

  margin-bottom: 16px;
}

.target {
  font-weight: 600;

  color: #4f46e5;

  margin-bottom: 12px;
}

.solve {
  color: #64748b;

  line-height: 1.6;
}

/* Premium Scenarios - White Theme */

.bg-white {
  background: #ffffff;
}

.scenario-grid-premium {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;
}

.premium-card {
  background: #ffffff;

  border: 1px solid #f1f5f9;

  border-radius: 20px;

  padding: 32px 24px;

  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02),
    0 2px 4px -1px rgba(0, 0, 0, 0.01);

  display: flex;

  flex-direction: column;
}

.premium-card:hover {
  transform: translateY(-8px);

  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05),
    0 10px 10px -5px rgba(0, 0, 0, 0.02);

  border-color: #e2e8f0;
}

.icon-box {
  width: 54px;

  height: 54px;

  background: #f8fafc;

  border-radius: 14px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;

  color: #4f46e5;

  margin-bottom: 24px;

  transition: all 0.3s;
}

.premium-card:hover .icon-box {
  background: #4f46e5;

  color: #ffffff;

  transform: scale(1.1);
}

.premium-card h3 {
  font-size: 1.25rem;

  font-weight: 700;

  color: #1e293b;

  margin-bottom: 16px;
}

.tag-group {
  display: flex;

  flex-wrap: wrap;

  gap: 6px;

  margin-bottom: 20px;
}

.pill-tag {
  background: #f1f5f9;

  color: #64748b;

  padding: 4px 10px;

  border-radius: 6px;

  font-size: 0.75rem;

  font-weight: 600;
}

.solve-text {
  font-size: 0.95rem;

  line-height: 1.6;

  color: #64748b;

  margin-top: auto;
}

/* Advantages */

.dark-bg {
  background: #0f172a;

  color: white;
}

.section-title.white h2 {
  color: white;
}

.adv-list {
  display: flex;

  flex-direction: column;

  gap: 80px;
}

.adv-item {
  display: grid;

  grid-template-columns: 1fr 1.2fr;

  gap: 80px;

  align-items: center;
}

.adv-item.reverse {
  grid-template-columns: 1.2fr 1fr;
}

.adv-item.reverse .adv-text {
  order: 2;
}

.adv-text h3 {
  font-size: 2rem;

  font-weight: 800;

  margin-bottom: 24px;

  color: #4f46e5;
}

.adv-text p {
  font-size: 1.15rem;

  line-height: 1.7;

  color: #94a3b8;
}

.adv-img {
  width: 100%;

  aspect-ratio: 16/9;

  border-radius: 20px;

  object-fit: cover;

  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);

  border: 1px solid rgba(255, 255, 255, 0.1);

  transition: transform 0.4s;
}

.adv-item:hover .adv-img {
  transform: scale(1.02);
}

/* Steps */

.steps-container {
  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;
}

.step-card {
  text-align: center;

  padding: 32px;

  background: white;

  border: 1px solid #e2e8f0;

  border-radius: 16px;

  position: relative;
}

.step-num {
  width: 40px;

  height: 40px;

  background: #4f46e5;

  color: white;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-weight: 800;

  margin: 0 auto 24px;
}

.step-card h4 {
  font-size: 1.25rem;

  font-weight: 700;

  margin-bottom: 16px;
}

.step-card p {
  color: #64748b;

  font-size: 0.95rem;

  line-height: 1.6;
}

/* Lead Gen Form - Premium Update */

.bg-light {
  background: #f8fafc;
}

.section-form {
  padding: 100px 0 140px;
}

.form-wrapper {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 80px;

  align-items: center;
}

.form-content-left h2 {
  font-size: 2.8rem;

  color: #0f172a;

  line-height: 1.2;

  margin-bottom: 24px;

  font-weight: 850;
}

.highlight-text {
  color: #4f46e5;

  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);

  -webkit-background-clip: text;

  -webkit-text-fill-color: transparent;
}

.form-lead {
  font-size: 1.2rem;

  color: #475569;

  line-height: 1.7;

  margin-bottom: 48px;
}

.trust-features {
  display: flex;

  flex-direction: column;

  gap: 32px;
}

.trust-feat-item {
  display: flex;

  gap: 20px;

  align-items: flex-start;
}

.trust-feat-item i {
  font-size: 1.5rem;

  color: #4f46e5;

  background: #f0f3ff;

  padding: 16px;

  border-radius: 14px;
}

.trust-feat-item h4 {
  font-size: 1.15rem;

  color: #1e293b;

  margin-bottom: 8px;

  font-weight: 700;
}

.trust-feat-item p {
  color: #64748b;

  line-height: 1.6;
}

.form-container-right {
  background: white;

  border-radius: 24px;

  padding: 48px;

  box-shadow: 0 40px 100px rgba(15, 23, 42, 0.08);

  border: 1px solid #f1f5f9;
}

.form-header-minimal {
  margin-bottom: 32px;
}

.form-header-minimal h3 {
  font-size: 1.6rem;

  color: #0f172a;

  margin-bottom: 8px;

  font-weight: 800;
}

.form-header-minimal p {
  color: #64748b;
}

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;

  font-weight: 700;

  color: #334155;

  font-size: 0.9rem;

  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-group input,
.form-group textarea {
  width: 100%;

  padding: 12px 16px;

  border: 1px solid #e2e8f0;

  border-radius: 10px;

  font-size: 1rem;

  outline: none;

  transition: all 0.2s;

  background: #fdfdfd;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;

  box-shadow: 0 0 0 4px rgba(79, 70, 229, 0.1);

  background: white;
}

.btn-submit {
  width: 100%;

  padding: 16px;

  background: linear-gradient(135deg, #4f46e5, #3b82f6);

  color: white;

  border: none;

  border-radius: 12px;

  font-size: 1.1rem;

  font-weight: 800;

  cursor: pointer;

  transition: all 0.3s;

  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);

  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.privacy-note {
  text-align: center;

  margin-top: 20px;

  font-size: 0.85rem;

  color: #94a3b8;
}

.privacy-note i {
  color: #10b981;
  margin-right: 4px;
}

.success-message {
  text-align: center;

  padding: 40px 0;
}

.success-message i {
  font-size: 4rem;

  color: #10b981;

  margin-bottom: 24px;
}

.success-message h3 {
  font-size: 1.8rem;

  margin-bottom: 16px;

  color: #0f172a;
}

.success-message p {
  color: #64748b;

  line-height: 1.6;

  margin-bottom: 32px;
}

.btn-reset {
  background: white;

  border: 1px solid #e2e8f0;

  padding: 10px 24px;

  border-radius: 8px;

  font-weight: 700;

  cursor: pointer;
}

@media (max-width: 968px) {
  .form-wrapper {
    grid-template-columns: 1fr;

    gap: 60px;
  }
}

@media (max-width: 640px) {
  .form-row {
    grid-template-columns: 1fr;
  }
}
</style>