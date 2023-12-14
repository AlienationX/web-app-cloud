// import './assets/main.css'
import './styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// 执行路由鉴权守卫
import './router/permission'

// app
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

app.mount('#app')

console.log("main.js - app", app)
console.log("main.js - vuetify", vuetify)