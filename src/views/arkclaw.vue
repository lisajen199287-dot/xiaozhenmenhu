<template>
  <main class="claw-page">
    <section class="claw-hero">
      <div class="wrapper hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">ENTERPRISE CLAW KX</span>
          <h1>企业龙虾 Claw KX</h1>
          <p class="hero-desc">
            面向园区租户的企业级 AI 自动化运行环境，提供龙虾系统沙盒隔离运行、数据安全脱敏、
            关键操作分级响应与全链路审计的一体化方案，让企业在安全可控的环境中使用智能体完成复杂任务。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="openPlatform">
              进入应用 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
          <div class="trust-list">
            <span><i class="fas fa-shield-halved"></i> 沙盒隔离</span>
            <span><i class="fas fa-user-lock"></i> 数据脱敏</span>
            <span><i class="fas fa-route"></i> 全链路审计</span>
          </div>
        </div>

        <div class="hero-panel">
          <div class="panel-top">
            <div>
              <span>Claw KX Secure Runtime</span>
              <strong>企业级智能体运行台</strong>
            </div>
            <i class="fas fa-robot"></i>
          </div>
          <div class="runtime-card">
            <div class="runtime-node active">
              <i class="fas fa-cube"></i>
              <span>租户沙盒</span>
            </div>
            <div class="runtime-flow"></div>
            <div class="runtime-node">
              <i class="fas fa-mask"></i>
              <span>敏感数据脱敏</span>
            </div>
            <div class="runtime-flow"></div>
            <div class="runtime-node">
              <i class="fas fa-clipboard-check"></i>
              <span>操作审计</span>
            </div>
          </div>
          <div class="metrics-grid">
            <div><strong>100%</strong><span>关键行为留痕</span></div>
            <div><strong>4级</strong><span>操作响应策略</span></div>
            <div><strong>7×24</strong><span>安全运行监控</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="wrapper section-block">
      <header class="section-heading">
        <span>CORE CAPABILITIES</span>
        <h2>面向企业使用的安全自动化能力</h2>
        <p>
          参考 ArkClaw 的企业级智能体运行思路，将任务执行、数据保护和治理审计统一到可管、可控、可追溯的工作流中。
        </p>
      </header>

      <div class="capability-grid">
        <article v-for="item in capabilities" :key="item.title" class="capability-card">
          <div class="cap-icon"><i :class="item.icon"></i></div>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="blue-section">
      <div class="wrapper scenario-layout">
        <div class="scenario-copy">
          <span class="eyebrow">ENTERPRISE SCENARIOS</span>
          <h2>让智能体进入真实企业流程，而不是停留在聊天窗口</h2>
          <p>
            Claw KX 更适合园区企业把重复性、高频、跨系统的工作交给智能体完成，
            同时通过权限边界和审计链路保障数据安全与业务可控。
          </p>
        </div>
        <div class="scenario-list">
          <article v-for="item in scenarios" :key="item.title">
            <i :class="item.icon"></i>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="wrapper section-block">
      <header class="section-heading">
        <span>SECURE WORKFLOW</span>
        <h2>从任务发起到结果交付全程可追溯</h2>
      </header>
      <div class="workflow">
        <div v-for="(item, index) in workflow" :key="item.title" class="workflow-step">
          <span class="step-index">0{{ index + 1 }}</span>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <section class="wrapper final-cta">
      <div>
        <span class="eyebrow">READY FOR ENTERPRISE</span>
        <h2>为园区企业构建安全可控的 AI 自动化工作台</h2>
        <p>统一智能体运行、敏感数据保护、权限响应和审计追踪，让企业放心把业务流程交给 AI 执行。</p>
      </div>
      <button class="primary-btn" @click="openPlatform">
        进入应用 <i class="fas fa-arrow-right"></i>
      </button>
    </section>
  </main>
</template>

<script setup lang="ts">
const capabilities = [
  {
    icon: "fas fa-box-archive",
    title: "沙盒隔离运行",
    desc: "为不同租户和任务创建独立运行边界，隔离账号、文件、环境变量与上下文数据，降低跨任务串扰风险。",
  },
  {
    icon: "fas fa-mask",
    title: "数据安全脱敏",
    desc: "对手机号、证件号、客户名称、合同金额等敏感字段进行识别、隐藏与授权使用，保障企业数据安全。",
  },
  {
    icon: "fas fa-triangle-exclamation",
    title: "关键操作分级响应",
    desc: "针对高风险操作设置确认、审批、阻断与人工复核策略，避免智能体越权执行关键业务动作。",
  },
  {
    icon: "fas fa-clipboard-list",
    title: "全链路审计追踪",
    desc: "记录任务输入、调用工具、访问数据、生成结果和人工确认动作，方便企业复盘、合规检查与责任追溯。",
  },
];

const scenarios = [
  {
    icon: "fas fa-file-contract",
    title: "合同与文档处理",
    desc: "自动整理合同要点、抽取风险条款、生成审查建议和归档记录。",
  },
  {
    icon: "fas fa-database",
    title: "经营数据处理",
    desc: "跨系统采集经营数据，完成清洗、汇总、报表生成和异常解释。",
  },
  {
    icon: "fas fa-headset",
    title: "客户与工单协同",
    desc: "辅助整理客户诉求、生成处理建议、分派任务并沉淀服务过程。",
  },
];

const workflow = [
  {
    title: "任务进入沙盒",
    desc: "根据企业身份、应用场景和权限策略创建独立运行环境。",
  },
  {
    title: "数据识别与脱敏",
    desc: "自动识别敏感字段，只向智能体开放必要、合规的最小数据集。",
  },
  {
    title: "分级执行与确认",
    desc: "普通任务自动执行，高风险动作触发确认、审批或人工复核。",
  },
  {
    title: "结果归档与审计",
    desc: "输出任务结果、操作记录和调用链路，形成可追溯的企业审计凭证。",
  },
];

const openPlatform = () => {
  window.open("https://billingsys.aics.cii-group.com:3008", "_blank");
};
</script>

<style scoped>
.claw-page {
  min-height: 100vh;
  padding-top: 72px;
  color: #102033;
  background:
    linear-gradient(rgba(26, 111, 238, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 111, 238, 0.055) 1px, transparent 1px),
    linear-gradient(180deg, #f7fbff 0%, #ffffff 38%, #f8fbff 100%);
  background-size: 42px 42px, 42px 42px, auto;
}

.wrapper {
  width: min(1200px, calc(100% - 48px));
  margin: 0 auto;
}

.claw-hero {
  padding: 92px 0 80px;
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.08fr) minmax(380px, 0.92fr);
  gap: 56px;
  align-items: center;
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 18px;
  color: #1265e8;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.hero-copy h1,
.section-heading h2,
.scenario-copy h2,
.final-cta h2 {
  margin: 0;
  color: #081528;
  font-weight: 900;
  letter-spacing: -0.04em;
}

.hero-copy h1 {
  font-size: clamp(48px, 6vw, 78px);
  line-height: 1.05;
}

.hero-desc {
  max-width: 690px;
  margin: 26px 0 32px;
  color: #53657c;
  font-size: 18px;
  line-height: 1.9;
}

.hero-actions,
.trust-list {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  align-items: center;
}

.primary-btn,
.ghost-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 48px;
  padding: 0 24px;
  border-radius: 12px;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}

.primary-btn {
  border: 0;
  color: #fff;
  background: linear-gradient(135deg, #1769f2, #08b7e8);
  box-shadow: 0 16px 34px rgba(23, 105, 242, 0.24);
}

.ghost-btn {
  color: #1769f2;
  border: 1px solid #bed7ff;
  background: rgba(255, 255, 255, 0.76);
}

.trust-list {
  margin-top: 28px;
}

.trust-list span {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  padding: 10px 14px;
  border: 1px solid #d8e8ff;
  border-radius: 999px;
  color: #225078;
  background: rgba(255, 255, 255, 0.72);
  font-weight: 750;
}

.trust-list i {
  color: #1769f2;
}

.hero-panel {
  padding: 30px;
  border: 1px solid rgba(27, 111, 238, 0.18);
  border-radius: 30px;
  background:
    radial-gradient(circle at 80% 12%, rgba(8, 183, 232, 0.18), transparent 34%),
    rgba(255, 255, 255, 0.88);
  box-shadow: 0 30px 70px rgba(25, 91, 177, 0.12);
}

.panel-top {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: center;
  margin-bottom: 26px;
}

.panel-top span {
  display: block;
  margin-bottom: 8px;
  color: #6c7f96;
  font-size: 13px;
  font-weight: 800;
}

.panel-top strong {
  color: #102033;
  font-size: 24px;
}

.panel-top i {
  display: grid;
  width: 56px;
  height: 56px;
  place-items: center;
  border-radius: 16px;
  color: #fff;
  background: linear-gradient(135deg, #1769f2, #08b7e8);
  font-size: 24px;
}

.runtime-card {
  padding: 22px;
  border-radius: 24px;
  background: linear-gradient(180deg, #f7fbff, #ffffff);
  border: 1px solid #d8e8ff;
}

.runtime-node {
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 14px 16px;
  border-radius: 16px;
  color: #2a4968;
  background: #f2f7ff;
  font-weight: 800;
}

.runtime-node.active {
  color: #fff;
  background: linear-gradient(135deg, #1769f2, #08b7e8);
}

.runtime-flow {
  width: 2px;
  height: 24px;
  margin-left: 26px;
  background: #bed7ff;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 18px;
}

.metrics-grid div {
  padding: 18px 12px;
  border-radius: 18px;
  text-align: center;
  background: #f2f7ff;
}

.metrics-grid strong {
  display: block;
  color: #081528;
  font-size: 28px;
}

.metrics-grid span {
  color: #6c7f96;
  font-size: 13px;
}

.section-block {
  padding: 86px 0;
}

.section-heading {
  max-width: 760px;
  margin: 0 auto 46px;
  text-align: center;
}

.section-heading h2,
.scenario-copy h2,
.final-cta h2 {
  font-size: clamp(32px, 4vw, 48px);
}

.section-heading p,
.scenario-copy p,
.final-cta p {
  color: #5b6f86;
  font-size: 17px;
  line-height: 1.8;
}

.capability-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.capability-card {
  min-height: 250px;
  padding: 28px;
  border: 1px solid #d9e7f8;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0 18px 45px rgba(15, 55, 105, 0.06);
}

.cap-icon {
  display: grid;
  width: 56px;
  height: 56px;
  margin-bottom: 22px;
  place-items: center;
  border-radius: 16px;
  color: #1769f2;
  background: #ecf5ff;
  font-size: 22px;
}

.capability-card h3,
.scenario-list h3,
.workflow-step h3 {
  margin: 0 0 12px;
  color: #102033;
  font-size: 21px;
}

.capability-card p,
.scenario-list p,
.workflow-step p {
  margin: 0;
  color: #5b6f86;
  line-height: 1.75;
}

.blue-section {
  padding: 88px 0;
  background: linear-gradient(135deg, #0e4fd8, #08aeea);
}

.scenario-layout {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 52px;
  align-items: center;
}

.scenario-copy .eyebrow,
.scenario-copy h2,
.scenario-copy p {
  color: #fff;
}

.scenario-list {
  display: grid;
  gap: 16px;
}

.scenario-list article {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 18px;
  padding: 22px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 38px rgba(2, 30, 78, 0.1);
}

.scenario-list i {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 14px;
  color: #1769f2;
  background: #ecf5ff;
}

.workflow {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.workflow-step {
  padding: 26px;
  border-radius: 22px;
  border: 1px solid #d9e7f8;
  background: linear-gradient(180deg, #fff, #f8fbff);
}

.step-index {
  display: inline-flex;
  margin-bottom: 20px;
  color: #1769f2;
  font-size: 13px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.final-cta {
  display: flex;
  justify-content: space-between;
  gap: 30px;
  align-items: center;
  margin-bottom: 88px;
  padding: 40px;
  border-radius: 28px;
  color: #fff;
  background:
    radial-gradient(circle at 86% 20%, rgba(255, 255, 255, 0.24), transparent 28%),
    linear-gradient(135deg, #082b78, #1769f2);
}

.final-cta .eyebrow,
.final-cta h2,
.final-cta p {
  color: #fff;
}

.final-cta .primary-btn {
  flex: 0 0 auto;
  background: #fff;
  color: #1769f2;
  box-shadow: none;
}

@media (max-width: 1024px) {
  .hero-grid,
  .scenario-layout {
    grid-template-columns: 1fr;
  }

  .capability-grid,
  .workflow {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .wrapper {
    width: min(100% - 28px, 1200px);
  }

  .claw-hero {
    padding: 58px 0;
  }

  .hero-grid {
    gap: 30px;
  }

  .hero-panel {
    padding: 20px;
  }

  .metrics-grid,
  .capability-grid,
  .workflow {
    grid-template-columns: 1fr;
  }

  .final-cta {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
