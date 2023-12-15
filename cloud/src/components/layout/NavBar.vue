<script setup>
import { ref, reactive } from 'vue';

import { useProfileStore } from '../../stores/profile.js';
import { useSettingStore } from '../../stores/setting';

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

const profileStore = useProfileStore(); // 获取到store的实例
const settingStore = useSettingStore();

const toggle = ref(0);

const navLinks = reactive([
    { text: 'Home', icon: 'mdi-home', route: '/' },
    { text: 'User', icon: 'mdi-account-group', route: '/user' },
    { text: '权限管理', icon: 'mdi-security', route: '/security' },
    { text: 'About', icon: 'mdi-information', route: '/about' },
]);

const items = [{ title: '用户管理' }, { title: '角色管理' }, { title: '授权管理' }, { title: 'Click Me 2' }];

const profileLinks = reactive([
    { text: 'Document', icon: 'mdi-clock', route: '/document' },
    { text: 'Audience', icon: 'mdi-account', route: '' },
    { text: 'Setting', icon: 'mdi-cog', route: '' },
    { text: 'Sing Out', icon: 'mdi-export' },
]);

const switchTheme = () => {
    // 修改theme主题值
    settingStore.settings.theme = settingStore.settings.theme === 'light' ? 'dark' : 'light';
    // 切换图标，settingStore通过theme的计算属性处理
    // switchIcon.value = settingStore.settings.theme === 'light' ? 'mdi-weather-night' : 'mdi-weather-sunny';
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
</script>

<template>
    <v-app-bar fixed density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Cloud</v-toolbar-title>

        <v-btn-toggle v-model="toggle" rounded="0" borderless nav>
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
        </v-btn-toggle>

        <v-menu open-on-hover>
            <template v-slot:activator="{ props }">
                <v-btn v-bind="props" append-icon="mdi-menu-down" size="small"> 权限管理 </v-btn>
            </template>

            <v-list :lines="false" density="compact">
                <v-list-item v-for="(item, index) in items" :key="index" @click="(event) => handle(event, item)">
                    <v-list-item-title v-text="item.title" class="text-overline"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

        <!-- inset代表不占全部  -->
        <v-divider class="pl-5" inset vertical></v-divider>

        <v-btn size="x-small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>
        <v-btn size="x-small" icon="mdi-cog"> </v-btn>

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" prepend-icon="mdi-account-circle">
                    <span class="text-overline">Profile</span>
                </v-btn>
            </template>

            <v-list :lines="false" density="compact" nav width="200">
                <v-list-subheader>Profile</v-list-subheader>

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

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<style scoped lang="scss">
.v-list-item__append > .v-icon ~ .v-list-item__spacer {
    width: 0px;
}
</style>
