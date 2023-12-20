<script setup>
import { ref, onMounted } from 'vue';

// defineProps(['route']);  // 不定义变量接收，可以直接在template中使用。如果在script中使用必须定义接收变量，但是template还是可以不用
const props = defineProps(['route']);

let menuDownIcon = ref('mdi-chevron-down');  // mdi-chevron-down / mdi-menu-down

onMounted(() => {
    // 如果没有子路由或者子路由只有1个，则没有下拉箭头图标
    if (!props.route.children || props.route.children.length === 1) {
        menuDownIcon.value = '';
    }
});
</script>

<template>
    <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :append-icon="menuDownIcon" size="small" router :to="route.path">
                {{ route.meta.title }}
            </v-btn>
        </template>

        <v-list :lines="false" density="compact" v-if="menuDownIcon" nav>
            <v-list-item v-for="child in route.children" :key="child.path" router :to="child.path" color="primary">
                <template v-slot:append>
                    <v-icon :icon="child.meta.icon" size="small"></v-icon>
                </template>

                <v-list-item-title v-text="child.meta.title" ></v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<style scoped lang="scss">
// .v-btn__append {
//     grid-area: append;
//     /* margin-inline: calc(var(--v-btn-height) / 4.5) calc(var(--v-btn-height) / -9); */
// }
</style>
