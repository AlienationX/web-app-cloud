import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import colors from 'vuetify/util/colors';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
    components,
    directives,
    theme: {
        // defaultTheme: 'light',
        themes: {
            light: {
                dark: false,
                colors: {
                    // TODO 修改主题色，修改如下值。批量修改颜色
                    // 修改颜色，使用提供的调色板值
                    // primary: colors.red.darken1, // #E53935
                    // secondary: colors.red.lighten4, // #FFCDD2
                    // background
                    // info
                    // warning
                    // success
                    // error
                    mycolor: '#E53935', // 自定义颜色
                },
            },
        },
    },
    icons: {
        defaultSet: 'mdi',
    },
    // display: {
    //     // true if screen width < mobileBreakpoint
    //     // mobile: boolean
    //     // mobileBreakpoint: number | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'
    //     mobileBreakpoint: 'sm',
    //     thresholds: {
    //         xs: 0,
    //         sm: 340,
    //         md: 540,
    //         lg: 800,
    //         xl: 1280,
    //     },
    // },
});
