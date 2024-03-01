<script setup>

import { useSettingStore } from '../../stores/setting';
import { useProfileStore } from '../../stores/profile';

const settingStore = useSettingStore();
const profileStore = useProfileStore();
</script>

<template>
    <v-snackbar v-model="settingStore.settings.showLayoutMsg" timeout="3000" location="top right" vertical>
        <div class="text-subtitle-1 font-weight-bold pb-2">Hi {{ profileStore.userinfo.username }}</div>

        <p>This is a longer paragraph explaining something</p>
        <p>欢迎回来</p>

        <template v-slot:actions>
            <!-- <v-btn
                color="primary"
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn> -->
            <v-btn
                density="compact"
                icon="mdi-close"
                color="primary"
                @click="settingStore.settings.showLayoutMsg = false"
            ></v-btn>
        </template>
    </v-snackbar>
</template>

<style scoped lang="scss"></style>
