<script setup>
import { ref, reactive, h, render } from 'vue';
import { VSnackbar } from 'vuetify/components/VSnackbar';

import { useProfileStore } from '../stores/profile.js';
import { useSettingStore } from '../stores/setting.js';
const profileStore = useProfileStore();
const settingStore = useSettingStore();

import { useRouter, useRoute } from 'vue-router';
const $router = useRouter();
const $route = useRoute();

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
        snackbar: false,
        timeout: ref(2000),
    });

    const login = async () => {
        loading.value = true;
        await profileStore.userLogin(form.username, form.password); // 用户登录
        if (profileStore.userinfo.id) {
            const redirect = $route.query.redirect;
            $router.push({ path: redirect || '/' });
            settingStore.settings.showLayoutMsg = true;
        } else {
            message.value = '用户名和密码错误，请重新输入!';
            visible.snackbar = true;
            console.log(VSnackbar); // TODO 实现无限弹出通知框，vuetify好像不支持
        }
        loading.value = false;
    };

    return { form, message, loading, visible, login };
};

const { form, message, loading, visible, login } = useLogin();
</script>

<template>
    <v-container class="fill-height container">
        <!-- <v-img
        class="mx-auto my-6"
        max-width="228"
        src="https://cdn.vuetifyjs.com/docs/images/logos/vuetify-logo-v3-slim-text-light.svg"
      ></v-img> -->

        <v-card class="mx-auto pa-12 pb-8" elevation="8" width="448">
            <div class="mb-1 text-caption text-medium-emphasis">Email or Username</div>

            <v-text-field
                density="compact"
                placeholder="Email address"
                prepend-inner-icon="mdi-email-outline"
                variant="outlined"
                v-model="form.username"
            ></v-text-field>

            <div class="mb-1 text-overline text-medium-emphasis">Password</div>

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
                ref="alert"
                closable
                density="compact"
                :text="message"
                class="text-medium-emphasis text-caption mb-8"
            ></v-alert>

            <v-btn block class="mb-2" color="blue" variant="tonal" @click="login" :loading="loading"> Log In </v-btn>

            <div class="justify-right">
                <v-btn class="text-blue text-caption" size="small" variant="text">Forgot your password?</v-btn>
            </div>

            <v-snackbar v-model="visible.snackbar" :timeout="visible.timeout" location="top" vertical>
                <div class="text-subtitle-1 pb-2">Notification</div>

                <p>{{ message }}</p>

                <template v-slot:actions>
                    <v-btn color="indigo" variant="text" @click="visible.snackbar = false"> Close </v-btn>
                </template>
            </v-snackbar>

            <!-- <v-card-text class="text-center">
                <a class="text-blue text-decoration-none" href="#" rel="noopener noreferrer" target="_blank">
                    Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
                </a>
            </v-card-text> -->
        </v-card>
    </v-container>
</template>

<style scoped lang="scss">
.container {
    background: url('/g8_login_dark.svg') center top / auto no-repeat;
    background-size: cover;
    // transition: opacity 3s ease-in-out 0s;
}

.v-container {
    max-width: 100%;
}

// .v-text-field {
//     background-color: green;
//     height: 48px;
// }
</style>
