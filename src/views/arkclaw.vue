<script setup lang="ts">
import { onMounted, ref } from "vue";
import { config } from "@/config/axios/config";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { apiAdmSolutionRequests } from "@/api/newApi/index";

const router = useRouter();

onMounted(() => {
  document.title = "仓龙Claw｜让AI成为企业真正可用的生产力";
});

const handleClick = () => {
  window.open(
    "https://userpool-f619a056-74d6-48e1-b778-3c4933e065f2.userpool.auth.id.cn-beijing.volces.com/login/continue?authRequestId=38d22808-dd9f-478b-9463-0501250925eb",
    "_blank"
  );
};

const coreValues = [
  {
    title: "人与AI协同",
    desc: "平台内置多类型专家，包括营销、运营、数据分析、设计等角色，用户无需学习复杂工具，可以直接调用专家完成任务",
    icon: "fas fa-users-cog",
  },
  {
    title: "技能驱动",
    desc: "将具体工作能力沉淀为“技能”，技能可复用、可组合，帮助企业形成长期能力资产",
    icon: "fas fa-layer-group",
  },
  {
    title: "自动化执行",
    desc: "支持任务流程自动执行，减少重复操作，实现持续运行",
    icon: "fas fa-robot",
  },
  {
    title: "企业级协同",
    desc: "团队共享专家与技能，统一工作方式，提高协作效率",
    icon: "fas fa-network-wired",
  },
];

const advantages = [
  {
    title: "可以直接产出结果",
    desc: "区别于传统 AI 对话工具，仓龙 Claw预制行业主虾 + 子虾，直接完成任务并输出成品",
  },
  {
    title: "能力可沉淀",
    desc: "所有使用过程可沉淀为技能，主虾 / 子虾可迭代升级，构建企业专属能力体系",
  },
  {
    title: "流程自动化",
    desc: "主虾统筹规划，子虾批量执行，全流程自动化，减少人工参与",
  },
  {
    title: "适配多行业",
    desc: "预制电商、内容、教育、汽车、金融、企业服务等多行业主虾与子虾，开箱即用",
  },
];
import { scenarios } from "@/data/arkclawData";

const dialogVisible = ref(false);
const currentImageUrl = ref("");

const handleViewProcess = (imageUrl: string) => {
  currentImageUrl.value = imageUrl || "";
  dialogVisible.value = true;
};

const skills = [
  { title: "内容生产技能", desc: "用于批量生成多平台内容" },
  { title: "PPT生成技能", desc: "用于快速制作汇报材料" },
  { title: "内容重组技能", desc: "将长内容转为短内容" },
  { title: "数据分析技能", desc: "用于自动生成业务报告" },
];

const goToDetail = (index: number) => {
  router.push({ path: "/arkclaw/detail", query: { id: index } });
};

// Form state
const form = ref({
  company: "",
  contact: "",
  phone: "",
  email: "",
  wxAccount: "",
  presetPassword: "",
  demand: "",
});

const submitted = ref(false);
const submitting = ref(false);

const handleSubmit = async () => {
  if (!form.value.contact || !form.value.phone || !form.value.email)
    return ElMessage.success("请填写联系人、手机号、邮箱");

  submitting.value = true;
  try {
    const solutionName = "仓龙Claw";
    apiAdmSolutionRequests(JSON.stringify({ ...form.value, solutionName }));
    submitted.value = true;
    form.value = {
      company: "",
      contact: "",
      phone: "",
      email: "",
      presetPassword: "",
      demand: "",
    };
    ElMessage.success("提交成功，我们会尽快联系您");
  } catch (e) {
    ElMessage.info("提交失败，请重试");
  } finally {
    submitting.value = false;
  }
};

// Pricing functionality
const quantities = ref({
  starter: 0,
  standard: 0,
  premium: 0,
  ultimate: 0,
});

const bindOptions = ref({
  starter: false,
  standard: false,
  premium: false,
  ultimate: false,
});

const increaseQuantity = (plan: string) => {
  if (quantities.value[plan as keyof typeof quantities.value] !== undefined) {
    quantities.value[plan as keyof typeof quantities.value]++;
  }
};

const decreaseQuantity = (plan: string) => {
  if (
    quantities.value[plan as keyof typeof quantities.value] !== undefined &&
    quantities.value[plan as keyof typeof quantities.value] > 0
  ) {
    quantities.value[plan as keyof typeof quantities.value]--;
  }
};

const toggleBindOption = (plan: string) => {
  if (bindOptions.value[plan as keyof typeof bindOptions.value] !== undefined) {
    bindOptions.value[plan as keyof typeof bindOptions.value] = !bindOptions.value[plan as keyof typeof bindOptions.value];
  }
};

const getTotalPrice = (plan: string) => {
  const basePrices = {
    starter: 210,
    standard: 430,
    premium: 860,
    ultimate: 1720
  };
  const bindPrices = {
    starter: 120,
    standard: 120,
    premium: 600,
    ultimate: 600
  };
  
  const basePrice = basePrices[plan as keyof typeof basePrices] || 0;
  const bindPrice = bindOptions.value[plan as keyof typeof bindOptions.value] ? (bindPrices[plan as keyof typeof bindPrices] || 0) : 0;
  
  return basePrice ;
};

const subscribe = (plan: string) => {
  // const quantity = quantities.value[plan as keyof typeof quantities.value];
  // if (quantity === 0) {
  //   alert("请选择订阅数量");
  //   return;
  // }
  // ElMessage.success(`已成功订阅 ${quantity} 个 ${plan} 版本`);
  // 跳转到表单区域
  scrollToForm();
};

const scrollToForm = () => {
  const formElement = document.getElementById("contact-form");
  if (formElement) {
    formElement.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<template>
  <div class="claw-landing">
    <!-- Hero Section -->
    <header class="hero">
      <div class="hero-bg">
        <div class="glow-sphere"></div>
      </div>
      <div class="container hero-content">
        <div class="text-area text-center">
          <h1>仓龙Claw, 企业级AI生产力</h1>
          <p class="subtitle mx-auto">
            企业级智能工作平台-通过专家、技能与自动化，帮助企业提升效率与产出能力
          </p>
          <div class="cta-group justify-center">
            <button class="primary-btn pulse-glow" @click="handleClick">
              开始体验
            </button>
            <button class="primary-btn pulse-glow" @click="subscribe('starter')">
              咨询我们
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Core Values Section -->
    <section class="section-padding bg-white" style="padding: 30px 0">
      <div class="container">
        <div class="section-title">
          <h2>核心价值</h2>
          <p>仓龙Claw不只是一个AI工具，而是一个可以替企业完成工作的系统</p>
        </div>
        <div class="value-grid">
          <div
            v-for="(item, index) in coreValues"
            :key="index"
            class="value-card"
          >
            <div class="icon-box"><i :class="item.icon"></i></div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <!-- Application Scenarios Section -->
    <section class="section-padding bg-white" style="padding: 30px 0">
      <div class="container">
        <div class="section-title">
          <h2>应用场景</h2>
        </div>
        <div class="scenario-list">
          <div
            v-for="(scene, index) in scenarios"
            :key="index"
            class="scenario-item1"
            @click="goToDetail(index)"
            style="cursor: pointer"
          >
            <div class="scene-header">
              <img :src="scene.logo" alt="Scenario Image" class="scene-image" />
              <h3>{{ scene.title }}</h3>
              <p class="scene-desc">{{ scene.desc1 }}</p>
              <!-- <div class="tag-group">
                <span v-for="tag in scene.tags" :key="tag" class="pill-tag">{{ tag }}</span>
              </div> -->
            </div>
            <div class="shrimp-info">
              <div v-if="index === 0" class="shrimp-content">
                <div class="shrimp-details">
                  <p><strong>主虾：</strong>电商全域运营主虾</p>
                  <p>
                    <strong>子虾：</strong
                    >商品上架子虾、营销推广子虾、数据分析子虾、客服应答子虾
                  </p>
                </div>
              </div>
              <div v-else-if="index === 1" class="shrimp-content">

                <div class="shrimp-details">
                  <p><strong>主虾：</strong>短剧内容创作主虾</p>
                  <p>
                    <strong>子虾：</strong
                    >创意生成子虾、分镜设计子虾、视频合成子虾、成片输出子虾
                  </p>
                </div>
              </div>
              <div v-else-if="index === 2" class="shrimp-content">

                <div class="shrimp-details">
                  <p><strong>主虾：</strong>行业研究主虾</p>
                  <p>
                    <strong>子虾：</strong
                    >信息采集子虾、数据清洗子虾、报告撰写子虾、趋势研判子虾
                  </p>
                </div>
              </div>
              <div v-else-if="index === 3" class="shrimp-content">
                <div class="shrimp-details">
                  <p><strong>主虾：</strong>直播运营主虾</p>
                  <p>
                    <strong>子虾：</strong
                    >选品分析子虾、机会评估子虾、策略生成子虾、复盘总结子虾
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Advantages Section -->
    <section class="section-padding bg-light">
      <div class="container">
        <div class="section-title">
          <h2>仓龙Claw核心优势</h2>
        </div>
        <div class="advantage-grid">
          <div
            v-for="(adv, index) in advantages"
            :key="index"
            class="advantage-card"
          >
            <div class="adv-num">0{{ index + 1 }}</div>
            <h3>{{ adv.title }}</h3>
            <p>{{ adv.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Skill System Section -->
    <section class="section-padding dark-bg">
      <div class="container">
        <div class="section-title white">
          <h2>技能体系</h2>
          <p>将复杂工作封装为一键执行能力</p>
        </div>
        <div class="skill-layout">
          <div class="skill-examples">
            <div
              v-for="(skill, index) in skills"
              :key="index"
              class="skill-card"
            >
              <h4>{{ skill.title }}</h4>
              <p>{{ skill.desc }}</p>
            </div>
          </div>
          <div class="skill-value">
            <h3>技能带来的价值</h3>
            <ul class="value-list">
              <li><i class="fas fa-check-circle"></i> 降低使用门槛</li>
              <li><i class="fas fa-check-circle"></i> 提高复用效率</li>
              <li><i class="fas fa-check-circle"></i> 形成标准化流程</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section class="section-padding bg-white">
      <div class="container">
        <div class="section-title">
          <h2>产品报价</h2>
          <p>选择适合您企业的仓龙Claw版本</p>
        </div>
        <div class="pricing-grid">
          <!-- Starter Plan -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>轻量版 Starter</h3>
              <div class="price-tag">
                <span class="price">{{ getTotalPrice('starter') }}</span>
                <span class="unit">元/月</span>
                <div v-if="bindOptions.starter" class="bind-price">+ 120 元/月</div>
              </div>
              <div class="plan-tag">基础体验</div>
            </div>
            <div class="pricing-body">
              <div class="plan-info">
                <div class="info-item">
                  <strong>标签：</strong>简单测试场景
                </div>
                <div class="info-item bind-option">
                  <label class="bind-checkbox">
                    <input type="checkbox" v-model="bindOptions.starter">
                    <span class="checkmark"></span>
                    <span class="bind-text">绑定 CodingPlan Team Lite ¥120 / 月（后续无法取消或重新绑定）</span>
                  </label>
                </div>
                <!-- <div class="info-item">
                  <strong>数量选择：</strong>
                  <div class="quantity-selector">
                    <button class="qty-btn" @click="decreaseQuantity('starter')" :disabled="quantities.starter <= 0">-</button>
                    <span class="qty-value">{{ quantities.starter }}</span>
                    <button class="qty-btn" @click="increaseQuantity('starter')">+</button>
                  </div>
                </div> -->
              </div>
              <div class="plan-features">
                <h4>功能：</h4>
                <ul class="feature-list">
                  <li>基础算力：2 核 CPU | 4 GB 运行内存</li>
                  <li>40 GB 持久存储云盘空间</li>
                  <li>企业网盘：10 GB 空间配额支持文件快传</li>
                  <li>基础防护：模型安全防火墙</li>
                  <li>IM 对接：支持飞书、企业微信、钉钉等登录</li>
                  <li>Skill 生成：自然语言生成 Skill</li>
                </ul>
              </div>
            </div>
            <div class="pricing-footer">
              <button class="btn-subscribe" @click="subscribe('starter')">
                立即订阅
              </button>
            </div>
          </div>

          <!-- Standard Plan -->
          <div class="pricing-card popular">
            <div class="pricing-header">
              <div class="popular-badge">最受欢迎</div>
              <h3>标准版 Standard</h3>
              <div class="price-tag">
                <span class="price">{{ getTotalPrice('standard') }}</span>
                <span class="unit">元/月</span>
                <div v-if="bindOptions.standard" class="bind-price">+ 120 元/月</div>
              </div>
              <div class="plan-tag">更高性能</div>
            </div>
            <div class="pricing-body">
              <div class="plan-info">
                <div class="info-item">
                  <strong>标签：</strong
                  >自动化办公场景、流程审批场景、知识检索场景
                </div>
                <div class="info-item bind-option">
                  <label class="bind-checkbox">
                    <input type="checkbox" v-model="bindOptions.standard">
                    <span class="checkmark"></span>
                    <span class="bind-text">绑定 CodingPlan Team Lite ¥120 / 月（后续无法取消或重新绑定）</span>
                  </label>
                </div>
                <!-- <div class="info-item">
                  <strong>数量选择：</strong>
                  <div class="quantity-selector">
                    <button class="qty-btn" @click="decreaseQuantity('standard')" :disabled="quantities.standard <= 0">-</button>
                    <span class="qty-value">{{ quantities.standard }}</span>
                    <button class="qty-btn" @click="increaseQuantity('standard')">+</button>
                  </div>
                </div> -->
              </div>
              <div class="plan-features">
                <h4>功能：</h4>
                <ul class="feature-list">
                  <li>基础算力：4 核 CPU | 8 GB 运行内存</li>
                  <li>80 GB 持久存储云盘空间</li>
                  <li>企业网盘：20 GB 空间配额支持文件快传</li>
                  <li>进阶防护：Skills 风险扫描，防数据泄露</li>
                  <li>企业对接：企业 AD 体系打通</li>
                  <li>网络互通：打通出 / 入向企业私网，安全访问企业内部服务</li>
                  <li>模型管理：灵活切换，支持 Tokens 消耗管理</li>
                </ul>
              </div>
            </div>
            <div class="pricing-footer">
              <button
                class="btn-subscribe primary"
                @click="subscribe('premium')"
              >
                立即订阅
              </button>
            </div>
          </div>

          <!-- Premium Plan -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>高级版 Premium</h3>
              <div class="price-tag">
                <span class="price">{{ getTotalPrice('premium') }}</span>
                <span class="unit">元/月</span>
                <div v-if="bindOptions.premium" class="bind-price">+ 600 元/月</div>
              </div>
              <div class="plan-tag">全面进阶</div>
            </div>
            <div class="pricing-body">
              <div class="plan-info">
                <div class="info-item">
                  <strong>标签：</strong>大规模数据处理、长文本解析、视觉识别
                </div>
                <div class="info-item bind-option">
                  <label class="bind-checkbox">
                    <input type="checkbox" v-model="bindOptions.premium">
                    <span class="checkmark"></span>
                    <span class="bind-text">绑定 CodingPlan Team Pro ¥600 / 月（后续无法取消或重新绑定）</span>
                  </label>
                </div>
                <!-- <div class="info-item">
                  <strong>数量选择：</strong>
                  <div class="quantity-selector">
                    <button class="qty-btn" @click="decreaseQuantity('premium')" :disabled="quantities.premium <= 0">-</button>
                    <span class="qty-value">{{ quantities.premium }}</span>
                    <button class="qty-btn" @click="increaseQuantity('premium')">+</button>
                  </div>
                </div> -->
              </div>
              <div class="plan-features">
                <h4>功能：</h4>
                <ul class="feature-list">
                  <li>基础算力：8 核 CPU | 16 GB 运行内存</li>
                  <li>160 GB 持久存储云盘空间</li>
                  <li>企业网盘：40 GB 空间配额支持文件快传</li>
                  <li>高阶防护：零信任鉴权，Claw 安全可控</li>
                  <li>Skill 管理：企业私有仓库，支持 Skill 录制 & 定向推荐</li>
                  <li>Claw Team：蜂群式任务执行</li>
                  <li>记忆管理：个人、企业两级记忆隔离管理</li>
                  <li>资源节省：智能节省模型 Token 消耗</li>
                </ul>
              </div>
            </div>
            <div class="pricing-footer">
              <button class="btn-subscribe" @click="subscribe('premium')">
                立即订阅
              </button>
            </div>
          </div>

          <!-- Ultimate Plan -->
          <div class="pricing-card">
            <div class="pricing-header">
              <h3>旗舰版 Ultimate</h3>
              <div class="price-tag">
                <span class="price">{{ getTotalPrice('ultimate') }}</span>
                <span class="unit">元/月</span>
                <div v-if="bindOptions.ultimate" class="bind-price">+ 600 元/月</div>
              </div>
              <div class="plan-tag">顶级配置</div>
            </div>
            <div class="pricing-body">
              <div class="plan-info">
                <div class="info-item">
                  <strong>标签：</strong>多模态处理、多智能体协同、复杂循环任务
                </div>
                <div class="info-item bind-option">
                  <label class="bind-checkbox">
                    <input type="checkbox" v-model="bindOptions.ultimate">
                    <span class="checkmark"></span>
                    <span class="bind-text">绑定 CodingPlan Team Pro ¥600 / 月（后续无法取消或重新绑定）</span>
                  </label>
                </div>
                <!-- <div class="info-item">
                  <strong>数量选择：</strong>
                  <div class="quantity-selector">
                    <button class="qty-btn" @click="decreaseQuantity('ultimate')" :disabled="quantities.ultimate <= 0">-</button>
                    <span class="qty-value">{{ quantities.ultimate }}</span>
                    <button class="qty-btn" @click="increaseQuantity('ultimate')">+</button>
                  </div>
                </div> -->
              </div>
              <div class="plan-features">
                <h4>功能：</h4>
                <ul class="feature-list">
                  <li>基础算力：16 核 CPU | 32 GB 运行内存</li>
                  <li>160 GB 持久存储云盘空间</li>
                  <li>企业网盘：80 GB 空间配额支持文件快传</li>
                  <li>企业安全：端到端审计追溯</li>
                  <li>Skill 生态：技能注册发现</li>
                  <li>应用管理：数字龙虾工厂，快速克隆</li>
                  <li>免运维：龙虾自动升级</li>
                  <li>多模式切换：问答 / 助理 / Agent 自动切换</li>
                  <li>多系统扩展：XUA 支持，多系统自动化扩展</li>
                </ul>
              </div>
            </div>
            <div class="pricing-footer">
              <button class="btn-subscribe" @click="subscribe('ultimate')">
                立即订阅
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- Consultation Form Section -->
    <section id="contact-form" class="section-padding bg-white">
      <div class="container">
        <div class="form-container">
          <div class="form-container-left">
            <h2>申请开通仓龙 Claw 企业席位，解锁：</h2>
            <p class="form-description">
              填写信息提交申请，专人对接开通流程，助力企业高效落地 AI 生产力。
            </p>
            <div class="form-features">
              <div class="form-feature-item">
                <i class="fas fa-check-circle"></i>
                <span>专属算力与持久存储空间</span>
              </div>
              <div class="form-feature-item">
                <i class="fas fa-check-circle"></i>
                <span>一键部署智能体，自动化处理复杂任务</span>
              </div>
              <div class="form-feature-item">
                <i class="fas fa-check-circle"></i>
                <span>多模态理解、工具交互与云浏览器操作能力</span>
              </div>
            </div>
          </div>
          <div class="form-container-right">
            <div v-if="submitted" class="success-message">
              <i class="fas fa-check-circle"></i>
              <h3>提交成功</h3>
              <p>我们已收到您的诉求卷宗，<br />架构师将火速与您联系</p>
              <button class="btn-reset" @click="submitted = false">
                再次咨询
              </button>
            </div>

            <form v-else class="consult-form" @submit.prevent="handleSubmit">
              <div class="form-header-minimal">
                <h3>获取专属方案</h3>
                <p>请留下您的联系方式</p>
              </div>

              <div class="form-group">
                <label>企业名称</label>
                <input
                  v-model="form.company"
                  type="text"
                  placeholder="输入企业主体名称"
                />
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>您的姓名 <span class="required">*</span></label>
                  <input
                    v-model="form.contact"
                    type="text"
                    placeholder="怎么称呼"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>联系电话 <span class="required">*</span></label>
                  <input
                    v-model="form.phone"
                    type="text"
                    placeholder="用于接收方案"
                    required
                  />
                </div>
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label>邮箱 <span class="required">*</span></label>
                  <input
                    v-model="form.email"
                    type="email"
                    placeholder="请输入邮箱地址"
                    required
                  />
                </div>
                <div class="form-group">
                  <label>微信号</label>
                  <input
                    v-model="form.wxAccount"
                    type="text"
                    placeholder="请输入微信号"
                  />
                </div>
              </div>

              <!-- <div class="form-row">
                <div class="form-group">
                  <label>预设密码 <span class="required">*</span></label>
                  <input
                    v-model="form.presetPassword"
                    type="password"
                    placeholder="设置登录密码"
                    required
                  />
                </div>
              </div> -->

              <div class="form-group">
                <label>核心诉求描述</label>
                <textarea
                  v-model="form.demand"
                  rows="3"
                  placeholder="描述您的业务现状或痛点..."
                ></textarea>
              </div>

              <button type="submit" class="btn-submit" :disabled="submitting">
                {{ submitting ? "信息加密上传.." : "提交需求" }}
              </button>
              <p class="privacy-note">
                <i class="fas fa-lock"></i> 信息已采用端到端加密保护
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
    <!-- Conversion Section -->
    <section class="section-padding cta-section">
      <div class="container text-center">
        <h2 class="cta-title">让AI真正为企业工作，而不是增加使用负担</h2>
        <div class="mt-8">
          <button class="primary-btn pulse-glow large-btn" @click="handleClick">
            立即体验仓龙Claw
          </button>
        </div>
      </div>
    </section>

    <!-- Image Preview Dialog -->
    <el-dialog
      v-model="dialogVisible"
      title="流程详情"
      width="60%"
      center
      align-center
    >
      <div class="preview-img-wrapper">
        <img
          v-if="currentImageUrl"
          :src="currentImageUrl"
          alt="流程预览"
          class="preview-img"
        />
        <div v-else class="preview-placeholder">
          <i class="fas fa-image"></i>
          <p>暂无流程演示图片</p>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style scoped lang="scss">
.claw-landing {
  background: #ffffff;
  color: #1e293b;
  font-family: system-ui, -apple-system, sans-serif;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.section-padding {
  padding: 100px 0;
}

.text-center {
  text-align: center;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.justify-center {
  justify-content: center;
}

.mt-8 {
  margin-top: 2rem;
}

.bg-white {
  background: #ffffff;
}

.bg-light {
  background: #f8fafc;
}

.dark-bg {
  background: #0f172a;
  color: white;
}

.section-title {
  text-align: center;
  margin-bottom: 60px;
}

.section-title h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: #0f172a;
}

.section-title.white h2,
.section-title.white p {
  color: white;
}

.section-title p {
  font-size: 1.25rem;
  color: #64748b;
}

/* Hero Section */
.hero {
  height: 450px;
  //   background: #0f172a;
  background: url("@/assets/images/arkclaw_bgc.png") no-repeat center
    center/cover;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  z-index: 0;
  background: rgba(15, 23, 42, 0.4); /* Add dark overlay */
}

.glow-sphere {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(79, 70, 229, 0.2) 0%,
    transparent 70%
  );
  border-radius: 50%;
  filter: blur(40px);
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 100%;
}

.tag {
  display: inline-block;
  padding: 6px 16px;
  background: #4f46e5;
  color: #fff;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  margin-bottom: 24px;
}

.hero h1 {
  font-size: 3rem;
  font-weight: 850;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  line-height: 1.2;
  margin: 24px 0;
}

.hero .subtitle {
  font-size: 1.2rem;
  color: #f1f5f9;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.5);
  margin-bottom: 40px;
  max-width: 800px;
}

.cta-group {
  display: flex;
  gap: 16px;
}

.primary-btn {
  padding: 16px 40px;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 50px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 10px 25px -3px rgba(79, 70, 229, 0.4);
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.primary-btn.large-btn {
  padding: 20px 60px;
  font-size: 1.25rem;
}

.primary-btn:hover {
  transform: translateY(-3px) scale(1.05);
  background: linear-gradient(135deg, #4338ca 0%, #2563eb 100%);
  box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
}

.pulse-glow {
  animation: pulse-glow 2s infinite;
}

@keyframes pulse-glow {
  0% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0.7);
  }
  70% {
    box-shadow: 0 0 0 15px rgba(79, 70, 229, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(79, 70, 229, 0);
  }
}

/* Core Values Grid */
.value-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.value-card {
  background: #f8fafc;
  padding: 32px 24px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
}

.value-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  border-color: #4f46e5;
}

.value-card .icon-box {
  font-size: 2rem;
  color: #4f46e5;
  margin-bottom: 12px;
}

.value-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0f172a;
}

.value-card p {
  color: #64748b;
  line-height: 1.4;
  font-size: 0.9rem;
}

/* Advantages Grid */
.advantage-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
}

.advantage-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  transition: all 0.3s;
}

.advantage-card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
}

.adv-num {
  font-size: 3rem;
  font-weight: 900;
  color: #e0e7ff;
  margin-bottom: 16px;
}

.advantage-card h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.advantage-card p {
  color: #64748b;
  font-size: 1.1rem;
  line-height: 1.6;
}

/* Scenarios List */
.scenario-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.scenario-item1 {
  background: #ffffff;
  border-radius: 16px;
  padding: 24px;
  border: 2px solid #e2e8f0;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  .scene-header{
    flex: 1;
  }
  .shrimp-info{
    flex: 1;
  }
}

.scenario-item1::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  border-radius: 16px 16px 0 0;
}

.scenario-item1:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.15);
  border-color: #4f46e5;
}

.scene-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.scene-image {
  width: 64px;
  height: 64px;
  border-radius: 12px;
  background: #f0f3ff;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1);
  transition: all 0.3s;
}

.scenario-item:hover .scene-image {
  background: #e0e7ff;
  transform: scale(1.05);
}

.scene-header h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #0f172a;
  line-height: 1.4;
}

.scene-desc {
  font-size: 0.95rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
  flex: 1;
}

.scenario-item .tag-group {
  margin-top: 8px;
}

.pill-tag {
  background: #f0f3ff;
  color: #4f46e5;
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-right: 8px;
  margin-bottom: 8px;
  display: inline-block;
  transition: all 0.3s;
}

.scenario-item:hover .pill-tag {
  background: #4f46e5;
  color: #ffffff;
}

.tag-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.pill-tag {
  background: #e0e7ff;
  color: #4f46e5;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
}

.scene-process {
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  margin-top: auto;
}

.scene-process h4 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 24px;
  color: #0f172a;
}

.process-steps {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.process-step {
  display: flex;
  align-items: center;
  gap: 16px;
}
.ViewProcess {
  margin-left: auto;
  color: #4f46e5;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  padding: 4px 12px;
  background: #f0f3ff;
  border-radius: 14px;
  transition: all 0.3s;
}
.ViewProcess:hover {
  background: #4f46e5;
  color: #ffffff;
}

.preview-img-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}
.preview-img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.preview-placeholder {
  text-align: center;
  color: #94a3b8;
}
.preview-placeholder i {
  font-size: 3rem;
  margin-bottom: 16px;
}

.step-dot {
  width: 12px;
  height: 12px;
  background: #4f46e5;
  border-radius: 50%;
  position: relative;
}

.process-step:not(:last-child) .step-dot::after {
  content: "";
  position: absolute;
  top: 12px;
  left: 5px;
  width: 2px;
  height: 24px;
  background: #e2e8f0;
}

.process-step span {
  font-weight: 600;
  color: #334155;
}

/* Skills Layout */
.skill-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;
  align-items: center;
}

.skill-examples {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.skill-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.skill-card:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #818cf8;
}

.skill-card h4 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 12px;
  color: white;
}

.skill-card p {
  color: #94a3b8;
}

.skill-value h3 {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 32px;
  color: white;
}

.value-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.value-list li {
  font-size: 1.2rem;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 12px;
}

.value-list i {
  color: #10b981;
  font-size: 1.5rem;
}

/* CTA Section */
.cta-section {
  background: linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%);
}

.cta-title {
  font-size: 3rem;
  font-weight: 850;
  color: #0f172a;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.3;
}

@media (max-width: 1024px) {
  .value-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .skill-layout {
    grid-template-columns: 1fr;
  }
  .scenario-list {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .advantage-grid {
    grid-template-columns: 1fr;
  }
  .value-grid {
    grid-template-columns: 1fr;
  }
  .skill-examples {
    grid-template-columns: 1fr;
  }
  .scenario-list {
    grid-template-columns: 1fr;
  }
  .hero h1 {
    font-size: 2.2rem;
  }
  .cta-title {
    font-size: 2.2rem;
  }
  .form-container {
    flex-direction: column;
    gap: 40px;
  }
  .form-container-left,
  .form-container-right {
    width: 100%;
  }
}

/* Form Section */
.form-container {
  display: flex;
  gap: 60px;
  align-items: center;
}

.form-container-left {
  flex: 1;
  max-width: 500px;
}

.form-container-left h2 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #0f172a;
}

.form-description {
  font-size: 1.1rem;
  color: #64748b;
  margin-bottom: 32px;
  line-height: 1.6;
}

.form-features {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-feature-item {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.1rem;
  color: #334155;
}

.form-feature-item i {
  color: #10b981;
  font-size: 1.2rem;
}

.form-container-right {
  flex: 1;
  max-width: 500px;
}

.success-message {
  background: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  color: #166534;
}

.success-message i {
  font-size: 3rem;
  margin-bottom: 16px;
  color: #10b981;
}

.success-message h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 12px;
}

.success-message p {
  margin-bottom: 24px;
  line-height: 1.6;
}

.btn-reset {
  padding: 12px 32px;
  background: #ffffff;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-reset:hover {
  background: #4f46e5;
  color: #ffffff;
}

.consult-form {
  background: #f8fafc;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
}

.form-header-minimal {
  margin-bottom: 24px;
}

.form-header-minimal h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #0f172a;
}

.form-header-minimal p {
  color: #64748b;
  font-size: 1rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #334155;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  background: #ffffff;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
}

.form-row .form-group {
  flex: 1;
  margin-bottom: 0;
}

.required {
  color: #ef4444;
}

.btn-submit {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 16px;
}

.btn-submit:hover {
  background: linear-gradient(135deg, #4338ca 0%, #2563eb 100%);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

.btn-submit:disabled {
  background: #94a3b8;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.privacy-note {
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.privacy-note i {
  color: #10b981;
}

/* Pricing Section */
.pricing-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-top: 60px;
}

.pricing-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;
  transition: all 0.3s;
  position: relative;
  display: flex;
  flex-direction: column;
}

.pricing-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05);
  border-color: #4f46e5;
}

.pricing-card.popular {
  border-color: #4f46e5;
  background: #f0f3ff;
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(79, 70, 229, 0.1);
}

.popular-badge {
  position: absolute;
  top: 0;
  right: 0;
  background: #4f46e5;
  color: white;
  padding: 6px 16px;
  border-radius: 0 16px 0 16px;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-header {
  text-align: center;
  margin-bottom: 24px;
}

.pricing-header h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.price-tag {
  display: flex;
  align-items: baseline;
  justify-content: center;
  margin-bottom: 12px;
}

.price {
  font-size: 1.1rem;
  font-weight: 800;
  color: #4f46e5;
  margin-right: 8px;
}

.unit {
  font-size: 1.1rem;
  color: #4f46e5;
}

.plan-tag {
  display: inline-block;
  padding: 6px 16px;
  background: #e0e7ff;
  color: #4f46e5;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 600;
}

.pricing-body {
  flex: 1;
  margin-bottom: 24px;
}

.plan-info {
  margin-bottom: 24px;
}

.info-item {
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #334155;
  line-height: 1.5;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 8px;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid #e2e8f0;
  background: white;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s;
}

.qty-btn:hover:not(:disabled) {
  background: #4f46e5;
  color: white;
  border-color: #4f46e5;
}

.qty-btn:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.qty-value {
  min-width: 40px;
  text-align: center;
  font-weight: 600;
  color: #0f172a;
}

.plan-features h4 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #0f172a;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  font-size: 0.9rem;
  color: #64748b;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
  line-height: 1.4;
}

.feature-list li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #4f46e5;
  font-weight: bold;
}

.pricing-footer {
  text-align: center;
}

.btn-subscribe {
  width: 100%;
  padding: 12px;
  background: white;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-subscribe:hover {
  background: #4f46e5;
  color: white;
}

.btn-subscribe.primary {
  background: #4f46e5;
  color: white;
}

.btn-subscribe.primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

@media (max-width: 1200px) {
  .pricing-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  .pricing-card.popular {
    transform: none;
  }
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: 1fr;
  }
}
.shrimp-info {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #f0f0f0;
}

.shrimp-tagline {
  font-size: 14px;
  color: #333;
  margin-bottom: 10px;
  line-height: 1.4;
}

.shrimp-details {
  font-size: 13px;
  color: #666;
  line-height: 1.5;
}

.shrimp-details p {
  margin-bottom: 5px;
}

.shrimp-details strong {
  color: #333;
}

.scenario-item {
  align-items: none !important;
}

/* Bind option checkbox styles */
.bind-option {
  margin-top: 10px;
}

.bind-checkbox {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
  user-select: none;
}

.bind-checkbox input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  height: 20px;
  width: 20px;
  background-color: #fff;
  border: 2px solid #ddd;
  border-radius: 4px;
  margin-right: 10px;
  margin-top: 2px;
  position: relative;
}

.bind-checkbox:hover input ~ .checkmark {
  border-color: #409eff;
}

.bind-checkbox input:checked ~ .checkmark {
  background-color: #409eff;
  border-color: #409eff;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.bind-checkbox input:checked ~ .checkmark:after {
  display: block;
}

.bind-checkbox .checkmark:after {
  left: 6px;
  top: 2px;
  width: 4px;
  height: 10px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.bind-text {
  flex: 1;
  font-size: 14px;
  color: #666;
  line-height: 1.4;
}

/* Price display styles */
.bind-price {
  font-size: 1.1rem;
  color: #4f46e5;
  margin-top: 5px;
  font-weight: 600;
}

.price-tag {
  position: relative;
}
</style>
