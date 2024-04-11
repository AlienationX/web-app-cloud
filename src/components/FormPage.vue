<script setup>
const props = defineProps(['useLogin']);

const { form, usernameRules, passwordRules, message, loading, visible, login, changePWD, goToSignUp } =
    props.useLogin();
const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
    <v-container class="fill-height fluid align-center justify-center box">
        <v-form class="mx-auto">
            <v-card variant="flat" style="background-color: transparent">
                <v-container class="box">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-img
                                class="mx-auto my-8"
                                max-width="228"
                                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                            ></v-img>
                        </v-col>

                        <!-- <v-row height="60" class="mx-auto my-12">
                            <v-container class="fill-height">
                                <v-img src="./logo.png" class="ml-8" width="46" height="46"></v-img>
                                <p class="text-h6 font-weight-black text-uppercase">{{ title }}</p>
                            </v-container>
                        </v-row> -->

                        <v-col cols="12">
                            <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Email or Username</div>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                density="compact"
                                placeholder="Email address"
                                prepend-inner-icon="mdi-email-outline"
                                variant="underlined"
                                color="blue"
                                v-model="form.username"
                                :rules="usernameRules"
                                :hint="form.usernameHint"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            class="mb-1 text-body-1 text-medium-emphasis font-weight-bold d-flex justify-space-between"
                        >
                            Password
                            <a class="text-caption test-decoration-none text-blue" @click="changePWD">
                                Forget login password?
                            </a>
                            <!-- <v-btn class="text-blue text-caption" size="small" variant="text">Forgot your password?</v-btn> -->
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                density="compact"
                                placeholder="Enter your password"
                                prepend-inner-icon="mdi-lock-outline"
                                variant="underlined"
                                color="blue"
                                v-model="form.password"
                                :rules="passwordRules"
                                :hint="form.passwordHint"
                                :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
                                :type="visible.password ? 'text' : 'password'"
                                @click:append-inner="visible.password = !visible.password"
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="mt-2">
                            <v-sheet height="120" style="background-color: transparent">
                                <v-alert
                                    class="text-medium-emphasis text-caption"
                                    :model-value="visible.alert"
                                    :text="message"
                                    density="compact"
                                    closable
                                    @click:close="visible.alert = false"
                                ></v-alert>
                            </v-sheet>
                        </v-col>

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

                        <!-- <v-btn class="text-blue text-caption" size="small" variant="text" @click="changePWD"
                            >Forgot your password?</v-btn
                        > -->

                        <v-card-text class="text-center">
                            <v-btn
                                class="text-blue text-decoration-none"
                                size="small"
                                variant="text"
                                @click="goToSignUp"
                            >
                                <span class="text-body-2">Sign Up Now</span>
                                <v-icon icon="mdi-chevron-double-right"></v-icon>
                            </v-btn>
                        </v-card-text>

                        <v-col cols="12">
                            <v-checkbox v-model="form.agree" color="primary">
                                <template v-slot:label>
                                    <div class="text-body-2">
                                        I agree that
                                        <v-tooltip location="bottom">
                                            <template v-slot:activator="{ props }">
                                                <a
                                                    href="https://vuetifyjs.com"
                                                    target="_blank"
                                                    v-bind="props"
                                                    @click.stop
                                                >
                                                    Vuetify
                                                </a>
                                            </template>
                                            Opens in new window
                                        </v-tooltip>
                                        is awesome
                                    </div>
                                </template>
                            </v-checkbox>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card>
        </v-form>
    </v-container>
</template>

<style scoped>
:deep(.v-field__outline) {
    padding: 20px;
}

:deep(.v-input__details) {
    padding: 12px 8px 8px 8px;
}

.box {
    padding: 0px;
}
</style>
