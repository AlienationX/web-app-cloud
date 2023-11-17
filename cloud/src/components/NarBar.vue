<template>
        <v-layout>
            <v-app-bar density="compact">
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

                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary"  v-bind="props" prepend-icon="mdi-account-circle">
                            Profile
                        </v-btn>
                    </template>

                    <v-list density="compact" width="200" nav>
                        <v-list-subheader>Profile</v-list-subheader>

                        <v-list-item v-for="(item, i) in profileLinks" :key="i" :value="item" router :to="item.route" color="primary" height="20">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-app-bar>
        </v-layout>
</template>

<script setup>
import { ref, reactive } from 'vue'

const toggle = ref(0)

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

function signOut() {

}
</script>