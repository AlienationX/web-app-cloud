<script setup>
const items = [
    {
        title: 'Dashboard',
        disabled: false,
        href: 'breadcrumbs_dashboard',
    },
    {
        title: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
    },
    {
        title: 'Link 2',
        disabled: true,
        href: 'breadcrumbs_link_2',
    },
];
</script>

<template>
    <v-breadcrumbs bg-color="grey-lighten-2" :items="items"></v-breadcrumbs>
</template>

<style scoped lang="scss"></style>
