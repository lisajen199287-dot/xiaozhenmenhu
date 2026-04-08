<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";

import { useRouter, RouterLink } from "vue-router";

import { useAdminStore, type CaseStudy } from "@/utils/adminStore";
import * as newApi from "@/api/newApi/index";

// Get data from store

const router = useRouter();
const { articles, cases } = useAdminStore();

// Responsive Window Width for Image Selection
const windowWidth = ref(
  typeof window !== "undefined" ? window.innerWidth : 1200
);
const handleResize = () => {
  windowWidth.value = window.innerWidth;
};

// Solution Categories (Updated with Visuals)

const solutions = [
  {
    id: "ecommerce",
    label: "电商与跨境",
    pain: "商品内容生产与投放成本高，转化效率难提升",
    desc: "AI生成商品内容与带货素材，结合投放与客户数据实现增长闭环",
    image: "/static/images/solutions/webp/ecommerce.webp",
    mobileImage: "/static/images/solutions/webp/ecommerce_mobile.webp",
    theme: "light",
  },
  {
    id: "internet",
    label: "互联网与游戏",
    pain: "获客成本高，素材生产与投放优化依赖人工",
    desc: "AI批量生成创意素材，结合投放与数据分析实现精准增长",
    image: "/static/images/solutions/webp/internet.webp",
    mobileImage: "/static/images/solutions/webp/internet_mobile.webp",
    theme: "dark",
  },
  {
    id: "auto",
    label: "汽车行业",
    pain: "车型内容生产与销售转化依赖人工培训与线索跟进",
    desc: "AI生成车型内容与销售辅助工具，提升获客与成交效率",
    image: "/static/images/solutions/webp/auto.webp",
    mobileImage: "/static/images/solutions/webp/auto_mobile.webp",
    theme: "dark",
  },
  {
    id: "consumer",
    label: "消费品行业",
    pain: "品牌内容生产与渠道投放效率低，营销转化难规模化",
    desc: "AI生成品牌与商品内容，结合渠道投放与数字人实现持续营销",
    image: "/static/images/solutions/webp/consumer.webp",
    mobileImage: "/static/images/solutions/webp/consumer_mobile.webp",
    theme: "light",
  },
  {
    id: "manufacturing",
    label: "制造业",
    pain: "运营管理与决策依赖人工经验，数据利用效率低",
    desc: "AI辅助运营分析与流程管理，提升生产与经营决策效率",
    image: "/static/images/solutions/webp/manufacturing.webp",
    mobileImage: "/static/images/solutions/webp/manufacturing_mobile.webp",
    theme: "light",
  },
  {
    id: "park",
    label: "园区与产业服务",
    pain: "产业分析、招商与园区服务依赖人工处理，效率与专业度不足",
    desc: "AI辅助产业研判与招商管理，构建智慧园区服务体系",
    image: "/static/images/solutions/webp/park.webp",
    mobileImage: "/static/images/solutions/webp/park_mobile.webp",
    theme: "dark",
  },
  {
    id: "medical",
    label: "医疗健康",
    pain: "医疗知识与服务流程复杂，咨询与管理压力大",
    desc: "AI医疗助手与流程自动化，提升服务与管理效率",
    image: "/static/images/solutions/webp/medical.webp",
    mobileImage: "/static/images/solutions/webp/medical_mobile.webp",
    theme: "light",
  },
  {
    id: "gov-media",
    label: "政务与融媒体",
    pain: "政策与宣传内容生产效率低，视频化传播能力不足",
    desc: "AI将稿件自动生成视频与数字人内容，提升政务传播效率",
    image: "/static/images/solutions/webp/gov-media.webp",
    mobileImage: "/static/images/solutions/webp/gov-media_mobile.webp",
    theme: "dark",
  },
];
import { config } from "@/config/axios/config";
const golink = () => {
  const url = config.aiVideoUrl;
  window.open(url, "_blank");
};

// Trust cards

const trustCards = [
  {
    icon: "fas fa-microchip",
    title: "普惠算力：降低门槛，触手可及",
    desc: "依托平台集聚优势，为您提供高性价比、灵活按需调用的高性能算力集群。大幅降低企业应用大模型的成本门槛，让顶尖算力成为中小企业也能轻松驾驭的普惠资源。",
  },

  {
    icon: "fas fa-server",
    title: "大厂赋能：顶尖技术，硬核底座",
    desc: "深度集成火山引擎大模型与分布式云架构，将一线大厂的最前沿 AI 能力与最佳实践直接平移给企业，打造稳定、高效、可扩展的企业级智能化底座。",
  },

  {
    icon: "fas fa-user-shield",
    title: "数据安全：国企护航，绝对可控",
    desc: "由仓山产投集团建设运营，提供严密的“数据不出域”私有化防护部署。系统内置高标准合规测评，从物理层到应用层，确保企业核心商业机密绝对安全可控。",
  },
];

const solScrollContainer = ref<HTMLElement | null>(null);

const SET_WIDTH = 2400; // 8 cards * 300px

const infiniteSolutions = computed(() => {
  // 5 Sets for a vast safety margin

  return [...solutions, ...solutions, ...solutions, ...solutions, ...solutions];
});

const normalizeScroll = () => {
  const container = solScrollContainer.value;

  if (!container) return;

  const current = container.scrollLeft;

  // Safe zone is between SET_WIDTH and SET_WIDTH * 2 (2400 to 4800).

  // If we exit this zone, we instantly warp back into it using modulo math

  // so the visual state remains completely identical.

  if (current >= SET_WIDTH * 2) {
    const excess = current % SET_WIDTH;

    container.scrollTo({ left: SET_WIDTH + excess, behavior: "auto" });
  } else if (current < SET_WIDTH) {
    // For JS modulo on negatives or just simple deficit math:

    const deficit = SET_WIDTH - current;

    container.scrollTo({ left: SET_WIDTH * 2 - deficit, behavior: "auto" });
  }
};

const scrollNext = () => {
  if (solScrollContainer.value) {
    solScrollContainer.value.scrollBy({ left: 300, behavior: "smooth" });
  }
};

const scrollPrev = () => {
  if (solScrollContainer.value) {
    solScrollContainer.value.scrollBy({ left: -300, behavior: "smooth" });
  }
};

let scrollTimeout: any = null;

const handleScroll = () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  // Wait for scrolling to completely stop before repositioning

  scrollTimeout = setTimeout(() => {
    normalizeScroll();
  }, 150);
};

// Auto Scroll Logic

let autoScrollTimer: any = null;

const startAutoScroll = () => {
  stopAutoScroll();

  autoScrollTimer = setInterval(() => {
    scrollNext();
  }, 3000);
};

const stopAutoScroll = () => {
  if (autoScrollTimer) {
    clearInterval(autoScrollTimer);
    autoScrollTimer = null;
  }
};

onMounted(() => {
  window.addEventListener("resize", handleResize);
  // Init scroll to Set 2 (2400px) quietly
  setTimeout(() => {
    if (solScrollContainer.value) {
      solScrollContainer.value.scrollTo({ left: SET_WIDTH, behavior: "auto" });
      startAutoScroll();
    }
  }, 50);
  handleResize(); // Initial call to set windowWidth
});

onUnmounted(() => {
  stopAutoScroll();
  if (scrollTimeout) clearTimeout(scrollTimeout);
  window.removeEventListener("resize", handleResize);
});

// Latest News from Store

// Case Studies
const activeCaseTab = ref("游戏互娱");
const caseStudies = cases;
let caseTimer: any = null;

const currentCase = computed<CaseStudy>(() => {
  return (
    cases.value.find((c) => c.industry === activeCaseTab.value) ||
    (cases.value[0] as CaseStudy)
  );
});

// Responsive Case Background
const caseBackgroundStyle = computed(() => {
  if (!currentCase.value) return {};
  const isMobile = windowWidth.value < 768;
  const imgUrl =
    isMobile && currentCase.value.mobileBackgroundImage
      ? currentCase.value.mobileBackgroundImage
      : currentCase.value.backgroundImage;
  return { backgroundImage: `url(${imgUrl})` };
});

const nextCase = () => {
  const industries = cases.value.map((c) => c.industry);

  const currentIndex = industries.indexOf(activeCaseTab.value);

  const nextIndex = (currentIndex + 1) % industries.length;

  activeCaseTab.value = industries[nextIndex] as string;
};

const prevCase = () => {
  const industries = cases.value.map((c) => c.industry);

  const currentIndex = industries.indexOf(activeCaseTab.value);

  const prevIndex = (currentIndex - 1 + industries.length) % industries.length;

  activeCaseTab.value = industries[prevIndex] as string;
};

const startCaseTimer = () => {
  stopCaseTimer();

  caseTimer = setInterval(nextCase, 4000);
};

const stopCaseTimer = () => {
  if (caseTimer) {
    clearInterval(caseTimer);

    caseTimer = null;
  }
};

const handleCaseTabClick = (industry: string) => {
  activeCaseTab.value = industry;

  startCaseTimer(); // Reset timer on manual click
};

// Carousel State

const currentSlide = ref(0);

const slides = ref<any[]>([]);
const activeSlide = computed(
  () =>
    slides.value[currentSlide.value] || {
      title: "",
      subtitle: "",
      bgImage: "",
      actions: [],
    }
);

// Helper to resolve image URL
const resolveImageUrl = (url: string) => {
  if (!url) return "";
  if (url.startsWith("http") || url.startsWith("/") || url.startsWith("data:"))
    return url;
  return `/uploads/${url}`;
};

const fetchSlides = async () => {
  try {
    // 只获取轮播管理区的内容
    const res = await newApi.apiSlides();
    const slideData = await res;
    slides.value = slideData.map((s: any) => ({
      id: s.id,
      title: s.title,
      subtitle: s.subtitle,
      bgClass: s.bgClass,
      bgImage: resolveImageUrl(s.image),
      navTitle: s.navTitle,
      navDesc: s.navDesc,
      actions:
        typeof s.actionsJson === "string" ? JSON.parse(s.actionsJson) : [],
    }));
  } catch (e) {
    console.error("Error fetching slides", e);
    slides.value = [];
  }
};

const goLumi = async () => {
  const res = await newApi.apiGoLumi();
  window.open(res.redirect_url, "_blank");
};

const nextSlide = () => {
  if (slides.value.length === 0) return;

  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
};

const prevSlide = () => {
  if (slides.value.length === 0) return;

  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
};

const setSlide = (index: number) => {
  currentSlide.value = index;
};

let timer: any;

onMounted(async () => {
  // 0. Fetch real slides

  await fetchSlides();

  // 1. Fetch real articles from backend

  try {
    const res = await newApi.apiArticles();
    const data = await res;
    articles.value = data;
  } catch (e) {
    console.error("Failed to sync articles:", e);
  }

  /*
  // 1.5 Fetch real cases from backend
  try {
     const resCases = await fetch('/api/cases')
     if (resCases.ok) {
        const dataCases = await resCases.json()
        
        // Image Mapping (Industry / Tag -> Image)
        const caseImages: Record<string, string> = {
             // Industry Names (Chinese)
             '游戏互娱': '/static/images/cases/game.png',
             '跨境贸易': '/static/images/cases/biz.png',
             '连锁新茶饮': '/static/images/cases/drink.png',
             '服装制造': '/static/images/cases/sport.png',
             '汽车科技': '/static/images/cases/car.png',
             '园区服务': '/static/images/cases/park.png',
             '食品工业': '/static/images/cases/food.png',
             '金融投资': '/static/images/cases/building.png',
             'AI': '/static/images/cases/data.png',
             
             // Raw Tags (English) from Backend
             'Risk': '/static/images/cases/finance.jpg',
             'Video API': '/static/images/cases/tech.jpg',
             'Copilot': '/static/images/cases/tech.jpg',
             'RAG': '/static/images/cases/tech.jpg',
             'Public': '/static/images/cases/government.jpg',
             'Quality': '/static/images/cases/car.jpg',
             'Marketing': '/static/images/cases/ecommerce.jpg',
             'AIGC': '/static/images/cases/tech.jpg',
             'Education': '/static/images/cases/government.jpg',
             'Medical': '/static/images/cases/tech.jpg'
        }

        // Map backend stats (string) to frontend stats (array)
        cases.value = dataCases.map((c: any) => {
             // Determine Image: Check Industry -> Check Raw Tag -> Fallback
             let bg = caseImages[c.industry] || caseImages[c.tag];
             if (!bg || bg === '') {
                 bg = '/static/images/cases/tech.jpg';
             }

             return {
                 ...c,
                 desc: c.description || c.desc,
                 stats: c.stats ? JSON.parse(c.stats) : [],
                 // Map tags to Chinese
                 tag: c.tag === 'Risk' ? '风险风控' : 
                      c.tag === 'Video API' ? '视频接口' :
                      c.tag === 'Copilot' ? '智能助手' :
                      c.tag === 'RAG' ? '知识检索' :
                      c.tag === 'Public' ? '政务办公' :
                      c.tag === 'Quality' ? '工业质检' :
                      c.tag === 'Marketing' ? '营销出海' :
                      c.tag === 'AIGC' ? '创意引擎' : (c.tag || '行业案例'),
                 // Explicit assignment
                 backgroundImage: bg
             }
        })
     }
  } catch (e) {
     console.error('Failed to sync cases:', e)
  }
  */

  // 2. Start Carousel Auto-play (6s)
  timer = setInterval(nextSlide, 6000);

  // 3. Intersection Observer for scroll triggers

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.2 }
  );

  const target = document.querySelector(".case-display-area");

  if (target) observer.observe(target);

  // 4. Start Customer Success Case Auto-play (4s)

  startCaseTimer();
});
const navToExternal = (url: string) => {
  window.open(url, "_blank");
};

const handleHeroAction = async (link: string) => {
  const res = await newApi.redirectToLumi();
  window.open(res.redirect_url, "_blank");
  // if (!link) return;
  // if (link.startsWith("http")) {
  //   window.open(link, "_blank");
  // } else if (link.startsWith("/#")) {
  //   const id = link.substring(2);
  //   const el = document.getElementById(id);
  //   if (el) {
  //     el.scrollIntoView({ behavior: "smooth" });
  //   } else {
  //     router.push("/");
  //     // If we're already on home but el wasn't found (maybe dynamic), try again
  //     setTimeout(() => {
  //       const target = document.getElementById(id);
  //       if (target) target.scrollIntoView({ behavior: "smooth" });
  //     }, 300);
  //   }
  // } else {
  //   router.push(link);
  // }
};

// Seedance Carousel Logic
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
  window.removeEventListener("resize", handleResize);
  if (timer) clearInterval(timer);
  stopCaseTimer();
  stopSeedanceCarousel();
});
</script>



<template>
  <main>
    <header class="hero-v2">
      <!-- Carousel Content -->

      <transition name="fade">
        <div :key="currentSlide" class="hero-slide">
          <div
            class="hero-bg-img"
            :style="{
              backgroundImage: `url('${resolveImageUrl(activeSlide.bgImage)}')`,
            }"
          ></div>

          <div class="hero-v2-content">
            <div class="hero-v2-main-row">
              <div class="hero-v2-text-area">
                <h1 class="hero-title-v2">{{ activeSlide.title }}</h1>

                <div class="hero-subtitle-wrapper">
                  <p class="hero-subtitle-v2" style="white-space: pre-line">
                    {{ activeSlide.subtitle }}
                  </p>
                </div>

                <div class="hero-actions-v2">
                  <button
                    v-for="(action, idx) in activeSlide.actions"
                    :key="idx"
                    :class="action.primary ? 'btn-primary-v2' : 'btn-white-v2'"
                    @click="handleHeroAction(action.link)"
                    :data-track="'hero_action_' + action.text"
                  >
                    <span
                      class="btn-dot"
                      :class="action.primary ? 'primary' : 'secondary'"
                    ></span>
                    {{ action.text }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>

      <!-- Carousel Controls -->

      <div class="hero-controls">
        <button class="hero-nav-btn prev" @click="prevSlide">
          <i class="fas fa-chevron-left"></i>
        </button>

        <button class="hero-nav-btn next" @click="nextSlide">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <!-- Bottom Navigation (Tabs) -->

      <div class="hero-bottom-bar">
        <div class="hero-tabs">
          <div
            v-for="(slide, index) in slides"
            :key="'tab-' + index"
            class="hero-tab-item"
            :class="{ active: currentSlide === index }"
            @click="setSlide(index)"
          >
            <div class="tab-indicator-bar"></div>

            <span class="tab-title">{{ slide.navTitle || slide.title }}</span>

            <span class="tab-desc">{{ slide.navDesc || "点击查看详情" }}</span>
          </div>
        </div>
      </div>
    </header>

    <section class="scenarios-section" id="scenarios">
      <div class="wrapper">
        <div
          class="section-header"
          style="text-align: center; margin-bottom: 40px"
        >
          <h2 class="section-title-v5">16+ AI 应用重构商业运作的每个环节</h2>
        </div>
        <div class="scenarios-grid-v5">
          <!-- Card 1: Video Gen (Hero - Spans 2 Columns) -->
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
                    Seedance 2.0 抢先体验：让灵感，即刻实现
                  </h2>
                </div>
                <p class="seedance-subtitle compact">
                  创意实现，1%的成本，100%的震感
                </p>
                <div class="seedance-features compact">
                  <span class="seedance-feature compact"
                    >数字模特"秒级"换装</span
                  >
                  <span class="seedance-feature compact"
                    >产品图片到"史诗级"广告片</span
                  >
                  <span class="seedance-feature compact"
                    >原生音画同步的"带货短剧"</span
                  >
                </div>
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
                <button
                  class="seedance-nav-btn prev"
                  @click="prevSeedanceSlide"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  class="seedance-nav-btn next"
                  @click="nextSeedanceSlide"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>

              <button class="seedance-btn compact" @click="goLumi()">
                立即体验
                <i class="fas fa-arrow-right"></i>
              </button>
            </div>
          </div>

          <!-- Card 2: AI Coach (Conversation Flow) -->
          <div
            class="scenario-card-v5"
            @click="
              navToExternal(
                'https://qyyxyypl.aics.cii-group.com/admin/login/fsLogin'
              )
            "
          >
            <div class="card-meta">
              <span class="model-tag">Sales-Coach-Pro</span>
              <i class="fas fa-comments"></i>
            </div>
            <h3 class="card-title-v5">AI 销冠陪练</h3>
            <p class="card-subtitle-v5">
              结合企业私有知识库，实时生成金牌销售话术
            </p>
            <div class="v5-visual coach-flow-ui">
              <div class="chat-container-v5">
                <div class="chat-msg user">客户觉得价格超预算了...</div>
                <div class="chat-msg bot">
                  <div class="bot-header">
                    <i class="fas fa-robot"></i> 销冠建议
                  </div>
                  <div class="typing-placeholder">
                    <div class="line w-100">1. 强调全生命周期降本增效...</div>
                    <div class="line w-80">2. 拆解日均使用成本...</div>
                  </div>
                  <div class="kb-badge">
                    <i class="fas fa-check-circle"></i> 已检索“2024报价策略”手册
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer-v5">
              <span class="action-btn"
                >进入陪练 <i class="fas fa-arrow-right"></i
              ></span>
            </div>
          </div>

          <!-- Card 3: Digital Human (Deep Blend) -->
          <div
            class="scenario-card-v5 dh-dark-blend"
            @click="router.push('/digital-human')"
          >
            <div class="card-meta">
              <span class="model-tag">Live-Avatar-3.0</span>
              <i class="fas fa-user-check"></i>
            </div>
            <h3 class="card-title-v5">真身口播数字人</h3>
            <p class="card-subtitle-v5">
              24 小时代替真人出镜，驱动唇部肌肉展现原生级质感
            </p>
            <div class="v5-visual dh-immersive-light">
              <video
                src="/static/videos/dh-demo.mp4"
                autoplay
                muted
                loop
                playsinline
                class="dh-video-bg"
              ></video>
              <div class="dh-overlay-fx"></div>
              <div class="audio-indicators">
                <div class="audio-wave">
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                  <div class="bar"></div>
                </div>
                <!-- Status Pill Removed -->
              </div>
            </div>
            <div class="card-footer-v5">
              <span class="action-btn"
                >立即克隆 <i class="fas fa-arrow-right"></i
              ></span>
            </div>
          </div>

          <!-- Card 4: QA Bot (Data Intelligence) -->
          <div class="scenario-card-v5" @click="router.push('/agent')">
            <div class="card-meta">
              <span class="model-tag">Enterprise-LLM</span>
              <i class="fas fa-chart-pie"></i>
            </div>
            <h3 class="card-title-v5">企业知识智能问答</h3>
            <p class="card-subtitle-v5">
              搜索即所得，秒级拉取经营数据并生成可视化报表
            </p>
            <div class="v5-visual qa-data-ui">
              <div class="search-entry">
                <i class="fas fa-search"></i>
                <span>拉取本季度各区利润排名</span>
              </div>
              <div class="glass-data-grid">
                <div class="stat-bar" style="height: 40%">
                  <span class="val">42%</span>
                </div>
                <div class="stat-bar highlight" style="height: 75%">
                  <span class="val">75%</span>
                </div>
                <div class="stat-bar" style="height: 55%">
                  <span class="val">55%</span>
                </div>
                <div class="stat-bar" style="height: 90%">
                  <span class="val">90%</span>
                </div>
              </div>
            </div>
            <div class="card-footer-v5">
              <span class="action-btn"
                >分析数据 <i class="fas fa-arrow-right"></i> ></span
              >
            </div>
          </div>

          <!-- Card 5: Industry Analysis (Business Strategy) -->
          <div
            class="scenario-card-v5"
            @click="
              navToExternal(
                'https://industry-manage.aics.cii-group.com/account-management?loginType=sso'
              )
            "
          >
            <div class="card-meta">
              <span class="model-tag">Industry-PPT-Gen</span>
              <i class="fas fa-file-powerpoint"></i>
            </div>
            <h3 class="card-title-v5">行业报告 PPT 生成</h3>
            <p class="card-subtitle-v5">
              输入行业关键词，秒级生成包含产业脑图与深度分析的专业 PPT
            </p>
            <div class="v5-visual industry-graph-ui">
              <div class="analysis-web">
                <div class="scan-overlay"></div>
                <div
                  class="keyword-input-mock"
                  style="
                    position: relative;
                    z-index: 2;
                    background: #f1f5f9;
                    padding: 8px 16px;
                    border-radius: 8px;
                    border: 1px solid #e2e8f0;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.75rem;
                    color: #475569;
                  "
                >
                  <i class="fas fa-keyboard" style="color: #3b82f6"></i>
                  <span>输入关键词：新能源汽车</span>
                  <div
                    class="typing-cursor"
                    style="
                      width: 2px;
                      height: 14px;
                      background: #3b82f6;
                      animation: blink 1s step-end infinite;
                    "
                  ></div>
                </div>
              </div>
              <div class="report-box">
                <div class="report-badge">PPTX</div>
                <div class="report-main">
                  <i
                    class="fas fa-file-powerpoint"
                    style="color: #d24726; font-size: 1.5rem"
                  ></i>
                  <div class="report-info">
                    <span class="r-title">2024新能源产业研判报告.pptx</span>
                    <span class="r-meta"
                      >AI 自动排版 • 24页 • 包含深度分析</span
                    >
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer-v5">
              <span class="action-btn"
                >立即生成 <i class="fas fa-arrow-right"></i
              ></span>
            </div>
          </div>
        </div>

        <!-- View All Link -->
        <div class="view-all-scenarios-v5">
          <router-link to="/apps" class="view-all-link-v5">
            查看所有 AI 应用 <i class="fas fa-chevron-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Products Section (New) -->

    <section class="products-section">
      <div class="products-header">
        <h2 class="products-title">普惠算力，灵活调度</h2>
      </div>

      <div class="products-content">
        <!-- Left Featured: Doubao-Seedance-2.0 -->

        <div class="product-featured">
          <!-- Colorful Abstract Visual bg is in CSS -->

          <div class="pf-content">
            <i class="fas fa-film pf-logo"></i>

            <h3 class="pf-title">Doubao-Seedance-2.0</h3>

            <p class="pf-desc">
              旗舰级视频生成大模型。支持以图促影、以文促影，模拟真实物理世界，打造好莱坞级视觉张力。支持多种比例与分辨率输出
            </p>

            <div class="pf-actions">
              <button
                class="pf-btn"
                @click="
                  navToExternal(
                    'https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&modelId=doubao-seedance-2-0-260128&tab=GenVideo'
                  )
                "
              >
                立即体验
              </button>

              <span class="pf-tag">SOTA 性能</span>
            </div>
          </div>

          <div class="pf-visual-bottom"></div>
        </div>

        <!-- Right Grid -->

        <div class="products-grid">
          <!-- Card 1: Seed-2.0-pro -->

          <div class="product-card">
            <div class="pc-icon purple"><i class="fas fa-brain"></i></div>

            <h4
              class="pc-title"
              @click="
                navToExternal(
                  'https://exp.volcengine.com/ark?_vtm_=0.0.c70961.d701978.0'
                )
              "
            >
              Doubao-Seed-2.0-pro
            </h4>

            <p class="pc-desc">
              智核 Agent 通用模型，具备卓越的复杂任务拆解与长程指令遵循能力
            </p>

            <button
              class="pc-btn"
              @click="
                navToExternal(
                  'https://exp.volcengine.com/ark?_vtm_=0.0.c70961.d701978.0'
                )
              "
            >
              在线体验
            </button>
          </div>

          <!-- Card 2: Seedream-5.0 -->

          <div class="product-card">
            <div class="pc-icon blue"><i class="fas fa-magic"></i></div>

            <h4
              class="pc-title"
              @click="
                navToExternal(
                  'https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&tab=GenImage'
                )
              "
            >
              Doubao-Seedream-5.0
            </h4>

            <p class="pc-desc">
              豆包图像创作模型。支持联网检索与海量知识增强，实现超高精度的视觉呈现
            </p>

            <button
              class="pc-btn"
              @click="
                navToExternal(
                  'https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&tab=GenImage'
                )
              "
            >
              在线体验
            </button>
          </div>

          <!-- Card 3: GPU -->

          <div class="product-card">
            <div class="pc-icon red"><i class="fas fa-bolt"></i></div>

            <h4 class="pc-title" @click="$router.push('/infra')">
              GPU 算力服务
            </h4>

            <p class="pc-desc">
              搭载 H800/RTX4090 异构算力，高效支持AI 训练与大规模推理需求
            </p>

            <button class="pc-btn" @click="$router.push('/infra')">
              了解详情
            </button>
          </div>

          <!-- Card 4: CPU -->

          <div class="product-card">
            <div class="pc-icon green"><i class="fas fa-microchip"></i></div>

            <h4 class="pc-title" @click="$router.push('/infra')">
              CPU 算力集群
            </h4>

            <p class="pc-desc">
              安全稳定、弹性伸缩的云计算资源，提供高性价比通用算力支持
            </p>

            <button class="pc-btn" @click="$router.push('/infra')">
              了解详情
            </button>
          </div>
        </div>
      </div>

      <div class="products-footer">
        <RouterLink to="/infra" class="link-view-all"
          >查看全部智算产品与安全服务<i class="fas fa-chevron-right"></i
        ></RouterLink>
      </div>
    </section>

    <!-- Industry Solutions Section (Redesigned) -->

    <section class="solutions-section-v2" id="solutions">
      <h2 class="section-common-title industry-title">
        面向行业场景的 AI 解决方案
      </h2>

      <div
        class="sol-container-wrapper"
        @mouseenter="stopAutoScroll"
        @mouseleave="startAutoScroll"
      >
        <button class="sol-nav-btn prev" @click="scrollPrev">
          <i class="fas fa-chevron-left"></i>
        </button>

        <div
          class="sol-cards-container"
          ref="solScrollContainer"
          @scroll.passive="handleScroll"
        >
          <div
            v-for="(sol, index) in infiniteSolutions"
            :key="index"
            class="sol-v2-card"
            :class="`theme-${sol.theme}`"
            :style="{
              backgroundImage: `url(${
                windowWidth < 768 && sol.mobileImage
                  ? sol.mobileImage
                  : sol.image
              })`,
            }"
          >
            <div class="sol-v2-overlay"></div>

            <div class="sol-v2-content">
              <div class="sol-v2-header">
                <span class="sol-v2-label">{{ sol.label }}</span>

                <p class="sol-v2-pain" v-if="sol.pain">{{ sol.pain }}</p>

                <p class="sol-v2-desc">{{ sol.desc }}</p>
              </div>

              <div class="sol-v2-action">
                <RouterLink :to="`/solutions/${sol.id}`" class="btn-sol-glass">
                  查看方案 <i class="fas fa-arrow-right"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>

        <button class="sol-nav-btn next" @click="scrollNext">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="sol-footer">
        <RouterLink to="/solutions" class="btn-more-sol"
          >查看所有解决方案<i class="fas fa-arrow-right"></i
        ></RouterLink>
      </div>
    </section>

    <!-- Customer Success Section (Huawei Cloud Full-Width Style) -->

    <section class="customer-success-v3">
      <div class="success-header">
        <h2 class="v3-main-title">助力千行百业，见证 AI 的力量</h2>

        <div class="v3-case-tabs">
          <button
            v-for="study in caseStudies"
            :key="study.id"
            :class="[
              'v3-tab-btn',
              { active: activeCaseTab === study.industry },
            ]"
            @click="handleCaseTabClick(study.industry)"
          >
            {{ study.industry }}
          </button>
        </div>
      </div>

      <div class="case-display-area" :style="caseBackgroundStyle">
        <div class="case-overlay"></div>

        <div class="case-v3-container">
          <div class="case-v3-split">
            <div class="case-info-left">
              <div class="case-tag-v3">{{ currentCase.bigTitle }}</div>

              <h1 class="case-client-v3">{{ currentCase.client }}</h1>

              <p class="case-sub-industry" v-if="currentCase.subIndustry">
                行业：{{ currentCase.subIndustry }}
              </p>

              <div class="case-v3-stats">
                <div
                  v-for="stat in currentCase.stats"
                  :key="stat.label"
                  class="v3-stat-item"
                >
                  <h3 class="v3-stat-val">{{ stat.value }}</h3>

                  <p class="v3-stat-lab">{{ stat.label }}</p>
                </div>
              </div>
            </div>

            <div class="case-details-right">
              <div class="detail-block" v-if="currentCase.painPoint">
                <div class="detail-header pain">
                  <i class="fas fa-exclamation-circle"></i>
                  <span>痛点 Before</span>
                </div>

                <p class="detail-text">{{ currentCase.painPoint }}</p>
              </div>

              <div class="detail-block">
                <div class="detail-header solution">
                  <i class="fas fa-check-circle"></i>
                  <span>解决方案 After</span>
                </div>

                <p class="detail-text">{{ currentCase.desc }}</p>
              </div>

              <div class="case-v3-actions">
                <button class="btn-v3-detail" @click="$router.push('/cases')">
                  探索更多真实案例 <i class="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Case Navigation Arrows (Mainly for Mobile) -->
        <div class="case-v3-nav">
          <button
            class="nav-arrow prev"
            @click="
              prevCase();
              startCaseTimer();
            "
          >
            <i class="fas fa-chevron-left"></i>
          </button>
          <button
            class="nav-arrow next"
            @click="
              nextCase();
              startCaseTimer();
            "
          >
            <i class="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Trust Section -->

    <section class="trust-section">
      <h2 class="section-common-title">政府搭台 · 大厂技术 · 可信空间</h2>

      <div class="trust-grid">
        <div v-for="card in trustCards" :key="card.title" class="trust-card">
          <div class="trust-icon">
            <i :class="card.icon"></i>
          </div>

          <h3>{{ card.title }}</h3>

          <p>{{ card.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Developer Ecosystem & News Section -->

    <!-- Service Highlights -->

    <section class="service-highlights" id="appointment">
      <div class="highlights-container">
        <div class="highlight-item">
          <div class="highlight-icon"><i class="fas fa-phone-volume"></i></div>

          <div class="highlight-text">
            <h4>多渠道服务支持</h4>

            <p>7x24小时专业工程师品质服务</p>
          </div>
        </div>

        <div class="highlight-item">
          <div class="highlight-icon"><i class="fas fa-pencil-ruler"></i></div>

          <div class="highlight-text">
            <h4>客户价值为先</h4>

            <p>从服务价值到创造客户价值</p>
          </div>
        </div>

        <div class="highlight-item">
          <div class="highlight-icon"><i class="fas fa-user-shield"></i></div>

          <div class="highlight-text">
            <h4>全方位安全保障</h4>

            <p>打造安全可信智能服务</p>
          </div>
        </div>

        <div class="highlight-item">
          <div class="highlight-icon"><i class="far fa-edit"></i></div>

          <div class="highlight-text">
            <h4>建议反馈</h4>

            <p>优化改进建议</p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>



<style scoped>
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
  padding: 0;
}

.seedance-header.compact {
  margin: 0;
}

.seedance-logo-container.compact {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.seedance-logo.compact {
  width: 32px;
  height: 32px;
}

.seedance-title.compact {
  font-size: 1rem;
  margin: 0;
}

.seedance-subtitle.compact {
  font-size: 0.8rem;
  margin-bottom: 8px;
  line-height: 1.3;
}

.seedance-features.compact {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 10px;
  margin: 0;
}

.seedance-feature.compact {
  font-size: 0.7rem;
  padding: 3px 10px;
  border-radius: 12px;
}

.seedance-carousel.compact {
  height: 250px;
  margin: 0;
}

.seedance-carousel.compact .seedance-slide.active {
  width: 36%;
  height: 70%;
}

.seedance-carousel.compact .seedance-slide.next1,
.seedance-carousel.compact .seedance-slide.prev1 {
  width: 32%;
  height: 60%;
}

.seedance-carousel.compact .seedance-slide.next2,
.seedance-carousel.compact .seedance-slide.prev2 {
  width: 28%;
  height: 50%;
}

.seedance-btn.compact {
  margin-top: 0;
  padding: 8px 16px;
  font-size: 0.8rem;
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
.seedance-swiper .swiper-slide-active .seedance-slide-img {
  transform: scale(1);
  z-index: 3;
}

.seedance-swiper .swiper-slide-next .seedance-slide-img,
.seedance-swiper .swiper-slide-prev .seedance-slide-img {
  transform: scale(0.8);
  z-index: 2;
}

.seedance-swiper .swiper-slide-next + .swiper-slide .seedance-slide-img,
.seedance-swiper .swiper-slide-prev + .swiper-slide-prev .seedance-slide-img {
  transform: scale(0.6);
  z-index: 1;
}

/* Navigation buttons */
.seedance-swiper .swiper-button-next,
.seedance-swiper .swiper-button-prev {
  color: #333;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.seedance-swiper .swiper-button-next:hover,
.seedance-swiper .swiper-button-prev:hover {
  background: rgba(255, 255, 255, 1);
}

/* Pagination */
.seedance-pagination {
  position: absolute;
  bottom: -30px;
  left: 50%;
  transform: translateX(-50%);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .seedance-swiper {
    height: 200px;
  }

  .seedance-swiper .swiper-slide-next .seedance-slide-img,
  .seedance-swiper .swiper-slide-prev .seedance-slide-img {
    transform: scale(0.7);
  }

  .seedance-swiper .swiper-slide-next + .swiper-slide .seedance-slide-img,
  .seedance-swiper .swiper-slide-prev + .swiper-slide-prev .seedance-slide-img {
    transform: scale(0.5);
  }
}

/* Carousel Transitions */

.carousel-container {
  width: 100%;

  height: 100%;

  position: absolute;

  top: 0;

  left: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.hero-slide {
  width: 100%;

  height: 100%;

  position: absolute;

  top: 0;

  left: 0;

  display: flex;

  align-items: center;

  justify-content: center;
}

/* Ensure content width matches container */

.hero-slide .hero-v2-content {
  width: 100%;

  margin: 0 auto;
}

/* Character Visual */

.character-visual {
  position: relative;

  width: 400px;

  height: 400px;

  display: flex;

  justify-content: center;

  align-items: center;
}

.slide-img-3d {
  width: 300px;

  height: auto;

  z-index: 2;

  animation: floatParticle 6s ease-in-out infinite;
}

.ring-bg {
  position: absolute;

  width: 380px;

  height: 380px;

  border: 20px solid rgba(255, 255, 255, 0.4);

  border-radius: 50%;

  z-index: 1;

  transform: rotateX(60deg) rotateY(20deg);

  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.1);
}

/* Controls */

.hero-controls {
  position: absolute;

  top: 50%;

  left: 0;

  right: 0;

  transform: translateY(-50%);

  padding: 0 40px;

  display: flex;

  justify-content: space-between;

  pointer-events: none; /* Let clicks pass through */

  z-index: 20;
}

.hero-nav-btn {
  width: 48px;

  height: 48px;

  border-radius: 50%;

  background: rgba(255, 255, 255, 0.6);

  border: 1px solid rgba(255, 255, 255, 0.8);

  backdrop-filter: blur(4px);

  color: #475569;

  font-size: 1.2rem;

  cursor: pointer;

  pointer-events: auto; /* Re-enable for buttons */

  transition: all 0.2s;

  display: flex;

  align-items: center;

  justify-content: center;
}

.hero-nav-btn:hover {
  background: white;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  color: #4f46e5;
}

/* Dots */

.hero-bottom-bar {
  position: absolute;

  bottom: 0;

  left: 0;

  width: 100%;

  z-index: 50;

  background: rgba(255, 255, 255, 0.5); /* Light Glass */

  backdrop-filter: blur(15px);

  -webkit-backdrop-filter: blur(15px);

  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.hero-dots-line {
  display: flex;

  justify-content: center;

  gap: 8px;

  padding-top: 20px;
}

.line-dot {
  width: 40px;

  height: 4px;

  background: rgba(0, 0, 0, 0.1);

  cursor: pointer;

  transition: all 0.3s;

  border-radius: 2px;
}

.line-dot.active {
  background: #4f46e5;
}

/* Seedance 2.0 Section */
.seedance-section {
  margin-top: 60px;
  margin-bottom: 40px;
}

.seedance-content {
  text-align: center;
  padding: 40px 20px;
  border-radius: 16px;
}

.seedance-header {
  margin-bottom: 30px;
}

.seedance-logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 16px;
}

.seedance-logo {
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 50%;
}

.seedance-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
}

.seedance-subtitle {
  font-size: 1.125rem;
  color: #64748b;
  margin: 0 0 24px 0;
}

.seedance-features {
  display: flex;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
  /* margin-bottom: 32px; */
}

.seedance-feature {
  color: #475569;
  font-size: 1.1rem;
}

/* Seedance Carousel */
.seedance-carousel {
  position: relative;
  max-width: 1200px;
  margin: 0 auto 32px;
  overflow: visible;
  border-radius: 12px;
}

.seedance-swiper {
  width: 100%;
  height: 220px;
  overflow: visible;
  padding: 20px 0;
}

.seedance-swiper .swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 260px !important;
  height: 180px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
  transition: all 0.4s ease;
}

.seedance-swiper .swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.seedance-swiper .swiper-slide-active {
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.28);
}

.seedance-carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-prev,
.swiper-button-next {
  color: #3b82f6;
  background: rgba(255, 255, 255, 0.8);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.swiper-button-prev:hover,
.swiper-button-next:hover {
  background: rgba(255, 255, 255, 1);
  transform: scale(1.1);
}

.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #94a3b8;
  cursor: pointer;
  transition: all 0.3s;
}

.swiper-pagination-bullet-active {
  background: #3b82f6;
  width: 12px;
}

.swiper-pagination {
  bottom: 16px !important;
}

.seedance-btn {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.seedance-btn:hover {
  background: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.hero-tabs {
  display: flex;

  justify-content: center;

  max-width: 1200px;

  margin: 0 auto;
}

.hero-tab-item {
  flex: 1;

  text-align: center;

  padding: 24px 0;

  cursor: pointer;

  position: relative;

  transition: all 0.3s;

  color: #64748b;

  border-bottom: none;
}

/* New Indicator Bar on Top */

.tab-indicator-bar {
  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 4px; /* Maintain height */

  background: transparent; /* Changed to transparent by default */

  transition: all 0.3s;
}

.hero-tab-item.active .tab-indicator-bar {
  background: #4f46e5;
}

.hero-tab-item:hover .tab-indicator-bar {
  background: rgba(0, 0, 0, 0.1); /* Show subtle gray on hover */
}

.hero-tab-item:hover {
  background: rgba(255, 255, 255, 0.4);

  color: #1e293b;
}

.hero-tab-item.active {
  color: #0f172a;

  background: rgba(255, 255, 255, 0.6);
}

.tab-title {
  display: block;

  font-weight: 700;

  font-size: 1rem;

  margin-bottom: 4px;
}

.tab-desc {
  display: block;

  font-size: 0.8rem;

  font-weight: 400;

  opacity: 0.7; /* Higher base opacity for descriptions */
}

/* Remove old dot styles if needed, or keep for compatibility */

.hero-bg-red {
  background: radial-gradient(circle at 70% 30%, #ff4d4d, #b91c1c);

  opacity: 0.15;
}

/* Force apply Pillars styles locally to avoid cache issues */

.pillars-section {
  max-width: 1400px;

  margin: 60px auto 100px;

  padding: 0 60px;

  position: relative;

  z-index: 10;
}

.pillars-header {
  text-align: center;

  margin-bottom: 50px;
}

.pillars-header h2 {
  font-size: 2.8rem;

  font-weight: 600;

  color: #0f172a;

  letter-spacing: -0.03em;

  background: linear-gradient(135deg, #0f172a 0%, #334155 100%);

  -webkit-background-clip: text;

  background-clip: text;

  -webkit-text-fill-color: transparent;

  margin: 0;
}

.pillars-grid {
  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 30px;
}

.pillar-card {
  background: rgba(255, 255, 255, 0.85);

  backdrop-filter: blur(20px);

  -webkit-backdrop-filter: blur(20px);

  border: 1px solid rgba(255, 255, 255, 0.5);

  padding: 48px;

  border-radius: 12px;

  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.08);

  transition: all 0.4s;

  display: flex;

  flex-direction: column;
}

.pillar-card.engine {
  border-top: 6px solid #8b5cf6;
}

.pillar-card.brain {
  border-top: 6px solid #6366f1;
}

.pillar-card.infra {
  border-top: 6px solid #3b82f6;
}

.pillar-card:hover {
  transform: translateY(-15px);

  background: #fff;

  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12);
}

.pillar-tag {
  font-size: 0.85rem;

  font-weight: 700;

  margin-bottom: 24px;

  text-transform: uppercase;

  letter-spacing: 0.05em;

  display: inline-block;

  padding: 6px 16px;

  border-radius: 2px;

  width: fit-content;
}

.engine .pillar-tag {
  background: #f5f3ff;

  color: #8b5cf6;
}

.brain .pillar-tag {
  background: #eef2ff;

  color: #6366f1;
}

.infra .pillar-tag {
  background: #f0f9ff;

  color: #0ea5e9;
}

/* Scenarios Section V5 - Enhanced Visibility */
.scenarios-grid-v5 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 440px;
  gap: 24px;
  margin-top: 60px;
}

.view-all-scenarios-v5 {
  margin-top: 56px;
  display: flex;
  justify-content: center;
}

.view-all-link-v5 {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #64748b;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.view-all-link-v5:hover {
  color: #3b82f6;
  letter-spacing: 0.02em;
}

.view-all-link-v5 i {
  font-size: 0.85rem;
  transition: transform 0.3s ease;
}

.view-all-link-v5:hover i {
  transform: translateX(6px);
}

.scenario-card-v5 {
  background: #f1f5f9; /* Slightly deeper base for better definition */
  border: 1px solid #e2e8f0;
  border-radius: 24px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.hero-card {
  grid-column: span 2;
  background: linear-gradient(135deg, #f0f7ff 0%, #ffffff 100%);
  border-color: #dbeafe;
}

/* Digital Human Dark Blend Mode */
.dh-dark-blend {
  background: #0f172a; /* Deep navy to match video atmosphere */
  border-color: #1e293b;
}

.dh-dark-blend .card-title-v5 {
  color: #ffffff;
}
.dh-dark-blend .card-subtitle-v5 {
  color: #94a3b8;
}
.dh-dark-blend .card-meta i {
  color: #475569;
}
.dh-dark-blend .action-btn {
  color: #3b82f6;
}

.scenario-card-v5:hover {
  transform: translateY(-8px);
  box-shadow: 0 40px 80px -15px rgba(59, 130, 246, 0.12);
  border-color: #3b82f6;
  background: #ffffff;
}

.dh-dark-blend:hover {
  background: #111827;
  border-color: #3b82f6;
}

.card-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.model-tag {
  font-size: 0.75rem;
  font-weight: 700;
  color: #3b82f6;
  background: #eff6ff;
  padding: 4px 12px;
  border-radius: 100px;
  letter-spacing: 0.02em;
}

.card-meta i {
  color: #94a3b8;
  font-size: 1.1rem;
}

.card-title-v5 {
  font-size: 1.8rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 8px;
  line-height: 1.2;
}

.card-subtitle-v5 {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 32px;
}

.v5-visual {
  flex: 1;
  position: relative;
  border-radius: 16px;
  background: #f8faff;
  overflow: hidden;
}

/* Video Flow UI - Fixed & Refined */
.card-content-split {
  display: flex;
  align-items: center; /* Center vertically */
  gap: 48px;
  height: 100%;
}

.card-info {
  flex: 0 0 260px; /* Fixed width for text */
  display: flex;
  flex-direction: column;
}

.video-flow-ui {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background: transparent !important; /* Remove v5-visual default bg if needed */
  overflow: visible !important; /* Allow tags to show */
}

.source-preview {
  width: 140px;
  height: 190px;
  position: relative;
  border-radius: 12px;
  overflow: visible; /* Container for tag */
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.source-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
}

.flow-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  color: #3b82f6;
  position: relative;
  z-index: 2;
}

.flow-arrow .glow {
  position: absolute;
  width: 32px;
  height: 32px;
  background: #3b82f6;
  filter: blur(20px);
  opacity: 0.4;
}

.phone-mockup {
  width: 160px;
  height: 290px;
  background: #000;
  border-radius: 28px;
  border: 6px solid #0f172a;
  position: relative;
  box-shadow: 0 30px 60px -10px rgba(0, 0, 0, 0.4);
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 21px;
  overflow: hidden;
}

.phone-screen video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag {
  position: absolute;
  bottom: -28px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.7rem;
  font-weight: 700;
  color: #94a3b8;
  white-space: nowrap;
  letter-spacing: 0.05em;
}

/* Digital Human - Immersive Deep Blend */
.dh-immersive-light {
  flex: 1;
  margin: 0px -32px -32px -32px;
  position: relative;
  overflow: hidden;
  /* Advanced feathering using mask-image */
  -webkit-mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 85%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to bottom,
    transparent 0%,
    black 20%,
    black 85%,
    transparent 100%
  );
}

.dh-video-bg {
  width: 100%;
  height: 120%;
  object-fit: cover;
  opacity: 0.95;
  filter: saturate(1.1) brightness(0.9);
}

.dh-overlay-fx {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(to top, #0f172a 0%, transparent 100%);
}

.audio-indicators {
  position: absolute;
  bottom: 24px;
  left: 40px;
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 0.6;
}

.audio-indicators .audio-wave {
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 16px;
}

/* Old Video Immersive Removals */

/* Coach Flow UI */
.coach-flow-ui {
  padding: 24px;
}

.chat-container-v5 {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-msg {
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 0.85rem;
  max-width: 90%;
}

.chat-msg.user {
  background: #f1f5f9;
  color: #475569;
  align-self: flex-start;
}

.chat-msg.bot {
  background: white;
  border: 1px solid #e2e8f0;
  align-self: flex-end;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
}

.bot-header {
  color: #3b82f6;
  font-weight: 800;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.typing-placeholder .line {
  height: 8px;
  background: #f1f5f9;
  border-radius: 4px;
  margin-bottom: 8px;
  font-size: 0.8rem;
  color: #0f172a;
  line-height: 1;
}

.kb-badge {
  margin-top: 12px;
  font-size: 0.7rem;
  color: #10b981;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Digital Human Immersive */
.audio-wave {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* Digital Human Window UI */
.dh-window-ui {
  background: radial-gradient(circle at center, #f1f5f9 0%, #ffffff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
  flex: 1;
}

.glass-window-frame {
  width: 220px;
  height: 160px;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 16px;
  padding: 8px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.06);
  position: relative;
  z-index: 2;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.scenario-card-v5:hover .glass-window-frame {
  transform: translateY(-5px) scale(1.02);
}

.dh-frame-vid {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}

.audio-wave-bars {
  position: absolute;
  bottom: 16px;
  left: 16px;
  display: flex;
  gap: 3px;
  align-items: flex-end;
  height: 20px;
}

.audio-wave-bars .bar {
  width: 3px;
  background: #3b82f6;
  border-radius: 1px;
  animation: waveRise 0.6s infinite alternate;
}

.audio-wave-bars .bar:nth-child(2) {
  animation-delay: 0.1s;
}
.audio-wave-bars .bar:nth-child(3) {
  animation-delay: 0.2s;
}
.audio-wave-bars .bar:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes waveRise {
  from {
    height: 4px;
  }
  to {
    height: 16px;
  }
}

/* QA Data UI */
.qa-data-ui {
  padding: 24px;
  background: #f1f5f9;
}

.search-entry {
  background: white;
  padding: 12px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  color: #1e293b;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.glass-data-grid {
  background: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  height: 140px;
  padding: 24px;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
}

.stat-bar {
  width: 30px;
  background: #cbd5e1;
  border-radius: 4px 4px 0 0;
  position: relative;
  transition: all 0.3s;
}

.stat-bar.highlight {
  background: #3b82f6;
}
.stat-bar .val {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.65rem;
  font-weight: 800;
  color: #0f172a;
}

/* Industry Analysis UI v2 - Compact & Fixed */
.industry-graph-ui {
  background: rgba(59, 130, 246, 0.03); /* Extremely subtle tint */
  padding: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.analysis-web {
  position: relative;
  height: 110px; /* Reduced height to prevent clipping */
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.02);
}

.scan-overlay {
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: conic-gradient(
    from 0deg,
    transparent 0deg,
    rgba(59, 130, 246, 0.1) 60deg,
    transparent 120deg
  );
  animation: radarScan 4s linear infinite;
}

@keyframes radarScan {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.web-center {
  width: 60px;
  height: 60px;
  background: #0f172a;
  color: white;
  border-radius: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
  box-shadow: 0 0 20px rgba(15, 23, 42, 0.3);
}

.web-center i {
  font-size: 1.2rem;
  margin-bottom: 2px;
}
.web-center span {
  font-size: 0.6rem;
  font-weight: 700;
  opacity: 0.8;
}

.web-node {
  position: absolute;
  padding: 4px 10px;
  background: white;
  border: 1px solid #3b82f633;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 600;
  color: #1e293b;
  z-index: 2;
}

.web-node.n1 {
  top: 20px;
  right: 20px;
}
.web-node.n2 {
  bottom: 30px;
  left: 20px;
}
.web-node.n3 {
  top: 30px;
  left: 40px;
}

.keyword-input-mock {
  position: relative;
  z-index: 2;
  background: #f1f5f9;
  padding: 8px 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.75rem;
  color: #475569;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.keyword-input-mock i {
  color: #3b82f6;
}

.typing-cursor {
  width: 2px;
  height: 14px;
  background: #3b82f6;
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  from,
  to {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

/* Report Box Styling */
.report-box {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 12px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
}

.report-badge {
  position: absolute;
  top: -8px;
  right: 12px;
  background: #ef4444;
  color: white;
  font-size: 0.55rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

.report-main {
  display: flex;
  align-items: center;
  gap: 12px;
}

.report-main i {
  font-size: 1.5rem;
  color: #3b82f6;
}
.report-info {
  display: flex;
  flex-direction: column;
}
.r-title {
  font-size: 0.75rem;
  font-weight: 700;
  color: #0f172a;
}
.r-meta {
  font-size: 0.6rem;
  color: #64748b;
  margin-top: 2px;
}

/* Card Footer */
.card-footer-v5 {
  margin-top: auto;
  padding-top: 24px;
}

.action-btn {
  font-size: 0.95rem;
  font-weight: 700;
  color: #3b82f6;
  display: flex;
  align-items: center;
  gap: 8px;
}

.action-btn.white {
  color: white;
}
.action-btn i {
  transition: transform 0.3s;
}
.scenario-card-v5:hover .action-btn i {
  transform: translateX(5px);
}

@media (max-width: 1024px) {
  .scenarios-grid-v5 {
    grid-template-columns: 1fr;
  }
}

/* Digital Human Visual */
.avatar-card {
  background: white;
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 40px 60px rgba(0, 0, 0, 0.05);
  width: 300px;
  position: relative;
}

.avatar-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
}

.audio-wave {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  margin-top: 20px;
  height: 20px;
}

.audio-wave span {
  width: 4px;
  height: 100%;
  background: #3b82f6;
  border-radius: 2px;
  animation: wave 1s infinite alternate;
}

.audio-wave span:nth-child(2) {
  animation-delay: 0.1s;
}
.audio-wave span:nth-child(3) {
  animation-delay: 0.2s;
}
.audio-wave span:nth-child(4) {
  animation-delay: 0.3s;
}

@keyframes wave {
  0% {
    height: 20%;
  }
  100% {
    height: 100%;
  }
}

/* Graph Visual */
.mind-map-v2 {
  display: flex;
  align-items: center;
  gap: 40px;
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
}

.map-node {
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
}

.map-node.root {
  background: #1e293b;
  color: white;
}
.map-node.leaf {
  border: 2px solid #e2e8f0;
  color: #475569;
}

.map-line {
  height: 2px;
  width: 40px;
  background: #e2e8f0;
}

@media (max-width: 1024px) {
  .scenarios-grid-v4 {
    grid-template-columns: 1fr;
  }
}

.section-title-v5 {
  font-size: 2.8rem;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.02em;
  margin: 0;
}
</style>



<style scoped>
/* Industry Solutions Horizontal Scroll */

.sol-container-wrapper {
  position: relative;

  display: flex;

  align-items: center;

  max-width: 1400px;

  margin: 0 auto;
}

.sol-footer {
  text-align: center;

  margin-top: 10px;
}

.sol-cards-container {
  display: flex;

  gap: 20px;

  overflow-x: auto;

  padding: 10px 4px 20px 4px;

  scrollbar-width: none; /* Hide scrollbar */

  scroll-behavior: auto;

  margin: 0 60px;
}

/* Hide scrollbar for Chrome/Safari */

.sol-cards-container::-webkit-scrollbar {
  display: none;
}

.sol-nav-btn {
  position: absolute;

  top: 50%;

  transform: translateY(-50%);

  width: 48px;

  height: 48px;

  border-radius: 50%;

  background: white;

  border: 1px solid #e2e8f0;

  color: #1e293b;

  display: flex;

  align-items: center;

  justify-content: center;

  cursor: pointer;

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  z-index: 10;

  transition: all 0.3s;

  font-size: 1.2rem;
}

.sol-nav-btn:hover {
  background: #3b82f6;

  color: white;

  border-color: #3b82f6;

  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
}

.sol-nav-btn.prev {
  left: 0;
}

.sol-nav-btn.next {
  right: 0;
}

.sol-v2-card {
  flex: 0 0 280px; /* Slimmer portrait aspect ratio */

  height: 500px;

  border-radius: 20px;

  position: relative;

  overflow: hidden;

  cursor: pointer;

  background-size: cover;

  background-position: center;

  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.sol-v2-card:hover {
  transform: translateY(-10px);

  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);

  flex: 0 0 300px; /* Slight expand */
}

/* Overlay for text readability */

.sol-v2-overlay {
  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 0.9) 20%,
    rgba(255, 255, 255, 0) 60%
  );

  pointer-events: none;

  z-index: 1;
}

/* Dark theme overlay override */

.sol-v2-card.theme-dark .sol-v2-overlay {
  background: linear-gradient(
    180deg,
    rgba(15, 23, 42, 1) 0%,
    rgba(15, 23, 42, 0.9) 20%,
    rgba(15, 23, 42, 0) 60%
  );
}

.sol-v2-content {
  padding: 32px 24px;

  height: 100%;

  display: flex;

  flex-direction: column;

  z-index: 2;

  position: relative;
}

.sol-v2-header {
  width: 100%;
}

.sol-v2-label {
  display: block;

  font-size: 1.4rem;

  font-weight: 800;

  margin-bottom: 16px;

  line-height: 1.2;

  color: #1e293b; /* Default light theme text */
}

.sol-v2-pain {
  font-size: 0.85rem;

  line-height: 1.5;

  margin-bottom: 12px;

  padding-left: 10px;

  border-left: 2px solid #cbd5e1; /* Default border color */

  color: #475569;
}

.sol-v2-desc {
  font-size: 0.95rem;

  line-height: 1.6;

  color: #64748b;

  display: -webkit-box;

  -webkit-line-clamp: 2;

  line-clamp: 2;

  -webkit-box-orient: vertical;

  overflow: hidden;
}

/* Dark Theme Text Colors */

.sol-v2-card.theme-dark .sol-v2-label {
  color: #ffffff;
}

.sol-v2-card.theme-dark .sol-v2-pain {
  color: rgba(255, 255, 255, 0.9);

  border-left-color: rgba(255, 255, 255, 0.3);
}

.sol-v2-card.theme-dark .sol-v2-desc {
  color: rgba(255, 255, 255, 0.8);
}

/* Remove old visual styles */

.sol-v2-visual {
  display: none;
}

/* Sol Action Button */

.sol-v2-action {
  margin-top: auto;
}

.btn-sol-glass {
  display: inline-flex;

  align-items: center;

  gap: 8px;

  padding: 8px 16px;

  background: rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(8px);

  -webkit-backdrop-filter: blur(8px);

  border: 1px solid rgba(255, 255, 255, 0.3);

  border-radius: 20px;

  color: #1e293b;

  text-decoration: none; /* Remove link underline */

  font-size: 0.85rem;

  font-weight: 600;

  cursor: pointer;

  transition: all 0.3s;
}

.btn-sol-glass i {
  font-size: 0.8rem;

  transition: transform 0.3s;
}

.btn-sol-glass:hover {
  background: rgba(255, 255, 255, 0.4);

  padding-right: 20px; /* Slight expand */
}

.btn-sol-glass:hover i {
  transform: translateX(4px);
}

/* Dark Theme Button */

.sol-v2-card.theme-dark .btn-sol-glass {
  color: white;

  background: rgba(255, 255, 255, 0.15);

  border-color: rgba(255, 255, 255, 0.2);
}

.sol-v2-card.theme-dark .btn-sol-glass:hover {
  background: rgba(255, 255, 255, 0.3);
}

.industry-title {
  font-size: 2.8rem !important;

  font-weight: 500 !important;

  text-align: center;

  margin-bottom: 60px;

  color: #1e293b;

  background: none !important;

  -webkit-text-fill-color: #1e293b !important;
}

/* ==========================================================
   HomeView Specific Mobile Adjustments 
   (Fixing broken modules, UI overlaps and overflows)
   ========================================================== */
@media (max-width: 1024px) {
  .sol-cards-container {
    pointer-events: auto;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
  }
  .sol-v2-card {
    scroll-snap-align: start;
    width: 320px;
    flex: 0 0 auto;
  }
  .sol-container-wrapper {
    margin: 0 -20px;
    padding: 0 20px;
  }
  .sol-nav-btn {
    display: none !important;
  }
}

@media (max-width: 768px) {
  /* Hero Bottom Bar / Tabs */
  .hero-bottom-bar {
    display: none !important;
  }

  /* Hero Navigation Buttons Refinement */
  .hero-nav-btn {
    background: transparent !important;
    border: none !important;
    backdrop-filter: none !important;
    width: 30px !important;
    height: 60px !important;
    color: rgba(255, 255, 255, 0.4) !important;
    font-size: 1.5rem !important;
  }

  .hero-nav-btn:hover {
    color: rgba(255, 255, 255, 0.8) !important;
    box-shadow: none !important;
  }

  .hero-controls {
    padding: 0 5px !important;
  }
  .hero-tabs {
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    justify-content: flex-start;
    -webkit-overflow-scrolling: touch;
  }
  /* Hide scrollbar for clean look */
  .hero-tabs::-webkit-scrollbar {
    display: none;
  }
  .hero-tab-item {
    flex: 0 0 auto;
    padding: 16px 20px;
    border-bottom: none;
  }
  .tab-title {
    font-size: 0.9rem;
    white-space: nowrap;
  }
  .tab-desc {
    display: none; /* Hide description on mobile for clean horizontal tabs */
  }

  .section-title-v5 {
    font-size: 1.5rem;
  }

  /* 16+ AI Application Grid */
  .scenarios-grid-v5 {
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    margin-top: 30px;
  }

  .scenario-card-v5 {
    padding: 24px;
    height: auto;
  }

  .scenario-card-v5.hero-card {
    grid-column: span 1;
  }

  .card-content-split {
    flex-direction: column;
    gap: 20px;
  }

  .v5-visual {
    min-height: 250px;
  }

  /* Industry Title */
  .industry-title {
    font-size: 1.8rem !important;
    margin-bottom: 30px;
    word-wrap: break-word;
    padding: 0 16px;
  }

  /* Customer Success - Styles moved to home.css for consistency */

  .success-header {
    padding: 10px 0 10px;
  }
  .v3-main-title {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  .v3-case-tabs {
    display: none;
  }

  /* Trust Section */
  .trust-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .trust-card {
    padding: 24px;
  }
}
.hero-v2-text-area {
  align-items: flex-start;
}
.hero-subtitle-v2 {
  text-align: left;
}
.hero-title-v2 {
  text-align: left;
}
.seedance-title {
  font-size: 1.8rem !important;
}
</style>