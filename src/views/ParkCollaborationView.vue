<script setup lang="ts">
import { ref } from "vue";

const showMiniProgramModal = ref(false);
const openConsole = () => {
  window.location.href = "https://townlet.aics.cii-group.com/admin_pc/login?redirect=/index";
};

const openApiManagement = () => {
  window.location.href = "/console.html#/api";
};

const openShowcase = () => {
  window.location.href = "/showcase/";
};

const openAgentApp = (url?: string) => {
  if (url) {
    window.location.href = url;
    return;
  }

  openConsole();
};

const capabilities = [
  {
    icon: "fa-headset",
    title: "企业诉求闭环",
    desc: "统一收集企业诉求，支持分类分派、进度跟踪、结果反馈和服务评价。",
  },
  {
    icon: "fa-handshake-angle",
    title: "园区服务协同",
    desc: "整合物业、政务、招商、人才、活动等园区服务，形成统一服务入口。",
  },
  {
    icon: "fa-file-lines",
    title: "政策精准触达",
    desc: "根据企业标签推送政策申报、扶持资金、培训活动和通知公告。",
  },
  {
    icon: "fa-network-wired",
    title: "资源对接撮合",
    desc: "沉淀企业需求与供给资源，帮助园区企业完成业务、技术和渠道对接。",
  },
];

const agentApps = [
  {
    icon: "fa-bolt",
    tag: "ENERGY AGENT",
    title: "能耗数字管理员",
    desc: "多维度能耗数据精准采集，结合趋势预测与用能模式识别，动态生成节能策略，并实现异常告警处置闭环。",
    highlights: ["能耗采集", "趋势预测", "节能策略", "异常闭环"],
  },
  {
    icon: "fa-video",
    tag: "SECURITY AGENT",
    title: "安防数字值班员",
    desc: "融合多源视频与物联系统，实现 AI 智能识别、事件分级预警、自动派单处置与分析报告生成。",
    highlights: ["视频识别", "分级预警", "自动派单", "报告生成"],
  },
  {
    icon: "fa-scale-balanced",
    tag: "POLICY AGENT",
    title: "政策数字分析师",
    desc: "依托互联网 + AI 技术，实现政策自动梳理、精准匹配与落地情况分析，辅助园区优化运营、招商策略和风险管控。",
    highlights: ["政策梳理", "精准匹配", "落地分析", "招商辅助"],
    url: "https://sd7g8p2f70099ijhlupg0.apigateway-cn-shanghai.volceapi.com/clawSpace/ci-yelnavhfk0ashiwjnoni/chat",
  },
];

const flows = ["扫码进入小程序", "提交企业诉求", "运营后台分派", "进度通知反馈", "服务评价归档"];
</script>

<template>
  <main class="park-page">
    <section class="park-hero">
      <div class="park-wrapper hero-layout">
        <div class="hero-copy">
          <span class="eyebrow">PARK ENTERPRISE COLLABORATION</span>
          <h1>园企协同平台</h1>
          <p>
            面向仓山区互联网小镇的园区运营与企业服务场景，提供企业诉求、园区服务、
            政策触达、资源对接和运营管理的一体化数字平台。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="openConsole">
              园企运营后台 <i class="fas fa-arrow-right"></i>
            </button>
            <button class="ghost-btn" @click="showMiniProgramModal = true">用户小程序二维码</button>
          </div>
        </div>

        <div class="hero-panel smart-campus-panel">
          <div class="panel-top">
            <span>智慧园区空间入口</span>
            <strong>三维孪生</strong>
          </div>
          <div class="smart-campus-visual">
            <div class="campus-map-card">
              <span class="map-node node-a"></span>
              <span class="map-node node-b"></span>
              <span class="map-node node-c"></span>
              <span class="map-route route-a"></span>
              <span class="map-route route-b"></span>
              <strong>3D</strong>
            </div>
            <div class="campus-status">
              <span><i class="fas fa-location-dot"></i> 企业选址推荐</span>
              <span><i class="fas fa-triangle-exclamation"></i> 迁出风险识别</span>
            </div>
          </div>
          <h2>园区三维数字孪生展示</h2>
          <p class="campus-desc">
            使用三维数字孪生 + 本体论构建园区地理与数字空间全貌，展示迁出企业风险点，
            同时支持企业选址智能推荐，实现安防、灾害预警与快速响应。
          </p>
          <div class="campus-tags">
            <span>空间全貌</span>
            <span>企业迁出风险</span>
            <span>智能选址</span>
            <span>安防预警</span>
          </div>
          <button class="primary-btn campus-entry-btn" @click="openShowcase">
            进入智慧园区 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>

    <section class="token-hub-section park-wrapper">
      <article class="token-hub-card">
        <div class="token-hub-icon">
          <i class="fas fa-coins"></i>
        </div>
        <div class="token-hub-copy">
          <span class="section-tag">TOKEN OPERATION CENTER</span>
          <h2>园企词元中枢</h2>
          <p>租户算力 Token 汇聚与补助协同运营平台，面向园区企业统一管理接口调用、算力资源、补助核销与用量统计。</p>
          <div class="token-hub-tags">
            <span>Token 汇聚</span>
            <span>补助协同</span>
            <span>用量统计</span>
            <span>API 管理</span>
          </div>
        </div>
        <button class="primary-btn" @click="openApiManagement">
          立即进入 <i class="fas fa-arrow-right"></i>
        </button>
      </article>
    </section>

    <section class="entry-section agent-entry-section park-wrapper">
      <article v-for="item in agentApps" :key="item.title" class="agent-app-card">
        <div class="agent-icon"><i class="fas" :class="item.icon"></i></div>
        <span class="section-tag">{{ item.tag }}</span>
        <h2>{{ item.title }}</h2>
        <p>{{ item.desc }}</p>
        <div class="agent-tags">
          <span v-for="tag in item.highlights" :key="tag">{{ tag }}</span>
        </div>
        <button class="primary-btn" @click="openAgentApp(item.url)">
          进入应用 <i class="fas fa-arrow-right"></i>
        </button>
      </article>
    </section>

    <section class="intro-section">
      <div class="park-wrapper">
        <header class="section-heading">
          <span>PLATFORM INTRODUCTION</span>
          <h2>平台能力介绍</h2>
          <p>以企业需求为中心，把园区运营、企业服务和政策资源串成一条清晰的服务链路。</p>
        </header>
        <div class="capability-grid">
          <article v-for="item in capabilities" :key="item.title" class="capability-card">
            <i class="fas" :class="item.icon"></i>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="flow-section park-wrapper">
      <header class="section-heading">
        <span>SERVICE FLOW</span>
        <h2>企业使用流程</h2>
      </header>
      <div class="flow-line">
        <div v-for="(item, index) in flows" :key="item" class="flow-step">
          <span>{{ index + 1 }}</span>
          <strong>{{ item }}</strong>
        </div>
      </div>
    </section>

    <Teleport to="body">
      <div v-if="showMiniProgramModal" class="qr-modal-mask" @click.self="showMiniProgramModal = false">
        <article class="qr-modal">
          <button class="modal-close" aria-label="关闭" @click="showMiniProgramModal = false">
            <i class="fas fa-xmark"></i>
          </button>
          <span class="section-tag">MINI PROGRAM</span>
          <h2>小镇用户小程序端二维码</h2>
          <p>入住园区企业可使用微信扫码进入小镇用户小程序，提交诉求、预约服务、查看政策与办理进度。</p>
          <div class="modal-qr-box" aria-label="小镇用户小程序端二维码示意">
            <div class="qr-grid">
              <span v-for="n in 49" :key="n" :class="{ dark: [1,2,3,4,5,7,8,14,15,21,22,23,25,27,29,31,35,36,39,40,42,43,44,45,46,47,49].includes(n) }"></span>
            </div>
          </div>
          <small>当前为二维码展示占位，替换正式小程序码图片后即可上线使用。</small>
        </article>
      </div>
    </Teleport>
  </main>
</template>

<style scoped>
.park-page{padding-top:72px;background:#fff;color:#0f172a}.park-wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.park-hero{position:relative;overflow:hidden;background:linear-gradient(120deg,#eff6ff,#fff 46%,#dbeafe);padding:96px 0}.park-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.05) 1px,transparent 1px);background-size:42px 42px;pointer-events:none}.hero-layout{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.02fr) minmax(420px,.78fr);gap:56px;align-items:center}.eyebrow,.section-tag,.section-heading span{color:#2563eb;font-size:13px;font-weight:900;letter-spacing:.15em}.hero-copy h1{font-size:56px;line-height:1.12;margin:16px 0 18px;letter-spacing:-.04em}.hero-copy p{max-width:680px;color:#475569;font-size:18px;line-height:1.9}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}.primary-btn,.ghost-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;padding:13px 22px;font-weight:800;text-decoration:none;cursor:pointer}.primary-btn{border:0;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;box-shadow:0 14px 30px rgba(37,99,235,.26)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-panel{border:1px solid rgba(37,99,235,.18);border-radius:24px;background:rgba(255,255,255,.86);box-shadow:0 30px 80px rgba(30,64,175,.16);padding:28px;backdrop-filter:blur(16px)}.panel-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.panel-top span{color:#64748b;font-weight:700}.panel-top strong{color:#2563eb}.metric-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.metric-grid div{border:1px solid #dbeafe;border-radius:16px;background:#f8fbff;padding:18px}.metric-grid strong{display:block;color:#0f172a;font-size:28px}.metric-grid span{color:#64748b;font-size:13px}.task-list{margin-top:18px;display:grid;gap:10px}.task-list p{margin:0;border-radius:12px;background:#f1f5ff;padding:12px;color:#334155;font-weight:700}.task-list i{color:#2563eb;margin-right:8px}.token-hub-section{padding:44px 0 0}.token-hub-card{position:relative;overflow:hidden;display:grid;grid-template-columns:auto minmax(0,1fr) auto;gap:24px;align-items:center;border:1px solid #bfdbfe;border-radius:24px;background:linear-gradient(135deg,#f8fbff,#fff 52%,#eff6ff);padding:28px 32px;box-shadow:0 24px 70px rgba(30,64,175,.1)}.token-hub-card:before{content:"";position:absolute;right:-80px;top:-90px;width:240px;height:240px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,.18),transparent 68%)}.token-hub-icon{position:relative;z-index:1;display:grid;place-items:center;width:76px;height:76px;border-radius:20px;background:linear-gradient(135deg,#2563eb,#06b6d4);color:#fff;font-size:30px;box-shadow:0 18px 42px rgba(37,99,235,.24)}.token-hub-copy{position:relative;z-index:1}.token-hub-copy h2{margin:8px 0 10px;font-size:30px}.token-hub-copy p{max-width:720px;margin:0;color:#64748b;line-height:1.8}.token-hub-tags{display:flex;flex-wrap:wrap;gap:8px;margin-top:16px}.token-hub-tags span{padding:7px 11px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:900}.token-hub-card .primary-btn{position:relative;z-index:1;white-space:nowrap}.entry-section{display:grid;grid-template-columns:1fr 1fr;gap:24px;padding:80px 0}.entry-card{display:grid;grid-template-columns:auto 1fr;gap:22px;align-items:center;border:1px solid #e2e8f0;border-radius:20px;background:#fff;padding:30px;box-shadow:0 18px 45px rgba(30,64,175,.08)}.entry-card h2{font-size:28px;margin:10px 0 12px}.entry-card p{color:#64748b;line-height:1.8}.entry-card small{display:block;color:#94a3b8;margin-top:10px}.entry-icon{display:grid;place-items:center;width:76px;height:76px;border-radius:18px;background:#eff6ff;color:#2563eb;font-size:30px}.qr-box{display:grid;place-items:center;width:150px;height:150px;border:10px solid #eff6ff;border-radius:22px;background:#fff;box-shadow:inset 0 0 0 1px #bfdbfe}.qr-grid{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;width:108px;height:108px}.qr-grid span{border-radius:2px;background:#dbeafe}.qr-grid span.dark{background:#1d4ed8}.intro-section{background:#f8fafc;padding:86px 0}.section-heading{text-align:center;max-width:760px;margin:0 auto 42px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.8}.capability-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.capability-card{border:1px solid #e2e8f0;border-radius:18px;background:#fff;padding:26px;transition:.25s}.capability-card:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(30,64,175,.1)}.capability-card i{display:grid;place-items:center;width:46px;height:46px;border-radius:12px;background:#eff6ff;color:#2563eb;font-size:20px}.capability-card h3{font-size:19px;margin:18px 0 10px}.capability-card p{color:#64748b;line-height:1.75}.flow-section{padding:84px 0}.flow-line{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}.flow-step{position:relative;border:1px solid #dbeafe;border-radius:16px;background:linear-gradient(180deg,#fff,#f8fbff);padding:22px;text-align:center}.flow-step span{display:grid;place-items:center;width:36px;height:36px;margin:0 auto 12px;border-radius:50%;background:#2563eb;color:#fff;font-weight:900}.flow-step strong{font-size:15px}.qr-modal-mask{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;padding:24px;background:rgba(15,23,42,.52);backdrop-filter:blur(8px)}.qr-modal{position:relative;width:min(430px,100%);padding:34px 34px 30px;border:1px solid rgba(191,219,254,.85);border-radius:24px;background:#fff;text-align:center;box-shadow:0 30px 90px rgba(15,23,42,.28)}.modal-close{position:absolute;right:18px;top:18px;display:grid;place-items:center;width:34px;height:34px;border:0;border-radius:50%;background:#eff6ff;color:#1d4ed8;cursor:pointer}.qr-modal h2{margin:10px 0 12px;font-size:28px}.qr-modal p{color:#64748b;line-height:1.8;margin:0 auto 24px}.modal-qr-box{display:grid;place-items:center;width:220px;height:220px;margin:0 auto 18px;border:14px solid #eff6ff;border-radius:28px;background:#fff;box-shadow:inset 0 0 0 1px #bfdbfe,0 18px 45px rgba(37,99,235,.12)}.modal-qr-box .qr-grid{width:158px;height:158px}.qr-modal small{display:block;color:#94a3b8}@media(max-width:900px){.hero-layout,.entry-section,.token-hub-card{grid-template-columns:1fr}.hero-layout{gap:34px}.capability-grid{grid-template-columns:1fr 1fr}.flow-line{grid-template-columns:1fr 1fr}.hero-copy h1{font-size:44px}.token-hub-card .primary-btn{justify-self:flex-start}}@media(max-width:600px){.park-wrapper{width:min(100% - 28px,1200px)}.park-hero{padding:64px 0}.hero-copy h1{font-size:36px}.hero-copy p{font-size:16px}.hero-panel{padding:20px}.metric-grid,.entry-card,.capability-grid,.flow-line{grid-template-columns:1fr}.qr-box{width:132px;height:132px}.token-hub-section{padding-top:30px}.token-hub-card{padding:24px}.token-hub-copy h2{font-size:25px}.entry-section,.intro-section,.flow-section{padding:62px 0}.qr-modal{padding:30px 22px}.modal-qr-box{width:190px;height:190px}.modal-qr-box .qr-grid{width:136px;height:136px}}
.smart-campus-panel{position:relative;overflow:hidden;background:linear-gradient(145deg,rgba(255,255,255,.92),rgba(239,246,255,.92) 52%,rgba(219,234,254,.9));}.smart-campus-panel:before{content:"";position:absolute;right:-88px;top:-98px;width:250px;height:250px;border-radius:50%;background:radial-gradient(circle,rgba(14,165,233,.26),transparent 66%);pointer-events:none}.smart-campus-panel:after{content:"";position:absolute;inset:auto 24px 24px auto;width:120px;height:120px;border:1px dashed rgba(37,99,235,.24);border-radius:30px;transform:rotate(12deg);pointer-events:none}.smart-campus-visual{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) auto;gap:16px;align-items:stretch;margin-bottom:22px}.campus-map-card{position:relative;min-height:150px;border:1px solid rgba(96,165,250,.42);border-radius:20px;background:linear-gradient(135deg,#eff6ff,#fff 48%,#dbeafe);box-shadow:inset 0 0 0 1px rgba(255,255,255,.7);overflow:hidden}.campus-map-card:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.08) 1px,transparent 1px);background-size:24px 24px}.campus-map-card strong{position:absolute;right:18px;bottom:14px;color:rgba(37,99,235,.16);font-size:54px;line-height:1;font-weight:1000}.map-node{position:absolute;z-index:1;width:18px;height:18px;border-radius:50%;background:#2563eb;box-shadow:0 0 0 8px rgba(37,99,235,.12)}.node-a{left:40px;top:34px}.node-b{left:46%;top:70px;background:#0ea5e9}.node-c{right:48px;top:42px;background:#22c55e}.map-route{position:absolute;z-index:0;height:3px;border-radius:999px;background:linear-gradient(90deg,#2563eb,#0ea5e9)}.route-a{left:58px;top:42px;width:42%;transform:rotate(14deg);transform-origin:left center}.route-b{left:48%;top:78px;width:36%;transform:rotate(-13deg);transform-origin:left center}.campus-status{display:grid;gap:10px;min-width:150px}.campus-status span{display:flex;align-items:center;gap:8px;border:1px solid #dbeafe;border-radius:14px;background:rgba(255,255,255,.74);padding:12px;color:#1e3a8a;font-size:13px;font-weight:900}.campus-status i{color:#2563eb}.smart-campus-panel h2{position:relative;z-index:1;margin:4px 0 10px;font-size:28px;letter-spacing:-.02em}.campus-desc{position:relative;z-index:1;margin:0;color:#475569;line-height:1.85}.campus-tags{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 22px}.campus-tags span{padding:8px 12px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:900}.campus-entry-btn{position:relative;z-index:1;width:100%}.agent-entry-section{grid-template-columns:repeat(3,1fr);align-items:stretch}.agent-app-card{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:390px;border:1px solid #dbeafe;border-radius:22px;background:linear-gradient(180deg,#fff,#f8fbff);padding:30px;box-shadow:0 20px 55px rgba(30,64,175,.1);transition:.25s}.agent-app-card:before{content:"";position:absolute;right:-54px;top:-54px;width:150px;height:150px;border-radius:50%;background:rgba(37,99,235,.08)}.agent-app-card:hover{transform:translateY(-6px);box-shadow:0 26px 70px rgba(30,64,175,.15)}.agent-icon{position:relative;z-index:1;display:grid;place-items:center;width:64px;height:64px;margin-bottom:22px;border-radius:18px;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font-size:26px;box-shadow:0 16px 34px rgba(37,99,235,.24)}.agent-app-card h2{position:relative;z-index:1;margin:10px 0 12px;font-size:26px}.agent-app-card p{position:relative;z-index:1;flex:1;color:#64748b;line-height:1.8}.agent-tags{position:relative;z-index:1;display:flex;flex-wrap:wrap;gap:8px;margin:20px 0 22px}.agent-tags span{padding:7px 10px;border-radius:999px;background:#eff6ff;color:#1d4ed8;font-size:12px;font-weight:900}.agent-app-card .primary-btn{align-self:flex-start}@media(max-width:900px){.agent-entry-section{grid-template-columns:1fr}.agent-app-card{min-height:auto}}@media(max-width:600px){.entry-section,.intro-section,.flow-section{padding:62px 0}.smart-campus-visual{grid-template-columns:1fr}.campus-status{grid-template-columns:1fr 1fr}.agent-entry-section{padding:62px 0}.agent-app-card{padding:24px}.agent-app-card h2{font-size:23px}}
</style>
