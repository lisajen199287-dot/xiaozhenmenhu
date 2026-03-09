
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@fortawesome/fontawesome-free/css/all.css'

import AppAdmin from './AppAdmin.vue'
import router from './router/admin'

import './style.css'

const app = createApp(AppAdmin)

app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
