<script setup lang="ts">
import { computed, ref } from "vue";

type ModuleKey = "practice" | "script" | "report" | "settings";
type ProductMode = "library" | "custom";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  sellingPoints: string[];
  campaignTags: string[];
  personas: string[];
  risks: string[];
  keywords: string[];
}

const activeModule = ref<ModuleKey>("practice");
const productMode = ref<ProductMode>("library");
const selectedProductId = ref("sunproof-jacket");
const replyText = ref("");
const scriptPrompt = ref("帮我生成一段处理价格异议的话术，语气自然一点，适合直播间口播。");
const generatedScriptReply = ref("");
const lastGeneratedAt = ref("刚刚基于最近一次陪练报告更新");

const navItems: Array<{
  key: ModuleKey;
  title: string;
  desc: string;
  icon: string;
}> = [
  { key: "settings", title: "陪练配置", desc: "选择商品和场景", icon: "fa-sliders" },
  { key: "script", title: "话术生成", desc: "生成直播口播稿", icon: "fa-wand-magic-sparkles" },
  { key: "practice", title: "直播陪练", desc: "模拟弹幕练回答", icon: "fa-comments" },
  { key: "report", title: "陪练报告", desc: "查看评分与建议", icon: "fa-chart-pie" },
];

const productLibrary: Product[] = [
  {
    id: "sunproof-jacket",
    name: "冰感防晒衣",
    category: "服饰单品",
    price: "直播价 ¥79",
    sellingPoints: ["UPF50+ 防晒", "冰感速干面料", "微落肩显瘦版型", "三色可选"],
    campaignTags: ["前 300 名赠冰袖", "两件包邮", "直播间限时券"],
    personas: ["通勤白领", "宝妈遛娃", "户外运动用户"],
    risks: ["不要承诺永久防晒", "避免绝对化功效用语"],
    keywords: ["UPF50+", "冰感", "检测报告", "显瘦版型", "限时福利"],
  },
  {
    id: "snack-box",
    name: "低脂零食组合",
    category: "食品饮品",
    price: "组合价 ¥59",
    sellingPoints: ["独立小包装", "低油低糖", "办公室囤货", "多口味混搭"],
    campaignTags: ["满 2 件减 15", "第二件半价", "赠试吃包"],
    personas: ["办公室人群", "健身控", "学生党"],
    risks: ["食品宣称需谨慎", "不夸大减脂效果"],
    keywords: ["低脂", "独立包装", "多口味", "囤货", "试吃包"],
  },
  {
    id: "home-clean",
    name: "家清香氛礼盒",
    category: "家清日化",
    price: "礼盒价 ¥129",
    sellingPoints: ["除味留香", "客厅卧室可用", "礼盒包装", "温和配方"],
    campaignTags: ["节日礼赠", "买一赠一补充装", "会员专享券"],
    personas: ["新居家庭", "送礼用户", "品质生活用户"],
    risks: ["不要替代专业消杀", "敏感人群需提示试用"],
    keywords: ["除味", "留香", "礼盒", "温和", "会员券"],
  },
];

const customProduct = ref<Product>({
  id: "custom",
  name: "新品直播商品",
  category: "自定义类目",
  price: "待配置",
  sellingPoints: ["核心卖点一", "核心卖点二", "差异化优势"],
  campaignTags: ["新品首发", "限时权益"],
  personas: ["目标客群"],
  risks: ["注意合规表达"],
  keywords: ["新品", "卖点", "权益"],
});

const scenarios = [
  { name: "直播开场", prompt: "30 秒建立信任，说明本场福利与商品适用人群" },
  { name: "商品讲解", prompt: "围绕卖点、适用场景、活动权益形成完整讲解" },
  { name: "异议处理", prompt: "模拟价格、质量、售后、尺码等买家追问" },
  { name: "福利催单", prompt: "在不夸大承诺的前提下做转化引导" },
];

const currentScenario = ref("异议处理");
const brandStyle = ref("专业可信 · 亲和讲解");
const selectedTone = ref("自然口播");

const selectedProduct = computed<Product>(() => {
  if (productMode.value === "custom") return customProduct.value;
  return productLibrary.find((item) => item.id === selectedProductId.value) ?? productLibrary[0];
});

const practiceDialog = ref([
  {
    role: "buyer",
    name: "买家弹幕",
    tag: "产品可信度",
    text: "主播，这件防晒衣真的能防晒吗？夏天穿会不会很闷？",
  },
  {
    role: "anchor",
    name: "主播回答",
    tag: "已覆盖 3 个卖点",
    text: "这款是 UPF50+ 的冰感防晒衣，面料轻薄透气，通勤、骑车、遛娃都可以穿，现在还有直播间限时福利。",
  },
  {
    role: "coach",
    name: "AI 教练建议",
    tag: "表达优化",
    text: "建议补充检测报告与穿着场景，例如“有防晒检测报告，户外短途和日常通勤都能覆盖”。",
  },
  {
    role: "buyer",
    name: "买家弹幕",
    tag: "外观异议",
    text: "我担心买回来显胖，有没有更显瘦的颜色？",
  },
]);

const liveQuestions = computed(() => [
  `这个${selectedProduct.value.name}适合什么人买？`,
  `${selectedProduct.value.price}还有没有优惠？`,
  `和普通${selectedProduct.value.category}有什么区别？`,
  "售后和发货怎么保障？",
]);

const scriptBlocks = computed(() => [
  {
    title: "开场引导",
    badge: "30 秒建立信任",
    text: `欢迎来到直播间，今天重点给大家看这款${selectedProduct.value.name}。它适合${selectedProduct.value.personas.join("、")}，本场有${selectedProduct.value.campaignTags.join("、")}，先点关注把福利锁住。`,
  },
  {
    title: "核心卖点讲解",
    badge: "商品价值说明",
    text: `${selectedProduct.value.name}的核心优势是${selectedProduct.value.sellingPoints.join("、")}。讲解时先说使用场景，再给出具体体验，最后把活动权益自然带出来。`,
  },
  {
    title: "异议处理",
    badge: "买家追问应答",
    text: `如果用户质疑价格或效果，可以先共情：“这个问题问得很实际”，再围绕${selectedProduct.value.keywords.slice(0, 3).join("、")}给出证据，不使用绝对化承诺。`,
  },
  {
    title: "转化收口",
    badge: "福利催单",
    text: `收口时强调库存与权益：“本场${selectedProduct.value.campaignTags[0] ?? "限时权益"}，适合的人群可以先拍下试用，不合适也有售后保障。”`,
  },
]);

const reportScores = [
  { label: "清晰度", score: 88, average: 79, basis: "回答结构完整，但开头可更快点出商品适用人群。" },
  { label: "流畅度", score: 84, average: 76, basis: "整体节奏自然，中段有 2 次重复表达，可用短句替换。" },
  { label: "商品专业力", score: 91, average: 80, basis: "卖点、参数和场景覆盖充分，建议补充检测/资质证据。" },
  { label: "异议处理力", score: 82, average: 74, basis: "能回应价格与版型异议，但缺少更明确的对比话术。" },
  { label: "转化引导力", score: 79, average: 72, basis: "福利表达清楚，催单力度偏弱，可增加权益截止提醒。" },
];

const keywordStats = computed(() => {
  const hits = selectedProduct.value.keywords.slice(0, 3);
  const missed = selectedProduct.value.keywords.slice(3);
  return {
    hits,
    missed,
    hitRate: Math.round((hits.length / selectedProduct.value.keywords.length) * 100),
  };
});

const reportTimeline = [
  { title: "陪练计划生成", desc: "根据商品、品牌风格与练习场景生成训练任务" },
  { title: "对话记录归集", desc: "保存主播回答、买家追问、AI 教练纠错与建议" },
  { title: "评分报告输出", desc: "生成总分、维度得分、关键词命中与话术建议" },
  { title: "反哺话术生成", desc: "将历史报告中的薄弱项用于下一轮话术优化" },
];

function setModule(key: ModuleKey) {
  activeModule.value = key;
}

function chooseProduct(id: string) {
  productMode.value = "library";
  selectedProductId.value = id;
}

function submitReply() {
  const content = replyText.value.trim();
  if (!content) return;
  practiceDialog.value.push({
    role: "anchor",
    name: "主播回答",
    tag: "新提交",
    text: content,
  });
  practiceDialog.value.push({
    role: "coach",
    name: "AI 教练建议",
    tag: "即时反馈",
    text: `已记录本次回答。建议继续补充“${selectedProduct.value.keywords[0]}”相关证据，并结合“${selectedProduct.value.campaignTags[0]}”完成转化收口。`,
  });
  replyText.value = "";
}

function generateScript() {
  lastGeneratedAt.value = `已基于「${selectedProduct.value.name}」和最近报告重新生成`;
  const prompt = scriptPrompt.value.trim();
  generatedScriptReply.value = prompt
    ? `已按你的要求生成：针对「${selectedProduct.value.name}」，先回应用户关心点，再突出${selectedProduct.value.sellingPoints.slice(0, 2).join("、")}，最后承接「${selectedProduct.value.campaignTags[0]}」权益。可直接复制下方话术卡继续调整。`
    : `已基于「${selectedProduct.value.name}」生成通用直播话术。`;
  activeModule.value = "script";
}

function exportReport() {
  window.alert("已模拟生成 PDF 报告：包含总分、维度评分、雷达图、关键词命中与话术建议。");
}
</script>

<template>
  <main class="practice-workbench">
    <aside class="system-sidebar">
      <div class="system-brand">
        <div class="brand-icon"><i class="fas fa-headset"></i></div>
        <div>
          <strong>直播电商陪练</strong>
          <span>AI PRACTICE SYSTEM</span>
        </div>
      </div>

      <nav class="system-nav" aria-label="陪练系统导航">
        <button
          v-for="item in navItems"
          :key="item.key"
          :class="{ active: activeModule === item.key }"
          @click="setModule(item.key)"
        >
          <i class="fas" :class="item.icon"></i>
          <span>
            <strong>{{ item.title }}</strong>
            <em>{{ item.desc }}</em>
          </span>
        </button>
      </nav>
    </aside>

    <section class="system-main">
      <header class="system-topbar">
        <div>
          <span>LIVE COMMERCE TRAINING</span>
          <h1>{{ navItems.find((item) => item.key === activeModule)?.title }}</h1>
        </div>
        <div class="current-product-pill">
          <i class="fas fa-box-open"></i>
          <div>
            <span>当前商品</span>
            <strong>{{ selectedProduct.name }} · {{ currentScenario }}</strong>
          </div>
        </div>
      </header>

      <section v-if="activeModule === 'practice'" class="module-panel practice-panel">
        <div class="panel-title">
          <div>
            <h2>直播陪练</h2>
            <p>选择场景后直接开始回答弹幕，系统给出即时建议。</p>
          </div>
          <div class="scenario-tabs">
            <button
              v-for="scene in scenarios"
              :key="scene.name"
              :class="{ active: currentScenario === scene.name }"
              @click="currentScenario = scene.name"
            >
              {{ scene.name }}
            </button>
          </div>
        </div>

        <article class="script-product-card practice-product-selector">
          <div class="panel-subtitle">
            <h3>选择训练商品</h3>
            <span>{{ selectedProduct.category }} · {{ selectedProduct.price }}</span>
          </div>
          <div class="script-product-list">
            <button
              v-for="product in productLibrary"
              :key="product.id"
              :class="{ active: productMode === 'library' && selectedProductId === product.id }"
              @click="chooseProduct(product.id)"
            >
              <strong>{{ product.name }}</strong>
              <span>{{ product.sellingPoints.slice(0, 2).join(" / ") }}</span>
            </button>
          </div>
        </article>

        <div class="practice-grid">
          <article class="live-room-card">
            <div class="live-header">
              <span class="live-dot"></span>
              模拟直播间 · {{ selectedProduct.name }}
              <em>在线弹幕 128</em>
            </div>
            <div class="live-stage">
              <div class="anchor-avatar">主播</div>
              <div class="product-floating">
                <strong>{{ selectedProduct.name }}</strong>
                <span>{{ selectedProduct.price }}</span>
              </div>
              <div class="barrage-list">
                <span v-for="question in liveQuestions" :key="question">{{ question }}</span>
              </div>
            </div>
            <div class="reply-box">
              <textarea
                v-model="replyText"
                rows="4"
                placeholder="输入主播回复，例如：这款商品适合通勤和户外场景，核心优势是……"
              ></textarea>
              <div class="reply-actions">
                <button class="voice-btn"><i class="fas fa-microphone"></i> 语音回复</button>
                <button class="send-btn" @click="submitReply"><i class="fas fa-paper-plane"></i> 提交回答</button>
              </div>
            </div>
          </article>

          <article class="dialogue-card">
            <div class="panel-subtitle">
              <h3>对话与即时反馈</h3>
              <span>本轮已记录 {{ practiceDialog.length }} 条</span>
            </div>
            <div class="dialogue-list">
              <div
                v-for="message in practiceDialog"
                :key="message.text"
                :class="['dialogue-item', message.role]"
              >
                <div>
                  <strong>{{ message.name }}</strong>
                  <span>{{ message.tag }}</span>
                </div>
                <p>{{ message.text }}</p>
              </div>
            </div>
          </article>

          <article class="coach-suggestion-card">
            <div class="panel-subtitle">
              <h3>本轮建议</h3>
              <button @click="setModule('script')">生成话术</button>
            </div>
            <p>
              重点覆盖
              <strong>{{ selectedProduct.keywords.slice(0, 3).join("、") }}</strong>
              ，回答时按“先共情 → 给证据 → 承接福利”的顺序表达。
            </p>
          </article>
        </div>
      </section>

      <section v-else-if="activeModule === 'script'" class="module-panel script-panel">
        <div class="panel-title">
          <div>
            <h2>话术生成</h2>
            <p>{{ lastGeneratedAt }}，围绕当前商品生成可直接使用的直播口播稿。</p>
          </div>
          <button class="primary-action compact" @click="generateScript">重新生成</button>
        </div>

        <div class="script-layout">
          <article v-for="block in scriptBlocks" :key="block.title" class="script-card">
            <div>
              <span>{{ block.badge }}</span>
              <h3>{{ block.title }}</h3>
            </div>
            <p>{{ block.text }}</p>
            <button><i class="fas fa-copy"></i> 复制话术</button>
          </article>
        </div>

        <article class="script-chat-card">
          <div class="panel-subtitle">
            <h3>自然语言生成指定话术</h3>
            <span>例如：处理价格异议 / 福利催单 / 开场欢迎</span>
          </div>
          <textarea
            v-model="scriptPrompt"
            rows="4"
            placeholder="直接输入你想要的话术要求，例如：帮我生成一段适合宝妈人群的福利催单话术。"
          ></textarea>
          <div class="script-chat-actions">
            <button class="voice-btn" @click="scriptPrompt = '帮我生成一段直播开场话术，突出商品卖点和本场福利。'">
              套用示例
            </button>
            <button class="send-btn" @click="generateScript">
              <i class="fas fa-wand-magic-sparkles"></i>
              生成指定话术
            </button>
          </div>
          <p v-if="generatedScriptReply" class="script-ai-reply">{{ generatedScriptReply }}</p>
        </article>
      </section>

      <section v-else-if="activeModule === 'report'" class="module-panel report-panel">
        <div class="panel-title">
          <div>
            <h2>陪练报告</h2>
            <p>查看本轮训练评分、关键词命中和改进依据，可导出 PDF。</p>
          </div>
          <button class="primary-action compact" @click="exportReport"><i class="fas fa-file-pdf"></i> 导出 PDF</button>
        </div>

        <div class="report-overview">
          <article class="total-score-card">
            <span>综合训练总分</span>
            <strong>85.2</strong>
            <p>高于组织平均分 9.4 分</p>
          </article>
          <article class="radar-card">
            <h3>能力雷达图</h3>
            <div class="radar-visual">
              <div class="radar-shape"></div>
              <span>清晰度</span>
              <span>流畅度</span>
              <span>专业力</span>
              <span>异议处理</span>
              <span>转化</span>
            </div>
            <p>蓝色区域为当前主播表现，虚线参考组织平均水平。</p>
          </article>
          <article class="keyword-report-card">
            <h3>商品关键词命中</h3>
            <strong>{{ keywordStats.hitRate }}%</strong>
            <div class="keyword-columns">
              <div>
                <span>已命中</span>
                <em v-for="item in keywordStats.hits" :key="item">{{ item }}</em>
              </div>
              <div>
                <span>未命中</span>
                <em v-for="item in keywordStats.missed" :key="item">{{ item }}</em>
              </div>
            </div>
          </article>
        </div>

        <div class="score-table">
          <div class="score-row score-head">
            <span>评价维度</span>
            <span>本次得分</span>
            <span>组织均值</span>
            <span>评分依据</span>
          </div>
          <div v-for="item in reportScores" :key="item.label" class="score-row">
            <strong>{{ item.label }}</strong>
            <span class="score-value">{{ item.score }}</span>
            <span>{{ item.average }}</span>
            <p>{{ item.basis }}</p>
          </div>
        </div>
      </section>

      <section v-else class="module-panel settings-panel">
        <div class="panel-title">
          <div>
            <h2>陪练配置</h2>
            <p>先选商品和场景，再进入直播陪练。</p>
          </div>
          <button class="primary-action compact" @click="setModule('practice')">开始陪练</button>
        </div>

        <div class="settings-grid">
          <article class="config-card">
            <div class="panel-subtitle">
              <h3>选择商品库商品</h3>
              <span>自动关联基础信息</span>
            </div>
            <div class="product-choice-list">
              <button
                v-for="product in productLibrary"
                :key="product.id"
                :class="{ active: productMode === 'library' && selectedProductId === product.id }"
                @click="chooseProduct(product.id)"
              >
                <strong>{{ product.name }}</strong>
                <span>{{ product.category }} · {{ product.price }}</span>
                <em>{{ product.sellingPoints.slice(0, 3).join(" / ") }}</em>
              </button>
            </div>
          </article>

          <article class="config-card">
            <div class="panel-subtitle">
              <h3>自定义商品信息</h3>
              <button @click="productMode = 'custom'">使用自定义</button>
            </div>
            <div class="form-grid">
              <label>
                商品名称
                <input v-model="customProduct.name" />
              </label>
              <label>
                商品类目
                <input v-model="customProduct.category" />
              </label>
              <label>
                直播价格/权益
                <input v-model="customProduct.price" />
              </label>
              <label>
                品牌风格
                <select v-model="brandStyle">
                  <option>专业可信 · 亲和讲解</option>
                  <option>活泼种草 · 强互动</option>
                  <option>理性测评 · 数据证明</option>
                </select>
              </label>
            </div>
          </article>

          <article class="config-card wide">
            <div class="panel-subtitle">
              <h3>练习信息确认</h3>
              <span>当前生效配置</span>
            </div>
            <div class="config-summary">
              <div>
                <span>商品卖点</span>
                <em v-for="point in selectedProduct.sellingPoints" :key="point">{{ point }}</em>
              </div>
              <div>
                <span>营销活动</span>
                <em v-for="tag in selectedProduct.campaignTags" :key="tag">{{ tag }}</em>
              </div>
              <div>
                <span>目标客群</span>
                <em v-for="persona in selectedProduct.personas" :key="persona">{{ persona }}</em>
              </div>
              <div>
                <span>训练场景</span>
                <button
                  v-for="scene in scenarios"
                  :key="scene.name"
                  :class="{ active: currentScenario === scene.name }"
                  @click="currentScenario = scene.name"
                >
                  {{ scene.name }}
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

    </section>
  </main>
</template>

<style scoped>
.practice-workbench {
  display: grid;
  grid-template-columns: 290px minmax(0, 1fr);
  min-height: 100vh;
  color: #0f1f38;
  background:
    radial-gradient(circle at 78% 0%, rgba(20, 184, 255, 0.16), transparent 30%),
    linear-gradient(135deg, #f4f8ff 0%, #eef5ff 46%, #f8fbff 100%);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}

.system-sidebar {
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 28px 20px;
  color: #fff;
  background:
    radial-gradient(circle at 20% 0%, rgba(22, 163, 255, 0.35), transparent 28%),
    linear-gradient(180deg, #061b36 0%, #08264c 100%);
}

.system-brand {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 28px;
}

.brand-icon {
  display: grid;
  width: 48px;
  height: 48px;
  place-items: center;
  border-radius: 14px;
  background: linear-gradient(135deg, #1088ff, #16d5ff);
  box-shadow: 0 18px 36px rgba(22, 163, 255, 0.3);
  font-size: 20px;
}

.system-brand strong,
.system-brand span {
  display: block;
}

.system-brand strong {
  font-size: 20px;
}

.system-brand span {
  margin-top: 5px;
  color: #9fc5ff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.system-nav {
  display: grid;
  gap: 12px;
}

.system-nav button {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 14px;
  text-align: left;
  color: #b8c9df;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  cursor: pointer;
}

.system-nav button.active {
  color: #fff;
  border-color: rgba(51, 171, 255, 0.55);
  background: rgba(24, 117, 255, 0.24);
  box-shadow: inset 4px 0 0 #16d5ff;
}

.system-nav i {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.1);
  color: #7dd3fc;
}

.system-nav button.active i {
  color: #fff;
  background: linear-gradient(135deg, #1088ff, #16d5ff);
}

.system-nav strong,
.system-nav em {
  display: block;
}

.system-nav strong {
  font-size: 16px;
}

.system-nav em {
  margin-top: 4px;
  color: inherit;
  font-size: 12px;
  font-style: normal;
  opacity: 0.78;
}

.side-status {
  margin-top: 28px;
  padding: 18px;
  border: 1px solid rgba(125, 211, 252, 0.28);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.08);
}

.side-status span,
.side-status strong,
.side-status p {
  display: block;
}

.side-status span {
  color: #9fc5ff;
  font-size: 12px;
  font-weight: 900;
}

.side-status strong {
  margin-top: 8px;
  font-size: 22px;
}

.side-status p {
  margin: 8px 0 0;
  color: #c7d7ee;
  line-height: 1.6;
}

.system-main {
  min-width: 0;
  padding: 28px;
}

.system-topbar,
.context-strip,
.module-panel {
  border: 1px solid #d8e6f7;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 20px 56px rgba(18, 67, 126, 0.08);
}

.system-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
  padding: 28px 30px;
}

.system-topbar span {
  color: #0f68ff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.18em;
}

.system-topbar h1 {
  margin: 8px 0 0;
  font-size: 34px;
}

.top-actions,
.reply-actions,
.panel-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.primary-action,
.ghost-action,
.send-btn,
.voice-btn,
.primary-action.compact,
.script-card button,
.advice-card button,
.panel-subtitle button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 42px;
  padding: 0 18px;
  border-radius: 12px;
  font-weight: 900;
  cursor: pointer;
}

.primary-action,
.send-btn,
.primary-action.compact {
  color: #fff;
  border: 0;
  background: linear-gradient(135deg, #116dff, #16b8f3);
  box-shadow: 0 14px 28px rgba(17, 109, 255, 0.22);
}

.ghost-action,
.voice-btn,
.panel-subtitle button,
.script-card button,
.advice-card button {
  color: #116dff;
  border: 1px solid #b9d7ff;
  background: #f4f8ff;
}

.context-strip {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
  padding: 16px;
}

.context-strip article {
  padding: 16px;
  border-radius: 18px;
  background: linear-gradient(135deg, #f7fbff, #eef6ff);
}

.context-strip span,
.context-strip strong {
  display: block;
}

.context-strip span {
  color: #68809f;
  font-size: 12px;
  font-weight: 900;
}

.context-strip strong {
  margin-top: 8px;
  font-size: 20px;
}

.context-strip p {
  margin: 7px 0 0;
  color: #60728d;
  line-height: 1.5;
}

.module-panel {
  margin-top: 18px;
  padding: 24px;
}

.panel-title,
.panel-subtitle {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 18px;
}

.panel-title h2,
.panel-subtitle h3 {
  margin: 0;
}

.panel-title h2 {
  font-size: 26px;
}

.panel-title p,
.panel-subtitle p {
  margin: 9px 0 0;
  color: #62738e;
  line-height: 1.75;
}

.scenario-tabs {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
}

.scenario-tabs button {
  padding: 10px 12px;
  color: #4f647f;
  border: 1px solid #d8e6f7;
  border-radius: 999px;
  background: #fff;
  font-weight: 900;
  cursor: pointer;
}

.scenario-tabs button.active {
  color: #fff;
  border-color: transparent;
  background: #116dff;
}

.practice-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  gap: 18px;
  margin-top: 22px;
}

.live-room-card,
.dialogue-card,
.coach-suggestion-card,
.script-card,
.polish-card,
.total-score-card,
.radar-card,
.keyword-report-card,
.timeline-card,
.advice-card,
.config-card {
  border: 1px solid #d8e6f7;
  border-radius: 20px;
  background: #fff;
}

.live-room-card {
  overflow: hidden;
}

.live-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  color: #fff;
  background: linear-gradient(135deg, #08264c, #0f68ff);
  font-weight: 900;
}

.live-header em {
  margin-left: auto;
  font-style: normal;
  color: #a7d8ff;
}

.live-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 5px rgba(34, 197, 94, 0.2);
}

.live-stage {
  position: relative;
  min-height: 310px;
  overflow: hidden;
  background:
    linear-gradient(rgba(6, 27, 54, 0.24), rgba(6, 27, 54, 0.5)),
    url("/static/images/apps/app-sales-coach.png") center / cover;
}

.anchor-avatar {
  position: absolute;
  left: 24px;
  bottom: 24px;
  display: grid;
  width: 82px;
  height: 82px;
  place-items: center;
  color: #fff;
  border: 4px solid rgba(255, 255, 255, 0.68);
  border-radius: 50%;
  background: linear-gradient(135deg, #16b8f3, #116dff);
  font-size: 18px;
  font-weight: 900;
}

.product-floating {
  position: absolute;
  right: 20px;
  bottom: 24px;
  min-width: 180px;
  padding: 15px;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.24);
  border-radius: 16px;
  background: rgba(6, 27, 54, 0.75);
  backdrop-filter: blur(10px);
}

.product-floating strong,
.product-floating span {
  display: block;
}

.product-floating span {
  margin-top: 5px;
  color: #9eeaff;
}

.barrage-list {
  position: absolute;
  top: 20px;
  right: 20px;
  left: 20px;
  display: grid;
  gap: 10px;
  justify-items: end;
}

.barrage-list span {
  width: max-content;
  max-width: 72%;
  padding: 9px 12px;
  color: #0f68ff;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  font-weight: 900;
}

.reply-box {
  display: grid;
  gap: 12px;
  padding: 18px;
}

.reply-box textarea,
.form-grid input,
.form-grid select {
  width: 100%;
  border: 1px solid #d8e6f7;
  border-radius: 14px;
  background: #f8fbff;
  color: #0f1f38;
  font: inherit;
}

.reply-box textarea {
  resize: vertical;
  padding: 14px;
  line-height: 1.7;
}

.dialogue-card {
  display: grid;
  grid-template-rows: auto minmax(0, 1fr);
  min-height: 460px;
  padding: 18px;
}

.dialogue-list {
  display: grid;
  align-content: start;
  gap: 12px;
  margin-top: 16px;
  overflow: auto;
}

.dialogue-item {
  padding: 14px 16px;
  border-radius: 16px;
  background: #f4f8ff;
}

.dialogue-item.anchor {
  margin-left: 36px;
  color: #fff;
  background: linear-gradient(135deg, #116dff, #16b8f3);
}

.dialogue-item.coach {
  border: 1px solid #f6d7a6;
  background: #fff8ed;
}

.dialogue-item div {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.dialogue-item span {
  font-size: 12px;
  font-weight: 900;
  opacity: 0.75;
}

.dialogue-item p {
  margin: 8px 0 0;
  line-height: 1.7;
}

.coach-suggestion-card {
  grid-column: 1 / -1;
  padding: 18px;
  background:
    radial-gradient(circle at 95% 0%, rgba(22, 213, 255, 0.18), transparent 28%),
    #fff;
}

.coach-suggestion-card p {
  color: #4f647f;
  line-height: 1.8;
}

.tip-list,
.polish-tags,
.config-summary div {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tip-list span,
.polish-tags span,
.config-summary em,
.config-summary button {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 10px;
  color: #116dff;
  border: 1px solid #d9e9ff;
  border-radius: 999px;
  background: #f4f8ff;
  font-size: 13px;
  font-weight: 900;
  font-style: normal;
}

.script-source-grid,
.report-overview,
.settings-grid {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.script-product-card,
.script-chat-card {
  padding: 20px;
  border: 1px solid #dbeafe;
  border-radius: 24px;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 184, 243, 0.12), transparent 30%),
    #fff;
  box-shadow: 0 16px 40px rgba(24, 75, 135, 0.055);
}

.practice-product-selector {
  margin: 20px 0 18px;
}

.practice-product-selector .script-product-list {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.script-panel > .script-chat-card {
  margin-top: 18px;
}

.script-product-list {
  display: grid;
  gap: 10px;
  margin-top: 16px;
}

.script-product-list button {
  display: grid;
  gap: 6px;
  padding: 14px;
  text-align: left;
  border: 1px solid #d8e6f7;
  border-radius: 16px;
  background: #f8fbff;
  cursor: pointer;
  transition: 0.2s ease;
}

.script-product-list button:hover,
.script-product-list button.active {
  border-color: #116dff;
  background: #edf6ff;
  box-shadow: inset 4px 0 0 #116dff;
}

.script-product-list strong,
.script-product-list span {
  display: block;
}

.script-product-list span {
  color: #62738e;
  font-size: 13px;
  line-height: 1.5;
}

.script-chat-card textarea {
  width: 100%;
  margin-top: 16px;
  padding: 14px;
  resize: vertical;
  border: 1px solid #cfe3ff;
  border-radius: 16px;
  background: #f8fbff;
  color: #0f1f38;
  font: inherit;
  line-height: 1.7;
}

.script-chat-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.script-ai-reply {
  margin: 14px 0 0;
  padding: 14px 16px;
  color: #0f4ab8;
  border: 1px solid #b9d7ff;
  border-radius: 16px;
  background: linear-gradient(135deg, #eef7ff, #fff);
  line-height: 1.7;
  font-weight: 800;
}

.script-source-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.script-source-grid article {
  padding: 18px;
  border-radius: 18px;
  background: #f4f8ff;
}

.script-source-grid span,
.script-source-grid strong {
  display: block;
}

.script-source-grid span {
  color: #68809f;
  font-size: 12px;
  font-weight: 900;
}

.script-source-grid strong {
  margin-top: 8px;
  font-size: 18px;
}

.script-source-grid p {
  margin: 7px 0 0;
  color: #62738e;
  line-height: 1.6;
}

.script-layout {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.script-card {
  display: grid;
  gap: 14px;
  padding: 20px;
}

.script-card span {
  color: #0f68ff;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0.12em;
}

.script-card h3 {
  margin: 8px 0 0;
  font-size: 22px;
}

.script-card p,
.polish-card p,
.advice-card p,
.timeline-card p {
  margin: 0;
  color: #536985;
  line-height: 1.8;
}

.script-card button {
  width: max-content;
}

.polish-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 18px;
  align-items: center;
  margin-top: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #f4f8ff, #fff);
}

.report-overview {
  grid-template-columns: 220px minmax(0, 1fr) 320px;
}

.total-score-card,
.radar-card,
.keyword-report-card,
.timeline-card,
.advice-card,
.config-card {
  padding: 20px;
}

.total-score-card {
  display: grid;
  align-content: center;
  min-height: 260px;
  color: #fff;
  background: linear-gradient(135deg, #08264c, #116dff);
}

.total-score-card span,
.total-score-card p {
  color: #b9e8ff;
}

.total-score-card strong {
  display: block;
  margin: 12px 0;
  font-size: 58px;
}

.radar-card h3,
.keyword-report-card h3,
.timeline-card h3,
.advice-card h3 {
  margin: 0 0 14px;
  font-size: 20px;
}

.radar-visual {
  position: relative;
  height: 210px;
  border: 1px solid #d8e6f7;
  border-radius: 18px;
  background:
    radial-gradient(circle, transparent 18%, rgba(17, 109, 255, 0.1) 19%, transparent 20%),
    radial-gradient(circle, transparent 38%, rgba(17, 109, 255, 0.1) 39%, transparent 40%),
    radial-gradient(circle, transparent 58%, rgba(17, 109, 255, 0.1) 59%, transparent 60%),
    #f8fbff;
}

.radar-shape {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 128px;
  height: 120px;
  transform: translate(-50%, -50%);
  background: rgba(17, 109, 255, 0.24);
  border: 2px solid #116dff;
  clip-path: polygon(50% 0, 100% 38%, 82% 100%, 22% 88%, 0 34%);
}

.radar-visual span {
  position: absolute;
  color: #4f647f;
  font-size: 12px;
  font-weight: 900;
}

.radar-visual span:nth-of-type(1) {
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
}

.radar-visual span:nth-of-type(2) {
  right: 26px;
  top: 72px;
}

.radar-visual span:nth-of-type(3) {
  right: 52px;
  bottom: 18px;
}

.radar-visual span:nth-of-type(4) {
  left: 34px;
  bottom: 18px;
}

.radar-visual span:nth-of-type(5) {
  left: 26px;
  top: 72px;
}

.radar-card > p {
  margin-top: 12px;
}

.keyword-report-card strong {
  display: block;
  margin: 10px 0 14px;
  font-size: 42px;
  color: #116dff;
}

.keyword-columns {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.keyword-columns div {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-content: flex-start;
  padding: 12px;
  border-radius: 14px;
  background: #f4f8ff;
}

.keyword-columns span {
  width: 100%;
  color: #68809f;
  font-size: 12px;
  font-weight: 900;
}

.keyword-columns em {
  padding: 6px 8px;
  border-radius: 999px;
  background: #fff;
  color: #0f68ff;
  font-size: 12px;
  font-style: normal;
  font-weight: 900;
}

.score-table {
  margin-top: 16px;
  overflow: hidden;
  border: 1px solid #d8e6f7;
  border-radius: 18px;
}

.score-row {
  display: grid;
  grid-template-columns: 150px 100px 100px minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #e7effa;
}

.score-row:last-child {
  border-bottom: 0;
}

.score-head {
  color: #68809f;
  background: #f4f8ff;
  font-size: 13px;
  font-weight: 900;
}

.score-row p {
  margin: 0;
  color: #536985;
  line-height: 1.6;
}

.score-value {
  color: #116dff;
  font-size: 20px;
  font-weight: 900;
}

.report-bottom-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 16px;
  margin-top: 16px;
}

.timeline-item {
  display: grid;
  grid-template-columns: 34px minmax(0, 1fr);
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #e7effa;
}

.timeline-item:last-child {
  border-bottom: 0;
}

.timeline-item i {
  display: grid;
  width: 30px;
  height: 30px;
  place-items: center;
  color: #fff;
  border-radius: 50%;
  background: #116dff;
}

.advice-card {
  display: grid;
  align-content: center;
  gap: 18px;
  background: linear-gradient(135deg, #f4f8ff, #fff);
}

.advice-card button {
  width: max-content;
}

.settings-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.config-card.wide {
  grid-column: 1 / -1;
}

.product-choice-list {
  display: grid;
  gap: 12px;
  margin-top: 16px;
}

.product-choice-list button {
  display: grid;
  gap: 7px;
  padding: 15px;
  text-align: left;
  border: 1px solid #d8e6f7;
  border-radius: 16px;
  background: #f8fbff;
  cursor: pointer;
}

.product-choice-list button.active {
  border-color: #116dff;
  background: #edf6ff;
  box-shadow: inset 4px 0 0 #116dff;
}

.product-choice-list strong,
.product-choice-list span,
.product-choice-list em {
  display: block;
}

.product-choice-list span,
.product-choice-list em {
  color: #62738e;
  font-style: normal;
  line-height: 1.5;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.form-grid label {
  display: grid;
  gap: 8px;
  color: #536985;
  font-size: 13px;
  font-weight: 900;
}

.form-grid input,
.form-grid select {
  height: 44px;
  padding: 0 12px;
}

.config-summary {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.config-summary div {
  align-content: flex-start;
  padding: 16px;
  border-radius: 16px;
  background: #f8fbff;
}

.config-summary span {
  display: block;
  width: 100%;
  margin-bottom: 4px;
  color: #68809f;
  font-size: 12px;
  font-weight: 900;
}

.config-summary button.active {
  color: #fff;
  background: #116dff;
}

/* visual polish: make the user-side system feel like a real product console */
.practice-workbench {
  grid-template-columns: 276px minmax(0, 1fr);
  background:
    linear-gradient(rgba(21, 111, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(21, 111, 255, 0.035) 1px, transparent 1px),
    radial-gradient(circle at 76% 10%, rgba(22, 213, 255, 0.18), transparent 34%),
    radial-gradient(circle at 8% 86%, rgba(40, 104, 255, 0.14), transparent 30%),
    #f7fbff;
  background-size: 36px 36px, 36px 36px, auto, auto, auto;
}

.system-sidebar {
  background:
    radial-gradient(circle at 20% -8%, rgba(73, 205, 255, 0.3), transparent 28%),
    linear-gradient(180deg, #061a34 0%, #082342 48%, #06172d 100%);
  border-right: 1px solid rgba(126, 189, 255, 0.16);
  box-shadow: 20px 0 60px rgba(10, 38, 80, 0.18);
}

.system-sidebar::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 28px 28px;
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.55), transparent);
}

.system-brand,
.system-nav,
.side-status {
  position: relative;
  z-index: 1;
}

.brand-icon {
  border: 1px solid rgba(255, 255, 255, 0.24);
  background: linear-gradient(135deg, #2087ff 0%, #14d8ff 100%);
}

.system-nav button {
  border-radius: 18px;
  transition: 0.2s ease;
}

.system-nav button:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.system-nav button.active {
  border-color: rgba(103, 196, 255, 0.5);
  background: linear-gradient(135deg, rgba(18, 111, 255, 0.34), rgba(20, 216, 255, 0.12));
  box-shadow: 0 18px 34px rgba(6, 27, 54, 0.22), inset 0 0 0 1px rgba(255, 255, 255, 0.08);
}

.side-status {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.04));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.system-main {
  max-width: 1360px;
  margin: 0 auto;
}

.system-topbar {
  position: relative;
  overflow: hidden;
  padding: 30px 32px;
  border: 1px solid rgba(185, 215, 255, 0.9);
  background:
    radial-gradient(circle at 86% 0%, rgba(22, 184, 243, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(243, 249, 255, 0.92));
}

.system-topbar::before {
  content: "";
  position: absolute;
  inset: auto 32px 0 32px;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, #116dff, #16d5ff, transparent);
}

.system-topbar h1 {
  font-size: clamp(30px, 3vw, 44px);
  letter-spacing: -0.04em;
}

.top-actions {
  position: relative;
  z-index: 1;
}

.current-product-pill {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-width: 260px;
  padding: 12px 16px;
  border: 1px solid #c7defd;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: 0 14px 30px rgba(24, 75, 135, 0.08);
}

.current-product-pill i {
  display: grid;
  width: 44px;
  height: 44px;
  place-items: center;
  color: #fff;
  border-radius: 14px;
  background: linear-gradient(135deg, #116dff, #16d5ff);
}

.current-product-pill span,
.current-product-pill strong {
  display: block;
}

.current-product-pill span {
  color: #68809f;
  font-size: 12px;
  font-weight: 900;
  letter-spacing: 0;
}

.current-product-pill strong {
  margin-top: 4px;
  font-size: 15px;
  white-space: nowrap;
}

.primary-action,
.send-btn,
.primary-action.compact {
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: linear-gradient(135deg, #0b72ff 0%, #10bdf5 100%);
  box-shadow: 0 16px 30px rgba(17, 109, 255, 0.26);
}

.ghost-action,
.voice-btn,
.panel-subtitle button,
.script-card button,
.advice-card button {
  border-color: #c7defd;
  background: linear-gradient(135deg, #fff, #eef7ff);
}

.context-strip {
  grid-template-columns: repeat(3, minmax(0, 1fr));
  padding: 10px;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: blur(10px);
}

.context-strip article {
  position: relative;
  overflow: hidden;
  border: 1px solid rgba(216, 230, 247, 0.72);
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 184, 243, 0.16), transparent 28%),
    #fff;
}

.context-strip article::before {
  content: "";
  position: absolute;
  left: 0;
  top: 16px;
  bottom: 16px;
  width: 4px;
  border-radius: 999px;
  background: linear-gradient(#116dff, #16d5ff);
}

.workflow-map {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
  margin-top: 18px;
}

.workflow-map article {
  position: relative;
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  min-height: 108px;
  padding: 18px;
  overflow: hidden;
  border: 1px solid #d8e6f7;
  border-radius: 22px;
  background:
    radial-gradient(circle at 100% 0%, rgba(17, 109, 255, 0.12), transparent 32%),
    rgba(255, 255, 255, 0.88);
  box-shadow: 0 18px 42px rgba(24, 75, 135, 0.06);
  cursor: pointer;
  transition: 0.2s ease;
}

.workflow-map article:hover,
.workflow-map article.active {
  transform: translateY(-2px);
  border-color: #7db9ff;
  box-shadow: 0 22px 52px rgba(24, 93, 183, 0.12);
}

.workflow-map article.active {
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 213, 255, 0.22), transparent 34%),
    linear-gradient(135deg, #eef7ff, #fff);
}

.workflow-map article > span {
  position: absolute;
  right: 18px;
  top: 14px;
  color: rgba(17, 109, 255, 0.16);
  font-size: 32px;
  font-weight: 900;
}

.workflow-map i {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  color: #fff;
  border-radius: 14px;
  background: linear-gradient(135deg, #116dff, #16d5ff);
  box-shadow: 0 14px 26px rgba(17, 109, 255, 0.22);
}

.workflow-map strong,
.workflow-map p {
  display: block;
  margin: 0;
}

.workflow-map strong {
  font-size: 17px;
}

.workflow-map p {
  margin-top: 6px;
  color: #637a96;
  font-size: 13px;
  line-height: 1.5;
}

.module-panel {
  border-radius: 26px;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 184, 243, 0.1), transparent 26%),
    rgba(255, 255, 255, 0.92);
}

.panel-title {
  padding-bottom: 18px;
  border-bottom: 1px solid #e7effa;
}

.panel-title h2 {
  letter-spacing: -0.03em;
}

.scenario-tabs {
  max-width: 520px;
}

.scenario-tabs button,
.product-choice-list button,
.config-summary button,
.script-card,
.dialogue-card,
.live-room-card,
.coach-suggestion-card,
.polish-card,
.radar-card,
.keyword-report-card,
.timeline-card,
.advice-card,
.config-card {
  transition: 0.2s ease;
}

.script-card:hover,
.dialogue-card:hover,
.live-room-card:hover,
.coach-suggestion-card:hover,
.polish-card:hover,
.radar-card:hover,
.keyword-report-card:hover,
.timeline-card:hover,
.advice-card:hover,
.config-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 24px 54px rgba(24, 75, 135, 0.09);
}

.live-room-card,
.dialogue-card,
.coach-suggestion-card,
.script-card,
.polish-card,
.total-score-card,
.radar-card,
.keyword-report-card,
.timeline-card,
.advice-card,
.config-card {
  border-color: #dbeafe;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(24, 75, 135, 0.055);
}

.live-header {
  background:
    linear-gradient(90deg, rgba(255, 255, 255, 0.08), transparent),
    linear-gradient(135deg, #08264c 0%, #0d62e6 100%);
}

.live-stage {
  min-height: 330px;
  background:
    linear-gradient(135deg, rgba(7, 28, 57, 0.36), rgba(6, 45, 91, 0.54)),
    url("/static/images/apps/app-sales-coach.png") center / cover;
}

.live-stage::after {
  content: "";
  position: absolute;
  inset: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  border-radius: 24px;
  pointer-events: none;
}

.anchor-avatar {
  box-shadow: 0 16px 30px rgba(17, 109, 255, 0.3);
}

.product-floating,
.barrage-list span {
  backdrop-filter: blur(14px);
}

.barrage-list span {
  border: 1px solid rgba(255, 255, 255, 0.55);
  box-shadow: 0 12px 24px rgba(6, 27, 54, 0.08);
}

.reply-box textarea {
  min-height: 112px;
  border-color: #cfe3ff;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.dialogue-card {
  background:
    linear-gradient(180deg, #fff, #f8fbff);
}

.dialogue-item {
  border: 1px solid rgba(216, 230, 247, 0.88);
}

.dialogue-item.anchor {
  box-shadow: 0 14px 28px rgba(17, 109, 255, 0.16);
}

.coach-suggestion-card {
  border-color: #b9e8ff;
  background:
    radial-gradient(circle at 96% 0%, rgba(22, 213, 255, 0.22), transparent 26%),
    linear-gradient(135deg, #f6fbff, #fff);
}

.tip-list span,
.polish-tags span,
.config-summary em,
.config-summary button {
  border-color: #d9e9ff;
  background: rgba(244, 248, 255, 0.88);
}

.script-source-grid article,
.product-choice-list button,
.config-summary div {
  border: 1px solid #dbeafe;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 184, 243, 0.1), transparent 30%),
    #fff;
  box-shadow: 0 14px 34px rgba(24, 75, 135, 0.05);
}

.script-card {
  position: relative;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(17, 109, 255, 0.04), transparent),
    #fff;
}

.script-card::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 5px;
  height: 100%;
  background: linear-gradient(#116dff, #16d5ff);
}

.polish-card {
  border-color: #b9e8ff;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 213, 255, 0.18), transparent 28%),
    linear-gradient(135deg, #f7fbff, #fff);
}

.total-score-card {
  overflow: hidden;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 213, 255, 0.36), transparent 35%),
    linear-gradient(135deg, #061b36 0%, #0d62e6 100%);
}

.total-score-card::after {
  content: "";
  position: absolute;
}

.radar-visual {
  background:
    radial-gradient(circle, transparent 18%, rgba(17, 109, 255, 0.08) 19%, transparent 20%),
    radial-gradient(circle, transparent 38%, rgba(17, 109, 255, 0.08) 39%, transparent 40%),
    radial-gradient(circle, transparent 58%, rgba(17, 109, 255, 0.08) 59%, transparent 60%),
    linear-gradient(135deg, #fff, #f4f9ff);
}

.score-table {
  background: #fff;
  box-shadow: 0 16px 40px rgba(24, 75, 135, 0.055);
}

.score-head {
  background: linear-gradient(135deg, #f4f8ff, #edf6ff);
}

.product-choice-list button:hover {
  border-color: #7db9ff;
  transform: translateY(-1px);
}

.product-choice-list button.active {
  border-color: #116dff;
  background:
    radial-gradient(circle at 100% 0%, rgba(22, 213, 255, 0.16), transparent 30%),
    #edf6ff;
}

.form-grid input,
.form-grid select {
  border-color: #cfe3ff;
  background: #fff;
}

.workflow-map {
  display: none !important;
}

@media (max-width: 1180px) {
  .practice-workbench {
    grid-template-columns: 250px minmax(0, 1fr);
  }

  .system-sidebar {
    padding: 24px 14px;
  }

  .practice-grid,
  .report-bottom-grid,
  .polish-card {
    grid-template-columns: 1fr;
  }

  .report-overview {
    grid-template-columns: 1fr 1fr;
  }

  .total-score-card {
    grid-column: 1 / -1;
    min-height: 180px;
  }

  .config-summary {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .workflow-map {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 860px) {
  .practice-workbench {
    grid-template-columns: 1fr;
  }

  .system-sidebar {
    position: static;
    height: auto;
  }

  .system-nav {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .system-main {
    padding: 16px;
  }

  .system-topbar,
  .panel-title {
    display: grid;
  }

  .context-strip,
  .workflow-map,
  .script-source-grid,
  .script-layout,
  .practice-product-selector .script-product-list,
  .settings-grid,
  .report-overview {
    grid-template-columns: 1fr;
  }

  .score-row {
    grid-template-columns: 1fr;
  }

  .score-head {
    display: none;
  }
}

@media (max-width: 560px) {
  .system-nav {
    grid-template-columns: 1fr;
  }

  .top-actions,
  .reply-actions,
  .scenario-tabs,
  .config-summary {
    display: grid;
    grid-template-columns: 1fr;
  }

  .module-panel {
    padding: 16px;
  }

  .system-topbar h1 {
    font-size: 28px;
  }

  .live-stage {
    min-height: 360px;
  }

  .barrage-list span {
    max-width: 100%;
  }
}
</style>
