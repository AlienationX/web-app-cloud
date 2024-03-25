<script setup>
import Menu from './Menu.vue';

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

    const dialog = ref(false);
    const confirm = () => {
        dialog.value = true;
    };
    const logout = () => {
        // 重置store的数据
        profileStore.$reset();
        // 跳转到登录页面
        $router.push({ path: '/login', query: { redirect: $route.path } });
        // 关闭对话框
        dialog.value = false;
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

    const profileLinks = reactive([
        { text: '通知', icon: 'mdi-bell', action: function () {}, route: '', badges: 2 },
        { text: themeText, icon: toRef(settingStore, 'switchIcon'), action: switchTheme, route: '' },
        { text: '意见和反馈', icon: 'mdi-message-text', action: function () {}, route: '' },
        { text: '清除缓存', icon: 'mdi-eraser-variant', action: clearCache, route: '' },
        { text: 'Sign Out', icon: 'mdi-exit-to-app', action: confirm, route: '' },
    ]);

    return { profileLinks, updateRefsh, switchTheme, logout, dialog, handle };
};

const title = import.meta.env.VITE_APP_TITLE;
const { navRoutes } = useNavRoutes();
const { profileLinks, updateRefsh, switchTheme, logout, dialog, handle } = useNavBtn();
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
            v-show="settings.sideBarOrder === 0 && settings.showSideBar && !settings.sideBarOverlay ? false : true"
        >
            <span class="text-subtitle-2 font-weight-black"> {{ title }}</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>

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

        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-card-text class="mb-1 text-body-2 text-medium-emphasis font-weight-bold"
                    >Are you sure logout ?</v-card-text
                >
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn variant="plain" text="Cancel" size="small" @click="dialog = false"></v-btn>
                    <v-btn variant="tonal" text="Ok" size="small" color="primary" @click="logout"></v-btn>
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
</style>
