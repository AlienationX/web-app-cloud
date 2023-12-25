<script setup>
import { reactive } from 'vue';
import { useSettingStore } from '../../stores/setting';

const settingStore = useSettingStore();
const settings = settingStore.settings;

const items = reactive([
    { text: 'My Files', icon: 'mdi-folder' },
    { text: 'Shared with me', icon: 'mdi-account-multiple' },
    { text: 'Starred', icon: 'mdi-star' },
    { text: 'Recent', icon: 'mdi-history' },
    { text: 'Offline', icon: 'mdi-check-circle' },
    { text: 'Uploads', icon: 'mdi-upload' },
    { text: 'Backups', icon: 'mdi-cloud-upload' },
]);
</script>

<template>
    <v-navigation-drawer
        v-model="settings.showSideBar"
        :temporary="settings.sideBarOverlay"
        expand-on-hover
        :rail="settings.sideBarExpand"
        color="grey-darken-3"
    >
        <v-list :lines="false" density="compact" nav>
            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                <template v-slot:prepend>
                    <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text"></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
