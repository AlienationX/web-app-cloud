<script setup>
import { ref, reactive, h, render } from 'vue';
import { useDisplay } from 'vuetify';
const { name } = useDisplay();

import { VSnackbar } from 'vuetify/components/VSnackbar';

import { useProfileStore } from '../stores/profile.js';
import { useSettingStore } from '../stores/setting.js';
const profileStore = useProfileStore();
const settingStore = useSettingStore();

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

const useFormStyle = () => {
    const formWidth = ref(360);
    const variant = ref('flat');
    const elevation = ref();
    console.log('form ');
    if (name.value !== 'xs') {
        console.log('from style', name.value);
        formWidth.value = 460;
        variant.value = 'elevated'; // elevation="8"
        elevation.value = 8;
    }
    return { formWidth, variant, elevation };
};

const useLogin = () => {
    const form = reactive({
        username: 'admin',
        password: 'admin',
    });
    const loading = ref(false);
    const message = ref(
        'Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.'
    );
    const visible = reactive({
        password: false,
        alert: true,
        snackbar: false,
        timeout: ref(3000),
    });

    const login = async () => {
        loading.value = true;
        await profileStore.userLogin(form.username, form.password); // 用户登录
        if (profileStore.userinfo.id) {
            const redirect = $route.query.redirect;
            $router.push({ path: redirect || '/' });
            // 手机端界面太小，不弹出欢迎消息框。使用css的 class="d-none d-sm-flex" 控制失败
            if (name.value !== 'xs') {
                settingStore.settings.showLayoutMsg = true;
            }
        } else {
            message.value = profileStore.message;
            visible.alert = true;
            visible.snackbar = true;
            console.log(VSnackbar); // TODO 实现无限弹出通知框，vuetify好像不支持
        }
        loading.value = false;
    };

    return { form, message, loading, visible, login };
};

const { formWidth, variant, elevation } = useFormStyle();
const { form, message, loading, visible, login } = useLogin();
</script>

<template>
    <v-container class="fill-height container">
        <!-- <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img> -->

        <v-form class="mx-auto">
            <v-card class="mx-auto pa-12 pb-8" :width="formWidth" elevation="8">
                <!-- max-width="460" min-width="380" -->
                <v-img
                    class="mx-auto my-6"
                    max-width="228"
                    src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
                ></v-img>

                <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Email or Username</div>

                <v-text-field
                    density="compact"
                    placeholder="Email address"
                    prepend-inner-icon="mdi-email-outline"
                    variant="outlined"
                    v-model="form.username"
                ></v-text-field>

                <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Password</div>

                <v-text-field
                    :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible.password ? 'text' : 'password'"
                    density="compact"
                    single-line
                    flat
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
                    class="text-medium-emphasis text-caption mb-8"
                    :model-value="visible.alert"
                    :text="message"
                    density="compact"
                    closable
                    @click:close="visible.alert = false"
                ></v-alert>

                <v-btn
                    block
                    class="mb-2 font-weight-bold"
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

                <!-- 手机端不显示,css的d-none无法控制 -->
                <v-snackbar v-model="visible.snackbar" :timeout="visible.timeout" location="top" vertical>
                    <p class="text-info text-subtitle-1 font-weight-bold pb-2">Notification</p>

                    <p class="text-caption">{{ message }}</p>

                    <template v-slot:actions>
                        <v-btn class="font-weight-bold" color="red" variant="text" @click="visible.snackbar = false">
                            Close
                        </v-btn>
                    </template>
                </v-snackbar>

                <v-card-text class="text-center">
                    <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </a>
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<style scoped lang="scss">
.container {
    // background: url('@/assets/images/background_login_dark.svg') center top / auto no-repeat;
    background: url('/static/background_login_dark.svg') center top / auto no-repeat;
    background-size: cover;
    // transition: opacity 3s ease-in-out 0s;
}

.v-container {
    max-width: 100%;
}

:deep(.v-alert__close) {
    align-self: flex-start;
    margin-inline-start: 0px;
}
</style>
