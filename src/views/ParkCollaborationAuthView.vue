<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const agreeAuthorize = () => {
  router.push("/park-collaboration/workbench");
};

const permissions = [
  "访问你的个人信息",
  "修改你的个人信息",
];
</script>

<template>
  <main class="auth-page">
    <section class="brand-panel">
      <button class="back-link" @click="router.push('/park-collaboration')">
        <i class="fas fa-arrow-left"></i> 返回平台介绍
      </button>

      <div class="brand-top">
        <div class="brand-avatar">
          <i class="fas fa-building-user"></i>
        </div>
        <strong>园企协同平台</strong>
      </div>

      <div class="illustration">
        <div class="scene-visual">
          <img src="/static/images/solutions/webp/park.webp" alt="园企协同平台园区场景" />
          <div class="scene-overlay">
            <span>园企运营数据</span>
            <strong>96%</strong>
            <small>诉求办结率</small>
          </div>
          <div class="scene-chip">
            <i class="fas fa-check-circle"></i>
            政策触达 · 服务协同
          </div>
        </div>
      </div>

      <div class="welcome-copy">
        <h1>欢迎使用本系统</h1>
        <p>仓山区互联网小镇 · 园企协同运营后台</p>
      </div>
    </section>

    <section class="auth-panel">
      <div class="top-actions">
        <button class="theme-toggle" aria-label="切换主题">
          <span></span><i class="fas fa-moon"></i>
        </button>
        <button class="language-btn" aria-label="语言">
          <i class="fas fa-language"></i>
        </button>
      </div>

      <article class="auth-card">
        <div class="auth-icon">
          <i class="fas fa-shield-halved"></i>
          <em>1</em>
        </div>
        <h2>第三方授权</h2>
        <p class="auth-subtitle">基于授权码模式，授权进入园企运营后台</p>
        <div class="divider"></div>

        <p class="permission-title">园企协同平台将申请获得以下权限：</p>
        <div class="permission-list">
          <label v-for="item in permissions" :key="item">
            <input type="checkbox" checked />
            <span>{{ item }}</span>
          </label>
        </div>

        <div class="auth-actions">
          <button class="agree-btn" @click="agreeAuthorize">同意授权</button>
          <button class="reject-btn" @click="router.push('/park-collaboration')">拒绝</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff;color:#0f172a}.brand-panel{position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:space-between;min-height:100vh;padding:34px 54px 92px;background:radial-gradient(circle at 72% 44%,rgba(59,130,246,.28),transparent 30%),linear-gradient(135deg,#1e293b,#334155 58%,#1e3a8a);color:#fff}.brand-panel:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}.brand-top,.back-link,.illustration,.welcome-copy{position:relative;z-index:1}.back-link{align-self:flex-start;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#dbeafe;border-radius:999px;padding:9px 14px;font-weight:800;cursor:pointer;backdrop-filter:blur(10px)}.brand-top{display:flex;align-items:center;gap:14px;font-size:24px;font-weight:900}.brand-avatar{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#93c5fd);color:#2563eb;font-size:24px;box-shadow:0 16px 35px rgba(15,23,42,.22)}.illustration{width:min(430px,74%);margin:0 auto 10px;aspect-ratio:1.18;display:grid;place-items:center}.screen-card{position:relative;width:310px;height:205px;border:12px solid #0f172a;border-radius:18px;background:#f8fbff;box-shadow:0 24px 55px rgba(0,0,0,.24)}.screen-bar{height:34px;border-radius:6px 6px 0 0;background:linear-gradient(90deg,#dbeafe,#eff6ff)}.chart-row{position:absolute;left:36px;bottom:46px;display:flex;align-items:end;gap:12px}.bar{display:block;width:28px;border-radius:8px 8px 0 0}.bar.one{height:48px;background:#60a5fa}.bar.two{height:78px;background:#2563eb}.bar.three{height:58px;background:#f59e0b}.bar.four{height:94px;background:#0ea5e9}.screen-list{position:absolute;right:34px;top:72px;display:grid;gap:10px;width:86px}.screen-list span{height:12px;border-radius:999px;background:#bfdbfe}.screen-card i{position:absolute;left:-36px;top:-36px;display:grid;place-items:center;width:96px;height:96px;border:10px solid #2563eb;border-radius:50%;background:rgba(255,255,255,.68);color:#2563eb;font-size:36px;transform:rotate(-18deg)}.leaf{position:absolute;border-radius:80% 10% 80% 10%;background:#60a5fa;opacity:.95}.leaf-a{width:78px;height:120px;right:26px;top:38px;transform:rotate(28deg)}.leaf-b{width:70px;height:112px;left:20px;bottom:36px;background:#2563eb;transform:rotate(-42deg)}.leaf-c{width:82px;height:116px;right:8px;bottom:52px;background:#fbbf24;transform:rotate(48deg)}.welcome-copy{text-align:center}.welcome-copy h1{font-size:38px;margin:0 0 16px;font-weight:900}.welcome-copy p{margin:0;color:#dbeafe;font-size:17px;font-weight:800}.auth-panel{position:relative;min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#fff,#f8fbff)}.auth-panel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 10%,rgba(37,99,235,.09),transparent 24%);pointer-events:none}.top-actions{position:absolute;right:44px;top:38px;display:flex;gap:16px;align-items:center}.theme-toggle,.language-btn{border:0;background:transparent;color:#64748b;cursor:pointer}.theme-toggle{position:relative;width:42px;height:22px;border-radius:999px;background:#e2e8f0;box-shadow:inset 0 0 0 1px #cbd5e1}.theme-toggle span{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(15,23,42,.18)}.theme-toggle i{position:absolute;right:5px;top:4px;color:#facc15;font-size:13px}.language-btn{font-size:20px}.auth-card{position:relative;z-index:1;width:min(460px,calc(100% - 56px));text-align:center}.auth-icon{position:relative;display:grid;place-items:center;width:72px;height:72px;margin:0 auto 32px;border-radius:50%;background:conic-gradient(from 90deg,#38bdf8,#2563eb,#a855f7,#38bdf8);box-shadow:0 18px 40px rgba(37,99,235,.24)}.auth-icon:before{content:"";position:absolute;inset:8px;border-radius:50%;background:#fff}.auth-icon i{position:relative;color:#1e293b;font-size:30px}.auth-icon em{position:absolute;right:-2px;top:0;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#ef4444;color:#fff;font-size:12px;font-style:normal;font-weight:900}.auth-card h2{font-size:34px;margin:0 0 20px;font-weight:900;color:#0f172a}.auth-subtitle{margin:0;color:#475569;font-weight:800}.divider{width:100%;height:1px;margin:18px 0 24px;background:linear-gradient(90deg,transparent,#cbd5e1,transparent)}.permission-title{text-align:left;color:#334155;font-weight:900;margin:0 0 14px}.permission-list{display:grid;grid-template-columns:1fr 1fr;gap:12px 18px;margin-bottom:24px}.permission-list label{display:flex;align-items:center;gap:8px;color:#2563eb;font-size:14px;font-weight:800;white-space:nowrap}.permission-list input{width:16px;height:16px;accent-color:#3b82f6}.auth-actions{display:grid;grid-template-columns:1fr 120px;gap:14px}.agree-btn,.reject-btn{height:44px;border-radius:6px;font-weight:900;cursor:pointer}.agree-btn{border:0;background:linear-gradient(135deg,#2563eb,#38bdf8);color:#fff;box-shadow:0 12px 28px rgba(37,99,235,.22)}.reject-btn{border:1px solid #e2e8f0;background:#fff;color:#475569}@media(max-width:900px){.auth-page{grid-template-columns:1fr}.brand-panel{min-height:auto;padding:28px 28px 56px;gap:34px}.illustration{width:min(360px,80%)}.auth-panel{min-height:620px}.top-actions{right:24px;top:24px}}@media(max-width:560px){.brand-panel{padding:22px 18px 46px}.brand-top{font-size:20px}.screen-card{width:250px;height:168px}.welcome-copy h1{font-size:30px}.permission-list,.auth-actions{grid-template-columns:1fr}.auth-card{width:min(100% - 32px,460px)}.auth-card h2{font-size:30px}}
.scene-visual{position:relative;width:min(460px,100%);border:1px solid rgba(191,219,254,.36);border-radius:28px;overflow:hidden;background:rgba(255,255,255,.08);box-shadow:0 28px 70px rgba(15,23,42,.34)}
.scene-visual:before{content:"";position:absolute;inset:0;background:linear-gradient(180deg,rgba(15,23,42,.06),rgba(15,23,42,.54));z-index:1;pointer-events:none}
.scene-visual img{display:block;width:100%;height:300px;object-fit:cover;filter:saturate(1.08) contrast(1.04)}
.scene-overlay{position:absolute;z-index:2;left:22px;bottom:22px;display:grid;gap:3px;min-width:128px;padding:16px 18px;border:1px solid rgba(255,255,255,.2);border-radius:18px;background:rgba(15,23,42,.62);box-shadow:0 14px 32px rgba(15,23,42,.24);backdrop-filter:blur(14px)}
.scene-overlay span,.scene-overlay small{color:#dbeafe;font-weight:800;font-size:12px}
.scene-overlay strong{color:#fff;font-size:34px;line-height:1}
.scene-chip{position:absolute;z-index:2;right:18px;top:18px;display:flex;align-items:center;gap:8px;padding:10px 14px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(239,246,255,.92);color:#1d4ed8;font-size:13px;font-weight:900;box-shadow:0 12px 28px rgba(15,23,42,.18)}
.scene-chip i{color:#2563eb}
.permission-list{grid-template-columns:1fr;gap:10px}
@media(max-width:560px){.scene-visual img{height:220px}.scene-overlay{left:14px;bottom:14px}.scene-chip{left:14px;right:auto;top:14px}}
</style>
