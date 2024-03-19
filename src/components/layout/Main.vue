<script setup>
import { ref, watch, nextTick } from 'vue';
import { useSettingStore } from '@/stores/setting.js';
const settingStore = useSettingStore();

let flag = ref(true);
// 监视reactive: 监视reactive所定义的一个响应式数据的某个属性，需要写成函数
watch(
    () => settingStore.settings.refresh,
    () => {
        flag.value = false;
        // 重新渲染
        nextTick(() => {
            flag.value = true;
        });
    }
);
</script>

<template>
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
    opacity: 0;
    transform: scale(0);
}

.fade-enter-active {
    transition: all 0.3s;
}

.fade-enter-to {
    opacity: 1;
    transform: scale(1);
}
</style>
