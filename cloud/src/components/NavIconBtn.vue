<script setup>
const props = defineProps(['route']);
</script>

<template>
    <!-- <v-btn icon="mdi-calendar" size="x-large">多维分析</v-btn> -->
    <v-container>
        <v-avatar size="60" rounded="0">
            <!-- <v-img cover src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img> -->
            <v-icon color="primary" size="x-large" icon="mdi-calendar"></v-icon>
        </v-avatar>
        <p>日历</p>
    </v-container>
</template>

<style scoped lang="scss"></style>
