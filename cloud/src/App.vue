<script setup>
import { computed, ref, onMounted } from 'vue';
import vuetify from './plugins/vuetify';

import { useSettingStore } from './stores/setting';
const settingStore = useSettingStore();

// const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
// const isMobile = screenWidth < 768;
// const isTablet = screenWidth >=768 && screenWidth < 1024
// else isPC

onMounted(() => {
    // TODO undefined, 不能这么获取vuetify的配置信息
    console.log(`the component is now mounted. default theme: ${vuetify.theme}`, vuetify.theme.defaultTheme);
    console.log('User Agent', navigator.userAgent);
});
</script>

<template>
    <v-app :theme="settingStore.settings.theme">
        <!-- class="bg-grey-lighten-4" 添加背景色，但是会导致theme切换样式不统一 -->
        <router-view></router-view>
    </v-app>
</template>

<style scoped lang="scss"></style>
