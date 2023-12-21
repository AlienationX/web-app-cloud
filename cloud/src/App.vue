<script setup>
import { computed, ref, onMounted } from 'vue';
import vuetify from './plugins/vuetify';

import { useSettingStore } from './stores/setting';
const settingStore = useSettingStore();

onMounted(() => {
    // TODO undefined, 不能这么获取vuetify的配置信息
    console.log(`the component is now mounted. default theme: ${vuetify.theme}`, vuetify.theme.defaultTheme);
});
</script>

<template>
    <v-app :theme="settingStore.settings.theme">
        <router-view></router-view>
    </v-app>
</template>

<style scoped lang="scss"></style>
