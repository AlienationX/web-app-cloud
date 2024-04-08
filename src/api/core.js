import axios from 'axios';

// 创建请求实例
let request = axios.create({
    // baseURL: 'import.meta.env.VITE_API_BASE_URL',  // 统一增加前缀，变量配置的值为 '/api'
    baseURL: import.meta.env.VITE_API_BASE_URL, // 和vite.config.js中配置的proxy跨域保持一致即可
    timeout: 5000,
});
// 如果创建实例时没有设置，可以单独设置请求的url地址
// request.defaults.baseURL = '';

// 请求拦截器。hearder必须携带token，否则拦截发送请求
request.interceptors.request.use(
    (config) => {
        // github api 允许跨域，Access-Control-Allow-Headers设置为*，且没有设置token字段，所以请求头header也不能设置token，否则报错
        // Request header field token is not allowed by Access-Control-Allow-Headers in preflight response.

        let profileStore = useProfileStore();
        if (profileStore.token) {
            config.headers.token = profileStore.token;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 响应拦截器。检查统一返回结果必须存在某些字段，否则返回自定义的响应体及message
request.interceptors.response.use(
    (response) => {
        console.log('request raw response:', response.config.url, response);
        // response包含的key {config, data, headers, request, status, statusText}
        // 携带的token在config.headers.token中
        // TODO 封装返回结果必须存在 code(status) / message(statusText) / data，否则返回自定义的响应体。
        if (response.status === 200) {
            return Promise.resolve({
                code: response.status,
                message: response.statusText,
                data: response.data,
            });
        } else {
            // TODO 这个的status会是多少？
            alert('这个是成功请求，但是返回的状态码不是200，而是', response.status);
            console.log('-------------------> response.status:', response.status);
            return Promise.reject(response.data);
        }
    },
    (error) => {
        console.log('request raw error:', error); // error = AxiosError

        // TODO 其实都不用进行二次转换处理，就用原生的返回数据即可
        let code = error.code;
        let message = error.message;
        console.log('request except error ==>', { code, message });
        // let status = '???'
        // switch (status) {
        //     // 401: 未登录
        //     // 未登录则跳转登录页面，并携带当前页面的路径
        //     // 在登录成功后返回当前页面，这一步需要在登录页操作。
        //     case 401:
        //         message = '未登录';
        //         break;
        //     // 403 token过期
        //     // 登录过期对用户进行提示
        //     // 清除本地token和清空vuex中token对象
        //     // 跳转登录页面
        //     case 403:
        //         message = '登录过期，请重新登录';
        //         break;
        //     case 404:
        //         message = '网络请求错误';
        //         break;
        //     case 500:
        //         message = '服务器出现问题';
        //         break;
        //     default:
        //         message = 'Looks loke you lost your connection. Please check it and try again.';
        //         break;
        // }
        // TODO 弹出全局消息框
        // ElMessage({
        //   type: 'error',
        //   message,
        // })
        // return Promise.reject(error);
        return Promise.resolve(error); // 强制返回正常的状态，避免程序异常终止无法继续交互
    }
);
