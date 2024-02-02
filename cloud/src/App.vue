<script setup>
import { ref, reactive, computed, onMounted } from 'vue';

import { useSettingStore } from './stores/setting';
const settingStore = useSettingStore();

// const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
// const isMobile = screenWidth < 768;
// const isTablet = screenWidth >=768 && screenWidth < 1024
// const isPC = screenWidth >= 1024

import { useTheme, useDisplay } from 'vuetify';

// 可以获取到很多信息
// platform: 包括系统平台和浏览器类型 win/mac/linux android/ios chrome/edge/firefox/opera/electron/ cordova? touch? ssr?
// mobile: 是否移动设备，包括手机和平板
// name: 返回 xs / sm / md / lg / xl / xxl
// width and height
console.log('useDisplay', useDisplay());
console.log('useTheme', useTheme());
const { platform, mobile, name, width, height } = useDisplay();
const theme = useTheme();

// 其实不需要单独定义windowSize，直接使用useDisplay的width和height即可
let windowSize = reactive({
    x: 0,
    y: 0,
});

const onResize = () => {
    // let windowSize = ref({x:0, y:0})
    // windowSize.value = { x: window.innerWidth, y: window.innerHeight };
    Object.assign(windowSize, { x: window.innerWidth, y: window.innerHeight });
    console.log(width.value, height.value);
};

onMounted(() => {
    // TODO Test
    console.log('User Agent', navigator.userAgent);
    console.log('platform', platform.value); // 返回对象
    console.log('display', name.value);  // 返回 xs / sm / md / lg / xl / xxl
    console.log('mobile', mobile.value);
    console.log('width and heiht', width.value, height.value);
    console.log('theme', theme);
    // theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
    console.log('current theme value', theme.global.name.value);

    // for (const key in platform.value) {
    //     console.log(key, platform.value[key]);
    // }
});
</script>

<template>
    <!-- 无需绑定onResize，直接使用useDisplay的width/height即可 -->
    <!-- <v-app :theme="settingStore.settings.theme" v-resize="onResize">  -->
    <v-app :theme="settingStore.settings.theme">
        <!-- <div>{{ windowSize }}</div> -->
        <!-- class="bg-grey-lighten-4" 添加背景色，但是会导致theme切换样式不统一 -->
        <router-view></router-view>
    </v-app>
</template>

<style scoped lang="scss"></style>
