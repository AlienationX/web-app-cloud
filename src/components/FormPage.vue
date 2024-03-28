<script setup>
const props = defineProps(['useLogin']);

const { form, usernameRules, passwordRules, message, loading, visible, login } = props.useLogin();
const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
    <v-form class="mx-auto">
        <v-card variant="flat" style="background-color: transparent">
            <!-- max-width="460" min-width="380" -->

            <v-img
                class="mx-auto my-12"
                max-width="228"
                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
            ></v-img>

            <!-- <v-row height="60" class="mx-auto my-12">
                <v-container class="fill-height">
                    <v-img src="./logo.png" class="ml-8" width="46" height="46"></v-img>
                    <p class="text-h6 font-weight-black text-uppercase">{{ title }}</p>
                </v-container>
            </v-row> -->

            <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Email or Username</div>

            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="underlined"
                color="blue"
                v-model="form.username"
                :rules="usernameRules"
            ></v-text-field>

            <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Password</div>

            <v-text-field
                density="compact"
                placeholder="Enter your password"
                prepend-inner-icon="mdi-lock-outline"
                variant="underlined"
                color="blue"
                v-model="form.password"
                :rules="passwordRules"
                :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
                :type="visible.password ? 'text' : 'password'"
                @click:append-inner="visible.password = !visible.password"
            ></v-text-field>

            <v-alert
                class="text-medium-emphasis text-caption"
                :model-value="visible.alert"
                :text="message"
                density="compact"
                closable
                @click:close="visible.alert = false"
            ></v-alert>

            <v-btn
                block
                class="mb-2 font-weight-bold mt-8"
                color="blue"
                variant="tonal"
                @click="login"
                :loading="loading"
            >
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

:deep(.v-input__details) {
    padding: 8px;
}
</style>
