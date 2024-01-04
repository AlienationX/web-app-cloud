<script setup>
import Setting from '../Setting.vue';

import { ref, reactive } from 'vue';
import { useSettingStore } from '../../stores/setting.js';
import { useProfileStore } from '../../stores/profile.js';
import config from '../../config.js';

const settingStore = useSettingStore();
const settings = settingStore.settings;

const profileStore = useProfileStore();
const userinfo = profileStore.userinfo;

const sideBarItems = reactive([
    { text: 'My Files', icon: 'mdi-folder' },
    { text: 'Shared with me', icon: 'mdi-account-multiple' },
    { text: 'Starred', icon: 'mdi-star' },
    { text: 'Recent', icon: 'mdi-history' },
    { text: 'Offline', icon: 'mdi-check-circle' },
    { text: 'Uploads', icon: 'mdi-upload' },
    { text: 'Backups', icon: 'mdi-cloud-upload' },
]);

const bottomItems = reactive([
    { text: 'Settings', icon: 'mdi-cog' },
    { text: 'Sign Out', icon: 'mdi-export' },
]);

const handle = (event, item) => {
    console.log(event, item);

    if (item.text === 'Settings') {
        settings.showSideBarSetting = true;
    } else if (item.text === 'Sign Out') {
        dialog.value = true;

        // 重置store的数据
        profileStore.$reset();
        // 跳转到登录页面
        $router.push({ path: '/login', query: { redirect: $route.path } });
    }

    // 关闭侧边栏
    settings.showSideBar = false;
};

const dialog = ref(false);
const notifications = ref(false);
const sound = ref(true);
const widgets = ref(false);
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
            <v-list-item v-for="(item, i) in sideBarItems" :key="i" :value="item" color="primary">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>
                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>

        <template v-slot:append>
            <!-- <v-btn size="x-small" :icon="settingStore.switchIcon" @click="switchTheme"> </v-btn>
            <v-btn size="x-small" icon="mdi-cog" @click="settings.showSetting = !settings.showSetting"> </v-btn> -->
            <v-divider class="d-flex d-sm-none"></v-divider>

            <v-list :lines="false" density="compact" nav>
                <v-list-item
                    class="d-flex d-sm-none"
                    color="primary"
                    v-for="(item, key) in bottomItems"
                    :key="key"
                    :value="item"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>
                    <v-list-item-title v-text="item.text" @click="(event) => handle(event, item)"></v-list-item-title>
                </v-list-item>
            </v-list>

            <!-- TODO  scrollable 无法滚动... -->
            <!-- <v-dialog
                v-model="settings.showSideBarSetting"
                fullscreen
                scrollable
                transition="dialog-bottom-transition"
            >
                <Setting />
            </v-dialog> -->

            <v-bottom-sheet v-model="settings.showSideBarSetting" fullscreen>
                <Setting />
            </v-bottom-sheet>

            <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
                <template v-slot:activator="{ props }">
                    <v-btn color="primary" dark v-bind="props"> Open Dialog </v-btn>
                </template>
                <v-card>
                    <v-toolbar dark color="primary">
                        <v-btn icon dark @click="dialog = false">
                            <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title>Settings</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                            <v-btn variant="text" @click="dialog = false"> Save </v-btn>
                        </v-toolbar-items>
                    </v-toolbar>
                    <v-container class="fluid">
                        <v-list lines="two" subheader>
                            <v-list-subheader>User Controls</v-list-subheader>
                            <v-list-item
                                title="Content filtering"
                                subtitle="Set the content filtering level to restrict apps that can be downloaded"
                            ></v-list-item>
                            <v-list-item
                                title="Password"
                                subtitle="Require password for purchase or use password to restrict purchase"
                            ></v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                        <v-list lines="two" subheader>
                            <v-list-subheader>General</v-list-subheader>
                            <v-list-item
                                title="Notifications"
                                subtitle="Notify me about updates to apps or games that I downloaded"
                            >
                                <template v-slot:prepend>
                                    <v-checkbox v-model="notifications"></v-checkbox>
                                </template>
                            </v-list-item>
                            <v-list-item title="Sound" subtitle="Auto-update apps at any time. Data charges may apply">
                                <template v-slot:prepend>
                                    <v-checkbox v-model="sound"></v-checkbox>
                                </template>
                            </v-list-item>
                            <v-list-item title="Auto-add widgets" subtitle="Automatically add home screen widgets">
                                <template v-slot:prepend>
                                    <v-checkbox v-model="widgets"></v-checkbox>
                                </template>
                            </v-list-item>
                        </v-list>
                    </v-container>
                </v-card>
            </v-dialog>
        </template>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
