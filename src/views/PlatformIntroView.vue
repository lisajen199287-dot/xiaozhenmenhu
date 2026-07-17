<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const shellRef = ref<HTMLElement | null>(null);
const frameRef = ref<HTMLIFrameElement | null>(null);
const scale = ref(1);
let observer: ResizeObserver | null = null;

const FRAME_WIDTH = 1600;
const FRAME_HEIGHT = 1360;

const frameHeight = computed(() => `${Math.ceil(FRAME_HEIGHT * scale.value)}px`);
const frameStyle = computed(() => ({
  width: `${FRAME_WIDTH}px`,
  height: `${FRAME_HEIGHT}px`,
  transform: `translateX(-50%) scale(${scale.value})`,
}));

const updateScale = () => {
  const width = shellRef.value?.clientWidth || FRAME_WIDTH;
  scale.value = Math.min(1, width / FRAME_WIDTH);
};

const navigate = (path: string) => {
  if (path.includes(".html") || path.startsWith("http")) {
    window.location.href = path;
    return;
  }
  router.push(path);
};

const bindFrameLinks = () => {
  const doc = frameRef.value?.contentDocument;
  if (!doc) return;

  const links: Array<[string, string]> = [
    [".business-apps .app-card:nth-of-type(1)", "/digital-employee"],
    [".business-apps .app-card:nth-of-type(2)", "/ecommerce-ask"],
    [".data-pipeline > .node:nth-of-type(1)", "/data-governance"],
    [".data-pipeline > .node:nth-of-type(2)", "/trusted-connector"],
    [".services-grid .policy", "/park-collaboration"],
    [".services-grid .token-hub", "/console.html#/api"],
  ];

  links.forEach(([selector, path]) => {
    const el = doc.querySelector<HTMLElement>(selector);
    if (!el) return;
    el.style.cursor = "pointer";
    el.setAttribute("role", "button");
    el.setAttribute("tabindex", "0");
    el.onclick = () => navigate(path);
    el.onkeydown = (event: KeyboardEvent) => {
      if (event.key === "Enter") navigate(path);
    };
  });
};

onMounted(async () => {
  await nextTick();
  updateScale();
  observer = new ResizeObserver(updateScale);
  if (shellRef.value) observer.observe(shellRef.value);
  window.addEventListener("resize", updateScale);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  window.removeEventListener("resize", updateScale);
});
</script>

<template>
  <div class="intro-page">
    <header class="page-hero-v2 intro-hero">
      <video autoplay muted loop playsinline class="hero-video">
        <source src="/static/videos/round-bg-video.mp4" type="video/mp4" />
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <div class="hero-badge-v2">About Platform</div>
        <h1>平台概况</h1>
        <p class="main-desc">普惠共生 · 智联未来</p>
      </div>
    </header>

    <section class="operator-challenge-section">
      <div class="challenge-panel">
        <div class="challenge-heading">
          <span class="section-kicker">OPERATION CHALLENGES</span>
          <h2>园区运营商面临的问题与挑战</h2>
          <p>
            园区运营正面临从“空间出租”向“企业服务与精细化运营”转型的压力，
            招商、服务、运营三大环节亟待升级。
          </p>
        </div>

        <div class="challenge-grid">
          <article class="challenge-card leasing-card">
            <div class="challenge-card-head">
              <span class="challenge-icon">招</span>
              <div>
                <strong>招商困境</strong>
                <small>获客转化与品牌吸引力不足</small>
              </div>
            </div>
            <ul>
              <li><b>空置率高：</b>招商渠道有限，客户转化效率低</li>
              <li><b>影响力弱：</b>园区品牌曝光不足，招商吸引力有限</li>
              <li><b>企业流失率增高：</b>企业需求无法持续满足，续租意愿下降</li>
            </ul>
          </article>

          <article class="challenge-card service-card">
            <div class="challenge-card-head">
              <span class="challenge-icon">服</span>
              <div>
                <strong>服务短板</strong>
                <small>服务资源分散，园企连接不够紧密</small>
              </div>
            </div>
            <ul>
              <li><b>服务同质化：</b>缺乏特色服务和差异化竞争力</li>
              <li><b>企业资源整合弱：</b>企业需求、服务资源与政策资源分散</li>
              <li><b>园企连接弱：</b>缺少常态化沟通和精准触达机制</li>
            </ul>
          </article>

          <article class="challenge-card operation-card">
            <div class="challenge-card-head">
              <span class="challenge-icon">营</span>
              <div>
                <strong>运营挑战</strong>
                <small>人工依赖高，响应与决策能力不足</small>
              </div>
            </div>
            <ul>
              <li><b>人员效率低：</b>依赖人工处理，跨部门协同成本高</li>
              <li><b>应急响应弱：</b>风险发现不及时，缺乏统一调度和闭环处置</li>
              <li><b>数据支撑不足：</b>运营数据分散，管理决策主要依赖经验</li>
            </ul>
          </article>
        </div>

        <div class="challenge-summary">
          <span>转型方向</span>
          <p>
            园区亟需构建“精准招商、特色服务、智能运营”的一体化运营体系，
            实现企业引得进、留得住，园区管得好、响应快。
          </p>
        </div>
      </div>
    </section>

    <section class="architecture-section">
      <div ref="shellRef" class="architecture-frame-shell" :style="{ height: frameHeight }">
        <iframe
          ref="frameRef"
          class="architecture-frame"
          src="/static/town_project_architecture_demo_fixed.html"
          title="小镇项目产品架构图"
          scrolling="no"
          :style="frameStyle"
          @load="bindFrameLinks"
        ></iframe>
      </div>
    </section>
  </div>
</template>

<style scoped>
.intro-page {
  min-height: 100vh;
  padding-top: 72px;
  overflow-x: hidden;
  background:
    linear-gradient(rgba(37, 99, 235, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.035) 1px, transparent 1px),
    radial-gradient(circle at 82% 8%, rgba(14, 165, 233, 0.16), transparent 30%),
    #ffffff;
  background-size: 42px 42px, 42px 42px, auto, auto;
  color: #0f172a;
}

.intro-hero {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  height: 35vh;
  overflow: hidden;
  background: #ffffff;
  mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 95%);
  -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 95%);
}

.hero-video {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  z-index: 2;
  background: linear-gradient(180deg, rgba(15, 23, 42, 0.08), rgba(15, 23, 42, 0.16));
}

.page-hero-v2 {
  position: relative;
  text-align: center;
}

.hero-content {
  position: relative;
  z-index: 10;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  transform: translateY(-10%);
}

.hero-badge-v2 {
  display: inline-block;
  padding: 4px 14px;
  margin-bottom: 16px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.page-hero-v2 h1 {
  margin: 0 0 12px;
  color: #fff;
  font-size: 3.8rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.48);
}

.main-desc {
  margin: 0 0 0 0.4em;
  color: #fff;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 0.4em;
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);
}

.operator-challenge-section {
  width: min(100% - 48px, 1400px);
  margin: -10px auto 0;
  padding: 24px 0 8px;
}

.challenge-panel {
  position: relative;
  overflow: hidden;
  padding: 34px;
  border: 1px solid rgba(147, 197, 253, 0.62);
  border-radius: 28px;
  background:
    radial-gradient(circle at 8% 12%, rgba(37, 99, 235, 0.12), transparent 30%),
    radial-gradient(circle at 92% 0%, rgba(6, 182, 212, 0.14), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(240, 247, 255, 0.92));
  box-shadow: 0 24px 80px rgba(42, 90, 135, 0.12);
}

.challenge-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(37, 99, 235, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.035) 1px, transparent 1px);
  background-size: 28px 28px;
}

.challenge-heading,
.challenge-grid,
.challenge-summary {
  position: relative;
  z-index: 1;
}

.challenge-heading {
  max-width: 900px;
  margin: 0 auto 26px;
  text-align: center;
}

.section-kicker {
  display: inline-block;
  margin-bottom: 10px;
  color: #155eef;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.22em;
}

.challenge-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(28px, 3vw, 42px);
  font-weight: 900;
  letter-spacing: 0.02em;
}

.challenge-heading p {
  margin: 14px 0 0;
  color: #52657d;
  font-size: 16px;
  line-height: 1.9;
}

.challenge-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.challenge-card {
  min-height: 330px;
  padding: 24px;
  border: 1px solid #dbeafe;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 46px rgba(37, 99, 235, 0.08);
}

.challenge-card-head {
  display: flex;
  gap: 14px;
  align-items: center;
  padding-bottom: 18px;
  margin-bottom: 18px;
  border-bottom: 1px solid #e6f0fb;
}

.challenge-icon {
  display: grid;
  width: 52px;
  height: 52px;
  place-items: center;
  border-radius: 16px;
  color: #fff;
  background: linear-gradient(135deg, #2563eb, #06b6d4);
  font-size: 22px;
  font-weight: 900;
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.22);
}

.service-card .challenge-icon {
  background: linear-gradient(135deg, #0ea5e9, #22c55e);
}

.operation-card .challenge-icon {
  background: linear-gradient(135deg, #7c3aed, #2563eb);
}

.challenge-card-head strong,
.challenge-card-head small {
  display: block;
}

.challenge-card-head strong {
  color: #0f172a;
  font-size: 22px;
  font-weight: 900;
}

.challenge-card-head small {
  margin-top: 5px;
  color: #64748b;
  font-size: 13px;
  font-weight: 700;
}

.challenge-card ul {
  display: grid;
  gap: 14px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.challenge-card li {
  position: relative;
  padding-left: 18px;
  color: #52657d;
  font-size: 15px;
  line-height: 1.75;
}

.challenge-card li::before {
  content: "";
  position: absolute;
  top: 0.78em;
  left: 0;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #2563eb;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
}

.challenge-card b {
  color: #0f2a4d;
  font-weight: 900;
}

.challenge-summary {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  margin-top: 20px;
  padding: 18px 22px;
  border: 1px solid rgba(37, 99, 235, 0.22);
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(37, 99, 235, 0.08), rgba(6, 182, 212, 0.08));
}

.challenge-summary span {
  padding: 8px 12px;
  border-radius: 999px;
  color: #155eef;
  background: #eff6ff;
  font-size: 13px;
  font-weight: 900;
}

.challenge-summary p {
  margin: 0;
  color: #27415f;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.8;
}

.architecture-section {
  width: min(100% - 18px, 1580px);
  margin: 0 auto;
  padding: 48px 0 96px;
}

.architecture-frame-shell {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 24px;
  background: #edf5ff;
  box-shadow: 0 28px 80px rgba(42, 90, 135, 0.12);
}

.architecture-frame {
  position: absolute;
  top: 0;
  left: 50%;
  display: block;
  border: 0;
  transform-origin: top center;
}

@media (max-width: 720px) {
  .page-hero-v2 h1 {
    font-size: 2.5rem;
  }

  .operator-challenge-section {
    width: calc(100% - 20px);
  }

  .challenge-panel {
    padding: 22px;
  }

  .challenge-grid,
  .challenge-summary {
    grid-template-columns: 1fr;
  }

  .challenge-card {
    min-height: 0;
  }

  .architecture-section {
    width: calc(100% - 12px);
    padding-top: 32px;
  }
}
</style>
