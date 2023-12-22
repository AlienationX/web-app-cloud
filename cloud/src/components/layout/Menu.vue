<script setup>
import { ref, onMounted } from 'vue';

// defineProps(['route']);
// 不定义变量接收，可以直接在template中使用。如果在script中使用必须定义接收变量，但是template还是可以不用写props前缀
const props = defineProps(['route']);

const menuDownIcon = ref('mdi-chevron-down'); // mdi-chevron-down / mdi-menu-down
const levelOnePath = ref(props.route.path);

onMounted(() => {
    if (!props.route.children || props.route.children.length === 1) {
        // 如果没有子路由或者子路由只有1个，则没有下拉箭头图标
        menuDownIcon.value = '';
    } else {
        // 设置有下拉箭头的菜单的一级路由点击无效
        levelOnePath.value = '';
    }
});
</script>

<template>
    <v-menu open-on-hover>
        <template v-slot:activator="{ props }">
            <v-btn v-bind="props" :append-icon="menuDownIcon" size="small" router :to="levelOnePath">
                {{ route.meta.title }}
            </v-btn>
        </template>

        <v-list :lines="false" density="compact" v-if="menuDownIcon" nav>
            <v-list-item v-for="child in route.children" :key="child.path" router :to="child.path" color="primary">
                <template v-slot:append>
                    <v-icon :icon="child.meta.icon" size="small"></v-icon>
                </template>

                <v-list-item-title v-text="child.meta.title"></v-list-item-title>
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
