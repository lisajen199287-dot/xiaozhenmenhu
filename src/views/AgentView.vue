<script setup lang="ts">
import { useRouter } from 'vue-router';
const router = useRouter();

const scenarios = [
  {
    icon: 'fas fa-user-tie',
    title: '行政人事助手',
    desc: '自动回答社保、考勤、报销等制度问题。支持员工手册、入职指南等文档一键导入，释放 HR 80% 重复工作量',
    color: '#6366F1'
  },
  {
    icon: 'fas fa-gavel',
    title: '法务合规顾问',
    desc: '基于民法典及行业法规库，快速审核合同风险条款。提供智能法律咨询，降低企业经营合规风险',
    color: '#8B5CF6'
  },
  {
    icon: 'fas fa-file-signature',
    title: '招投标管理专家',
    desc: '智能分析历史标书库，辅助生成高分投标文件。自动解析招标文件核心需求，提升中标率',
    color: '#EC4899'
  },
  {
    icon: 'fas fa-chart-line',
    title: '经营数据分析',
    desc: '连接企业 ERP 与财务系统，通过自然语言查询经营报表。实时生成销售、库存与财务分析报告',
    color: '#3B82F6'
  }
]
</script>

<template>
  <div class="agent-page">
    <!-- Hero Section -->
    <header class="agent-hero">
      <div class="hero-bg-glow"></div>
      <div class="wrapper">
        <div class="hero-badge">Enterprise Knowledge Brain</div>
        <h1 class="hero-title">企业知识<span class="gradient-text">智慧大脑</span></h1>
        <p class="hero-desc">基于 RAG 检索增强技术，构建企业专属知识库。打造 7×24 小时在线的业务专家，让每个员工都拥有金牌导师。</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/contact')">预约演示</button>
          <button class="btn-secondary">了解技术详情</button>
        </div>
      </div>
    </header>

    <div class="wrapper content-sections">
      <!-- RAG Workflow -->
      <section class="premium-section">
        <div class="section-label">HOW IT WORKS</div>
        <h2 class="section-title">如何让 AI 更懂您的业务</h2>
        <p class="section-subtitle">私有数据 + RAG 技术，解决通用大模型不了解企业内部深层背景的痛点</p>

        <div class="rag-flow-container">
          <div class="rag-node src">
            <div class="node-icon"><i class="fas fa-database"></i></div>
            <h4>私有数据源</h4>
            <p>Word, PDF, ERP, CRM</p>
          </div>
          <div class="flow-line"><div class="flow-dot"></div></div>
          <div class="rag-node vector">
            <div class="node-icon"><i class="fas fa-brain"></i></div>
            <h4>向量知识库</h4>
            <p>Embedding & Indexing</p>
          </div>
          <div class="flow-line"><div class="flow-dot"></div></div>
          <div class="rag-node engine highlight">
            <div class="node-icon"><i class="fas fa-magic"></i></div>
            <h4>智能引擎</h4>
            <p>精准检索与生成</p>
          </div>
        </div>
      </section>

      <!-- Scenarios Grid -->
      <section class="scenarios-section-v2">
        <div class="section-label">USE CASES</div>
        <h2 class="section-title">全场景业务赋能</h2>
        <div class="premium-grid">
          <div v-for="s in scenarios" :key="s.title" class="premium-card">
            <div class="card-glow" :style="{ background: s.color }"></div>
            <div class="card-icon" :style="{ color: s.color }">
              <i :class="s.icon"></i>
            </div>
            <div class="card-body">
              <h3>{{ s.title }}</h3>
              <p>{{ s.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Chat Experience -->
      <section class="demo-section">
        <div class="demo-flex">
          <div class="demo-info">
            <div class="section-label text-left">LIVE DEMO</div>
            <h2 class="section-title text-left">极致的问答体验</h2>
            <p class="desc-text text-left">
              秒级响应，原文引用。不仅给出答案，更明确告知结论来自哪份文档、哪一页，确保结果权威、可回溯。
            </p>
            <ul class="feature-list">
              <li><i class="fas fa-check-circle"></i> 毫秒级语义检索</li>
              <li><i class="fas fa-check-circle"></i> 100% 事实引用增强</li>
              <li><i class="fas fa-check-circle"></i> 企业级数据安全隔离</li>
            </ul>
          </div>

          <div class="chat-mockup-v2">
            <div class="chat-window">
              <div class="chat-header">
                <div class="header-status">
                  <span class="status-dot pulsed"></span>
                  <span>AI 助手离线演示版</span>
                </div>
                <div class="header-tools">
                   <i class="fas fa-cog"></i>
                </div>
              </div>
              <div class="chat-content">
                <div class="chat-msg bot">
                  <div class="bubble">您好！我是企业知识助理。您可以询问任何关于公司制度或业务细节的问题。</div>
                </div>
                <div class="chat-msg user">
                  <div class="bubble">请问 2024 年的年假申请制度有哪些新变化？</div>
                </div>
                <div class="chat-msg bot highlight">
                  <div class="bubble">
                    根据《2024 人事管理增补指令》附件 2：<br><br>
                    1. <strong>弹性调休</strong>：新增“工龄奖”假，每满 3 年增加 1 天。<br>
                    2. <strong>提前量</strong>：3 天内申请需提前 24 小时报备。<br>
                    <div class="source-tag">
                      <i class="fas fa-file-pdf"></i> 来源：人事制度汇编.pdf (P14)
                    </div>
                  </div>
                </div>
              </div>
              <div class="chat-footer">
                <div class="input-area">输入问题...</div>
                <div class="send-btn"><i class="fas fa-arrow-up"></i></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- CTA Section -->
    <section class="bottom-cta">
      <div class="cta-bg"></div>
      <div class="wrapper">
        <h2>准备好让您的企业数据焕发新生了吗？</h2>
        <p>立即申请免费诊断，体验私有化知识库引擎带来的效率革命</p>
        <button class="btn-primary large" @click="router.push('/contact')">获取定制化方案</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.agent-page {
  background: #f8fafc;
  color: #1e293b;
  overflow-x: hidden;
  padding-top: 80px;
}

.wrapper {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Hero Section */
.agent-hero {
  position: relative;
  padding: 120px 0 100px;
  background: #0f172a;
  color: white;
  text-align: center;
  overflow: hidden;
  border-radius: 0 0 60px 60px;
}

.hero-bg-glow {
  position: absolute;
  top: -10%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 120%;
  background: radial-gradient(circle at center, rgba(79, 70, 229, 0.15) 0%, transparent 70%);
}

.hero-badge {
  display: inline-block;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 100px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 32px;
  color: #818cf8;
}

.hero-title {
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 24px;
}

.gradient-text {
  background: linear-gradient(135deg, #818cf8 0%, #c084fc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.hero-desc {
  max-width: 760px;
  margin: 0 auto 48px;
  font-size: 1.25rem;
  line-height: 1.6;
  color: #94a3b8;
}

.hero-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
}

/* Buttons */
.btn-primary {
  padding: 14px 32px;
  background: #4f46e5;
  color: white;
  border-radius: 12px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(79, 70, 229, 0.2);
}

.btn-primary:hover {
  transform: translateY(-2px);
  background: #4338ca;
  box-shadow: 0 15px 30px rgba(79, 70, 229, 0.3);
}

.btn-secondary {
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.05);
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.1);
}

/* Content Sections */
.content-sections {
  margin-top: -40px;
  position: relative;
  z-index: 10;
}

.premium-section {
  background: white;
  border-radius: 32px;
  padding: 80px;
  box-shadow: 0 40px 80px rgba(0, 0, 0, 0.03);
  margin-bottom: 80px;
  text-align: center;
}

.section-label {
  font-size: 0.75rem;
  font-weight: 800;
  color: #4f46e5;
  letter-spacing: 0.2em;
  margin-bottom: 16px;
  text-transform: uppercase;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 24px;
}

.section-subtitle {
  font-size: 1.15rem;
  color: #64748b;
  max-width: 600px;
  margin: 0 auto 64px;
}

/* RAG Flow */
.rag-flow-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
}

.rag-node {
  width: 200px;
  text-align: center;
}

.node-icon {
  width: 80px;
  height: 80px;
  background: #f1f5f9;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: #475569;
  margin: 0 auto 20px;
  transition: all 0.5s;
}

.rag-node.highlight .node-icon {
  background: #4f46e5;
  color: white;
  box-shadow: 0 20px 40px rgba(79, 70, 229, 0.2);
}

.rag-node h4 { margin-bottom: 8px; font-weight: 700; }
.rag-node p { font-size: 0.85rem; color: #94a3b8; }

.flow-line {
  flex: 1;
  max-width: 120px;
  height: 2px;
  background: #e2e8f0;
  position: relative;
}

.flow-dot {
  position: absolute;
  top: -3px;
  left: 0;
  width: 8px;
  height: 8px;
  background: #4f46e5;
  border-radius: 50%;
  animation: flowMove 2s infinite linear;
}

@keyframes flowMove {
  from { left: 0; opacity: 1; }
  to { left: 100%; opacity: 0; }
}

/* Premium Grid */
.premium-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 32px;
  margin-top: 48px;
}

.premium-card {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 24px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  transition: all 0.3s;
}

.premium-card:hover {
  transform: translateY(-8px);
  border-color: #cbd5e1;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.05);
}

.card-glow {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 100px;
  height: 100px;
  filter: blur(50px);
  opacity: 0.1;
  transition: opacity 0.3s;
}

.premium-card:hover .card-glow { opacity: 0.2; }

.card-icon {
  width: 60px;
  height: 60px;
  background: #f8fafc;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  margin-bottom: 24px;
}

.card-body h3 {
  font-size: 1.4rem;
  margin-bottom: 16px;
  font-weight: 700;
}

.card-body p {
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
}

/* Demo Section */
.demo-flex {
  display: flex;
  align-items: center;
  gap: 80px;
  padding: 100px 0;
}

.demo-info { flex: 1; }
.text-left { text-align: left; margin-left: 0; }

.desc-text {
  font-size: 1.15rem;
  color: #64748b;
  margin-bottom: 32px;
  line-height: 1.7;
}

.feature-list {
  list-style: none;
  padding: 0;
}

.feature-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-weight: 600;
  color: #334155;
}

.feature-list i { color: #10b981; }

.chat-mockup-v2 {
  flex: 1;
  max-width: 500px;
}

.chat-window {
  background: white;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 40px 80px rgba(0,0,0,0.1);
  overflow: hidden;
  height: 520px;
  display: flex;
  flex-direction: column;
}

.chat-header {
  padding: 16px 20px;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
  font-weight: 700;
}

.header-status { display: flex; align-items: center; gap: 8px; }
.status-dot { width: 8px; height: 8px; border-radius: 50%; background: #10b981; }

.pulsed { animation: pulse 2s infinite; }
@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.chat-content {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.chat-msg .bubble {
  padding: 12px 18px;
  border-radius: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  max-width: 85%;
}

.chat-msg.bot .bubble { background: #f1f5f9; border-top-left-radius: 4px; }
.chat-msg.user { align-self: flex-end; }
.chat-msg.user .bubble { background: #4f46e5; color: white; border-top-right-radius: 4px; }

.source-tag {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(0,0,0,0.05);
  font-size: 0.75rem;
  color: #64748b;
  display: flex;
  align-items: center;
  gap: 6px;
}

.chat-footer {
  padding: 16px 20px;
  border-top: 1px solid #e2e8f0;
  display: flex;
  gap: 12px;
}

.input-area {
  flex: 1;
  background: #f1f5f9;
  padding: 10px 16px;
  border-radius: 100px;
  font-size: 0.85rem;
  color: #94a3b8;
}

.send-btn {
  width: 36px;
  height: 36px;
  background: #4f46e5;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Bottom CTA */
.bottom-cta {
  position: relative;
  background: #0f172a;
  color: white;
  padding: 100px 0;
  text-align: center;
  overflow: hidden;
}

.cta-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, #4f46e5 0%, transparent 100%);
  opacity: 0.1;
}

.bottom-cta h2 { font-size: 2.5rem; margin-bottom: 24px; font-weight: 800; }
.bottom-cta p { font-size: 1.25rem; color: #94a3b8; margin-bottom: 40px; }
.btn-primary.large { padding: 18px 48px; font-size: 1.1rem; }

@media (max-width: 1024px) {
  .hero-title { font-size: 3rem; }
  .premium-grid { grid-template-columns: 1fr; }
  .demo-flex { flex-direction: column; text-align: center; }
  .text-left { text-align: center; }
  .feature-list { display: inline-block; text-align: left; }
}
</style>