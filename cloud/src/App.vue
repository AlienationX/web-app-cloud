<script setup>
import { computed, ref, onMounted } from 'vue'

import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';
import HomeView from './views/HomeView.vue';

import Menulist from './components/test/MenuList.vue'
import Layout from './components/test/Layout.vue'
import Test from './components/test/Test.vue'

import { useProfileStore } from './stores/profile.js'
const profileStore = useProfileStore() // 获取到store的实例

const theme = ref("light")

const logined = computed(()=>{
    return profileStore.info.username == "guest" ? false : true
})

function changeTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    return "dark"
}


onMounted(() => {
    console.log(`the component is now mounted.`)
    // TODO 验证是否已登录，没有登录跳转到login页面
})
</script>

<template>
    <v-app :theme="theme">
        <v-layout>

            <template v-if="!logined">
                <v-container fluid>
                    <LoginView />
                </v-container>
                
            </template>

            <template v-else>
                <NarBar @changeTheme="changeTheme"/>
                <v-main>
                    <RouterView />
                </v-main>
            </template>

        </v-layout>
    </v-app>
</template>

<style scoped>
</style>
