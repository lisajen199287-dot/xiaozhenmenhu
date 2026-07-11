<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goConsole = () => { window.location.href = "/console.html#/profile"; };
const openModule = (item: { route?: string }) => {
  if (item.route) {
    router.push(item.route);
    return;
  }
  goConsole();
};
const activeSlide = ref(0);
const activeNews = ref("全部");

const slides = [
  { eyebrow: "园企协同平台", title: "连接园区与企业，共建数字产业新生态", desc: "汇聚政策、服务与产业资源，为园区企业提供一站式协同服务。", image: "/static/images/solutions/webp/park.webp" },
  { eyebrow: "数据治理智能体", title: "让企业数据真正参与经营决策", desc: "以可信数据底座连接业务场景，快速发现问题、洞察趋势。", image: "/static/images/solutions/webp/manufacturing.webp" },
  { eyebrow: "电商运营全链路问数", title: "一句话洞察经营，驱动电商增长", desc: "覆盖商品、流量、转化与复购的全链路智能分析。", image: "/static/images/solutions/webp/ecommerce.webp" },
  { eyebrow: "直播电商数字员工", title: "数字员工赋能直播电商全流程", desc: "从内容生产到直播运营，帮助企业持续提升服务效率。", image: "/static/images/apps/app-digital-human.png" },
  { eyebrow: "可信数据接入连接器", title: "安全连接多源数据，打通可信业务链路", desc: "面向企业、园区和第三方系统提供标准化数据接入、授权流转与可信交换能力。", image: "/static/images/solutions/webp/internet.webp" },
];

const modules = [
  { icon: "fa-chart-line", title: "电商运营全链路问数系统", desc: "用自然语言查询经营数据，快速定位增长机会。", image: "/static/images/solutions/webp/ecommerce.webp", route: "/ecommerce-ask" },
  { icon: "fa-user-astronaut", title: "直播电商数字员工系统", desc: "提供数字人直播、内容生成与智能运营能力。", image: "/static/images/apps/app-digital-human.png", route: "/digital-employee" },
  { icon: "fa-database", title: "数据治理智能体", desc: "面向企业数据治理、分析与决策的智能服务中枢。", image: "/static/images/solutions/webp/manufacturing.webp", route: "/data-governance" },
  { icon: "fa-shield-halved", title: "可信数据接入连接器", desc: "支持多源数据安全接入、授权流转、可信交换与接口连接。", image: "/static/images/solutions/webp/internet.webp", route: "/trusted-connector" },
  { icon: "fa-building", title: "园企协同平台", desc: "园区服务、企业诉求、资源对接与政策触达一体化。", image: "/static/images/solutions/webp/park.webp", route: "/park-collaboration", featured: true },
];

const parkFeatureTags = ["企业诉求闭环", "政策精准触达", "资源对接撮合", "园区服务协同"];

const news = [
  { id: 1, type: "活动资讯", title: "互联网小镇数字产业供需对接会开放报名", date: "2026-07-09", image: "/static/images/solutions/webp/park.webp" },
  { id: 2, type: "培训资讯", title: "企业数据治理与智能运营实战培训即将开课", date: "2026-07-08", image: "/static/images/solutions/webp/manufacturing.webp" },
  { id: 3, type: "新闻资讯", title: "小镇平台新增直播电商数字员工服务能力", date: "2026-07-06", image: "/static/images/apps/app-digital-human.png" },
  { id: 4, type: "政策文件", title: "仓山区数字经济产业扶持政策申报指南", date: "2026-07-03", image: "/static/images/solutions/webp/gov-media.webp" },
];

const cases = [
  { tag: "园区服务", title: "园企诉求闭环处理效率提升 60%", desc: "通过园企协同平台统一受理、分派和跟踪企业诉求。", image: "/static/images/solutions/webp/park.webp" },
  { tag: "电商运营", title: "经营分析从小时级缩短至分钟级", desc: "全链路问数系统帮助运营团队快速定位转化问题。", image: "/static/images/solutions/webp/ecommerce.webp" },
  { tag: "直播电商", title: "数字员工实现稳定日播与内容复用", desc: "降低直播内容生产成本，提升品牌持续运营能力。", image: "/static/images/apps/app-digital-human.png" },
];

const filteredNews = computed(() => activeNews.value === "全部" ? news : news.filter(item => item.type === activeNews.value));
let timer: number | undefined;
onMounted(() => timer = window.setInterval(() => activeSlide.value = (activeSlide.value + 1) % slides.length, 5000));
onUnmounted(() => timer && clearInterval(timer));
</script>

<template>
  <main class="town-home">
    <section class="hero">
      <article v-for="(slide, index) in slides" :key="slide.title" class="hero-slide" :class="{ active: activeSlide === index }">
        <div class="hero-copy">
          <span class="eyebrow">{{ slide.eyebrow }}</span>
          <h1>{{ slide.title }}</h1>
          <p>{{ slide.desc }}</p>
          <div class="hero-actions">
            <button class="primary-btn" @click="router.push('/information')">了解更多</button>
            <button class="ghost-btn" @click="goConsole">进入控制台</button>
          </div>
        </div>
        <img :src="slide.image" :alt="slide.title" />
      </article>
      <div class="hero-tabs wrapper">
        <button v-for="(slide, index) in slides" :key="slide.eyebrow" :class="{ active: activeSlide === index }" @click="activeSlide = index">
          <span>0{{ index + 1 }}</span>{{ slide.eyebrow }}
        </button>
      </div>
    </section>

    <section class="home-section wrapper">
      <header class="section-heading"><span>CORE SERVICES</span><h2>核心功能模块</h2><p>面向园区企业提供覆盖问数、直播、治理、可信接入与园企协同的数字化服务</p></header>
      <div class="module-grid">
        <article
          v-for="item in modules"
          :key="item.title"
          class="module-card"
          :class="{ 'module-card-wide': item.featured }"
          tabindex="0"
          @click="openModule(item)"
          @keydown.enter="openModule(item)"
        >
          <div class="card-image"><img :src="item.image" :alt="item.title" /><i class="fas" :class="item.icon"></i></div>
          <div class="card-body">
            <span v-if="item.featured" class="wide-eyebrow">PARK ENTERPRISE COLLABORATION</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
            <div v-if="item.featured" class="wide-tags">
              <span v-for="tag in parkFeatureTags" :key="tag">{{ tag }}</span>
            </div>
            <button @click.stop="openModule(item)">立即体验 <i class="fas fa-arrow-right"></i></button>
          </div>
        </article>
      </div>
    </section>

    <section class="home-section news-section">
      <div class="wrapper">
        <header class="section-heading"><span>DAILY UPDATES</span><h2>每日新闻公告</h2><p>及时掌握小镇动态、服务更新与政策信息</p></header>
        <div class="news-toolbar">
          <div class="filter-tabs"><button v-for="tab in ['全部','活动资讯','培训资讯','新闻资讯','政策文件']" :key="tab" :class="{ active: activeNews === tab }" @click="activeNews = tab">{{ tab }}</button></div>
          <button class="more-link" @click="router.push('/information')">查看全部资讯 <i class="fas fa-arrow-right"></i></button>
        </div>
        <div class="news-list">
          <article v-for="item in filteredNews" :key="item.id" class="news-item">
            <img :src="item.image" :alt="item.title" /><div><span>{{ item.type }}</span><h3>{{ item.title }}</h3><time>{{ item.date }}</time></div>
          </article>
        </div>
      </div>
    </section>

    <section class="home-section wrapper">
      <header class="section-heading"><span>SUCCESS STORIES</span><h2>客户案例</h2><p>真实业务场景中的数字化实践与价值成果</p></header>
      <div class="case-grid">
        <article v-for="item in cases" :key="item.title" class="case-card">
          <img :src="item.image" :alt="item.title" /><div class="case-content"><span>{{ item.tag }}</span><h3>{{ item.title }}</h3><p>{{ item.desc }}</p></div>
        </article>
      </div>
    </section>
  </main>
</template>

<style scoped>
.town-home{padding-top:72px;background:#fff;color:#0f172a}.hero{position:relative;height:620px;overflow:hidden;background:linear-gradient(120deg,#eff6ff,#f8fbff 52%,#e0f2fe)}.hero:after{content:"";position:absolute;inset:0;background-image:linear-gradient(rgba(37,99,235,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(37,99,235,.035) 1px,transparent 1px);background-size:40px 40px;pointer-events:none}.hero-slide{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:50px;max-width:1200px;margin:auto;padding:0 32px 84px;opacity:0;transform:translateX(25px);transition:.65s ease;pointer-events:none}.hero-slide.active{opacity:1;transform:none;pointer-events:auto;z-index:2}.hero-slide img{width:100%;height:390px;object-fit:cover;border-radius:20px;box-shadow:0 30px 70px rgba(30,64,175,.2)}.eyebrow,.section-heading>span{color:#2563eb;font-size:13px;font-weight:800;letter-spacing:.16em}.hero h1{font-size:50px;line-height:1.15;letter-spacing:-.03em;margin:18px 0}.hero p{font-size:18px;line-height:1.8;color:#64748b}.hero-actions{display:flex;gap:12px;margin-top:30px}.primary-btn,.ghost-btn{border-radius:8px;padding:13px 24px;font-weight:700;cursor:pointer}.primary-btn{border:0;background:#2563eb;color:#fff;box-shadow:0 10px 25px rgba(37,99,235,.25)}.ghost-btn{border:1px solid #bfdbfe;background:#fff;color:#1d4ed8}.hero-tabs{position:absolute;z-index:3;bottom:0;left:0;right:0;display:grid;grid-template-columns:repeat(5,1fr);background:rgba(255,255,255,.94);box-shadow:0 -8px 30px rgba(15,23,42,.06)}.hero-tabs button{padding:22px 14px;border:0;border-top:3px solid transparent;background:transparent;color:#64748b;font-weight:700;cursor:pointer}.hero-tabs button span{margin-right:8px;color:#94a3b8}.hero-tabs button.active{border-color:#2563eb;color:#1d4ed8}.wrapper{width:min(1200px,calc(100% - 48px));margin-inline:auto}.home-section{padding:96px 0}.section-heading{text-align:center;max-width:720px;margin:0 auto 44px}.section-heading h2{font-size:36px;margin:10px 0 12px}.section-heading p{color:#64748b;line-height:1.7}.module-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px}.module-card,.case-card,.news-item{overflow:hidden;border:1px solid #e2e8f0;border-radius:14px;background:#fff;transition:.25s}.module-card:hover,.case-card:hover{transform:translateY(-6px);box-shadow:0 20px 50px rgba(30,64,175,.12)}.module-card-wide{grid-column:1/-1;display:grid;grid-template-columns:minmax(320px,430px) minmax(0,1fr);align-items:center;min-height:298px;background:linear-gradient(135deg,#f8fbff,#eff6ff 58%,#dbeafe)}.module-card-wide .card-image{height:260px;min-height:260px;margin:18px;border-radius:18px}.module-card-wide .card-image img{border-radius:18px}.module-card-wide .card-image:after{border-radius:18px;background:linear-gradient(180deg,rgba(15,23,42,.02),rgba(15,23,42,.36))}.module-card-wide .card-body{display:flex;flex-direction:column;align-items:flex-start;justify-content:center;padding:34px 42px 34px 18px}.module-card-wide .card-body h3{font-size:28px;margin-bottom:12px}.module-card-wide .card-body p{max-width:560px;font-size:15px}.wide-eyebrow{margin-bottom:10px;color:#2563eb;font-size:12px;font-weight:900;letter-spacing:.14em}.wide-tags{display:flex;flex-wrap:wrap;gap:8px;margin:18px 0 20px}.wide-tags span{padding:7px 11px;border-radius:999px;background:#fff;color:#1d4ed8;border:1px solid #bfdbfe;font-size:12px;font-weight:900}.module-card-wide .card-body button{display:inline-flex;align-items:center;gap:8px;border:1px solid #bfdbfe;border-radius:999px;background:#fff;padding:10px 16px}.card-image{position:relative;height:190px;overflow:hidden}.card-image img,.case-card>img{width:100%;height:100%;object-fit:cover}.card-image:after{content:"";position:absolute;inset:0;background:linear-gradient(transparent,rgba(15,23,42,.38))}.card-image i{position:absolute;z-index:1;left:18px;bottom:16px;display:grid;place-items:center;width:42px;height:42px;border-radius:10px;background:#fff;color:#2563eb}.card-body{padding:22px}.card-body h3,.case-content h3{font-size:19px;margin:0 0 10px}.card-body p,.case-content p{color:#64748b;line-height:1.7;font-size:14px}.card-body button,.more-link{padding:0;border:0;background:none;color:#2563eb;font-weight:700;cursor:pointer}.news-section{background:#f8fafc}.news-toolbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:22px}.filter-tabs{display:flex;gap:8px;flex-wrap:wrap}.filter-tabs button{border:1px solid #dbeafe;background:#fff;color:#64748b;border-radius:20px;padding:8px 16px;cursor:pointer}.filter-tabs button.active{background:#2563eb;border-color:#2563eb;color:#fff}.news-list{display:grid;grid-template-columns:1fr 1fr;gap:16px}.news-item{display:grid;grid-template-columns:160px 1fr;padding:12px;align-items:center}.news-item img{width:145px;height:100px;object-fit:cover;border-radius:8px}.news-item span,.case-content>span{color:#2563eb;font-size:12px;font-weight:800}.news-item h3{font-size:16px;margin:8px 0 12px}.news-item time{color:#94a3b8;font-size:13px}.case-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}.case-card>img{height:230px}.case-content{padding:24px}.case-content h3{margin-top:10px}@media(max-width:900px){.hero{height:720px}.hero-slide{grid-template-columns:1fr;padding-top:50px}.hero-slide img{height:230px}.hero h1{font-size:38px}.hero-tabs button{padding-inline:8px;font-size:13px}.module-grid{grid-template-columns:1fr 1fr}.module-card-wide{grid-column:1/-1;grid-template-columns:minmax(280px,360px) minmax(0,1fr)}.case-grid{grid-template-columns:1fr}.news-list{grid-template-columns:1fr}}@media(max-width:600px){.wrapper{width:min(100% - 28px,1200px)}.hero{height:680px}.hero-slide{padding:35px 18px 105px;gap:20px}.hero h1{font-size:31px}.hero p{font-size:15px}.hero-slide img{height:190px}.hero-tabs button{padding:12px 5px;font-size:0}.hero-tabs button span{font-size:12px;margin:0}.home-section{padding:68px 0}.section-heading h2{font-size:28px}.module-grid{grid-template-columns:1fr}.module-card-wide{display:block;min-height:0}.module-card-wide .card-image{height:190px;min-height:0;margin:0;border-radius:0}.module-card-wide .card-image img,.module-card-wide .card-image:after{border-radius:0}.module-card-wide .card-body{display:block;padding:22px}.module-card-wide .card-body h3{font-size:21px}.wide-tags{margin:14px 0 18px}.news-toolbar{align-items:flex-start;gap:15px;flex-direction:column}.news-item{grid-template-columns:100px 1fr}.news-item img{width:88px;height:86px}.case-card>img{height:190px}}
.module-card{cursor:pointer}.module-card:focus-visible{outline:3px solid rgba(37,99,235,.28);outline-offset:4px}
</style>
