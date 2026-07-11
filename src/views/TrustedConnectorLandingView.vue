<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const enterPlatform = () => router.push("/trusted-connector/login");

const capabilities = [
  { icon: "fa-plug", title: "多源数据接入", desc: "统一接入电商平台、CRM、ERP、直播工具、园区服务系统等多类数据源。" },
  { icon: "fa-user-shield", title: "授权流转", desc: "通过授权、审计和角色权限控制，让数据在明确边界内可用、可管、可追踪。" },
  { icon: "fa-right-left", title: "可信交换", desc: "支持标准化数据交换规则，降低跨系统协同中的口径不一与安全风险。" },
  { icon: "fa-code-branch", title: "接口连接", desc: "提供稳定接口连接能力，支撑问数系统、数据治理智能体和数字员工调用可信数据。" }
];

const scenes = [
  "连接企业经营系统与园区服务平台",
  "打通直播电商业务数据与智能分析应用",
  "支撑数据治理智能体完成接入、校验与输出",
  "为第三方系统提供安全可控的数据调用通道"
];
</script>

<template>
  <main class="connector-page">
    <section class="connector-hero">
      <div class="connector-wrapper hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">TRUSTED DATA CONNECTOR</span>
          <h1>可信数据接入连接器</h1>
          <p>
            面向企业、园区与第三方系统的数据连接场景，提供多源数据安全接入、
            授权流转、可信交换与接口连接能力，让业务数据以标准、合规、可追踪的方式进入智能应用生态。
          </p>
          <div class="hero-actions">
            <button class="primary-btn" @click="enterPlatform">
              进入平台 <i class="fas fa-arrow-right"></i>
            </button>
            <a class="ghost-btn" href="#connector-capabilities">查看连接能力</a>
          </div>
        </div>

        <div class="hero-visual">
          <img src="/static/images/solutions/webp/internet.webp" alt="可信数据接入连接器" />
          <div class="connector-status">
            <strong>128</strong>
            <span>已接入数据源</span>
          </div>
          <div class="trust-badge"><i class="fas fa-shield-halved"></i> 可信授权通道</div>
        </div>
      </div>
    </section>

    <section id="connector-capabilities" class="capability-section connector-wrapper">
      <header class="section-heading">
        <span>CONNECTOR CAPABILITIES</span>
        <h2>核心连接能力</h2>
        <p>把分散系统、业务应用和智能服务连接成一条可信数据链路。</p>
      </header>

      <div class="capability-grid">
        <article v-for="item in capabilities" :key="item.title" class="capability-card">
          <i class="fas" :class="item.icon"></i>
          <h3>{{ item.title }}</h3>
          <p>{{ item.desc }}</p>
        </article>
      </div>
    </section>

    <section class="flow-section">
      <div class="connector-wrapper flow-card">
        <div class="flow-copy">
          <span class="section-tag">TRUSTED FLOW</span>
          <h2>从数据接入到可信调用</h2>
          <p>
            连接器在数据进入平台前完成来源识别、授权校验和接口适配，
            在数据流转过程中保留访问记录与权限边界，为后续问数、治理和运营应用提供可信数据支撑。
          </p>
          <button class="primary-btn" @click="enterPlatform">
            登录授权进入 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div class="flow-steps">
          <div><span>01</span><strong>数据源注册</strong></div>
          <div><span>02</span><strong>授权校验</strong></div>
          <div><span>03</span><strong>接口适配</strong></div>
          <div><span>04</span><strong>可信交换</strong></div>
        </div>
      </div>
    </section>

    <section class="scene-section connector-wrapper">
      <header class="section-heading">
        <span>APPLICATION SCENARIOS</span>
        <h2>应用场景</h2>
      </header>
      <div class="scene-grid">
        <div v-for="(item, index) in scenes" :key="item" class="scene-item">
          <span>0{{ index + 1 }}</span>
          <strong>{{ item }}</strong>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.connector-page{padding-top:72px;background:#fff;color:#0f172a}.connector-wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.connector-hero{position:relative;overflow:hidden;padding:104px 0;background:radial-gradient(circle at 82% 18%,rgba(14,165,233,.22),transparent 30%),linear-gradient(120deg,#eff6ff,#fff 48%,#dbeafe)}.connector-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.045) 1px,transparent 1px);background-size:42px 42px}.hero-grid{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(430px,.9fr);gap:58px;align-items:center}.eyebrow,.section-heading span,.section-tag{color:#2563eb;font-size:13px;font-weight:900;letter-spacing:.15em}.hero-copy h1{font-size:56px;line-height:1.12;margin:16px 0 18px;letter-spacing:-.04em}.hero-copy p{max-width:720px;color:#475569;font-size:18px;line-height:1.9}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:34px}.primary-btn,.ghost-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;padding:13px 22px;font-weight:900;text-decoration:none;cursor:pointer}.primary-btn{border:0;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;box-shadow:0 14px 32px rgba(37,99,235,.26)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-visual{position:relative}.hero-visual img{display:block;width:100%;height:400px;object-fit:cover;border-radius:26px;box-shadow:0 30px 80px rgba(30,64,175,.18)}.connector-status{position:absolute;left:-22px;bottom:34px;width:160px;padding:20px;border-radius:18px;background:rgba(15,23,42,.76);color:#fff;backdrop-filter:blur(12px)}.connector-status strong{display:block;font-size:42px}.connector-status span{color:#dbeafe;font-weight:900}.trust-badge{position:absolute;right:18px;top:18px;padding:11px 16px;border-radius:999px;background:rgba(255,255,255,.9);color:#1d4ed8;font-weight:900}.trust-badge i{margin-right:7px}.capability-section{padding:90px 0}.section-heading{text-align:center;max-width:760px;margin:0 auto 42px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.8}.capability-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px}.capability-card{border:1px solid #e2e8f0;border-radius:18px;background:#fff;padding:26px;transition:.25s}.capability-card:hover{transform:translateY(-5px);box-shadow:0 18px 45px rgba(30,64,175,.1)}.capability-card i{display:grid;place-items:center;width:48px;height:48px;border-radius:14px;background:#eff6ff;color:#2563eb;font-size:20px}.capability-card h3{font-size:19px;margin:18px 0 10px}.capability-card p{color:#64748b;line-height:1.75}.flow-section{padding:86px 0;background:#f8fafc}.flow-card{display:grid;grid-template-columns:.9fr 1.1fr;gap:40px;align-items:center}.flow-copy h2{font-size:36px;margin:12px 0 14px}.flow-copy p{color:#64748b;line-height:1.85;margin-bottom:28px}.flow-steps{display:grid;grid-template-columns:1fr 1fr;gap:16px}.flow-steps div{padding:24px;border:1px solid #dbeafe;border-radius:18px;background:#fff}.flow-steps span{display:grid;place-items:center;width:40px;height:40px;margin-bottom:16px;border-radius:50%;background:#2563eb;color:#fff;font-weight:900}.flow-steps strong{color:#334155}.scene-section{padding:84px 0}.scene-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.scene-item{padding:22px;border:1px solid #e2e8f0;border-radius:16px;background:#fff}.scene-item span{display:block;margin-bottom:12px;color:#2563eb;font-size:13px;font-weight:900}.scene-item strong{color:#334155;line-height:1.7}@media(max-width:960px){.hero-grid,.flow-card{grid-template-columns:1fr}.capability-grid,.scene-grid{grid-template-columns:1fr 1fr}.hero-copy h1{font-size:44px}.connector-status{left:18px}}@media(max-width:600px){.connector-wrapper{width:min(100% - 28px,1200px)}.connector-hero{padding:64px 0}.hero-copy h1{font-size:36px}.hero-copy p{font-size:16px}.hero-visual img{height:260px}.connector-status{position:static;width:auto;margin-top:14px}.capability-grid,.flow-steps,.scene-grid{grid-template-columns:1fr}.section-heading h2,.flow-copy h2{font-size:28px}.capability-section,.flow-section,.scene-section{padding:64px 0}}
</style>
