import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia'; //从pinia中导入，defineStore方法，用于定义一个新的store

import { reqGitHubUser } from '../common/api.js';
import { routes } from '../router/routes'; // TODO 从接口获取，临时使用

export const useProfileStore = defineStore(
    'profile',
    () => {
        let token = ref(''); // TODO 直接存储本地还是存储cookie?
        let userinfo = reactive({});
        let menuRoutes = reactive([]);
        let buttons = reactive([]); // 按钮权限的控制，推荐使用禁用的按钮权限disableButtons，方便配置。为空即为拥有全部按钮权限

        // function getInfo() {
        //     // 根据token获取用户信息
        //     const newInfo = {
        //         id: '1',
        //         username: 'admin',
        //         nickname: '管理员',
        //         avatar: '',
        //         lastLoginTime: '',
        //         isAdmin: 1,
        //     };
        //     Object.assign(userinfo, newInfo); // 只能使用该方式修改对象的值不会丢失响应式。
        // }

        async function getInfo(username) {
            // 根据token获取用户信息

            // 同步执行
            // let result = reqGitHubUser(username);
            // console.log('result', result);
            // result是Promise对象，需要使用then才能获取数据
            // result.then((res) => console.log('res', res)).catch((err) => console.log('err', err));

            // 异步执行，增加 async / await 可以直接使用，不再需要then获取数据
            let result = await reqGitHubUser(username);

            Object.assign(userinfo, result.data); // 只能使用该方式修改对象的值不会丢失响应式。
            userinfo.username = username; // github的接口没有username，有login。这里直接使用传入的username生成
        }

        function getMenuRoutes() {
            // 根据token获取用户菜单
            // 获取菜单权限，数组不能直接赋值，否则不再是响应式的
            menuRoutes.length = 0;
            menuRoutes.push(...routes);
            // menuRoutes.value = routes;
        }

        async function userLogin(username, password) {
            // 获取token
            const localToken = localStorage.getItem('token');
            if (localToken) {
                token.value = localToken;
            } else {
                // TODO 接口请求，通过username和password获取token
                token.value = 'admin_token';
                localStorage.setItem('token', token.value);
            }

            // getInfo();
            await getInfo(username); // TODO use github user test
            getMenuRoutes();
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
            Object.keys(userinfo).forEach((key) => delete userinfo[key]);

            // menuRoutes = reactive([]);  // 无效
            // menuRoutes.splice(0);  // 清空数组
            menuRoutes.length = 0;

            localStorage.removeItem('token');
        }

        return { userinfo, token, menuRoutes, getInfo, getMenuRoutes, userLogin, $reset };
    },
    {
        persist: {
            // 存储的 key， 默认是 defineStore 的第一个参数
            // key: "A",
            // 存储位置，默认 localStorage，还支持sessionStorage，cookie比较复杂
            storage: sessionStorage,
            // 指定存储的内容
            paths: ['token'],
        },
    }
);
