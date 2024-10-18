<script setup>
import Menu from './Menu.vue';
import Feedback from '../Feedback.vue';

import { ref, reactive, toRef, onMounted, computed } from 'vue';
import { fullScreen } from '@/common/utils.js';

import { useProfileStore } from '@/stores/profile.js';
import { useSettingStore } from '@/stores/setting.js';
import { useAdapterStore } from '@/stores/adapter.js';

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

const profileStore = useProfileStore();
const settingStore = useSettingStore();
const adapterStore = useAdapterStore();

const settings = settingStore.settings;

const useNavRoutes = () => {
    const navRoutes = reactive([]);

    profileStore.privilege.routes
        .filter((route) => route.meta.location === 'nav')
        .map((route) => {
            if (route.path === '/' && route.children) {
                navRoutes.push(route.children[0]);
            } else {
                navRoutes.push(route);
            }
        });

    profileStore.privilege.routes
        .filter((route) => route.path === '/')
        .map((homeRoute) => {
            if (homeRoute.children) {
                navRoutes.push(...homeRoute.children.filter((route) => route.path !== '/home'));
            }
        });

    return { navRoutes };
};

const useNavBtn = () => {
    const updateRefsh = () => {
        // 监听该值的变化即可，true/flase 无所谓
        settings.refresh = !settings.refresh;
    };

    const clearCache = () => {
        (async () => {
            const keys = await caches.keys();
            keys.forEach((key) => {
                caches.delete(key);
                console.log('clear cache', key);
            });
        })();
    };

    // dialog 的switch开关
    const feedbackSwitch = ref(false);
    const confirmSwitch = ref(false);

    const confirm = () => {
        confirmSwitch.value = true;
    };
    const logout = () => {
        // 重置store的数据
        profileStore.$reset();
        // 跳转到登录页面
        $router.push({ path: '/login', query: { redirect: $route.path } });
        // 关闭对话框
        confirmSwitch.value = false;
    };

    const handle = (event, item) => {
        console.log(event, item);
        console.log('click', item.text);
    };

    const themeText = computed(() => {
        return settings.theme === 'light' ? '黑暗主题' : '明亮主题';
    });

    const switchTheme = () => {
        // 修改theme主题值
        settings.theme = settings.theme === 'light' ? 'dark' : 'light';
        // 切换图标，settingStore通过theme的计算属性处理
        // switchIcon.value = settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny';
        // 切换下拉的图标
    };

    const languages = reactive([
        // icon 应该设置成国旗
        { text: 'English', icon: 'usa', status: false },
        { text: '简体中文', icon: 'china', status: true },
    ]);

    const changeLanguages = (event, item) => {
        languages.map((item) => {
            item.status = false;
        });
        item.status = true;
        console.log('change languages to', item.text);
    };

    const profileLinks = reactive([
        { text: '通知', icon: 'mdi-bell', action: function () {}, route: '', badges: 2 },
        { text: '意见和反馈', icon: 'mdi-message-text', action: function () {feedbackSwitch.value = true}, route: '' },
        { text: '清除缓存', icon: 'mdi-eraser-variant', action: clearCache, route: '' },
        { text: 'Sign Out', icon: 'mdi-exit-to-app', action: confirm, route: '' },
    ]);

    // 手机版增加主题切换按钮
    if (adapterStore.isPhone) {
        profileLinks.splice(1, 0, {
            text: themeText,
            icon: toRef(settingStore, 'switchIcon'),
            action: switchTheme,
            route: '',
        });
    }

    return { languages, changeLanguages, profileLinks, updateRefsh, switchTheme, logout, feedbackSwitch, confirmSwitch, handle };
};

const title = import.meta.env.VITE_APP_TITLE;
const { navRoutes } = useNavRoutes();
const { languages, changeLanguages, profileLinks, updateRefsh, switchTheme, logout, feedbackSwitch, confirmSwitch, handle } = useNavBtn();
</script>

<template>
    <!-- density 默认三种高度设置从小到大 compact/comfortable/defalut -->
    <!-- flat 扁平化，且没边框所以不推荐使用 -->
    <!-- order 控制drawer等侧边栏的先后顺序 -->
    <!-- fixed ??? -->

    <!-- 
        scroll-behavior 控制滚动条行为
        hide：默认插槽内容会随用户向下滚动而隐藏。而 extension 插槽则会保留。
        collapse：会在角落收缩成一团。
        elevate：当向下滚动时，会在应用栏添加阴影效果。忽略 scroll-threshold 属性，任意的滚动都会添加阴影。
        fade-image：背景图片会随着滚动条下拉而渐隐
        inverted：没有任何的效果，但会倒转上面提到的效果

        scroll-threshold 属性（单位是像素）决定了滚动条需要向下滚动多少才有应用栏的滚动效果。
    -->
    <v-app-bar
        :density="adapterStore.density"
        :flat="settings.navBarFlat"
        :scroll-behavior="settings.navBarBehavior.join(' ')"
        scroll-threshold="1"
        order="0"
    >
        <v-app-bar-nav-icon @click="settings.showSideBar = !settings.showSideBar"></v-app-bar-nav-icon>
        <v-toolbar-title
            v-show="settings.sideBarOrder === 0 && settings.showSideBar && !settings.sideBarOverlay ? true : true"
        >
            <span class="d-flex align-center text-subtitle-2 font-weight-black text-medium-emphasis"> {{ title }}</span>
        </v-toolbar-title>

        <!-- <v-spacer></v-spacer> -->

        <!-- <v-btn-toggle v-model="toggle" rounded="0" borderless nav>
            <v-btn
                v-for="(item, i) in navLinks"
                :key="i"
                :value="item"
                :prepend-icon="item.icon"
                router
                :to="item.route"
            >
                {{ item.text }}
            </v-btn>
        </v-btn-toggle> -->

        <template v-for="route of navRoutes" :key="route.path">
            <Menu :route="route" v-if="!route.meta.hidden"></Menu>
        </template>

        <!-- inset代表不占全部  -->
        <v-divider class="d-none d-sm-flex pl-2" inset vertical></v-divider>

        <v-btn size="small" icon="mdi-refresh" @click="updateRefsh"> </v-btn>
        <!-- <v-btn class="d-flex d-sm-none" size="small" icon="mdi-dots-vertical"> </v-btn> -->

        <v-btn class="d-none d-sm-flex" size="small" icon="mdi-fullscreen" @click="fullScreen"> </v-btn>
        <v-btn class="d-none d-sm-flex" size="small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>

        <v-menu :open-on-hover="!adapterStore.isMobile" :open-on-click="adapterStore.isMobile">
            <template v-slot:activator="{ props }">
                <v-btn size="small" v-bind="props" icon="mdi-translate"> </v-btn>
            </template>

            <v-list :lines="false" density="compact" nav width="120">
                <v-list-item
                    v-for="(item, i) in languages"
                    :key="i"
                    :value="item"
                    @click="changeLanguages(event, item)"
                    :active="item.status"
                    color="primary"
                >
                    <v-list-item-title> {{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-btn class="d-none d-sm-flex" size="small" icon="mdi-cog" @click="settings.showNavBarSetting = true"> </v-btn>

        <v-menu :open-on-hover="!adapterStore.isMobile" :open-on-click="adapterStore.isMobile">
            <template v-slot:activator="{ props }">
                <v-btn
                    v-if="!adapterStore.isPhone"
                    class="d-none d-sm-flex"
                    color="primary"
                    v-bind="props"
                    prepend-icon="mdi-account-circle"
                >
                    <span class="font-weight-bold text-overline">Profile</span>
                </v-btn>
                <v-btn v-else size="small" v-bind="props" icon="mdi-dots-vertical"> </v-btn>
            </template>

            <v-list :lines="false" density="compact" nav width="200">
                <!-- <v-list-subheader><span class="font-weight-bold text-caption">Profile</span></v-list-subheader> -->

                <v-list-item
                    v-for="(item, i) in profileLinks"
                    :key="i"
                    :value="item"
                    router
                    :to="item.route"
                    @click="item.action"
                    color="primary"
                >
                    <template v-slot:prepend>
                        <!-- <v-icon :icon="item.icon" size="small"></v-icon> -->
                        <!-- <v-badge color="error" content="2"> -->
                        <v-icon :icon="item.icon" size="small"></v-icon>
                        <!-- </v-badge> -->
                    </template>

                    <template v-slot:append v-if="item.badges">
                        <v-badge color="error" :content="item.badges" inline></v-badge>
                    </template>

                    <v-list-item-title> {{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <v-dialog v-model="feedbackSwitch" max-width="500">
            <Feedback v-model:feedbackSwitch="feedbackSwitch"></Feedback>
        </v-dialog>

        <v-dialog v-model="confirmSwitch" max-width="380">
            <v-card>
                <v-card-item>
                    <template v-slot:prepend>
                        <v-icon color="warning" icon="mdi-exit-to-app"></v-icon>
                    </template>
                    <v-card-title class="text-title-1"> Logout </v-card-title>
                </v-card-item>
                <v-card-text class="text-body-2 text-medium-emphasis font-weight-bold">
                    确定要退出当前账户吗 ?
                </v-card-text>
                <v-card-actions class="pr-6">
                    <v-spacer></v-spacer>
                    <v-btn variant="plain" size="small" class="font-weight-bold" @click="confirmSwitch = false">Cancel</v-btn>
                    <v-btn variant="tonal" size="small" class="font-weight-bold" @click="logout">OK</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-app-bar>
</template>

<style scoped lang="scss">
// :deep(.v-list-item__spacer) {
//     width: 10px;
// }

:deep(.v-list-item__prepend > .v-icon ~ .v-list-item__spacer) {
    width: 16px;
}

.v-card-item__prepend {
    padding: 0;
}
</style>
