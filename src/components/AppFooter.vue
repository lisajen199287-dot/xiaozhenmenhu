<script setup lang="ts">
</script>
<template>
  <footer class="app-footer-v3">
    <!-- Top Modules Area -->
    <div class="footer-modules wrapper">
        <!-- Col 1: Contact -->
        <div class="f-col f-col-contact">
          <h4>关注平台</h4>
          <div class="qr-group">
            <div class="qr-item">
              <div class="qr-box">
                <i class="fas fa-qrcode"></i>
              </div>
              <span>官方公众号</span>
            </div>
          </div>
        </div>

        <!-- Col 2: About -->
        <div class="f-col">
          <h4>了解平台</h4>
          <RouterLink to="/intro">平台概况</RouterLink>
          <RouterLink to="/news">最新动态</RouterLink>
          <RouterLink to="/legal">使用协议</RouterLink>
          <RouterLink to="/privacy">隐私政策</RouterLink>
        </div>

        <!-- Col 3: Products -->
        <div class="f-col">
          <h4>产品服务</h4>
          <RouterLink to="/infra">算力底座 (Compute)</RouterLink>
          <RouterLink to="/engine">AIGC 引擎 (Engine)</RouterLink>
          <RouterLink to="/brain">知识智脑 (Brain)</RouterLink>
          <RouterLink to="/app-center">应用中心 (AppStore)</RouterLink>
          <RouterLink to="/agent">企业智能体 (Agent)</RouterLink>
        </div>

        <!-- Col 4: Resources -->
        <div class="f-col">
          <h4>资源中心</h4>
          <RouterLink to="/solutions">行业解决方案</RouterLink>
          <RouterLink to="/cases">客户成功案例</RouterLink>
          <a href="/system-mgnt-portal/login" target="_blank" class="admin-link">管理员控制台</a>
        </div>
    </div>



    <!-- Bottom Copyright -->
    <div class="footer-copyright">
      <div class="wrapper fc-inner">
        <span class="cp-text">© 2026 仓山区人工智能公共服务平台 版权所有</span>
        <a href="https://beian.miit.gov.cn/" target="_blank" class="cp-link">闽ICP备2025086349号-1</a>
        <a href="#" class="cp-link">闽公网安备 35010402xxx号</a>
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
}

.f-col > a {
  display: block;
  color: #64748b;
  font-size: 0.95rem;
  margin-bottom: 16px;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.f-col > a:hover {
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
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.qr-box {
  width: 80px;
  height: 80px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #94a3b8;
  font-size: 2rem;
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

.cp-link {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.2s;
}

.cp-link:hover {
  color: #64748b;
}

@media (max-width: 768px) {
  .app-footer-v3 {
    padding-top: 40px;
  }
  .footer-modules {
    flex-direction: column;
    gap: 32px;
  }
  .f-col h4 {
    margin-bottom: 16px;
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
  }
}
</style>
