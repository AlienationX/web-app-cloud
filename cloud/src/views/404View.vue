<script setup>
import { useRouter } from 'vue-router';
const $router = useRouter();

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
            <v-col> </v-col>
            <v-col>
                <div class="text-h4">404</div>
                <div class="text-subtitle-1">你似乎来到了未知的领域...</div>
                <v-btn elevation="1" color="indigo" style="margin: 20px 8px" @click="goHome">去往首页</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
.v-container {
    max-width: none;
    div {
        margin: 8px;
    }
}

// .box {
//     background-color: rgb(233, 235, 236);
// }
</style>
