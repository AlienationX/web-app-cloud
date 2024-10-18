<script setup>
import NavIconBtn from '@/components/NavIconBtn.vue';

import { ref, reactive, onMounted } from 'vue';

import { useProfileStore } from '@/stores/profile';
const profileStore = useProfileStore();

const msgShow = ref(true);
const routes = reactive([]);

onMounted(() => {
    profileStore.privilege.routes
        // .filter((route) => route.meta.location === 'side')
        .map((route) => {
            if (!/login|register|production|any/.test(route.name)) {
                routes.push(route);
            }
        });
});
</script>

<template>
    <v-container class="pt-0">
        <!-- <MemuList /> -->
        <v-card hover v-show="msgShow" class="my-5">
            <v-card-item>
                <v-card-title> Enjoy our latest update :) </v-card-title>
                <v-card-subtitle> Card subtitle secondary text </v-card-subtitle>
            </v-card-item>

            <v-card-text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
                <p class="text-subtitle-1">What's new</p>
                <p>- newer upgrade</p>
                <p>- newer upgrade</p>
            </v-card-text>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="plain" size="small" color="warning" @click="msgShow = ! msgShow"
                    ><span class="text-caption font-weight-bold"> I got it ! </span></v-btn
                >
            </v-card-actions>
        </v-card>

        <v-card hover class="my-5" v-for="route in routes" :key="route.path">
            <v-card-title class="text-subtitle-1"> {{ route.meta.title }} </v-card-title>
            <!--<template v-slot:title>
                <!~~ v-card 增加 :prepend-icon="route.meta.icon" ~~>
                <span class="text-subtitle-1">{{ route.meta.title }}</span>
            </template>-->

            <v-divider></v-divider>

            <v-card-text>
                <v-row>
                    <v-col
                        v-for="child in route.children"
                        :key="child.path"
                        cols="3"
                        sm="2"
                        md="2"
                        lg="1"
                        xl="1"
                        xxl="1"
                    >
                        <!-- Props like justify-sm and justify-md exist, but justify-xs does not, it is simply justify -->
                        <!-- The xs prop does not exist on v-col. The equivalent to this is the cols prop -->
                        <!-- xs已不在存在，等同于cols的设置 -->
                        <NavIconBtn :route="child"></NavIconBtn>
                    </v-col>
                </v-row>
            </v-card-text>
        </v-card>
    </v-container>
</template>
