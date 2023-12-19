<script setup>
import NavBar from './NavBar.vue'
import Sider from './Sider.vue'
import Main from './Main.vue'
import Notification from './Notification.vue';

import { onMounted } from 'vue';

import { useProfileStore } from '../../stores/profile.js'
const profileStore = useProfileStore()

// onMounted(() => {
//     profileStore.getInfo()
//     profileStore.getMenuRoutes()
// });
</script>
    
<template>
    <v-container>
        <Notification />
        <v-row>
            <!-- <v-col>
                <Sider />
            </v-col> -->
            <v-col cols="12">
                <NavBar />
            </v-col>     
            <v-col cols="12">
                <Main></Main>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
</style>