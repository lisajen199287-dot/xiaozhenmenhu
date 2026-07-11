<script setup lang="ts">
import { computed, ref } from "vue";
import { ElMessage } from "element-plus";

const keyword = ref("");
const feedbackType = ref("功能建议");
const feedbackContent = ref("");
const faqs = [
  { category:"新手指南", question:"如何完成企业认证？", answer:"进入用户中心，在企业认证与审核模块填写企业信息并上传营业执照。" },
  { category:"账号安全", question:"如何修改账号绑定信息？", answer:"在用户中心的账号安全区域更新手机号、密码等绑定信息。" },
  { category:"工单服务", question:"如何查看工单处理进度？", answer:"进入我的工单，可按时间、类型和关键词筛选并查看处理记录。" },
  { category:"费用中心", question:"在哪里下载账单或发票？", answer:"费用中心支持查看订单、账单和发票记录，并提供下载入口。" },
  { category:"平台服务", question:"如何使用园企协同平台？", answer:"完成企业认证后，可从首页核心功能或控制台进入对应服务。" },
];
const visibleFaqs = computed(() => faqs.filter(item => !keyword.value || `${item.question}${item.answer}${item.category}`.includes(keyword.value)));
const submitFeedback = () => {
  if (!feedbackContent.value.trim()) return ElMessage.warning("请填写反馈内容");
  ElMessage.success("反馈提交成功，我们会尽快处理");
  feedbackContent.value = "";
};
</script>

<template>
  <div class="help-view">
    <div class="page-header"><div><h2>帮助与反馈</h2><p>查找平台使用指南，或向我们提交意见建议</p></div></div>
    <section class="content-card">
      <div class="card-heading"><div><h3>帮助中心</h3><p>常见问题与平台操作说明</p></div><div class="faq-search"><i class="fas fa-search"></i><input v-model="keyword" placeholder="搜索问题关键词" /></div></div>
      <div class="faq-grid">
        <details v-for="item in visibleFaqs" :key="item.question">
          <summary><span>{{ item.category }}</span>{{ item.question }}<i class="fas fa-chevron-down"></i></summary>
          <p>{{ item.answer }}</p>
        </details>
      </div>
      <div v-if="!visibleFaqs.length" class="empty">没有找到相关问题</div>
    </section>
    <section class="content-card feedback-card">
      <div class="card-heading"><div><h3>意见反馈</h3><p>你的建议将帮助我们持续改善平台体验</p></div></div>
      <div class="feedback-layout">
        <form @submit.prevent="submitFeedback">
          <label>反馈类型<select v-model="feedbackType"><option>功能建议</option><option>使用问题</option><option>服务投诉</option><option>其他反馈</option></select></label>
          <label>反馈内容<textarea v-model="feedbackContent" rows="6" placeholder="请详细描述你遇到的问题或建议"></textarea></label>
          <button type="submit"><i class="fas fa-paper-plane"></i> 提交反馈</button>
        </form>
        <div class="feedback-history"><h4>历史反馈</h4><article><div><strong>希望增加政策订阅提醒</strong><span>功能建议 · 2026-07-02</span></div><em>处理中</em></article><article><div><strong>企业认证材料更新咨询</strong><span>使用问题 · 2026-06-25</span></div><em class="done">已完成</em></article></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.help-view{max-width:1200px}.page-header{margin-bottom:28px}.page-header h2{font-size:1.8rem;color:#0f172a;margin:0 0 8px}.page-header p,.card-heading p{color:#64748b;margin:0}.content-card{padding:28px;border:1px solid #e2e8f0;border-radius:12px;background:#fff;margin-bottom:24px}.card-heading{display:flex;align-items:center;justify-content:space-between;margin-bottom:24px}.card-heading h3{margin:0 0 7px;color:#0f172a}.faq-search{display:flex;align-items:center;gap:9px;width:320px;padding:10px 13px;border:1px solid #dbe3ee;border-radius:8px;color:#94a3b8}.faq-search input{width:100%;border:0;outline:0}.faq-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.faq-grid details{padding:16px 18px;border:1px solid #e2e8f0;border-radius:8px;background:#f8fafc}.faq-grid summary{display:flex;align-items:center;gap:10px;cursor:pointer;font-weight:700;list-style:none}.faq-grid summary span{color:#4f46e5;font-size:12px}.faq-grid summary i{margin-left:auto;color:#94a3b8}.faq-grid details p{color:#64748b;line-height:1.7;margin:14px 0 0}.feedback-layout{display:grid;grid-template-columns:1.15fr .85fr;gap:36px}.feedback-layout form{display:grid;gap:18px}.feedback-layout label{display:grid;gap:8px;color:#334155;font-weight:700}.feedback-layout select,.feedback-layout textarea{padding:11px 13px;border:1px solid #dbe3ee;border-radius:8px;font:inherit;resize:vertical}.feedback-layout form button{justify-self:start;padding:11px 20px;border:0;border-radius:7px;background:#4f46e5;color:#fff;font-weight:700;cursor:pointer}.feedback-history h4{margin-top:0}.feedback-history article{display:flex;justify-content:space-between;gap:16px;padding:16px 0;border-bottom:1px solid #eef2f7}.feedback-history article div{display:grid;gap:7px}.feedback-history span{color:#94a3b8;font-size:13px}.feedback-history em{color:#d97706;font-style:normal;font-size:12px}.feedback-history em.done{color:#16a34a}.empty{text-align:center;color:#94a3b8;padding:30px}@media(max-width:800px){.card-heading,.feedback-layout{display:flex;flex-direction:column;align-items:stretch;gap:20px}.faq-search{width:auto}.faq-grid{grid-template-columns:1fr}}
</style>
