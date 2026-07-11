<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginMode = ref<"account" | "phone">("account");
const goSsoAuth = () => router.push("/data-governance/auth");
</script>

<template>
  <main class="governance-login-page">
    <section class="brand-side">
      <header class="system-brand">
        <span><i class="fas fa-database"></i></span>
        <strong>数据治理智能体</strong>
      </header>

      <div class="welcome-visual">
        <img src="/static/images/solutions/webp/manufacturing.webp" alt="数据治理智能体" />
        <div class="visual-card">
          <strong>94%</strong>
          <span>数据质量评分</span>
        </div>
      </div>

      <div class="welcome-copy">
        <h1>欢迎使用本系统</h1>
        <p>数据标注、清洗与质量检测智能治理平台</p>
      </div>
    </section>

    <section class="form-side">
      <div class="top-tools">
        <button class="theme-toggle"><span></span><i class="fas fa-moon"></i></button>
        <button class="lang-btn"><i class="fas fa-language"></i></button>
      </div>

      <article class="login-card">
        <h2>登录</h2>
        <div class="login-tabs">
          <button :class="{ active: loginMode === 'account' }" @click="loginMode = 'account'">账号登录</button>
          <button :class="{ active: loginMode === 'phone' }" @click="loginMode = 'phone'">手机号登录</button>
        </div>

        <div class="form-stack" v-if="loginMode === 'account'">
          <label class="input-line"><i class="far fa-building"></i><input value="数据治理智能体" aria-label="系统名称" /></label>
          <label class="input-line"><i class="fas fa-user"></i><input value="admin" aria-label="账号" /></label>
          <label class="input-line"><i class="fas fa-lock"></i><input type="password" value="12345678" aria-label="密码" /><i class="fas fa-eye-slash eye"></i></label>
        </div>

        <div class="form-stack" v-else>
          <label class="input-line"><i class="fas fa-mobile-alt"></i><input placeholder="请输入手机号" aria-label="手机号" /></label>
          <label class="input-line code-line"><i class="fas fa-shield-alt"></i><input placeholder="请输入验证码" aria-label="验证码" /><button>获取验证码</button></label>
        </div>

        <div class="form-options">
          <label><input type="checkbox" checked /> 记住我</label>
          <button>忘记密码?</button>
        </div>

        <button class="login-btn">登录</button>
        <button class="sso-btn" @click="goSsoAuth">
          <i class="fas fa-shield-alt"></i>
          SSO 授权登录
        </button>

        <div class="quick-actions">
          <button>手机登录</button>
          <button>二维码登录</button>
          <button>注册</button>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.governance-login-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff;color:#0f172a}.brand-side{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:100vh;padding:34px 36px 88px;background:radial-gradient(circle at 72% 50%,rgba(37,99,235,.22),transparent 32%),linear-gradient(135deg,#334155,#1e293b 58%,#1e3a8a);color:#fff}.brand-side:before{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.045) 1px,transparent 1px);background-size:48px 48px}.system-brand,.welcome-visual,.welcome-copy{position:relative;z-index:1}.system-brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:900}.system-brand span{display:grid;place-items:center;width:54px;height:54px;border-radius:14px;background:linear-gradient(135deg,#eff6ff,#93c5fd);color:#2563eb}.welcome-visual{position:relative;width:min(520px,82%);margin:auto auto 46px;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.26)}.welcome-visual img{display:block;width:100%;height:310px;object-fit:cover}.visual-card{position:absolute;left:22px;bottom:22px;padding:18px;border-radius:18px;background:rgba(15,23,42,.74);backdrop-filter:blur(12px)}.visual-card strong{display:block;font-size:42px}.visual-card span{color:#dbeafe;font-weight:900}.welcome-copy{width:min(520px,82%);margin:0 auto}.welcome-copy h1{margin:0 0 18px;font-size:34px;font-weight:900}.welcome-copy p{margin:0;color:#f8fafc;font-size:17px;font-weight:800}.form-side{position:relative;display:grid;place-items:center;min-height:100vh;background:#fff}.top-tools{position:absolute;right:36px;top:42px;display:flex;align-items:center;gap:16px}.theme-toggle,.lang-btn{border:0;background:transparent;color:#64748b;cursor:pointer}.theme-toggle{position:relative;width:42px;height:22px;border-radius:999px;background:#e2e8f0}.theme-toggle span{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff}.theme-toggle i{position:absolute;right:5px;top:4px;color:#facc15;font-size:13px}.lang-btn{font-size:20px}.login-card{width:min(540px,calc(100% - 80px))}.login-card h2{text-align:center;margin:0 0 34px;font-size:34px;font-weight:900}.login-tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:26px;border-bottom:2px solid #e5e7eb}.login-tabs button{height:44px;border:0;border-bottom:3px solid transparent;background:transparent;color:#334155;font-size:18px;font-weight:900;cursor:pointer;margin-bottom:-2px}.login-tabs button.active{color:#3b82f6;border-color:#3b82f6}.form-stack{display:grid;gap:20px}.input-line{height:48px;display:flex;align-items:center;gap:12px;padding:0 14px;border:1px solid #cbd5e1;border-radius:3px;color:#94a3b8}.input-line input{flex:1;border:0;outline:none;background:transparent;color:#334155;font-size:15px}.eye{margin-left:auto}.code-line button{border:0;background:transparent;color:#3b82f6;font-weight:900;cursor:pointer}.form-options{display:flex;justify-content:space-between;align-items:center;margin:14px 0 16px;color:#3b82f6;font-weight:800}.form-options input{accent-color:#3b82f6}.form-options button{border:0;background:transparent;color:#3b82f6;font-weight:800;cursor:pointer}.login-btn,.sso-btn{width:100%;height:48px;border-radius:4px;font-size:16px;font-weight:900;cursor:pointer}.login-btn{border:0;background:#3b9df8;color:#fff}.sso-btn{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8}.quick-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:24px}.quick-actions button{height:42px;border:1px solid #cbd5e1;background:#fff;border-radius:4px;color:#334155;font-weight:800;cursor:pointer}@media(max-width:980px){.governance-login-page{grid-template-columns:1fr}.brand-side{display:none}.login-card{width:min(540px,calc(100% - 36px))}}@media(max-width:560px){.login-tabs button{font-size:16px}.quick-actions{grid-template-columns:1fr}.login-card h2{font-size:30px}}
</style>
