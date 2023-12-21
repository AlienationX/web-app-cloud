<script setup>
import NavBar from './NavBar.vue';
import SideBar from './SideBar.vue';
import Main from './Main.vue';
import Notification from './Notification.vue';

import { ref, onMounted } from 'vue';

// onMounted(() => {
//     profileStore.getInfo()
//     profileStore.getMenuRoutes()
// });
</script>

<template>
    <v-layout>
        <Notification />

        <SideBar />
        <NavBar />
        <v-main>
            <Main></Main>
        </v-main>
    </v-layout>
</template>

<style scoped lang="scss"></style>
