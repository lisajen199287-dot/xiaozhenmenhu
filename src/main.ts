import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@fortawesome/fontawesome-free/css/all.css'
import router from './router/web'
import App from './App.vue'
import './styles/main.css'
import './styles/home.css' /* Imported home styles */
import './styles/home_products.css' /* Imported product styles */

// ✅ 在一切路由跳转之前，立即缓存首次访问 URL
sessionStorage.setItem('_cii_first_url', window.location.href)
sessionStorage.setItem('_cii_first_ref', document.referrer || '')
sessionStorage.setItem('_cii_first_ts', Date.now().toString())

const app = createApp(App)

import { useUser } from './utils/userStore'
const { initUser } = useUser()
initUser()

// Register all Element Plus icons
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(ElementPlus)
app.use(router)
app.mount('#app')
