<template>
    <Test/>
    <!-- <v-container >
        <v-row v-if="!logined">
            <LoginView/>
        </v-row>
        <v-row v-else>
            <v-row>
                <NarBar/>
            </v-row>
            <v-row class="pa-4 text-center mx-auto" style="background-color: green">
                <v-col cols="12">
                    <RouterView/> 
                </v-col>
            </v-row>
        </v-row>
    </v-container> -->

    <!-- <LoginView v-if="!logined"/>
    <template v-else>
        <NarBar/>
        <RouterView/> 
    </template> -->
    
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';
import Test from './components/test/MenuList.vue';

import { ref } from 'vue'

const logined = ref(true)
</script>

<style scoped></style>
