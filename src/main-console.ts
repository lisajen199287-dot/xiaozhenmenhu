
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import '@fortawesome/fontawesome-free/css/all.css'

import AppConsole from './AppConsole.vue'
import router from './router/console'
import { useUser } from './utils/userStore'

import './style.css'

const { initUser } = useUser()
initUser()

const app = createApp(AppConsole)

app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')
