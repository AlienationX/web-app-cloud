<script setup>
import { ref, reactive } from 'vue'
import { useProfileStore } from '../stores/profile.js'

const profileStore = useProfileStore() // 获取到store的实例
const emit = defineEmits([ "changeTheme" ]);
const toggle = ref(0)
let switchIcon = ref("mdi-weather-night")

const navLinks = reactive(
    [
        { text: 'Home', icon: 'mdi-home', route: "/" },
        { text: 'User', icon: 'mdi-account-group', route: "/user" },
        { text: '权限管理', icon: 'mdi-security', route: "/security" },
        { text: 'About', icon: 'mdi-information', route: "/about" },
    ]
)

const profileLinks = reactive(
    [
        { text: 'Document', icon: 'mdi-clock', route: "/document" },
        { text: 'Audience', icon: 'mdi-account', route: "" },
        { text: 'Setting', icon: 'mdi-cog', route: "" },
        { text: 'Sing Out', icon: 'mdi-export', route: "/login" },
    ]
)

function switchTheme() {
    // 切换图标
    switchIcon.value = switchIcon.value === "mdi-weather-night" ? "mdi-weather-sunny" : "mdi-weather-night"

    // 调用父组件的changeTheme方法
    emit('changeTheme')
}

function logout() {
    console.log("logout")
    // TODO 弹出对话框确认
    profileStore.info.username="guest"
}

const handle=(event,item)=>{
    console.log(event, item);
    console.log(`click ${item.text}`)
    // 如果点击sing out按钮，则退出登录
    if (item.text === "Sing Out") logout()
}
                 
</script>

<template>
    <v-app-bar app absolute density="compact">
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title>Cloud</v-toolbar-title>

        <v-btn-toggle v-model="toggle" rounded="0" borderless nav>
            <v-btn v-for="(item, i) in navLinks" :key="i" :value="item" :prepend-icon="item.icon" router :to="item.route">
                {{ item.text }}
            </v-btn>
        </v-btn-toggle>

        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>

        <v-btn size="x-small" :icon="switchIcon" @click="switchTheme">
        </v-btn>
            <!-- <v-tooltip
                activator="parent"
                location="bottom"
            >切换theme</v-tooltip> -->

        <v-menu>
            <template v-slot:activator="{ props }">
                <v-btn color="primary"  v-bind="props" prepend-icon="mdi-account-circle">
                    Profile
                </v-btn>
            </template>

            <v-list density="compact" width="200" nav>
                <v-list-subheader>Profile</v-list-subheader>

                <v-list-item v-for="(item, i) in profileLinks" 
                    :key="i" 
                    :value="item" 
                    router :to="item.route" 
                    @click="event=>handle(event, item)"
                    color="primary" 
                    height="16">
                    <template v-slot:prepend>
                        <v-icon :icon="item.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>

    </v-app-bar>
</template>