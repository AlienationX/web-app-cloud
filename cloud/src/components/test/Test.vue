<template>
    <v-app>
      <v-container class="pa-0" fluid style="width: 600px">
        <v-text-field v-model="msg" />
      </v-container>
    </v-app>
  </template>
  
  <script setup>
    import { ref } from 'vue'
  
    const msg = ref('Hello World!!!')
  </script>
