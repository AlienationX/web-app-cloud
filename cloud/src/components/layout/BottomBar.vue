<script setup>
import { ref, reactive, onMounted } from 'vue';

import { useProfileStore } from '../../stores/profile.js';
import { useSettingStore } from '../../stores/setting.js'

const profileStore = useProfileStore();
const settingStore = useSettingStore();

const bottomRoutes = reactive([]);

onMounted(() => {
    profileStore.privilege.routes
        .filter((route) => route.path === '/')
        .map((homeRoute) => {
            if (homeRoute.children) {
                bottomRoutes.push(...homeRoute.children);
            }
        });
});
</script>

<template>
    <v-bottom-navigation grow class="d-flex d-sm-none" :density="settingStore.settings.density" color="primary" order="3">
        <v-btn
            v-for="route in bottomRoutes"
            :key="route.path"
            :value="route.name"
            class="text-caption"
            router
            :to="route.path"
        >
            <v-icon>{{ route.meta.icon }}</v-icon>
            <!-- <span>{{ route.meta.title }}</span> -->
        </v-btn>
    </v-bottom-navigation>
</template>

<style scoped lang="scss"></style>
