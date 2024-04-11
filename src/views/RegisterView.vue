<script setup>
import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();

const useRegister = () => {
    const goToLogin = () => {
        $router.push({ path: '/login' });
    };

    return { goToLogin };
};

const { goToLogin } = useRegister();
</script>

<template>
    <v-container class="fill-height fluid align-center justify-center">
        <v-form class="mx-auto">
            <v-card variant="flat" style="background-color: transparent">
                <!-- max-width="460" min-width="380" -->
                <v-container class="box">
                    <v-row no-gutters>
                        <v-col cols="12">
                            <v-img
                                class="mx-auto my-12"
                                max-width="228"
                                src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                            ></v-img>
                        </v-col>

                        <v-col cols="12">
                            <div class="mb-1 text-body-1 text-medium-emphasis font-weight-bold">Email or Username</div>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field
                                density="compact"
                                placeholder="Email address"
                                prepend-inner-icon="mdi-email-outline"
                                variant="underlined"
                                color="blue"
                            ></v-text-field>
                        </v-col>

                        <v-col
                            cols="12"
                            class="mb-1 text-body-1 text-medium-emphasis font-weight-bold d-flex justify-space-between"
                        >
                            Password
                            <a class="text-caption test-decoration-none text-blue"> Forget login password? </a>
                        </v-col>

                        <v-col cols="12">
                            <v-text-field
                                density="compact"
                                placeholder="Enter your password"
                                prepend-inner-icon="mdi-lock-outline"
                                variant="underlined"
                                color="blue"
                            ></v-text-field>
                        </v-col>

                        <v-btn block class="mb-2 font-weight-bold mt-8" color="blue" variant="tonal"> Register </v-btn>

                        <!-- <v-btn class="text-blue text-caption" size="small" variant="text">Forgot login password?</v-btn> -->

                        <v-card-text block class="text-center">
                            <v-btn
                                class="text-blue text-decoration-none"
                                size="small"
                                variant="text"
                                @click="goToLogin"
                            >
                                <v-icon icon="mdi-chevron-double-left"></v-icon>Login Now
                            </v-btn>
                        </v-card-text>
                    </v-row>
                </v-container>
            </v-card>
        </v-form>
    </v-container>
</template>

<style scoped lang="scss">
:deep(.v-field__outline) {
    padding: 20px;
}

:deep(.v-input__details) {
    padding: 8px;
}

.box {
    padding: 0px;
}
</style>
