<script setup>
import Menu from './Menu.vue';

import { ref, reactive, onMounted } from 'vue';
import config from '../../config.js';
import { fullScreen } from '../../common/utils.js';

import { useProfileStore } from '../../stores/profile.js';
import { useSettingStore } from '../../stores/setting.js';

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

const profileStore = useProfileStore();
const settingStore = useSettingStore();

const settings = settingStore.settings;

const navRoutes = reactive([]);

const profileLinks = reactive([
    { text: 'Document', icon: 'mdi-clock', route: '/document' },
    { text: 'Offline', icon: 'mdi-account', route: '' },
    { text: 'Setting', icon: 'mdi-cog', route: '' },
    { text: 'Sing Out', icon: 'mdi-export' },
]);

const switchTheme = () => {
    // 修改theme主题值
    settings.theme = settings.theme === 'light' ? 'dark' : 'light';
    // 切换图标，settingStore通过theme的计算属性处理
    // switchIcon.value = settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny';
};

const logout = () => {
    // 重置store的数据
    profileStore.$reset();
    // 跳转到登录页面
    $router.push({ path: '/login', query: { redirect: $route.path } });
};

const handle = (event, item) => {
    console.log(event, item);
    console.log(`click ${item.text}`);
    // 如果点击sing out按钮，则退出登录
    if (item.text === 'Sing Out') logout();
};

onMounted(() => {
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
});
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
    -->
    <v-app-bar 
        :density="settings.density"
        :fixed="settings.navBarFixed" 
        :flat="settings.navBarFlat"
        :scroll-behavior="scroollBehavior"
        order="0"
    >
        <v-app-bar-nav-icon @click="settings.showSideBar = !settings.showSideBar"></v-app-bar-nav-icon>
        <v-toolbar-title v-show="settings.sideBarOrder === 0 && settings.showSideBar && !settings.sideBarOverlay ? false : true">
            <span class="text-overline font-weight-black"> {{ config.title }}</span>
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

        <v-btn size="small" icon="mdi-refresh"> </v-btn>
        <v-btn class="d-flex d-sm-none" size="small" icon="mdi-dots-vertical"></v-btn>

        <v-btn class="d-none d-sm-flex" size="small" icon="mdi-fullscreen" @click="fullScreen"> </v-btn>
        <v-btn class="d-none d-sm-flex" size="small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>
        <v-btn class="d-none d-sm-flex" size="small" icon="mdi-cog" @click="settings.showNavBarSetting = true"> </v-btn>

        <v-menu :open-on-hover="!settingStore.isMobile" :open-on-click="settingStore.isMobile">
            <template v-slot:activator="{ props }">
                <v-btn class="d-none d-sm-flex" color="primary" v-bind="props" prepend-icon="mdi-account-circle">
                    <span class="font-weight-bold text-overline">Profile</span>
                </v-btn>
            </template>

            <v-list :lines="false" density="compact" nav width="200">
                <v-list-subheader><span class="font-weight-bold text-caption">Profile</span></v-list-subheader>

                <v-list-item
                    v-for="(item, i) in profileLinks"
                    :key="i"
                    :value="item"
                    router
                    :to="item.route"
                    @click="(event) => handle(event, item)"
                    color="primary"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon" size="small"></v-icon>
                    </template>

                    <v-list-item-title> {{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<style scoped lang="scss"></style>
