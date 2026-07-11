<script setup lang="ts">
import { computed, ref } from "vue";

const activeTask = ref(0);
const selectedScene = ref("直播讲解");

const tasks = [
  { status: "进行中", title: "夏季防晒衣练播", time: "18:26", grade: "A-", score: 86 },
  { status: "评分中", title: "便携榨汁杯异议处理", time: "12:04", grade: "待评", score: 72 },
  { status: "已完成", title: "智能筋膜枪福利讲解", time: "21:18", grade: "B+", score: 81 },
];

const products = [
  { label: "冰感防晒衣", value: "UPF50+ 防晒、轻薄透气、三色可选" },
  { label: "活动权益", value: "限时 79 元、前 300 名赠冰袖、满 2 件包邮" },
  { label: "目标人群", value: "通勤白领、宝妈、户外运动用户" },
];

const scenes = ["直播讲解", "价格异议", "成分追问", "福利催单"];

const messages = [
  {
    role: "ai",
    name: "AI 客户弹幕",
    text: "主播，这件防晒衣真的能防晒吗？夏天穿会不会闷？",
    tag: "产品可信度",
  },
  {
    role: "user",
    name: "主播回答",
    text: "这款是 UPF50+ 的冰感防晒衣，面料很轻薄，通勤和户外都可以穿，现在还有限时福利。",
    tag: "卖点覆盖 3/4",
  },
  {
    role: "coach",
    name: "AI 即时纠错",
    text: "建议补充检测标准和适用场景，例如“有防晒检测报告，骑车、遛娃、爬山都能覆盖”。",
    tag: "表达优化",
  },
  {
    role: "ai",
    name: "AI 客户弹幕",
    text: "我担心买回来显胖，有没有更显瘦的颜色？",
    tag: "外观异议",
  },
];

const keywords = [
  { label: "UPF50+", hit: true },
  { label: "冰感", hit: true },
  { label: "检测报告", hit: false },
  { label: "限时福利", hit: true },
  { label: "显瘦版型", hit: false },
];

const metrics = [
  { label: "卖点讲解", value: 88 },
  { label: "观众互动", value: 82 },
  { label: "表达流畅", value: 91 },
  { label: "合规控制", value: 94 },
  { label: "转化话术", value: 79 },
];

const history = [
  "完成 3 轮价格异议追问",
  "触发 2 条高风险绝对化用语提醒",
  "生成 1 份训练评测报告",
];

const currentTask = computed(() => tasks[activeTask.value]);
</script>

<template>
  <main class="practice-workbench">
    <header class="topbar">
      <div class="brand">
        <div class="brand-icon"><i class="fas fa-headset"></i></div>
        <div>
          <strong>电商陪练系统</strong>
          <span>直播电商数字员工 · AI 训练工作台</span>
        </div>
      </div>
      <nav class="top-tabs" aria-label="工作台导航">
        <button class="active">陪练对话</button>
        <button>练习列表</button>
        <button>评测报告</button>
        <button>学习助教</button>
      </nav>
      <div class="top-actions">
        <button title="搜索"><i class="fas fa-search"></i></button>
        <button class="notice" title="通知"><i class="fas fa-bell"></i></button>
        <div class="user-pill"><span>林</span><strong>林小满</strong></div>
      </div>
    </header>

    <section class="workbench-grid">
      <aside class="task-panel">
        <section class="panel block">
          <div class="panel-title">
            <h2>练习任务</h2>
            <button><i class="fas fa-plus"></i></button>
          </div>
          <div class="task-list">
            <button
              v-for="(task, index) in tasks"
              :key="task.title"
              :class="{ active: activeTask === index }"
              @click="activeTask = index"
            >
              <span class="task-status">{{ task.status }}</span>
              <strong>{{ task.title }}</strong>
              <em>{{ task.time }} · {{ task.grade }}</em>
            </button>
          </div>
        </section>

        <section class="panel product-panel">
          <div class="panel-title">
            <h2>商品与场景</h2>
            <span>{{ currentTask.status }}</span>
          </div>
          <div class="product-card">
            <div class="product-cover">
              <img src="/static/images/apps/app-sales-coach.png" alt="电商陪练商品演示" />
            </div>
            <div class="product-info" v-for="item in products" :key="item.label">
              <span>{{ item.label }}</span>
              <strong>{{ item.value }}</strong>
            </div>
          </div>
          <div class="scene-tags">
            <button
              v-for="scene in scenes"
              :key="scene"
              :class="{ active: selectedScene === scene }"
              @click="selectedScene = scene"
            >
              {{ scene }}
            </button>
          </div>
        </section>
      </aside>

      <section class="coach-stage">
        <div class="stage-head">
          <div>
            <span>AI PRACTICE LIVE</span>
            <h1>{{ currentTask.title }}</h1>
          </div>
          <div class="live-state">
            <i class="fas fa-circle"></i>
            陪练进行中 · {{ selectedScene }}
          </div>
        </div>

        <div class="live-preview">
          <div class="anchor-card">
            <div class="avatar">主播</div>
            <div>
              <strong>训练目标</strong>
              <p>在 3 分钟内完整讲清核心卖点，并处理至少 2 类真实客户异议。</p>
            </div>
          </div>
          <div class="bullet-screen">
            <span>防晒指数是多少？</span>
            <span>有没有大码？</span>
            <span>今天下单送什么？</span>
          </div>
        </div>

        <div class="dialogue-panel">
          <article v-for="message in messages" :key="message.text" :class="['message', message.role]">
            <div class="message-meta">
              <strong>{{ message.name }}</strong>
              <span>{{ message.tag }}</span>
            </div>
            <p>{{ message.text }}</p>
          </article>
        </div>

        <div class="input-simulator">
          <button><i class="fas fa-microphone"></i> 语音输入</button>
          <div class="fake-input">继续回答客户关于版型显瘦的问题...</div>
          <button class="send-btn"><i class="fas fa-paper-plane"></i></button>
        </div>

        <section class="suggestion-panel">
          <div>
            <span>推荐话术</span>
            <p>“这款有雾蓝和奶白两个显瘦色，肩线做了微落肩设计，遮肉但不压身高。今天前 300 名还送同色冰袖。”</p>
          </div>
          <button>套用</button>
        </section>
      </section>

      <aside class="score-panel">
        <section class="panel score-card">
          <div class="panel-title">
            <h2>训练评分</h2>
            <span>实时预览</span>
          </div>
          <div class="score-ring">
            <strong>{{ currentTask.score }}</strong>
            <span>综合评分</span>
          </div>
          <div class="metric-list">
            <div v-for="metric in metrics" :key="metric.label" class="metric-row">
              <span>{{ metric.label }}</span>
              <div><i :style="{ width: metric.value + '%' }"></i></div>
              <strong>{{ metric.value }}</strong>
            </div>
          </div>
        </section>

        <section class="panel keyword-card">
          <div class="panel-title">
            <h2>关键词命中</h2>
            <span>3/5</span>
          </div>
          <div class="keyword-list">
            <span v-for="item in keywords" :key="item.label" :class="{ hit: item.hit }">
              <i class="fas" :class="item.hit ? 'fa-check' : 'fa-minus'"></i>
              {{ item.label }}
            </span>
          </div>
        </section>

        <section class="panel radar-card">
          <div class="panel-title">
            <h2>能力雷达</h2>
            <span>组织均值 78</span>
          </div>
          <div class="radar">
            <span>专业力</span>
            <span>互动</span>
            <span>清晰度</span>
            <span>合规</span>
            <span>转化</span>
            <div class="radar-shape"></div>
          </div>
        </section>

        <section class="panel history-card">
          <div class="panel-title">
            <h2>训练记录</h2>
            <button>报告</button>
          </div>
          <ul>
            <li v-for="item in history" :key="item">{{ item }}</li>
          </ul>
          <div class="course-tip">
            <i class="fas fa-graduation-cap"></i>
            推荐课程：直播异议处理 15 分钟精练
          </div>
        </section>
      </aside>
    </section>
  </main>
</template>

<style scoped>
.practice-workbench{min-height:100vh;background:#eef3f8;color:#172033;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif}.topbar{position:sticky;top:0;z-index:10;height:74px;display:grid;grid-template-columns:310px minmax(0,1fr) 270px;align-items:center;background:#fff;border-bottom:1px solid #dce5f0;box-shadow:0 8px 24px rgba(38,76,123,.06)}.brand{height:100%;display:flex;align-items:center;gap:14px;padding:0 22px;background:linear-gradient(135deg,#155bd4,#1d8cf8);color:#fff}.brand-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:12px;background:rgba(255,255,255,.18);font-size:21px}.brand strong{display:block;font-size:20px}.brand span{display:block;margin-top:5px;color:#dbeafe;font-size:12px;font-weight:800}.top-tabs{display:flex;align-items:center;height:100%;overflow-x:auto}.top-tabs button{height:100%;min-width:116px;border:0;border-bottom:3px solid transparent;background:transparent;color:#526176;font-size:15px;font-weight:900;cursor:pointer}.top-tabs button.active{color:#155bd4;border-color:#155bd4;background:#f3f8ff}.top-actions{display:flex;align-items:center;justify-content:flex-end;gap:14px;padding:0 18px}.top-actions button{position:relative;width:38px;height:38px;border:1px solid #dce5f0;border-radius:10px;background:#fff;color:#526176;cursor:pointer}.notice:after{content:"";position:absolute;right:8px;top:8px;width:8px;height:8px;border-radius:50%;background:#ef4444}.user-pill{display:flex;align-items:center;gap:8px;padding:6px 10px;border-radius:999px;background:#f3f8ff;color:#20304a;font-weight:900}.user-pill span{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#155bd4;color:#fff}.workbench-grid{display:grid;grid-template-columns:310px minmax(520px,1fr) 340px;gap:18px;padding:18px}.panel{border:1px solid #dce5f0;border-radius:8px;background:#fff;box-shadow:0 10px 28px rgba(38,76,123,.06)}.task-panel,.score-panel{display:grid;gap:16px;align-content:start}.panel-title{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:18px 18px 12px}.panel-title h2{margin:0;font-size:17px}.panel-title span{color:#155bd4;font-size:12px;font-weight:900}.panel-title button{border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;color:#155bd4;font-weight:900;cursor:pointer}.task-list{display:grid;gap:10px;padding:0 14px 16px}.task-list button{display:grid;gap:8px;text-align:left;padding:14px;border:1px solid #e3ebf5;border-radius:8px;background:#fff;cursor:pointer}.task-list button.active{border-color:#155bd4;background:#f3f8ff;box-shadow:inset 3px 0 0 #155bd4}.task-status{width:max-content;padding:4px 8px;border-radius:999px;background:#e0f2fe;color:#0369a1;font-size:12px;font-weight:900}.task-list strong{color:#1f2a3d}.task-list em{color:#718096;font-size:12px;font-style:normal;font-weight:800}.product-panel{padding-bottom:16px}.product-card{margin:0 14px;padding:12px;border:1px solid #e3ebf5;border-radius:8px;background:#f8fbff}.product-cover{overflow:hidden;height:118px;border-radius:6px;background:#dbeafe}.product-cover img{width:100%;height:100%;object-fit:cover}.product-info{display:grid;gap:5px;margin-top:12px}.product-info span{color:#718096;font-size:12px;font-weight:900}.product-info strong{color:#1f2a3d;font-size:13px;line-height:1.5}.scene-tags{display:flex;flex-wrap:wrap;gap:8px;padding:14px 14px 0}.scene-tags button{border:1px solid #dce5f0;border-radius:999px;background:#fff;color:#526176;padding:8px 10px;font-weight:900;cursor:pointer}.scene-tags button.active{border-color:#155bd4;background:#155bd4;color:#fff}.coach-stage{display:grid;gap:16px;align-content:start}.stage-head{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 26px;border-radius:8px;background:linear-gradient(135deg,#0f4ab8,#1d8cf8);color:#fff;box-shadow:0 18px 36px rgba(21,91,212,.2)}.stage-head span{color:#dbeafe;font-size:12px;font-weight:900}.stage-head h1{margin:8px 0 0;font-size:26px}.live-state{display:flex;align-items:center;gap:8px;padding:10px 14px;border-radius:999px;background:rgba(255,255,255,.16);font-weight:900;white-space:nowrap}.live-state i{color:#22c55e;font-size:10px}.live-preview{position:relative;overflow:hidden;min-height:210px;border-radius:8px;background:linear-gradient(135deg,#172033,#0f4ab8);box-shadow:0 12px 28px rgba(38,76,123,.12)}.live-preview:before{content:"";position:absolute;inset:0;background-image:url('/static/images/solutions/webp/ecommerce.webp');background-size:cover;background-position:center;opacity:.16}.anchor-card{position:absolute;left:22px;bottom:22px;z-index:1;display:flex;align-items:center;gap:14px;width:min(430px,calc(100% - 44px));padding:16px;border-radius:8px;background:rgba(255,255,255,.92)}.avatar{display:grid;place-items:center;flex:0 0 58px;height:58px;border-radius:50%;background:linear-gradient(135deg,#0ea5e9,#155bd4);color:#fff;font-weight:900}.anchor-card strong{display:block;color:#172033}.anchor-card p{margin:6px 0 0;color:#526176;line-height:1.6}.bullet-screen{position:absolute;right:24px;top:26px;z-index:1;display:grid;gap:12px}.bullet-screen span{padding:8px 12px;border-radius:999px;background:rgba(255,255,255,.88);color:#155bd4;font-weight:900}.dialogue-panel{display:grid;gap:12px;padding:18px;border:1px solid #dce5f0;border-radius:8px;background:#fff}.message{display:grid;gap:8px;width:min(84%,640px);padding:14px 16px;border-radius:8px}.message.ai{background:#eff6ff}.message.user{justify-self:end;background:#155bd4;color:#fff}.message.coach{background:#fff7ed;border:1px solid #fed7aa}.message-meta{display:flex;align-items:center;justify-content:space-between;gap:10px}.message-meta strong{font-size:14px}.message-meta span{font-size:12px;font-weight:900;opacity:.8}.message p{margin:0;line-height:1.7}.input-simulator{display:grid;grid-template-columns:122px minmax(0,1fr) 48px;gap:10px;padding:12px;border:1px solid #dce5f0;border-radius:8px;background:#fff}.input-simulator button{border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;color:#155bd4;font-weight:900;cursor:pointer}.fake-input{display:flex;align-items:center;min-height:44px;padding:0 14px;border-radius:8px;background:#f8fbff;color:#718096}.input-simulator .send-btn{background:#155bd4;color:#fff}.suggestion-panel{display:grid;grid-template-columns:minmax(0,1fr) 80px;gap:14px;align-items:center;padding:16px 18px;border-radius:8px;background:#172033;color:#fff}.suggestion-panel span{color:#93c5fd;font-weight:900}.suggestion-panel p{margin:6px 0 0;line-height:1.7}.suggestion-panel button{height:38px;border:0;border-radius:8px;background:#38bdf8;color:#082f49;font-weight:900;cursor:pointer}.score-card{padding-bottom:16px}.score-ring{display:grid;place-items:center;align-content:center;width:142px;height:142px;margin:4px auto 18px;border-radius:50%;background:conic-gradient(#155bd4 0 86%,#e5edf6 86% 100%);box-shadow:inset 0 0 0 14px #fff}.score-ring strong{font-size:42px;color:#155bd4}.score-ring span{color:#526176;font-weight:900}.metric-list{display:grid;gap:12px;padding:0 18px}.metric-row{display:grid;grid-template-columns:68px minmax(0,1fr) 34px;gap:10px;align-items:center;font-size:13px;font-weight:900}.metric-row span{color:#526176}.metric-row div{height:8px;border-radius:999px;background:#e5edf6;overflow:hidden}.metric-row i{display:block;height:100%;border-radius:999px;background:linear-gradient(90deg,#155bd4,#38bdf8)}.keyword-list{display:flex;flex-wrap:wrap;gap:8px;padding:0 18px 18px}.keyword-list span{display:flex;align-items:center;gap:6px;padding:8px 10px;border-radius:999px;background:#f1f5f9;color:#718096;font-size:12px;font-weight:900}.keyword-list span.hit{background:#dcfce7;color:#15803d}.radar{position:relative;height:178px;margin:0 18px 18px;border-radius:8px;background:radial-gradient(circle,#dbeafe 1px,transparent 1px),linear-gradient(135deg,#f8fbff,#fff);background-size:24px 24px;border:1px solid #e3ebf5}.radar span{position:absolute;color:#526176;font-size:12px;font-weight:900}.radar span:nth-child(1){left:50%;top:12px;transform:translateX(-50%)}.radar span:nth-child(2){right:18px;top:62px}.radar span:nth-child(3){right:42px;bottom:18px}.radar span:nth-child(4){left:38px;bottom:18px}.radar span:nth-child(5){left:18px;top:62px}.radar-shape{position:absolute;left:50%;top:50%;width:96px;height:92px;transform:translate(-50%,-45%);background:rgba(21,91,212,.25);clip-path:polygon(48% 0,100% 35%,80% 100%,20% 88%,0 32%);border:2px solid #155bd4}.history-card{padding-bottom:16px}.history-card ul{display:grid;gap:10px;margin:0;padding:0 18px;list-style:none}.history-card li{position:relative;padding-left:18px;color:#526176;font-weight:800;line-height:1.5}.history-card li:before{content:"";position:absolute;left:0;top:9px;width:7px;height:7px;border-radius:50%;background:#155bd4}.course-tip{display:flex;gap:10px;margin:16px 18px 0;padding:12px;border-radius:8px;background:#f3f8ff;color:#155bd4;font-weight:900;line-height:1.5}.course-tip i{margin-top:3px}@media(max-width:1180px){.topbar{grid-template-columns:280px minmax(0,1fr)}.top-actions{display:none}.workbench-grid{grid-template-columns:280px minmax(0,1fr)}.score-panel{grid-column:1/-1;grid-template-columns:repeat(2,minmax(0,1fr))}.history-card{grid-column:1/-1}.coach-stage{min-width:0}}@media(max-width:820px){.topbar{position:static;height:auto;grid-template-columns:1fr}.brand{height:72px}.top-tabs{height:58px}.workbench-grid{grid-template-columns:1fr;padding:12px}.task-panel,.score-panel{grid-template-columns:1fr}.stage-head{display:grid}.live-state{width:max-content}.message{width:100%}.input-simulator{grid-template-columns:1fr}.input-simulator button,.fake-input{min-height:42px}.suggestion-panel{grid-template-columns:1fr}.bullet-screen{left:18px;right:18px}.anchor-card{position:relative;left:auto;bottom:auto;margin:118px 16px 16px;width:auto}.stage-head h1{font-size:22px}}@media(max-width:520px){.top-tabs button{min-width:104px;font-size:14px}.panel-title{padding:16px 14px 10px}.stage-head{padding:18px}.dialogue-panel{padding:12px}.message-meta{display:grid}.score-ring{width:128px;height:128px}.metric-row{grid-template-columns:64px minmax(0,1fr) 30px}.bullet-screen span{font-size:12px}.anchor-card{display:grid}.product-cover{height:96px}}
</style>
