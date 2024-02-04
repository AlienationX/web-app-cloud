import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { useDisplay } from 'vuetify';

export const useSettingStore = defineStore(
    'setting',
    () => {
        const settings = reactive({
            theme: 'light',

            navBarFlat: false, // 导航栏扁平效果
            navBarBehavior: [], // 导航栏行为设置

            sideBarOrder: 0, // 侧边栏位置顺序，设置为0会高于narbar的0，设置为1会低于narbar的0
            sideBarOverlay: false, // 侧边栏是否遮罩效果
            sideBarExpand: false, // 侧边栏是否收缩

            showLayoutMsg: false, // 布局界面的通知组件是否展示
            showSideBar: false, // 侧边栏是否展示
            showNavBarSetting: false, // 弹出右侧的设置界面(遮罩层)
            showSideBarSetting: false, // 弹出侧边栏的设置界面(全屏对话框)

            refresh: false,
            firstLogin: false,

            // TODO 多个primary等颜色的默认值
        });

        // 通过theme计算主题切换按钮的图标
        const switchIcon = computed(() => (settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny'));

        return { settings, switchIcon };
    },
    {
        persist: {
            // 存储的 key， 默认是 defineStore 的第一个参数
            // key: "A",
            // 存储位置，默认 localStorage，还支持sessionStorage，cookie比较复杂
            // storage: sessionStorage,
            // 指定存储的内容
            paths: ['settings'],
        },
    }
);
