<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const enterPlatform = () => router.push("/data-governance/login");

const abilities = [
  { icon: "fa-tags", title: "数据标注", desc: "支持对商品、客户、线索、直播内容和业务事件进行标签化管理，沉淀统一数据资产口径。" },
  { icon: "fa-broom", title: "数据清洗", desc: "识别重复、缺失、异常和格式不一致数据，自动生成清洗建议，提升数据可用性。" },
  { icon: "fa-circle-check", title: "数据质量检测", desc: "围绕完整性、准确性、一致性、及时性建立质量规则，持续监测核心数据健康度。" },
  { icon: "fa-shield-halved", title: "安全合规治理", desc: "结合权限控制、访问审计和数据脱敏策略，保障业务数据在合规边界内被安全使用。" }
];

const workflow = [
  "多源数据接入",
  "智能识别与标注",
  "清洗校验与修复",
  "质量评分与预警",
  "可信数据服务输出"
];
</script>

<template>
  <main class="governance-page">
    <section class="governance-hero">
      <div class="governance-wrapper hero-layout">
        <div class="hero-copy">
          <span class="eyebrow">DATA GOVERNANCE AGENT</span>
          <h1>数据治理智能体</h1>
          <p>
            以“保障数据可信可用”为核心，面向企业数据治理、分析与决策场景，
            通过智能标注、自动清洗、质量检测和安全合规治理，让业务端使用的每一份数据都真实、完整、可追溯。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="enterPlatform">
              进入平台 <i class="fas fa-arrow-right"></i>
            </button>
            <a class="ghost-btn" href="#governance-abilities">查看智能体能力</a>
          </div>
        </div>

        <div class="hero-panel">
          <img src="/static/images/solutions/webp/manufacturing.webp" alt="数据治理智能体" />
          <div class="quality-score">
            <span>数据质量评分</span>
            <strong>94</strong>
            <small>质量检测通过率提升</small>
          </div>
          <div class="panel-tags">
            <span><i class="fas fa-check"></i> 标注完成</span>
            <span><i class="fas fa-check"></i> 清洗通过</span>
            <span><i class="fas fa-bell"></i> 异常预警</span>
          </div>
        </div>
      </div>
    </section>

    <section id="governance-abilities" class="ability-section governance-wrapper">
      <header class="section-heading">
        <span>AGENT CAPABILITIES</span>
        <h2>核心治理能力</h2>
        <p>围绕数据从接入、加工、校验到服务输出的全过程，构建可信可用的数据治理闭环。</p>
      </header>

      <div class="ability-grid">
        <article v-for="item in abilities" :key="item.title" class="ability-card">
          <i class="fas" :class="item.icon"></i>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="workflow-section">
      <div class="governance-wrapper">
        <header class="section-heading">
          <span>GOVERNANCE WORKFLOW</span>
          <h2>标准化治理流程</h2>
          <p>将杂乱数据转化为可分析、可复用、可审计的数据资产。</p>
        </header>

        <div class="workflow-line">
          <div v-for="(item, index) in workflow" :key="item" class="workflow-step">
            <span>0{{ index + 1 }}</span>
            <strong>{{ item }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="value-section governance-wrapper">
      <div class="value-card">
        <div>
          <span class="section-tag">BUSINESS VALUE</span>
          <h2>为业务决策提供可靠数据基础</h2>
          <p>
            数据治理智能体解决数据杂乱、质量参差、口径不一和安全顾虑等问题，
            帮助企业消除数据应用阻塞，让问数系统、数字员工和运营分析工具都能基于可信数据开展工作。
          </p>
        </div>
        <button class="primary-btn" @click="enterPlatform">
          登录授权进入 <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
.governance-page{padding-top:72px;background:#fff;color:#0f172a}.governance-wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.governance-hero{position:relative;overflow:hidden;padding:104px 0;background:radial-gradient(circle at 82% 18%,rgba(14,165,233,.2),transparent 30%),linear-gradient(120deg,#eff6ff,#fff 48%,#dbeafe)}.governance-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.045) 1px,transparent 1px);background-size:42px 42px}.hero-layout{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(430px,.9fr);gap:58px;align-items:center}.eyebrow,.section-heading span,.section-tag{color:#2563eb;font-size:13px;font-weight:900;letter-spacing:.15em}.hero-copy h1{font-size:56px;line-height:1.12;margin:16px 0 18px;letter-spacing:-.04em}.hero-copy p{max-width:720px;color:#475569;font-size:18px;line-height:1.9}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}.primary-btn,.ghost-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;padding:13px 22px;font-weight:900;text-decoration:none;cursor:pointer}.primary-btn{border:0;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;box-shadow:0 14px 32px rgba(37,99,235,.26)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-panel{position:relative;border-radius:28px;overflow:hidden;box-shadow:0 30px 80px rgba(30,64,175,.18)}.hero-panel img{display:block;width:100%;height:410px;object-fit:cover}.hero-panel:after{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,.05),rgba(15,23,42,.42));pointer-events:none}.quality-score{position:absolute;z-index:1;left:24px;bottom:26px;width:170px;padding:18px;border-radius:18px;background:rgba(15,23,42,.75);color:#fff;backdrop-filter:blur(12px)}.quality-score span,.quality-score small{display:block;color:#dbeafe;font-weight:800}.quality-score strong{display:block;font-size:46px;line-height:1.05}.panel-tags{position:absolute;z-index:1;right:20px;top:20px;display:grid;gap:10px}.panel-tags span{display:inline-flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.9);color:#1d4ed8;font-weight:900}.ability-section{padding:90px 0}.section-heading{text-align:center;max-width:760px;margin:0 auto 42px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.8}.ability-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.ability-card{border:1px solid #e2e8f0;border-radius:18px;background:#fff;padding:26px;transition:.25s}.ability-card:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(30,64,175,.1)}.ability-card i{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:#eff6ff;color:#2563eb;font-size:20px}.ability-card h3{font-size:19px;margin:18px 0 10px}.ability-card p{color:#64748b;line-height:1.75}.workflow-section{padding:86px 0;background:#f8fafc}.workflow-line{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.workflow-step{position:relative;padding:24px 18px;border:1px solid #dbeafe;border-radius:16px;background:#fff;text-align:center}.workflow-step span{display:grid;place-items:center;width:38px;height:38px;margin:0 auto 14px;border-radius:50%;background:#2563eb;color:#fff;font-weight:900}.workflow-step strong{color:#334155}.value-section{padding:84px 0}.value-card{display:flex;align-items:center;justify-content:space-between;gap:32px;padding:34px;border:1px solid #dbeafe;border-radius:24px;background:linear-gradient(135deg,#fff,#f8fbff);box-shadow:0 22px 60px rgba(30,64,175,.08)}.value-card h2{font-size:34px;margin:12px 0}.value-card p{max-width:760px;color:#64748b;line-height:1.85}@media(max-width:960px){.hero-layout{grid-template-columns:1fr}.ability-grid{grid-template-columns:1fr 1fr}.workflow-line{grid-template-columns:1fr 1fr}.value-card{align-items:flex-start;flex-direction:column}.hero-copy h1{font-size:44px}}@media(max-width:600px){.governance-wrapper{width:min(100% - 28px,1200px)}.governance-hero{padding:64px 0}.hero-copy h1{font-size:36px}.hero-copy p{font-size:16px}.hero-panel img{height:260px}.quality-score{position:static;width:auto;border-radius:0}.panel-tags{left:12px;right:12px;top:12px}.ability-grid,.workflow-line{grid-template-columns:1fr}.section-heading h2,.value-card h2{font-size:28px}.ability-section,.workflow-section,.value-section{padding:64px 0}}
</style>
