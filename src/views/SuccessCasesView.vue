<script setup lang="ts">
import { useAdminStore } from "@/utils/adminStore";
import { onMounted } from "vue";
import * as newApi from "@/api/newApi/index";
import { ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

// const { cases } = useAdminStore();
const cases: any = ref([]);

const init = async () => {
  const res = await newApi.apiAdmCases();
  res.forEach((item: any) => {
    item.stats = JSON.parse(item.stats);
  });
  cases.value = res;
};

const handleNewsClick = (id) => {
  router.push("/news/" + id);
};
onMounted(() => {
  init();
});
</script>



<template>
  <div class="cases-page">
    <header class="cases-hero">
      <div class="hero-content">
        <h1>客户成功案例</h1>

        <p class="main-desc">
          见证 AI 力量在千行百业的真实落地，从业务增长到效能飞跃。
        </p>
      </div>
    </header>

    <div class="wrapper">
      <section class="content-section case-studies">
        <div class="section-title-wrapper">
          <h2 class="section-title-v2">客户案例</h2>
          <p class="section-subtitle">全栈能力，支撑海量垂直行业需求</p>
        </div>

        <div class="case-grid">
          <div class="case-card" @click="handleNewsClick(12)">
            <div class="case-img">
              <img
                class="img_icon"
                src="@/assets/images/token/icon4.png"
                alt=""
              />
            </div>
            <div class="case-content">
              仓山区互联网小镇数智化服务平台×中科玥游｜福州短剧企业，如何通过Seedance2.0
              API实现规模化高效创作？
            </div>
            <div class="tag_Division">
              <div class="case-tag">短剧行业</div>
            </div>
            <div class="company_box">
              <div class="case-company">福州中科玥游信息科技有限公司</div>
              <img
                class="logo_icon"
                src="@/assets/images/token/logo1.png"
                alt=""
              />
            </div>
          </div>

          <div class="case-card" @click="handleNewsClick(14)">
            <div class="case-img">
              <img
                class="img_icon"
                src="@/assets/images/token/icon2.png"
                alt=""
              />
            </div>
            <div class="case-content">
              仓山区互联网小镇数智化服务平台×福建广电网络｜AIAPI赋能，筑牢智慧广电政企服务新标杆
            </div>
            <div class="tag_Division">
              <div class="case-tag">广播电视行业</div>
            </div>
            <div class="company_box">
              <div class="case-company">福建广电网络政企</div>
              <img
                class="logo_icon"
                src="@/assets/images/token/logo2.png"
                alt=""
              />
            </div>
          </div>

          <div class="case-card" @click="handleNewsClick(13)">
            <div class="case-img">
              <img
                class="img_icon"
                src="@/assets/images/token/icon3.png"
                alt=""
              />
            </div>
            <div class="case-content">
              仓山区互联网小镇数智化服务平台×福州市大吕网络科技｜AI能力精细化运营，让游戏研发多场景提效100%
            </div>
            <div class="tag_Division">
              <div class="case-tag">游戏行业</div>
            </div>
            <div class="company_box">
              <div class="case-company">福州市大吕网络科技有限公司</div>
              <img
                class="logo_icon"
                src="@/assets/images/token/logo3.png"
                alt=""
              />
            </div>
          </div>

          <div class="case-card" @click="handleNewsClick(15)">
            <div class="case-img">
              <img
                class="img_icon"
                src="@/assets/images/token/icon1.png"
                alt=""
              />
            </div>
            <div class="case-content">
              仓山区互联网小镇数智化服务平台×武汉宜鼎众城｜武汉TK电商机构，如何通过AIAPI实现墨镜品类高效增长？
            </div>
            <div class="tag_Division">
              <div class="case-tag">电商行业</div>
            </div>
            <div class="company_box">
              <div class="case-company">武汉宜鼎众城传媒有限公司</div>
              <img
                class="logo_icon"
                src="@/assets/images/token/logo4.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section class="cases-grid">
        <div
          v-for="item in cases"
          :key="item.id"
          class="case-card-v4"
          @click="$router.push('/cases/' + item.id)"
        >
          <div class="case-image">
            <img :src="item.backgroundImage" :alt="item.client" />

            <span class="case-cat-tag">{{ item.category }}</span>
          </div>

          <div class="case-body">
            <h3>{{ item.client }}：{{ item.bigTitle }}</h3>

            <p>{{ item.desc }}</p>

            <div class="case-stats-row">
              <div
                v-for="stat in item.stats"
                :key="stat.label"
                class="stat-item"
              >
                <span class="stat-val">{{ stat.value }}</span>

                <span class="stat-lab">{{ stat.label }}</span>
              </div>
            </div>

            <button
              class="btn-case-detail"
              @click="$router.push('/cases/' + item.id)"
            >
              查看详情 <i class="fas fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </section>

      <!-- CTA -->

      <section class="cases-cta">
        <div class="cta-inner">
          <h2>准备好开启您的智能化转型之旅了吗？</h2>

          <p>加入 500+ 先锋企业，共同定义 AI 时代的新质生产力。</p>

          <div class="cta-btns">
            <button class="btn-primary-v2">立即咨询专家</button>

            <button class="btn-outline-v2">获取方案白皮书</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>



<style scoped>
.cases-page {
  background: #fdfdfe;
}

.cases-hero {
  background: linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.55)),
    url("@/assets/images/case-bg.png");

  background-size: cover;

  background-position: center;

  padding: 180px 0 120px;

  text-align: center;

  color: white;

  margin-bottom: 30px;
}

.hero-content {
  max-width: 800px;

  margin: 0 auto;
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

.cases-hero h1 {
  font-size: 3.5rem;

  font-weight: 900;

  margin-bottom: 20px;

  letter-spacing: -0.02em;

  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
}

.main-desc {
  font-size: 1.25rem;

  color: rgba(255, 255, 255, 0.95);

  line-height: 1.6;

  font-weight: 600;

  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.cases-grid {
  padding: 40px 0;

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 40px;
}

.case-card-v4 {
  background: white;

  border: 1px solid #f1f5f9;

  border-radius: 8px;

  overflow: hidden;
  transition: all 0.3s;
  cursor: pointer;
}

.case-card-v4:hover {
  transform: translateY(-8px);

  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.06);

  border-color: #4f46e530;
}

.case-image {
  position: relative;

  height: 280px;
}

.case-image img {
  width: 100%;

  height: 100%;

  object-fit: cover;
}

.case-cat-tag {
  position: absolute;

  top: 20px;

  left: 20px;

  background: rgba(79, 70, 229, 0.9);

  color: white;

  padding: 6px 16px;

  border-radius: 4px;

  font-size: 0.8rem;

  font-weight: 800;

  backdrop-filter: blur(4px);
}

.case-body {
  padding: 40px;
}

.case-body h3 {
  font-size: 1.4rem;

  font-weight: 850;

  margin-bottom: 16px;

  color: #0f172a;
}

.case-body p {
  font-size: 1rem;

  color: #64748b;

  line-height: 1.6;

  margin-bottom: 32px;
}

.case-stats-row {
  display: flex;

  gap: 40px;

  margin-bottom: 32px;

  padding: 20px 0;

  border-top: 1px solid #f1f5f9;
}

.stat-item {
  display: flex;

  flex-direction: column;
}

.stat-val {
  font-size: 1.8rem;

  font-weight: 900;

  color: #4f46e5;
}

.stat-lab {
  font-size: 0.85rem;

  font-weight: 700;

  color: #94a3b8;

  text-transform: uppercase;
}

.btn-case-detail {
  background: none;

  border: 1px solid #e2e8f0;

  padding: 12px 24px;

  border-radius: 4px;

  font-weight: 700;

  cursor: pointer;

  transition: all 0.2s;
}

.btn-case-detail:hover {
  background: #f8fafc;

  border-color: #4f46e5;

  color: #4f46e5;
}

/* CTA */

.cases-cta {
  background: #0f172a;

  border-radius: 8px;

  padding: 80px;

  margin-bottom: 120px;

  text-align: center;

  color: white;

  position: relative;

  overflow: hidden;
}

.cases-cta::before {
  content: "";

  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: radial-gradient(
    circle at 50% 50%,
    rgba(79, 70, 229, 0.15) 0%,
    transparent 70%
  );
}

.cta-inner {
  position: relative;

  z-index: 1;
}

.cta-inner h2 {
  font-size: 2.2rem;

  font-weight: 850;

  margin-bottom: 20px;
}

.cta-inner p {
  font-size: 1.2rem;

  color: rgba(255, 255, 255, 0.6);

  margin-bottom: 40px;
}

.cta-btns {
  display: flex;

  justify-content: center;

  gap: 20px;
}

.btn-outline-v2 {
  background: none;

  border: 1px solid rgba(255, 255, 255, 0.2);

  color: white;

  padding: 16px 32px;

  border-radius: 4px;

  font-weight: 800;

  cursor: pointer;
}

@media (max-width: 900px) {
  .cases-grid {
    grid-template-columns: 1fr;
  }

  .cta-btns {
    flex-direction: column;
  }
}



.case-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  padding: 0;
  margin-top: 20px;
}

.case-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #f1f5f9;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  cursor: pointer;
}

.case-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #3b82f6;
}

.case-img {
  width: 100%;
  height: 174px;
  aspect-ratio: 1;
  overflow: hidden;
}

.case-img img {
  width: 100%;
  height: 174px;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.case-content {
  font-size: 1rem;
  font-weight: 700;
  color: #0f172a;
  margin: 16px;
  line-height: 1.4;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
}

.case-card:hover .case-img img {
  transform: scale(1.05);
}

.case-tag {
  width: fit-content;
  font-size: 0.8rem;
  color: #9ac059;
  background: #f1fadf;
  padding: 2px 10px;
  border-radius: 4px;
  margin: 0 0 8px;
}

.tag_Division {
  border-bottom: 1px dashed #9ac059;
  margin: 0 16px 8px;
}

.company_box {
  display: flex;
  align-items: center;
  margin: 0 16px 8px;
  justify-content: space-between;
}

.company_box .case-company {
  font-size: 0.8rem;
  font-weight: 700;
  color: #666;
}

.company_box .logo_icon {
  height: 24px;
}

@media (max-width: 1024px) {
  .case-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .case-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>
