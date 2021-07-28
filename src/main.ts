import { createApp } from 'vue'
import App from './App.vue'
import Router from './routes'
import { ElButton, ElColorPicker, ElSlider } from 'element-plus'
import 'element-plus/packages/theme-chalk/src/base.scss'

createApp(App)
.use(Router)
.use(ElButton)
.use(ElColorPicker)
.use(ElSlider)
.mount('#app')
