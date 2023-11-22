<template>
    <v-app pa-12 fluid>
        <v-layout>
            <NarBar/>
            <v-main>
                <RouterView/>
            </v-main>
        </v-layout>
    </v-app>
        <!-- <v-row v-if="!logined">
            <LoginView/>
        </v-row> -->
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';
import Menulist from './components/test/MenuList.vue'
import HomeView from './views/HomeView.vue';

import { ref } from 'vue'

const logined = ref(true)
</script>

<style scoped></style>
