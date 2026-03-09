<script setup lang="ts">

const features = [

  {

    icon: 'fas fa-pen-nib',

    title: '营销文案生成',

    desc: '基于千亿参数大模型，一键生成小红书爆款笔记、短视频脚本与直播逐字稿。支持多种语体风格切换。'

  },

  {

    icon: 'fas fa-image',

    title: '商拍图像合成',

    desc: '无需实物拍摄，AI 自动生成商品场景图与模特试穿图。支持光影控制与细节重绘，还原真实质感。'

  },

  {

    icon: 'fas fa-video',

    title: '数字人视频生成',

    desc: '输入文本即可驱动超写实数字人播报。支持多语种口型同步，大幅降低短视频与直播制作成本。'

  },

  {

    icon: 'fas fa-magic',

    title: '创意风格迁移',

    desc: '将实拍视频一键转化为动漫、素描等多种艺术风格。保持人物动作连贯，为品牌营销增添趣味。'

  }

]

</script>



<template>

  <div class="engine-page">

    <header class="page-hero-v2 engine-hero">

      <div class="wrapper">

        <div class="hero-badge-v2">Creative Engine</div>

        <h1>AIGC 智能内容引擎</h1>

        <p class="main-desc">聚合多模态生成大模型，赋能内容生产全链路。从灵感到落地，让创意更简单</p>

      </div>

    </header>



    <div class="wrapper">

      <!-- Core Capacity -->

      <section class="engine-section">

        <div class="section-title-box">

          <h2>全模态内容生成能力</h2>

          <p>一站式打通文本、图像与视频创作流，释放无限创造力</p>

        </div>

        <div class="feature-grid">

          <div v-for="f in features" :key="f.title" class="feature-card">

            <div class="f-icon"><i :class="f.icon"></i></div>

            <h3>{{ f.title }}</h3>

            <p>{{ f.desc }}</p>

          </div>

        </div>

      </section>



      <!-- Workflow Demo -->

      <section class="engine-section dark-bg">

        <div class="workflow-container">

          <div class="workflow-text">

            <h2>像搭积木一样创作</h2>

            <p>模块化工作流，无论是单点创作还是批量生产，都能轻松应对</p>

            <ul class="workflow-steps">

              <li><i class="fas fa-check-circle"></i> <strong>素材准备</strong> 上传商品图或输入关键词</li>

              <li><i class="fas fa-check-circle"></i> <strong>智能生成</strong> AI 自动匹配场景与文案</li>

              <li><i class="fas fa-check-circle"></i> <strong>一键分发</strong> 适配各主流平台格式导出</li>

            </ul>

            <button class="btn-primary-v2">立即体验工作流</button>

          </div>

          <div class="workflow-visual">

             <!-- Abstract Visual Representation -->

             <div class="visual-card">

               <div class="v-header">Input</div>

               <div class="v-content"><i class="fas fa-file-image"></i> <span>Product.png</span></div>

             </div>

             <i class="fas fa-arrow-right flow-arrow"></i>

             <div class="visual-card center">

               <div class="v-header">AI Processing</div>

               <div class="v-content loading"><i class="fas fa-cog fa-spin"></i></div>

             </div>

             <i class="fas fa-arrow-right flow-arrow"></i>

             <div class="visual-card">

               <div class="v-header">Output</div>

               <div class="v-content"><i class="fas fa-video"></i> <span>Video_Final.mp4</span></div>

             </div>

          </div>

        </div>

      </section>



      <!-- CTA -->

      <section class="engine-cta">

        <h2>准备好提升创作效率了吗？</h2>

        <p>加入数千家先锋企业，开启 AIGC 创作新纪元</p>

        <button class="btn-outline-dark">申请免费试用</button>

      </section>

    </div>

  </div>

</template>



<style scoped>

.engine-page {

  padding-top: 72px;

  background: #fdfdfe;

}



.engine-hero {

  background: linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1920');

  background-size: cover;

  background-position: center;

  padding: 120px 0 100px;

  text-align: center;

  color: white;

  margin-bottom: 60px;

}



.hero-badge-v2 {

  display: inline-block;

  padding: 6px 16px;

  background: rgba(255, 255, 255, 0.1);

  backdrop-filter: blur(8px);

  color: #a5b4fc;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 4px;

  font-size: 0.75rem;

  font-weight: 800;

  margin-bottom: 24px;

  letter-spacing: 0.15em;

  text-transform: uppercase;

}



.engine-hero h1 {

  font-size: 3rem;

  font-weight: 900;

  margin-bottom: 20px;

  letter-spacing: -0.02em;

}



.main-desc {

  font-size: 1.25rem;

  color: rgba(255, 255, 255, 0.8);

  max-width: 700px;

  margin: 0 auto;

  line-height: 1.6;

}



.engine-section {

  padding: 80px 0;

}



.section-title-box {

  text-align: center;

  margin-bottom: 60px;

}



.section-title-box h2 {

  font-size: 2.2rem;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 16px;

}



.section-title-box p {

  font-size: 1.1rem;

  color: #64748b;

}



.feature-grid {

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 32px;

}



.feature-card {

  background: white;

  padding: 32px;

  border-radius: 16px;

  border: 1px solid #f1f5f9;

  transition: all 0.3s;

  text-align: center;

}



.feature-card:hover {

  transform: translateY(-8px);

  box-shadow: 0 20px 40px rgba(0,0,0,0.06);

  border-color: #4f46e530;

}



.f-icon {

  width: 64px;

  height: 64px;

  background: #f5f3ff;

  color: #4f46e5;

  border-radius: 16px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;

  margin: 0 auto 24px;

}



.feature-card h3 {

  font-size: 1.25rem;

  font-weight: 800;

  margin-bottom: 12px;

  color: #1e293b;

}



.feature-card p {

  color: #64748b;

  line-height: 1.6;

  font-size: 0.95rem;

}



/* Workflow */

.dark-bg {

  background: #0f172a;

  border-radius: 32px;

  color: white;

  margin-bottom: 80px;

}



.workflow-container {

  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 60px;

  align-items: center;

  padding: 20px 40px;

}



.workflow-text h2 {

  font-size: 2rem;

  font-weight: 800;

  margin-bottom: 16px;

}



.workflow-text p {

  color: rgba(255,255,255,0.7);

  margin-bottom: 32px;

  font-size: 1.1rem;

}



.workflow-steps {

  list-style: none;

  padding: 0;

  margin-bottom: 40px;

}



.workflow-steps li {

  margin-bottom: 16px;

  display: flex;

  align-items: center;

  gap: 12px;

  font-size: 1.05rem;

}



.workflow-steps i {

  color: #4f46e5;

}



.workflow-visual {

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 16px;

}



.visual-card {

  background: rgba(255,255,255,0.05);

  border: 1px solid rgba(255,255,255,0.1);

  border-radius: 12px;

  width: 100px;

  height: 100px;

  display: flex;

  flex-direction: column;

  align-items: center;

  justify-content: center;

}



.v-header {

  font-size: 0.7rem;

  text-transform: uppercase;

  color: rgba(255,255,255,0.4);

  margin-bottom: 8px;

  font-weight: 700;

}



.v-content {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 4px;

  font-size: 1.5rem;

  color: white;

}



.v-content span {

  font-size: 0.6rem;

  font-weight: 500;

}



.flow-arrow {

  color: rgba(255,255,255,0.2);

}



/* CTA */

.engine-cta {

  text-align: center;

  padding-bottom: 100px;

}



.engine-cta h2 {

  font-size: 2rem;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 16px;

}



.engine-cta p {

  color: #64748b;

  font-size: 1.1rem;

  margin-bottom: 32px;

}



.btn-outline-dark {

  background: white;

  border: 2px solid #0f172a;

  color: #0f172a;

  padding: 12px 32px;

  border-radius: 8px;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.2s;

}



.btn-outline-dark:hover {

  background: #0f172a;

  color: white;

}



@media (max-width: 1024px) {

  .feature-grid { grid-template-columns: repeat(2, 1fr); }

  .workflow-container { grid-template-columns: 1fr; }

}

</style>