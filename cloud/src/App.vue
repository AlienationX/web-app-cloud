<template>
    <v-app :theme="theme">
        <v-layout>

            <template v-if="!logined">
                <Login/>
            </template>

            <template v-else>
                <NarBar/>
                <v-main>
                            <RouterView/>
                </v-main>
            </template>

        </v-layout>
    </v-app>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';
import HomeView from './views/HomeView.vue';

import Menulist from './components/test/MenuList.vue'
import Layout from './components/test/Layout.vue'
import Test from './components/test/Test.vue'

import { ref } from 'vue'

const logined = ref(true)
const theme = ref("light")


</script>

<style scoped>

</style>
