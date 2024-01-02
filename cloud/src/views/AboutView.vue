<script setup>
import HelloWorld from '../components/example/HelloWorld.vue';
</script>

<template>
    <!-- class="fill-height" 填补高度，垂直居中 -->
    <v-container class="fill-height">
        <v-row>
            <v-col cols="12" class="d-flex align-center justify-center">
                <img mx-auto alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
            </v-col>
            <v-col cols="12" class="d-flex align-center justify-center">
                <HelloWorld msg="You did it!" />
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped></style>
