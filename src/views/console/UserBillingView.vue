<script setup lang="ts">
import { ref } from "vue";
const active = ref("订单管理");
const tabs = ["订单管理","账单管理","发票管理"];
const orders = [
  ["CS20260709001","园企协同平台企业版","¥ 2,980.00","已支付","2026-07-09"],
  ["CS20260618016","直播电商数字员工服务","¥ 1,680.00","服务中","2026-06-18"],
];
const bills = [
  ["ZD202607001","2026年7月服务账单","¥ 2,980.00","已结清","2026-07-09"],
  ["ZD202606012","2026年6月服务账单","¥ 1,680.00","已结清","2026-06-30"],
];
const invoices = [
  ["FP202607001","福州某某科技有限公司","¥ 2,980.00","开票中","2026-07-09"],
  ["FP202606008","福州某某科技有限公司","¥ 1,680.00","已开具","2026-06-25"],
];
</script>
<template>
  <div class="billing-view">
    <header><div><h2>费用中心</h2><p>集中管理订单、账单和发票信息</p></div><button><i class="fas fa-download"></i> 导出记录</button></header>
    <section class="summary-grid"><article><i class="fas fa-receipt"></i><div><span>本月订单</span><strong>2</strong></div></article><article><i class="fas fa-yen-sign"></i><div><span>本月费用</span><strong>¥ 4,660.00</strong></div></article><article><i class="fas fa-circle-check"></i><div><span>待处理事项</span><strong>1</strong></div></article></section>
    <section class="content-card">
      <div class="tabs"><button v-for="tab in tabs" :key="tab" :class="{active:active===tab}" @click="active=tab">{{ tab }}</button></div>
      <div class="filters"><input :placeholder="`搜索${active}编号或内容`" /><select><option>全部状态</option><option>已完成</option><option>处理中</option></select><button>查询</button></div>
      <div class="table-wrap">
        <table v-if="active==='订单管理'"><thead><tr><th>订单编号</th><th>服务内容</th><th>订单金额</th><th>状态</th><th>创建时间</th><th>操作</th></tr></thead><tbody><tr v-for="row in orders" :key="row[0]"><td>{{row[0]}}</td><td>{{row[1]}}</td><td>{{row[2]}}</td><td><span>{{row[3]}}</span></td><td>{{row[4]}}</td><td><button>查看详情</button></td></tr></tbody></table>
        <table v-else-if="active==='账单管理'"><thead><tr><th>账单编号</th><th>账单名称</th><th>账单金额</th><th>状态</th><th>生成日期</th><th>操作</th></tr></thead><tbody><tr v-for="row in bills" :key="row[0]"><td>{{row[0]}}</td><td>{{row[1]}}</td><td>{{row[2]}}</td><td><span>{{row[3]}}</span></td><td>{{row[4]}}</td><td><button>下载账单</button></td></tr></tbody></table>
        <table v-else><thead><tr><th>发票编号</th><th>发票抬头</th><th>发票金额</th><th>状态</th><th>申请日期</th><th>操作</th></tr></thead><tbody><tr v-for="row in invoices" :key="row[0]"><td>{{row[0]}}</td><td>{{row[1]}}</td><td>{{row[2]}}</td><td><span>{{row[3]}}</span></td><td>{{row[4]}}</td><td><button>查看发票</button></td></tr></tbody></table>
      </div>
    </section>
  </div>
</template>
<style scoped>
.billing-view{max-width:1200px}.billing-view>header{display:flex;align-items:center;justify-content:space-between;margin-bottom:28px}.billing-view h2{font-size:1.8rem;margin:0 0 8px;color:#0f172a}.billing-view p{margin:0;color:#64748b}.billing-view>header button,.filters button{padding:10px 16px;border:0;border-radius:7px;background:#4f46e5;color:#fff;font-weight:700}.summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:18px;margin-bottom:24px}.summary-grid article{display:flex;align-items:center;gap:16px;padding:22px;border:1px solid #e2e8f0;border-radius:10px;background:#fff}.summary-grid i{display:grid;place-items:center;width:46px;height:46px;border-radius:10px;background:#eef2ff;color:#4f46e5}.summary-grid span,.summary-grid strong{display:block}.summary-grid span{color:#64748b;font-size:13px;margin-bottom:7px}.summary-grid strong{color:#0f172a;font-size:20px}.content-card{padding:28px;border:1px solid #e2e8f0;border-radius:12px;background:#fff}.tabs{display:flex;gap:26px;border-bottom:1px solid #e2e8f0}.tabs button{padding:0 4px 14px;border:0;border-bottom:3px solid transparent;background:none;color:#64748b;font-weight:700;cursor:pointer}.tabs button.active{border-color:#4f46e5;color:#4f46e5}.filters{display:flex;gap:10px;margin:22px 0}.filters input,.filters select{padding:10px 12px;border:1px solid #dbe3ee;border-radius:7px}.filters input{width:280px}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;white-space:nowrap}th,td{padding:15px 12px;border-bottom:1px solid #eef2f7;text-align:left;font-size:14px}th{color:#64748b;background:#f8fafc}td{color:#334155}td span{color:#16a34a}td button{border:0;background:none;color:#4f46e5;cursor:pointer}@media(max-width:700px){.summary-grid{grid-template-columns:1fr}.billing-view>header{align-items:flex-start;gap:15px;flex-direction:column}.filters{flex-wrap:wrap}.filters input{width:100%;box-sizing:border-box}}
</style>
