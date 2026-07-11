<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const enterPlatform = () => {
  router.push("/ecommerce-ask/login");
};

const capabilities = [
  {
    icon: "fa-comments-dollar",
    title: "自然语言问数",
    desc: "面向客户、线索、商机、商品、流量和转化等经营数据，支持用业务语言快速查询关键指标。"
  },
  {
    icon: "fa-chart-pie",
    title: "经营决策洞察",
    desc: "实时掌握客户跟进、商机转化和运营表现，帮助团队及时调整销售与增长策略。"
  },
  {
    icon: "fa-shield-halved",
    title: "安全合规应用",
    desc: "依托可信数据底座和授权链路，降低数据碎片化与安全保障不足带来的业务风险。"
  },
  {
    icon: "fa-people-arrows",
    title: "跨模块协同",
    desc: "联动数据治理智能体、可信数据接入连接器和直播电商数字员工，形成数据可用、安全可控、运营高效的闭环。"
  }
];

const scenarios = [
  "销售团队快速获取客户跟进进度和商机转化情况",
  "运营团队定位商品、流量、转化与复购中的增长机会",
  "管理人员从经验驱动升级为数据驱动的精细化管理",
  "直播电商业务沉淀标准化、智能化的数据应用方案"
];
</script>

<template>
  <main class="ask-landing-page">
    <section class="ask-hero">
      <div class="ask-wrapper hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">E-COMMERCE DATA ASKING SYSTEM</span>
          <h1>电商运营全链路问数系统</h1>
          <p>
            聚焦直播电商业务端数据查询与决策需求，打破客户、线索、商机和经营数据的信息壁垒，
            让团队用自然语言快速获取精准数据，推动运营管理从“经验驱动”向“数据驱动”升级。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="enterPlatform">
              进入平台 <i class="fas fa-arrow-right"></i>
            </button>
            <a class="ghost-btn" href="#capabilities">查看能力介绍</a>
          </div>
        </div>

        <div class="hero-visual">
          <img src="/static/images/solutions/webp/ecommerce.webp" alt="电商运营全链路问数系统" />
          <div class="metric-card main">
            <strong>96%</strong>
            <span>数据查询效率提升</span>
          </div>
          <div class="metric-card small">
            <i class="fas fa-check-circle"></i>
            经营指标实时洞察
          </div>
        </div>
      </div>
    </section>

    <section class="intro-section">
      <div class="ask-wrapper intro-card">
        <div>
          <span class="section-tag">SYSTEM VALUE</span>
          <h2>构建安全合规、智能高效的数据应用生态</h2>
        </div>
        <p>
          为解决直播电商行业数据应用碎片化、安全保障不足、运营效率偏低等痛点，
          平台整合全链路问数、数据治理智能体、可信数据接入连接器和直播电商数字员工等能力，
          为业务端提供全链路数据支撑，提升客户转化效率与销售管理精细化水平。
        </p>
      </div>
    </section>

    <section id="capabilities" class="capability-section ask-wrapper">
      <header class="section-heading">
        <span>CORE CAPABILITIES</span>
        <h2>核心能力</h2>
        <p>围绕业务查询、经营分析、可信接入和协同运营，形成完整问数服务能力。</p>
      </header>

      <div class="capability-grid">
        <article v-for="item in capabilities" :key="item.title" class="capability-card">
          <i class="fas" :class="item.icon"></i>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="scenario-section">
      <div class="ask-wrapper scenario-grid">
        <div class="scenario-copy">
          <span class="section-tag">BUSINESS SCENARIOS</span>
          <h2>面向直播电商经营全链路</h2>
          <p>
            系统帮助企业把分散的数据沉淀为可查询、可分析、可决策的经营资产，
            让业务团队以更低沟通成本获得更高质量的数据支持。
          </p>
          <button class="primary-btn" @click="enterPlatform">
            进入平台 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div class="scenario-list">
          <div v-for="(item, index) in scenarios" :key="item" class="scenario-item">
            <span>0{{ index + 1 }}</span>
            <strong>{{ item }}</strong>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.ask-landing-page{padding-top:72px;background:#fff;color:#0f172a}.ask-wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.ask-hero{position:relative;overflow:hidden;padding:104px 0;background:radial-gradient(circle at 78% 18%,rgba(59,130,246,.2),transparent 28%),linear-gradient(120deg,#eff6ff,#fff 48%,#dbeafe)}.ask-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.045) 1px,transparent 1px);background-size:42px 42px;pointer-events:none}.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,.86fr);gap:58px;align-items:center}.eyebrow,.section-tag,.section-heading span{color:#2563eb;font-size:13px;font-weight:900;letter-spacing:.15em}.hero-copy h1{font-size:56px;line-height:1.12;margin:16px 0 18px;letter-spacing:-.04em}.hero-copy p{max-width:720px;color:#475569;font-size:18px;line-height:1.9}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}.primary-btn,.ghost-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;padding:13px 22px;font-weight:900;text-decoration:none;cursor:pointer}.primary-btn{border:0;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;box-shadow:0 14px 32px rgba(37,99,235,.26)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-visual{position:relative}.hero-visual img{width:100%;height:390px;object-fit:cover;border-radius:26px;box-shadow:0 30px 80px rgba(30,64,175,.18)}.metric-card{position:absolute;border:1px solid rgba(191,219,254,.88);background:rgba(255,255,255,.92);backdrop-filter:blur(14px);box-shadow:0 18px 45px rgba(15,23,42,.14)}.metric-card.main{left:-24px;bottom:34px;width:168px;padding:20px;border-radius:18px}.metric-card.main strong{display:block;font-size:40px;color:#0f172a}.metric-card.main span{color:#64748b;font-size:13px;font-weight:800}.metric-card.small{right:20px;top:18px;display:flex;align-items:center;gap:9px;padding:11px 16px;border-radius:999px;color:#1d4ed8;font-weight:900}.metric-card.small i{color:#2563eb}.intro-section{padding:72px 0}.intro-card{display:grid;grid-template-columns:.88fr 1.12fr;gap:42px;padding:34px;border:1px solid #dbeafe;border-radius:24px;background:linear-gradient(135deg,#fff,#f8fbff);box-shadow:0 22px 60px rgba(30,64,175,.08)}.intro-card h2{font-size:34px;line-height:1.25;margin:12px 0 0}.intro-card p{margin:0;color:#475569;font-size:16px;line-height:1.9}.capability-section{padding:24px 0 92px}.section-heading{text-align:center;max-width:760px;margin:0 auto 42px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.8}.capability-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.capability-card{border:1px solid #e2e8f0;border-radius:18px;background:#fff;padding:26px;transition:.25s}.capability-card:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(30,64,175,.1)}.capability-card i{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:#eff6ff;color:#2563eb;font-size:20px}.capability-card h3{font-size:19px;margin:18px 0 10px}.capability-card p{color:#64748b;line-height:1.75}.scenario-section{padding:86px 0;background:#f8fafc}.scenario-grid{display:grid;grid-template-columns:.86fr 1.14fr;gap:40px;align-items:center}.scenario-copy h2{font-size:36px;margin:12px 0 14px}.scenario-copy p{color:#64748b;line-height:1.85;margin-bottom:28px}.scenario-list{display:grid;grid-template-columns:1fr 1fr;gap:16px}.scenario-item{display:flex;gap:14px;align-items:flex-start;padding:22px;border:1px solid #e2e8f0;border-radius:16px;background:#fff}.scenario-item span{display:grid;place-items:center;flex:0 0 38px;height:38px;border-radius:50%;background:#eff6ff;color:#2563eb;font-weight:900}.scenario-item strong{line-height:1.65;color:#334155}@media(max-width:960px){.hero-grid,.intro-card,.scenario-grid{grid-template-columns:1fr}.hero-grid{gap:34px}.capability-grid,.scenario-list{grid-template-columns:1fr 1fr}.hero-copy h1{font-size:44px}.metric-card.main{left:18px}}@media(max-width:600px){.ask-wrapper{width:min(100% - 28px,1200px)}.ask-hero{padding:64px 0}.hero-copy h1{font-size:36px}.hero-copy p{font-size:16px}.hero-visual img{height:250px}.metric-card.main{position:static;width:auto;margin-top:14px}.metric-card.small{right:12px;top:12px}.capability-grid,.scenario-list{grid-template-columns:1fr}.intro-card{padding:24px}.intro-card h2,.section-heading h2,.scenario-copy h2{font-size:28px}.capability-section{padding-bottom:64px}.scenario-section{padding:64px 0}}
</style>
