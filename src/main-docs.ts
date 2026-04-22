import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@fortawesome/fontawesome-free/css/all.css'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import AppDocs from './AppDocs.vue'
import router from './router/docs'

import './style.css'

const app = createApp(AppDocs)

app.use(router)
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')
