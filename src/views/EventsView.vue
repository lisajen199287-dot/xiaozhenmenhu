<script setup lang="ts">

import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

interface EventItem {
  id: number;
  name: string;
  title?: string; // Backend uses title
  desc: string;
  description?: string; // Backend
  tag: string;
  deadline?: string;
  location?: string;
  duration?: string;
  category: string;
  icon?: string;
  badge?: string;
}

interface EventCategory {
  title: string;
  badge: string;
  icon: string;
  events: EventItem[];
}

const router = useRouter()
const eventCategories = ref<EventCategory[]>([
  {
    title: '专享优惠与激励计划',
    badge: 'Limited Time',
    icon: 'fas fa-tags',
    events: []
  },
  {
    title: '行业峰会与创新沙龙',
    badge: 'Networking',
    icon: 'fas fa-microphone-alt',
    events: []
  },
  {
    title: '智库培训与人才培养',
    badge: 'Learning',
    icon: 'fas fa-graduation-cap',
    events: []
  }
])

const fetchEvents = async () => {
    try {
        const res = await fetch('/api/events')
        if (res.ok) {
            const data: EventItem[] = await res.json()
            
            // Clear existing and distribute
            eventCategories.value.forEach(cat => cat.events = [])
            
            data.forEach(ev => {
                // Normalize fields
                ev.name = ev.title || ev.name
                ev.desc = (ev.description || ev.desc || '').replace(/<[^>]*>/g, '').substring(0, 100)
                
                let category = ev.category || '其它专题'
                let targetCat = eventCategories.value.find(c => c.title.includes(category.substring(0,2)))
                
                if (targetCat) {
                    targetCat.events.push(ev)
                } else {
                    // Default to first if no match
                    if (eventCategories.value[0]) {
                        eventCategories.value[0].events.push(ev)
                    }
                }
            })
        }
    } catch (e) {
        console.error('Failed to fetch events:', e)
    }
}

const goToDetail = (id: number) => {
    router.push(`/events/${id}`)
}

onMounted(fetchEvents)

</script>



<template>

  <div class="events-page">

    <!-- Full-bleed Hero Section -->

    <header class="page-hero-v2 events-hero">

      <div class="hero-content">

        <div class="hero-badge-v2">Live Activities</div>

        <h1>平台最新动态</h1>

        <p class="main-desc">汇集政策红利、行业智库与实战沙龙，助您在智能革新的浪潮中把握先机</p>

      </div>

    </header>



    <div class="wrapper">

      <div class="events-layout">

        <div v-for="cat in eventCategories" :key="cat.title" class="event-category-section">

          <div class="category-header">

            <div class="cat-title-row">

              <span class="cat-icon"><i :class="cat.icon"></i></span>

              <h2>{{ cat.title }}</h2>

              <span class="cat-badge-text">{{ cat.badge }}</span>

            </div>

            <div class="h-line"></div>

          </div>



          <div class="event-items-grid">

            <div v-for="ev in cat.events" :key="ev.id" class="event-v4-card clickable" @click="goToDetail(ev.id)">

              <div class="ev-card-top">

                <span class="ev-status-tag">{{ ev.tag }}</span>

                <button class="btn-share"><i class="far fa-share-square"></i></button>

              </div>

              <h3>{{ ev.name }}</h3>

              <p>{{ ev.desc }}</p>

              

              <div class="ev-card-footer">

                <div class="ev-meta" v-if="ev.deadline">

                  <i class="far fa-clock"></i> 截止日期: {{ ev.deadline }}

                </div>

                <div class="ev-meta" v-if="ev.location">

                  <i class="fas fa-map-marker-alt"></i> 活动地点: {{ ev.location }}

                </div>

                <div class="ev-meta" v-if="ev.duration">

                  <i class="fas fa-hourglass-start"></i> 课程周期: {{ ev.duration }}

                </div>

                <button class="btn-register">立即参与 <i class="fas fa-arrow-right"></i></button>

              </div>

            </div>

          </div>

        </div>

      </div>



      <!-- Partnership CTA -->

      <section class="partnership-box">

        <div class="p-content">

          <div class="p-text">

            <h2>携手共创，定义标准</h2>

            <p>如果您有优质的行业案例或技术方案，欢迎联手举办专题沙龙。我们将为您提供场地、流量与专家智力支持</p>

          </div>

          <button class="btn-p-action">申请联合发布</button>

        </div>

      </section>

    </div>

  </div>

</template>



<style scoped>

.events-page {

  padding-top: 72px;

  background: #fdfdfe;

}



.page-hero-v2 {

  position: relative;

  width: 100%;

  padding: 120px 0 100px;

  text-align: center;

  overflow: hidden;

  background: #0f172a;

}



.events-hero {

  background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('@/assets/images/events-bg.jpg');

  background-size: cover;

  background-position: center;

}



.page-hero-v2::after {

  content: '';

  position: absolute;

  top: 0; left: 0; right: 0; bottom: 0;

  background-image: 

    radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0),

    linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),

    linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);

  background-size: 40px 40px, 80px 80px, 80px 80px;

  pointer-events: none;

}



.hero-content {

  position: relative;

  z-index: 10;

  max-width: 1400px;

  margin: 0 auto;

  padding: 0 80px;

}



.hero-badge-v2 {

  display: inline-block;

  padding: 6px 16px;

  background: rgba(255, 255, 255, 0.05);

  backdrop-filter: blur(8px);

  color: #818cf8;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 4px;

  font-size: 0.75rem;

  font-weight: 800;

  margin-bottom: 32px;

  letter-spacing: 0.15em;

  text-transform: uppercase;

}



.page-hero-v2 h1 {

  font-size: 3.8rem;

  font-weight: 900;

  color: white;

  margin-bottom: 24px;

  letter-spacing: -0.02em;

}



.main-desc {

  font-size: 1.2rem;

  color: rgba(255, 255, 255, 0.6);

  max-width: 800px;

  margin: 0 auto;

  line-height: 1.6;

}



/* Events Layout */

.events-layout {

  padding: 100px 0;

}



.event-category-section {

  margin-bottom: 80px;

}



.category-header {

  margin-bottom: 40px;

  display: flex;

  align-items: center;

  gap: 24px;

}



.cat-title-row {

  display: flex;

  align-items: center;

  gap: 16px;

  white-space: nowrap;

}



.cat-icon {

  width: 48px;

  height: 48px;

  background: #f1f5f9;

  color: #4f46e5;

  border-radius: 4px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.25rem;

}



.cat-title-row h2 {

  font-size: 1.6rem;

  font-weight: 850;

  color: #1e293b;

}



.cat-badge-text {

  font-size: 0.7rem;

  font-weight: 800;

  color: #94a3b8;

  text-transform: uppercase;

  letter-spacing: 0.1em;

  background: #f8fafc;

  padding: 4px 10px;

  border-radius: 2px;

}



.h-line {

  flex: 1;

  height: 1px;

  background: #f1f5f9;

}



.event-items-grid {

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 30px;

}



.event-v4-card {

  background: white;

  border: 1px solid #f1f5f9;

  padding: 40px;

  border-radius: 8px;

  display: flex;

  flex-direction: column;

  transition: all 0.3s;

}

.event-v4-card.clickable {
  cursor: pointer;
}



.event-v4-card:hover {

  transform: translateY(-8px);

  box-shadow: 0 20px 40px rgba(0,0,0,0.04);

  border-color: #4f46e520;

}



.ev-card-top {

  display: flex;

  justify-content: space-between;

  align-items: center;

  margin-bottom: 24px;

}



.ev-status-tag {

  background: #eef2ff;

  color: #4f46e5;

  padding: 4px 12px;

  border-radius: 2px;

  font-size: 0.8rem;

  font-weight: 800;

}



.btn-share {

  background: none;

  border: none;

  color: #94a3b8;

  cursor: pointer;

  font-size: 1rem;

  transition: color 0.2s;

}



.btn-share:hover { color: #4f46e5; }



.event-v4-card h3 {

  font-size: 1.35rem;

  font-weight: 850;

  margin-bottom: 16px;

  color: #0f172a;

  line-height: 1.4;

}



.event-v4-card p {

  font-size: 0.95rem;

  color: #64748b;

  line-height: 1.6;

  margin-bottom: 32px;

  flex: 1;

}



.ev-card-footer {

  padding-top: 24px;

  border-top: 1px dashed #e2e8f0;

}



.ev-meta {

  font-size: 0.85rem;

  color: #94a3b8;

  margin-bottom: 16px;

  display: flex;

  align-items: center;

  gap: 8px;

}



.btn-register {

  width: 100%;

  background: #0f172a;

  color: white;

  border: none;

  padding: 14px;

  border-radius: 4px;

  font-weight: 700;

  cursor: pointer;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 8px;

  transition: all 0.2s;

}



.btn-register:hover {

  background: #4f46e5;

  transform: translateY(-2px);

}



/* Partnership Box */

.partnership-box {

  background: #0f172a;

  border-radius: 8px;

  padding: 60px 80px;

  margin-bottom: 120px;

  color: white;

}



.p-content {

  display: flex;

  align-items: center;

  justify-content: space-between;

  gap: 60px;

}



.p-text h2 {

  font-size: 2rem;

  font-weight: 850;

  margin-bottom: 16px;

}



.p-text p {

  font-size: 1.1rem;

  color: rgba(255,255,255,0.6);

  line-height: 1.6;

}



.btn-p-action {

  background: white;

  color: #0f172a;

  border: none;

  padding: 16px 40px;

  border-radius: 4px;

  font-weight: 800;

  white-space: nowrap;

  cursor: pointer;

  transition: all 0.2s;

}



.btn-p-action:hover {

  transform: scale(1.05);

}



@media (max-width: 1100px) {

  .event-items-grid { grid-template-columns: repeat(2, 1fr); }

  .p-content { flex-direction: column; text-align: center; gap: 40px; }

}



@media (max-width: 768px) {

  .event-items-grid { grid-template-columns: 1fr; }

  .page-hero-v2 h1 { font-size: 2.5rem; }

}

</style>