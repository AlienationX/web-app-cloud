<script setup>
import HelloWorld from '@/components/example/HelloWorld.vue';
</script>

<template>
    <!-- class="fill-height" 填补高度，垂直居中 -->
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12" class="d-flex align-center justify-center">
                <v-img src="/static/images/microsoft/team-services-get-started-account-manager.svg" width="360" height="200"></v-img>
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center">
                <HelloWorld msg="You did it!" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>
