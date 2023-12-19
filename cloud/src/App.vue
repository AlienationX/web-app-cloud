<script setup>
import { computed, ref, onMounted } from 'vue';
import vuetify from './plugins/vuetify';

import { useSettingStore } from './stores/setting';
const settingStore = useSettingStore();

// TODO 测试
onMounted(() => {
    console.log(`the component is now mounted.`);
    // TODO undefined, 不能这么获取vuetify的配置信息
    console.log(`default theme: ${vuetify.theme}`, vuetify.theme.defaultTheme);
    // 验证是否已登录，没有登录跳转到login页面
});
</script>

<template>
    <v-app :theme="settingStore.settings.theme">
        <router-view></router-view>
    </v-app>
</template>

<style scoped lang="scss"></style>
