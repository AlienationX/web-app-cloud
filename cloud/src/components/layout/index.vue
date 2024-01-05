<script setup>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import BottomBar from './BottomBar.vue';
import Main from './Main.vue';
import Notification from './Notification.vue';

import Setting from '../Setting.vue';

import { ref, reactive, computed, onMounted } from 'vue';
import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;
</script>

<template>
    <!-- TODO 如果使用v-layout，则drawer无法固定，会随着内容伸长和向下移动。使用v-app就不再需要v-layout? -->
    <!-- <v-layout> -->
        <Notification />

        <SideBar />
        <NavBar />

        <!-- 右侧设置页面 -->
        <v-navigation-drawer v-model="settings.showNavBarSetting" temporary location="right" width="360" order="-2">
            <Setting />
        </v-navigation-drawer>

        <v-main>
            <Main></Main>
        </v-main>

        <!-- 底部导航栏 -->
        <BottomBar />
    <!-- </v-layout> -->
</template>

<style scoped lang="scss"></style>
