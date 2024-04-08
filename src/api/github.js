import axios from 'axios';

let request = axios.create({
    // baseURL: 'import.meta.env.VITE_API_BASE_URL',  // 统一增加前缀，变量配置的值为 '/api'
    baseURL: import.meta.env.VITE_API_GITHUB_URL, // 和vite.config.js中配置的proxy跨域保持一致即可
    timeout: 5000,
});

// 响应拦截器
request.interceptors.response.use(
    (response) => {
        console.log('request raw response:', response.config.url, response);
        // response包含的key {config, data, headers, request, status, statusText}
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
        // 其实都不用进行二次转换处理，就用原生的返回数据即可
        let code = error.code;
        let message = error.message;
        console.log('request except error ==>', { code, message });
        // TODO 弹出全局消息框
        // ElMessage({
        //   type: 'error',
        //   message,
        // })
        // return Promise.reject(error);
        return Promise.resolve(error); // 强制返回正常的状态，避免程序异常终止无法继续交互
    }
);

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
    REPO_LANGUAGES_URL: '/repos/${username}/${repo}/languages',
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

export const reqGitHubUserRepoLanguages = (username, repo) => {
    return request.get(GitHubAPI.REPO_LANGUAGES_URL.replace('${username}', username).replace('${repo}', repo));
};

export const reqGitHubUserRepoCommits = (username, repo) => {
    return request.get(GitHubAPI.REPO_COMMITS_URL.replace('${username}', username).replace('${repo}', repo));
};
