<script setup>
import Setting from '../Setting.vue';

import { reactive } from 'vue';
import { useSettingStore } from '../../stores/setting';
import config from '../../config.js';

const settingStore = useSettingStore();
const settings = settingStore.settings;

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
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg">
                <template v-slot:append>
                    <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                </template>
                <v-list-item-title class="text-overline font-weight-black"> {{ config.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                    {{ config.system }}
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
                <!-- Setting -->
                <v-list-item class="d-flex d-sm-none" color="primary" value="settings">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-cog"></v-icon>
                    </template>

                    <!-- TODO  scrollable 无法滚动... -->
                    <v-dialog
                        v-model="settings.showSideBarSetting"
                        fullscreen
                        scrollable
                        :scrim="false"
                        transition="dialog-bottom-transition"
                    >
                        <template v-slot:activator="{ props }">
                            <v-list-item-title v-bind="props">Settings</v-list-item-title>
                        </template>
                        <Setting />
                    </v-dialog>
                </v-list-item>

                <!-- Exit -->
                <v-list-item class="d-flex d-sm-none" color="primary" value="exit">
                    <template v-slot:prepend>
                        <v-icon icon="mdi-export"></v-icon>
                    </template>
                    <v-list-item-title>Sign Out</v-list-item-title>
                </v-list-item>
            </v-list>
        </template>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
