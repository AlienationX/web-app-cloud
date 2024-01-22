<script setup>
const props = defineProps(['route']);

import { ref, onMounted } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();

import { useSettingStore } from '../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;

const icons = [
    'mdi-angular',
    'mdi-apple',
    'mdi-artstation',
    'mdi-aws',
    'mdi-bootstrap',
    'mdi-centos',
    'mdi-debian',
    'mdi-bulma',
    'mdi-digital-ocean',
    'mdi-docker',
    'mdi-electron-framework',
    'mdi-github',
    'mdi-google',
    'mdi-google-circles',
    'mdi-google-drive',
    'mdi-google-plus',
    'mdi-language-python',
    'mdi-laravel',
    'mdi-microsoft-edge',
    'mdi-microsoft-office',
    'mdi-microsoft-visual-studio',
    'mdi-nintendo-switch',
    'mdi-twitter',
];

const icon = ref('');

const btnRouter = (event, path) => {
    $router.push(path);
};

onMounted(() => {
    const index = Math.floor(Math.random() * icons.length);
    icon.value = icons[index];
});
</script>

<template>
    <div class="text-center" @click="btnRouter($event, route.path)">
        <v-icon color="primary" size="60" :icon="icon"></v-icon>
        <!-- <span class="d-block text-caption">{{ icon.substring(4) }}</span> -->
        <!-- <v-icon color="primary" size="60" :icon="route.meta.icon"></v-icon> -->
        <span class="d-block text-caption">{{ route.meta.title }}</span>
    </div>
</template>

<style scoped lang="scss"></style>
