<template>
    
    <LoginView v-if="!logined"/>
    <template v-else>
        <NarBar/>
        <RouterView/> 
    </template>
    
    <!-- <header> -->
        <!-- <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" /> -->

        <!-- <div class="wrapper">
            <HelloWorld msg="You did it!" /> -->

      <!-- <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav> -->
        <!-- </div> -->
        
    <!-- </header> -->

    
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import LoginView from './views/LoginView.vue';
import NarBar from './components/NarBar.vue';

import { ref } from 'vue'

const logined = ref(true)
</script>

<style scoped></style>
