<script setup>
import Setting from '../Setting.vue';

import { ref, reactive, onMounted } from 'vue';
import { useSettingStore } from '../../stores/setting.js';
import { useProfileStore } from '../../stores/profile.js';

const settingStore = useSettingStore();
const settings = settingStore.settings;

const profileStore = useProfileStore();
const userinfo = profileStore.userinfo;

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

const useSideBar = () => {
    const sideBarItems = reactive([]);
    profileStore.privilege.routes
        .filter((route) => route.meta.location === 'side')
        .map((route) => {
            if (route.path === '/' && route.children) {
                sideBarItems.push(route.children[0]);
            } else {
                sideBarItems.push(route);
            }
        });

    const openSetting = () => {
        settings.showSideBarSetting = true;
    };

    const signOut = () => {
        // 重置store的数据
        profileStore.$reset();
        // 跳转到登录页面
        $router.push({ path: '/login', query: { redirect: $route.path } });
    };

    const bottomItems = reactive([
        { text: 'Settings', icon: 'mdi-cog', handle: openSetting },
        { text: 'Sign Out', icon: 'mdi-export', handle: signOut },
    ]);

    return { sideBarItems, bottomItems };
};

const { sideBarItems, bottomItems } = useSideBar();
</script>

<template>
    <v-navigation-drawer
        v-model="settings.showSideBar"
        :temporary="settings.sideBarOverlay"
        :rail="settings.sideBarExpand"
        :order="settings.sideBarOrder"
        expand-on-hover
        color="grey-darken-3"
    >
        <!-- Avatar -->
        <v-list v-if="settings.sideBarOrder === 0 ? true : false">
            <!-- <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"> -->
            <v-list-item :prepend-avatar="userinfo.avatar_url">
                <template v-slot:append>
                    <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                </template>
                <v-list-item-title class="text-overline font-weight-black"> {{ userinfo.username }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                    {{ userinfo.location || userinfo.html_url }}
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <!-- Menu -->
        <v-list :lines="false" density="compact" nav>
            <!-- <v-list-item v-for="(item, i) in sideBarItems" :key="i" :value="item" color="primary">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item> -->

            <v-list-item prepend-icon="mdi-home" title="Home" route to="/"></v-list-item>

            <v-list-group v-for="route in sideBarItems" :key="route.path" :value="route.name">
                <template v-slot:activator="{ props }">
                    <v-list-item v-bind="props" :title="route.meta.title" :prepend-icon="route.meta.icon"></v-list-item>
                </template>

                <v-list-item
                    v-for="child in route.children"
                    :key="child.path"
                    :value="child.meta.title"
                    :title="child.meta.title"
                    color="primary"
                    router
                    :to="child.path"
                ></v-list-item>
            </v-list-group>
        </v-list>

        <!-- 底部导航按钮 -->
        <template v-slot:append>
            <v-divider class="d-flex d-sm-none"></v-divider>

            <v-list :lines="false" density="compact" nav>
                <v-list-item
                    class="d-flex d-sm-none"
                    color="primary"
                    v-for="(item, key) in bottomItems"
                    :key="key"
                    :value="item"
                    @click="item.handle"
                    :active="false"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>

            <!-- <v-dialog
                v-model="settings.showSideBarSetting"
                fullscreen
                scrollable
                transition="dialog-bottom-transition"
            >
                <v-card>
                    <Setting />
                </v-card>
            </v-dialog> -->

            <v-bottom-sheet v-model="settings.showSideBarSetting" fullscreen>
                <!-- 如果不用card包裹则没有滚动条 -->
                <v-card>
                    <Setting />
                </v-card>
            </v-bottom-sheet>
        </template>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
