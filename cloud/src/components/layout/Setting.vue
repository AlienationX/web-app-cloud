<script setup>
import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;
</script>

<template>
    <v-overlay v-model="settings.showSetting">
        <v-container class="fill-height">
            <v-row>
                <v-col cols="12" class="d-flex align-center justify-center">
                    <img mx-auto alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
                </v-col>
                <v-col cols="12" class="d-flex align-center justify-center">
                    <p>you did it</p>
                </v-col>
            </v-row>
        </v-container>
    </v-overlay>
</template>

<style scoped lang="scss">
.setting {
    width: 600px;
    height: 100vh;
    background-color: green;
}
</style>
