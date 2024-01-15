<script setup>
import MemuList from '../components/test/MenuList.vue';
import NavIconBtn from '@/components/NavIconBtn.vue';

import { ref, reactive, onMounted } from 'vue';

import { useProfileStore } from '../stores/profile';
const profileStore = useProfileStore();
const routes = reactive([]);

onMounted(() => {
    profileStore.privilege.routes
        // .filter((route) => route.meta.location === 'side')
        .map((route) => {
            if (route.path === '/' && route.children) {
                routes.push(route.children[0]);
            } else {
                routes.push(route);
            }
        });
});
</script>

<template>
    <v-container>
        <!-- <MemuList /> -->
        <!-- TODO 分组的流式瀑布的按钮菜单，类似联通移动的app -->
        <v-card class="mx-auto" hover>
            <v-card-item>
                <v-card-title> Card title </v-card-title>
                <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </v-card-text>
        </v-card>

        <v-container v-for="route in routes" :key="route.path">
            <v-card hover>
                <v-card-title> {{ route.meta.title }} </v-card-title>

                <v-card-actions>
                    <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>
                </v-card-actions>
            </v-card>
        </v-container>

        <NavIconBtn v-for="route in routes" :key="route.path"> 
        </NavIconBtn>
    </v-container>
</template>
