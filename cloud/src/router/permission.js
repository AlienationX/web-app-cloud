import router from './index';

// 增加路由切换的顶部进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'

// console.log("开启守卫和进度条显示")  // TODO 但是login页面为什么没有进度条显示？且右上角有个转圈

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // next 路由的放行函数
    console.log("before: ", from, to)
    nprogress.start()
    next()
});

// 全局后置守卫
router.afterEach((to, from) => {
    console.log("after: ", from, to)
    nprogress.done();
});
