export function fullScreen() {
    // 获取当前是否为全屏
    let full = document.fullscreenElement;
    if (full) {
        // 退出全屏
        document.exitFullscreen();
    } else {
        // 进入全屏
        document.documentElement.requestFullscreen();
    }
}