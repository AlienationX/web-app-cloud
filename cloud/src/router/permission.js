import router from './index';
import config from '../config.js';

// 增加路由切换的顶部进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false }); // 去掉右上角的转圈
// console.log("开启守卫和进度条显示")  // TODO 但是login页面第一次使用进度条不显示?

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // next 路由的放行函数
    nprogress.start();
    next();
});

// 全局后置守卫
router.afterEach((to, from) => {
    // 设置页面title
    document.title = `${config.title} - ${to.meta.title}`;
    nprogress.done();
});
