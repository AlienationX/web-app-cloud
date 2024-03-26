<script setup>
import HelloWorld from '@/components/example/HelloWorld.vue';

import { ref } from 'vue';

const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
    <!-- class="fill-height" 填补高度，垂直居中 -->
    <v-container>
        <v-row class="d-flex align-center justify-center">
            <v-img
                src="./static/images/microsoft/team-services-get-started-account-manager.svg"
                width="360"
                height="200"
            ></v-img>
        </v-row>
        <div class="text-center">
            <p class="text-h5 text-indigo-darken-3 font-weight-bold">{{ title }} PWA</p>
            <p class="text-h6 text-indigo-darken-3">Progressive Web App</p>
            <p class="text-title-1 text-indigo-darken-3">渐进式Web应用</p>
            <!-- <p class="text-title-1 text-indigo">eeeego，效仿google的发音，仅此而已</p> -->
            <p class="text-body-1">
                渐进式 Web 应用（Progressive Web App，PWA）是一个使用 web
                平台技术构建的应用程序，但它提供的用户体验就像一个特定平台的应用程序。
            </p>
            <p class="text-body-1">
                它像网站一样，PWA
                可以通过一个代码库在多个平台和设备上运行。它也像一个特定平台的应用程序一样，可以安装在设备上，可以离线和在后台运行，并且可以与设备和其他已安装的应用程序集成。
            </p>

            <p class="font-weight-bold">Eeeego, 模仿 谷歌google 的发音</p>

            <!-- <v-col cols="12" class="d-flex align-center justify-center">
                <HelloWorld msg="You did it!" />
            </v-col> -->
        </div>
    </v-container>
</template>

<style scoped>
p {
    padding: 10px;
}
</style>
