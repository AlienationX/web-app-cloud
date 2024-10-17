<script setup>
import TheWelcome from '../components/example/TheWelcome.vue';

import { ref, reactive } from 'vue';
import { useAdapterStore } from '@/stores/adapter.js';

const adapterStore = useAdapterStore();

const useFabBtn = () => {
    // 绑定动态style
    const fabBtnStyle = reactive({
        position: 'fixed',
        bottom: '0px',
        right: '10px',
    });

    if (adapterStore.isPhone) {
        fabBtnStyle.bottom = '40px';
    }

    const goTopBtn = ref(false);
    const goTop = () => {
        console.log('go top', window.scrollY);
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // 启用平滑滚动效果
        });
    };

    const openBtn = ref(false);
    const bottomBtns = reactive([
        { text: 'Create', icon: 'mdi-plus-circle', action: function () {}, button: 'New' },
        { text: 'Edit', icon: 'mdi-note-edit', action: function () {} },
        { text: 'Comment', icon: 'mdi-comment', action: function () {}, badges: 2 },
        { text: 'Share', icon: 'mdi-share-variant', action: function () {} },
        { text: 'Star / Saved', icon: 'mdi-star', action: function () {} },
        { text: 'Delete', icon: 'mdi-delete', action: function () {} },
    ]);

    return { fabBtnStyle, goTop, openBtn, bottomBtns };
};

const { fabBtnStyle, goTop, openBtn, bottomBtns } = useFabBtn();
</script>

<template>
    <v-container>
        <v-card>
            <template v-for="i in 5" :key="i">
                <TheWelcome />
            </template>
        </v-card>

        <v-btn
            class="ma-5 d-none d-sm-flex"
            :style="fabBtnStyle"
            color="primary"
            icon="mdi-chevron-up"
            @click="goTop"
        ></v-btn>
        <v-btn
            class="ma-5 d-sm-none d-flex"
            :style="fabBtnStyle"
            color="red"
            icon="mdi-plus"
            @click="openBtn = true"
        ></v-btn>

        <v-bottom-sheet v-model="openBtn">
            <v-list :lines="false" density="compact" nav>
                <v-list-subheader class="font-weight-bold text-uppercase">Actions</v-list-subheader>
                <v-divider></v-divider>
                <v-list-item
                    v-for="(item, i) in bottomBtns"
                    :key="i"
                    :value="item"
                    router
                    :to="item.route"
                    @click="item.action"
                >
                    <template v-slot:prepend>
                        <!-- <v-icon :icon="item.icon" size="small"></v-icon> -->
                        <!-- <v-badge color="error" content="2"> -->
                        <v-icon :icon="item.icon" size="small"></v-icon>
                        <!-- </v-badge> -->
                    </template>

                    <template v-slot:append v-if="item.badges">
                        <v-badge color="error" :content="item.badges" inline></v-badge>
                    </template>
                    <template v-slot:append v-if="item.button">
                        <v-btn class="text-caption" color="success" size="x-small">{{ item.button }}</v-btn>
                    </template>

                    <v-list-item-title> {{ item.text }}</v-list-item-title>
                </v-list-item>
            </v-list>
        </v-bottom-sheet>
    </v-container>
</template>

<style scoped lang="scss">
// 未使用
.fixed-btn {
    position: fixed;
    bottom: 40px;
    right: 10px;
}
</style>
