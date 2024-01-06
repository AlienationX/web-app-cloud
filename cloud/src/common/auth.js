// 封装token相关方法
export function setToken(value) {
    localStorage.setItem('token', value);
}

export function getToken() {
    return localStorage.getItem('token')
}

export function removeToken() {
    localStorage.removeItem('token');
}