<script setup>
import { useSettingStore } from '../../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;

const close = () => {
    settings.showSetting = false;
};
</script>

<template>
    <v-navigation-drawer v-model="settings.showSetting" temporary location="right" order="-2">
        <v-list>
            <v-list-item class="text-overline" title="Settings" subtitle="设置">
                <template v-slot:append>
                    <v-btn icon="mdi-close" size="small" @click="close"></v-btn>
                </template>
                <!-- <v-list-item-title class="text-subtitle-1 font-weight-bold ">Settings</v-list-item-title>
                <v-list-item-subtitle class="text-body-2">设置</v-list-item-subtitle> -->
            </v-list-item>
        </v-list>
        <v-divider></v-divider>

        <!-- :lines="false" 会换行显示所有内容，lines=one多出的内容会用省略号显示 -->
        <v-list lines="one" density="compact">
            <!-- <v-list-subheader>General 常规 / 主题设置 / 导航设置</v-list-subheader> -->
            <v-list-subheader>
                <p class="text-subtitle-2">General 常规</p>
                <p class="text-caption text-disabled">
                    自定义你的侧边栏
                    <!-- <v-tooltip activator="parent" location="bottom">
                        自定义你的文档是明亮还是黑暗的主题，或者两者的结合
                    </v-tooltip> -->
                </p>
            </v-list-subheader>

            <v-list-item value="navBarOrder">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch
                            v-model="settings.navBarOrder"
                            :true-value="0"
                            :false-value="-1"
                            hide-details
                            color="primary"
                        ></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title class="text-subtitle-2 text-medium-emphasis">侧边栏高度</v-list-item-title>
                <v-list-item-subtitle class="text-caption">修改侧边栏高度为全屏高度</v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="sideBarOverlay">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch v-model="settings.sideBarOverlay" hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title class="text-subtitle-2 text-medium-emphasis">临时弹出效果</v-list-item-title>
                <v-list-item-subtitle class="text-caption"> 使用阴影效果临时弹出侧边栏 </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="sideBarExpand">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch v-model="settings.sideBarExpand" hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title class="text-subtitle-2 text-medium-emphasis">收缩效果</v-list-item-title>
                <v-list-item-subtitle class="text-caption"> 侧边栏自动收缩窄型，只显示图标 </v-list-item-subtitle>
                <!-- 可以使用span包裹文件，并设置calss=text-truncate实现文本过长展示为省略号的效果 -->
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list lines="one" density="compact" select-strategy="classic">
            <v-list-group></v-list-group>
            <v-list-subheader>User Controls / 用户设置</v-list-subheader>

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
                        <v-switch v-model="settings.sideBarOverlay" hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle> Auto-update apps at any time. Data charges may apply </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="widget">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch v-model="settings.sideBarExpand" hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle> Auto-update apps at any time. Data charges may apply </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>

<style scoped lang="scss"></style>
