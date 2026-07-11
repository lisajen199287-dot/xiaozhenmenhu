<script setup lang="ts">
const topMenus = ["首页", "建筑", "招商", "租客", "合同", "财务", "办公", "物业", "应用", "智慧物联", "数据中心", "系统管理"];
const tabs = ["首页", "线索管理", "租控管理", "数据总览", "用户管理", "智能水表"];
const stats = [
  { icon: "fa-user-clock", title: "合同待审核", value: "4", color: "#3b82f6" },
  { icon: "fa-bookmark", title: "合同即将到期", value: "0", color: "#fb923c" },
  { icon: "fa-sliders", title: "招商线索待跟进", value: "0", color: "#34d399" },
  { icon: "fa-file-invoice-dollar", title: "通用审批待处理", value: "0", color: "#a78bfa" },
  { icon: "fa-clipboard-list", title: "待办任务", value: "1", color: "#fb7185" },
  { icon: "fa-money-check-dollar", title: "待催缴账单数", value: "16", color: "#60a5fa" },
];
const functions = [
  ["fa-building-user", "租控管理", "流程、成本、经营分析"],
  ["fa-building-circle-check", "租客列表", "信息聚合、服务跟进"],
  ["fa-receipt", "所有账单", "查询、统计或财务跟进"],
  ["fa-droplet", "智能水表", "计量精准、管控高效"],
  ["fa-list-check", "园区管理", "园区、楼宇概况"],
  ["fa-users-gear", "租客员工管理", "别名、租客子账号"],
  ["fa-file-contract", "合同列表", "条款、日期、租金管理"],
  ["fa-screwdriver-wrench", "物业报修", "线上提交报修工单"],
  ["fa-route", "线索管理", "集中管理和分配"],
  ["fa-paint-roller", "装修申请", "高效协调楼宇装修"],
  ["fa-address-book", "访客管理", "线上或线下渠道登记"],
  ["fa-calendar-check", "访客预约", "访客申请出入园区"],
  ["fa-box-open", "物品放行", "控制物品出入园区"],
  ["fa-clipboard-check", "任务", "数据管理任务、服务跟踪"],
  ["fa-location-dot", "智能电表", "智能计量、高效管理"],
  ["fa-handshake", "意向客户", "精准追踪、转化跟进"],
  ["fa-city", "建筑管理", "信息整合、管理协同"],
  ["fa-calendar-days", "场地预约", "资源统筹、使用审批"],
  ["fa-file-circle-check", "收入列表", "明细清晰、来源可查"],
  ["fa-chart-simple", "大数据支撑平台", "数据汇聚、智能分析"],
  ["fa-shield-halved", "智能安防", "支持云台管理"],
  ["fa-building-circle-arrow-right", "建筑集合", "整合园区建筑体系"],
  ["fa-square-poll-horizontal", "投票问卷", "发起投票问卷"],
  ["fa-calendar", "日程", "统筹规划、时间安排"],
];
const days = ["日","一","二","三","四","五","六"];
const calendar = ["28","29","30","01","02","03","04","05","06","07","08","09","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","01"];
</script>

<template>
  <main class="workbench-page">
    <header class="workbench-topbar">
      <div class="park-brand">
        <div class="brand-mark"><i class="fas fa-building"></i></div>
        <div>
          <strong>互联网小镇智慧园区</strong>
          <span>选择 7 楼宇 <i class="fas fa-caret-right"></i></span>
        </div>
      </div>
      <nav class="main-menu">
        <button v-for="menu in topMenus" :key="menu" :class="{ active: menu === '首页' }">{{ menu }}</button>
      </nav>
      <div class="top-icons">
        <i class="fas fa-expand"></i>
        <i class="fas fa-bell"><em></em></i>
        <i class="fas fa-sliders"></i>
      </div>
    </header>

    <div class="tabbar">
      <span class="collapse"><i class="fas fa-angles-left"></i></span>
      <button v-for="tab in tabs" :key="tab" :class="{ active: tab === '首页' }">
        <i class="far" :class="tab === '首页' ? 'fa-house' : 'fa-circle'"></i>{{ tab }}<b v-if="tab !== '首页'">×</b>
      </button>
      <span class="tab-actions"><i class="fas fa-angles-right"></i><i class="fas fa-rotate-right"></i><i class="fas fa-table-cells"></i></span>
    </div>

    <section class="workbench-body">
      <div class="main-column">
        <div class="stats-grid">
          <article v-for="item in stats" :key="item.title" class="stat-card">
            <div class="stat-icon" :style="{ '--iconColor': item.color }"><i class="fas" :class="item.icon"></i></div>
            <div><h3>{{ item.title }}</h3><strong>{{ item.value }}</strong></div>
            <a>详情 &gt;</a>
          </article>
        </div>

        <section class="blue-banner">
          <div>
            <h1>智慧园区工作台</h1>
            <p>助力企业实现高效益</p>
          </div>
          <time>2026-07-10　星期五</time>
          <div class="banner-device">
            <span></span><span></span><span></span>
          </div>
        </section>

        <section class="function-panel">
          <div class="panel-head">
            <h2><i class="fas fa-cube"></i> 常用功能</h2>
            <button><i class="fas fa-table-cells-large"></i> 自定义</button>
          </div>
          <div class="function-grid">
            <article v-for="item in functions" :key="item[1]" class="function-card">
              <div class="func-icon"><i class="fas" :class="item[0]"></i></div>
              <div><h3>{{ item[1] }}</h3><p>{{ item[2] }}</p></div>
            </article>
          </div>
        </section>
      </div>

      <aside class="side-column">
        <section class="side-card calendar-card">
          <h2><i class="fas fa-calendar-days"></i> 日程安排</h2>
          <div class="calendar-head"><strong>2026 年 7 月</strong><span><button>上个月</button><button>今天</button><button>下个月</button></span></div>
          <div class="calendar-week"><span v-for="day in days" :key="day">{{ day }}</span></div>
          <div class="calendar-grid">
            <span v-for="day in calendar" :key="day + Math.random()" :class="{ muted: ['28','29','30','01'].includes(day) && calendar.indexOf(day) < 4, today: day === '10', marked: day === '02' }">{{ day }}</span>
          </div>
        </section>
        <section class="side-card todo-card">
          <h2><i class="fas fa-clipboard-check"></i> 待办任务 <a>更多</a></h2>
          <div class="todo-item">
            <div><i class="fas fa-calendar-check"></i></div>
            <div><h3>测试</h3><p><i class="fas fa-user"></i> 超级管理员</p></div>
            <time>2026-07-31 23:59:59 截止</time>
          </div>
        </section>
      </aside>
    </section>
    <button class="float-setting"><i class="fas fa-gear"></i></button>
  </main>
</template>

<style scoped>
.workbench-page{min-height:100vh;background:#f3f6fb;color:#303133;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.workbench-topbar{height:76px;display:grid;grid-template-columns:305px 1fr auto;align-items:center;background:linear-gradient(90deg,#1d4fb7,#1689ee);color:#fff}.park-brand{height:100%;display:flex;align-items:center;gap:14px;padding:0 18px;background:#1d4fb7}.brand-mark{display:grid;place-items:center;width:58px;height:58px;border-radius:50%;background:#fff;color:#1d4fb7;font-size:30px}.park-brand strong{display:block;font-size:21px;letter-spacing:.02em}.park-brand span{display:block;margin-top:8px;color:#dbeafe;font-size:14px;font-weight:700}.main-menu{height:100%;display:flex;align-items:stretch;overflow:hidden}.main-menu button{min-width:92px;border:0;background:transparent;color:rgba(255,255,255,.72);font-size:18px;font-weight:800;cursor:pointer}.main-menu button.active{background:#eaf5ff;color:#1689ee}.top-icons{display:flex;gap:24px;align-items:center;padding:0 26px;font-size:20px}.top-icons i{position:relative}.top-icons em{position:absolute;right:-4px;top:-7px;width:10px;height:10px;border-radius:50%;background:#ff6b6b;border:2px solid #fff}.tabbar{height:50px;display:flex;align-items:center;background:#fff;border-bottom:1px solid #e6ebf2;color:#7a8493;box-shadow:0 2px 7px rgba(31,45,61,.04)}.tabbar button{height:100%;min-width:132px;border:0;border-right:1px solid #eef2f6;background:#fff;color:#6b7280;font-size:15px;font-weight:700}.tabbar button.active{background:#edf6ff;color:#1689ee;border-radius:0 0 16px 16px}.tabbar i{margin-right:8px}.tabbar b{margin-left:12px;color:#9aa3af}.collapse,.tab-actions{display:flex;align-items:center;gap:24px;padding:0 16px;font-size:18px}.tab-actions{margin-left:auto}.workbench-body{display:grid;grid-template-columns:minmax(0,1fr) 490px;gap:20px;padding:20px 16px 28px}.stats-grid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:20px;margin-bottom:20px}.stat-card{position:relative;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:16px;min-height:104px;padding:18px;border-radius:14px;background:#fff;box-shadow:0 8px 22px rgba(31,45,61,.06)}.stat-icon{display:grid;place-items:center;width:64px;height:64px;border-radius:50%;background:color-mix(in srgb,var(--iconColor) 12%,white);color:var(--iconColor);font-size:26px}.stat-card h3{font-size:17px;margin:0 0 10px;color:#343a46}.stat-card strong{font-size:30px;line-height:1}.stat-card a{color:#1689ee;font-weight:800}.blue-banner{position:relative;overflow:hidden;display:flex;justify-content:space-between;min-height:210px;margin-bottom:20px;padding:42px 52px;border-radius:8px;background:linear-gradient(135deg,#328cff,#0065f5);color:#fff}.blue-banner:before{content:"";position:absolute;inset:0;background:radial-gradient(circle at 42% 0%,rgba(255,255,255,.18),transparent 38%)}.blue-banner h1{position:relative;z-index:1;font-size:42px;margin:28px 0 26px}.blue-banner p{position:relative;z-index:1;font-size:24px;margin:0}.blue-banner time{position:relative;z-index:1;font-size:16px;font-weight:800}.banner-device{position:absolute;right:110px;bottom:10px;width:260px;height:170px;border-radius:26px;background:rgba(255,255,255,.28);box-shadow:inset 0 0 0 10px rgba(255,255,255,.22)}.banner-device span{position:absolute;border-radius:8px;background:rgba(255,255,255,.38)}.banner-device span:nth-child(1){left:28px;top:34px;width:80px;height:82px;background:#2084ff}.banner-device span:nth-child(2){right:32px;top:48px;width:48px;height:112px}.banner-device span:nth-child(3){left:30px;bottom:24px;width:150px;height:22px}.function-panel,.side-card{background:#fff;border-radius:10px;box-shadow:0 8px 22px rgba(31,45,61,.05)}.panel-head{display:flex;justify-content:space-between;align-items:center;padding:22px 24px}.panel-head h2,.side-card h2{margin:0;font-size:20px}.panel-head h2 i,.side-card h2 i{display:inline-grid;place-items:center;width:42px;height:42px;margin-right:12px;border-radius:12px;background:#3b8cff;color:#fff}.panel-head button{border:0;background:transparent;color:#1689ee;font-size:18px;font-weight:900}.function-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:20px;padding:0 24px 28px}.function-card{display:grid;grid-template-columns:56px 1fr;gap:16px;align-items:center;min-height:98px;padding:16px;border-radius:8px;background:#fff;box-shadow:0 4px 18px rgba(31,45,61,.1)}.func-icon{display:grid;place-items:center;width:54px;height:54px;border-radius:12px;background:linear-gradient(135deg,#2d8cff,#27d4c3);color:#fff;font-size:24px}.function-card:nth-child(3n) .func-icon{background:linear-gradient(135deg,#ff4d5e,#ff9630)}.function-card:nth-child(4n) .func-icon{background:linear-gradient(135deg,#8957ff,#39b6ff)}.function-card h3{margin:0 0 8px;font-size:18px}.function-card p{margin:0;color:#7a8493;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.side-column{display:grid;gap:20px;align-content:start}.side-card{padding:24px}.calendar-head{display:flex;justify-content:space-between;align-items:center;margin:22px 0}.calendar-head button{border:1px solid #e5e7eb;background:#fff;color:#6b7280;padding:6px 10px}.calendar-week,.calendar-grid{display:grid;grid-template-columns:repeat(7,1fr);text-align:center}.calendar-week{color:#6b7280;font-weight:900;margin-bottom:10px}.calendar-grid span{position:relative;display:grid;place-items:center;height:52px;font-weight:800}.calendar-grid .muted{color:#b8c0cc}.calendar-grid .today:before,.calendar-grid .marked:before{content:"";position:absolute;width:54px;height:54px;border-radius:50%;z-index:0}.calendar-grid .today:before{background:#d7e5ff}.calendar-grid .marked:before{background:#ffd9aa}.calendar-grid span{z-index:1}.calendar-grid span::after{content:attr(class);display:none}.todo-card h2{display:flex;align-items:center}.todo-card h2 a{margin-left:auto;color:#1689ee;font-size:16px}.todo-item{display:grid;grid-template-columns:64px 1fr auto;gap:16px;align-items:center;margin-top:24px}.todo-item>div:first-child{display:grid;place-items:center;width:64px;height:64px;border-radius:12px;background:#e6faf3;color:#24c38b;font-size:28px}.todo-item h3{margin:0 0 8px}.todo-item p{margin:0;color:#52606f;font-weight:800}.todo-item p i{color:#3b82f6}.todo-item time{color:#9aa3af;font-weight:800}.float-setting{position:fixed;right:0;top:50%;width:54px;height:54px;border:0;border-radius:8px 0 0 8px;background:#2d8cff;color:#fff;font-size:22px;box-shadow:0 10px 25px rgba(45,140,255,.3)}@media(max-width:1400px){.stats-grid{grid-template-columns:repeat(3,1fr)}.function-grid{grid-template-columns:repeat(4,1fr)}.workbench-body{grid-template-columns:1fr}.side-column{grid-template-columns:1fr 1fr}}@media(max-width:900px){.workbench-topbar{grid-template-columns:1fr;height:auto}.park-brand{height:76px}.main-menu{overflow-x:auto;height:64px}.top-icons{position:absolute;right:0;top:0;height:76px}.tabbar{overflow-x:auto}.workbench-body{padding:14px;grid-template-columns:1fr}.stats-grid,.function-grid,.side-column{grid-template-columns:1fr}.blue-banner{padding:28px;min-height:260px}.blue-banner h1{font-size:32px}.banner-device{opacity:.35;right:20px}}
</style>
