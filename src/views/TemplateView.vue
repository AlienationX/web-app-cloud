<script setup>
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();
</script>

<template>
    <v-container>
        <div class="text-h6">
            Hi, this is <span class="text-button">{{ $route.path }}</span> page.
        </div>
        <!-- <p>Hi, this is {{ $route.params.name }} page.</p> -->
    </v-container>
</template>
