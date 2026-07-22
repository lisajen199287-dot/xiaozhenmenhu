<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const goVideoAuth = () => {
  window.location.href = "https://www.cii-group.com/aivideo/";
};

const goPracticeUser = () => {
  router.push("/digital-employee/practice-user");
};

const goPracticeAdmin = () => {
  window.location.href = "https://conver.aics.cii-group.com/";
};
</script>

<template>
  <main class="digital-employee-page">
    <section class="employee-hero">
      <div class="employee-wrapper hero-layout">
        <div class="hero-copy">
          <span class="eyebrow">LIVE E-COMMERCE DIGITAL EMPLOYEE</span>
          <h1>直播电商数字员工系统</h1>
          <p>
            围绕直播电商的内容生产、短视频生成、主播陪练与运营管理，
            为企业提供可落地、可训练、可持续迭代的数字员工能力。
          </p>
          <div class="hero-actions">
            <a href="#video-system" class="primary-btn">电商视频生成系统</a>
            <a href="#practice-system" class="ghost-btn">电商陪练系统</a>
          </div>
        </div>
        <div class="hero-visual">
          <img src="/static/images/apps/app-digital-human.png" alt="直播电商数字员工系统" />
          <div class="live-badge"><i class="fas fa-circle"></i> AI LIVE</div>
          <div class="data-card">
            <strong>7×24h</strong>
            <span>数字员工在线服务</span>
          </div>
        </div>
      </div>
    </section>

    <section class="employee-wrapper product-section video-section" id="video-system">
      <article class="product-card video-card">
        <div class="product-copy">
          <span class="section-tag">VIDEO GENERATION</span>
          <h2>电商视频生成系统</h2>
          <p>
            面向电商商家和运营团队，提供商品素材理解、卖点提炼、脚本生成、
            数字人讲解、短视频批量生成等能力，帮助团队快速产出适合直播预热、
            商品种草和平台投放的视频内容。
          </p>
          <ul>
            <li><i class="fas fa-check-circle"></i> 商品卖点自动提炼与脚本生成</li>
            <li><i class="fas fa-check-circle"></i> 数字人口播、字幕、画面素材自动组合</li>
            <li><i class="fas fa-check-circle"></i> 支持多品类视频模板与批量生产</li>
          </ul>
          <button class="primary-btn" @click="goVideoAuth">
            进入平台 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
        <div class="product-preview">
          <img src="/static/images/apps/app-video-ai.png" alt="电商视频生成系统" />
        </div>
      </article>
    </section>

    <section class="practice-section" id="practice-system">
      <div class="employee-wrapper product-section practice-product-section">
        <article class="product-card practice-card">
          <div class="product-copy">
            <span class="section-tag">TRAINING SYSTEM</span>
            <h2>电商陪练系统</h2>
            <p>
              通过 AI 角色扮演、话术演练和即时反馈，帮助主播、客服和运营人员提升直播转化能力。
              系统可模拟不同用户画像、商品场景和常见异议，支持训练计划、过程记录、
              评分反馈和管理端复盘。
            </p>
            <ul>
              <li><i class="fas fa-check-circle"></i> 场景陪练：直播开场、商品讲解、异议处理</li>
              <li><i class="fas fa-check-circle"></i> 智能评分：表达节奏、卖点覆盖、转化话术</li>
              <li><i class="fas fa-check-circle"></i> 团队管理：训练任务、学习记录、复盘统计</li>
            </ul>
            <div class="dual-actions">
              <button class="primary-btn" @click="goPracticeUser">用户端入口</button>
              <button class="ghost-btn" @click="goPracticeAdmin">管理端入口</button>
            </div>
          </div>
          <div class="product-preview">
            <img src="/static/images/apps/app-sales-coach.png" alt="电商陪练系统" />
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.digital-employee-page{padding-top:72px;background:#fff;color:#0f172a}.employee-wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.employee-hero{position:relative;overflow:hidden;padding:104px 0;background:radial-gradient(circle at 82% 18%,rgba(56,189,248,.24),transparent 28%),linear-gradient(120deg,#eef6ff,#fff 48%,#e0f2fe)}.employee-hero:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.045) 1px,transparent 1px);background-size:42px 42px}.hero-layout{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1fr) minmax(420px,.82fr);gap:60px;align-items:center}.eyebrow,.section-tag,.section-heading span{color:#2563eb;font-size:13px;font-weight:900;letter-spacing:.15em}.hero-copy h1{font-size:56px;line-height:1.1;margin:16px 0 20px}.hero-copy p{color:#475569;font-size:18px;line-height:1.9}.hero-actions,.dual-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:30px}.primary-btn,.ghost-btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;border-radius:10px;padding:13px 22px;font-weight:900;text-decoration:none;cursor:pointer}.primary-btn{border:0;background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;box-shadow:0 14px 30px rgba(37,99,235,.24)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-visual{position:relative;border:1px solid rgba(37,99,235,.16);border-radius:28px;overflow:hidden;background:#fff;box-shadow:0 30px 80px rgba(30,64,175,.16)}.hero-visual img{display:block;width:100%;height:390px;object-fit:cover}.live-badge{position:absolute;right:22px;top:22px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.9);color:#2563eb;font-weight:900}.live-badge i{color:#ef4444;font-size:10px}.data-card{position:absolute;left:22px;bottom:22px;display:grid;gap:4px;padding:18px;border-radius:18px;background:rgba(15,23,42,.68);color:#fff;backdrop-filter:blur(12px)}.data-card strong{font-size:32px}.data-card span{color:#dbeafe;font-weight:800}.product-section{padding:88px 0}.product-card{display:grid;grid-template-columns:1fr .82fr;gap:42px;align-items:center;border:1px solid #e2e8f0;border-radius:28px;background:#fff;padding:42px;box-shadow:0 24px 70px rgba(30,64,175,.08)}.product-copy h2{font-size:38px;margin:12px 0 18px}.product-copy p{color:#64748b;line-height:1.9}.product-copy ul{display:grid;gap:12px;margin:22px 0 28px;padding:0;list-style:none}.product-copy li{color:#334155;font-weight:800}.product-copy li i{color:#2563eb;margin-right:8px}.product-preview{position:relative;overflow:hidden;border-radius:22px;background:#eff6ff}.product-preview img{display:block;width:100%;height:320px;object-fit:cover}.practice-section{padding:88px 0;background:#f8fafc}.section-heading{text-align:center;max-width:760px;margin:0 auto 44px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.8}.practice-card{grid-template-columns:.82fr 1fr}.feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-top:22px}.feature-grid div{padding:16px;border:1px solid #dbeafe;border-radius:14px;background:#f8fbff}.feature-grid strong,.feature-grid span{display:block}.feature-grid strong{margin-bottom:8px;color:#0f172a}.feature-grid span{color:#64748b;font-size:13px;line-height:1.6}@media(max-width:900px){.hero-layout,.product-card,.practice-card{grid-template-columns:1fr}.hero-copy h1{font-size:42px}.feature-grid{grid-template-columns:1fr}}@media(max-width:600px){.employee-wrapper{width:min(100% - 28px,1200px)}.employee-hero,.product-section,.practice-section{padding:62px 0}.hero-copy h1{font-size:34px}.hero-visual img,.product-preview img{height:230px}.product-card{padding:24px}.product-copy h2{font-size:30px}}
.practice-section{background:#f8fafc;padding:0}.practice-card{grid-template-columns:1fr .82fr}
.video-section{padding-bottom:42px}.practice-product-section{padding-top:42px}
@media(max-width:900px){.practice-card{grid-template-columns:1fr}}
@media(max-width:600px){.video-section{padding-bottom:28px}.practice-product-section{padding-top:28px}}
</style>
