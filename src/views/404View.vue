<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';
const $router = useRouter();

import { useAdapterStore } from '@/stores/adapter.js';
const adapterStore = useAdapterStore();

// TODO 非相应式，勉强解决问题
const endClass = ref('');
if (!adapterStore.isPhone) {
    // 居右
    endClass.value = 'd-flex align-center justify-end';
}

const goHome = () => {
    $router.push({ path: '/' });
};
</script>

<template>
    <v-container class="fill-height fluid align-center justify-center box">
        <!-- bg-xxx   使用vuetify的背景颜色 -->
        <!-- text-xxx 使用vuetify的字体颜色 -->
        <!-- <div class="bg-purple-darken-2 text-center">
            <span class="text-purple-darken-4">Lorem ipsum</span>
        </div> -->
        <v-row>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6" xxl="6" :class="endClass">
                <v-img src="./static/images/flat/floss.svg" cover max-width="260"></v-img>
            </v-col>
            <v-col cols="12" sm="6" md="6" lg="6" xl="6" xxl="6">
                <div class="text-h4 text-indigo">Whoops, 404</div>
                <div class="text-subtitle-1">The page you were looking for does not exist...</div>
                <div class="text-subtitle-1">你似乎来到了未知的领域...</div>
                <v-btn
                    class="font-weight-bold"
                    color="indigo"
                    variant="outlined"
                    style="margin: 20px 8px"
                    @click="goHome"
                    >去往首页
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.v-container {
    max-width: none;
}

// .box {
//     background-color: rgb(233, 235, 236);
// }
</style>
