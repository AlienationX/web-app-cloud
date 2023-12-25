import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';

export const useSettingStore = defineStore('setting', () => {
    const settings = reactive({
        theme: 'light',
        navBarOrder: 0, // 导航条的布局位置
        sideBarOverlay: false, // 侧边栏是否遮罩效果
        showLayoutMsg: false, // 布局界面的通知组件是否展示
        showSideBar: false, // 侧边栏是否展示
        showSetting: false, // 弹出右侧的设置界面(遮罩层)
        sideBarExpand: false,  // 侧边栏是否收缩

        refresh: false,
        firstLogin: false,
    });

    // 通过theme计算主题切换按钮的图标
    const switchIcon = computed(() => (settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'));

    const getSettings = () => {};

    return { settings, switchIcon };
});
