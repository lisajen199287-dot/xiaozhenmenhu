<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const backLogin = () => {
  router.push("/digital-employee/video-login");
};

const agreeAuth = () => {
  router.push("/digital-employee/video-workbench");
};
</script>

<template>
  <main class="video-auth-page">
    <section class="auth-brand-panel">
      <button class="back-link" @click="backLogin"><i class="fas fa-arrow-left"></i> 返回登录</button>
      <div class="brand-title">
        <span><i class="fas fa-video"></i></span>
        <strong>AIGC短剧一站式创作平台</strong>
      </div>
      <div class="brand-visual">
        <img src="/static/images/apps/app-video-ai.png" alt="电商视频生成系统" />
        <div class="visual-stat">
          <span>智能生成效率</span>
          <strong>96%</strong>
        </div>
        <div class="visual-tag"><i class="fas fa-check-circle"></i> 商品素材 · 脚本生成</div>
      </div>
      <div class="welcome-copy">
        <h1>欢迎使用本系统</h1>
        <p>仓山区互联网小镇 · 电商视频生成系统</p>
      </div>
    </section>

    <section class="auth-content-panel">
      <div class="auth-tools">
        <button class="theme-toggle"><span></span><i class="fas fa-moon"></i></button>
        <button class="lang-btn"><i class="fas fa-language"></i></button>
      </div>
      <article class="auth-card">
        <div class="auth-icon">
          <i class="fas fa-shield-alt"></i>
          <em>1</em>
        </div>
        <h2>第三方授权</h2>
        <p class="auth-subtitle">基于授权码模式，授权进入电商视频生成系统</p>
        <div class="divider"></div>
        <p class="permission-title">AIGC短剧一站式创作平台将申请获得以下权限：</p>
        <div class="permission-list">
          <label><input type="checkbox" checked /> 访问你的个人信息</label>
          <label><input type="checkbox" checked /> 修改你的个人信息</label>
        </div>
        <div class="auth-actions">
          <button class="agree-btn" @click="agreeAuth">同意授权</button>
          <button class="reject-btn" @click="backLogin">拒绝</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.video-auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff;color:#0f172a}.auth-brand-panel{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:100vh;padding:34px 54px 44px;background:radial-gradient(circle at 75% 50%,rgba(37,99,235,.26),transparent 32%),linear-gradient(135deg,#1e293b,#334155 58%,#1e3a8a);color:#fff}.auth-brand-panel:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px;pointer-events:none}.back-link,.brand-title,.brand-visual,.welcome-copy{position:relative;z-index:1}.back-link{align-self:flex-start;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08);color:#dbeafe;border-radius:999px;padding:9px 14px;font-weight:900;cursor:pointer}.brand-title{display:flex;align-items:center;gap:14px;margin-top:22px;font-size:24px;font-weight:900}.brand-title span{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#93c5fd);color:#2563eb}.brand-visual{width:min(430px,80%);margin:auto auto 48px;border-radius:22px;overflow:hidden;box-shadow:0 28px 70px rgba(0,0,0,.28)}.brand-visual img{display:block;width:100%;height:260px;object-fit:cover;filter:saturate(1.08)}.visual-stat{position:absolute;left:22px;bottom:22px;display:grid;gap:2px;padding:16px 18px;border-radius:16px;background:rgba(15,23,42,.72);backdrop-filter:blur(12px)}.visual-stat span{color:#dbeafe;font-weight:800}.visual-stat strong{font-size:34px}.visual-tag{position:absolute;right:18px;top:18px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.88);color:#2563eb;font-weight:900}.welcome-copy{text-align:center}.welcome-copy h1{font-size:36px;margin:0 0 16px}.welcome-copy p{margin:0;color:#dbeafe;font-size:16px;font-weight:800}.auth-content-panel{position:relative;min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#fff,#f8fbff)}.auth-content-panel:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 78% 10%,rgba(37,99,235,.09),transparent 24%);pointer-events:none}.auth-tools{position:absolute;right:44px;top:38px;display:flex;gap:16px;align-items:center}.theme-toggle,.lang-btn{border:0;background:transparent;color:#64748b;cursor:pointer}.theme-toggle{position:relative;width:42px;height:22px;border-radius:999px;background:#e2e8f0;box-shadow:inset 0 0 0 1px #cbd5e1}.theme-toggle span{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 2px 6px rgba(15,23,42,.18)}.theme-toggle i{position:absolute;right:5px;top:4px;color:#facc15;font-size:13px}.lang-btn{font-size:20px}.auth-card{position:relative;z-index:1;width:min(460px,calc(100% - 56px));text-align:center}.auth-icon{position:relative;display:grid;place-items:center;width:72px;height:72px;margin:0 auto 32px;border-radius:50%;background:conic-gradient(from 90deg,#38bdf8,#2563eb,#a855f7,#38bdf8);box-shadow:0 18px 40px rgba(37,99,235,.24)}.auth-icon:before{content:"";position:absolute;inset:8px;border-radius:50%;background:#fff}.auth-icon i{position:relative;color:#1e293b;font-size:30px}.auth-icon em{position:absolute;right:-2px;top:0;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#ef4444;color:#fff;font-size:12px;font-style:normal;font-weight:900}.auth-card h2{font-size:34px;margin:0 0 20px;font-weight:900}.auth-subtitle{margin:0;color:#475569;font-weight:800}.divider{width:100%;height:1px;margin:18px 0 24px;background:linear-gradient(90deg,transparent,#cbd5e1,transparent)}.permission-title{text-align:left;color:#334155;font-weight:900;margin:0 0 14px}.permission-list{display:grid;gap:12px;margin-bottom:24px;text-align:left}.permission-list label{display:flex;align-items:center;gap:8px;color:#2563eb;font-size:15px;font-weight:900}.permission-list input{width:16px;height:16px;accent-color:#3b82f6}.auth-actions{display:grid;grid-template-columns:1fr 120px;gap:14px}.agree-btn,.reject-btn{height:44px;border-radius:6px;font-weight:900;cursor:pointer}.agree-btn{border:0;background:linear-gradient(135deg,#2563eb,#38bdf8);color:#fff;box-shadow:0 12px 28px rgba(37,99,235,.22)}.reject-btn{border:1px solid #e2e8f0;background:#fff;color:#475569}@media(max-width:900px){.video-auth-page{grid-template-columns:1fr}.auth-brand-panel{min-height:auto;padding:28px;gap:36px}.brand-visual{width:min(380px,88%);margin:30px auto}.auth-content-panel{min-height:620px}}@media(max-width:560px){.auth-brand-panel{padding:22px 18px 40px}.brand-title{font-size:20px}.auth-actions{grid-template-columns:1fr}.auth-card h2{font-size:30px}.brand-visual img{height:210px}}
</style>
