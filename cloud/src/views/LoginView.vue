<script setup>
import { ref, reactive } from 'vue'
import $router from '../router'

import { useProfileStore } from '../stores/profile.js'
import { useSettingsStore } from '../stores/settings.js'

const profileStore = useProfileStore()
const settingsStore = useSettingsStore()

const form = reactive({
    username: "admin",
    password: "admin",
})
const visible = reactive({
    password: false,
    snackbar: false,
    timeout: ref(2000)
})

const message = ref('Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.')

const login = () => {
    console.log(`username=${form.username} password=${form.password}`)
    if (form.username === "admin" && form.password === "admin"){
        // message.value = "Loading..."
        profileStore.info.username = form.username.value
        $router.push({ path: '/' })
        settingsStore.settings.login = true
    } else {
        message.value = "用户名和密码错误，请重新输入!"
        visible.snackbar = true
    }
}
</script>

<template>
    <v-container class="fill-height">
      <!-- <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      ></v-img> -->
  
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        width="448"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Account</div>
  
        <v-text-field
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
          v-model="form.username"
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
          :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible.password ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible.password = !visible.password"
          v-model="form.password"
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

        <v-snackbar
            v-model="visible.snackbar"
            :timeout="visible.timeout"
            location="top"
            vertical
            >
            <div class="text-subtitle-1 pb-2">Notification</div>

            <p>{{ message }}</p>

            <template v-slot:actions>
                <v-btn
                color="indigo"
                variant="text"
                @click="visible.snackbar = false"
                >
                Close
                </v-btn>
            </template>
        </v-snackbar>
  
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
    </v-container>
  </template>

<style scoped lang="scss">
</style>