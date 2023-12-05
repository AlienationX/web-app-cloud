<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import vuetify from './plugins/vuetify'

import router from './router'

import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';
import HomeView from './views/HomeView.vue';

import Menulist from './components/test/MenuList.vue'
import Layout from './components/test/Layout.vue'
import Test from './components/test/Test.vue'

import { useProfileStore } from './stores/profile.js'
const profileStore = useProfileStore() // 获取到store的实例

const currentTheme = ref("light")

const logined = computed(() => {
    return profileStore.info.username === "guest" ? false : true
})

function changeTheme() {
    currentTheme.value = currentTheme.value === 'light' ? 'dark' : 'light'
    return "dark"
}

function access() {
    if (profileStore.info.username === "guest") {
        console.log("not access, must login.")
        router.push({ path: '/login' })
    }
}


onMounted(() => {
    console.log(`the component is now mounted.`)
    // TODO undefined, 不能这么获取vuetify的配置信息
    console.log(`default theme: ${vuetify.theme}`, vuetify.theme.defaultTheme)
    // 验证是否已登录，没有登录跳转到login页面
    access()
})
</script>

<template>
    <!-- <Test/> -->
    <v-app :theme="currentTheme">
            <NarBar @changeTheme="changeTheme" v-if="logined"/>
            <v-main calss="box grey-lighten-3" bg-color="grey-lighten-3">
                <!-- <v-container> -->
                    <RouterView />
                <!-- </v-container> -->
            </v-main>
    </v-app>
</template>

<style scoped>
.box {
    background-color: grey;
}
</style>
