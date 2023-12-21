import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export const useSettingStore = defineStore('setting', () => {
    const settings = reactive({
        theme: 'light',
        isCollapse: false,
        navBarOrder: 0,  // 导航条的布局位置

        refresh: false,
        firstLogin: false,
        showLoginMsg: false,
    });

    // 通过theme计算主题切换按钮的图标
    const switchIcon = computed(() => (settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'));

    const getSettings = () => {};

    return { settings, switchIcon };
});
