<script setup lang="ts">
const menuItems = [
  { icon: "fa-home", label: "首页", active: true },
  { icon: "fa-pen-nib", label: "创作空间" },
  { icon: "fa-folder-open", label: "项目管理" },
  { icon: "fa-database", label: "企业资产库管理" },
  { icon: "fa-list-check", label: "操作日志" },
  { icon: "fa-user", label: "用户管理" },
  { icon: "fa-chart-pie", label: "资源使用统计" },
  { icon: "fa-gear", label: "系统管理" },
];
</script>

<template>
  <main class="video-workbench">
    <header class="system-nav">
      <div class="system-brand">
        <img src="/static/images/apps/app-video-ai.png" alt="AIGC短剧一站式创作平台" />
        <strong>AIGC短剧一站式创作平台</strong>
      </div>
      <nav class="system-menu">
        <button v-for="item in menuItems" :key="item.label" :class="{ active: item.active }">
          <i :class="['fas', item.icon]"></i>
          {{ item.label }}
          <i v-if="item.label === '系统管理'" class="fas fa-chevron-down arrow"></i>
        </button>
      </nav>
      <div class="system-tools">
        <button><i class="fas fa-expand"></i></button>
        <button><i class="fas fa-search"></i></button>
        <button><i class="fas fa-text-height"></i></button>
        <button><i class="fas fa-language"></i></button>
        <button class="notice"><i class="fas fa-bell"></i></button>
        <div class="user-chip">
          <span>庄宇</span>
        </div>
      </div>
    </header>

    <section class="hero-stage">
      <div class="stage-overlay"></div>
      <div class="stage-content">
        <h1>AIGC短剧一站式创作平台</h1>
        <button>进入工作台</button>
      </div>
      <button class="float-setting"><i class="fas fa-gear"></i></button>
    </section>
  </main>
</template>

<style scoped>
.video-workbench{min-height:100vh;background:#020617;color:#fff;overflow:hidden}.system-nav{height:78px;display:grid;grid-template-columns:300px minmax(0,1fr) 320px;align-items:center;background:#111;border-bottom:1px solid rgba(255,255,255,.1)}.system-brand{height:78px;display:flex;align-items:center;gap:12px;padding:0 22px;background:#02172a;color:#dbeafe;font-size:18px;font-weight:900}.system-brand img{width:44px;height:44px;border-radius:4px;object-fit:cover}.system-menu{height:100%;display:flex;align-items:center;overflow:auto}.system-menu button{height:100%;display:flex;align-items:center;gap:8px;padding:0 24px;border:0;border-bottom:2px solid transparent;background:transparent;color:#e5e7eb;font-size:15px;font-weight:900;white-space:nowrap;cursor:pointer}.system-menu button.active{background:rgba(255,255,255,.04);border-color:#fff;color:#fff}.system-menu .arrow{font-size:12px;margin-left:2px}.system-tools{height:78px;display:flex;align-items:center;justify-content:flex-end;gap:18px;padding:0 18px;background:#02172a}.system-tools button{border:0;background:transparent;color:#e2e8f0;font-size:16px;cursor:pointer}.notice{position:relative}.notice:after{content:"";position:absolute;right:-1px;top:0;width:8px;height:8px;border-radius:50%;background:#ff6b6b}.user-chip{display:flex;align-items:center;gap:10px;font-weight:900}.user-chip:before{content:"";width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#5eead4,#60a5fa)}.hero-stage{position:relative;min-height:calc(100vh - 78px);display:grid;place-items:center;overflow:hidden;background:#08236c}.hero-stage:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 50% 55%,rgba(37,99,235,.35),transparent 25%),linear-gradient(145deg,rgba(88,28,135,.72),rgba(37,99,235,.8) 52%,rgba(6,182,212,.62));mix-blend-mode:screen}.hero-stage:after{content:"";position:absolute;inset:0;background-image:url('/static/images/apps/app-video-ai.png');background-size:cover;background-position:center;opacity:.2;filter:blur(1px) saturate(1.2)}.stage-overlay{position:absolute;inset:0;background:radial-gradient(circle at 42% 90%,rgba(6,182,212,.36),transparent 22%),radial-gradient(circle at 6% 72%,rgba(168,85,247,.3),transparent 18%),linear-gradient(180deg,rgba(2,6,23,.35),rgba(2,6,23,.08) 52%,rgba(2,6,23,.22))}.stage-content{position:relative;z-index:2;text-align:center;transform:translateY(-18px)}.stage-content h1{margin:0 0 42px;font-size:46px;letter-spacing:.04em;text-shadow:0 8px 28px rgba(0,0,0,.28)}.stage-content button{height:42px;padding:0 28px;border:0;border-radius:10px;background:linear-gradient(135deg,#c084fc,#818cf8);color:#111827;font-size:15px;font-weight:900;cursor:pointer;box-shadow:0 18px 44px rgba(129,140,248,.32)}.float-setting{position:absolute;right:0;top:43%;z-index:3;width:50px;height:42px;border:0;border-radius:8px 0 0 8px;background:#3b82f6;color:#fff;font-size:18px;cursor:pointer}@media(max-width:1180px){.system-nav{grid-template-columns:260px minmax(0,1fr) 220px}.system-menu button{padding:0 16px}.system-tools{gap:12px}.system-tools button:nth-child(2),.system-tools button:nth-child(3){display:none}}@media(max-width:820px){.system-nav{height:auto;grid-template-columns:1fr}.system-brand,.system-tools{height:64px}.system-menu{height:58px;order:3}.hero-stage{min-height:calc(100vh - 186px)}.stage-content h1{font-size:32px}.system-tools{justify-content:flex-start}}@media(max-width:560px){.system-brand strong{font-size:16px}.stage-content h1{font-size:26px}.system-menu button{padding:0 14px;font-size:14px}}
</style>
