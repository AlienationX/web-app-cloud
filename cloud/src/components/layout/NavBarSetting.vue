<script setup>
import Setting from '../Setting.vue';

import { ref, reactive, computed, onMounted } from 'vue';
import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;

const tickLabels = reactive({
    0: 'Small',
    1: 'Medium',
    2: 'Large',
});

// 定义的临时转换数据
const m = {
    compact: 0,
    comfortable: 1,
    default: 2,
};

// slider移动触发的事件
const move = (modelValue) => {
    for (let key in m) {
        if (m[key] === modelValue) {
            settings.density = key;
            break;
        }
    }
    console.log('slider move:', modelValue, settings.density);
};

// 计算属性
const tickValue = computed(() => {
    return m[settings.density];
});
</script>

<template>
    <v-navigation-drawer v-model="settings.showNavBarSetting" temporary location="right" width="360" order="-2">
        <Setting />
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
