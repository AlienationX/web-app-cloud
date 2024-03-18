<script setup>
import { ref, onMounted, onBeforeMount } from 'vue';

import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const installApp = () => {
    // 判断安装示例是否已保存
    if ('deferredPrompt' in window) {
        // 调用安装操作
        window.deferredPrompt.prompt();
        // 回调
        window.deferredPrompt.userChoice.then((res) => {
            if (res.outcome === 'accepted') {
                console.log('install succeed');
            } else {
                console.log('cancel install');
            }
            delete window.deferredPrompt;
            console.log('delete window.deferredPrompt');
        });
    }
};

const close = () => {
    // 关闭安装应用提示条，TODO 判断已安装就不用显示
    settingStore.installBanner = false;
};
</script>

<template>
    <!-- PWA安装按钮/添加到桌面 -->
    <v-banner sticky stacked lines="one" icon="mdi-alert-circle" density="comfortable">
        <v-banner-text class="text-medium-emphasis"> 请安装应用，添加应用到桌面 </v-banner-text>
        <v-spacer></v-spacer>
        <v-banner-actions>
            <v-btn @click="installApp" class="font-weight-bold" color="indigo-darken-3" size="small" variant="flat">
                Install
            </v-btn>
            <v-btn @click="close"  class="ml-2" icon="mdi-close" variant="text" size="x-small"></v-btn>
        </v-banner-actions>
    </v-banner>
</template>

<style lang="scss" scoped>
// <style>标签添加scoped属性时，Vue会自动为该组件内的所有元素添加一个独特的数据属性，例如data-v-f3f3eg9
// 同时，它也会修改你的CSS选择器，使得它们只匹配带有这个独特数据属性的元素
// 这样做的目的是为了确保样式只应用于当前组件内的元素，避免影响到其他组件

// 在vue3 中给style标签加上scoped 的时候自定义第三方ui框架样式会不生效，主要是双下划线的样式
.v-banner {
    padding-inline: 16px 16px;
}

.v-banner-actions {
    align-self: center;
}

//
:deep(.v-banner__prepend) {
    margin-inline-end: 0px;
}

.v-banner--sticky {
    top: 0;
}
</style>
