import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia'; //从pinia中导入，defineStore方法，用于定义一个新的store

import routes from '../router/routes'; // TODO 从接口获取，临时使用

export const useProfileStore = defineStore('profile', () => {
    let token = ref('');
    let info = reactive({});
    let menuRoutes = reactive([]);

    function getInfo() {
        // 根据token获取用户信息
        const newInfo = {
            id: '1',
            username: 'admin',
            nickname: '管理员',
            avatar: '',
            lastLoginTime: '',
            isAdmin: 1,
        };
        info.hiddenColumn = 'test';
        Object.assign(info, newInfo); // 只能使用该方式修改对象的值不会丢失响应式。
    }

    function getMenuRoutes() {
        // 根据token获取用户菜单
        // 获取菜单权限，数组不能直接赋值，否则不再是响应式的
        menuRoutes.push(...routes);
        // menuRoutes.value = routes;
    }

    function userLogin() {
        // 获取token
        const localToken = localStorage.getItem('token');
        if (localToken) {
            token.value = localToken;
        } else {
            // TODO 接口请求获取token
            token.value = 'admin_token';
            localStorage.setItem('token', token.value);
        }

        getInfo();
        getMenuRoutes();

        console.log('info', info);
        console.log('menu', menuRoutes);
    }

    // store重置，数据还原成默认值
    function $reset() {
        token.value = '';

        // info = {}  // 无效
        // info = reactive({})  // 无效
        // Object.assign(info, {});  // 该方式只能覆盖已有key的value，主要用于对象的合并

        // for (const k in info) {
        //     delete info[k];
        // }
        Object.keys(info).forEach((key) => delete info[key]);

        // menuRoutes = reactive([]);  // 无效
        // menuRoutes.splice(0);  // 清空数组
        menuRoutes.length = 0;

        localStorage.removeItem('token');
    }

    return { info, token, menuRoutes, getInfo, getMenuRoutes, userLogin, $reset };
});
