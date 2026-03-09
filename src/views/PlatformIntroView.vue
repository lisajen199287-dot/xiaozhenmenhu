<script setup lang="ts">

import { useAdminStore } from '@/utils/adminStore'

import { computed } from 'vue'



const { platformIntro } = useAdminStore()



// Split the introduction into paragraphs for better readability

const paragraphs = computed(() => {

  return platformIntro.value.split('\n').filter(p => p.trim() !== '')

})

</script>



<template>

  <div class="intro-page">

    <!-- Hero Section -->

    <header class="page-hero-v2 intro-hero">

      <video autoplay muted loop playsinline class="hero-video">

        <source src="/static/videos/round-bg-video.mp4" type="video/mp4">

      </video>

      <div class="hero-overlay"></div>

      <div class="hero-content">

        <div class="hero-badge-v2">About Us</div>

        <h1>平台概况</h1>

        <p class="main-desc">普惠共生 · 智联未来</p>

      </div>

    </header>



    <div class="wrapper">

      <div class="intro-container">

        <div class="intro-content-card">

          <div class="content-decoration top-left"></div>

          <div class="content-decoration bottom-right"></div>

          

          <div class="intro-content">

            <div class="quote-icon">“</div>

            <div v-for="(para, index) in paragraphs" :key="index" class="intro-paragraph">

              <p>{{ para }}</p>

            </div>

            <div class="quote-icon bottom">”</div>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>



<style scoped>

.intro-page {

  padding-top: 72px;

  background: #ffffff;

  min-height: 100vh;

}



.intro-hero {

  position: relative;

  min-height: 300px;

  height: 35vh;

  display: flex;

  align-items: center;

  justify-content: center;

  background: #ffffff;

  overflow: hidden;

  /* Create a smooth, long gradient transition to eliminate hard edges */

  mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 95%);

  -webkit-mask-image: radial-gradient(ellipse 100% 100% at 50% 0%, black 30%, transparent 95%);

}



.hero-video {

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  object-fit: cover;

  z-index: 1;

}



.hero-overlay {

  position: absolute;

  top: 0;

  left: 0;

  width: 100%;

  height: 100%;

  background: transparent;

  z-index: 2;

}



.page-hero-v2 {

  text-align: center;

  position: relative;

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

  background: rgba(255, 255, 255, 0.2);

  backdrop-filter: blur(12px);

  color: #fff;

  border: 1px solid rgba(255, 255, 255, 0.4);

  border-radius: 100px;

  font-size: 0.7rem;

  font-weight: 600;

  margin-bottom: 16px;

  letter-spacing: 0.2em;

  text-transform: uppercase;

  animation: fadeInDown 1s ease-out;

}



.page-hero-v2 h1 {

  font-size: 3.8rem;

  font-weight: 800;

  color: #fff;

  margin-bottom: 12px;

  letter-spacing: 0.1em;

  /* Tighter, sharper shadow */

  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);

  animation: fadeInUp 1s ease-out 0.2s both;

}



.main-desc {

  font-size: 1.4rem;

  color: #fff;

  font-weight: 300;

  letter-spacing: 0.4em;

  margin-left: 0.4em;

  /* Tighter, sharper shadow */

  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.5);

  animation: fadeInUp 1s ease-out 0.4s both;

}



@keyframes fadeInUp {

  from { opacity: 0; transform: translateY(30px); }

  to { opacity: 1; transform: translateY(0); }

}



@keyframes fadeInDown {

  from { opacity: 0; transform: translateY(-30px); }

  to { opacity: 1; transform: translateY(0); }

}



.intro-container {

  max-width: 1000px;

  margin: 0 auto;

  padding: 80px 0 120px;

}



.intro-content-card {

  position: relative;

  background: white;

  padding: 80px;

  border-radius: 24px;

  box-shadow: 0 40px 100px rgba(15, 23, 42, 0.05);

  border: 1px solid rgba(15, 23, 42, 0.05);

}



.intro-content {

  position: relative;

  font-size: 1.15rem;

  line-height: 2.2;

  color: #475569;

}



.quote-icon {

  font-family: serif;

  font-size: 8rem;

  color: #f1f5f9;

  position: absolute;

  line-height: 1;

  z-index: 0;

  user-select: none;

}



.quote-icon:not(.bottom) {

  top: -40px;

  left: -20px;

}



.quote-icon.bottom {

  bottom: -60px;

  right: -20px;

}



.intro-paragraph {

  position: relative;

  z-index: 1;

  margin-bottom: 32px;

  text-indent: 2.4em;

  text-align: justify;

}



.content-decoration {

  position: absolute;

  width: 120px;

  height: 120px;

  z-index: -1;

  opacity: 0.5;

}



.content-decoration.top-left {

  top: -20px;

  left: -20px;

  border-top: 4px solid #a5b4fc;

  border-left: 4px solid #a5b4fc;

  border-radius: 24px 0 0 0;

}



.content-decoration.bottom-right {

  bottom: -20px;

  right: -20px;

  border-bottom: 4px solid #ffd700;

  border-right: 4px solid #ffd700;

  border-radius: 0 0 24px 0;

}



@media (max-width: 1024px) {

  .intro-container {

    padding: 60px 24px;

  }

  .intro-content-card {

    padding: 60px 40px;

  }

}



@media (max-width: 768px) {

  .page-hero-v2 h1 { font-size: 2.5rem; }

  .intro-content-card {

    padding: 40px 24px;

  }

  .intro-content {

    font-size: 1.05rem;

  }

  .quote-icon {

    font-size: 5rem;

  }

}



</style>
