<script setup>
import { ref } from 'vue'
import router from '../router'

import { useProfileStore } from '../stores/profile.js'

const profileStore = useProfileStore() // 获取到store的实例

const visible = ref(false)
const username = ref("")
const password = ref("")
const message = ref('Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.')

function login() {
    console.log(`username=${username.value} password=${password.value}`)
    if (username.value === "admin" && password.value === "admin"){
        message.value = "Loading..."
        profileStore.info.username = username.value
        router.push({ path: '/' })
    } else {
        message.value = "用户名和密码错误，请重新输入!"
    }
}
</script>

<template>
    <div>
      <!-- <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      ></v-img> -->
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="xxl"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="username"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Password
  
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Forgot login password?</a>
        </div>
  
        <v-text-field
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"

          v-model="password"
        ></v-text-field>
  
        <!-- <v-card
          class="mb-12"
          color="surface-variant"
          variant="tonal"
        >
          <v-card-text class="text-medium-emphasis text-caption" v-if="message">
            {{ message }}
          </v-card-text>
          <v-card-text class="text-medium-emphasis text-caption" v-else>
            Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.
          </v-card-text>
        </v-card> -->

        <v-alert 
            ref="alert"
            closable 
            density="compact" 
            :text="message" 
            class="text-medium-emphasis text-caption mb-8"
        ></v-alert>
  
        <v-btn
          block
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          @click="login"
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
  </template>

