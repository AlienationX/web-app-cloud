export function btnHandle(event, item) {
    console.log(event, item);
    console.log('click', item.text);
    // 如果点击sing out按钮，则退出登录
    // if (item.text === 'Sing Out') logout();
}