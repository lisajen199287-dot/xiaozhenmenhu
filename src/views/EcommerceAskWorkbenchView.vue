<script setup lang="ts">
import { computed, ref } from "vue";

type SectionKey = "dashboard" | "purchase" | "sales" | "ask";
type AskSceneKey = "dashboard" | "purchase" | "sales";

const activeSection = ref<SectionKey>("dashboard");

const navItems: Array<{ key: SectionKey; title: string; icon: string; desc: string }> = [
  { key: "dashboard", title: "智能看板", icon: "fa-gauge-high", desc: "多平台经营概览" },
  { key: "purchase", title: "采购统计", icon: "fa-cart-flatbed", desc: "采购金额与结构" },
  { key: "sales", title: "销售统计", icon: "fa-chart-line", desc: "销售额与毛利" },
  { key: "ask", title: "智能问数", icon: "fa-comments", desc: "自然语言分析" },
];

const dashboardCards = [
  { title: "销售额", value: "¥ 328,600", tone: "blue", icon: "fa-sack-dollar" },
  { title: "订单数", value: "4,128", tone: "cyan", icon: "fa-receipt" },
  { title: "应收", value: "¥ 52,600", tone: "purple", icon: "fa-wallet" },
  { title: "应付", value: "¥ 33,800", tone: "blue", icon: "fa-credit-card" },
  { title: "库存告警", value: "16", tone: "orange", icon: "fa-triangle-exclamation", note: "库存实时监控中", divider: true },
];

const businessMetricCards = dashboardCards.filter((card) => !card.divider);
const alertMetricCards = dashboardCards.filter((card) => card.divider);

const inventorySalesRows = [
  { product: "防晒套组", stock: 1260, sales: 980, stockRate: 72, salesRate: 86, days: "2.8天", status: "低库存", tone: "danger" },
  { product: "零食组合", stock: 3420, sales: 1680, stockRate: 92, salesRate: 74, days: "6.1天", status: "健康", tone: "safe" },
  { product: "家清礼包", stock: 2180, sales: 1120, stockRate: 78, salesRate: 66, days: "5.4天", status: "健康", tone: "safe" },
  { product: "服饰单品", stock: 860, sales: 720, stockRate: 48, salesRate: 64, days: "2.2天", status: "补货预警", tone: "warning" },
];

const platformStats = [
  { name: "抖音", sales: "¥142,800", orders: "1,762" },
  { name: "淘宝", sales: "¥96,500", orders: "1,128" },
];

const purchaseRows = [
  { date: "2026-07-11", supplier: "福建优选供应链", category: "美妆个护", amount: "¥86,000", quantity: "3,400 件", cost: "-4.2%" },
  { date: "2026-07-10", supplier: "华东仓储集采", category: "食品饮品", amount: "¥124,800", quantity: "5,260 件", cost: "+1.8%" },
  { date: "2026-07-09", supplier: "海峡生活科技", category: "家清日化", amount: "¥69,300", quantity: "2,180 件", cost: "-2.1%" },
  { date: "2026-07-08", supplier: "直播爆品工厂", category: "服饰鞋包", amount: "¥96,500", quantity: "4,920 件", cost: "-6.5%" },
];

const purchaseChartRows = [
  { supplier: "福建优选供应链", category: "美妆个护", amount: "¥86,000", amountRate: 69, quantity: "3,400 件", quantityRate: 65 },
  { supplier: "华东仓储集采", category: "食品饮品", amount: "¥124,800", amountRate: 100, quantity: "5,260 件", quantityRate: 100 },
  { supplier: "海峡生活科技", category: "家清日化", amount: "¥69,300", amountRate: 56, quantity: "2,180 件", quantityRate: 41 },
  { supplier: "直播爆品工厂", category: "服饰鞋包", amount: "¥96,500", amountRate: 77, quantity: "4,920 件", quantityRate: 94 },
];

const salesRows = [
  { date: "2026-07-11", customer: "会员复购人群", product: "防晒套组", region: "华东", sales: "¥128,000", orders: "1,302", gross: "31.8%" },
  { date: "2026-07-10", customer: "直播新客", product: "零食组合", region: "华南", sales: "¥92,600", orders: "1,086", gross: "26.4%" },
  { date: "2026-07-09", customer: "达人渠道", product: "家清礼包", region: "华北", sales: "¥76,400", orders: "812", gross: "29.1%" },
  { date: "2026-07-08", customer: "私域社群", product: "服饰单品", region: "西南", sales: "¥61,900", orders: "638", gross: "34.2%" },
];

const askInput = ref("当前销量和库存是否匹配？哪些商品存在断货或滞销风险？");
const askScene = ref<AskSceneKey>("dashboard");
const askMessages = ref([
  {
    role: "assistant",
    text: "您好，我是电商经营问数助手。您可以直接询问销售、采购、库存、结算、主播话术、商品转化等问题。",
  },
]);

const activeTitle = computed(() => navItems.find((item) => item.key === activeSection.value)?.title || "");
const quickQuestions = computed(() => {
  if (askScene.value === "dashboard") {
    return [
      { title: "供销匹配分析", question: "当前销量和库存是否匹配？哪些商品存在断货或滞销风险？" },
      { title: "补货优先级", question: "根据近7日销量和预计可售天数，给出下周补货优先级建议" },
      { title: "滞销预警", question: "找出潜在滞销 SKU，并分析是否需要降价、换直播场次或减少采购" },
      { title: "经营现金压力", question: "结合库存周转率、应收应付和销售趋势，判断企业短期经营压力" },
    ];
  }
  if (askScene.value === "purchase") {
    return [
      { title: "采购成本异常", question: "近7日哪些供应商或品类采购成本波动异常？原因可能是什么？" },
      { title: "采购结构优化", question: "根据销售表现和库存可售天数，哪些品类应减少采购或优先补货？" },
      { title: "供应商对比", question: "对比福建优选供应链和直播爆品工厂的采购金额、数量和成本变化" },
      { title: "采购预算建议", question: "结合当前库存、近7日销量和采购成本，给出下周采购预算建议" },
    ];
  }
  return [
    { title: "销售增长归因", question: "近7日销售额增长主要来自哪些客户、产品和区域？" },
    { title: "毛利表现分析", question: "哪些产品毛利率较高，适合作为下周直播主推品？" },
    { title: "客户转化分析", question: "直播新客、会员复购和私域社群的订单转化表现有什么差异？" },
    { title: "区域销售机会", question: "哪些区域销售表现更好，下一阶段应该重点投放哪些商品？" },
  ];
});

const switchSection = (key: SectionKey) => {
  activeSection.value = key;
};

const openAsk = (scene: AskSceneKey) => {
  askScene.value = scene;
  activeSection.value = "ask";
  askInput.value = quickQuestions.value[0]?.question || "";
};

const exportReport = (name: string) => {
  window.alert(`${name}导出任务已创建，演示版本将生成 Excel 报表。`);
};

const submitAsk = () => {
  const question = askInput.value.trim();
  if (!question) return;
  askMessages.value.push({ role: "user", text: question });
  askMessages.value.push({
    role: "assistant",
    text:
      "分析结论：本周销售增长主要来自抖音直播间转化率提升、爆品防晒套组库存充足、达人预热视频带来的高意向流量。建议下周继续保留防晒套组主推位，同时补充家清日化和零食组合做第二梯队，并重点关注库存告警 SKU，避免直播中断货。",
  });
  askInput.value = "";
};
</script>

<template>
  <main class="ask-workbench">
    <aside class="system-sidebar">
      <div class="system-logo">
        <div class="logo-mark"><i class="fas fa-chart-line"></i></div>
        <div>
          <strong>电商智能问数系统</strong>
          <span>DATA ASK WORKBENCH</span>
        </div>
      </div>
      <nav class="system-nav">
        <button
          v-for="item in navItems"
          :key="item.key"
          :class="{ active: activeSection === item.key }"
          @click="switchSection(item.key)"
        >
          <i class="fas" :class="item.icon"></i>
          <span>
            <strong>{{ item.title }}</strong>
            <small>{{ item.desc }}</small>
          </span>
        </button>
      </nav>
    </aside>

    <section class="system-main">
      <header class="system-topbar">
        <div>
          <span class="top-eyebrow">E-COMMERCE OPERATION DATA</span>
          <h1>{{ activeTitle }}</h1>
        </div>
        <div class="top-actions">
          <button v-if="activeSection === 'dashboard'" @click="openAsk('dashboard')">
            <i class="fas fa-wand-magic-sparkles"></i> 发起问数
          </button>
          <button v-else-if="activeSection === 'purchase'" @click="openAsk('purchase')">
            <i class="fas fa-wand-magic-sparkles"></i> 发起问数
          </button>
          <button v-else-if="activeSection === 'sales'" @click="openAsk('sales')">
            <i class="fas fa-wand-magic-sparkles"></i> 发起问数
          </button>
        </div>
      </header>

      <div v-if="activeSection === 'dashboard'" class="view-panel">
        <section class="dashboard-simple-filter" aria-label="看板时间选择器">
          <div class="date-range-display">
            <span>2026-06-15&nbsp;&nbsp;–&nbsp;&nbsp;2026-07-14</span>
            <i class="fas fa-calendar-days"></i>
          </div>
        </section>

        <section class="dashboard-metric-groups compact-metrics">
          <div class="metric-group business-metric-group" aria-label="经营指标">
            <article
              v-for="card in businessMetricCards"
              :key="card.title"
              class="metric-tile"
              :class="card.tone"
            >
              <i class="fas" :class="card.icon"></i>
              <span>{{ card.title }}</span>
              <strong>{{ card.value }}</strong>
            </article>
          </div>
          <div class="metric-group alert-metric-group" aria-label="库存告警">
            <article
              v-for="card in alertMetricCards"
              :key="card.title"
              class="metric-tile inventory-alert-card"
              :class="card.tone"
            >
              <i class="fas" :class="card.icon"></i>
              <span>{{ card.title }}</span>
              <strong>{{ card.value }}</strong>
              <small v-if="card.note" class="metric-note">{{ card.note }}</small>
            </article>
          </div>
        </section>

        <section class="content-grid platform-only-grid">
          <article class="panel-card">
            <div class="panel-title compact">
              <h2>平台经营数据</h2>
            </div>
            <div class="platform-list">
              <div v-for="item in platformStats" :key="item.name">
                <strong>{{ item.name }}</strong>
                <span>{{ item.sales }}</span>
                <small>{{ item.orders }} 单</small>
              </div>
            </div>
          </article>
        </section>

        <section class="inventory-sales-card">
          <div class="panel-title">
            <div>
              <h2>库存与销量关系总览</h2>
              <p>按核心商品展示当前库存、近 7 日销量和预计可售天数，帮助运营一眼判断是否需要补货或调整直播排期。</p>
            </div>
            <div class="legend">
              <span><i class="stock-dot"></i> 当前库存</span>
              <span><i class="sales-dot"></i> 近7日销量</span>
            </div>
          </div>
          <div class="inventory-summary">
            <div>
              <strong>58%</strong>
              <span>库存周转率</span>
            </div>
            <div>
              <strong>1</strong>
              <span>潜在滞销 SKU</span>
            </div>
            <div class="risk">
              <strong>2</strong>
              <span>需补货 SKU</span>
            </div>
            <div>
              <strong>4.1天</strong>
              <span>平均可售天数</span>
            </div>
          </div>
          <div class="inventory-chart">
            <article v-for="item in inventorySalesRows" :key="item.product" class="inventory-row">
              <div class="product-info">
                <strong>{{ item.product }}</strong>
                <span>库存 {{ item.stock }} 件 · 销量 {{ item.sales }} 件</span>
              </div>
              <div class="relation-bars">
                <div class="bar-line stock">
                  <span :style="{ width: `${item.stockRate}%` }"></span>
                </div>
                <div class="bar-line sales">
                  <span :style="{ width: `${item.salesRate}%` }"></span>
                </div>
              </div>
              <div class="stock-days">
                <strong>{{ item.days }}</strong>
                <span>预计可售</span>
              </div>
              <em class="status-pill" :class="item.tone">{{ item.status }}</em>
            </article>
          </div>
        </section>
      </div>

      <div v-else-if="activeSection === 'purchase'" class="view-panel">
        <section class="panel-card">
          <div class="panel-title">
            <div>
              <h2>采购统计</h2>
              <p>按时间、供应商、品类等维度展示采购金额与数量，辅助采购与财务分析成本变化。</p>
            </div>
            <div class="panel-actions">
              <button @click="exportReport('采购统计')">导出报表</button>
            </div>
          </div>
          <div class="filter-row">
            <div class="date-range-filter">
              <input type="date" value="2026-07-08" aria-label="采购统计开始时间" />
              <span>至</span>
              <input type="date" value="2026-07-14" aria-label="采购统计结束时间" />
            </div>
            <input placeholder="请输入供应商名称" />
            <select><option>全部品类</option><option>美妆个护</option><option>食品饮品</option></select>
            <button class="filter-search-btn">搜索</button>
          </div>
          <section class="purchase-chart-card" aria-label="采购统计图表">
            <div class="purchase-chart-head">
              <div>
                <h3>采购金额与数量对比</h3>
                <p>按供应商展示采购金额和采购数量，帮助快速判断采购集中度与供应结构。</p>
              </div>
              <div class="chart-legend">
                <span><i class="amount-dot"></i>采购金额</span>
                <span><i class="quantity-dot"></i>采购数量</span>
              </div>
            </div>
            <div class="purchase-column-chart">
              <article v-for="item in purchaseChartRows" :key="item.supplier" class="purchase-column-group">
                <div class="column-bars">
                  <div class="column-item">
                    <em>{{ item.amount }}</em>
                    <span class="amount" :style="{ height: `${item.amountRate}%` }"></span>
                  </div>
                  <div class="column-item">
                    <em>{{ item.quantity }}</em>
                    <span class="quantity" :style="{ height: `${item.quantityRate}%` }"></span>
                  </div>
                </div>
                <div class="column-supplier">
                  <strong>{{ item.supplier }}</strong>
                  <span>{{ item.category }}</span>
                </div>
              </article>
            </div>
          </section>
          <div class="data-table">
            <div class="table-row table-head">
              <span>供应商</span><span>品类</span><span>采购金额</span><span>采购数量</span><span>时间</span>
            </div>
            <div v-for="row in purchaseRows" :key="row.date + row.supplier" class="table-row">
              <strong>{{ row.supplier }}</strong><span>{{ row.category }}</span><span>{{ row.amount }}</span><span>{{ row.quantity }}</span><span>{{ row.date }}</span>
            </div>
          </div>
        </section>
      </div>

      <div v-else-if="activeSection === 'sales'" class="view-panel">
        <section class="panel-card">
          <div class="panel-title">
            <div>
              <h2>销售统计</h2>
              <p>按时间、客户、产品、区域等维度汇总销售额、订单数、毛利等指标，辅助经营决策。</p>
            </div>
            <div class="panel-actions">
              <button @click="exportReport('销售统计')">导出报表</button>
            </div>
          </div>
          <div class="filter-row">
            <div class="date-range-filter">
              <input type="date" value="2026-07-08" aria-label="销售统计开始时间" />
              <span>至</span>
              <input type="date" value="2026-07-14" aria-label="销售统计结束时间" />
            </div>
            <input placeholder="请输入客户名称" />
            <select><option>全部区域</option><option>华东</option><option>华南</option></select>
            <button class="filter-search-btn">搜索</button>
          </div>
          <div class="data-table sales-table">
            <div class="table-row table-head">
              <span>客户</span><span>产品</span><span>区域</span><span>销售额</span><span>订单数</span><span>毛利</span><span>时间</span>
            </div>
            <div v-for="row in salesRows" :key="row.date + row.product" class="table-row">
              <strong>{{ row.customer }}</strong><span>{{ row.product }}</span><span>{{ row.region }}</span><span>{{ row.sales }}</span><span>{{ row.orders }}</span><em>{{ row.gross }}</em><span>{{ row.date }}</span>
            </div>
          </div>
        </section>
      </div>

      <div v-else class="view-panel ask-view">
        <section class="panel-card ask-card">
          <div class="panel-title">
            <div>
              <h2>智能问数</h2>
              <p>用自然语言发送直播电商相关问数需求，跨订单、库存、结算、客户画像和行为数据输出结构化结论。</p>
            </div>
          </div>
          <div class="ask-layout">
            <div class="quick-questions">
              <button
                v-for="item in quickQuestions"
                :key="item.title"
                @click="askInput = item.question"
              >
                <strong>{{ item.title }}</strong>
                <span>{{ item.question }}</span>
              </button>
            </div>
            <div class="chat-box">
              <div class="message-list">
                <div v-for="(msg, index) in askMessages" :key="index" class="message" :class="msg.role">
                  <i class="fas" :class="msg.role === 'assistant' ? 'fa-robot' : 'fa-user'"></i>
                  <p>{{ msg.text }}</p>
                </div>
              </div>
              <div class="ask-input">
                <textarea v-model="askInput" placeholder="例如：分析本周直播销售额增长原因，并给出下周选品建议"></textarea>
                <button @click="submitAsk">发送问数</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  </main>
</template>

<style scoped>
.ask-workbench{min-height:100vh;display:grid;grid-template-columns:280px minmax(0,1fr);background:#f5f8fc;color:#102033}.system-sidebar{position:sticky;top:0;height:100vh;padding:24px 18px;background:#071b36;color:#fff}.system-logo{display:flex;gap:12px;align-items:center;padding:10px 8px 26px}.logo-mark{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#2563eb,#06b6d4)}.system-logo strong,.system-logo span{display:block}.system-logo strong{font-size:16px}.system-logo span{margin-top:4px;color:#8fb4e8;font-size:10px;font-weight:800;letter-spacing:.12em}.system-nav{display:grid;gap:10px}.system-nav button{display:flex;gap:12px;align-items:center;width:100%;padding:14px;border:0;border-radius:14px;text-align:left;color:#bdd3ef;background:transparent;cursor:pointer}.system-nav button:hover,.system-nav button.active{color:#fff;background:rgba(37,99,235,.22)}.system-nav i{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,.08)}.system-nav button.active i{background:linear-gradient(135deg,#2563eb,#06b6d4)}.system-nav strong,.system-nav small{display:block}.system-nav small{margin-top:4px;color:#86a6cf}.system-main{min-width:0;padding:24px 30px 46px}.system-topbar{display:flex;justify-content:space-between;gap:24px;align-items:center;margin-bottom:24px;padding:22px 24px;border:1px solid #dde8f6;border-radius:22px;background:rgba(255,255,255,.9);box-shadow:0 16px 36px rgba(15,23,42,.05)}.top-eyebrow{color:#2563eb;font-size:12px;font-weight:900;letter-spacing:.14em}.system-topbar h1{margin:8px 0 0;font-size:30px}.top-actions{display:flex;align-items:center;gap:14px}.top-actions span{color:#5b6f86;font-weight:700}.top-actions button,.panel-title button{border:0;border-radius:12px;background:#0f172a;color:#fff;padding:12px 16px;font-weight:850;cursor:pointer}.panel-actions{display:flex;flex-wrap:wrap;gap:10px;justify-content:flex-end}.panel-actions .ask-btn{background:linear-gradient(135deg,#2563eb,#06b6d4)}.view-panel{display:grid;gap:22px}.inventory-sales-card{padding:24px;border:1px solid #d5e5f8;border-radius:24px;background:linear-gradient(135deg,#fff,#f6fbff);box-shadow:0 20px 46px rgba(15,23,42,.06)}.legend{display:flex;gap:14px;align-items:center;color:#64748b;font-size:13px;font-weight:850}.legend span{display:flex;gap:7px;align-items:center}.legend i{width:10px;height:10px;border-radius:50%}.stock-dot{background:#2563eb}.sales-dot{background:#06b6d4}.inventory-summary{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-bottom:20px}.inventory-summary div{padding:16px 18px;border-radius:18px;background:#f1f7ff}.inventory-summary strong,.inventory-summary span{display:block}.inventory-summary strong{color:#0f172a;font-size:26px}.inventory-summary span{margin-top:6px;color:#64748b;font-weight:800}.inventory-summary .risk{background:#fff7ed}.inventory-summary .risk strong{color:#f97316}.inventory-chart{display:grid;gap:12px}.inventory-row{display:grid;grid-template-columns:170px minmax(180px,1fr) 86px 96px;gap:16px;align-items:center;padding:15px;border:1px solid #e3edf8;border-radius:16px;background:#fff}.product-info strong,.product-info span,.stock-days strong,.stock-days span{display:block}.product-info strong{font-size:16px}.product-info span,.stock-days span{margin-top:4px;color:#64748b;font-size:12px;font-weight:750}.relation-bars{display:grid;gap:8px}.bar-line{height:12px;border-radius:999px;background:#edf4fc;overflow:hidden}.bar-line span{display:block;height:100%;border-radius:inherit}.bar-line.stock span{background:linear-gradient(90deg,#2563eb,#60a5fa)}.bar-line.sales span{background:linear-gradient(90deg,#06b6d4,#67e8f9)}.stock-days{text-align:right}.stock-days strong{font-size:18px}.status-pill{justify-self:end;padding:7px 10px;border-radius:999px;font-size:12px;font-style:normal;font-weight:900}.status-pill.safe{color:#059669;background:#ecfdf5}.status-pill.warning{color:#d97706;background:#fffbeb}.status-pill.danger{color:#dc2626;background:#fef2f2}.dashboard-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}.compact-metrics .metric-tile{min-height:150px}.metric-tile{position:relative;padding:22px;border:1px solid #e1eaf5;border-radius:20px;background:#fff;box-shadow:0 16px 32px rgba(15,23,42,.05);overflow:hidden}.metric-tile:after{content:"";position:absolute;right:-30px;top:-30px;width:92px;height:92px;border-radius:50%;opacity:.14}.metric-tile.blue:after{background:#2563eb}.metric-tile.cyan:after{background:#06b6d4}.metric-tile.orange:after{background:#f97316}.metric-tile.purple:after{background:#7c3aed}.metric-tile i{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;color:#2563eb;background:#eff6ff}.metric-tile span,.metric-tile em{display:block;color:#64748b;font-style:normal}.metric-tile span{margin-top:16px}.metric-tile strong{display:block;margin:8px 0;font-size:30px}.metric-tile em{font-weight:800;color:#16a34a}.content-grid{display:grid;grid-template-columns:minmax(0,1.7fr) minmax(320px,.8fr);gap:20px}.panel-card{padding:24px;border:1px solid #dce8f6;border-radius:22px;background:#fff;box-shadow:0 18px 40px rgba(15,23,42,.055)}.panel-title{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:20px}.panel-title h2{margin:0 0 8px;font-size:22px}.panel-title p{margin:0;color:#64748b;line-height:1.7}.panel-title.compact{margin-bottom:14px}.bar-chart{display:flex;align-items:end;gap:18px;height:280px;padding:22px 8px 0;border-radius:18px;background:linear-gradient(180deg,#f8fbff,#fff)}.bar-group{flex:1;display:grid;gap:10px;justify-items:center;height:100%}.bars{display:flex;align-items:end;justify-content:center;gap:6px;width:100%;height:230px}.bars span{width:18px;border-radius:999px 999px 4px 4px}.bars .purchase{background:#93c5fd}.bars .sales{background:linear-gradient(180deg,#2563eb,#06b6d4)}.bar-group small{color:#64748b;font-weight:800}.platform-list{display:grid;gap:12px}.platform-list div{padding:16px;border-radius:16px;background:#f8fbff}.platform-list strong,.platform-list span,.platform-list small{display:block}.platform-list span{margin:8px 0 4px;font-size:22px;font-weight:900}.platform-list small{color:#64748b}.filter-row{display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;margin-bottom:18px}.filter-row select,.filter-row input{height:42px;border:1px solid #dbe6f3;border-radius:12px;padding:0 12px;color:#334155;background:#f8fbff}.data-table{border:1px solid #e2e8f0;border-radius:16px;overflow:hidden}.table-row{display:grid;grid-template-columns:1fr 1.3fr 1fr 1fr 1fr .8fr;gap:12px;align-items:center;padding:15px 18px;border-top:1px solid #edf2f7}.sales-table .table-row{grid-template-columns:1fr .9fr 1.1fr 1fr .8fr 1fr .8fr .7fr}.table-row:first-child{border-top:0}.table-head{color:#64748b;background:#f8fbff;font-size:13px;font-weight:900}.table-row strong{color:#0f172a}.table-row em{font-style:normal;color:#16a34a;font-weight:900}.ask-card{min-height:calc(100vh - 160px)}.ask-layout{display:grid;grid-template-columns:260px minmax(0,1fr);gap:20px}.quick-questions{display:grid;align-content:start;gap:12px}.quick-questions button{display:grid;gap:6px;padding:14px;border:1px solid #dbeafe;border-radius:14px;text-align:left;color:#1d4ed8;background:#eff6ff;font-weight:850;cursor:pointer}.quick-questions button strong{color:#0f3f8f;font-size:14px}.quick-questions button span{color:#49627f;font-size:12px;line-height:1.55;font-weight:700}.chat-box{display:flex;flex-direction:column;min-height:520px;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;background:#f8fbff}.message-list{flex:1;padding:22px;display:grid;align-content:start;gap:16px}.message{display:grid;grid-template-columns:auto minmax(0,1fr);gap:12px;align-items:start}.message i{display:grid;place-items:center;width:34px;height:34px;border-radius:50%;background:#e0f2fe;color:#0369a1}.message p{margin:0;padding:14px 16px;border-radius:14px;background:#fff;line-height:1.75;color:#334155}.message.user i{background:#dbeafe;color:#2563eb}.message.user p{background:#2563eb;color:#fff}.ask-input{display:grid;grid-template-columns:minmax(0,1fr) 120px;gap:12px;padding:16px;border-top:1px solid #e2e8f0;background:#fff}.ask-input textarea{height:74px;resize:none;border:1px solid #dbe6f3;border-radius:14px;padding:12px;line-height:1.6}.ask-input button{border:0;border-radius:14px;color:#fff;background:linear-gradient(135deg,#2563eb,#06b6d4);font-weight:900;cursor:pointer}@media(max-width:1100px){.ask-workbench{grid-template-columns:1fr}.system-sidebar{position:relative;height:auto}.system-nav{grid-template-columns:repeat(3,1fr)}.content-grid,.ask-layout{grid-template-columns:1fr}.dashboard-grid,.inventory-summary{grid-template-columns:repeat(2,1fr)}.inventory-row{grid-template-columns:1fr}}@media(max-width:720px){.system-main{padding:16px}.system-topbar,.panel-title,.top-actions{flex-direction:column;align-items:flex-start}.panel-actions{justify-content:flex-start}.system-nav{grid-template-columns:1fr}.dashboard-grid,.inventory-summary,.filter-row{grid-template-columns:1fr}.data-table{overflow-x:auto}.table-row{min-width:780px}.ask-input{grid-template-columns:1fr}.ask-input button{height:44px}.legend{flex-wrap:wrap}.stock-days{text-align:left}.status-pill{justify-self:start}}

.date-range-filter {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
  gap: 8px;
  align-items: center;
}

.date-range-filter span {
  color: #64748b;
  font-size: 13px;
  font-weight: 800;
}

.date-range-filter input {
  min-width: 0;
}

.filter-search-btn {
  height: 42px;
  border: 0;
  border-radius: 12px;
  color: #fff;
  background: #0f172a;
  font-weight: 850;
  cursor: pointer;
}

.filter-search-btn:hover {
  background: #1e293b;
}

.purchase-chart-card {
  display: grid;
  gap: 16px;
  margin-bottom: 18px;
  padding: 18px;
  border: 1px solid #d9e8f8;
  border-radius: 18px;
  background:
    radial-gradient(circle at 92% 0%, rgba(37, 99, 235, 0.1), transparent 28%),
    linear-gradient(135deg, #ffffff, #f7fbff);
}

.purchase-chart-head {
  display: flex;
  justify-content: space-between;
  gap: 18px;
  align-items: flex-start;
}

.purchase-chart-head h3 {
  margin: 0 0 6px;
  color: #0f172a;
  font-size: 18px;
}

.purchase-chart-head p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
  font-size: 13px;
  font-weight: 700;
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #64748b;
  font-size: 12px;
  font-weight: 850;
}

.chart-legend span {
  display: inline-flex;
  gap: 6px;
  align-items: center;
  white-space: nowrap;
}

.chart-legend i {
  width: 9px;
  height: 9px;
  border-radius: 50%;
}

.amount-dot {
  background: #2563eb;
}

.quantity-dot {
  background: #06b6d4;
}

.purchase-column-chart {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  min-height: 300px;
  padding: 22px 18px 18px;
  border: 1px solid #e4eef9;
  border-radius: 16px;
  background:
    linear-gradient(to top, rgba(226, 232, 240, 0.9) 1px, transparent 1px) 0 0 / 100% 25%,
    #ffffff;
}

.purchase-column-group {
  display: grid;
  grid-template-rows: minmax(200px, 1fr) auto;
  gap: 14px;
  min-width: 0;
}

.column-bars {
  display: flex;
  align-items: end;
  justify-content: center;
  gap: 16px;
  min-height: 200px;
}

.column-item {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  justify-items: center;
  gap: 8px;
  width: 52px;
  height: 100%;
}

.column-item em {
  color: #0f172a;
  font-style: normal;
  font-size: 12px;
  font-weight: 900;
  white-space: nowrap;
}

.column-item span {
  align-self: end;
  width: 24px;
  min-height: 24px;
  border-radius: 999px 999px 6px 6px;
  box-shadow: 0 12px 20px rgba(37, 99, 235, 0.14);
}

.column-item span.amount {
  background: linear-gradient(180deg, #2563eb, #60a5fa);
}

.column-item span.quantity {
  background: linear-gradient(180deg, #06b6d4, #67e8f9);
}

.column-supplier {
  min-width: 0;
  padding-top: 12px;
  border-top: 1px solid #e4eef9;
  text-align: center;
}

.column-supplier strong,
.column-supplier span {
  display: block;
}

.column-supplier strong {
  overflow: hidden;
  color: #0f172a;
  font-size: 13px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.column-supplier span {
  margin-top: 5px;
  color: #64748b;
  font-size: 12px;
  font-weight: 750;
}

.dashboard-simple-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
}

.date-range-display {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
  min-width: 430px;
  height: 42px;
  padding: 0 14px 0 28px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  color: #0f172a;
  background: #fff;
  font-size: 20px;
  font-weight: 850;
}

.date-range-display i {
  color: #94a3b8;
  font-size: 19px;
}

.platform-only-grid {
  grid-template-columns: 1fr;
}

.data-table:not(.sales-table) .table-row {
  grid-template-columns: 1.35fr 1fr 1fr 1fr 1fr;
}

.sales-table .table-row {
  grid-template-columns: 1.25fr 1fr .8fr 1fr .8fr .7fr 1fr;
}

.dashboard-metric-groups {
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(190px, 1fr);
  gap: 16px;
}

.metric-group {
  display: grid;
  gap: 16px;
  padding: 14px;
  border: 1px solid #dce8f6;
  border-radius: 24px;
}

.business-metric-group {
  grid-template-columns: repeat(4, minmax(0, 1fr));
  background: linear-gradient(135deg, #ffffff 0%, #f5f9ff 100%);
  box-shadow: 0 18px 42px rgba(37, 99, 235, 0.06);
}

.alert-metric-group {
  grid-template-columns: minmax(0, 1fr);
  border-style: dashed;
  border-color: #fdba74;
  background: linear-gradient(135deg, #fff7ed 0%, #fffefd 100%);
  box-shadow: 0 18px 42px rgba(249, 115, 22, 0.08);
}

.compact-metrics .metric-tile {
  min-height: 150px;
  box-shadow: none;
}

.compact-metrics .metric-tile strong {
  margin-bottom: 0;
}

.inventory-alert-card {
  border-color: #fed7aa;
  background: #fffaf5;
}

.inventory-alert-card i {
  color: #fff;
  background: linear-gradient(135deg, #ef4444, #f97316);
}

.metric-note {
  display: block;
  margin-top: 12px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 850;
}

@media (max-width: 1180px) {
  .dashboard-metric-groups {
    grid-template-columns: 1fr;
  }

  .business-metric-group {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .purchase-column-chart {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 720px) {
  .dashboard-simple-filter {
    align-items: stretch;
  }

  .date-range-display {
    width: 100%;
  }

  .date-range-display {
    min-width: 0;
    font-size: 15px;
  }

  .business-metric-group {
    grid-template-columns: 1fr;
  }

  .metric-group {
    padding: 12px;
  }

  .purchase-chart-head,
  .purchase-column-chart {
    grid-template-columns: 1fr;
  }

  .purchase-chart-head {
    display: grid;
  }
}
</style>
