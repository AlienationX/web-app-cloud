import router from './index';
import config from '../config.js';

import { useProfileStore } from '../stores/profile';

// 增加路由切换的顶部进度条
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';
nprogress.configure({ showSpinner: false }); // 去掉右上角的转圈
// console.log("开启守卫和进度条显示")  // TODO 但是login页面第一次使用进度条不显示?

// 全局前置守卫
router.beforeEach((to, from, next) => {
    // next 路由的放行函数
    nprogress.start();

    // useProfileStore放在这里是可行的，因为路由器是在其被安装之后开始导航的，放在import处会报错
    // Uncaught Error: [🍍]: "getActivePinia()" was called but there was no active Pinia. Are you trying to use a store before calling "app.use(pinia)"?
    const profileStore = useProfileStore();
    const token = profileStore.token;
    const username = profileStore.info.username;
    if (token) {
        // TODO token is invalid, 判断token是否有效/过期

        if (to.path === '/login') {
            next({ path: '/' });
        } else {
            if (username) {
                next();
            } else {
                // TODO 使用token发送请求获取username和menu，增加处理token过期的逻辑
                // try {
                //   await userStore.userInfo()
                //   next({ ...to })
                // } catch (error) {
                //   await userStore.userLogout()
                //   next({ path: '/login', query: { redirect: to.path } })
                // }
                // profileStore.getInfo()
                // profileStore.getMenuRoutes()
                // next();
                next({ path: '/login', query: { redirect: to.path } });
            }
        }
    } else {
        if (to.path === '/login') {
            next();
        } else {
            next({ path: '/login', query: { redirect: to.path } });
        }
    }
});

// 全局后置守卫
router.afterEach((to, from) => {
    // 设置页面title
    document.title = `${config.title} - ${to.meta.title}`;
    nprogress.done();
});
