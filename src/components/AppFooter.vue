<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = ref<number | null>(null)

const toggle = (index: number) => {
  if (activeIndex.value === index) {
    activeIndex.value = null
  } else {
    activeIndex.value = index
  }
}
</script>

<template>
  <footer v-if="route.path !== '/arkclaw/detail'" class="app-footer-v3">
    <!-- Top Modules Area -->
    <div class="footer-modules wrapper">
        <!-- Col 1: Contact -->
        <div class="f-col f-col-contact" :class="{ 'is-active': activeIndex === 0 }">
          <h4 @click="toggle(0)">
            关注平台
            <i class="fas fa-chevron-down mobile-arrow"></i>
          </h4>
          <div class="f-content">
            <div class="f-content-inner">
              <div class="qr-group">
                <div class="qr-item">
                  <div class="qr-box">
                    <img src="/static/images/qrcode_official.jpg" alt="官方公众号" />
                  </div>
                  <span>官方公众号</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Col 2: About -->
        <div class="f-col" :class="{ 'is-active': activeIndex === 1 }">
          <h4 @click="toggle(1)">
            了解平台
            <i class="fas fa-chevron-down mobile-arrow"></i>
          </h4>
          <div class="f-content">
            <div class="f-content-inner">
              <RouterLink to="/intro">平台概况</RouterLink>
              <RouterLink to="/news">最新动态</RouterLink>
              <RouterLink to="/legal">使用协议</RouterLink>
              <RouterLink to="/privacy">隐私政策</RouterLink>
            </div>
          </div>
        </div>

        <!-- Col 3: Products -->
        <div class="f-col" :class="{ 'is-active': activeIndex === 2 }">
          <h4 @click="toggle(2)">
            产品服务
            <i class="fas fa-chevron-down mobile-arrow"></i>
          </h4>
          <div class="f-content">
            <div class="f-content-inner">
              <RouterLink to="/infra">算力底座 (Compute)</RouterLink>
              <RouterLink to="/engine">AIGC 引擎 (Engine)</RouterLink>
              <RouterLink to="/brain">知识智脑 (Brain)</RouterLink>
              <RouterLink to="/app-center">应用中心 (AppStore)</RouterLink>
              <RouterLink to="/agent">企业智能体 (Agent)</RouterLink>
            </div>
          </div>
        </div>

        <!-- Col 4: Resources -->
        <div class="f-col" :class="{ 'is-active': activeIndex === 3 }">
          <h4 @click="toggle(3)">
            资源中心
            <i class="fas fa-chevron-down mobile-arrow"></i>
          </h4>
          <div class="f-content">
            <div class="f-content-inner">
              <RouterLink to="/solutions">行业解决方案</RouterLink>
              <RouterLink to="/cases">客户成功案例</RouterLink>
            </div>
          </div>
        </div>
    </div>



    <!-- Bottom Copyright -->
    <div class="footer-copyright">
      <div class="wrapper fc-inner">
        <span class="cp-text">© 2026 福州市仓山区产业投资集团有限公司版权所有</span>
        <!-- <a href="https://beian.miit.gov.cn/" target="_blank" class="cp-link">闽ICP备2025086349号-1</a> -->
        <div class="cp-box">
          <a href="https://beian.miit.gov.cn" rel="noreferrer" class="cp-link" target="_blank">闽ICP备2025086349号-1</a >
          <img class="cp-icon" src="@/assets/images/logo_icon.png" alt="">
          <a href="https://beian.mps.gov.cn/#/query/webSearch " rel="noreferrer" class="cp-link" target="_blank">闽公网安备35010402351855号</a >
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.app-footer-v3 {
  background: #ffffff;
  color: #333333;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  border-top: 1px solid #f1f5f9;
  padding-top: 60px;
}

.footer-modules {
  display: flex;
  justify-content: space-between;
  padding-bottom: 50px;
  gap: 40px;
}

.f-col h4 {
  font-size: 1.15rem;
  font-weight: 800;
  color: #0f172a;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}

.f-col-contact h4 {
  justify-content: center;
}

.mobile-arrow {
  display: none;
  font-size: 0.9rem;
  color: #94a3b8;
  transition: transform 0.3s ease;
}

.f-col .f-content-inner {
  display: flex;
  flex-direction: column;
}

.f-col .f-content-inner > a,
.f-col .f-content-inner > .qr-group {
  display: block;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 16px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.f-col .f-content-inner > a:hover {
  color: #3b82f6;
}

.admin-link {
  color: #cbd5e1 !important;
}

.f-col-contact {
  flex: 1;
  max-width: 450px;
}

.contact-info {
  font-size: 0.95rem;
  color: #64748b;
  margin-bottom: 12px;
  font-weight: 500;
}

.social-line {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-btn {
  font-size: 1.4rem;
  color: #3b82f6;
  cursor: pointer;
  transition: opacity 0.2s;
}

.icon-btn:hover {
  opacity: 0.8;
}

.qr-group {
  display: flex;
  gap: 24px;
  margin-top: 24px;
  justify-content: center;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-box {
  width: 90px;
  height: 90px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  padding: 4px;
}

.qr-box img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.qr-item span {
  font-size: 0.75rem;
  color: #94a3b8;
}

.footer-brand-bar {
  border-top: 1px solid #f1f5f9;
  padding: 24px 0;
}

.fb-content {
  display: flex;
  align-items: center;
  gap: 32px;
}

.fb-logo h3 {
  font-size: 1.4rem;
  font-weight: 900;
  color: #3b82f6;
  letter-spacing: -0.02em;
  margin: 0;
}

.fb-tags {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
}

.fb-tags strong {
  font-size: 0.95rem;
  color: #0f172a;
  font-weight: 800;
}

.tag-link {
  font-size: 0.9rem;
  color: #64748b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.tag-link:hover {
  color: #3b82f6;
}

.footer-copyright {
  background: #f8fafc;
  padding: 16px 0;
}

.fc-inner {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  font-size: 0.85rem;
  color: #94a3b8;
}
.cp-box{
  display: flex;
  align-items: center;
}
.cp-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.cp-link:hover {
  color: #64748b;
}
.cp-icon{
  width: 15px;
  height: 16px;
  margin: 0 8px;
}

@media (max-width: 768px) {
  .app-footer-v3 {
    padding-top: 0; /* Remove top padding entirely */
  }
  .footer-modules {
    flex-direction: column;
    gap: 0;
    padding-bottom: 0;
  }
  
  .f-col {
    border-bottom: 1px solid #f8fafc;
    padding: 0;
  }
  
  .f-col-contact {
    max-width: 100%;
  }

  .f-col h4 {
    margin: 0;
    cursor: pointer;
    user-select: none;
    font-size: 0.95rem;
    padding: 10px 0; /* Compact organic spacing */
    letter-spacing: 0.01em;
  }

  .f-col-contact h4 {
    justify-content: space-between;
  }

  .mobile-arrow {
    display: block;
  }

  .f-col.is-active .mobile-arrow {
    transform: rotate(180deg);
    color: #3b82f6;
  }

  /* Accordion Content */
  .f-content {
    display: none !important; /* Completely hide when closed */
    grid-template-rows: 0fr;
    transition: grid-template-rows 0.3s ease, opacity 0.3s ease;
    overflow: hidden;
    opacity: 0;
  }

  .f-col.is-active .f-content {
    display: grid !important; /* Only show when active */
    grid-template-rows: 1fr;
    opacity: 1;
  }

  .f-content-inner {
    min-height: 0;
    padding-top: 10px;
    padding-bottom: 16px;
  }

  .fb-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
  .fc-inner {
    flex-direction: column;
    gap: 12px;
    text-align: center;
    align-items: center;
  }
}
</style>
