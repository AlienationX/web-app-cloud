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
    // TODO followers数量，sub数量，repo数量，选择一个repo，生成提交commit的日期和次数的折线图，语言分类的饼图
    // https://api.github.com/users/alienationx/followers
    // https://api.github.com/users/alienationx/subscriptions
    // https://api.github.com/users/alienationx/repos
    // https://api.github.com/repos/alienationX/web-app-cloud/commits
    FOLLOWERS_URL: '/users/${username}/followers',
    SUBSCRIPTIONS_URL: '/users/${username}/subscriptions',
    REPOS_URL: '/users/${username}/repos',
    REPO_URL: '/repos/${username}/${repo}',
    REPO_COMMITS_URL: '/repos/${username}/${repo}/commits',
};

export const reqGitHubUser = (username) => request.get(GitHubAPI.USERINFO_URL + `/${username}`);

// 箭头函数如果增加大括号，需要写return，否则返回的是undefined
export const reqGitHubUserFollowers = (username) => {
    return request.get(GitHubAPI.FOLLOWERS_URL.replace('${username}', username));
};

export const reqGitHubUserSubscriptions = (username) => {
    return request.get(GitHubAPI.SUBSCRIPTIONS_URL.replace('${username}', username));
};

export const reqGitHubUserRepos = (username) => {
    return request.get(GitHubAPI.REPOS_URL.replace('${username}', username));
};

export const reqGitHubUserRepo = (username, repo) => {
    return request.get(GitHubAPI.REPO_URL.replace('${username}', username).replace('${repo}', repo));
};

export const reqGitHubUserRepoCommits = (username, repo) => {
    return request.get(GitHubAPI.REPO_COMMITS_URL.replace('${username}', username).replace('${repo}', repo));
};
