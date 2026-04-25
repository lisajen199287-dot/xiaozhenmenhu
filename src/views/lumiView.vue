<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

import { RouterLink } from "vue-router";
import * as newApi from "@/api/newApi/index";
import { ElMessage } from "element-plus";
const categories = [
  {
    id: "short-video",
    title: "短视频创作",
    icon: "🎬",
    desc: "一键生成高质量短视频，轻松抓住流量密码",
    image:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "marketing",
    title: "营销广告",
    icon: "🎯",
    desc: "快速生成引人注目的产品展示和品牌宣传视频",
    image:
      "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "entertainment",
    title: "娱乐动漫",
    icon: "🎮",
    desc: "丰富的二次元和创意风格，释放你的想象力",
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=600",
  },
  {
    id: "education",
    title: "教育科普",
    icon: "🎓",
    desc: "将复杂概念转化为生动直观的视频演示",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600",
  },
];

const sliderValue = ref(50);

const props = defineProps({
  title: {
    type: String,
    default: "炉米 Lumi - 字节跳动 AIGC 图像创作平台",
  },

  description: {
    type: String,
    default:
      "炉米 Lumi 是字节跳动推出的强大 AIGC 图像与视频创作平台。搭载全新 Seedance 2.0 模型，为您提供前所未有的 AI 视频生成体验。",
  },
});

onMounted(() => {
  document.title = props.title;

  // Set meta description

  let metaDesc = document.querySelector('meta[name="description"]');

  if (!metaDesc) {
    metaDesc = document.createElement("meta");

    metaDesc.setAttribute("name", "description");

    document.head.appendChild(metaDesc);
  }

  metaDesc.setAttribute("content", props.description);

  // Set meta keywords

  let metaKeywords = document.querySelector('meta[name="keywords"]');

  if (!metaKeywords) {
    metaKeywords = document.createElement("meta");

    metaKeywords.setAttribute("name", "keywords");

    document.head.appendChild(metaKeywords);
  }

  metaKeywords.setAttribute(
    "content",
    "炉米, Lumi, 字节跳动, AIGC, 视频生成, Seedance 2.0, AI绘画, AI视频"
  );
});

const form = ref({
  company: "",
  contact: "",
  phone: "",
  demand: "",
});

const submitting = ref(false);
const submitted = ref(false);

const handleSubmit = async () => {
  if (!form.value.contact || !form.value.phone)
    return alert("请填写联系人与手机号");

  submitting.value = true;
  try {
    const solutionName =
      document.querySelector("h1")?.innerText || "未知解决方案";
    newApi.apiAdmSolutionRequests(
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

const agreementContent = ref("");
const showAgreementModal = ref(false);
const goLumi = async () => {
  const res = await newApi.apiAgAgreementHasAgreed();
  if (res) {
    //已签协议
    const res1 = await newApi.apiGoLumi();
    window.open(res1.redirect_url, "_blank");
  } else {
    //获取协议接口
    const res1 = await newApi.apiAgAgreement();
    agreementContent.value = res1;
    //展示弹窗
    showAgreementModal.value = true;
  }
};

//同意协议
const agreeAgreement = async () => {
  try {
    const res = await newApi.apiAgAgreementSave({
      agreementContent: agreementContent.value,
    });
    const res1 = await newApi.apiGoLumi();
    window.open(res1.redirect_url, "_blank");
    showAgreementModal.value = false;
  } catch (e) {
    console.error("Error saving agreement:", e);
  }
};

//取消协议
const cancelAgreement = () => {
  showAgreementModal.value = false;
};
const scrollToForm = () => {
  const el = document.getElementById("consult-form");
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

const seedanceImages = ref([
  {
    id: 1,
    src: "@/assets/images/cloth-bg.png",
    alt: "City Skyline",
  },
  {
    id: 2,
    src: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=elegant%20woman%20in%20evening%20dress%20with%20flowing%20fabric%2C%20white%20background%2C%20fashion%20photography&image_size=landscape_16_9",
    alt: "Fashion Model",
  },
  {
    id: 3,
    src: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=luxury%20perfume%20bottle%20on%20rock%20with%20mountain%20background%2C%20soft%20lighting%2C%20product%20photography&image_size=landscape_16_9",
    alt: "Perfume Bottle",
  },
  {
    id: 4,
    src: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=man%20in%20suit%20speaking%20with%20microphone%2C%20elegant%20background%2C%20professional%20portrait&image_size=landscape_16_9",
    alt: "Business Speaker",
  },
  {
    id: 5,
    src: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=abstract%20technology%20background%20with%20blue%20and%20purple%20hues%2C%20digital%20art&image_size=landscape_16_9",
    alt: "Technology Background",
  },
]);

const currentSeedanceSlide = ref(2); // Start with the middle image
let seedanceTimer: any = null;

const startSeedanceCarousel = () => {
  stopSeedanceCarousel();
  seedanceTimer = setInterval(() => {
    nextSeedanceSlide();
  }, 3000);
};

const stopSeedanceCarousel = () => {
  if (seedanceTimer) {
    clearInterval(seedanceTimer);
    seedanceTimer = null;
  }
};

const nextSeedanceSlide = () => {
  currentSeedanceSlide.value =
    (currentSeedanceSlide.value + 1) % seedanceImages.value.length;
};

const prevSeedanceSlide = () => {
  currentSeedanceSlide.value =
    (currentSeedanceSlide.value - 1 + seedanceImages.value.length) %
    seedanceImages.value.length;
};

const getSeedanceSlideClass = (index: number) => {
  const length = seedanceImages.value.length;
  const diff = (index - currentSeedanceSlide.value + length) % length;

  // 计算每个图片的位置
  if (diff === 0) return "active"; // 中间图片
  if (diff === 1) return "next1"; // 右侧第一张
  if (diff === 2) return "next2"; // 右侧第二张
  if (diff === length - 1) return "prev1"; // 左侧第一张
  if (diff === length - 2) return "prev2"; // 左侧第二张

  return "";
};
onMounted(() => {
  startSeedanceCarousel();
});
onUnmounted(() => {
  stopSeedanceCarousel();
});
</script>



<template>
  <div class="eco-landing">
    <!-- Hero Section -->

    <section class="eco-hero">
      <div class="wrapper hero-layout">
        <div class="hero-text">
          <h1 class="hero-title">SD2.0视频生成，让创意秒变成片</h1>

          <p class="hero-subtitle">
            全新推出SD2.0视频生成工具。从文字到图像，从静态到动态，打破创作限制，让创意无缝流转，为您带来流畅高效的视频创作体验
          </p>

          <div class="hero-cta">
            <button class="btn-primary-large" @click="goLumi()">
              立即创作
            </button>
            <button
              class="btn-secondary-large"
              @click="scrollToForm"
              style="margin-left: 16px"
            >
              咨询解决方案
            </button>
          </div>
        </div>

        <div class="hero-visual">
          <div class="comparison-slider">
            <div
              class="comparison-slider-inner"
              style="
                background-color: #000;
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <!-- 占位视频封面或实际视频 -->
              <img
                src="@/assets/images/SD/banner.png"
                alt="Seedance 2.0 视频生成演示"
                class="image-after"
                style="opacity: 1; object-fit: cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->

    <section class="eco-features" id="features">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title">SD2.0，重塑视频创作方式</h2>
        </div>

        <!-- Feature 1 -->
        <div class="feature-block">
          <div class="feature-info">
            <h3>多模式自由创作</h3>
            <p class="feature-desc">
              支持文生视频、图生视频、视频续写、主体参考、多帧编辑、视频编辑多种模式
            </p>
            <p class="feature-desc">适配不同创作场景，想法怎么来就怎么创作</p>
          </div>
          <div class="feature-visual">
            <img
              src="@/assets/images/SD/img1.png"
              alt="多模式自由创作"
              style="
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </div>

        <!-- Feature 2 -->
        <div class="feature-block reverse">
          <div class="feature-info">
            <h3>一键快速成片</h3>
            <p class="feature-desc">
              输入文字/图片/视频，或通过主体参考功能锁定核心元素
            </p>
            <p class="feature-desc">自动生成运镜流畅、细节丰富的高清视频</p>
            <p class="feature-desc">告别复杂拍摄，从创意到成片一步到位</p>
          </div>
          <div class="feature-visual">
            <img
              src="@/assets/images/SD/img2.png"
              alt="一键快速成片"
              style="
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
        </div>

        <!-- Feature 3 -->
        <div class="feature-block reverse">
          <div class="feature-visual">
            <img
              src="@/assets/images/SD/img3.png"
              alt="多帧精准控制"
              style="
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
          <div class="feature-info">
            <h3>多帧精准控制</h3>
            <p class="feature-desc">
              支持首帧/尾帧/关键帧输入，自定义镜头走向与画面衔接
            </p>
            <p class="feature-desc">让视频生成可控度拉满，轻松实现创意镜头</p>
          </div>
        </div>

        <!-- Feature 4 -->
        <div class="feature-block">
          <div class="feature-visual">
            <img
              src="@/assets/images/SD/img4.png"
              alt="视频续写与内容拓展"
              style="
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
          <div class="feature-info">
            <h3>视频续写与内容拓展</h3>
            <p class="feature-desc">上传现有视频，自动续写剧情、延伸镜头</p>
            <p class="feature-desc">让内容创作无缝衔接，降低系列片制作成本</p>
          </div>
        </div>

        <!-- Feature 5 -->
        <div class="feature-block reverse">
          <div class="feature-visual">
            <img
              src="@/assets/images/SD/img5.png"
              alt="超写实画面"
              style="
                border-radius: 12px;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
              "
            />
          </div>
          <div class="feature-info">
            <h3>超写实画面</h3>
            <p class="feature-desc">
              人物动作、表情、口型高度逼真，场景细节丰富自然
            </p>
            <p class="feature-desc">低成本拍出院线级视觉质感</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbox Section -->

    <!-- <section class="eco-toolbox" id="toolbox">
      <div class="wrapper">
        <div class="section-header">
          <h2 class="section-title text-white">让创作更高效，让梦想变成成片</h2>
        </div>

        <div class="toolbox-buttons">
          <button class="tool-button primary">立即体验</button>
          <button class="tool-button secondary">了解更多</button>
        </div>
      </div>
    </section> -->

    <!-- Final CTA -->

    <div class="scenario-card-v5 hero-card">
      <!-- Seedance 2.0 Section -->
      <div class="seedance-content compact">
        <div class="seedance-header compact">
          <div class="seedance-logo-container compact">
            <img
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20technology%20logo%20with%20blue%20and%20purple%20gradient%2C%20abstract%20design&image_size=square"
              alt="Seedance Logo"
              class="seedance-logo compact"
            />
            <h2 class="seedance-title compact">
              SD 2.0 抢先体验：让灵感，即刻实现
            </h2>
          </div>
          <p class="seedance-subtitle compact">
            适合各类场景AI视频创作需求，无论是剧情短片、营销短视频、品牌宣传片，还是自媒体爆款内容，均可一键生成，轻松实现内容高效量产。
          </p>
        </div>

        <div
          class="seedance-carousel compact"
          @mouseenter="stopSeedanceCarousel"
          @mouseleave="startSeedanceCarousel"
        >
          <div class="seedance-carousel-container">
            <div :class="['seedance-slide', getSeedanceSlideClass(0)]">
              <img
                src="@/assets/images/swipe_1.png"
                class="seedance-slide-img"
              />
            </div>
            <div :class="['seedance-slide', getSeedanceSlideClass(1)]">
              <img
                src="@/assets/images/swipe_2.png"
                class="seedance-slide-img"
              />
            </div>
            <div :class="['seedance-slide', getSeedanceSlideClass(2)]">
              <img
                src="@/assets/images/swipe_3.png"
                class="seedance-slide-img"
              />
            </div>
            <div :class="['seedance-slide', getSeedanceSlideClass(3)]">
              <img
                src="@/assets/images/swipe_4.png"
                class="seedance-slide-img"
              />
            </div>
            <div :class="['seedance-slide', getSeedanceSlideClass(4)]">
              <img
                src="@/assets/images/swipe_5.jpg"
                class="seedance-slide-img"
              />
            </div>
          </div>
          <button class="seedance-nav-btn prev" @click="prevSeedanceSlide">
            <i class="fas fa-chevron-left"></i>
          </button>
          <button class="seedance-nav-btn next" @click="nextSeedanceSlide">
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </div>

    <section id="consult-form" class="consult-section-dark">
      <div class="wrapper">
        <div class="form-container">
          <div class="form-header">
            <div class="section-label">GET STARTED</div>

            <h2>立即开启你的SD2.0制片之旅</h2>

            <p>提交您的需求，我们将为您提供专属的内测通道和解决方案</p>
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
                  placeholder="例如：我需要AI生成营销短视频、数字人定制..."
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

            <p>新用户注册即送免费生成点数！我们的专家将尽快与您联系。</p>

            <button class="btn-reset" @click="submitted = false">
              再次提交
            </button>
          </div>
        </div>
      </div>
    </section>

    <div v-if="showAgreementModal" class="agreement-modal-overlay">
      <div class="agreement-modal">
        <div class="agreement-modal-header">
          <h3>用户协议</h3>
        </div>
        <div class="agreement-modal-content">
          <div v-html="agreementContent" class="agreement-text"></div>
        </div>
        <div class="agreement-modal-footer">
          <button class="btn-cancel" @click="cancelAgreement">取消</button>
          <button class="btn-agree" @click="agreeAgreement">同意</button>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
/* 协议弹窗样式 */
.agreement-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.agreement-modal {
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.agreement-modal-header {
  padding: 20px;
  border-bottom: 1px solid #e8e8e8;
  display: flex;
  justify-content: center;
}

.agreement-modal-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.agreement-modal-content {
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  max-height: 50vh;
}

.agreement-text {
  line-height: 1.6;
  color: #666;
}

.agreement-modal-footer {
  padding: 20px;
  border-top: 1px solid #e8e8e8;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel {
  padding: 8px 16px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background-color: white;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-cancel:hover {
  border-color: #1890ff;
  color: #1890ff;
}

.btn-agree {
  padding: 8px 16px;
  border: 1px solid #1890ff;
  border-radius: 4px;
  background-color: #1890ff;
  color: white;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-agree:hover {
  background-color: #40a9ff;
  border-color: #40a9ff;
}
@import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap");

.eco-landing {
  font-family: "Plus Jakarta Sans", -apple-system, sans-serif;

  background: #fff;

  color: #111;

  overflow-x: hidden;
}

.wrapper {
  max-width: 1200px;

  margin: 0 auto;

  padding: 0 24px;
}

/* Navbar */

.eco-nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.nav-content {
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.eco-logo {
  text-decoration: none;
  font-size: 1.4rem;
  font-weight: 800;
  color: #333;
}

.eco-logo .highlight {
  color: #4f46e5;
}

.nav-links {
  display: flex;
  gap: 24px;
}

.nav-links a {
  text-decoration: none;
  color: #6b7280;
  font-weight: 500;
  font-size: 0.9rem;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #4f46e5;
}

.btn-login {
  padding: 8px 20px;
  background: #4f46e5;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.btn-login:hover {
  background: #4338ca;
  transform: translateY(-1px);
}

/* Hero Section */

.eco-hero {
  padding: 140px 0 80px;
  background: #fff;
}

.hero-layout {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.hero-layout .hero-text {
  flex: 1;
  text-align: left;
  margin-bottom: 0;
}

.hero-layout .hero-subtitle {
  margin: 0 0 32px 0;
}

.hero-layout .hero-visual {
  flex: 1;
  max-width: 50%;
  margin: 0;
}

@media (max-width: 992px) {
  .hero-layout {
    flex-direction: column;
    text-align: center;
  }
  .hero-layout .hero-text {
    text-align: center;
    margin-bottom: 40px;
  }
  .hero-layout .hero-subtitle {
    margin: 0 auto 32px auto;
  }
  .hero-layout .hero-visual {
    max-width: 100%;
  }
}

.hero-text {
  text-align: center;
  margin-bottom: 60px;
}

.hero-title {
  font-size: 3rem;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
  color: #333;
}

.hero-subtitle {
  font-size: 1.1rem;
  color: #6b7280;
  line-height: 1.5;
  max-width: 600px;
  margin: 0 auto 32px;
}

.hero-cta {
  display: flex;
  gap: 16px;
}

.btn-primary-large {
  padding: 14px 32px;
  background: #4f46e5;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary-large:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.btn-secondary-large {
  padding: 14px 32px;
  background: #fff;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary-large:hover {
  background: #f3f4f6;
  transform: translateY(-2px);
}

/* Hero Visual Slider */

.hero-visual {
  max-width: 900px;
  margin: 0 auto;
}

.comparison-slider {
  transition: transform 0.3s ease;
}

.comparison-slider:hover {
  transform: translateY(-5px);
}

.comparison-slider-inner {
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.comparison-slider img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Industry Section */

.eco-industries {
  padding: 100px 0;
  background: #f9fafb;
}

.section-header {
  text-align: center;
  margin-bottom: 60px;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  letter-spacing: -0.02em;
}

.industry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.industry-card {
  background: #fff;
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s;
  cursor: pointer;
}

.industry-card:hover {
  transform: translateY(-5px);
}

.card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card-icon {
  font-size: 2.5rem;
  margin-bottom: 16px;
}

.industry-card h3 {
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #333;
}

.industry-card p {
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0;
}

/* Features Block */

.eco-features {
  padding: 100px 0;
  background: #fff;
}

.feature-block {
  display: flex;
  align-items: center;
  gap: 60px;
  margin-bottom: 80px;
}

.feature-block.reverse {
  flex-direction: row-reverse;
}

.feature-info {
  flex: 1;
}

.feature-info h3 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: #333;
}

.feature-desc {
  font-size: 1rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.feature-visual {
  flex: 1;
}

.feature-visual img {
  width: 100%;
  display: block;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.feature-visual img:hover {
  transform: scale(1.02);
}

/* Toolbox */

.eco-toolbox {
  padding: 100px 0;

  background: #000;

  color: #fff;
  text-align: center;
}

.text-white {
  color: #fff;
}

.toolbox-buttons {
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
}

.tool-button {
  padding: 16px 40px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.tool-button.primary {
  background: #4f46e5;
  color: white;
  border: none;
}

.tool-button.primary:hover {
  background: #4338ca;
  transform: translateY(-2px);
}

.tool-button.secondary {
  background: transparent;
  color: white;
  border: 1px solid white;
}

.tool-button.secondary:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

/* Final CTA */

/* Consult Section & Form (Dark Theme) */
.consult-section-dark {
  padding: 120px 0;
  background: #000;
  color: white;
  position: relative;
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

/* Footer */

.eco-footer {
  padding: 40px 0;

  text-align: center;

  border-top: 1px solid #e5e7eb;

  color: #9ca3af;

  font-size: 0.9rem;
}

/* Mobile Responsive */

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.8rem;
  }

  .feature-block {
    flex-direction: column;
    gap: 40px;
  }

  .feature-block.reverse {
    flex-direction: column;
  }

  .toolbox-grid {
    grid-template-columns: 1fr 1fr;
  }

  .nav-links {
    display: none;
  }
}

.scenario-card-v5 {
  margin: 0 auto 20px;
  max-width: 1200px;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}
.hero-card {
  grid-column: span 2;
}

/* Seedance Carousel Styles */
.seedance-carousel {
  position: relative;
  width: 100%;
  margin: 40px 0;
  overflow: hidden;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.seedance-carousel-container {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
}

.seedance-slide {
  position: absolute;
  transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.seedance-slide-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

/* Active slide (center) */
.seedance-slide.active {
  width: 36%;
  height: 80%;
  z-index: 5;
  transform: scale(1);
  opacity: 1;
}

/* First next slide (right side, closer) */
.seedance-slide.next1 {
  width: 32%;
  height: 70%;
  z-index: 4;
  transform: translateX(65%) scale(0.9);
}

/* Second next slide (right side, farther) */
.seedance-slide.next2 {
  width: 28%;
  height: 60%;
  z-index: 3;
  transform: translateX(105%) scale(0.8);
}

/* First previous slide (left side, closer) */
.seedance-slide.prev1 {
  width: 32%;
  height: 70%;
  z-index: 4;
  transform: translateX(-65%) scale(0.9);
}

/* Second previous slide (left side, farther) */
.seedance-slide.prev2 {
  width: 28%;
  height: 60%;
  z-index: 3;
  transform: translateX(-105%) scale(0.8);
}

/* Compact Seedance Section */
.seedance-content.compact {
  /* padding: 32px; */
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.seedance-header.compact {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.seedance-logo-container.compact {
  display: flex;
  align-items: center;
  gap: 12px;
}

.seedance-logo.compact {
  width: 40px;
  height: 40px;
  border-radius: 8px;
}

.seedance-title.compact {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 0;
  color: #333;
  line-height: 1.3;
}

.seedance-subtitle.compact {
  font-size: 0.95rem;
  color: #6b7280;
  line-height: 1.5;
  margin: 0;
}

.seedance-features.compact {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0;
}

.seedance-feature.compact {
  font-size: 0.8rem;
  padding: 6px 14px;
  border-radius: 16px;
  background: rgba(79, 70, 229, 0.1);
  color: #4f46e5;
  font-weight: 500;
}

.seedance-carousel.compact {
  height: 300px;
  margin: 0;
}

.seedance-carousel.compact .seedance-slide.active {
  width: 40%;
  height: 80%;
}

.seedance-carousel.compact .seedance-slide.next1,
.seedance-carousel.compact .seedance-slide.prev1 {
  width: 35%;
  height: 70%;
}

.seedance-carousel.compact .seedance-slide.next2,
.seedance-carousel.compact .seedance-slide.prev2 {
  width: 30%;
  height: 60%;
}

.seedance-btn.compact {
  margin-top: 8px;
  padding: 12px 24px;
  font-size: 0.95rem;
  font-weight: 600;
  background: #4f46e5;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  align-self: flex-start;
}

.seedance-btn.compact:hover {
  background: #4338ca;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);
}

/* Navigation buttons */
.seedance-nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 10;
  transition: all 0.3s ease;
}

.seedance-nav-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-50%) scale(1.1);
}

.seedance-nav-btn.prev {
  left: 20px;
}

.seedance-nav-btn.next {
  right: 20px;
}

.seedance-nav-btn i {
  font-size: 20px;
  color: #333;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .seedance-carousel {
    height: 300px;
  }

  .seedance-slide.active {
    width: 70%;
    height: 70%;
  }

  .seedance-slide.next,
  .seedance-slide.prev {
    width: 50%;
    height: 50%;
  }

  .seedance-slide.inactive {
    width: 30%;
    height: 30%;
  }

  .seedance-nav-btn {
    width: 40px;
    height: 40px;
  }

  .seedance-nav-btn i {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .seedance-carousel {
    height: 250px;
  }

  .seedance-slide.active {
    width: 80%;
    height: 60%;
  }

  .seedance-slide.next,
  .seedance-slide.prev {
    width: 60%;
    height: 40%;
  }

  .seedance-nav-btn {
    width: 35px;
    height: 35px;
  }
}
</style>