<script setup>
import TheWelcome from '../components/TheWelcome.vue';
</script>

<template>
    <v-container>
        <v-card>
            <template v-for="i in 5" :key="i">
                <TheWelcome />
            </template>
        </v-card>
    </v-container>
</template>
