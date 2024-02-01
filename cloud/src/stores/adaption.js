import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { useDisplay } from 'vuetify';

export const useAdaptionStore = defineStore(
    'adaption',
    () => {
        const { platform, mobile, name, width, height } = useDisplay();

        const settings = reactive({
            density: 'compact', // 显示大小 compact/comfortable/defalut

            // TODO 多个字体大小默认值
            // TODO 多个primary等颜色的默认值
        });

        // 封装移动端的逻辑判断
        const isMobile = computed(() => {
            return mobile.value;
        });

        return { settings, switchIcon, isMobile };
    },
    {
        persist: {
            // 存储的 key， 默认是 defineStore 的第一个参数
            // key: "A",
            // 存储位置，默认 localStorage，还支持sessionStorage，cookie比较复杂
            // storage: sessionStorage,
            // 指定存储的内容
            paths: ['adaption'],
        },
    }
);
