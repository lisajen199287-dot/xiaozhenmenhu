<template>
  <div class="landing-wrapper">
    <div class="container">
      <header class="header">
        <div class="logo">
          <span class="text-dark-blue font-bold">福龙</span
          ><span class="text-orange font-bold">Claw</span>
        </div>
      </header>

      <main class="hero-section">
        <div class="hero-left">
          <div class="logo">
            <span class="text-dark-blue font-bold">福龙</span>
            <span class="text-orange font-bold">Claw</span>
          </div>
          <h1 class="main-title">
            <span class="highlight-orange">开箱即用</span>的龙虾助手
          </h1>
          <p class="subtitle">让重复工作自动化，效率翻倍，成本减半</p>

          <div class="mascot-container">
            <div class="mascot-image-placeholder">
              <img class="img" src="@/assets/images/claw/banner1.png" alt="" />
            </div>
          </div>
        </div>

        <div class="hero-right">
          <div class="features-grid1">
            <div class="feature-card">
              <h3>开箱即用</h3>
              <img
                class="icon-box"
                src="@/assets/images/claw/img1.png"
                alt=""
              />
              <p class="desc-main">安装简单</p>
              <p class="desc-sub">几分钟开始自动化</p>
            </div>
            <div class="feature-card">
              <h3>成本超低</h3>
              <img
                class="icon-box"
                src="@/assets/images/claw/img2.png"
                alt=""
              />
              <p class="desc-main">按需使用</p>
              <p class="desc-sub">比人工更省钱</p>
            </div>
            <div class="feature-card">
              <h3>场景丰富</h3>
              <img
                class="icon-box"
                src="@/assets/images/claw/img3.png"
                alt=""
              />
              <p class="desc-main">覆盖多种工作场景</p>
              <p class="desc-sub">满足不同行业需求</p>
            </div>
          </div>

          <div class="comparison-card">
            <div class="comp-side traditional">
              <h4 class="comp-title">传统方式</h4>
              <ul class="comp-list">
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img10.png"
                    alt=""
                  />

                  耗时久
                </li>
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img11.png"
                    alt=""
                  />
                  易出错
                </li>
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img12.png"
                    alt=""
                  />成本高
                </li>
              </ul>
            </div>

            <div class="vs-badge">VS</div>

            <div class="comp-side fulong">
              <h4 class="comp-title">
                福龙<span class="text-orange">Claw</span>
              </h4>
              <ul class="comp-list">
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img13.png"
                    alt=""
                  />
                  速度快
                </li>
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img14.png"
                    alt=""
                  />
                  更准确
                </li>
                <li>
                  <img
                    class="comp-icon"
                    src="@/assets/images/claw/img15.png"
                    alt=""
                  />
                  成本低
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <section class="scenarios-section">
        <div class="section-header">
          <span class="arrow-icon">➔</span>
          <h2 class="section-title">适用于各种工作场景</h2>
          <span class="arrow-icon left-arrow">➔</span>
        </div>

        <div class="scenarios-grid">
          <div class="scenario-card">
            <h4 class="scenario-title">数据处理</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img4.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">自动收集、整理、统计数据</div>
          </div>
          <div class="scenario-card">
            <h4 class="scenario-title">报表生成</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img5.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">一键生成日报、周报、月报</div>
          </div>
          <div class="scenario-card">
            <h4 class="scenario-title">信息通知</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img6.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">自动发送消息、邮件提醒</div>
          </div>
          <div class="scenario-card">
            <h4 class="scenario-title">文件管理</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img7.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">自动命名、归类、整理文件</div>
          </div>
          <div class="scenario-card">
            <h4 class="scenario-title">业务跟进</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img8.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">自动跟进客户、订单、进度</div>
          </div>
          <div class="scenario-card">
            <h4 class="scenario-title">更多场景</h4>
            <div class="scenario-icon1">
              <img
                class="icon-img"
                src="@/assets/images/claw/img9.png"
                alt=""
              />
            </div>
            <div class="scenario-desc">不断扩展，满足更多需求</div>
          </div>
        </div>
      </section>
      <section class="section-padding bg-white">
        <div class="container">
          <div class="section-title">
            <h2>产品报价</h2>
            <p>选择适合您企业的福龙Claw版本</p>
          </div>
          <div class="pricing-grid">
            <!-- Starter Plan -->
            <div class="pricing-card">
              <div class="pricing-header">
                <h3>轻量版 Starter</h3>
                <div class="price-tag">
                  <span class="price">{{ getTotalPrice("starter") }}</span>
                  <span class="unit">元/月</span>
                  <div v-if="bindOptions.starter" class="bind-price">
                    + 120 元/月
                  </div>
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
                      <input type="checkbox" v-model="bindOptions.starter" />
                      <span class="checkmark"></span>
                      <span class="bind-text"
                        >绑定 CodingPlan Team Lite ¥120 /
                        月（后续无法取消或重新绑定）</span
                      >
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
                  <span class="price">{{ getTotalPrice("standard") }}</span>
                  <span class="unit">元/月</span>
                  <div v-if="bindOptions.standard" class="bind-price">
                    + 120 元/月
                  </div>
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
                      <input type="checkbox" v-model="bindOptions.standard" />
                      <span class="checkmark"></span>
                      <span class="bind-text"
                        >绑定 CodingPlan Team Lite ¥120 /
                        月（后续无法取消或重新绑定）</span
                      >
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
                    <li>
                      网络互通：打通出 / 入向企业私网，安全访问企业内部服务
                    </li>
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
                  <span class="price">{{ getTotalPrice("premium") }}</span>
                  <span class="unit">元/月</span>
                  <div v-if="bindOptions.premium" class="bind-price">
                    + 600 元/月
                  </div>
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
                      <input type="checkbox" v-model="bindOptions.premium" />
                      <span class="checkmark"></span>
                      <span class="bind-text"
                        >绑定 CodingPlan Team Pro ¥600 /
                        月（后续无法取消或重新绑定）</span
                      >
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
                    <li>
                      Skill 管理：企业私有仓库，支持 Skill 录制 & 定向推荐
                    </li>
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
                  <span class="price">{{ getTotalPrice("ultimate") }}</span>
                  <span class="unit">元/月</span>
                  <div v-if="bindOptions.ultimate" class="bind-price">
                    + 600 元/月
                  </div>
                </div>
                <div class="plan-tag">顶级配置</div>
              </div>
              <div class="pricing-body">
                <div class="plan-info">
                  <div class="info-item">
                    <strong>标签：</strong
                    >多模态处理、多智能体协同、复杂循环任务
                  </div>
                  <div class="info-item bind-option">
                    <label class="bind-checkbox">
                      <input type="checkbox" v-model="bindOptions.ultimate" />
                      <span class="checkmark"></span>
                      <span class="bind-text"
                        >绑定 CodingPlan Team Pro ¥600 /
                        月（后续无法取消或重新绑定）</span
                      >
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
    </div>

    <el-dialog
      v-model="wechatDialogVisible"
      title="客服微信"
      width="400px"
      center
      align-center
    >
      <div class="wechat-qrcode-wrapper">
        <img
          src="@/assets/images/claw/WeChat_bgc.png"
          alt="客服微信"
          class="wechat-qrcode"
        />
      </div>
    </el-dialog>

    <!-- Fixed Wechat Button -->
    <!-- <div class="fixed-wechat-btn">
      <button class="primary-btn pulse-glow" @click="goWechat()">
        客服微信
      </button>
    </div> -->

    <!-- 全局底部悬浮窗 -->
    <div class="global-bottom-floating-window">
      <img
        data-v-f54f3e5e=""
        class="cta-bg"
        src="@/assets/images/claw/cta-bar.png"
        alt=""
        aria-hidden="true"
      />
      <div data-v-f54f3e5e="" class="cta-clean-fill" aria-hidden="true"></div>
      <div data-v-f54f3e5e="" class="cta-slogan" aria-hidden="true">
        <strong data-v-f54f3e5e="">立即体验</strong>
        <span data-v-f54f3e5e="">高效新方式！</span>
      </div>
      <div data-v-f54f3e5e="" class="lead-form">
        <button
          data-v-f54f3e5e=""
          v-if="isPermission"
          type="submit"
          @click="handleClick"
        >
          立即使用
        </button>
        <button data-v-f54f3e5e="" type="submit" v-else @click="applyUse">
          马上申请 →
        </button>
        <button
          data-v-f54f3e5e=""
          class="secondary"
          type="button"
          @click="goWechat()"
        >
          客服
        </button>
      </div>
      <div data-v-f54f3e5e="" class="cta-benefits" aria-hidden="true">
        <div data-v-f54f3e5e="" class="cta-benefit">
          <span data-v-f54f3e5e="">↓</span
          ><strong data-v-f54f3e5e="">无需安装</strong
          ><em data-v-f54f3e5e="">云端运行</em>
        </div>
        <div data-v-f54f3e5e="" class="cta-benefit">
          <span data-v-f54f3e5e="">◆</span
          ><strong data-v-f54f3e5e="">安全可靠</strong
          ><em data-v-f54f3e5e="">数据加密保护</em>
        </div>
      </div>
      <!-- <div class="floating-content">
        <div class="apply-btn1" @click="applyUse">申请使用</div>
        <div class="apply-btn2" @click="goWechat()">客服微信</div>
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { apiAdmSolutionRequests } from "@/api/newApi/index";
import { ElMessageBox, ElMessage } from "element-plus";
const router = useRouter();
// 场景卡片数据抽取，方便维护和渲染
const scenariosList = ref([
  { title: "数据处理", icon: "📊", desc: "自动收集、整理、统计数据" },
  { title: "报表生成", icon: "📈", desc: "一键生成日报、周报、月报" },
  { title: "信息通知", icon: "🔔", desc: "自动发送消息、邮件提醒" },
  { title: "文件管理", icon: "📁", desc: "自动命名、归类、整理文件" },
  { title: "业务跟进", icon: "👥", desc: "自动跟进客户、订单、进度" },
  { title: "更多场景", icon: "🎛️", desc: "不断扩展，满足更多需求" },
]);

const wechatDialogVisible = ref(false);

const goWechat = () => {
  wechatDialogVisible.value = true;
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

const getTotalPrice = (plan) => {
  const basePrices = {
    starter: 210,
    standard: 430,
    premium: 860,
    ultimate: 1720,
  };
  const bindPrices = {
    starter: 120,
    standard: 120,
    premium: 600,
    ultimate: 600,
  };

  const basePrice = basePrices[plan] || 0;
  const bindPrice = bindOptions.value[plan] ? bindPrices[plan] || 0 : 0;

  return basePrice;
};
const phone = ref("");
const subscribe = (plan) => {
  if (localStorage.getItem("token") || "") {
    //已登录，未开通了福龙Claw服务
    // scrollToForm();
  } else {
    //未登录，跳转到登录页
    router.push({ path: "/login", query: { redirect: "/arkclaw" } });
  }
};
const applyUse = async () => {
  if (localStorage.getItem("token") || "") {
    // if (!phone.value) return ElMessage.error("请输入联系人手机号");
    // scrollToForm();
    const res = apiAdmSolutionRequests({
      solutionName: "福龙Claw",
      phone: phone.value,
      company: phone.value,
      contact: phone.value,
      demand: phone.value,
      wxAccount: phone.value,
      email: phone.value,
    });
    ElMessageBox.confirm(
      "您已经成功申请福龙Claw, 稍后会为您开通权限！联系客服人员可咨询办理详情。",
      "提示",
      {
        confirmButtonText: "确定",
        cancelButtonText: "联系客服",
        type: "success",
        distinguishCancelAndClose: true, // 关键：区分取消按钮和关闭按钮
      }
    )
      .then(() => {})
      .catch((action) => {
        if (action === "cancel") {
          goWechat();
        }
      });
  } else {
    //未登录，跳转到登录页
    router.push({ path: "/login", query: { redirect: "/arkclaw" } });
  }
};
const init = async () => {
  if (localStorage.getItem("token") || "") {
    const res = await newApi.apiAgUserGet();
    phone.value = res?.mobile || "";
  }
};

const isPermission = ref(false);
const isPermissionCheck = async () => {
  //判断是否登录，是否开通了福龙Claw服务
  const isLogin = localStorage.getItem("token") || "";
  if (isLogin) {
    //已登录，判断是否开通了福龙Claw服务
    const res = await newApi.apiCheckAuth2AuthorizeCode();
    isPermission.value = res;
  } else {
    isPermission.value = false;
  }
};

const handleClick = async () => {
  //检查当前用户是否已激活
  const res = await newApi.apiCheckActivation();
  const isFirstUse = res.activated;
  //是否第一次使用福龙Claw服务
  if (!isFirstUse) {
    //调用接口，保存福龙Claw服务
    const activateRes = await newApi.clawActivate({
      version: "V2",
      message: "您已激活了福龙Claw服务",
    });
    //获取默认激活信息
    const defaultRes = await newApi.clawDefault();
    ElMessageBox.confirm(defaultRes.message, "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
    }).then(() => {
      const url =
        "https://sd7g8p2f70099ijhlupg0.apigateway-cn-shanghai.volceapi.com";
      window.open(url, "_blank");
    });
  } else {
    const url =
      "https://sd7g8p2f70099ijhlupg0.apigateway-cn-shanghai.volceapi.com";
    window.open(url, "_blank");
  }
};
onMounted(() => {
  init();
  isPermissionCheck();
});
</script>

<style scoped  lang="scss">
/* 全局与重置变量 */
* {
  box-sizing: border-box;
}

.text-orange {
  color: #ff5a00;
}
.text-dark-blue {
  color: #1e3a8a;
}

/* 页面背景 */
.landing-wrapper {
  padding-bottom: 60px;
}

/* 1200px 版心 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 头部 */
.header {
  padding: 24px 0;
  font-size: 24px;
}

/* --- 首屏核心区：左右布局 --- */
.hero-section {
  display: flex;
  align-items: end;
  gap: 40px;
}

/* 左侧内容 */
.hero-left {
  flex: 1.2;
}

/* 全局底部悬浮窗 */
.global-bottom-floating-window {
  position: relative;
  position: fixed;
  left: 19%;
  right: 19%;
  bottom: 2%;
  height: 8.9%;
  border-radius: 999px;
  filter: drop-shadow(0 16px 36px rgba(255, 85, 25, 0.28));
  // background: url("@/assets/images/claw/cta-bar.png") no-repeat;
  // background-size: 100% 100%;
  // display: flex;
  // align-items: center;
  // justify-content: right;
  .cta-clean-fill {
    position: absolute;
    z-index: 1;
    inset: 0 26% 0 26.4%;
    background: linear-gradient(90deg, #ff5719, #ff6818 46%, #ff7d18);
  }
  .cta-bg {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: fill;
    border-radius: inherit;
    pointer-events: none;
  }
  .cta-slogan {
    position: absolute;
    z-index: 2;
    left: 16.4%;
    top: 0;
    bottom: 0;
    width: 14.2%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    padding-left: 2.2%;
    background: linear-gradient(90deg, #ff5019, #ff5719 48%, #ff6119);
    color: #fff;
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.12);
    height: 100%;
    strong {
      display: block;
      font-weight: 950;
      line-height: 1.08;
      white-space: nowrap;
    }
    span {
      display: block;
      font-weight: 950;
      line-height: 1.08;
      white-space: nowrap;
    }
  }
  .lead-form {
    position: absolute;
    z-index: 3;
    left: 36.8%;
    top: 19%;
    width: 24%;
    height: 58%;
    min-width: 0;
    display: grid;
    grid-template-columns: 1fr 0.56fr;
    gap: 8px;
    border-radius: 999px;
    background-color: #ff7418;
    button {
      border: 0;
      background: linear-gradient(180deg, #ffe879, #ffc82e);
      color: #241807;
      font: 950 clamp(12px, 1.22vw, 20px) / 1 "PingFang SC", "Microsoft YaHei",
        sans-serif;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 999px;
      font-weight: 600;
      box-shadow: inset 0 2px #ffffff59, 0 8px 18px #703c001f;
    }
    .secondary {
      background: #fffffff5;
      color: #ff5a17;
      border: 2px solid rgba(255, 208, 108, 0.9);
      box-shadow: 0 8px 18px #703c0014;
      cursor: pointer;
      white-space: nowrap;
      border-radius: 999px;
      font: 950 clamp(12px, 1.22vw, 20px) / 1 "PingFang SC", "Microsoft YaHei",
        sans-serif;
      font-weight: 600;
    }
  }
  .cta-benefits {
    position: absolute;
    z-index: 2;
    inset: 0 0 0 68%;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    align-items: center;
    gap: 2%;
    padding: 0 5.2% 0 3.6%;
    border-radius: 0 999px 999px 0;
    background: linear-gradient(90deg, #ff7f18, #ff8118 42%, #ff7415);
    .cta-benefit {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-rows: auto auto;
      column-gap: 10px;
      align-items: center;
      min-width: 0;
      color: #fff;
      span {
        grid-row: 1 / 3;
        width: clamp(28px, 2.7vw, 44px);
        height: clamp(28px, 2.7vw, 44px);
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: #fff;
        color: #ff6815;
        font-size: clamp(15px, 1.5vw, 24px);
        font-weight: 950;
        font-family: PingFang SC, Microsoft YaHei, Helvetica Neue, Arial,
          sans-serif;
      }
      strong {
        color: #fff;
        font-size: clamp(12px, 1.08vw, 18px);
        font-weight: 950;
        line-height: 1.1;
        white-space: nowrap;
      }
      em {
        margin-top: 4px;
        color: #ffffffeb;
        font-size: clamp(9px, 0.78vw, 13px);
        font-style: normal;
        font-weight: 850;
        line-height: 1.1;
        white-space: nowrap;
      }
    }
    .cta-benefit {
      display: grid;
      grid-template-columns: auto minmax(0, 1fr);
      grid-template-rows: auto auto;
      column-gap: 10px;
      align-items: center;
      min-width: 0;
      color: #fff;
      span {
        grid-row: 1 / 3;
        width: clamp(28px, 2.7vw, 44px);
        height: clamp(28px, 2.7vw, 44px);
        display: grid;
        place-items: center;
        border-radius: 999px;
        background: #fff;
        color: #ff6815;
        font-size: clamp(15px, 1.5vw, 24px);
        font-weight: 950;
        font-family: PingFang SC, Microsoft YaHei, Helvetica Neue, Arial,
          sans-serif;
      }
      .strong {
        color: #fff;
        font-size: clamp(12px, 1.08vw, 18px);
        font-weight: 950;
        line-height: 1.1;
        white-space: nowrap;
      }
      em {
        margin-top: 4px;
        color: #ffffffeb;
        font-size: clamp(9px, 0.78vw, 13px);
        font-style: normal;
        font-weight: 850;
        line-height: 1.1;
        white-space: nowrap;
      }
    }
  }
}

.floating-content {
  display: flex;
  align-items: center;
  border-radius: 8px;
}
.apply-btn1 {
  height: 36px;
  width: 100px;
  height: 50px;
  background: #fee066;
  color: #000;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 25px;

  line-height: 50px;
  text-align: center;
  margin-right: 20px;
}
.apply-btn2 {
  height: 36px;
  width: 100px;
  height: 50px;
  background: #fef9f5;
  color: #e97041;
  border: none;
  font-size: 15px;
  font-weight: 500;
  border-radius: 25px;

  line-height: 50px;
  text-align: center;
  margin-right: 20px;
  box-shadow: 0 2px 8px rgba(255, 90, 0, 0.2);
}

.phone-input {
  width: 150px;
  padding: 16px 20px;
  border: none;
  outline: none;
  font-size: 16px;
  background: white;
  color: #333;
  border-radius: 10px 0 0 10px;
}

.phone-input::placeholder {
  color: #999;
}

.apply-btn {
  width: 100px;
  height: 50px;
  background: #ff5a00;
  color: white;
  border: none;
  font-size: 16px;
  font-weight: 600;
  border-radius: 10px;
  line-height: 50px;
  text-align: center;
  margin-right: 20px;
}
.hero-left .logo {
  font-size: 28px;
  font-weight: 600;
}

.main-title {
  font-size: 48px;
  font-weight: 800;
  color: #1e3a8a;
  margin-bottom: 12px;
  line-height: 1.2;
}

.highlight-orange {
  color: #ff5a00;
}

.subtitle {
  font-size: 18px;
  color: #4b5563;
  margin-bottom: 20px;
}

.mascot-container {
  position: relative;
  width: 100%;
  margin: 0 auto;
}

.speech-bubble {
  position: absolute;
  top: -20px;
  right: 10px;
  background: white;
  padding: 12px 16px;
  border-radius: 12px;
  color: #ff5a00;
  font-weight: bold;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: rotate(5deg);
  z-index: 10;
}

.mascot-image-placeholder {
  width: 100%;
  // height: 350px;
  background-color: #e5e7eb;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6b7280;
  font-size: 18px;
  border-radius: 10px;
  .img {
    width: 100%;
    border-radius: 10px;
  }
}

/* 右侧内容 */
.hero-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 三大优势 Grid */
.features-grid1 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 24px 16px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  transition: transform 0.2s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.icon-box {
  width: 100%;
  font-size: 40px;
  margin-bottom: 12px;
}

.feature-card h3 {
  font-size: 16px;
  color: #1f2937;
  margin-bottom: 8px;
}

.feature-card .desc-main {
  font-size: 14px;
  color: #4b5563;
  margin-bottom: 4px;
}

.feature-card .desc-sub {
  font-size: 12px;
  color: #9ca3af;
}

/* 对比模块 */
.comparison-card {
  display: flex;
  align-items: stretch;
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

.comp-side {
  flex: 1;
  padding: 24px;
}

.comp-side.traditional {
  background-color: #ececf4;
}

.comp-side.fulong {
  background-color: #fdfdfe; /* 极淡的橙色背景 */
}

.comp-title {
  text-align: center;
  font-size: 18px;
  color: #374151;
  margin-bottom: 16px;
}

.comp-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  font-size: 14px;
  color: #4b5563;
}

.comp-list li {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.comp-icon {
  font-size: 24px;
  width: 50px;
}

.vs-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #ff5a00;
  color: white;
  font-weight: bold;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid white;
  box-shadow: 0 2px 8px rgba(255, 90, 0, 0.3);
}

/* --- 底部场景区 --- */
.scenarios-section {
  margin-top: 1px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
}

.section-title {
  font-size: 24px;
  color: #1e3a8a;
  font-weight: bold;
}

.arrow-icon {
  color: #ff5a00;
  font-size: 20px;
}

.left-arrow {
  transform: rotate(180deg);
}

/* 场景 6 列 Grid */
.scenarios-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.scenario-card {
  background: white;
  border-radius: 12px;
  padding: 20px 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.scenario-title {
  font-size: 14px;
  color: #374151;
  margin-bottom: 12px;
}

.scenario-icon1 {
  font-size: 48px;
  margin-bottom: 12px;
  width: 100%;
  margin: 10px 0;
  .icon-img {
    width: 100%;
    border-radius: 10px;
  }
}

.scenario-desc {
  font-size: 12px;
  color: #6b7280;
  line-height: 1.5;
}

/* ==================================
   响应式布局 (Mobile Adaptations)
   ================================== */
@media (max-width: 1024px) {
  /* 平板端调整 */
  .hero-section {
    flex-direction: column;
  }
  .scenarios-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }
}

@media (max-width: 768px) {
  .pricing-grid {
    grid-template-columns: repeat(1, 1fr);
  }
  /* 移动端调整 */
  .main-title {
    font-size: 32px;
    // text-align: center;
  }
  .subtitle {
    text-align: center;
  }

  .comparison-card {
    flex-direction: column;
  }
  .comp-side {
    padding: 20px;
  }
  .vs-badge {
    /* 在竖排对比中调整 VS 的位置 */
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .scenarios-grid {
    grid-template-columns: repeat(2, 1fr); /* 移动端显示两列 */
  }

  /* 全局底部悬浮窗响应式调整 */
  .global-bottom-floating-window {
    left: 5%;
    right: 5%;
    height: auto;
    min-height: 100px;
    border-radius: 20px;
  }

  .cta-slogan {
    left: 10%;
    width: 20%;
  }

  .lead-form {
    left: 35%;
    width: 30%;
    display: flex;
  }

  .cta-benefits {
    inset: 0 0 0 70%;
  }
}

@media (max-width: 480px) {
  /* 超小屏幕 */
  .comp-list {
    flex-direction: column;
    gap: 12px;
  }
  .comp-list li {
    flex-direction: row;
    justify-content: flex-start;
  }

  /* 超小屏幕底部悬浮窗调整 */
  .global-bottom-floating-window {
    left: 5%;
    right: 5%;
    bottom: 20px;
    height: auto;
    min-height: 80px;
    border-radius: 20px;
    background: linear-gradient(90deg, #ff5719, #ff6818 46%, #ff7d18);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 20px;
  }

  /* 隐藏复杂元素，只显示核心内容 */
  .global-bottom-floating-window .cta-bg,
  .global-bottom-floating-window .cta-clean-fill,
  .global-bottom-floating-window .cta-benefits {
    display: none;
  }

  /* 调整移动端布局 */
  .global-bottom-floating-window .cta-slogan {
    position: static;
    width: auto;
    background: none;
    padding: 0;
    flex: 0.8;
  }

  .global-bottom-floating-window .lead-form {
    position: static;
    width: auto;
    grid-template-columns: 1fr;
    gap: 10px;
    background: none;
    flex: 1;
    min-width: 150px;
    display: flex;
  }

  .global-bottom-floating-window .lead-form button {
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 20px;
  }

  .global-bottom-floating-window .lead-form .secondary {
    font-size: 12px;
    padding: 6px 12px;
  }
}

/* Pricing Section */
.section-padding {
  padding: 10px 0;
}

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

.bind-option {
  margin-top: 12px;
}

.bind-checkbox {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  cursor: pointer;
}

.bind-checkbox input[type="checkbox"] {
  margin-top: 2px;
}

.bind-text {
  font-size: 0.85rem;
  color: #64748b;
  line-height: 1.4;
}

.bind-price {
  font-size: 0.85rem;
  color: #4f46e5;
  margin-top: 4px;
  text-align: center;
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
    grid-template-columns: repeat(1, 1fr);
  }
  .pricing-card.popular {
    transform: none;
  }
}

/* Wechat Dialog Styles */
.wechat-qrcode-wrapper {
  text-align: center;
  padding: 20px;
}

.wechat-qrcode {
  width: 300px;
  object-fit: contain;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.fixed-wechat-btn {
  bottom: 20px;
  right: 20px;
}
.fixed-wechat-btn .primary-btn {
  padding: 12px 24px;
  font-size: 0.9rem;
}
/* Fixed Wechat Button */
.fixed-wechat-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-radius: 50%;
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
</style>