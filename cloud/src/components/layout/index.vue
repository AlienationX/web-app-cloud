<script setup>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import BottomBar from './BottomBar.vue';
import Main from './Main.vue';
import Notification from './Notification.vue';
import Setting from './Setting.vue';

import { ref, onMounted } from 'vue';

// onMounted(() => {
//     profileStore.getInfo()
//     profileStore.getMenuRoutes()
// });
</script>

<template>
    <!-- TODO 如果使用v-layout，则drawer无法固定，会随着内容伸长和向下移动。使用v-app就不再需要v-layout? -->
    <!-- <v-layout> -->
        <Notification />
        <Setting />

        <SideBar />
        <NavBar />
        <v-main>
            <Main></Main>
        </v-main>
        <BottomBar />
    <!-- </v-layout> -->
</template>

<style scoped lang="scss"></style>
