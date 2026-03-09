<script setup lang="ts">
import { ref } from "vue";

import * as newApi from "@/api/newApi/index";
import { ElMessage } from 'element-plus'
const employees = [
  {
    role: "AI 商品图与短视频生成",

    desc: "无需昂贵影棚与真人模特，AI 可快速生成海量高级质感场景图及高质量带货短视频，彻底释放创意产能",

    skills: ["智能场景拓展", "数字人自动播", "视频一键生成"],

    icon: "fas fa-magic",

    color: "#EC4899",
  },

  {
    role: "全渠道投放素材定制",

    desc: "洞察不同社媒与电商平台的风格调性，自动批量裂变出完美适配视听、排版与语种的差异化营销物料",

    skills: ["跨平台自适应", "爆款文案生成", "多语言本地化"],

    icon: "fas fa-layer-group",

    color: "#8B5CF6",
  },

  {
    role: "客户数据与标签归因",

    desc: "全面回流并解析海量买家停留、点击与下单行为记录，构建高精度用户画像体系，赋能精细化二次触达",

    skills: ["行为偏好分析", "自动化受众分群", "全域标签挖掘"],

    icon: "fas fa-users-cog",

    color: "#3B82F6",
  },

  {
    role: "策略大脑与增长闭环",

    desc: "深度打通素材消耗与最终转化链路，实时追踪单项素材 ROI，反向指导素材生成引擎不断调优",

    skills: ["素材 ROI 监控", "实时投放调优", "算法驱动选品"],

    icon: "fas fa-brain",

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
        <span class="badge">Ecommerce Solution</span>

        <h1>电商/跨境解决方案</h1>

        <p>基于前沿AI大模型，重构内容生产与营销工作</p>

        <button class="btn-hero" @click="scrollToForm">免费定制方案</button>
      </div>
    </header>

    <!-- Problem & Solution -->

    <section class="section-intro wrapper">
      <div class="intro-grid">
        <div class="intro-text">
          <h2>内容生产与增长转化面临的瓶颈</h2>

          <div class="pain-point-list">
            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>内容生产成本高：</strong
                >模特商拍、场景打造、短视频拍摄与后期剪辑费用高昂，耗时长且流程繁杂</span
              >
            </div>

            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>投放素材供给不足</strong
                >多渠道、高频次的营销投放需要海量素材，人工产出速率难以跟上算法与市场的消耗</span
              >
            </div>

            <div class="pain-item">
              <i class="fas fa-times-circle"></i>

              <span
                ><strong>转化效率提升受阻</strong
                >流量成本逐年攀升，缺乏高质量和千人千面的营销物料导致难以有效打动目标客群，ROI
                见顶</span
              >
            </div>
          </div>
        </div>

        <div class="intro-highlight">
          <h3>AI 赋能 · 销售增长闭环</h3>

          <p>
            深度整合 AI
            视觉大模型能力，自动、批量且极其廉价地生成完美商业商品内容与爆款带货视频素材。并将这些原生营销素材与实际的精准渠道投放、买家行为数据深度串联，打通“产-销”体系，为您实现真正的利润增长飞轮
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
    url("@/assets/images/cloth-bg.png");

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