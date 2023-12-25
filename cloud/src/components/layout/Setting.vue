<script setup>
import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;
</script>

<template>
    <!-- <v-overlay v-model="settings.showSetting"></v-overlay> -->

    <v-navigation-drawer v-model="settings.showSetting" temporary location="right" order="-2">
        <v-container class="bg-grey-lighten-2 font-weight-bold"
            ><span>Settings</span>
            <v-btn icon="mdi-close" size="small"></v-btn>
        </v-container>
        <v-divider></v-divider>
        <v-switch
            v-model="settings.navBarOrder"
            true-value="-1"
            false-value="0"
            hide-details
            color="primary"
            label="侧边栏高度提升"
        ></v-switch>
        <v-switch
            v-model="settings.sideBarOverlay"
            hide-details
            inset
            color="primary"
            label="侧边栏临时弹出且使用阴影效果"
        ></v-switch>
        <v-switch
            v-model="settings.sideBarExpand"
            inline
            inset
            color="primary"
            label="侧边栏是否开启收缩效果"
        ></v-switch>
        <v-divider></v-divider>
        <v-list lines="three">
            <v-list-subheader>User Controls</v-list-subheader>

            <v-list-item>
                <v-list-item-title>Content filtering</v-list-item-title>

                <v-list-item-subtitle>
                    Set the content filtering level to restrict appts that can be downloaded
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item>
                <v-list-item-title>Password</v-list-item-title>

                <v-list-item-subtitle>
                    Require password for purchase or use password to restrict purchase
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list lines="three" select-strategy="classic">
            <v-list-subheader>General</v-list-subheader>

            <v-list-item value="notifications">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                    </v-list-item-action>
                </template>

                <v-list-item-title>Notifications</v-list-item-title>

                <v-list-item-subtitle>
                    Notify me about updates to apps or games that I downloaded
                </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="sound">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                    </v-list-item-action>
                </template>

                <v-list-item-title>Sound</v-list-item-title>

                <v-list-item-subtitle> Auto-update apps at any time. Data charges may apply </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="widgets">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-checkbox-btn :model-value="isActive"></v-checkbox-btn>
                    </v-list-item-action>
                </template>

                <v-list-item-title>Auto-add widgets</v-list-item-title>

                <v-list-item-subtitle>
                    Automatically add home screen widgets when downloads complete
                </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss">
.setting {
    width: 600px;
    height: 100vh;
    background-color: green;
}
</style>
