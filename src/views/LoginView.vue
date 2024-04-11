<script setup>
import FormPage from '@/components/FormPage.vue';

import { ref, reactive } from 'vue';
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
    const containerClass = ref('fill-height container');
    const cardClass = ref('mx-auto pa-12 pb-8');
    const formWidth = ref('460');
    const variant = ref('elevated');

    if (name.value === 'xs') {
        containerClass.value = '';
        // cardClass.value = 'mx-auto';
        // formWidth.value = '';
        // variant.value = 'flat';
    }
    return { containerClass, cardClass, formWidth, variant };
};

const useLogin = () => {
    const form = reactive({
        username: 'admin',
        password: 'admin',
        usernameHint: '输入用户名, such as admin1',
        passwordHint: 'Enter your password, such as 1234',
        agree: false,
    });

    const usernameRules = [
        (value) => {
            if (value) return true;
            return 'Name is required.';
        },
        (value) => {
            if (value?.length >= 5) return true;
            return 'Name must be more than 5 characters.';
        },
    ];

    const passwordRules = [
        (value) => {
            if (value) return true;
            return 'Password is required.';
        },
        (value) => {
            if (value?.length >= 2) return true;
            return 'Password must be more than 2 characters.';
        },
    ];

    const loading = ref(false);
    const message = ref(
        // 'Warning: After 3 consecutive failed login attempts, you account will be temporarily locked for three hours. If you must login now, you can also click "Forgot login password?" below to reset the login password.'
        '请输入github上的任意用户名作为用户登录，密码随意输入。同时可以使用手机浏览器打开该网页，适配手机应用，登录后可以安装并添加到手机桌面，就和原生的手机app应用一样，强烈推荐试用！'
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

    const changePWD = () => {
        console.log('change password do somethings');
    };

    const goToSignUp = () => {
        $router.push({ path: '/register' });
    };

    return { form, usernameRules, passwordRules, message, loading, visible, login, changePWD, goToSignUp };
};

const { containerClass, cardClass, formWidth, variant } = useFormStyle();
const { form, usernameRules, passwordRules, message, loading, visible, login, goToSignUp } = useLogin();
const title = import.meta.env.VITE_APP_TITLE;
</script>

<template>
    <v-container :class="containerClass">
        <FormPage v-if="name === 'xs'" :useLogin="useLogin"></FormPage>
        <!-- <v-img
            class="mx-auto my-6"
            max-width="228"
            src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
        ></v-img> -->

        <v-form v-else class="mx-auto">
            <v-card :class="cardClass" :width="formWidth" :variant="variant">
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
                    variant="solo-filled"
                    v-model="form.username"
                    :rules="usernameRules"
                    :hint="form.usernameHint"
                ></v-text-field>

                <div class="mb-1 text-body-2 text-medium-emphasis font-weight-bold">Password</div>

                <v-text-field
                    :append-inner-icon="visible.password ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible.password ? 'text' : 'password'"
                    density="compact"
                    single-line
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="solo-filled"
                    @click:append-inner="visible.password = !visible.password"
                    v-model="form.password"
                    :rules="passwordRules"
                    :hint="form.passwordHint"
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
                <v-btn class="text-blue text-caption" size="small" variant="text">Forgot login password?</v-btn>
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
                    <v-btn class="text-blue text-decoration-none" size="small" variant="text" @click="goToSignUp">
                        Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                    </v-btn>
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
