<script setup>
import Menu from './Menu.vue';
import Setting from './Setting.vue';

import { ref, reactive, onMounted } from 'vue';

import { useProfileStore } from '../../stores/profile.js';
import { useSettingStore } from '../../stores/setting';

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
    profileStore.menuRoutes
        .filter((route) => route.meta.location === 'nav')
        .map((route) => {
            if (route.path === '/' && route.children) {
                navRoutes.push(route.children[0]);
            } else {
                navRoutes.push(route);
            }
        });

    profileStore.menuRoutes
        .filter((route) => route.path === '/')
        .map((homeRoute) => {
            if (homeRoute.children) {
                navRoutes.push(...homeRoute.children.filter((route) => route.path !== '/home'));
            }
        });
});
</script>

<template>
    <v-app-bar fixed density="compact" :order="settings.navBarOrder">
        <v-app-bar-nav-icon @click="settings.showSideBar = !settings.showSideBar"></v-app-bar-nav-icon>
        <v-toolbar-title><span class="font-weight-black text-button">CLOUD</span></v-toolbar-title>

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
        <v-divider class="pl-5" inset vertical></v-divider>

        <v-btn size="x-small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>
        <v-btn size="x-small" icon="mdi-cog" @click="settings.showSetting = !settings.showSetting"> </v-btn>
        <Setting />

        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" prepend-icon="mdi-account-circle">
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
