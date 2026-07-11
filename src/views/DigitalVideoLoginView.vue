<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginMode = ref<"account" | "phone">("account");

const goSsoAuth = () => {
  router.push("/digital-employee/video-auth");
};

const loginPlatform = () => {
  router.push("/digital-employee/video-workbench");
};
</script>

<template>
  <main class="video-login-page">
    <header class="login-header">
      <div class="brand">
        <span class="brand-avatar">
          <img src="/static/images/apps/app-video-ai.png" alt="AIGC短剧一站式创作平台" />
        </span>
        <strong>AIGC短剧一站式创作平台</strong>
      </div>
      <div class="header-tools">
        <button class="theme-switch" aria-label="切换主题"><span></span><i class="fas fa-sun"></i></button>
        <button class="lang-btn" aria-label="语言切换"><i class="fas fa-language"></i></button>
      </div>
    </header>

    <section class="login-shell">
      <div class="welcome-panel">
        <div class="illustration">
          <div class="screen">
            <div class="screen-top"></div>
            <div class="bar-chart">
              <span></span><span></span><span></span><span></span>
            </div>
            <div class="line-list">
              <i></i><i></i><i></i>
            </div>
          </div>
          <div class="lens"><i class="fas fa-search"></i></div>
          <div class="leaf leaf-one"></div>
          <div class="leaf leaf-two"></div>
          <div class="leaf leaf-three"></div>
        </div>
        <h1>欢迎使用本系统</h1>
        <p>电商视频生成与 AIGC 内容创作管理系统</p>
      </div>

      <article class="login-card">
        <h2>登录</h2>
        <div class="login-tabs">
          <button :class="{ active: loginMode === 'account' }" @click="loginMode = 'account'">账号登录</button>
          <button :class="{ active: loginMode === 'phone' }" @click="loginMode = 'phone'">手机号登录</button>
        </div>

        <div class="form-stack" v-if="loginMode === 'account'">
          <label class="input-line">
            <i class="fas fa-building"></i>
            <input value="榕芯科技" aria-label="企业名称" />
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

        <button class="login-btn" @click="loginPlatform">登录</button>
        <button class="sso-btn" @click="goSsoAuth">
          <i class="fas fa-shield-alt"></i>
          SSO 授权登录
        </button>

        <div class="quick-actions">
          <button>手机登录</button>
          <button>二维码登录</button>
          <button>注册</button>
        </div>

        <div class="other-login">
          <span></span>
          <strong>其他登录方式</strong>
          <span></span>
        </div>
        <div class="social-icons">
          <i class="fab fa-weixin"></i>
          <i class="fab fa-dingtalk"></i>
          <i class="fab fa-github"></i>
          <i class="fab fa-alipay"></i>
        </div>
      </article>
    </section>
  </main>
</template>

<style scoped>
.video-login-page{position:relative;min-height:100vh;overflow:hidden;background:radial-gradient(circle at 50% 0%,rgba(56,189,248,.35),transparent 26%),linear-gradient(135deg,#061b7a 0%,#07135f 48%,#02083a 100%);color:#fff}.video-login-page:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 12% 95%,rgba(59,130,246,.18),transparent 18%),radial-gradient(circle at 86% 82%,rgba(30,64,175,.22),transparent 24%);pointer-events:none}.video-login-page:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:72px 72px;opacity:.45}.login-header{position:relative;z-index:2;display:flex;align-items:center;justify-content:space-between;padding:34px 36px}.brand{display:flex;align-items:center;gap:12px;font-size:24px;font-weight:900}.brand-avatar{width:54px;height:54px;border-radius:4px;overflow:hidden;background:#fff}.brand-avatar img{width:100%;height:100%;object-fit:cover}.header-tools{display:flex;align-items:center;gap:16px}.theme-switch,.lang-btn{border:0;background:transparent;color:#dbeafe;cursor:pointer}.theme-switch{position:relative;width:44px;height:22px;border-radius:999px;background:#eff6ff}.theme-switch span{position:absolute;right:3px;top:3px;width:16px;height:16px;border-radius:50%;background:#38bdf8}.theme-switch i{position:absolute;left:6px;top:4px;color:#facc15;font-size:13px}.lang-btn{font-size:20px}.login-shell{position:relative;z-index:1;display:grid;grid-template-columns:minmax(420px,1fr) 520px;gap:86px;align-items:center;width:min(1320px,calc(100% - 80px));min-height:calc(100vh - 130px);margin:0 auto;padding:40px 0 90px}.welcome-panel{display:flex;flex-direction:column;align-items:center;text-align:left}.illustration{position:relative;width:500px;height:310px;margin-bottom:56px}.screen{position:absolute;left:96px;top:64px;width:310px;height:185px;border:10px solid #07135f;border-radius:8px;background:#f8fbff;box-shadow:0 28px 70px rgba(0,0,0,.28)}.screen-top{height:32px;background:linear-gradient(90deg,#e0f2fe,#fff)}.bar-chart{position:absolute;left:50px;bottom:42px;display:flex;align-items:end;gap:12px}.bar-chart span{display:block;width:24px;border-radius:6px 6px 0 0}.bar-chart span:nth-child(1){height:46px;background:#60a5fa}.bar-chart span:nth-child(2){height:78px;background:#2563eb}.bar-chart span:nth-child(3){height:58px;background:#f59e0b}.bar-chart span:nth-child(4){height:92px;background:#0ea5e9}.line-list{position:absolute;right:36px;top:70px;display:grid;gap:11px;width:92px}.line-list i{height:10px;border-radius:999px;background:#bfdbfe}.lens{position:absolute;left:112px;top:28px;display:grid;place-items:center;width:94px;height:94px;border:10px solid #2f6df6;border-radius:50%;background:rgba(255,255,255,.78);color:#2563eb;font-size:34px;transform:rotate(-18deg)}.leaf{position:absolute;border-radius:72% 12% 72% 12%}.leaf-one{right:28px;top:36px;width:80px;height:124px;background:#2563eb;transform:rotate(25deg)}.leaf-two{left:54px;bottom:36px;width:78px;height:118px;background:#1d4ed8;transform:rotate(-46deg)}.leaf-three{right:26px;bottom:44px;width:96px;height:124px;background:#fbbf24;transform:rotate(58deg)}.welcome-panel h1{width:500px;margin:0 0 22px;font-size:34px;line-height:1.2;font-weight:900}.welcome-panel p{width:500px;margin:0;color:#f8fafc;font-size:17px;font-weight:800}.login-card{width:100%;padding:0 10px}.login-card h2{text-align:center;font-size:34px;margin:0 0 38px;font-weight:900}.login-tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:24px;border-bottom:3px solid rgba(226,232,240,.24)}.login-tabs button{height:44px;border:0;background:transparent;color:#cbd5e1;font-size:18px;font-weight:900;cursor:pointer;border-bottom:3px solid transparent;margin-bottom:-3px}.login-tabs button.active{color:#60a5fa;border-color:#38bdf8}.form-stack{display:grid;gap:22px}.input-line{height:48px;display:flex;align-items:center;gap:12px;padding:0 14px;border:1px solid rgba(226,232,240,.18);background:rgba(15,23,42,.18);border-radius:4px;color:#94a3b8}.input-line input{flex:1;border:0;outline:none;background:transparent;color:#fff;font-size:15px}.input-line input::placeholder{color:#94a3b8}.input-line .eye{margin-left:auto}.code-line button{border:0;background:transparent;color:#38bdf8;font-weight:900;cursor:pointer}.form-options{display:flex;justify-content:space-between;align-items:center;margin:16px 0 14px;color:#38bdf8;font-weight:800}.form-options input{accent-color:#3b82f6}.form-options button{border:0;background:transparent;color:#38bdf8;font-weight:800;cursor:pointer}.login-btn,.sso-btn{width:100%;height:48px;border:0;border-radius:4px;color:#fff;font-size:16px;font-weight:900;cursor:pointer}.login-btn{background:linear-gradient(135deg,#22c1ee,#1676f3);box-shadow:0 18px 36px rgba(14,165,233,.22)}.sso-btn{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:14px;background:rgba(37,99,235,.2);border:1px solid rgba(96,165,250,.5)}.quick-actions{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-top:24px}.quick-actions button{height:42px;border:1px solid rgba(226,232,240,.18);background:transparent;color:#e2e8f0;border-radius:4px;font-weight:800;cursor:pointer}.other-login{display:grid;grid-template-columns:1fr auto 1fr;gap:18px;align-items:center;margin-top:36px;color:#e2e8f0}.other-login span{height:1px;background:rgba(226,232,240,.2)}.social-icons{display:grid;grid-template-columns:repeat(4,1fr);justify-items:center;margin-top:24px;color:#94a3b8;font-size:24px}@media(max-width:1024px){.login-shell{grid-template-columns:1fr;gap:46px}.welcome-panel{display:none}.login-card{max-width:520px;margin:0 auto}}@media(max-width:560px){.login-header{padding:24px 18px}.brand strong{font-size:18px}.login-shell{width:min(100% - 32px,520px);min-height:calc(100vh - 100px);padding:20px 0 50px}.login-card h2{font-size:30px}.quick-actions{grid-template-columns:1fr}}
</style>
