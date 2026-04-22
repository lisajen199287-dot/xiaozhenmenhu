<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import * as newApi from "@/api/newApi/index";

const router = useRouter();

const formVisible = ref(false);
const submitting = ref(false);
const form = ref({ company: "", contact: "", phone: "", demand: "" });

const Application = () => {
  router.push("/news/" + 3);
};
const Connect = () => {
  formVisible.value = true;
};

const handleSubmit = async () => {
  if (!form.value.contact || !form.value.phone) {
    ElMessage.warning("请填写联系人与手机号");
    return;
  }
  submitting.value = true;
  try {
    await newApi.apiAdmSolutionRequests(
      JSON.stringify({ ...form.value, solutionName: "模型与算力" })
    );
    ElMessage.success("提交成功，我们会尽快联系您");
    form.value = { company: "", contact: "", phone: "", demand: "" };
    formVisible.value = false;
  } catch {
    ElMessage.error("提交失败，请重试");
  } finally {
    submitting.value = false;
  }
};
</script>



<template>

  <div class="infra-page">

    <!-- new Header Section -->

    <header class="new-hero-section">

      <video autoplay muted loop playsinline class="hero-video">

        <source src="/static/videos/mirror-bg-video.mp4" type="video/mp4">

      </video>

      <div class="hero-content">

        <h1 class="hero-title">普惠算力，灵活调度</h1>

        <p class="hero-subtitle">AI算力聚合平台</p>

        <div class="hero-links">

          <a href="/login">接入</a>

          <span class="divider">|</span>

          <a href="#">申请算力补贴</a>

          <span class="divider">|</span>
          <a href="/docs.html" class="text">API文档</a>
        </div>

      </div>

    </header>



    <!-- Recommended Models Section -->

    <div class="wrapper">

    <section class="content-section recommended-models">

      <h2 class="section-title-v2">推荐模型</h2>

      <div class="models-grid">

        <!-- Model Card 1 -->

        <div class="model-card">

          <div class="model-tag">[视频生成]</div>

          <a href="https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&modelId=doubao-seedance-2-0-260128&tab=GenVideo" target="_blank" class="model-img video-gen" style="display: block;">

             <img src="@/assets/images/doubao-seedance.png" alt="Doubao-Seedance-2.0" class="model-inner-img">

          </a>

          <h3>Doubao-Seedance-2.0</h3>

          <p>豆包多模态创作视频模型，音视图文均可生成</p>

          <a href="https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&modelId=doubao-seedance-2-0-260128&tab=GenVideo" target="_blank" class="details-link">[详情]</a>

        </div>

        <!-- Model Card 2 -->

        <div class="model-card">

          <div class="model-tag">[图片生成]</div>

          <a href="https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&tab=GenImage" target="_blank" class="model-img image-gen" style="display: block;">

             <img src="@/assets/images/doubao-seedream.png" alt="Doubao-Seedream-5.0" class="model-inner-img">

          </a>

          <h3>Doubao-Seedream-5.0</h3>

          <p>豆包图像创作模型，联网检索，海量世界知识</p>

          <a href="https://exp.volcengine.com/ark/vision?mode=vision&model=doubao-seedream-4-5-251128&tab=GenImage" target="_blank" class="details-link">[详情]</a>

        </div>

        <!-- Model Card 3 -->

        <div class="model-card">

          <div class="model-tag">[多模态]</div>

          <a href="https://exp.volcengine.com/ark?_vtm_=0.0.c70961.d701978.0" target="_blank" class="model-img multimodal" style="display: block;">

             <img src="@/assets/images/doubao-seed-pro.png" alt="Doubao-Seed-2.0-pro" class="model-inner-img">

          </a>

          <h3>Doubao-Seed-2.0-pro</h3>

          <p>豆包 Agent 通用模型，复杂任务规划与执行能力全方位跃迁</p>

          <a href="https://exp.volcengine.com/ark?_vtm_=0.0.c70961.d701978.0" target="_blank" class="details-link">[详情]</a>

        </div>

      </div>

    </section>



    <!-- Smart Infrastructure Section -->

    <section class="content-section smart-infra-v2">

      <div class="section-title-wrapper">

        <h2 class="section-title-v2">智能基建</h2>

        <p class="section-subtitle">全栈能力，支撑海量垂直行业需求</p>

      </div>

      <div class="infra-grid-v2">

        <div class="infra-card-v2">

          <div class="card-glass-bg"></div>

          <div class="card-icon-floating"><i class="fas fa-microchip"></i></div>

          <h3>GPU算力服务</h3>

          <p>GPU 算力的弹性计算服务，可高效支撑生成式 AI、自动驾驶等多场景算力需求</p>

        </div>

        <div class="infra-card-v2">

          <div class="card-glass-bg"></div>

          <div class="card-icon-floating"><i class="fas fa-server"></i></div>

          <h3>CPU算力服务</h3>

          <p>安全稳定、可弹性伸缩的云计算服务，提供CPU 为主的通用算力</p>

        </div>

        <div class="infra-card-v2">

          <div class="card-glass-bg"></div>

          <div class="card-icon-floating"><i class="fas fa-network-wired"></i></div>

          <h3>CDN内容分发网络</h3>

          <p>提供通用加速与游戏加速两大场景化解决方案，按需选择更适配</p>

        </div>

        <div class="infra-card-v2">

          <div class="card-glass-bg"></div>

          <div class="card-icon-floating"><i class="fas fa-cube"></i></div>

          <h3>AICC可信空间</h3>

          <p>安全可信的 AI 运行环境，保障数据与模型全链路安全</p>

        </div>

      </div>

    </section>



      <!-- Security Architecture (Replaces Model Square) -->

      <section id="security" class="content-section security-section-v2">

        <div class="security-inner">

          <div class="section-header">

            <h2 class="section-title-v2">金融级安全架构</h2>

            <p class="section-desc-v2">全链路数据加密与隔离，通过等保三级认证</p>

          </div>

          <div class="security-grid-v2">

            <div class="sec-card-v2">

              <div class="sec-icon-circle"><i class="fas fa-shield-alt"></i></div>

              <div class="sec-content-v2">

                <h3>数据不出域</h3>

                <p>基于 AICC 可信数据空间，确保训练数据与模型权重在本地闭环流转，物理隔离公网</p>

              </div>

            </div>

            <div class="sec-card-v2">

              <div class="sec-icon-circle blue"><i class="fas fa-lock"></i></div>

              <div class="sec-content-v2">

                <h3>模型防火墙</h3>

                <p>内置输入输出过滤机制，自动拦截敏感词与恶意注入攻击，保障生成内容合规</p>

              </div>

            </div>

            <div class="sec-card-v2">

              <div class="sec-icon-circle green"><i class="fas fa-user-secret"></i></div>

              <div class="sec-content-v2">

                <h3>隐私计算</h3>

                <p>支持联邦学习与多方安全计算，在不共享原始数据的前提下实现联合建模</p>

              </div>

            </div>

            <div class="sec-card-v2">

              <div class="sec-icon-circle purple"><i class="fas fa-server"></i></div>

              <div class="sec-content-v2">

                <h3>专属云部署</h3>

                <p>提供独占物理机群，资源完全物理隔离，避免多租户环境下的资源争抢与数据泄露风险</p>

              </div>

            </div>

          </div>

        </div>

      </section>







    </div>

    <!-- 接入咨询弹窗 -->
    <el-dialog v-model="formVisible" width="480px" :close-on-click-modal="false" :show-close="true" class="consult-dialog">
      <form class="consult-form" @submit.prevent="handleSubmit">
        <div class="form-header-minimal">
          <h3>接入咨询</h3>
          <p>请留下您的联系方式</p>
        </div>
        <div class="form-group">
          <label>企业/品牌名称</label>
          <input v-model="form.company" type="text" placeholder="输入企业主体名称" />
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>您的姓名 <span class="required">*</span></label>
            <input v-model="form.contact" type="text" placeholder="怎么称呼" required />
          </div>
          <div class="form-group">
            <label>联系电话 <span class="required">*</span></label>
            <input v-model="form.phone" type="text" placeholder="用于接收方案" required />
          </div>
        </div>
        <div class="form-group">
          <label>核心诉求描述</label>
          <textarea v-model="form.demand" rows="3" placeholder="请描述您的需求..."></textarea>
        </div>
        <button type="submit" class="btn-submit" :disabled="submitting">
          {{ submitting ? '信息加密上传..' : '提交需求' }}
        </button>
        <p class="privacy-note"><i class="fas fa-lock"></i> 信息已采用端到端加密保护</p>
      </form>
    </el-dialog>
  </div>

</template>



<style scoped>

.infra-page {

  background: #fdfdfe;

  min-height: 100vh;

}



.page-hero-v2 {

  position: relative;

  width: 100%;

  padding: 120px 0 100px;

  text-align: center;

  overflow: hidden;

  background: #0f172a;

}



.infra-hero {

  background: linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('@/assets/images/infra-bg.jpg');

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

  color: #10b981;

  border: 1px solid rgba(255, 255, 255, 0.1);

  border-radius: 4px;

  font-size: 0.75rem;

  font-weight: 800;

  margin-bottom: 32px;

  letter-spacing: 0.15em;

  text-transform: uppercase;

}



.main-title {

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



.content-section {

  margin: 60px 0 100px;

}



.section-header {

  margin-bottom: 48px;

}



.section-title-v2 {

  font-size: 2.2rem;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 12px;

}



.section-desc-v2 {

  font-size: 1.1rem;

  color: #64748b;

}



/* Calculator Card */

.calculator-card {

  background: white;

  border-radius: 8px;

  padding: 60px;

  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.01), 0 20px 40px -5px rgba(0,0,0,0.05);

  border: 1px solid #f1f5f9;

}



.card-header {

  display: flex;

  align-items: center;

  gap: 24px;

  margin-bottom: 60px;

}



.header-icon {

  width: 64px;

  height: 64px;

  background: #4f46e5;

  color: white;

  border-radius: 4px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.8rem;

}



.header-text h2 {

  font-size: 1.8rem;

  font-weight: 800;

  color: #0f172a;

}



.header-text p {

  color: #64748b;

  font-size: 1.1rem;

}



.calc-content {

  display: grid;

  grid-template-columns: 1fr 380px;

  gap: 80px;

}



.input-group {

  margin-bottom: 40px;

}



.label-row {

  display: flex;

  justify-content: space-between;

  margin-bottom: 20px;

}



.label-row label {

  font-weight: 700;

  color: #1e293b;

  font-size: 1rem;

}



.val-display {

  color: #4f46e5;

  font-weight: 800;

  background: #f5f3ff;

  padding: 4px 12px;

  border-radius: 2px;

}



input[type="range"] {

  width: 100%;

  accent-color: #4f46e5;

  height: 8px;

  border-radius: 5px;

}



.calc-result-v2 {

  background: #0f172a;

  color: white;

  border-radius: 6px;

  padding: 40px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  position: relative;

  overflow: hidden;

}



.calc-result-v2::before {

  content: '';

  position: absolute;

  top: -50%;

  left: -50%;

  width: 200%;

  height: 200%;

  background: radial-gradient(circle, rgba(79, 70, 229, 0.15) 0%, transparent 60%);

}



.res-box-inner {

  position: relative;

  z-index: 1;

}



.res-label {

  color: #94a3b8;

  font-size: 0.95rem;

  font-weight: 600;

  margin-bottom: 16px;

}



.res-value {

  font-size: 3.5rem;

  font-weight: 800;

  margin-bottom: 24px;

}



.res-value small {

  font-size: 1.2rem;

  color: #475569;

}



.res-badge {

  display: inline-flex;

  align-items: center;

  gap: 8px;

  background: rgba(16, 185, 129, 0.15);

  color: #10b981;

  padding: 10px 16px;

  border-radius: 2px;

  font-weight: 700;

  font-size: 0.9rem;

}



/* Model Grid */

.model-cards-grid {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 32px;

}



.model-item-card {

  background: white;

  border: 1px solid #f1f5f9;

  padding: 40px;

  border-radius: 8px;

  display: flex;

  gap: 32px;

  transition: all 0.3s;

}



.model-item-card:hover {

  transform: translateY(-8px);

  box-shadow: 0 15px 30px rgba(0,0,0,0.05);

  border-color: #4f46e550;

}



.model-icon-box {

  width: 80px;

  height: 80px;

  border-radius: 4px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 2rem;

  flex-shrink: 0;

}



.model-tag {

  font-size: 0.75rem;

  font-weight: 800;

  text-transform: uppercase;

  letter-spacing: 0.05em;

  color: #94a3b8;

  margin-bottom: 8px;

}



.model-item-card h3 {

  font-size: 1.5rem;

  font-weight: 750;

  color: #0f172a;

  margin-bottom: 12px;

}



.model-item-card p {

  color: #64748b;

  line-height: 1.6;

  margin-bottom: 24px;

}



.btn-text-link {

  background: none;

  border: none;

  color: #4f46e5;

  font-weight: 700;

  cursor: pointer;

  display: flex;

  align-items: center;

  gap: 8px;

  transition: gap 0.2s;

}



.btn-text-link:hover {

  gap: 12px;

}





/* Security Grid */

.security-grid {

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 32px;

}



.sec-card {

  background: white;

  padding: 32px;

  border-radius: 8px;

  border: 1px solid #f1f5f9;

  transition: all 0.3s;

}



.sec-card:hover {

  transform: translateY(-5px);

  box-shadow: 0 10px 30px rgba(0,0,0,0.05);

  border-color: #10b981;

}



.sec-icon {

  width: 56px;

  height: 56px;

  background: rgba(16, 185, 129, 0.1);

  color: #10b981;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;

  margin-bottom: 20px;

}



.sec-card h3 {

  font-size: 1.15rem;

  font-weight: 700;

  margin-bottom: 12px;

  color: #0f172a;

}



.sec-card p {

  font-size: 0.9rem;

  color: #64748b;

  line-height: 1.6;

}



/* =========================================

   Smart Infra V2 Redesign

   ========================================= */

.smart-infra-v2 {

  margin: 80px 0;

}



.section-title-wrapper {

  margin-bottom: 48px;

}



.section-subtitle {

  color: #64748b;

  font-size: 1.1rem;

  margin-top: 8px;

}



.infra-grid-v2 {

  display: grid;

  grid-template-columns: repeat(4, 1fr);

  gap: 24px;

}



.infra-card-v2 {

  position: relative;

  padding: 40px 32px;

  background: white;

  border-radius: 20px;

  border: 1px solid #f1f5f9;

  overflow: hidden;

  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

}



.infra-card-v2:hover {

  transform: translateY(-10px);

  box-shadow: 0 20px 40px rgba(15, 23, 42, 0.08);

  border-color: #3b82f650;

}



.card-icon-floating {

  width: 56px;

  height: 56px;

  background: #f1f5ff;

  color: #3b82f6;

  border-radius: 12px;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.5rem;

  margin-bottom: 24px;

  transition: all 0.3s;

}



.infra-card-v2:hover .card-icon-floating {

  background: #3b82f6;

  color: white;

  transform: rotate(-5deg) scale(1.1);

}



.infra-card-v2 h3 {

  font-size: 1.25rem;

  font-weight: 800;

  color: #0f172a;

  margin-bottom: 16px;

}



.infra-card-v2 p {

  font-size: 0.95rem;

  color: #64748b;

  line-height: 1.6;

  margin-bottom: 24px;

}



.arrow-link {

  color: #3b82f6;

  text-decoration: none;

  font-weight: 700;

  font-size: 0.9rem;

  display: flex;

  align-items: center;

  gap: 8px;

}



.arrow-link i {

  font-size: 0.75rem;

  transition: transform 0.2s;

}



.arrow-link:hover i {

  transform: translateX(4px);

}



/* =========================================

   Security Section V2 Redesign (Light Theme)

   ========================================= */

.security-section-v2 {

  background: #f0f7ff; /* Very light, crisp blue */

  border-radius: 24px;

  padding: 60px 40px;

  color: #0f172a;

  margin: 80px 0;

  position: relative;

  overflow: hidden;

  border: 1px solid #e1effe;

}



.security-section-v2::before {

  content: '';

  position: absolute;

  top: 0; left: 0; right: 0; bottom: 0;

  background: radial-gradient(circle at bottom left, rgba(59, 130, 246, 0.05), transparent 70%);

  pointer-events: none;

}



.security-inner {

  position: relative;

  z-index: 2;

}



.security-section-v2 .section-title-v2 {

  color: #0f172a;

}



.security-section-v2 .section-desc-v2 {

  color: #64748b;

}



.security-grid-v2 {

  display: grid;

  grid-template-columns: repeat(2, 1fr);

  gap: 32px;

  margin-top: 60px;

}



.sec-card-v2 {

  display: flex;

  gap: 24px;

  background: white;

  padding: 32px;

  border-radius: 16px;

  border: 1px solid #e2e8f0;

  transition: all 0.3s;

  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);

}



.sec-card-v2:hover {

  background: white;

  border-color: #3b82f6;

  transform: translateY(-5px);

  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.08);

}



.sec-icon-circle {

  width: 64px;

  height: 64px;

  background: #f1f5ff;

  color: #3b82f6;

  border-radius: 50%;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 1.4rem;

  flex-shrink: 0;

}



.sec-icon-circle.blue { background: #eff6ff; color: #3b82f6; }

.sec-icon-circle.green { background: #f0fdf4; color: #22c55e; }

.sec-icon-circle.purple { background: #faf5ff; color: #a855f7; }



.sec-content-v2 h3 {

  font-size: 1.2rem;

  font-weight: 800;

  margin-bottom: 12px;

  color: #0f172a;

}



.sec-content-v2 p {

  font-size: 0.95rem;

  color: #64748b;

  line-height: 1.6;

}



.res-icon-box {

  font-size: 1.8rem;

  color: #3b82f6;

}



@media (max-width: 1024px) {

  .security-grid { grid-template-columns: repeat(2, 1fr); }

}



/* Resource Grid */

.resource-cards-grid {

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 32px;

}



.res-item-card {

  background: #f8fafc;

  padding: 40px;

  border-radius: 8px;

  border: 1px solid transparent;

  transition: all 0.3s;

}



.res-item-card:hover {

  background: white;

  border-color: #e2e8f0;

  box-shadow: 0 10px 20px rgba(0,0,0,0.03);

}



.res-top {

  display: flex;

  align-items: center;

  justify-content: space-between;

  margin-bottom: 32px;

}



.res-top i {

  font-size: 1.8rem;

  color: #3b82f6;

}



.res-specs {

  background: white;

  padding: 4px 12px;

  border-radius: 2px;

  font-size: 0.85rem;

  font-weight: 700;

  color: #64748b;

  box-shadow: 0 2px 4px rgba(0,0,0,0.05);

}



.res-item-card h3 {

  font-size: 1.25rem;

  font-weight: 800;

  margin-bottom: 12px;

}



.res-item-card p {

  color: #64748b;

  font-size: 0.95rem;

  margin-bottom: 32px;

}



.res-status {

  display: flex;

  align-items: center;

  gap: 10px;

  font-size: 0.85rem;

  font-weight: 700;

  color: #10b981;

}



.status-dot {

  width: 8px;

  height: 8px;

  background: #10b981;

  border-radius: 50%;

  box-shadow: 0 0 8px rgba(16, 185, 129, 0.5);

}







@media (max-width: 1200px) {

  .calc-content { grid-template-columns: 1fr; gap: 40px; }

  .model-cards-grid { grid-template-columns: 1fr; }

  .resource-cards-grid { grid-template-columns: repeat(2, 1fr); }

}



.new-hero-section {
  padding: 180px 0 120px; /* Matched AppCenterView height */
  background: #ffffff;
  position: relative;
  text-align: center;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Adjust radial gradient for a more subtle transition */
  mask-image: radial-gradient(ellipse 100% 120% at 50% 0%, black 60%, transparent 98%);
  -webkit-mask-image: radial-gradient(ellipse 100% 120% at 50% 0%, black 60%, transparent 98%);
}

.new-hero-section::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100px;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.8));
  z-index: 2;
  pointer-events: none;
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

.hero-content {
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 850;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.6);
  line-height: 1.1;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.95);
  margin-bottom: 30px;
  font-weight: 600;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.hero-links {
  display: flex;
  gap: 12px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 40px rgba(59, 130, 246, 0.1);
}

.hero-links a {
  padding: 12px 32px;
  color: #334155;
  text-decoration: none;
  font-weight: 700;
  transition: all 0.3s;
  border-radius: 30px;
  font-size: 0.95rem;
  cursor: pointer;
}

.hero-links .text:hover {
  background: #ffffff;
  color: #2563eb;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}


.divider {
  display: none; /* Hide divider in the new button design */
}

/* Recommended Models Grid - Premium Cards */
.models-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px; /* Increased gap */
}

.model-card {
  background: white;
  border-radius: 16px; /* Softer corners */
  padding: 24px;
  border: 1px solid #e2e8f0;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.model-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: #3b82f6; /* Blue highlight */
}

.model-tag {
  font-size: 0.8rem;
  font-weight: 700;
  color: #64748b;
  margin-bottom: 16px;
  display: inline-block;
  background: #f1f5f9;
  padding: 4px 10px;
  border-radius: 4px;
}

.model-img {
  width: 100%;
  aspect-ratio: 16/9;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 20px;
  position: relative;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.model-card:hover .model-inner-img {
  transform: scale(1.05); /* Zoom effect */
}

.model-inner-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

/* Image Gen Gradient - Removed since we use real image now */
.image-gen .img-placeholder {
  display: none;
}

/* Thinking Gradient - Removed since we use real image now */
.multimodal .img-placeholder {
  display: none;
}

.model-card h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 8px;
}

.model-card p {
  font-size: 0.95rem;
  color: #64748b;
  line-height: 1.6;
  margin-bottom: 20px;
  min-height: 48px;
}

.details-link {
  color: #2563eb;
  font-size: 0.95rem;
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.details-link::after {
  content: ' \2192';
  transition: transform 0.2s;
}

.details-link:hover { text-decoration: underline; }
.details-link:hover::after { transform: translateX(4px); }

/* Smart Infra Grid - Clean & Technical */
.infra-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.infra-item {
  padding: 24px;
  border-radius: 12px;
  background: #fff;
  border: 1px solid transparent;
  transition: all 0.3s ease;
}

.infra-item:hover {
  background: #f8fafc;
  border-color: #e2e8f0;
  transform: translateY(-2px);
}

.infra-item h3 {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.bullet {
  color: #3b82f6; /* Brighter blue */
  font-size: 1.2rem;
  line-height: 0;
  position: relative;
  top: 1px;
}

.infra-item p {
  font-size: 0.9rem;
  color: #64748b;
  line-height: 1.6;
}

.infra-item a {
  color: #3b82f6;
  text-decoration: none;
  margin-left: 6px;
  font-weight: 500;
  font-size: 0.85rem;
  opacity: 0.8;
  transition: opacity 0.2s;
}

.infra-item a:hover { opacity: 1; text-decoration: underline; }

@media (max-width: 1024px) {
  .models-grid { grid-template-columns: repeat(2, 1fr); }
  .infra-grid { grid-template-columns: repeat(2, 1fr); }
  .infra-grid-v2 { grid-template-columns: repeat(2, 1fr); }
  .security-section-v2 { padding: 40px 30px; }
}

@media (max-width: 768px) {
  .models-grid { grid-template-columns: 1fr; gap: 16px; }
  .infra-grid { grid-template-columns: 1fr; gap: 16px; }
  .infra-grid-v2 { grid-template-columns: 1fr; gap: 16px; }

  .infra-card-v2 {
    padding: 24px;
    display: flex;
    flex-direction: column;
  }

  .card-icon-floating {
    width: 48px;
    height: 48px;
    font-size: 1.25rem;
    margin-bottom: 16px;
  }

  .infra-card-v2 h3 {
    font-size: 1.15rem;
    margin-bottom: 8px;
  }

  .infra-card-v2 p {
    font-size: 0.9rem;
    margin-bottom: 0;
  }

  .security-grid-v2 { grid-template-columns: 1fr; gap: 16px; margin-top: 32px; }
  .security-section-v2 { padding: 40px 20px; border-radius: 16px; margin: 40px 0; }
  .sec-card-v2 { padding: 20px; gap: 16px; flex-direction: column; align-items: flex-start; }
  .sec-icon-circle { width: 48px; height: 48px; font-size: 1.1rem; margin-bottom: 0px; }
  .smart-infra-v2 { margin: 60px 0; }
  .hero-links { flex-wrap: wrap; justify-content: center; }
  .hero-title { font-size: 2rem; }
  .section-title-v2 { font-size: 1.6rem; }
}

.form-header-minimal {
  margin-bottom: 28px;
}
.form-header-minimal h3 {
  font-size: 1.5rem;
  color: #0f172a;
  margin-bottom: 6px;
  font-weight: 800;
}
.form-header-minimal p {
  color: #64748b;
  font-size: 0.95rem;
}
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.form-group {
  margin-bottom: 20px;
}
.form-group label {
  display: block;
  font-weight: 700;
  color: #334155;
  margin-bottom: 8px;
  font-size: 0.9rem;
}
.required {
  color: #ef4444;
}
.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}
.form-group input:focus,
.form-group textarea:focus {
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}
.btn-submit {
  width: 100%;
  padding: 16px;
  background: linear-gradient(135deg, #4f46e5, #3b82f6);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.05rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 8px 20px rgba(79, 70, 229, 0.2);
}
.btn-submit:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 12px 24px rgba(79, 70, 229, 0.3);
}
.btn-submit:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.privacy-note {
  text-align: center;
  margin-top: 14px;
  font-size: 0.85rem;
  color: #94a3b8;
}
.privacy-note i {
  color: #10b981;
  margin-right: 4px;
}
</style>