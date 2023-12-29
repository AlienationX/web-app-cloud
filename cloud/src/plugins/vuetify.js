import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

export default createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'light',
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
