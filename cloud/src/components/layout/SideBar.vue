<script setup>
import { useSettingStore } from '../../stores/setting';

const settingStore = useSettingStore();
</script>

<template>
    <v-navigation-drawer v-model="settingStore.settings.isCollapse" color="grey-darken-2" permanent
        >nemus</v-navigation-drawer
    >
</template>

<style scoped lang="scss"></style>
