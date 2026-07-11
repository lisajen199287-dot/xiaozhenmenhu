<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginMode = ref<"account" | "phone">("account");

const goSsoAuth = () => {
  router.push("/ecommerce-ask/auth");
};
</script>

<template>
  <main class="ask-login-page">
    <section class="brand-side">
      <header class="system-brand">
        <img src="/static/images/apps/app-ecommerce-ai.png" alt="电商智能问数系统" />
        <strong>电商智能问数系统</strong>
      </header>

      <div class="welcome-visual">
        <div class="screen">
          <div class="screen-top"></div>
          <div class="bar-chart"><span></span><span></span><span></span><span></span></div>
          <div class="line-list"><i></i><i></i><i></i></div>
        </div>
        <div class="lens"><i class="fas fa-search"></i></div>
        <div class="leaf leaf-one"></div>
        <div class="leaf leaf-two"></div>
        <div class="leaf leaf-three"></div>
      </div>

      <div class="welcome-copy">
        <h1>欢迎使用本系统</h1>
        <p>电商经营数据智能问数与分析系统</p>
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
          <label class="input-line">
            <i class="far fa-building"></i>
            <input value="电商智能问数系" aria-label="系统名称" />
          </label>
          <label class="input-line">
            <i class="fas fa-user"></i>
            <input value="admin" aria-label="账号" />
          </label>
          <label class="input-line">
            <i class="fas fa-lock"></i>
            <input type="password" value="12345678" aria-label="密码" />
            <i class="fas fa-eye-slash eye"></i>
          </label>
        </div>

        <div class="form-stack" v-else>
          <label class="input-line">
            <i class="fas fa-mobile-alt"></i>
            <input placeholder="请输入手机号" aria-label="手机号" />
          </label>
          <label class="input-line code-line">
            <i class="fas fa-shield-alt"></i>
            <input placeholder="请输入验证码" aria-label="验证码" />
            <button>获取验证码</button>
          </label>
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

        <div class="social-line">
          <span></span><strong>其他登录方式</strong><span></span>
        </div>
        <div class="social-icons">
          <i class="fab fa-weixin"></i>
          <i class="fab fa-dingtalk"></i>
          <i class="fab fa-github"></i>
          <i class="fab fa-alipay"></i>
          <i class="fas fa-robot active"></i>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.ask-login-page{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:#fff;color:#0f172a}.brand-side{position:relative;overflow:hidden;display:flex;flex-direction:column;min-height:100vh;padding:34px 36px 88px;background:#334155;color:#fff}.system-brand{display:flex;align-items:center;gap:12px;font-size:22px;font-weight:900}.system-brand img{width:54px;height:54px;border-radius:4px;object-fit:cover}.welcome-visual{position:relative;width:500px;height:320px;margin:auto auto 46px}.screen{position:absolute;left:96px;top:72px;width:310px;height:185px;border:10px solid #07135f;border-radius:8px;background:#f8fbff;box-shadow:0 28px 70px rgba(0,0,0,.22)}.screen-top{height:32px;background:linear-gradient(90deg,#e0f2fe,#fff)}.bar-chart{position:absolute;left:50px;bottom:42px;display:flex;align-items:end;gap:12px}.bar-chart span{display:block;width:24px;border-radius:6px 6px 0 0}.bar-chart span:nth-child(1){height:46px;background:#60a5fa}.bar-chart span:nth-child(2){height:78px;background:#2563eb}.bar-chart span:nth-child(3){height:58px;background:#ef4444}.bar-chart span:nth-child(4){height:92px;background:#0ea5e9}.line-list{position:absolute;right:36px;top:70px;display:grid;gap:11px;width:92px}.line-list i{height:10px;border-radius:999px;background:#bfdbfe}.lens{position:absolute;left:112px;top:36px;display:grid;place-items:center;width:94px;height:94px;border:10px solid #2f6df6;border-radius:50%;background:rgba(255,255,255,.78);color:#2563eb;font-size:34px;transform:rotate(-18deg)}.leaf{position:absolute;border-radius:72% 12% 72% 12%}.leaf-one{right:28px;top:46px;width:80px;height:124px;background:#2563eb;transform:rotate(25deg)}.leaf-two{left:54px;bottom:36px;width:78px;height:118px;background:#1d4ed8;transform:rotate(-46deg)}.leaf-three{right:26px;bottom:44px;width:96px;height:124px;background:#fbbf24;transform:rotate(58deg)}.welcome-copy{width:500px;margin:0 auto}.welcome-copy h1{margin:0 0 18px;font-size:34px;font-weight:900}.welcome-copy p{margin:0;color:#f8fafc;font-size:17px;font-weight:800}.form-side{position:relative;display:grid;place-items:center;min-height:100vh;background:#fff}.top-tools{position:absolute;right:36px;top:42px;display:flex;align-items:center;gap:16px}.theme-toggle,.lang-btn{border:0;background:transparent;color:#64748b;cursor:pointer}.theme-toggle{position:relative;width:42px;height:22px;border-radius:999px;background:#e2e8f0}.theme-toggle span{position:absolute;left:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#fff}.theme-toggle i{position:absolute;right:5px;top:4px;color:#facc15;font-size:13px}.lang-btn{font-size:20px}.login-card{width:min(540px,calc(100% - 80px))}.login-card h2{text-align:center;margin:0 0 34px;font-size:34px;font-weight:900}.login-tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:26px;border-bottom:2px solid #e5e7eb}.login-tabs button{height:44px;border:0;border-bottom:3px solid transparent;background:transparent;color:#334155;font-size:18px;font-weight:900;cursor:pointer;margin-bottom:-2px}.login-tabs button.active{color:#3b82f6;border-color:#3b82f6}.form-stack{display:grid;gap:20px}.input-line{height:48px;display:flex;align-items:center;gap:12px;padding:0 14px;border:1px solid #cbd5e1;border-radius:3px;color:#94a3b8}.input-line input{flex:1;border:0;outline:none;background:transparent;color:#334155;font-size:15px}.eye{margin-left:auto}.code-line button{border:0;background:transparent;color:#3b82f6;font-weight:900;cursor:pointer}.form-options{display:flex;justify-content:space-between;align-items:center;margin:14px 0 16px;color:#3b82f6;font-weight:800}.form-options input{accent-color:#3b82f6}.form-options button{border:0;background:transparent;color:#3b82f6;font-weight:800;cursor:pointer}.login-btn,.sso-btn{width:100%;height:48px;border-radius:4px;font-size:16px;font-weight:900;cursor:pointer}.login-btn{border:0;background:#3b9df8;color:#fff}.sso-btn{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:12px;border:1px solid #bfdbfe;background:#eff6ff;color:#1d4ed8}.quick-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:24px}.quick-actions button{height:42px;border:1px solid #cbd5e1;background:#fff;border-radius:4px;color:#334155;font-weight:800;cursor:pointer}.social-line{display:grid;grid-template-columns:1fr auto 1fr;gap:18px;align-items:center;margin-top:44px;color:#64748b}.social-line span{height:1px;background:#e2e8f0}.social-icons{display:grid;grid-template-columns:repeat(5,1fr);justify-items:center;margin-top:24px;color:#9ca3af;font-size:24px}.social-icons .active{color:#3b82f6}@media(max-width:980px){.ask-login-page{grid-template-columns:1fr}.brand-side{display:none}.login-card{width:min(540px,calc(100% - 36px))}}@media(max-width:560px){.login-tabs button{font-size:16px}.quick-actions{grid-template-columns:1fr}.login-card h2{font-size:30px}}
</style>
