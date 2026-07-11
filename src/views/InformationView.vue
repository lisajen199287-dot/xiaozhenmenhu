<script setup lang="ts">
import { computed, ref } from "vue";

const active = ref("活动资讯");
const keyword = ref("");
const categories = ["活动资讯", "培训资讯", "新闻资讯", "政策文件"];
const items = [
  { category:"活动资讯", title:"互联网小镇数字产业供需对接会", summary:"汇聚园区企业、服务机构与产业资源，推动供需精准匹配。", date:"2026-07-09", meta:"报名进行中", image:"/static/images/solutions/webp/park.webp" },
  { category:"活动资讯", title:"直播电商创新应用交流沙龙", summary:"分享数字员工与智能内容生产在直播电商中的实践。", date:"2026-07-05", meta:"线上 + 线下", image:"/static/images/solutions/webp/ecommerce.webp" },
  { category:"培训资讯", title:"企业数据治理与智能运营实战培训", summary:"覆盖数据标准、经营分析和智能问数等核心课程。", date:"2026-07-08", meta:"免费课程", image:"/static/images/solutions/webp/manufacturing.webp" },
  { category:"培训资讯", title:"直播电商数字员工运营训练营", summary:"从数字人配置、脚本生成到直播运营的完整训练。", date:"2026-06-28", meta:"共 6 课时", image:"/static/images/apps/app-digital-human.png" },
  { category:"新闻资讯", title:"小镇平台上线企业服务新版工作台", summary:"进一步整合工单、费用、认证及园企协同服务。", date:"2026-07-06", meta:"平台动态", image:"/static/images/solutions/webp/park.webp" },
  { category:"新闻资讯", title:"数字服务能力持续赋能园区企业", summary:"平台核心应用覆盖更多企业经营与产业协同场景。", date:"2026-06-25", meta:"产业新闻", image:"/static/images/solutions/webp/internet.webp" },
  { category:"政策文件", title:"仓山区数字经济产业扶持政策申报指南", summary:"申报条件、扶持方向、材料清单及办理流程说明。", date:"2026-07-03", meta:"PDF 下载", image:"/static/images/solutions/webp/gov-media.webp" },
  { category:"政策文件", title:"中小企业数字化转型专项支持政策解读", summary:"帮助企业掌握申报要求，充分释放政策红利。", date:"2026-06-20", meta:"政策解读", image:"/static/images/solutions/webp/gov-media.webp" },
];
const visible = computed(() => items.filter(item => item.category === active.value && (!keyword.value || `${item.title}${item.summary}`.includes(keyword.value))));
</script>

<template>
  <main class="info-page">
    <section class="info-hero"><div class="wrapper"><span>PLATFORM INFORMATION</span><h1>平台资讯</h1><p>汇聚活动、培训、行业动态与政策文件，持续连接园区企业和数字产业资源。</p></div></section>
    <section class="wrapper info-content">
      <div class="info-tabs"><button v-for="category in categories" :key="category" :class="{active:active===category}" @click="active=category">{{ category }}</button></div>
      <div class="search-row"><div><i class="fas fa-search"></i><input v-model="keyword" placeholder="搜索标题或关键词" /></div><span>共 {{ visible.length }} 条内容</span></div>
      <div class="info-grid">
        <article v-for="item in visible" :key="item.title">
          <img :src="item.image" :alt="item.title" />
          <div class="info-card-body"><div class="meta"><span>{{ item.category }}</span><time>{{ item.date }}</time></div><h2>{{ item.title }}</h2><p>{{ item.summary }}</p><footer><span>{{ item.meta }}</span><button>{{ active==='政策文件'?'下载文件':'查看详情' }} <i class="fas fa-arrow-right"></i></button></footer></div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.info-page{padding-top:72px;background:#f8fafc;min-height:100vh}.wrapper{width:min(1200px,calc(100% - 48px));margin:auto}.info-hero{padding:86px 0;background:radial-gradient(circle at 75% 20%,rgba(56,189,248,.25),transparent 28%),linear-gradient(120deg,#0f2c68,#1d4ed8);color:#fff}.info-hero span{font-size:12px;letter-spacing:.18em;color:#93c5fd;font-weight:800}.info-hero h1{font-size:44px;margin:12px 0}.info-hero p{max-width:650px;line-height:1.8;color:#dbeafe}.info-content{padding:56px 0 90px}.info-tabs{display:flex;gap:12px;border-bottom:1px solid #e2e8f0}.info-tabs button{padding:15px 22px;border:0;border-bottom:3px solid transparent;background:none;color:#64748b;font-size:16px;font-weight:700;cursor:pointer}.info-tabs button.active{color:#2563eb;border-color:#2563eb}.search-row{display:flex;justify-content:space-between;align-items:center;margin:26px 0}.search-row>div{display:flex;align-items:center;gap:10px;width:360px;padding:11px 15px;border:1px solid #dbeafe;border-radius:8px;background:#fff;color:#94a3b8}.search-row input{width:100%;border:0;outline:0}.search-row>span{color:#94a3b8;font-size:14px}.info-grid{display:grid;grid-template-columns:1fr 1fr;gap:22px}.info-grid article{display:grid;grid-template-columns:210px 1fr;overflow:hidden;background:#fff;border:1px solid #e2e8f0;border-radius:12px;transition:.25s}.info-grid article:hover{transform:translateY(-4px);box-shadow:0 18px 45px rgba(30,64,175,.1)}.info-grid img{width:100%;height:100%;min-height:235px;object-fit:cover}.info-card-body{padding:22px}.meta,footer{display:flex;justify-content:space-between;align-items:center}.meta span,footer>span{font-size:12px;color:#2563eb;font-weight:700}.meta time{font-size:12px;color:#94a3b8}.info-card-body h2{font-size:19px;line-height:1.5;margin:12px 0}.info-card-body p{color:#64748b;font-size:14px;line-height:1.7}.info-card-body footer{margin-top:20px}.info-card-body button{border:0;background:none;color:#2563eb;font-weight:700;cursor:pointer}@media(max-width:850px){.info-grid{grid-template-columns:1fr}}@media(max-width:560px){.wrapper{width:calc(100% - 28px)}.info-hero h1{font-size:36px}.info-tabs{overflow:auto}.info-tabs button{white-space:nowrap}.search-row{align-items:flex-start;gap:12px;flex-direction:column}.search-row>div{width:100%;box-sizing:border-box}.info-grid article{grid-template-columns:1fr}.info-grid img{height:190px;min-height:0}}
</style>
