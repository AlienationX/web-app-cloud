<script setup>
const props = defineProps(['useLogin']);

const { form, message, loading, visible, login } = props.useLogin();
</script>

<template>
    <v-form class="mx-auto">
        <v-card variant="flat" style="background-color: transparent">

            <!-- max-width="460" min-width="380" -->
            <v-img
                class="mx-auto my-6"
                max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
            ></v-img>

            <!-- <v-row height="60" class="mx-auto my-6">
                    <v-img src="./logo.png" width="40" height="40"></v-img>
                    <p class="text-h6 font-weight-black text-medium-emphasis text-uppercase">{{ title }}</p>
                </v-row> -->

            <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Email or Username</div>

            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="underlined"
                color="blue"
                v-model="form.username"
                height="100px"
            ></v-text-field>

            <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Password</div>

            <v-text-field
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                color="blue"
                v-model="form.password"
                :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible.password ? 'text' : 'password'"
                @click:append-inner="visible.password = !visible.password"
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
                class="text-medium-emphasis text-caption mb-8"
                :model-value="visible.alert"
                :text="message"
                density="compact"
                closable
                @click:close="visible.alert = false"
            ></v-alert>
        
            <v-btn block class="mb-2 font-weight-bold" color="blue" variant="tonal" @click="login" :loading="loading">
                Log In
            </v-btn>

            <!-- <v-row justify="end"> -->
            <v-btn class="text-blue text-caption" size="small" variant="text">Forgot your password?</v-btn>
            <!-- </v-row> -->
        
            <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text>
        </v-card>
    </v-form>
</template>

<style scoped>
:deep(.v-field__outline) {
    padding: 20px;
}
</style>
