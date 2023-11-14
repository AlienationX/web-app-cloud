<template>
    <v-row class="px-md-10">
        <v-layout>
            <v-app-bar density="compact">
                <v-app-bar-nav-icon></v-app-bar-nav-icon>
                <v-toolbar-title>Cloud</v-toolbar-title>

                <!-- <v-divider vertical></v-divider>
            <v-btn color="primary" prepend-icon="mdi-home">Home</v-btn>
            <v-divider vertical></v-divider>
            <v-btn prepend-icon="mdi-account-group">Users</v-btn>
            <v-divider vertical></v-divider>
            <v-btn prepend-icon="mdi-security">权限分配</v-btn>
            <v-divider vertical></v-divider>
            <v-btn prepend-icon="mdi-information">About</v-btn>
            <v-divider vertical></v-divider> -->

                <v-btn-toggle v-model="icon" rounded="0" borderless>
                    <v-btn prepend-icon="mdi-home" value="Home" color="primary">Home</v-btn>
                    <v-btn prepend-icon="mdi-account-group">Users</v-btn>
                    <v-btn prepend-icon="mdi-security">权限分配</v-btn>
                    <v-btn prepend-icon="mdi-information">About</v-btn>
                </v-btn-toggle>

                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>

                <v-menu>
                    <template v-slot:activator="{ props }">
                        <v-btn color="primary" dark v-bind="props" prepend-icon="mdi-account-circle">
                            Profile
                        </v-btn>
                    </template>

                    <v-list density="compact">
                        <v-list-subheader>Profile</v-list-subheader>

                        <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                            <template v-slot:prepend>
                                <v-icon :icon="item.icon"></v-icon>
                            </template>

                            <v-list-item-title v-text="item.text"></v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>

            </v-app-bar>
        </v-layout>
    </v-row>
</template>

<script setup>
import { ref, reactive } from 'vue'

const icon = ref(0)

const items = reactive(
    [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Setting', icon: 'mdi-cog' },
        { text: 'Sing Out', icon: 'mdi-export' },
    ]
)
</script>