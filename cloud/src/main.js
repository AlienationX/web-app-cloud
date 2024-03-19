import './assets/main.css';
import './styles/index.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

// 执行路由鉴权守卫
import './router/permission';

// app
const app = createApp(App);

// pinia使用持久化插件
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// app.use(createPinia())
app.use(pinia);
app.use(router);
app.use(vuetify);

app.mount('#app');

console.log('main.js - app', app);
console.log('main.js - vuetify', vuetify);

// 自定义安装应用按钮事件，必须在main.js添加，否则无法生效
window.addEventListener('beforeinstallprompt', (e) => {
    // 防止默认的应用安装提示，会在一定条件下自己触发，比如访问2次，访问间隔在5分钟
    // e.preventDefault();
    // 安装应用前保存安装实例，点击按钮时再触发
    window.deferredPrompt = e;
});

// 通过是否是standalonemode模式打开的应用，进而判断是否是pwa应用（是否已安装）
const isInStandaloneMode = () =>
    window.matchMedia('(display-mode: standalone)').matches ||
    window.navigator.standalone ||
    document.referrer.includes('android-app://');

if (isInStandaloneMode()) {
    console.log('webapp installed');
} else {
    console.log('webapp not installed');
}

// 获取当前浏览器已安装的应用，无效
console.log('本浏览器已安装的apps:', await navigator.getInstalledRelatedApps());
