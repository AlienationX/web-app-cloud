<script setup>
const props = defineProps(['route']);

import { ref, onMounted } from 'vue';

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

onMounted(() => {
    const index = Math.floor(Math.random() * icons.length);
    icon.value = icons[index];
});
</script>

<template>
    <!-- <v-btn icon="mdi-calendar" size="x-large">多维分析</v-btn> -->
    <div class="text-center">
        <v-icon color="primary" size="60" :icon="icon"></v-icon>
        <span class="d-block text-caption">{{ icon.substring(4) }}</span>
    </div>
</template>

<style scoped lang="scss"></style>
