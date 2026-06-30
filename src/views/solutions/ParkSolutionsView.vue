<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from 'element-plus'

const form = ref({
  company: "",
  name: "",
  phone: "",
  message: "",
});

const submitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  if (!form.value.name || !form.value.phone)
    return ElMessage.warning("请填写姓名与手机号");

  submitting.value = true;
  try {
    const solutionName = "智慧园区一体化管理平台";
    await newApi.apiAdmSolutionRequests(
      JSON.stringify({ ...form.value, solutionName })
    );
    submitted.value = true;
    form.value = { company: "", name: "", phone: "", message: "" };
    ElMessage.success("提交成功，我们会尽快联系您");
  } catch (e) {
    ElMessage.error("提交失败，请重试");
  } finally {
    submitting.value = false;
  }
};

const scrollToContact = () => {
  const el = document.getElementById("contact");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// 轮播逻辑
const featureIndex = ref(0);
let featureTimer: number | null = null;

const setFeatureSlide = (index: number) => {
  featureIndex.value = index;
  restartAutoPlay();
};

const restartAutoPlay = () => {
  if (featureTimer) window.clearInterval(featureTimer);
  featureTimer = window.setInterval(() => {
    featureIndex.value = (featureIndex.value + 1) % 6;
  }, 4800);
};

onMounted(() => {
  restartAutoPlay();
});

onUnmounted(() => {
  if (featureTimer) window.clearInterval(featureTimer);
});
</script>

<template>
  <div class="park-page">
    <!-- 导航栏 -->
    <header class="nav-bar">
      <div class="wrapper nav-inner">
        <a class="brand" href="#top">
          <span class="brand-icon">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20V8l8-4 8 4v12" stroke="currentColor" stroke-width="2" stroke-linejoin="round" />
              <path d="M8 20v-7h8v7M8 9h.01M12 8h.01M16 9h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </span>
          <span class="brand-text">
            <span class="brand-main">智慧园区一体化管理平台</span>
          </span>
        </a>
        <nav class="nav-links">
          <a href="#advantages">平台核心优势</a>
          <a href="#features">核心功能</a>
          <a href="#benefits">平台优势</a>
          <a href="#contact">咨询对接</a>
        </nav>
      </div>
    </header>

    <!-- Hero -->
    <section class="hero" id="top">
      <div class="wrapper hero-content">
        <span class="badge">一站式数字化园区运营中台</span>
        <h1>智慧园区一体化管理平台</h1>
        <p class="hero-lead">一套系统覆盖招商、租赁、物业、物联、财务全流程，实现园区全生命周期数字化管理</p>
        <p class="hero-sub">打通内外业务数据，降本增效、数字化赋能园区经营</p>
        <button class="hero-btn" @click="scrollToContact">咨询对接</button>
      </div>
    </section>

    <!-- 平台核心优势 Intro -->
    <section class="intro wrapper" id="advantages">
      <div class="intro-title">
        <h2>平台核心优势</h2>
      </div>
    </section>

    <!-- 优势卡片 -->
    <section class="content-section">
      <div class="wrapper">
        <div class="card-grid">
          <article class="advantage-card featured" data-index="01">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 5h16v14H4zM8 5v14M16 5v14" stroke="currentColor" stroke-width="2" />
              </svg>
            </div>
            <h3>一体化整合</h3>
            <p>招商、租客、合同、财务、物业、智能硬件统一中台，无需多套系统来回登录</p>
          </article>

          <article class="advantage-card compact" data-index="02">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M7 7h10M7 12h10M7 17h6M4 4h16v16H4z" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div><h3>全流程线上化</h3><p>企业招商入驻、日常运维、缴费结算、合同归档完整业务闭环</p></div>
          </article>

          <article class="advantage-card compact" data-index="03">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M6 12a6 6 0 0 1 12 0M8.5 16a3.5 3.5 0 0 1 7 0M12 20h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div><h3>软硬协同联动</h3><p>智能水电、门禁、充电桩、安防设备统一接入，自动抄表计费</p></div>
          </article>

          <article class="advantage-card compact" data-index="04">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3l7 4v5c0 4-3 7-7 9-4-2-7-5-7-9V7zM9 12l2 2 4-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div><h3>权限灵活可控</h3><p>模块化工作台自定义，招商 / 财务 / 物业分级账号权限管理</p></div>
          </article>

          <article class="advantage-card compact" data-index="05">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M5 7h14M5 12h9M5 17h14M16 12l3 3 3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <div><h3>内外双向服务</h3><p>对内飞书协同办公，对外可配置租客小程序、公众号服务端口</p></div>
          </article>

          <article class="advantage-card compact" data-index="06">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div><h3>数据可视化决策</h3><p>全域经营数据自动汇总，可视化大屏直观掌握园区运营情况</p></div>
          </article>

          <article class="advantage-card wide" data-index="07">
            <div class="card-icon">
              <svg viewBox="0 0 24 24" fill="none">
                <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
              </svg>
            </div>
            <div><h3>本地化定制重构</h3><p>专为仓山园区迭代优化，贴合本地产业招商、企业服务场景</p></div>
          </article>
        </div>
      </div>
    </section>

    <!-- 核心功能轮播 -->
    <section class="content-section features" id="features">
      <div class="wrapper">
        <div class="section-title"><h2>核心功能，覆盖园区全部运营场景</h2></div>
        <div class="feature-carousel">
          <div class="feature-track" :style="{ transform: `translateX(-${featureIndex * 100}%)` }">
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">01</span>
                <h3>智慧招商管理</h3>
                <p>线索归集、意向客户跟进、渠道管理、招商数据统计，完整拓客流程线上留存，辅助招商转化</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=1200" alt="智慧招商管理" /></div>
            </article>
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">02</span>
                <h3>租控 & 财务一体化</h3>
                <p>租客一户一档、线上合同起草归档、租金能耗账单自动生成、收支流水一键导出对账，减少财务人工统计</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=1200" alt="租控与财务一体化" /></div>
            </article>
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">03</span>
                <h3>智慧物业运维</h3>
                <p>线上报修、访客预约、场地 / 停车 / 充电桩管理、设备巡检、保洁绿化核查，物业工单全程线上流转</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200" alt="智慧物业运维" /></div>
            </article>
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">04</span>
                <h3>智能物联硬件管控</h3>
                <p>统一接入智能水表、电表、人脸识别门禁、智能门锁、园区安防设备，硬件数据自动同步业务账单，实现无人值守计量</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200" alt="智能物联硬件管控" /></div>
            </article>
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">05</span>
                <h3>内部协同办公</h3>
                <p>外接飞书/钉钉/企业微信办公体系，内部办公协同一体化</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1200" alt="内部协同办公" /></div>
            </article>
            <article class="feature-slide">
              <div class="feature-copy">
                <span class="feature-index">06</span>
                <h3>园区数据驾驶舱</h3>
                <p>整合入驻率、营收、能耗、工单、招商进度多维度数据，可视化图表直观展示，为管理层经营决策提供数据支撑</p>
              </div>
              <div class="feature-media"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200" alt="园区数据驾驶舱" /></div>
            </article>
          </div>
          <div class="feature-controls">
            <button class="feature-tab" :class="{ active: featureIndex === 0 }" @click="setFeatureSlide(0)"><b>01</b><span>智慧招商管理</span></button>
            <button class="feature-tab" :class="{ active: featureIndex === 1 }" @click="setFeatureSlide(1)"><b>02</b><span>租控 & 财务一体化</span></button>
            <button class="feature-tab" :class="{ active: featureIndex === 2 }" @click="setFeatureSlide(2)"><b>03</b><span>智慧物业运维</span></button>
            <button class="feature-tab" :class="{ active: featureIndex === 3 }" @click="setFeatureSlide(3)"><b>04</b><span>智能物联硬件管控</span></button>
            <button class="feature-tab" :class="{ active: featureIndex === 4 }" @click="setFeatureSlide(4)"><b>05</b><span>内部协同办公</span></button>
            <button class="feature-tab" :class="{ active: featureIndex === 5 }" @click="setFeatureSlide(5)"><b>06</b><span>园区数据驾驶舱</span></button>
          </div>
        </div>
      </div>
    </section>

    <!-- 平台核心优势 -->
    <section class="content-section benefits" id="benefits">
      <div class="wrapper">
        <div class="section-title"><h2>平台核心优势</h2></div>
        <div class="benefit-grid">
          <article class="benefit-card"><h3>低学习成本</h3><p>功能分类清晰，自定义常用工作台，新手快速上手</p></article>
          <article class="benefit-card"><h3>高运营效率</h3><p>全业务线上流转，大幅减少纸质台账、线下沟通工作量</p></article>
          <article class="benefit-card"><h3>数据互通无孤岛</h3><p>各模块数据打通，硬件、业务、财务数据自动联动</p></article>
          <article class="benefit-card"><h3>轻量化可拓展</h3><p>模块化应用中心，后续新增业务无需整体重构系统</p></article>
        </div>
      </div>
    </section>

    <!-- 咨询对接 -->
    <section class="contact" id="contact">
      <div class="wrapper contact-layout">
        <div class="contact-copy">
          <h2>咨询对接</h2>
          <p>一套系统覆盖招商、租赁、物业、物联、财务全流程，实现园区全生命周期数字化管理</p>
          <div class="contact-points">
            <div class="contact-point">
              <span class="form-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M4 19V5M4 19h16M8 16v-5M12 16V8M16 16v-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </span>
              <div><h3>打通内外业务数据</h3><p>降本增效、数字化赋能园区经营</p></div>
            </div>
            <div class="contact-point">
              <span class="form-icon">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M6 12a6 6 0 0 1 12 0M8.5 16a3.5 3.5 0 0 1 7 0M12 20h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </span>
              <div><h3>软硬协同联动</h3><p>智能水电、门禁、充电桩、安防设备统一接入，自动抄表计费</p></div>
            </div>
          </div>
        </div>

        <div class="form-card">
          <h3>咨询对接</h3>
          <p>请留下您的联系方式</p>
          <form v-if="!submitted" class="park-form" @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="company">园区 / 企业</label>
              <input id="company" v-model="form.company" type="text" placeholder="请输入园区或企业名称" />
            </div>
            <div class="form-row">
              <div class="form-group">
                <label for="name">姓名</label>
                <input id="name" v-model="form.name" type="text" placeholder="请输入姓名" required />
              </div>
              <div class="form-group">
                <label for="phone">联系电话</label>
                <input id="phone" v-model="form.phone" type="text" placeholder="请输入联系电话" required />
              </div>
            </div>
            <div class="form-group">
              <label for="message">需求说明</label>
              <textarea id="message" v-model="form.message" placeholder="请输入需求说明"></textarea>
            </div>
            <button class="submit-btn" type="submit" :disabled="submitting">
              {{ submitting ? "提交中..." : "提交咨询" }}
            </button>
          </form>
          <div v-else class="success-message">
            <i class="fas fa-check-circle"></i>
            <h3>提交成功</h3>
            <p>我们已收到您的需求，<br />工作人员将尽快与您联系。</p>
            <button class="submit-btn" style="margin-top:20px" @click="submitted = false">再次咨询</button>
          </div>
        </div>
      </div>
    </section>

    <footer>智慧园区一体化管理平台</footer>
  </div>
</template>

<style scoped>
.park-page {
  background: #f8fafc;
  --primary: #4f46e5;
  --secondary: #3b82f6;
  --accent: #10b981;
  --text: #0f172a;
  --muted: #64748b;
  --soft: #f8fafc;
  --line: #e2e8f0;
  --white: #ffffff;
}

.wrapper {
  width: min(1200px, calc(100% - 80px));
  margin: 0 auto;
}

/* 导航栏 */
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 72px;
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid #f1f5f9;
  backdrop-filter: blur(20px);
}

.nav-inner {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.brand-icon {
  width: 40px;
  height: 40px;
  flex: 0 0 auto;
  display: grid;
  place-items: center;
  border-radius: 10px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 8px 18px rgba(59, 130, 246, 0.28);
}

.brand-icon svg {
  width: 22px;
  height: 22px;
  display: block;
}

.brand-text {
  display: flex;
  flex-direction: column;
}

.brand-main {
  font-size: 1.08rem;
  font-weight: 850;
  letter-spacing: 0;
  color: #0f172a;
  white-space: nowrap;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-links a {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  color: #475569;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-links a:hover {
  color: var(--secondary);
}

/* Hero */
.hero {
  position: relative;
  min-height: 720px;
  padding: 190px 0 150px;
  color: #fff;
  text-align: center;
  overflow: hidden;
  background:
    linear-gradient(rgba(15, 23, 42, 0.66), rgba(15, 23, 42, 0.7)),
    url("@/assets/images/park-bg.png") center / cover no-repeat;
}

.hero::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(79, 70, 229, 0.28), transparent 45%, rgba(59, 130, 246, 0.22)),
    radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.2), transparent 28%);
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  margin: 0 auto;
}

.badge {
  display: inline-block;
  padding: 6px 16px;
  margin-bottom: 24px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 20px;
  color: #c7d2fe;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(4px);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.hero h1 {
  margin: 0 0 24px;
  font-size: clamp(2.7rem, 6vw, 4.3rem);
  line-height: 1.12;
  font-weight: 900;
  letter-spacing: 0;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.hero-lead {
  max-width: 850px;
  margin: 0 auto 12px;
  color: rgba(255, 255, 255, 0.94);
  font-size: 1.28rem;
  font-weight: 700;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.48);
}

.hero-sub {
  max-width: 760px;
  margin: 0 auto 42px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 1.06rem;
  font-weight: 500;
}

.hero-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 54px;
  padding: 0 48px;
  border: 0;
  border-radius: 50px;
  color: #0f172a;
  background: #fff;
  font-size: 1.08rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.hero-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* Intro */
.intro {
  position: relative;
  z-index: 4;
  margin-top: 72px;
  margin-bottom: 46px;
}

.intro-title {
  max-width: 520px;
  margin: 0 auto;
  padding: 0;
  text-align: center;
}

.intro-title h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 850;
  letter-spacing: 0;
}

/* 内容区域 */
.content-section {
  padding: 88px 0;
}

.section-title {
  max-width: 900px;
  margin: 0 auto 58px;
  text-align: center;
}

.section-title h2 {
  margin: 0 0 16px;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 2.7rem);
  font-weight: 850;
  letter-spacing: 0;
}

.section-title p {
  margin: 0;
  color: #64748b;
  font-size: 1.12rem;
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: 1.12fr 0.88fr 0.88fr;
  grid-auto-rows: minmax(190px, auto);
  gap: 22px;
}

.advantage-card {
  position: relative;
  min-width: 0;
  border: 1px solid var(--line);
  border-radius: 24px;
  background: #fff;
  transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
  overflow: hidden;
  padding: 30px;
}

.advantage-card:hover {
  transform: translateY(-8px);
  border-color: #a5b4fc;
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
}

.advantage-card::after {
  content: attr(data-index);
  position: absolute;
  right: 15px;
  top: 22%;
  transform: translateY(-50%);
  color: #e0e7ff;
  font-size: 3.8rem;
  line-height: 1;
  font-weight: 900;
  letter-spacing: 0;
  z-index: 0;
}

.advantage-card > * {
  position: relative;
  z-index: 1;
}

.advantage-card.featured {
  grid-row: span 2;
  min-height: 402px;
  padding: 42px;
  color: #fff;
  border: 0;
  background:
    linear-gradient(135deg, rgba(79, 70, 229, 0.94), rgba(59, 130, 246, 0.9)),
    url("https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=900") center / cover no-repeat;
  box-shadow: 0 28px 70px rgba(79, 70, 229, 0.26);
}

.advantage-card.featured::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(15, 23, 42, 0.05), rgba(15, 23, 42, 0.36)),
    radial-gradient(circle at 18% 18%, rgba(255, 255, 255, 0.22), transparent 24%);
}

.advantage-card.featured::after {
  color: rgba(255, 255, 255, 0.16);
  right: 28px;
  top:20%;
  font-size: 5.4rem;
}

.advantage-card.featured .card-icon {
  color: #fff;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(6px);
}

.advantage-card.featured h3 {
  max-width: 330px;
  margin-top: 78px;
  color: #fff;
  font-size: 2.1rem;
  line-height: 1.22;
}

.advantage-card.featured p {
  max-width: 360px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 1.08rem;
}

.advantage-card.compact {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 18px;
  align-items: start;
}

.advantage-card.compact .card-icon {
  width: 54px;
  height: 54px;
  margin: 0;
  border-radius: 14px;
}

.advantage-card.compact h3 {
  padding-right: 54px;
}

.advantage-card.wide {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr);
  gap: 22px;
  align-items: center;
  min-height: 170px;
  padding: 30px;
  background:
    linear-gradient(135deg, #ffffff 0%, #f8fbff 58%, #eef2ff 100%);
}

.card-icon {
  width: 62px;
  height: 62px;
  margin-bottom: 24px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: var(--primary);
  background: #eef2ff;
}

.card-icon svg {
  width: 28px;
  height: 28px;
  display: block;
}

.advantage-card h3 {
  margin: 0 0 12px;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 800;
}

.advantage-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.7;
}

/* 功能轮播 */
.features {
  background: #fff;
}

.feature-carousel {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  background: #0f172a;
  box-shadow: 0 2px 12px rgba(15, 23, 42, 0.06);
}

.feature-track {
  display: flex;
  transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.feature-slide {
  flex: 0 0 100%;
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  min-height: 560px;
  background: #fff;
}

.feature-copy {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 58px;
  background:
    radial-gradient(circle at 0% 0%, rgba(79, 70, 229, 0.1), transparent 32%),
    #fff;
}

.feature-index {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  margin-bottom: 28px;
  border-radius: 12px;
  color: #fff;
  background: #0f172a;
  font-size: 0.95rem;
  font-weight: 900;
}

.feature-copy h3 {
  margin: 0 0 20px;
  color: #0f172a;
  font-size: clamp(2rem, 4vw, 2.8rem);
  line-height: 1.15;
  font-weight: 850;
}

.feature-copy p {
  max-width: 520px;
  margin: 0;
  color: #475569;
  font-size: 1.08rem;
  line-height: 1.9;
}

.feature-media {
  position: relative;
  min-height: 560px;
  overflow: hidden;
  background: #111827;
}

.feature-media img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  filter: saturate(0.95);
}

.feature-media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.04)),
    linear-gradient(0deg, rgba(79, 70, 229, 0.26), transparent 48%);
}

.feature-controls {
  display: flex;
  gap: 10px;
  padding: 20px 24px;
  background: linear-gradient(180deg, #f1f5f9 0%, #f8fafc 60%, #fff 100%);
  border-top: 1px solid #e2e8f0;
  border-radius: 0 0 20px 20px;
}

.feature-tab {
  flex: 1;
  min-height: 68px;
  padding: 14px 18px;
  border: 1px solid transparent;
  border-radius: 14px;
  color: #64748b;
  background: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  text-align: left;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(4px);
}

.feature-tab::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 14px;
  background: linear-gradient(135deg, rgba(79, 70, 229, 0.06), rgba(139, 92, 246, 0.03));
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.feature-tab:hover {
  color: #4338ca;
  background: rgba(255, 255, 255, 0.9);
  border-color: #e0e7ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.08);
}

.feature-tab:hover::after {
  opacity: 1;
}

.feature-tab b {
  display: block;
  margin-bottom: 4px;
  color: #a5b4fc;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  transition: color 0.3s ease;
}

.feature-tab span {
  display: block;
  font-weight: 600;
  line-height: 1.4;
  font-size: 0.9rem;
  color: #475569;
  transition: color 0.3s ease;
}

.feature-tab.active {
  color: #fff;
  background: linear-gradient(135deg, #4f46e5, #7c3aed);
  border-color: transparent;
  box-shadow:
    0 8px 24px rgba(79, 70, 229, 0.3),
    0 2px 6px rgba(79, 70, 229, 0.15);
  transform: translateY(-3px);
}

.feature-tab.active::after {
  opacity: 0;
}

.feature-tab.active b {
  color: rgba(255, 255, 255, 0.7);
}

.feature-tab.active span {
  color: #fff;
  font-weight: 700;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.feature-tab.active:hover {
  transform: translateY(-3px);
  box-shadow:
    0 10px 28px rgba(79, 70, 229, 0.35),
    0 4px 8px rgba(79, 70, 229, 0.18);
}

/* 优势卡片 */
.benefit-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 24px;
}

.benefit-card {
  min-height: 230px;
  padding: 34px;
  border-radius: 24px;
  border: 1px solid var(--line);
  border-top: 6px solid var(--primary);
  background: #fff;
  transition: transform 0.3s, box-shadow 0.3s;
}

.benefit-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);
}

.benefit-card:nth-child(2) {
  border-top-color: var(--secondary);
}

.benefit-card:nth-child(3) {
  border-top-color: var(--accent);
}

.benefit-card:nth-child(4) {
  border-top-color: #f59e0b;
}

.benefit-card h3 {
  margin: 0 0 12px;
  color: #1e293b;
  font-size: 1.35rem;
  font-weight: 800;
}

.benefit-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.7;
}

/* 联系表单 */
.contact {
  padding: 90px 0 120px;
}

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.contact-copy h2 {
  margin: 0 0 24px;
  color: #0f172a;
  font-size: clamp(2.2rem, 5vw, 3rem);
  line-height: 1.15;
}

.contact-copy p {
  margin: 0 0 46px;
  color: #475569;
  font-size: 1.18rem;
  line-height: 1.8;
}

.contact-points {
  display: grid;
  gap: 28px;
}

.contact-point {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 18px;
  align-items: start;
}

.form-icon {
  width: 58px;
  height: 58px;
  border-radius: 16px;
  display: grid;
  place-items: center;
  color: var(--primary);
  background: #eef2ff;
}

.form-icon svg {
  width: 24px;
  height: 24px;
  display: block;
}

.contact-point h3 {
  margin: 0 0 8px;
  font-size: 1.12rem;
  color: #1e293b;
}

.contact-point p {
  margin: 0;
  color: #64748b;
  font-size: 0.98rem;
}

.form-card {
  padding: 48px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.12), 0 4px 12px rgba(15, 23, 42, 0.06);
}

.form-card h3 {
  margin: 0 0 8px;
  font-size: 1.55rem;
  color: #0f172a;
}

.form-card > p {
  margin: 0 0 30px;
  color: #64748b;
}

.form-group {
  margin-bottom: 22px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #334155;
  font-weight: 700;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
  padding: 12px 13px;
  font-size: 1rem;
}

.form-group input,
.form-group select {
  height: 48px;
}

.form-group textarea {
  min-height: 108px;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.submit-btn {
  width: 100%;
  min-height: 56px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--secondary));
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.22);
  font-size: 1.08rem;
  font-weight: 800;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.toast {
  display: none;
  margin-top: 16px;
  padding: 12px 14px;
  border-radius: 8px;
  color: #047857;
  background: #ecfdf5;
  font-weight: 700;
}

.toast.show {
  display: block;
}

.success-message {
  text-align: center;
  padding: 60px 0;
}

.success-message i {
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 16px;
}

.success-message h3 {
  font-size: 1.6rem;
  color: #0f172a;
  margin-bottom: 12px;
}

.success-message p {
  color: #64748b;
  line-height: 1.7;
}

footer {
  padding: 24px 0;
  color: #94a3b8;
  background: #fff;
  border-top: 1px solid #f1f5f9;
  text-align: center;
  font-size: 0.88rem;
}

/* 移动端适配 */
@media (max-width: 1024px) {
  .wrapper {
    width: min(100% - 32px, 1200px);
  }

  .nav-links {
    display: none;
  }

  .contact-layout {
    grid-template-columns: 1fr;
  }

  .card-grid,
  .benefit-grid {
    grid-template-columns: 1fr 1fr;
  }

  .advantage-card.featured,
  .advantage-card.wide {
    grid-column: span 2;
    grid-row: auto;
    min-height: 260px;
  }

  .feature-slide {
    grid-template-columns: 1fr;
  }

  .feature-copy {
    padding: 42px;
  }

  .feature-media {
    height: 360px;
    min-height: auto;
  }

  .feature-controls {
    gap: 8px;
    padding: 16px 18px;
    border-radius: 0 0 18px 18px;
  }

  .feature-tab {
    min-height: 62px;
    padding: 12px 14px;
    border-radius: 12px;
  }

  .feature-tab b {
    font-size: 0.65rem;
    margin-bottom: 3px;
  }

  .feature-tab span {
    font-size: 0.84rem;
  }
}

@media (max-width: 768px) {
  .nav-bar {
    height: 68px;
  }

  .brand-main {
    max-width: 68vw;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hero {
    min-height: 560px;
    padding: 128px 0 110px;
  }

  .hero h1 {
    font-size: 2.2rem;
    line-height: 1.18;
  }

  .advantage-card,
  .benefit-card,
  .form-card {
    border-radius: 18px;
    padding: 24px;
  }

  .card-grid,
  .benefit-grid,
  .form-row,
  .advantage-card.featured,
  .advantage-card.wide {
    grid-column: auto;
  }

  .advantage-card.compact,
  .advantage-card.wide {
    grid-template-columns: 1fr;
  }

  .advantage-card.featured h3 {
    margin-top: 34px;
    font-size: 1.7rem;
  }

  .feature-copy {
    padding: 28px;
  }

  .feature-copy h3 {
    font-size: 1.7rem;
  }

  .feature-media {
    height: 260px;
  }

  .feature-controls {
    gap: 6px;
    padding: 12px;
    flex-wrap: wrap;
    justify-content: center;
    border-radius: 0 0 16px 16px;
  }

  .feature-tab {
    flex: 0 1 calc(33.333% - 4px);
    min-height: 58px;
    padding: 10px 8px;
    text-align: center;
    border-radius: 10px;
  }

  .feature-tab b {
    font-size: 0.6rem;
    margin-bottom: 2px;
  }

  .feature-tab span {
    font-size: 0.78rem;
    line-height: 1.3;
  }

  section.content-section,
  .contact {
    padding: 58px 0;
  }

  .section-title {
    margin-bottom: 32px;
  }

  .section-title h2,
  .intro-title h2 {
    font-size: 1.55rem;
  }

  .contact-layout {
    gap: 38px;
  }
}
</style>
