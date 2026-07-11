<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginMode = ref<"account" | "phone">("account");
const rememberMe = ref(true);

const submitLogin = () => {
  router.push("/park-collaboration/workbench");
};

const goSsoAuth = () => {
  router.push("/park-collaboration/auth");
};
</script>

<template>
  <main class="park-login-page">
    <section class="login-shell">
      <div class="visual-panel">
        <div class="visual-overlay"></div>
        <div class="visual-logo">
          <i class="fas fa-building"></i>
        </div>
      </div>

      <section class="login-panel">
        <header class="login-brand">
          <div class="brand-icon"><i class="fas fa-building"></i></div>
          <h1>互联网小镇智慧园区</h1>
        </header>

        <div class="login-tabs">
          <button :class="{ active: loginMode === 'account' }" @click="loginMode = 'account'">账号登录</button>
          <button :class="{ active: loginMode === 'phone' }" @click="loginMode = 'phone'">手机号登录</button>
        </div>

        <form class="login-form" @submit.prevent="submitLogin">
          <label v-if="loginMode === 'account'" class="input-row">
            <i class="fas fa-user"></i>
            <input value="admin" aria-label="账号" />
          </label>
          <label v-else class="input-row">
            <i class="fas fa-mobile-screen"></i>
            <input value="13800000000" aria-label="手机号" />
          </label>

          <label class="input-row">
            <i class="fas fa-lock"></i>
            <input :value="loginMode === 'account' ? '••••••••' : '123456'" aria-label="密码或验证码" />
            <i class="far fa-eye-slash trailing"></i>
          </label>

          <label class="remember-row">
            <input v-model="rememberMe" type="checkbox" />
            <span>记住我</span>
          </label>

          <button class="login-btn" type="submit">登录</button>
          <button class="sso-btn" type="button" @click="goSsoAuth">
            <i class="fas fa-shield-halved"></i>
            SSO 授权登录
          </button>
        </form>
      </section>
    </section>
  </main>
</template>

<style scoped>
.park-login-page{min-height:100vh;display:grid;place-items:center;overflow:hidden;background:radial-gradient(circle at 52% 0%,rgba(91,178,255,.55),transparent 24%),linear-gradient(145deg,#071b73 0%,#082ea8 45%,#061267 100%);color:#172033}.park-login-page:before{content:"";position:fixed;inset:0;background-image:radial-gradient(circle,rgba(56,189,248,.5) 1px,transparent 2px),linear-gradient(135deg,rgba(255,255,255,.08) 1px,transparent 1px);background-size:76px 76px,180px 180px;opacity:.35;pointer-events:none}.login-shell{position:relative;z-index:1;display:grid;grid-template-columns:1.08fr .98fr;width:min(1320px,calc(100% - 120px));min-height:650px;border-radius:8px;overflow:hidden;box-shadow:0 36px 120px rgba(0,10,70,.38)}.visual-panel{position:relative;display:grid;place-items:center;background:linear-gradient(rgba(0,34,166,.72),rgba(0,34,166,.86)),url("/static/images/solutions/webp/park.webp");background-size:cover;background-position:center}.visual-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(13,39,150,.68),rgba(5,22,112,.38))}.visual-logo{position:relative;z-index:1;display:grid;place-items:center;width:172px;height:172px;border:14px solid #fff;border-radius:50%;color:#fff;font-size:82px;box-shadow:0 24px 60px rgba(0,0,0,.28)}.visual-logo:after{content:"";position:absolute;right:-22px;bottom:10px;width:54px;height:18px;border-radius:999px;background:#fff;transform:rotate(45deg)}.login-panel{display:flex;flex-direction:column;justify-content:center;padding:58px 72px;background:#fff}.login-brand{display:flex;align-items:center;gap:28px;margin-bottom:52px}.brand-icon{display:grid;place-items:center;width:66px;height:66px;border-radius:50%;background:linear-gradient(135deg,#1d7cff,#25c4ff);color:#fff;font-size:34px}.login-brand h1{margin:0;color:#4a4a4a;font-size:38px;font-weight:900;letter-spacing:.02em}.login-tabs{display:grid;grid-template-columns:1fr 1fr;margin-bottom:22px;border-bottom:2px solid #e5e7eb}.login-tabs button{height:54px;border:0;background:transparent;color:#4a5568;font-size:20px;font-weight:800;cursor:pointer;border-bottom:3px solid transparent}.login-tabs button.active{color:#2d8cff;border-bottom-color:#4aa3ff}.login-form{display:grid;gap:20px}.input-row{height:56px;display:grid;grid-template-columns:42px 1fr 38px;align-items:center;border:1px solid #d7dce5;border-radius:4px;background:#fff;color:#a0a6b1}.input-row input{border:0;outline:0;font-size:17px;color:#606266;background:transparent}.input-row .trailing{justify-self:center}.remember-row{display:flex;align-items:center;gap:10px;color:#4aa3ff;font-size:18px;font-weight:800}.remember-row input{width:20px;height:20px;accent-color:#4aa3ff}.login-btn,.sso-btn{height:56px;border:0;border-radius:5px;color:#fff;font-size:18px;font-weight:900;cursor:pointer}.login-btn{background:linear-gradient(90deg,#26c3ee,#1679ee);box-shadow:0 14px 28px rgba(31,132,255,.22)}.sso-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:linear-gradient(90deg,#1d4ed8,#38bdf8)}@media(max-width:980px){.login-shell{grid-template-columns:1fr;width:min(100% - 40px,720px)}.visual-panel{min-height:260px}.login-panel{padding:42px 34px}.login-brand h1{font-size:30px}}@media(max-width:560px){.park-login-page{place-items:start;padding:24px 0}.login-shell{width:calc(100% - 24px)}.visual-logo{width:128px;height:128px;font-size:60px}.login-brand{gap:16px;margin-bottom:34px}.brand-icon{width:54px;height:54px}.login-brand h1{font-size:24px}.login-tabs button{font-size:16px}.login-panel{padding:34px 22px}}
</style>
