<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const shellRef = ref<HTMLElement | null>(null);
const frameRef = ref<HTMLIFrameElement | null>(null);
const scale = ref(1);
let observer: ResizeObserver | null = null;

const FRAME_WIDTH = 1600;
const FRAME_HEIGHT = 1560;

const transformationPains = [
  "不知道怎么转",
  "转不起",
  "怕踩坑",
  "缺人才",
  "缺数据",
  "缺可信服务商"
];

const governmentRoles = [
  { icon: "fa-people-arrows", title: "产业生态", subtitle: "组织者" },
  { icon: "fa-building-columns", title: "公共能力", subtitle: "供给者" },
  { icon: "fa-door-open", title: "创新场景", subtitle: "开放者" },
  { icon: "fa-shield-halved", title: "规则秩序", subtitle: "维护者" }
];

const modernizationPath = [
  { icon: "fa-cloud", title: "普惠算力/模型/工业软件/应用模板" },
  { icon: "fa-bullseye", title: "小切口用起来" },
  { icon: "fa-database", title: "真实数据积累起来" },
  { icon: "fa-chart-line", title: "行业模型成熟起来" },
  { icon: "fa-rocket", title: "产业能力形成起来" }
];

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

    <section class="industry-governance-section">
      <div class="governance-panel">
        <div class="governance-heading">
          <span class="section-kicker">INDUSTRIAL GOVERNANCE</span>
          <h2>产业治理现代化</h2>
          <p>
            面向中小企业数字化转型，政府侧通过组织生态、供给公共能力、开放创新场景和维护规则秩序，
            把分散资源沉淀为可持续的产业服务能力。
          </p>
        </div>

        <div class="governance-top-grid">
          <article class="pain-card">
            <div class="governance-icon large">
              <i class="fas fa-circle-exclamation"></i>
            </div>
            <div>
              <h3>企业转型的真实痛点</h3>
              <ul class="pain-list">
                <li
                  v-for="item in transformationPains"
                  :key="item"
                  :class="{ highlighted: item === '缺可信服务商' }"
                >
                  <span v-if="item === '缺可信服务商'" class="pain-highlight-mark">
                    {{ item }}
                    <span class="pain-arrow pain-arrow-horizontal" aria-hidden="true"></span>
                    <span class="pain-arrow pain-arrow-diagonal" aria-hidden="true"></span>
                  </span>
                  <template v-else>{{ item }}</template>
                </li>
              </ul>
            </div>
          </article>

          <article class="role-card">
            <div class="role-heading">
              <span></span>
              <h3>政府要做什么</h3>
              <span></span>
            </div>
            <div class="role-grid">
              <div v-for="item in governmentRoles" :key="item.title" class="role-item">
                <span class="governance-icon">
                  <i :class="['fas', item.icon]"></i>
                </span>
                <strong>{{ item.title }}</strong>
                <small>{{ item.subtitle }}</small>
              </div>
            </div>
          </article>
        </div>

        <div class="path-panel">
          <div class="path-heading">
            <span></span>
            <h3>面向中小企业的有效路径</h3>
            <span></span>
          </div>
          <div class="path-flow">
            <template v-for="(item, index) in modernizationPath" :key="item.title">
              <article class="path-step">
                <span class="governance-icon">
                  <i :class="['fas', item.icon]"></i>
                </span>
                <strong>{{ item.title }}</strong>
              </article>
              <i v-if="index < modernizationPath.length - 1" class="fas fa-arrow-right path-arrow"></i>
            </template>
          </div>
          <p class="path-slogan">让企业敢转、会转、转得起、转得好。</p>
        </div>

        <div class="governance-summary">
          <span>产业治理现代化，</span>
          <strong>不是替企业做选择，而是把分散资源组织成系统能力。</strong>
        </div>
      </div>
    </section>

    <section class="operator-challenge-section">
      <div class="challenge-panel">
        <div class="challenge-heading">
          <span class="section-kicker">OPERATION CHALLENGES</span>
          <h2>园区运营面临的问题与挑战</h2>
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

    <section class="operation-solution-section">
      <div class="solution-panel">
        <div class="solution-heading">
          <h2>园区数智化运营业务框架</h2>
        </div>

        <div class="solution-flow" aria-label="园区数智化运营业务框架">
          <div class="solution-canvas">
          <svg class="solution-lines" viewBox="0 0 1200 650" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <marker id="solutionArrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
              <marker id="solutionArrowMuted" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z"></path>
              </marker>
            </defs>
            <!-- 三组左侧能力由核心节点向外分叉，对应参考图中的灰色双支路。 -->
            <path class="line muted no-arrow" d="M220 229 H204" />
            <path class="line muted" d="M204 229 L176 210" />
            <path class="line muted" d="M204 229 L176 280" />
            <path class="line muted no-arrow" d="M220 399 H204" />
            <path class="line muted" d="M204 399 L176 375" />
            <path class="line muted" d="M204 399 L176 445" />
            <path class="line muted no-arrow" d="M220 559 H204" />
            <path class="line muted" d="M204 559 L176 550" />
            <path class="line muted" d="M204 559 L176 620" />
            <path class="line muted no-arrow" d="M906 559 H922" />
            <path class="line muted" d="M922 559 L940 544" />
            <path class="line muted" d="M922 559 L940 614" />

            <!-- 园区招商分别驱动园区运营、产业服务与政策服务。 -->
            <path class="line" d="M676 77 H840" />
            <path class="line no-arrow" d="M533 116 V150 H363" />
            <path class="line no-arrow" d="M533 150 H763" />
            <path class="line" d="M363 150 V190" />
            <path class="line" d="M763 150 V190" />

            <!-- 产业服务、数据治理、可信空间和词元中枢形成纵向与横向能力链。 -->
            <path class="line" d="M363 268 V360" />
            <path class="line" d="M363 438 V520" />
            <path class="line" d="M506 559 H620" />

            <!-- 三条关键业务关系：数据治理政策申报、政策服务算力补助、园区运营提供政策服务。 -->
            <path class="line" d="M763 268 V520" />
            <path class="line curved" d="M506 399 C548 365 570 270 620 229" />
            <path class="line curved" d="M945 116 C945 180 940 229 906 229" />

            <!-- 园区运营向右分支至园企协同与智慧物联。 -->
            <path class="line muted no-arrow" d="M1050 77 H1055 V64 H1060" />
            <path class="line muted no-arrow" d="M1055 77 V212 H1060" />
          </svg>

          <div class="flow-node input-node blue" style="--x: 0px; --y: 180px">问数智能体</div>
          <div class="flow-node input-node blue" style="--x: 0px; --y: 250px">数字员工</div>
          <div class="flow-node input-node slate" style="--x: 0px; --y: 345px">资产盘点</div>
          <div class="flow-node input-node slate" style="--x: 0px; --y: 415px">清洗标注</div>
          <div class="flow-node input-node green" style="--x: 0px; --y: 520px">数据流通</div>
          <div class="flow-node input-node green" style="--x: 0px; --y: 590px">模型广场</div>

          <div class="flow-node main-node purple" style="--x: 390px; --y: 38px">园区招商</div>
          <div class="flow-node main-node blue" style="--x: 220px; --y: 190px">产业服务</div>
          <div class="flow-node main-node slate" style="--x: 220px; --y: 360px">数据治理</div>
          <div class="flow-node main-node green" style="--x: 220px; --y: 520px">可信空间</div>
          <div class="flow-node main-node purple" style="--x: 620px; --y: 520px">词元中枢</div>
          <div class="flow-node main-node amber" style="--x: 620px; --y: 190px">政策服务</div>
          <div class="flow-node main-node green operation-node" style="--x: 840px; --y: 38px">园区运营</div>

          <div class="flow-node input-node compact purple" style="--x: 940px; --y: 520px">算力Token</div>
          <div class="flow-node input-node compact purple" style="--x: 940px; --y: 590px">账单明细</div>
          <div class="flow-node side-node green" style="--x: 1060px; --y: 28px">园企协同</div>
          <div class="flow-node side-node green" style="--x: 1060px; --y: 176px">智慧物联</div>

          <div class="flow-label provide" style="--x: 918px; --y: 142px">提供</div>
          <div class="flow-label subsidy" style="--x: 528px; --y: 300px">政策<br />申报</div>
          <div class="flow-label policy" style="--x: 776px; --y: 388px">算力<br />补助</div>
          </div>
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

.industry-governance-section {
  width: min(100% - 48px, 1400px);
  margin: 24px auto 0;
  padding: 12px 0 8px;
}

.governance-panel {
  position: relative;
  overflow: visible;
  padding: 34px;
  border: 1px solid rgba(147, 197, 253, 0.62);
  border-radius: 28px;
  background:
    radial-gradient(circle at 6% 4%, rgba(37, 99, 235, 0.13), transparent 30%),
    radial-gradient(circle at 92% 12%, rgba(14, 165, 233, 0.13), transparent 32%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(241, 247, 255, 0.94));
  box-shadow: 0 24px 80px rgba(42, 90, 135, 0.12);
}

.governance-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(37, 99, 235, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.032) 1px, transparent 1px);
  background-size: 28px 28px;
}

.governance-panel::after {
  content: "";
  position: absolute;
  right: 28px;
  top: 26px;
  width: 150px;
  height: 92px;
  opacity: 0.28;
  pointer-events: none;
  background: repeating-linear-gradient(
    90deg,
    rgba(37, 99, 235, 0.26) 0 8px,
    transparent 8px 18px
  );
  clip-path: polygon(0 100%, 0 42%, 12% 42%, 12% 72%, 24% 72%, 24% 34%, 36% 34%, 36% 56%, 48% 56%, 48% 18%, 60% 18%, 60% 46%, 72% 46%, 72% 0, 84% 0, 84% 30%, 100% 30%, 100% 100%);
}

.governance-heading,
.governance-top-grid,
.path-panel,
.governance-summary {
  position: relative;
  z-index: 1;
}

.governance-heading {
  max-width: 920px;
  margin: 0 auto 28px;
  text-align: center;
}

.governance-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(30px, 3.2vw, 46px);
  font-weight: 950;
  letter-spacing: 0.02em;
}

.governance-heading p {
  margin: 14px 0 0;
  color: #52657d;
  font-size: 16px;
  line-height: 1.9;
}

.governance-top-grid {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 28px;
  align-items: stretch;
  z-index: 30;
}

.pain-card,
.role-card,
.path-panel {
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 18px 46px rgba(37, 99, 235, 0.08);
}

.pain-card {
  position: relative;
  z-index: 50;
  overflow: visible;
  display: grid;
  grid-template-columns: 104px minmax(0, 1fr);
  gap: 24px;
  align-items: center;
  padding: 28px;
}

.pain-card h3,
.role-heading h3,
.path-heading h3 {
  margin: 0;
  color: #1e3a8a;
  font-size: 24px;
  font-weight: 950;
}

.pain-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 22px;
  padding: 0;
  margin: 18px 0 0;
  list-style: none;
}

.pain-list li {
  position: relative;
  padding-left: 18px;
  color: #334155;
  font-size: 17px;
  font-weight: 800;
  line-height: 1.5;
}

.pain-list li.highlighted {
  position: relative;
  z-index: 80;
  padding-left: 18px;
  color: #334155;
}

.pain-list li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.68em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2563eb;
}

.pain-list li.highlighted::before {
  left: 0;
}

.pain-highlight-mark {
  position: relative;
  z-index: 100;
  display: inline-block;
  padding: 1px 13px 2px;
  border: 3px solid #ff4b4b;
  border-radius: 999px;
  line-height: 1.1;
  background: transparent;
}

.pain-arrow {
  position: absolute;
  z-index: 999;
  height: 0;
  border-top: 4px solid #ff4b4b;
  pointer-events: none;
}

.pain-arrow::before {
  content: "";
  position: absolute;
  left: -2px;
  top: -8px;
  width: 0;
  height: 0;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 14px solid #ff4b4b;
}

.pain-arrow-horizontal {
  left: calc(100% + 14px);
  top: 50%;
  width: 120px;
  transform: translateY(-50%);
}

.pain-arrow-diagonal {
  left: calc(100% - 2px);
  top: 34px;
  width: 112px;
  transform: rotate(60deg);
  transform-origin: left center;
}

.role-card {
  padding: 28px;
}

.role-heading,
.path-heading {
  display: grid;
  grid-template-columns: minmax(40px, 1fr) auto minmax(40px, 1fr);
  gap: 22px;
  align-items: center;
  margin-bottom: 24px;
  text-align: center;
}

.role-heading span,
.path-heading span {
  height: 2px;
  border-radius: 999px;
  background: linear-gradient(90deg, transparent, rgba(37, 99, 235, 0.38), transparent);
}

.role-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.role-item {
  display: grid;
  justify-items: center;
  min-height: 150px;
  padding: 18px 12px;
  border-radius: 18px;
  background: linear-gradient(180deg, #ffffff, #f3f8ff);
  text-align: center;
}

.role-item strong,
.role-item small {
  display: block;
  color: #1e3a8a;
  font-weight: 900;
  line-height: 1.25;
}

.role-item strong {
  margin-top: 12px;
  font-size: 18px;
}

.role-item small {
  margin-top: 4px;
  font-size: 17px;
}

.governance-icon {
  display: grid;
  width: 62px;
  height: 62px;
  place-items: center;
  border: 5px solid rgba(37, 99, 235, 0.14);
  border-radius: 50%;
  color: #fff;
  background: linear-gradient(135deg, #2338b8, #2563eb);
  box-shadow: 0 14px 30px rgba(37, 99, 235, 0.18);
  font-size: 24px;
}

.governance-icon.large {
  width: 92px;
  height: 92px;
  border-width: 8px;
  font-size: 42px;
}

.path-panel {
  margin-top: 26px;
  padding: 28px;
}

.path-flow {
  display: grid;
  grid-template-columns: minmax(190px, 1.22fr) auto minmax(140px, 0.82fr) auto minmax(170px, 0.92fr) auto minmax(170px, 0.92fr) auto minmax(170px, 0.92fr);
  gap: 12px;
  align-items: center;
}

.path-step {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  min-height: 82px;
  padding: 16px;
  border: 1px solid #dbeafe;
  border-radius: 18px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(239, 247, 255, 0.92));
}

.path-step strong {
  color: #1e3a8a;
  font-size: 18px;
  font-weight: 900;
  line-height: 1.35;
}

.path-arrow {
  color: #2d7fd3;
  font-size: 30px;
}

.path-slogan {
  margin: 26px 0 0;
  color: #27364d;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  letter-spacing: 0.02em;
}

.governance-summary {
  margin-top: 22px;
  padding: 20px 26px;
  border: 1px solid rgba(248, 113, 113, 0.18);
  border-radius: 18px;
  background: linear-gradient(90deg, rgba(254, 242, 242, 0.82), rgba(255, 255, 255, 0.72));
  color: #1e3a8a;
  font-size: clamp(22px, 2.35vw, 34px);
  font-weight: 950;
  line-height: 1.35;
  text-align: center;
}

.governance-summary strong {
  color: #c2410c;
}

.operation-solution-section {
  width: min(100% - 48px, 1400px);
  margin: 24px auto 0;
  padding: 12px 0 8px;
}

.solution-panel {
  position: relative;
  overflow: hidden;
  padding: 34px 34px 42px;
  border: 1px solid rgba(147, 197, 253, 0.62);
  border-radius: 28px;
  background:
    radial-gradient(circle at 10% 0%, rgba(14, 165, 233, 0.12), transparent 30%),
    radial-gradient(circle at 88% 12%, rgba(37, 99, 235, 0.1), transparent 34%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(242, 248, 255, 0.94));
  box-shadow: 0 24px 80px rgba(42, 90, 135, 0.12);
}

.solution-panel::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    linear-gradient(rgba(37, 99, 235, 0.032) 1px, transparent 1px),
    linear-gradient(90deg, rgba(37, 99, 235, 0.032) 1px, transparent 1px);
  background-size: 28px 28px;
}

.solution-heading,
.solution-flow {
  position: relative;
  z-index: 1;
}

.solution-heading {
  margin-bottom: 18px;
  text-align: center;
}

.solution-heading h2 {
  margin: 0;
  color: #0f172a;
  font-size: clamp(30px, 3.2vw, 46px);
  font-weight: 950;
  letter-spacing: 0.02em;
}

.solution-flow {
  width: min(100%, 1200px);
  height: 690px;
  margin: 0 auto;
}

.solution-canvas {
  position: relative;
  width: 1200px;
  height: 650px;
  transform-origin: top left;
}

@media (max-width: 1280px) and (min-width: 721px) {
  .solution-flow {
    height: calc((100vw - 116px) * 0.542 + 36px);
  }

  .solution-canvas {
    transform: scale(calc((100vw - 116px) / 1200));
  }
}

.solution-lines {
  position: absolute;
  inset: 0;
  width: 1200px;
  height: 650px;
  overflow: visible;
}

.solution-lines marker path {
  fill: #2d7fd3;
}

.solution-lines marker#solutionArrowMuted path {
  fill: #93a6ba;
}

.solution-lines .line {
  fill: none;
  stroke: #2d7fd3;
  stroke-width: 3.4;
  marker-end: url("#solutionArrow");
}

.solution-lines .line.muted {
  stroke: #93a6ba;
  marker-end: url("#solutionArrowMuted");
}

.solution-lines .line.no-arrow {
  marker-end: none;
}

.flow-node {
  position: absolute;
  left: var(--x);
  top: var(--y);
  display: grid;
  place-items: center;
  box-sizing: border-box;
  color: #10243f;
  font-weight: 900;
  text-align: center;
  box-shadow: 0 16px 36px rgba(37, 99, 235, 0.08);
}

.input-node {
  width: 176px;
  min-height: 60px;
  padding: 12px 14px;
  border: 1px solid #b8d6f6;
  border-left: 6px solid #2d7fd3;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.92);
  font-size: 18px;
}

.input-node.compact {
  min-height: 48px;
  padding: 9px 12px;
  font-size: 17px;
}

.main-node {
  width: 286px;
  min-height: 78px;
  padding: 16px 20px;
  border: 1px solid #b8d6f6;
  border-left: 7px solid #2d7fd3;
  border-radius: 12px;
  background: rgba(239, 247, 255, 0.94);
  font-size: 30px;
}

.main-node.operation-node {
  width: 210px;
}

.side-node {
  width: 140px;
  min-height: 72px;
  padding: 14px;
  border: 1px solid #91d6ca;
  border-left: 7px solid #10a37f;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.94);
  font-size: 20px;
}

.flow-node.purple {
  border-color: #c8bef7;
  border-left-color: #6d5bd6;
  background: rgba(247, 243, 255, 0.94);
}

.flow-node.green {
  border-color: #9edbcf;
  border-left-color: #10a37f;
  background: rgba(235, 250, 245, 0.94);
}

.flow-node.amber {
  border-color: #f0d58b;
  border-left-color: #e0a800;
  background: rgba(255, 250, 235, 0.96);
}

.flow-node.slate {
  border-color: #b8c8d9;
  border-left-color: #27415f;
  background: rgba(244, 249, 253, 0.96);
}

.flow-label {
  position: absolute;
  left: var(--x);
  top: var(--y);
  display: grid;
  min-width: 76px;
  min-height: 44px;
  place-items: center;
  padding: 6px 12px;
  border: 1px solid #b8d6f6;
  color: #1689c9;
  background: rgba(240, 248, 255, 0.92);
  font-size: 18px;
  font-weight: 950;
  line-height: 1.15;
  text-align: center;
}

.flow-label.provide {
  min-height: 34px;
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

  .operation-solution-section {
    width: calc(100% - 20px);
  }

  .industry-governance-section {
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

  .governance-panel,
  .pain-card,
  .role-card,
  .path-panel {
    padding: 22px;
  }

  .governance-top-grid,
  .pain-card,
  .role-grid,
  .path-flow {
    grid-template-columns: 1fr;
  }

  .pain-card {
    justify-items: start;
  }

  .pain-list {
    grid-template-columns: 1fr;
  }

  .role-heading,
  .path-heading {
    grid-template-columns: 1fr;
    gap: 10px;
    text-align: left;
  }

  .role-heading span,
  .path-heading span,
  .path-arrow {
    display: none;
  }

  .role-item {
    grid-template-columns: auto minmax(0, 1fr);
    justify-items: start;
    min-height: 0;
    gap: 14px;
    align-items: center;
    text-align: left;
  }

  .role-item strong,
  .role-item small {
    grid-column: 2;
  }

  .role-item small {
    margin-top: -8px;
  }

  .path-slogan {
    font-size: 22px;
  }

  .solution-panel {
    padding: 22px;
  }

  .solution-flow {
    display: grid;
    height: auto;
    gap: 12px;
  }

  .solution-canvas {
    display: grid;
    width: 100%;
    height: auto;
    gap: 12px;
    transform: none;
  }

  .solution-lines,
  .flow-label {
    display: none;
  }

  .flow-node,
  .input-node,
  .main-node,
  .side-node {
    position: static;
    width: 100%;
    min-height: 58px;
    font-size: 16px;
  }

  .architecture-section {
    width: calc(100% - 12px);
    padding-top: 32px;
  }
}
</style>
