<script setup lang="ts">

import { useRouter } from 'vue-router'



const router = useRouter()









const allSolutions = [

  {

      id: 'ecommerce',

      title: '电商/跨境出海',

      icon: 'fas fa-shopping-cart',

      pain: '商品实拍成本高、出片慢，直播间搭建门槛高且流量转化难',

      solution: '通过 AIGC 实现商品图与带货视频的分钟级量产，结合 24h 不间断数字人直播，构建高 ROI 增长阵地',

      features: ['AI 商品图与短视频生产', '数字人全视界直播矩阵', '爆款营销物料批量产出'],

      archImg: 'linear-gradient(135deg, #eff6ff 0%, #bfdbfe 100%)'

  },

  {

      id: 'internet',

      title: '互联网与游戏',

      icon: 'fas fa-gamepad',

      pain: '买量素材生命周期短，创意产出跟不上投放节奏，用户交互体验单一',

      solution: '深度整合 AI 创意素材大模型，毫秒级裂变吸睛物料，并引入互动 NPC 提升用户留存与参与度',

      features: ['智能创意素材工厂', '买量投放调优大师', '拟真 NPC 与交互伴侣'],

      archImg: 'linear-gradient(135deg, #f5f3ff 0%, #ddd6fe 100%)'

  },

  {

      id: 'medical',

      title: '医疗健康',

      icon: 'fas fa-stethoscope',

      pain: '预问诊分配压力大，病历文书撰写繁琐，医学前沿文献检索与解构低效',

      solution: '构建高感度预问诊大脑，联动医嘱实时成文矩阵，并利用 AI 穿透解构宏量医学文献',

      features: ['高感度预问诊全系大脑', '即席医嘱实时成文矩阵', '前沿医疗文献解构质子'],

      archImg: 'linear-gradient(135deg, #fdf4ff 0%, #f0abfc 100%)'

  },

  {

      id: 'gov-media',

      title: '政务与融媒体',

      icon: 'fas fa-university',

      pain: '公文起稿严谨度要求极高且费时，融媒体短视频量产难度大，政策解读不便',

      solution: '通过 AI 写作助手提升起稿效率，辅以融媒体视频量产工厂，并构建数字化内容中枢',

      features: ['AI 公文写作智能助手', '融媒 AI 视频生产工厂', '政策法规数字化解读库'],

      archImg: 'linear-gradient(135deg, #e0f2fe 0%, #7dd3fc 100%)'

  }

]



const navigateToDetail = (id: string) => {

    router.push(`/solutions/${id}`);

}

</script>



<template>

  <div class="solutions-page">

    <!-- Hero Section -->

    <header class="page-hero-v3">

      <div class="hero-video-container">

        <video 

          autoplay 

          loop 

          muted 

          playsinline 

          class="hero-video"

        >

          <source src="/static/videos/corner-bg-video.mp4" type="video/mp4">

        </video>

        <div class="hero-video-fallback"></div>

      </div>

      <div class="hero-content">

        <h1>行业解决方案</h1>

        <p class="main-desc">基于AI应用、数字员工与大模型能力，AI 融入企业业务流程</p>

      </div>

    </header>



    <div class="wrapper page-wrapper">

      <!-- Content Grid -->

      <transition-group name="fade-slide" tag="div" class="content-grid">

        <div 

          v-for="item in allSolutions" 

          :key="item.id" 

          class="solution-card"

          @click="navigateToDetail(item.id)"

        >

          <!-- Left: Text Content -->

          <div class="card-content">

            <div class="card-header">

              <div class="icon-box"><i :class="item.icon"></i></div>

              <h3>{{ item.title }}</h3>

            </div>

            

            <div class="detail-block">

              <span class="label">业务痛点</span>

              <p class="text">{{ item.pain }}</p>

            </div>



            <div class="detail-block highlight">

              <span class="label">AI 解决方案</span>

              <p class="text">{{ item.solution }}</p>

            </div>



            <ul class="feature-list">

              <li v-for="feat in item.features" :key="feat">

                <i class="fas fa-check-circle"></i> {{ feat }}

              </li>

            </ul>



            <div class="card-action">

              <button class="btn-detail" @click="navigateToDetail(item.id)">

                  查看详情

                  <i class="fas fa-arrow-right"></i>

              </button>

            </div>

          </div>



          <!-- Right: Architecture/Visual (Placeholder) -->

          <div class="card-visual" :style="{ background: item.archImg }">

            <div class="arch-placeholder">

              <i class="fas fa-project-diagram"></i>

              <span>{{ item.title }} - 架构示意</span>

            </div>

            <!-- Decorative Elements -->

            <div class="glass-card g1"></div>

            <div class="glass-card g2"></div>

          </div>

        </div>

      </transition-group>



      <!-- CTA -->

      <section class="bottom-cta">

        <div class="cta-box">

          <h2>找不到适用的方案？</h2>

          <p>我们的解决方案架构师将为您提供免费的业务诊断服务</p>

          <button class="btn-primary-large">预约专家咨询</button>

        </div>

      </section>

    </div>

  </div>

</template>



<style scoped>

.solutions-page {

    background: #f8fafc;

    min-height: 100vh;

}



/* Hero Section */

.page-hero-v3 {

    position: relative;

    padding: 180px 0 120px;

    background: #0f172a;

    color: white;

    text-align: center;

    overflow: hidden;

}



.hero-video-container {

    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    z-index: 1;

}



.hero-video {

    width: 100%;

    height: 100%;

    object-fit: cover;

}



.hero-video-fallback {

    position: absolute;

    top: 0;

    left: 0;

    width: 100%;

    height: 100%;

    background: url('@/assets/images/corner-bg.png') center/cover no-repeat;

    z-index: -1;

}







.hero-content {

    position: relative;

    z-index: 10;

    max-width: 800px;

    margin: 0 auto;

}



/* Removed badge style as it is not in the new design */

.hero-badge-v2 {

  display: none;

}



.page-hero-v3 h1 {

    font-size: 3.5rem;

    font-weight: 850;

    margin-bottom: 20px;

    letter-spacing: -0.02em;

    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);

}



.main-desc {

    font-size: 1.2rem;

    color: rgba(255, 255, 255, 0.95);

    font-weight: 600;

    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

}





/* Main Content Wrapper */

.page-wrapper {

  margin-top: 0; /* Reset negative margin */

  position: relative;

  z-index: 20;

  padding-bottom: 100px;

}





/* Card Grid */

.content-grid {

  display: grid;

  grid-template-columns: 1fr;

  gap: 32px;

}



.solution-card {

  display: grid;

  grid-template-columns: 1.2fr 0.8fr;

  background: white;

  border-radius: 16px;

  border: 1px solid #f1f5f9;

  overflow: hidden;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);

  transition: all 0.3s;

  min-height: 400px;

  cursor: pointer;

}



.solution-card:hover {

  transform: translateY(-4px);

  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);

}



/* Card Content (Left) */

.card-content {

  padding: 40px;

  display: flex;

  flex-direction: column;

}



.card-header {

  display: flex;

  align-items: center;

  gap: 16px;

  margin-bottom: 32px;

}



.icon-box {

  width: 56px;

  height: 56px;

  background: #f1f5f9;

  color: #4f46e5;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;

}



.card-header h3 {

  font-size: 1.8rem;

  font-weight: 800;

  color: #0f172a;

}



.detail-block {

  margin-bottom: 24px;

}



.detail-block .label {

  display: block;

  font-size: 0.75rem;

  color: #94a3b8;

  font-weight: 700;

  text-transform: uppercase;

  margin-bottom: 6px;

  letter-spacing: 0.05em;

}



.detail-block .text {

  font-size: 1.05rem;

  color: #334155;

  line-height: 1.6;

}



.detail-block.highlight .text {

  color: #4f46e5;

  font-weight: 600;

}



.feature-list {

  list-style: none;

  padding: 0;

  display: flex;

  flex-direction: column;

  gap: 12px;

  margin-top: 8px;

  margin-bottom: 32px;

}



.feature-list li {

  display: flex;

  align-items: center;

  gap: 10px;

  color: #64748b;

  font-size: 0.95rem;

  font-weight: 500;

}



.feature-list i {

  color: #10b981;

}



.card-action .btn-detail {

  background: none;

  border: none;

  padding: 0;

  color: #4f46e5;

  font-weight: 700;

  font-size: 1rem;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

  transition: gap 0.2s;

}



.card-action .btn-detail:hover {

  gap: 12px;

}



/* Card Visual (Right) */

.card-visual {

  position: relative;

  display: flex;

  align-items: center;

  justify-content: center;

  overflow: hidden;

}



.arch-placeholder {

  display: flex;

  flex-direction: column;

  align-items: center;

  gap: 16px;

  color: rgba(30, 41, 59, 0.4);

  font-weight: 700;

  position: relative;

  z-index: 2;

}



.arch-placeholder i {

  font-size: 3rem;

}



.glass-card {

  position: absolute;

  background: rgba(255, 255, 255, 0.4);

  backdrop-filter: blur(10px);

  border: 1px solid rgba(255, 255, 255, 0.6);

  border-radius: 12px;

}



.g1 {

  width: 200px;

  height: 120px;

  top: 20%;

  right: -20px;

  transform: rotate(-10deg);

}



.g2 {

  width: 180px;

  height: 100px;

  bottom: 20%;

  left: -20px;

  transform: rotate(10deg);

}



/* Bottom CTA */

.bottom-cta {

  margin-top: 80px;

  text-align: center;

}



.cta-box {

  background: white;

  padding: 60px;

  border-radius: 16px;

  border: 1px solid #e2e8f0;

  max-width: 800px;

  margin: 0 auto;

}



.cta-box h2 {

  font-size: 2rem;

  font-weight: 800;

  margin-bottom: 16px;

  color: #0f172a;

}



.cta-box p {

  color: #64748b;

  margin-bottom: 32px;

  font-size: 1.1rem;

}



.btn-primary-large {

  background: #4f46e5;

  color: white;

  border: none;

  padding: 16px 48px;

  border-radius: 8px;

  font-size: 1.1rem;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.2s;

  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);

}



.btn-primary-large:hover {

  background: #4338ca;

  transform: translateY(-2px);

  box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);

}



/* Transitions */

.fade-slide-enter-active,

.fade-slide-leave-active {

  transition: all 0.4s ease;

}



.fade-slide-enter-from,

.fade-slide-leave-to {

  opacity: 0;

  transform: translateY(20px);

}



/* Responsive */

@media (max-width: 1024px) {

  .solution-card {

    grid-template-columns: 1fr;

  }

  .card-visual {

    height: 200px;

  }

}



@media (max-width: 768px) {

  .page-hero-v3 h1 { font-size: 2.5rem; }

  .solution-tabs { flex-direction: column; }

  .card-content { padding: 30px; }

}

</style>