<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
const backLogin = () => router.push("/trusted-connector/login");
</script>

<template>
  <main class="connector-auth-page">
    <section class="brand-panel">
      <button class="back-link" @click="backLogin"><i class="fas fa-arrow-left"></i> 返回登录</button>
      <div class="brand-title">
        <span><i class="fas fa-shield-halved"></i></span>
        <strong>可信数据接入连接器</strong>
      </div>
      <div class="brand-visual">
        <img src="/static/images/solutions/webp/internet.webp" alt="可信数据接入连接器" />
        <div class="visual-stat"><span>可信接入数据源</span><strong>128</strong></div>
        <div class="visual-tag"><i class="fas fa-check-circle"></i> 授权流转 · 可信交换</div>
      </div>
      <div class="welcome-copy">
        <h1>欢迎使用本系统</h1>
        <p>仓山区互联网小镇 · 可信数据接入连接器</p>
      </div>
    </section>

    <section class="auth-panel">
      <div class="top-tools">
        <button class="theme-toggle"><span></span><i class="fas fa-moon"></i></button>
        <button class="lang-btn"><i class="fas fa-language"></i></button>
      </div>
      <article class="auth-card">
        <div class="auth-icon"><i class="fas fa-shield-alt"></i><em>1</em></div>
        <h2>第三方授权</h2>
        <p class="auth-subtitle">基于授权码模式，授权进入可信数据接入连接器</p>
        <div class="divider"></div>
        <p class="permission-title">可信数据接入连接器将申请获得以下权限：</p>
        <div class="permission-list">
          <label><input type="checkbox" checked /> 访问你的个人信息</label>
          <label><input type="checkbox" checked /> 修改你的个人信息</label>
        </div>
        <div class="auth-actions">
          <button class="agree-btn">同意授权</button>
          <button class="reject-btn" @click="backLogin">拒绝</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.connector-auth-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff;color:#0f172a}.brand-panel{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:100vh;padding:34px 54px 44px;background:radial-gradient(circle at 75% 50%,rgba(37,99,235,.22),transparent 32%),linear-gradient(135deg,#334155,#1e293b 58%,#1e3a8a);color:#fff}.brand-panel:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px}.back-link,.brand-title,.brand-visual,.welcome-copy{position:relative;z-index:1}.back-link{align-self:flex-start;border:1px solid rgba(255,255,255,.22);background:rgba(255,255,255,.08);color:#dbeafe;border-radius:999px;padding:9px 14px;font-weight:900;cursor:pointer}.brand-title{display:flex;align-items:center;gap:14px;margin-top:22px;font-size:24px;font-weight:900}.brand-title span{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#93c5fd);color:#2563eb}.brand-visual{position:relative;width:min(430px,80%);margin:auto auto 48px;border-radius:22px;overflow:hidden;box-shadow:0 28px 70px rgba(0,0,0,.28)}.brand-visual img{display:block;width:100%;height:260px;object-fit:cover}.visual-stat{position:absolute;left:22px;bottom:22px;display:grid;gap:2px;padding:16px 18px;border-radius:16px;background:rgba(15,23,42,.72)}.visual-stat span{color:#dbeafe;font-weight:800}.visual-stat strong{font-size:34px}.visual-tag{position:absolute;right:18px;top:18px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.88);color:#2563eb;font-weight:900}.welcome-copy{text-align:center}.welcome-copy h1{font-size:36px;margin:0 0 16px}.welcome-copy p{margin:0;color:#dbeafe;font-size:16px;font-weight:800}.auth-panel{position:relative;min-height:100vh;display:grid;place-items:center;background:linear-gradient(135deg,#fff,#f8fbff)}.top-tools{position:absolute;right:44px;top:38px;display:flex;gap:16px}.theme-toggle,.lang-btn{border:0;background:transparent;color:#64748b;cursor:pointer}.theme-toggle{position:relative;width:42px;height:22px;border-radius:999px;background:#e2e8f0}.theme-toggle span{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff}.theme-toggle i{position:absolute;right:5px;top:4px;color:#facc15;font-size:13px}.lang-btn{font-size:20px}.auth-card{width:min(460px,calc(100% - 56px));text-align:center}.auth-icon{position:relative;display:grid;place-items:center;width:72px;height:72px;margin:0 auto 32px;border-radius:50%;background:conic-gradient(from 90deg,#38bdf8,#2563eb,#a855f7,#38bdf8)}.auth-icon:before{content:"";position:absolute;inset:8px;border-radius:50%;background:#fff}.auth-icon i{position:relative;color:#1e293b;font-size:30px}.auth-icon em{position:absolute;right:-2px;top:0;display:grid;place-items:center;width:24px;height:24px;border-radius:50%;background:#ef4444;color:#fff;font-size:12px;font-style:normal;font-weight:900}.auth-card h2{font-size:34px;margin:0 0 20px;font-weight:900}.auth-subtitle{margin:0;color:#475569;font-weight:800}.divider{height:1px;margin:18px 0 24px;background:linear-gradient(90deg,transparent,#cbd5e1,transparent)}.permission-title{text-align:left;color:#334155;font-weight:900;margin:0 0 14px}.permission-list{display:grid;gap:12px;margin-bottom:24px;text-align:left}.permission-list label{display:flex;align-items:center;gap:8px;color:#2563eb;font-size:15px;font-weight:900}.permission-list input{width:16px;height:16px;accent-color:#3b82f6}.auth-actions{display:grid;grid-template-columns:1fr 120px;gap:14px}.agree-btn,.reject-btn{height:44px;border-radius:6px;font-weight:900;cursor:pointer}.agree-btn{border:0;background:linear-gradient(135deg,#2563eb,#38bdf8);color:#fff}.reject-btn{border:1px solid #e2e8f0;background:#fff;color:#475569}@media(max-width:900px){.connector-auth-page{grid-template-columns:1fr}.brand-panel{min-height:auto;padding:28px}.brand-visual{width:min(380px,88%);margin:30px auto}.auth-panel{min-height:620px}}@media(max-width:560px){.auth-actions{grid-template-columns:1fr}.auth-card h2{font-size:30px}}
</style>
