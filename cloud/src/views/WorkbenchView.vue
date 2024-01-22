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
            if (!/login|any/.test(route.name)) {
                routes.push(route);
            }
        });
});
</script>

<template>
    <v-container>
        <!-- <MemuList /> -->
        <!-- TODO 分组的流式瀑布的按钮菜单，类似联通移动的app -->
        <v-card hover>
            <v-card-item>
                <v-card-title> Card title </v-card-title>
                <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
            </v-card-text>
        </v-card>

        <v-card hover class="my-5" v-for="route in routes" :key="route.path">
            <v-card-title class="text-subtitle-1"> {{ route.meta.title }} </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
                <v-row>
                    <v-col v-for="child in route.children" :key="child.path">
                        <NavIconBtn :route="child"></NavIconBtn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
