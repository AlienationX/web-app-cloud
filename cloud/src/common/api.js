import request from './request.js';

// demo 接口多了可以分多个模块module/文件管理
const DemoAPI = {
    LOGIN_URL: '/admin/acl/index/login',
    USERINFO_URL: '/admin/acl/index/info',
    LOGOUT_URL: '/admin/acl/index/logout',
};

export const reqLogin = (data) => request.post(DemoAPI.LOGIN_URL, data);

export const reqUserInfo = () => request.get(DemoAPI.USERINFO_URL);

export const reqLogOut = () => request.post(DemoAPI.LOGOUT_URL);

// https://blog.csdn.net/weixin_43829154/article/details/120697007 参考文档
// https://api.github.com
const GitHubAPI = {
    USERINFO_URL: '/users',
};

export const reqGitHubUser = (username) => request.get(GitHubAPI.USERINFO_URL + `/${username}`);
