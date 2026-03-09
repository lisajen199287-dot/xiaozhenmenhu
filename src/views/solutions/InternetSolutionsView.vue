<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from 'element-plus'

import * as newApi from "@/api/newApi/index";

const employees = [
  {
    role: "智能创意素材工厂",

    desc: "突破人工设计局限，根据平台调性自动批量产出静态海报、高光混剪短视频与可玩试玩广告，告别创意枯竭",

    skills: ["海量自动混剪", "千人千面海报", "动态素材迭代"],

    icon: "fas fa-photo-video",

    color: "#EC4899",
  },

  {
    role: "买量投放调优大师",

    desc: "无缝对接各路投放渠道数据反馈，AI 实时盯盘并自适应优化出价与素材搭配，榨干每一分流量红利",

    skills: ["7x24实时盯盘", "智能竞价算法", "低效资产自动关停"],

    icon: "fas fa-chart-area",

    color: "#8B5CF6",
  },

  {
    role: "流失预警与智能召回",

    desc: "深度学习用户行为与活跃轨迹，提前诊断流失风险并自动分发专属挽留礼包或关怀话术，大幅延长LTV",

    skills: ["高危预警模型", "自动化挽留策略", "生命周期全量切片"],

    icon: "fas fa-bell",

    color: "#3B82F6",
  },

  {
    role: "拟真 NPC 与交互伴侣",

    desc: "用大语言模型赋能原画或游NPC，提供有态度、有记忆、有情感的开放性闲聊交互，拔高产品粘性",

    skills: ["深层语义理解", "角色性格定制", "专属聊天记忆"],

    icon: "fas fa-robot",

    color: "#10B981",
  },
];

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
  <div class="ecommerce-page">
    <!-- Hero -->

    <header class="eco-hero">
      <div class="hero-bg"></div>

      <div class="wrapper hero-content">
        <span class="badge">Internet & Games Solution</span>

        <h1>互联网与游戏解决方案</h1>

        <p>基于前沿AI大模型，重构应用买量与玩家运营生命周期</p>

        <button class="btn-hero" @click="scrollToForm">免费定制方案</button>
      </div>
    </header>

    <!-- Problem & Solution -->

    <section class="section-intro wrapper">
      <div class="intro-grid">
        <div class="intro-text">
          <h2>获客成本高？用户流失快？</h2>

          <div class="pain-point-list">
            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>获客成本攀升：</strong
                >传统买量模式成本高昂，转化率连年走低，ROI难以打平</span
              >
            </div>

            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>素材消耗极快：</strong
                >游戏与应用推广需要海量创意素材，人工产出效率严重滞后算法分发</span
              >
            </div>

            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>用户留存难：</strong
                >缺乏对玩家与用户的精细化策略跟进，生命周期短暂，缺乏深度变现</span
              >
            </div>
          </div>
        </div>

        <div class="intro-highlight">
          <h3>AI 赋能 · 精准获客与留存</h3>

          <p>
            深度整合 AI
            创意素材大模型，毫秒级裂变无穷尽的吸睛推广物料，并结合高精度流失预测算法圈定高危用户，实现从拉新爆发到长效留存的全链路护航
          </p>
        </div>
      </div>
    </section>

    <!-- Digital Employee Roles -->

    <section class="section-roles">
      <div class="wrapper">
        <div class="section-title">
          <h2>全链AI 提效引擎</h2>

          <p>覆盖跨境与电商核心场景，从高品质物料大批 AI 量产到数字归因闭环</p>
        </div>

        <div class="roles-grid">
          <div v-for="emp in employees" :key="emp.role" class="role-card">
            <div
              class="role-icon"
              :style="{ background: emp.color + '15', color: emp.color }"
            >
              <i :class="emp.icon"></i>
            </div>

            <h3>{{ emp.role }}</h3>

            <p class="role-desc">{{ emp.desc }}</p>

            <div class="role-skills">
              <span v-for="skill in emp.skills" :key="skill" class="skill-tag">
                <i class="fas fa-check" :style="{ color: emp.color }"></i>
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Form -->

    <section id="consult-form" class="section-form">
      <div class="wrapper form-wrapper">
        <div class="form-content-left">
          <h2>
            与行业专家 <br /><span class="highlight-text">1V1</span> 深度对谈
          </h2>

          <p class="form-lead">
            我们深知每个跨境品牌的业务基因都不相同
            <br />不仅提供工具，更提供战略破局点
          </p>

          <div class="trust-features">
            <div class="trust-feat-item">
              <i class="fas fa-search-dollar"></i>

              <div>
                <h4>全面痛点诊断</h4>

                <p>从选品、流量到履约，深度剖析您的核心卡点</p>
              </div>
            </div>

            <div class="trust-feat-item">
              <i class="fas fa-drafting-compass"></i>

              <div>
                <h4>定制化系统方案</h4>

                <p>由资深架构师量身定制软硬件结合的 AI 构建计划</p>
              </div>
            </div>

            <div class="trust-feat-item">
              <i class="fas fa-user-lock"></i>

              <div>
                <h4>严格商业保密</h4>

                <p>签署数据隐私协议，确保所有企业信息与选品策略绝对安全</p>
              </div>
            </div>
          </div>
        </div>

        <div class="form-container-right">
          <div v-if="submitted" class="success-message">
            <i class="fas fa-check-circle"></i>

            <h3>提交成功</h3>

            <p>我们已收到您的诉求卷宗，<br />架构师将火速与您联系</p>

            <button class="btn-reset" @click="submitted = false">
              再次咨询
            </button>
          </div>

          <form v-else class="consult-form" @submit.prevent="handleSubmit">
            <div class="form-header-minimal">
              <h3>免费获取专属方案</h3>

              <p>请留下您的联系方式</p>
            </div>

            <div class="form-group">
              <label>企业/品牌名称</label>

              <input
                v-model="form.company"
                type="text"
                placeholder="输入企业主体或独立站名称"
              />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>您的姓名 <span class="required">*</span></label>

                <input
                  v-model="form.contact"
                  type="text"
                  placeholder="怎么称呼"
                  required
                />
              </div>

              <div class="form-group">
                <label>联系电话 <span class="required">*</span></label>

                <input
                  v-model="form.phone"
                  type="text"
                  placeholder="用于接收方案"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label>核心诉求描述</label>

              <textarea
                v-model="form.demand"
                rows="3"
                placeholder="例如：我们需要批量生TikTok 英语带货视频，目前人工成本极高等..."
              ></textarea>
            </div>

            <button type="submit" class="btn-submit" :disabled="submitting">
              {{ submitting ? "信息加密上传.." : "提交需求" }}
            </button>

            <p class="privacy-note">
              <i class="fas fa-lock"></i> 信息已采用端到端加密保护
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>



<style scoped>
.ecommerce-page {
  background: #f8fafc;
}

.eco-hero {
  position: relative;

  padding: 180px 0 120px; /* Matched AppCenterView height */

  background: linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)),
    url("@/assets/images/game2-bg.png");

  background-size: cover;

  background-position: center;

  color: white;

  text-align: center;

  overflow: hidden;
}

.hero-content {
  position: relative;

  z-index: 10;

  max-width: 800px;

  margin: 0 auto;
}

.badge {
  display: inline-block;

  padding: 6px 16px;

  background: rgba(255, 255, 255, 0.1);

  border: 1px solid rgba(255, 255, 255, 0.2);

  border-radius: 20px;

  font-size: 0.75rem;

  font-weight: 800;

  letter-spacing: 0.1em;

  text-transform: uppercase;

  margin-bottom: 24px;

  color: #a5b4fc;

  backdrop-filter: blur(4px);
}

.eco-hero h1 {
  font-size: 3.5rem;

  font-weight: 900;

  margin-bottom: 24px;

  letter-spacing: -0.02em;

  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.eco-hero p {
  font-size: 1.25rem;

  color: rgba(255, 255, 255, 0.95);

  margin-bottom: 40px;

  font-weight: 600;

  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.btn-hero {
  padding: 16px 48px;

  background: white;

  color: #0f172a;

  border: none;

  border-radius: 50px;

  font-size: 1.1rem;

  font-weight: 800;

  cursor: pointer;

  transition: all 0.2s;
}

.btn-hero:hover {
  transform: translateY(-2px);

  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Intro Section */

.section-intro {
  margin-top: -80px;

  position: relative;

  z-index: 20;

  margin-bottom: 80px;
}

.intro-grid {
  display: grid;

  grid-template-columns: 1.2fr 0.8fr;

  gap: 40px;
}

.intro-text,
.intro-highlight {
  background: white;

  border-radius: 20px;

  padding: 40px;

  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
}

.intro-text h2 {
  font-size: 1.8rem;

  color: #1e293b;

  margin-bottom: 32px;
}

.pain-point-list {
  display: flex;

  flex-direction: column;

  gap: 20px;
}

.pain-item {
  display: flex;

  gap: 16px;

  align-items: flex-start;
}

.pain-item i {
  color: #ef4444;

  font-size: 1.2rem;

  margin-top: 4px;
}

.pain-item span {
  color: #475569;

  line-height: 1.6;
}

.intro-highlight {
  background: #4f46e5;

  color: white;

  display: flex;

  flex-direction: column;

  justify-content: center;
}

.intro-highlight h3 {
  font-size: 2rem;

  margin-bottom: 20px;
}

.intro-highlight p {
  line-height: 1.8;

  color: rgba(255, 255, 255, 0.9);

  font-size: 1.1rem;
}

/* Roles Section */

.section-roles {
  padding: 80px 0;
}

.section-title {
  text-align: center;

  margin-bottom: 60px;
}

.section-title h2 {
  font-size: 2.5rem;

  color: #0f172a;

  margin-bottom: 16px;

  font-weight: 800;
}

.section-title p {
  color: #64748b;

  font-size: 1.2rem;
}

.roles-grid {
  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 32px;
}

.role-card {
  background: white;

  padding: 40px;

  border-radius: 24px;

  border: 1px solid #e2e8f0;

  transition: all 0.3s;
}

.role-card:hover {
  transform: translateY(-8px);

  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);

  border-color: #a5b4fc;
}

.role-icon {
  width: 64px;

  height: 64px;

  border-radius: 16px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 2rem;

  margin-bottom: 24px;
}

.role-card h3 {
  font-size: 1.5rem;

  margin-bottom: 12px;

  color: #1e293b;
}

.role-desc {
  color: #64748b;

  line-height: 1.6;

  margin-bottom: 24px;
}

.role-skills {
  display: flex;

  gap: 12px;

  flex-wrap: wrap;
}

.skill-tag {
  background: #f8fafc;

  padding: 6px 12px;

  border-radius: 8px;

  font-size: 0.85rem;

  font-weight: 600;

  color: #475569;
}

/* Form Section */

.section-form {
  padding: 80px 0 120px;
}

.form-wrapper {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 80px;

  align-items: center;
}

/* Form Left Content */

.form-content-left h2 {
  font-size: 2.8rem;

  color: #0f172a;

  line-height: 1.2;

  margin-bottom: 24px;

  font-weight: 800;
}

.highlight-text {
  color: #4f46e5;
}

.form-lead {
  font-size: 1.25rem;

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
  font-size: 1.8rem;

  color: #4f46e5;

  background: #eef2ff;

  padding: 16px;

  border-radius: 16px;
}

.trust-feat-item h4 {
  font-size: 1.2rem;

  color: #1e293b;

  margin-bottom: 8px;

  font-weight: 700;
}

.trust-feat-item p {
  color: #64748b;

  line-height: 1.6;
}

/* Form Right Container */

.form-container-right {
  background: white;

  border-radius: 24px;

  padding: 48px;

  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.08),
    0 4px 12px rgba(15, 23, 42, 0.04);
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

.consult-form {
  padding: 0; /* Resetting padding since container has it */
}

.success-message {
  text-align: center;

  padding: 60px 0;
}

.form-row {
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 24px;
}

.form-group {
  margin-bottom: 24px;
}

.form-group label {
  display: block;

  font-weight: 700;

  color: #334155;

  margin-bottom: 8px;
}

.required {
  color: #ef4444;
}

.form-group input,
.form-group textarea {
  width: 100%;

  padding: 12px;

  border: 1px solid #e2e8f0;

  border-radius: 8px;

  font-size: 1rem;

  outline: none;

  transition: all 0.2s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;

  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.btn-submit {
  width: 100%;

  padding: 18px;

  background: linear-gradient(135deg, #4f46e5, #3b82f6);

  color: white;

  border: none;

  border-radius: 12px;

  font-size: 1.15rem;

  font-weight: 800;

  cursor: pointer;

  transition: all 0.3s;

  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
}

.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);

  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
}

.privacy-note {
  text-align: center;

  margin-top: 16px;

  font-size: 0.85rem;

  color: #94a3b8;
}

.privacy-note i {
  color: #10b981;

  margin-right: 4px;
}

.btn-submit:disabled {
  opacity: 0.7;

  cursor: not-allowed;
}

.btn-reset {
  margin-top: 24px;

  background: transparent;

  border: 1px solid #4f46e5;

  color: #4f46e5;

  padding: 10px 24px;

  border-radius: 6px;

  cursor: pointer;

  font-weight: 700;
}

@media (max-width: 768px) {
  .intro-grid,
  .roles-grid,
  .form-row,
  .form-wrapper {
    grid-template-columns: 1fr;
  }

  .eco-hero h1 {
    font-size: 2.5rem;
  }
}
</style>