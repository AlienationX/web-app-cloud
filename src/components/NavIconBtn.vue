<script setup>
const props = defineProps(['route']);

import { ref } from 'vue';

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();

import { useGetIconSize } from '../hooks/useSize';

const useRandomMdiIcons = () => {
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

    const colors = [
        'primary',
        'secondary',
        'info',
        'warning',
        'success',
        'error',
        'red',
        'pink',
        'purple',
        'indigo',
        'green',
        'lime',
        'orange',
        'deep-orange',
    ];

    const index = Math.floor(Math.random() * icons.length);
    const icon = ref(icons[index]);

    const color = ref(colors[Math.floor(Math.random() * colors.length)]);

    return { icon, color };
};

const { icon, color } = useRandomMdiIcons();
const { iconSize } = useGetIconSize();

const btnRouter = (event, path) => {
    $router.push(path);
};
</script>

<template>
    <div class="text-center" @click="btnRouter($event, route.path)">
        <v-icon :color="color" :size="60" :icon="icon"></v-icon>
        <!-- <span class="d-block text-caption">{{ icon.substring(4) }}</span> -->
        <span class="d-block text-caption">{{ route.meta.title }}</span>
    </div>
</template>

<style scoped lang="scss"></style>
