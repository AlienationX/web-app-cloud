<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

import vuetify from './plugins/vuetify'

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
        // router.push({ path: '/login' })
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
    <v-app :theme="currentTheme">
        <router-view></router-view>
    </v-app>
</template>

<style scoped lang="scss">
</style>
