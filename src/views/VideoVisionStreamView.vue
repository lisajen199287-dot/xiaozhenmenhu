<script setup lang="ts">
const topologyImage = "/static/images/video-vision-topology.png";

const productImages = [
  {
    index: "01",
    title: "EdgeSight 边缘AI NVR",
    subtitle: "基于RK3888的轻量化智能视觉分析主机",
    image: "/static/images/edgesight-product-host-final.jpg"
  },
  {
    index: "02",
    title: "EdgeSight 边缘AI NVR",
    subtitle: "基于RK3888的轻量化智能视觉分析方案",
    image: "/static/images/edgesight-product-solution-final.jpg"
  }
];

const scenarioCards = [
  {
    index: "01",
    title: "园区视频流实时分析",
    desc: "统一接入园区摄像头、巡检设备与告警事件，支持边缘侧实时识别与云端统一研判。"
  },
  {
    index: "02",
    title: "安防巡检与灾害预警",
    desc: "结合人车识别、区域警戒、无人设备巡防和多模态推理，形成事件发现、派单、处置闭环。"
  },
  {
    index: "03",
    title: "企业选址与空间运营",
    desc: "通过三维数字孪生与园区本体论构建空间全貌，支撑企业选址推荐与迁出风险识别。"
  },
  {
    index: "04",
    title: "园企工单联动处置",
    desc: "将视频、物联与能耗分析结论转化为园企协同工单，派发给运营人员或企业租户处理。"
  }
];

const capabilityCards = [
  { title: "EdgeSensus 边缘全域智算", desc: "完成视频流接入、本地识别、事件存储和离线分析，降低云端带宽与响应延迟。" },
  { title: "SkySensus 云端全域智脑", desc: "汇聚边缘事件、物联数据与能耗数据，通过多模态大模型生成研判结论与调度策略。" },
  { title: "执行与协同闭环", desc: "联动无人机、无人车、园企协同平台，把巡防任务和处置工单沉淀为可追踪运营记录。" }
];
</script>

<template>
  <main class="vision-stream-page">
    <section class="vision-hero">
      <div class="vision-wrapper hero-layout">
        <div class="hero-copy">
          <span class="eyebrow">PRODUCT HARDWARE TOPOLOGY</span>
          <h1>视频视觉流式分析</h1>
          <p>
            以 <strong>EdgeSensus × SkySensus</strong> 全域智能拓扑为核心，
            边缘完成设备接入与本地分析，云端完成多模态推理，并将结果转化为巡防任务与园企工单。
          </p>
          <div class="hero-actions">
            <a class="primary-btn" href="#hardware-topology">
              查看产品结构 <i class="fas fa-arrow-right"></i>
            </a>
            <RouterLink class="ghost-btn" to="/intro">返回平台概况</RouterLink>
          </div>
        </div>

        <div class="hero-panel">
          <div class="panel-title">
            <span>FLOW ANALYSIS</span>
            <strong>感知采集 → 边缘识别 → 云端研判 → 协同处置</strong>
          </div>
          <div class="panel-grid">
            <div>
              <b>EdgeSight</b>
              <span>边缘 AI NVR</span>
            </div>
            <div>
              <b>SkyMind</b>
              <span>大模型推理基座</span>
            </div>
            <div>
              <b>园企协同</b>
              <span>工单派发闭环</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="vision-wrapper scenario-section">
      <header class="section-heading">
        <span>BUSINESS SCENARIOS</span>
        <h2>面向智慧园区的视觉流式分析能力</h2>
        <p>围绕园区安防、巡检、空间运营和园企协同，把视频流与业务处置流程连接起来。</p>
      </header>
      <div class="scenario-grid">
        <article v-for="item in scenarioCards" :key="item.title" class="scenario-card">
          <span>{{ item.index }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section id="hardware-topology" class="topology-section">
      <div class="topology-wrapper">
        <header class="section-heading">
          <span>PRODUCT HARDWARE TOPOLOGY</span>
          <h2>产品硬件层：EdgeSensus × SkySensus 全域智能拓扑</h2>
          <p>以下产品结构图按照提供的原图一比一嵌入展示，确保模块位置、层级关系和引导流向不变。</p>
        </header>
        <figure class="topology-frame">
          <div class="topology-image-wrap collapsed-topology">
            <img
              class="topology-source topology-source-top"
              :src="topologyImage"
              alt="产品硬件层：EdgeSensus × SkySensus 全域智能拓扑"
            />
            <img
              class="topology-source topology-source-bottom"
              :src="topologyImage"
              alt=""
              aria-hidden="true"
            />
            <div class="topology-patch camera-title">安防摄像头</div>
          </div>
        </figure>
      </div>
    </section>

    <section class="vision-wrapper product-showcase-section">
      <header class="section-heading">
        <span>EDGESIGHT PRODUCTS</span>
        <h2>EdgeSight 边缘智能视觉产品</h2>
        <p>完整保留产品原始样貌、参数信息与场景说明，展示边缘 AI NVR 的产品形态和视觉分析能力。</p>
      </header>
      <div class="product-showcase-grid">
        <article v-for="item in productImages" :key="item.image" class="product-showcase-card">
          <div class="product-card-heading">
            <span>{{ item.index }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.subtitle }}</p>
            </div>
          </div>
          <figure class="product-original-image">
            <img :src="item.image" :alt="`${item.title}产品介绍图`" />
          </figure>
        </article>
      </div>
    </section>

    <section class="vision-wrapper capability-section">
      <article v-for="item in capabilityCards" :key="item.title" class="capability-card">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
      </article>
    </section>
  </main>
</template>

<style scoped>
.vision-stream-page {
  min-height: 100vh;
  padding-top: 72px;
  color: #0f172a;
  background:
    linear-gradient(rgba(37, 99, 235, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.045) 1px, transparent 1px),
    #ffffff;
  background-size: 42px 42px;
}

.vision-wrapper,
.topology-wrapper {
  width: min(1280px, calc(100% - 48px));
  margin: 0 auto;
}

.vision-hero {
  padding: 92px 0 76px;
  background:
    radial-gradient(circle at 82% 10%, rgba(14, 165, 233, 0.24), transparent 32%),
    linear-gradient(135deg, rgba(239, 246, 255, 0.92), rgba(255, 255, 255, 0.96));
}

.hero-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.82fr);
  gap: 52px;
  align-items: center;
}

.eyebrow,
.section-heading span {
  color: #2563eb;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.16em;
}

.hero-copy h1 {
  margin: 16px 0 18px;
  font-size: 58px;
  line-height: 1.08;
  letter-spacing: -0.05em;
}

.hero-copy p {
  max-width: 760px;
  color: #475569;
  font-size: 18px;
  line-height: 1.9;
}

.hero-copy strong {
  color: #0f172a;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.primary-btn,
.ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 48px;
  padding: 0 22px;
  border-radius: 10px;
  font-weight: 900;
  text-decoration: none;
}

.primary-btn {
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #0ea5e9);
  box-shadow: 0 18px 38px rgba(37, 99, 235, 0.26);
}

.ghost-btn {
  color: #1d4ed8;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #bfdbfe;
}

.hero-panel {
  padding: 28px;
  border: 1px solid #bfdbfe;
  border-radius: 26px;
  background: rgba(255, 255, 255, 0.76);
  box-shadow: 0 28px 80px rgba(30, 64, 175, 0.13);
  backdrop-filter: blur(14px);
}

.panel-title {
  display: grid;
  gap: 8px;
  margin-bottom: 18px;
}

.panel-title span {
  color: #2563eb;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.14em;
}

.panel-title strong {
  font-size: 22px;
  line-height: 1.45;
}

.panel-grid {
  display: grid;
  gap: 12px;
}

.panel-grid div {
  padding: 18px;
  border: 1px solid #dbeafe;
  border-radius: 16px;
  background: #f8fbff;
}

.panel-grid b,
.panel-grid span {
  display: block;
}

.panel-grid b {
  margin-bottom: 6px;
  color: #1d4ed8;
}

.panel-grid span {
  color: #64748b;
}

.scenario-section,
.product-showcase-section,
.capability-section {
  padding: 86px 0;
}

.section-heading {
  max-width: 840px;
  margin: 0 auto 38px;
  text-align: center;
}

.section-heading h2 {
  margin: 10px 0 12px;
  font-size: 36px;
  letter-spacing: -0.03em;
}

.section-heading p {
  color: #64748b;
  line-height: 1.8;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.scenario-card,
.capability-card {
  padding: 24px;
  border: 1px solid #dbeafe;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 46px rgba(30, 64, 175, 0.08);
}

.scenario-card span {
  display: grid;
  width: 40px;
  height: 40px;
  margin-bottom: 16px;
  place-items: center;
  color: #2563eb;
  font-size: 13px;
  font-weight: 900;
  background: #eff6ff;
  border-radius: 50%;
}

.scenario-card h3,
.capability-card h3 {
  margin: 0 0 10px;
  font-size: 20px;
}

.scenario-card p,
.capability-card p {
  margin: 0;
  color: #64748b;
  line-height: 1.75;
}

.topology-section {
  padding: 82px 0;
  background: linear-gradient(180deg, rgba(239, 246, 255, 0.86), rgba(255, 255, 255, 0.96));
}

.topology-wrapper {
  width: min(1460px, calc(100% - 48px));
}

.topology-frame {
  margin: 0;
  padding: 20px;
  border: 1px solid #bfdbfe;
  border-radius: 28px;
  background: #f8fbff;
  box-shadow: 0 30px 90px rgba(30, 64, 175, 0.12);
}

.topology-image-wrap {
  position: relative;
  line-height: 0;
}

.collapsed-topology {
  aspect-ratio: 1280 / 660;
  overflow: hidden;
  border-radius: 14px;
}

.topology-frame img,
.topology-source {
  display: block;
  width: 100%;
  height: auto;
}

.topology-source {
  position: absolute;
  left: 0;
  top: 0;
  border-radius: 14px;
}

.topology-source-top {
  clip-path: inset(0 0 31.8% 0);
}

.topology-source-bottom {
  transform: translateY(-8.4%);
  clip-path: inset(76.3% 0 0 0);
}

.topology-patch {
  position: absolute;
  z-index: 2;
  box-sizing: border-box;
  pointer-events: none;
}

.camera-title {
  left: 5.52%;
  top: 25.05%;
  display: flex;
  width: 11.3%;
  height: 5.9%;
  align-items: center;
  padding-left: 0.42%;
  color: #0f223b;
  background: linear-gradient(180deg, #f8fbff 0%, #f4faff 100%);
  font-size: clamp(8px, 1.05vw, 18px);
  font-weight: 900;
  line-height: 1.15;
}

.product-showcase-section {
  padding-bottom: 34px;
}

.product-showcase-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  align-items: start;
}

.product-showcase-card {
  overflow: hidden;
  padding: 18px;
  border: 1px solid #bfdbfe;
  border-radius: 26px;
  background:
    radial-gradient(circle at 92% 0%, rgba(14, 165, 233, 0.14), transparent 28%),
    rgba(248, 251, 255, 0.94);
  box-shadow: 0 24px 70px rgba(30, 64, 175, 0.12);
}

.product-card-heading {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 4px 4px 18px;
}

.product-card-heading > span {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  border-radius: 13px;
  font-size: 13px;
  font-weight: 900;
}

.product-card-heading h3 {
  margin: 0 0 5px;
  font-size: 22px;
}

.product-card-heading p {
  margin: 0;
  color: #64748b;
  line-height: 1.55;
}

.product-original-image {
  margin: 0;
  overflow: hidden;
  border: 1px solid rgba(34, 211, 238, 0.28);
  border-radius: 18px;
  background: #03151c;
}

.product-original-image img {
  display: block;
  width: 100%;
  height: auto;
}

.capability-section {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 980px) {
  .hero-layout,
  .scenario-grid,
  .product-showcase-grid,
  .capability-section {
    grid-template-columns: 1fr;
  }

  .hero-copy h1 {
    font-size: 44px;
  }
}

@media (max-width: 640px) {
  .vision-wrapper,
  .topology-wrapper {
    width: min(100% - 28px, 1280px);
  }

  .vision-hero,
  .scenario-section,
  .topology-section,
  .capability-section {
    padding: 58px 0;
  }

  .hero-copy h1 {
    font-size: 36px;
  }

  .hero-copy p {
    font-size: 16px;
  }

  .section-heading h2 {
    font-size: 28px;
  }

  .topology-frame {
    padding: 10px;
    border-radius: 18px;
  }
}
</style>
