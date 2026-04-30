<template>
  <div
    class="bg-background text-on-background font-body-md antialiased pt-20 min-h-screen"
  >
    <header class="relative pt-16 pb-24 overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div
          class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#165dff]/5 rounded-full blur-3xl -translate-y-1/4 translate-x-1/4"
        ></div>
        <div
          class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#7431d3]/5 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"
        ></div>
      </div>

      <div class="max-w-[1280px] mx-auto px-6 md:px-16 relative z-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div class="lg:col-span-7 flex flex-col gap-8">
            <div
              class="inline-flex items-center gap-2 px-4 py-2 bg-[#165dff]/10 rounded-full w-fit"
            >
              <span class="text-[#165dff] text-xs font-bold"
                >✨ 基于豆包大模型</span
              >
            </div>
            <h1
              class="text-[48px] font-[800] leading-[1.1] tracking-[-0.02em] text-[#181c23]"
            >
              营销服务助手 <br />
              <span class="text-transparent bg-clip-text ai-gradient1"
                >让每一次对话，都成为业务增长的抓手</span
              >
            </h1>
            <p class="text-[18px] leading-[1.6] text-[#434656] max-w-2xl">
              基于豆包大模型打造的营销服务助手，专为销售、客服、企业信息服务场景而生，用更懂业务的
              AI，帮你搞定客户沟通、团队提效、数据沉淀，让对话不止于响应，更能驱动增长。
            </p>
            <div class="flex flex-wrap gap-4 pt-2">
              <button
                class="ai-gradient text-white px-8 py-4 rounded-lg font-bold shadow-[0_8px_16px_rgba(22,93,255,0.2)] hover:-translate-y-0.5 transition-all"
               @click="golink()">
                立即体验
              </button>
              <!-- <button
                class="bg-white text-[#165dff] px-8 py-4 rounded-lg font-bold border border-[#165dff]/10 hover:bg-[#dfe2ed] transition-all"
              >
                了解行业方案
              </button> -->
            </div>
          </div>
          <div class="lg:col-span-5 relative mt-12 lg:mt-0">
            <div
              class="bg-white rounded-xl ambient-shadow border border-[#dfe2ed]/50 overflow-hidden"
            >
              <img
                alt="Dashboard"
                class="w-full h-auto object-cover"
                src="@/assets/images/comics/banner.png"
              />
            </div>
          </div>
        </div>
      </div>
    </header>

    <section class="py-24 bg-white border-t border-[#dfe2ed]/30">
      <div class="max-w-[1280px] mx-auto px-6 md:px-16">
        <div class="text-center mb-16">
          <h2 class="text-[32px] font-[700] text-[#181c23] mb-4">
            场景化AI赋能
          </h2>
          <p class="text-[18px] text-[#434656] max-w-2xl mx-auto">
            深度结合各类业务场景，提供全链路智能辅助，让AI真正成为业务增长的引擎。
          </p>
        </div>

        <div class="flex flex-col gap-12">
          <div
            v-for="(scene, idx) in scenarios"
            :key="idx"
            :class="[
              'flex flex-col gap-12 items-center bg-[#f1f3ff] rounded-3xl p-8 lg:p-12 border border-[#dfe2ed]/50 hover:shadow-lg transition-all',
              idx % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row',
            ]"
          >
            <div class="w-full md:w-1/2">
              <div
                class="aspect-[4/3] rounded-2xl overflow-hidden shadow-md group"
              >
                <img
                  :src="scene.img"
                  class="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                />
              </div>
            </div>
            <div class="w-full md:w-1/2 flex flex-col gap-6">
              <div class="flex items-center gap-4">
                <div
                  class="w-14 h-14 rounded-xl bg-[#165dff]/10 flex items-center justify-center text-2xl"
                >
                  {{ scene.icon }}
                </div>
                <h3 class="text-[24px] font-[600] text-[#181c23]">
                  {{ scene.title }}
                </h3>
              </div>
              <ul class="flex flex-col gap-5">
                <li
                  v-for="(point, pIdx) in scene.points"
                  :key="pIdx"
                  class="flex items-start gap-4"
                >
                  <span class="text-green-500 mt-1">✓</span>
                  <div class="text-[16px]">
                    <strong class="font-semibold text-[#181c23]"
                      >{{ point.label }}：</strong
                    >
                    <span class="text-[#434656]">{{ point.text }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 bg-[#f9f9ff] border-t border-[#dfe2ed]/30">
      <div class="max-w-[1280px] mx-auto px-6 md:px-16">
        <h2 class="text-[32px] font-[700] text-[#181c23] text-center mb-16">
          四大核心能力，全流程帮你省心省力
        </h2>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div
            class="lg:col-span-7 bg-[#f1f3ff] rounded-3xl overflow-hidden border border-[#dfe2ed]/50 flex flex-col md:flex-row group hover:shadow-lg transition-all"
          >
            <div class="p-8 md:w-1/2 flex flex-col gap-6 justify-center">
              <h3 class="text-[24px] font-[600] flex items-center gap-2">
                💬 对话全流程提效
              </h3>
              <ul class="flex flex-col gap-4 text-[14px]">
                <li>
                  <strong>知识问答：</strong
                  >产品、政策、FAQ秒级响应，回复专业无偏差
                </li>
                <li>
                  <strong>通话总结：</strong>销售对话一键提炼要点，生成跟进策略
                </li>
                <li>
                  <strong>虚拟陪练：</strong
                  >AI模拟真实场景陪练，快速提升一线人员沟通能力
                </li>
              </ul>
            </div>
            <div class="md:w-1/2 h-64 md:h-auto overflow-hidden bg-blue-100">
              <img
                src="@/assets/images/comics/img5.png"
                class="w-full h-full object-cover group-hover:scale-105 transition-all"
              />
            </div>
          </div>

          <div
            class="lg:col-span-5 bg-[#f1f3ff] rounded-3xl overflow-hidden border border-[#dfe2ed]/50 flex flex-col group hover:shadow-lg transition-all"
          >
            <div class="h-48 overflow-hidden bg-purple-100">
              <img
                src="@/assets/images/comics/img6.png"
                class="w-full h-full object-cover group-hover:scale-105 transition-all"
              />
            </div>
            <div class="p-8 flex flex-col gap-6 justify-center flex-1">
              <h3 class="text-[24px] font-[600] flex items-center gap-2">
                📂 数据智能沉淀
              </h3>
              <ul class="flex flex-col gap-4 text-[14px]">
                <li>
                  <strong>信息抽取：</strong
                  >从对话中自动提取客户画像、需求等关键信息
                </li>
                <li>
                  <strong>分类打标：</strong
                  >客户意向、售后反馈快速分类，沉淀业务数据
                </li>
                <li>
                  <strong>服务质检：</strong>智能质检接待流程，规范销售话术执行
                </li>
              </ul>
            </div>
          </div>

          <div
            class="lg:col-span-5 bg-[#f1f3ff] rounded-3xl overflow-hidden border border-[#dfe2ed]/50 flex flex-col group hover:shadow-lg transition-all"
          >
            <div class="p-8 flex flex-col gap-6 justify-center flex-1">
              <h3 class="text-[24px] font-[600] flex items-center gap-2">
                🌐 多渠道智能响应
              </h3>
              <ul class="flex flex-col gap-4 text-[14px]">
                <li>
                  <strong>智能客服/外呼：</strong
                  >多渠道接待咨询、批量外呼跟进线索
                </li>
                <li>
                  <strong>情绪检测：</strong>识别客户对话情绪，辅助调整沟通策略
                </li>
              </ul>
            </div>
            <div class="h-48 overflow-hidden bg-green-100">
              <img
                src="@/assets/images/comics/img7.png"
                class="w-full h-full object-cover group-hover:scale-105 transition-all"
              />
            </div>
          </div>

          <div
            class="lg:col-span-7 bg-[#f1f3ff] rounded-3xl overflow-hidden border border-[#dfe2ed]/50 flex flex-col md:flex-row-reverse group hover:shadow-lg transition-all"
          >
            <div class="p-8 md:w-[55%] flex flex-col gap-6 justify-center">
              <h3 class="text-[24px] font-[600] flex items-center gap-2">
                🛡️ 企业级保障
              </h3>
              <ul class="flex flex-col gap-4 text-[14px]">
                <li>
                  <strong>懂业务的AI能力：</strong
                  >依托豆包大模型，理解精准，回应自然
                </li>
                <li>
                  <strong>数据安全可控：</strong>支持私有化部署，数据全流程加密
                </li>
                <li>
                  <strong>低门槛快速上线：</strong
                  >低代码配置，无需复杂开发，适配业务场景
                </li>
                <li>
                  <strong>专属技术支持：</strong
                  >全流程服务，助力快速落地AI对话场景
                </li>
              </ul>
            </div>
            <div class="md:w-[45%] h-64 md:h-auto overflow-hidden bg-slate-100">
              <img
                src="@/assets/images/comics/img8.png"
                class="w-full h-full object-cover group-hover:scale-105 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section id="consult-form" class="consult-section-dark">
      <div class="wrapper">
        <div class="form-container">
          <div class="form-header">
            <div class="section-label">GET STARTED</div>

            <h2>开启智能对话营销新体验</h2>

            <p>立即接入营销服务助手，让每一次对话都成为业务增长的动力</p>
          </div>

          <div v-if="!submitted" class="main-form">
            <div class="form-grid">
              <div class="input-group">
                <label>公司名称</label>

                <input
                  v-model="form.company"
                  type="text"
                  placeholder="请输入您的企业全称"
                />
              </div>

              <div class="input-group">
                <label>联系人姓名 *</label>

                <input
                  v-model="form.contact"
                  type="text"
                  placeholder="如何称呼您"
                />
              </div>

              <div class="input-group">
                <label>联系电话 *</label>

                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder="方便我们为您回传方案"
                />
              </div>

              <div class="input-group full">
                <label>业务痛点/详细需求</label>

                <textarea
                  v-model="form.demand"
                  rows="4"
                  placeholder="例如：我需要创作一个科幻漫画故事、角色形象设计..."
                ></textarea>
              </div>
            </div>

            <button
              class="btn-submit"
              :disabled="submitting"
              @click="handleSubmit"
            >
              <span v-if="!submitting">立即预约</span>

              <i v-else class="fas fa-spinner fa-spin"></i>
            </button>
          </div>

          <div v-else class="success-message">
            <div class="success-icon"><i class="fas fa-check-circle"></i></div>

            <h3>方案需求已成功提交</h3>
            <button class="btn-reset" @click="submitted = false">
              再次提交
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import * as newApi from "@/api/newApi/index";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
const router = useRouter();

const form = ref({
  company: "",
  contact: "",
  phone: "",
  demand: "",
});


const golink = () => {
  if (localStorage.getItem("token") || "") {
    //已登录
    scrollToForm();
  } else {
    //未登录，跳转到登录页
    router.push({ path: "/login", query: { redirect: "/ai-conversation" } });
  }
};
const scrollToForm = () => {
  const el = document.getElementById("consult-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const submitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  if (!form.value.contact || !form.value.phone)
    return alert("请填写联系人与手机号");

  submitting.value = true;
  try {
    const solutionName =
      document.querySelector("h1")?.innerText || "未知解决方案";
    await newApi.apiAdmSolutionRequests(
      JSON.stringify({ ...form.value, solutionName })
    );
    submitted.value = true;
    form.value = { company: "", contact: "", phone: "", demand: "" };
    ElMessage.success("提交成功，我们会尽快联系您");
  } catch (e) {
    ElMessage.info("提交失败，请重试");
  } finally {
    submitting.value = false;
  }
};
import icon1 from "@/assets/images/comics/img1.png";
import icon2 from "@/assets/images/comics/img2.png";
import icon3 from "@/assets/images/comics/img3.png";
import icon4 from "@/assets/images/comics/img4.png";
const scenarios = ref([
  {
    title: "汽车销售场景",
    icon: "🚗",
    img: icon1,
    points: [
      {
        label: "电话邀约",
        text: "通话实时辅助话术，自动记录客户需求，生成跟进要点",
      },
      {
        label: "到店接待",
        text: "AI模拟客户陪练，帮销售快速熟悉接待流程与产品知识",
      },
      {
        label: "客户画像",
        text: "自动抽取客户购车偏好、预算、顾虑，完善客户档案",
      },
    ],
  },
  {
    title: "保险销售场景",
    icon: "🛡️",
    img: icon2,
    points: [
      {
        label: "客户画像",
        text: "从对话中提取客户保障需求、预算，助力精准方案推荐",
      },
      {
        label: "通话复盘",
        text: "自动总结沟通要点，给销售跟进建议，帮团队复盘提升",
      },
    ],
  },
  {
    title: "在线教育客服场景",
    icon: "🎓",
    img: icon3,
    points: [
      {
        label: "在线咨询",
        text: "7×24小时接待家长咨询，秒级回复课程、活动、报名问题",
      },
      {
        label: "售后管理",
        text: "自动对家长反馈分类打标，快速定位问题，优化服务",
      },
    ],
  },
  {
    title: "通用服务场景",
    icon: "🎧",
    img: icon4,
    points: [
      {
        label: "服务质检",
        text: "智能检测接待流程，识别话术执行情况，规范服务标准",
      },
      {
        label: "录音处理",
        text: "一键转写录音，提取关键信息，省去人工整理成本",
      },
    ],
  },
]);
</script>

<style scoped>
.ai-gradient1 {
  color: #165dff;
}

/* 还原 HTML 中的特定样式 */
.ai-gradient {
  background: linear-gradient(135deg, #165dff 0%, #7431d3 100%);
}

.ambient-shadow {
  box-shadow: 0 32px 64px -12px rgba(22, 93, 255, 0.06),
    0 0 0 1px rgba(22, 93, 255, 0.05);
}

.bg-background {
  background-color: #f9f9ff;
}

.text-on-background {
  color: #181c23;
}

/* Consult Section & Form (Dark Theme) */
.consult-section-dark {
  padding: 120px 0;
  background: #000;
  color: white;
  position: relative;
}

.wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.consult-section-dark .form-container {
  max-width: 900px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  padding: 80px;
}

.consult-section-dark .form-header {
  text-align: center;
  margin-bottom: 60px;
}

.consult-section-dark .section-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4f46e5;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.consult-section-dark .form-header h2 {
  font-size: 2.8rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.consult-section-dark .form-header p {
  color: #94a3b8;
  font-size: 1.1rem;
}

.consult-section-dark .form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
}

.consult-section-dark .input-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
}

.consult-section-dark .input-group.full {
  grid-column: span 2;
}

.consult-section-dark .input-group label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #cbd5e1;
}

.consult-section-dark .input-group input,
.consult-section-dark .input-group textarea {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 18px;
  color: white;
  font-size: 1rem;
  transition: all 0.3s;
}

.consult-section-dark .input-group input:focus,
.consult-section-dark .input-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  background: rgba(255, 255, 255, 0.08);
}

.consult-section-dark .btn-submit {
  margin-top: 40px;
  width: 100%;
  padding: 22px;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  color: white;
  border: none;
  border-radius: 16px;
  font-size: 1.2rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 40px rgba(79, 70, 229, 0.3);
}

.consult-section-dark .btn-submit:hover:not(:disabled) {
  transform: translateY(-3px) scale(1.02);
  box-shadow: 0 15px 50px rgba(79, 70, 229, 0.4);
}

.consult-section-dark .success-message {
  text-align: center;
  padding: 40px 0;
}

.consult-section-dark .success-icon {
  font-size: 5rem;
  color: #10b981;
  margin-bottom: 24px;
}

.consult-section-dark .btn-reset {
  margin-top: 24px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  padding: 12px 30px;
  border-radius: 8px;
  cursor: pointer;
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .consult-section-dark .form-grid {
    grid-template-columns: 1fr;
  }
  .consult-section-dark .input-group.full {
    grid-column: span 1;
  }
  .consult-section-dark .form-container {
    padding: 40px 24px;
  }
  .consult-section-dark .form-header h2 {
    font-size: 1.8rem;
  }
}
</style>