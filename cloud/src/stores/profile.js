import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia'; //从pinia中导入，defineStore方法，用于定义一个新的store

import routes from '../router/routes'; // TODO 从接口获取，临时使用

export const useProfileStore = defineStore('profile', () => {
    let info = reactive({});
    let token = ref('');
    let menuRoutes = reactive([]);

    function userLogin() {
        // 获取用户信息
        info = {
            id: '1',
            username: 'admin',
            nickname: '管理员',
            avatar: '',
            lastLoginTime: '',
            isAdmin: 1,
        };

        // 获取token
        const localToken = localStorage.getItem('token');
        if (localToken) {
            token.value = localToken;
        } else {
            token.value = 'admin_token';
            localStorage.setItem('token', token.value);
        }

        // 获取菜单权限
        menuRoutes = routes;

        console.log("info", info)
        console.log("menu", menuRoutes)
    }

    // store重置，数据情况还原
    function $reset() {
        info = {};
        token.value = '';
        menuRoutes = [];

        localStorage.removeItem('token');
    }

    return { info, token, menuRoutes, userLogin, $reset };
});
