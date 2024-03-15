<script setup>
import { ref, onMounted } from 'vue';

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const installPromptEvent = null; // 实例对象

const installApp = () => {
    if (installPromptEvent) {
        // 调用安装操作
        installPromptEvent.prompt();
    }
};

const close = () => {
    // 关闭安装应用提示条
    settingStore.installBanner = false;
};

onMounted(() => {
    window.addEventListener('beforeinstallprompt', (event) => {
        // 防止默认的应用安装提示
        event.preventDefault();
        // 在Vue组件中保存事件对象
        installPromptEvent = event;
        // 显示安装按钮
        settingStore.installBanner = true;
        console.log('install');
    });
});
</script>

<template>
    <!-- PWA安装按钮/添加到桌面 -->
    <v-banner sticky lines="one" icon="mdi-alert-circle" density="comfortable">
        <v-banner-text class="text-medium-emphasis"> 请安装应用，添加应用到桌面 </v-banner-text>
        <v-spacer></v-spacer>
        <v-banner-actions class="">
            <v-btn @click="installApp" class="font-weight-bold" color="indigo-darken-3" size="small" variant="flat">
                Install
            </v-btn>
            <v-btn @click="close" icon="mdi-close" variant="text" size="x-small"></v-btn>
        </v-banner-actions>
    </v-banner>
</template>

<style lang="scss" scoped></style>
