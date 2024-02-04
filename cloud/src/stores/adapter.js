import { defineStore } from 'pinia';
import { ref, reactive, computed, watch } from 'vue';
import { useDisplay } from 'vuetify';

// 超小号     (Extra small)          xs      小型到大型的手机                               < 600px
// 小号       (Small)                sm      小型到中型的平板                    >= 600px   < 960px
// 中号       (Medium)               md      大型平板到笔记本电脑                >= 960px   < 1280px
// 大号       (Large)                lg      从笔记本电脑到桌面电脑              >= 1280px  < 1920px
// 超大号     (Extra large)          xl      分辨率 1080p 到 1440p 的桌面电脑    >= 1920px  < 2560px
// 超大号     (Extra extra large)    xxl     4K 和超宽屏幕                       >= 2560px

// 小  <  600px
// 中  >= 600px  < 1920px
// 大  >= 1920px

export const useAdapterStore = defineStore(
    'adapter',
    () => {
        const { platform, mobile, name, width, height } = useDisplay();
        
        const density = ref('compact');
        const size = reactive({
            density: 'compact', // 显示大小 compact/comfortable/defalut

            btnSmallSize: 'small',
            btnMediumSize: '',
            btnLargeSize: 'large',

            textSmallSize: '',
            textMediumSize: '',
            textLargeSize: '',
        });

        // 监听navBarHide值的变化
        watch(density, (oldValue, newValue) => {
            if (newValue === 'compact') {
                size.btnSmallSize = 'xsmall';
            }

            if (newValue === 'comfortable') {
                size.btnSmallSize = 'small';
            }

            if (newValue === 'default') {
                size.btnSmallSize = 'large';
            }
            console.log('size', size.btnSmallSize);
        });

        // 封装移动端(phone + tablet)的逻辑判断
        const isMobile = computed(() => {
            return mobile.value;
        });

        // const screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
        // const isMobile = screenWidth < 768;
        // const isTablet = screenWidth >=768 && screenWidth < 1024
        // const isPC = screenWidth >= 1024

        return { density, size, isMobile };
    },
    {
        persist: {
            // 存储的 key， 默认是 defineStore 的第一个参数
            // key: "A",
            // 存储位置，默认 localStorage，还支持sessionStorage，cookie比较复杂
            // storage: sessionStorage,
            // 指定存储的内容
            paths: ['adapter'],
        },
    }
);
