const products = [
  {
    id: "suncoat",
    name: "冰感防晒衣",
    category: "服饰单品",
    price: "¥159",
    sellingPoints: ["UPF50+ 防晒", "冰感速干面料", "轻薄透气"],
    personas: ["通勤白领", "宝妈", "户外运动用户"],
    tags: ["限时满 2 件减 15", "赠送冰袖"],
    keywords: ["UPF50+", "冰感", "速干", "检测报告", "显瘦版型"],
  },
  {
    id: "snack",
    name: "低脂零食组合",
    category: "食品饮品",
    price: "¥89",
    sellingPoints: ["独立小包装", "低油低糖", "办公室囤货"],
    personas: ["健身人群", "办公室白领", "学生党"],
    tags: ["第二件半价", "组合装包邮"],
    keywords: ["低脂", "小包装", "饱腹", "控卡", "囤货"],
  },
  {
    id: "homegift",
    name: "家清香氛礼盒",
    category: "家清日化",
    price: "礼盒价 ¥129",
    sellingPoints: ["除味留香", "客厅卧室可用", "礼盒包装"],
    personas: ["新居家庭", "送礼用户", "品质生活用户"],
    tags: ["节日礼赠", "买一赠一补充装"],
    keywords: ["除味", "留香", "礼盒", "温和配方", "品质感"],
  },
];

let activeModule = "practice";
let selectedProductId = "suncoat";
let currentScenario = "异议处理";
let dialogue = [
  { role: "buyer", name: "买家弹幕", tag: "价格异议", text: "价格有点高，和普通款有什么区别？" },
  { role: "anchor", name: "主播回答", tag: "历史回答", text: "这款主打冰感和防晒，夏天通勤穿会更舒服。" },
  { role: "coach", name: "AI 教练建议", tag: "即时反馈", text: "建议补充检测报告、适用场景和福利权益，增强信任。" },
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function currentProduct() {
  return products.find((item) => item.id === selectedProductId) || products[0];
}

function renderProductList() {
  const box = $("#product-list");
  box.innerHTML = products
    .map(
      (product) => `
        <button class="${product.id === selectedProductId ? "active" : ""}" data-product="${product.id}">
          <strong>${product.name}</strong>
          <span>${product.sellingPoints.slice(0, 2).join(" / ")}</span>
        </button>
      `,
    )
    .join("");
}

function renderHeader() {
  const product = currentProduct();
  $("#current-product").textContent = `${product.name} · ${currentScenario}`;
  $("#product-meta").textContent = `${product.category} · ${product.price}`;
  $("#live-product").textContent = product.name;
  $("#floating-product").textContent = product.name;
  $("#floating-price").textContent = product.price;
}

function renderQuestions() {
  const product = currentProduct();
  const questions = [
    `这个${product.name}适合什么人买？`,
    `${product.price}还有没有优惠？`,
    `和普通${product.category}有什么区别？`,
    "售后和发货怎么保障？",
  ];
  $("#question-list").innerHTML = questions.map((item) => `<span>${item}</span>`).join("");
}

function renderDialogue() {
  $("#dialog-count").textContent = `本轮已记录 ${dialogue.length} 条`;
  $("#dialogue-list").innerHTML = dialogue
    .map(
      (item) => `
        <div class="dialogue-item ${item.role}">
          <div><strong>${item.name}</strong> <span>${item.tag}</span></div>
          <p>${item.text}</p>
        </div>
      `,
    )
    .join("");
}

function scriptBlocks() {
  const product = currentProduct();
  return [
    {
      title: "开场引导",
      badge: "30 秒建立信任",
      text: `欢迎来到直播间，今天重点给大家看这款${product.name}。它适合${product.personas.join("、")}，本场有${product.tags.join("、")}，先点关注把福利锁住。`,
    },
    {
      title: "核心卖点讲解",
      badge: "商品价值说明",
      text: `${product.name}的核心优势是${product.sellingPoints.join("、")}。讲解时先说使用场景，再给出具体体验，最后把活动权益自然带出来。`,
    },
    {
      title: "异议处理",
      badge: "买家追问应答",
      text: `如果用户质疑价格或效果，可以先共情：“这个问题问得很实际”，再围绕${product.keywords.slice(0, 3).join("、")}给出证据，不使用绝对化承诺。`,
    },
    {
      title: "转化收口",
      badge: "福利催单",
      text: `收口时强调库存与权益：“本场${product.tags[0]}，适合的人群可以先拍下试用，不合适也有售后保障。”`,
    },
  ];
}

function renderScripts() {
  $("#script-layout").innerHTML = scriptBlocks()
    .map(
      (block) => `
        <article class="script-card">
          <div><span>${block.badge}</span><h3>${block.title}</h3></div>
          <p>${block.text}</p>
          <button>📋 复制话术</button>
        </article>
      `,
    )
    .join("");
}

function renderAll() {
  renderProductList();
  renderHeader();
  renderQuestions();
  renderDialogue();
  renderScripts();
}

function switchModule(module) {
  activeModule = module;
  $$(".module-panel").forEach((panel) => panel.classList.toggle("hidden", panel.id !== module));
  $$(".system-nav button").forEach((button) => button.classList.toggle("active", button.dataset.module === module));
  const title = document.querySelector(`[data-module="${module}"] strong`)?.textContent || "直播陪练";
  $("#page-title").textContent = title;
}

document.addEventListener("click", (event) => {
  const nav = event.target.closest("[data-module]");
  if (nav) switchModule(nav.dataset.module);

  const jump = event.target.closest("[data-jump]");
  if (jump) switchModule(jump.dataset.jump);

  const productButton = event.target.closest("[data-product]");
  if (productButton) {
    selectedProductId = productButton.dataset.product;
    renderAll();
  }

  const sceneButton = event.target.closest("[data-scene]");
  if (sceneButton) {
    currentScenario = sceneButton.dataset.scene;
    $$(".scenario-tabs button").forEach((button) => button.classList.toggle("active", button === sceneButton));
    renderHeader();
  }
});

$("#submit-reply").addEventListener("click", () => {
  const value = $("#reply-text").value.trim();
  const product = currentProduct();
  if (!value) return;
  dialogue.push({ role: "anchor", name: "主播回答", tag: "新提交", text: value });
  dialogue.push({
    role: "coach",
    name: "AI 教练建议",
    tag: "即时反馈",
    text: `已记录本次回答。建议继续补充“${product.keywords[0]}”相关证据，并结合“${product.tags[0]}”完成转化收口。`,
  });
  $("#reply-text").value = "";
  renderDialogue();
});

function generateScript() {
  const product = currentProduct();
  const prompt = $("#script-prompt").value.trim();
  $("#script-time").textContent = `已基于「${product.name}」和最近陪练报告重新生成。`;
  $("#script-reply").textContent = prompt
    ? `已按你的要求生成：针对「${product.name}」，先回应用户关心点，再突出${product.sellingPoints.slice(0, 2).join("、")}，最后承接「${product.tags[0]}」权益。可直接复制上方话术卡继续调整。`
    : `已基于「${product.name}」生成通用直播话术。`;
  renderScripts();
}

$("#regen-script").addEventListener("click", generateScript);
$("#generate-script").addEventListener("click", generateScript);
$("#prompt-example").addEventListener("click", () => {
  $("#script-prompt").value = "帮我生成一段直播开场话术，突出商品卖点和本场福利。";
});
$("#export-report").addEventListener("click", () => {
  alert("已模拟生成 PDF 报告：包含总分、维度评分、雷达图、关键词命中与话术建议。");
});

renderAll();
