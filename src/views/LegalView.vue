<script setup lang="ts">
import NavBar from '@/components/NavBar.vue'
</script>

<template>
  <div class="legal-page">
    <NavBar />
    <main class="page-container wrapper">
      <div class="doc-header">
        <h1>用户服务使用协议</h1>
        <p class="update-time">最后更新时间：2026年3月1日</p>
      </div>

      <div class="doc-content">
        <section>
          <h2>1. 导言</h2>
          <p>欢迎您使用福州市仓山区人工智能公共服务平台（以下简称“本平台”）。本平台由本平台运营方（以下简称“我们”）所有并运营。请您在注册、登录使用本平台及相关服务前，务必仔细阅读、充分理解各条款内容。您勾选同意或实际使用本平台服务，即代表您与我们已达成协议，自愿接受本协议的全部条款。</p>
        </section>

        <section>
          <h2>2. 账号注册与使用</h2>
          <p>2.1 您需要注册一个账号才能访问本平台的部分功能。注册时必须提供真实、准确的资料。</p>
          <p>2.2 您的账号密码由您自己负责保管，请勿泄露给第三方。任何通过您的账号进行的操作均视为您本人的行为，由此产生的责任由您自行承担。</p>
        </section>

        <section>
          <h2>3. 服务内容与规范</h2>
          <p>3.1 本平台提供多模态AI大模型、算力租赁、行业解决方案等服务平台基建能力。</p>
          <p>3.2 您在使用本平台服务时，必须遵守国家相关法律法规及政策，不得利用本平台制作、复制、发布、传播违法犯罪、暴力色彩或有违社会公序良俗的内容。</p>
          <p>3.3 您同意不通过逆向工程、反编译或其他不当手段获取本平台或其提供API的源码或核心技术。</p>
        </section>

        <section>
          <h2>4. 知识产权声明</h2>
          <p>本平台提供的全部内容（包括但不限于文字、设计、图片、代码及其他信息）的知识产权（涵盖版权、商标等）均归我们所有，受相关法律保护。未经授权，任何人不得擅自使用、修改或演绎。</p>
        </section>

        <section>
          <h2>5. 免责声明</h2>
          <p>我们将尽最大努力保障本平台的稳定运行，但如因不可抗力或常规维护导致的服务中断、数据丢失等，平台不承担除法律明确规定以外的赔偿责任。AI生成内容的准确性和适用性仅供参考，不作为专业建议及决策依据。</p>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
.legal-page {
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
  border-left: 4px solid #4f46e5;
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
