<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="privacy-page">
    <NavBar />
    <main class="page-container wrapper">
      <div class="doc-header">
        <h1>隐私保护政策</h1>
        <p class="update-time">最后更新时间：2026年3月1日</p>
      </div>

      <div class="doc-content">
        <section>
          <h2>1. 概述</h2>
          <p>福州市仓山区人工智能公共服务平台（以下简称“本平台”）高度重视用户的隐私安全。本《隐私保护政策》旨在详细说明我们如何收集、使用、存储及保护您的个人信息，以及您享有的权利。</p>
          <p>当您使用本平台及其提供的相关AI计算与应用服务时，我们将按照本政策的规定处置您的信息数据。请仔细阅读并确认了解。</p>
        </section>

        <section>
          <h2>2. 信息收集与使用</h2>
          <p>2.1 <strong>注册与登录信息</strong>：为创建开发者及企业账户，我们可能收集您的手机号码、公司名称、邮箱等。这类信息主要用于验证您的身份及保障平台安全。</p>
          <p>2.2 <strong>平台交互操作数据</strong>：为了改善大模型的推理性能及服务稳定性，我们会不可避免地收集系统操作日志（包括IP地址、访问时间等），但不会利用此类底层数据进行任何用户画像跟踪。</p>
          <p>2.3 我们承诺，未经您的明确同意，不会将您的个人数据提供、出售给与本平台无关的第三方机构。</p>
        </section>

        <section>
          <h2>3. 数据存储和保护</h2>
          <p>3.1 我们采用业界标准的加密技术和权限管控制度存储您的信息。</p>
          <p>3.2 若发生数据泄露等安全事件，我们将第一时间启动应急预案并通知您，尽量减少损失。存储期限严格按照国家及本地法律法规对互联网平台的留存要求执行。</p>
        </section>

        <section>
          <h2>4. AI 生成数据权益</h2>
          <p>当您使用平台提供的第三方模型或接口进行内容生成、业务处理时，您上传的文本、文档、图像默认仅用于本次运算返回。本平台原则上不对推理过程数据进行截存用于非您明确授权的模型二次训练活动。</p>
        </section>

        <section>
          <h2>5. 政策的更新与修订</h2>
          <p>我们可能在必要时适时修订本隐私政策。一旦政策条款发生重大调整，我们将在平台显著位置或以系统消息方式及时向您通知。继续使用服务即代表您同意更新后的隐私条款。</p>
        </section>
      </div>
    </main>
   
  </div>
</template>

<style scoped>
.privacy-page {
  padding-top: 72px; /* Header height */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f8fafc;
}

.page-container {
  flex: 1;
  background: white;
  margin: 40px auto;
  padding: 60px 80px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  max-width: 1000px;
}

.doc-header {
  text-align: center;
  margin-bottom: 50px;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 30px;
}

.doc-header h1 {
  font-size: 2.2rem;
  color: #0f172a;
  font-weight: 850;
  margin-bottom: 15px;
}

.update-time {
  color: #64748b;
  font-size: 0.95rem;
}

.doc-content section {
  margin-bottom: 40px;
}

.doc-content h2 {
  font-size: 1.3rem;
  color: #1e293b;
  margin-bottom: 16px;
  font-weight: 700;
  border-left: 4px solid #10b981; /* Different highlight color for privacy */
  padding-left: 12px;
}

.doc-content p {
  color: #475569;
  line-height: 1.8;
  font-size: 1.05rem;
  margin-bottom: 12px;
  text-align: justify;
}

@media (max-width: 768px) {
  .page-container {
    margin: 20px;
    padding: 30px 20px;
  }
}
</style>
