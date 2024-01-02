<script setup>
import { ref, reactive, computed, onMounted } from 'vue';
import { useSettingStore } from '../stores/setting';
const settingStore = useSettingStore();

const settings = settingStore.settings;

const tickLabels = reactive({
    0: 'Small',
    1: 'Medium',
    2: 'Large',
});

const close = (event, item) => {
    console.log(event, item);
    settings.showNavBarSetting = false;
    settings.showSideBarSetting = false;
};

// 定义的临时转换数据
const m = {
    compact: 0,
    comfortable: 1,
    default: 2,
};

// slider移动触发的事件
const move = (modelValue) => {
    for (let key in m) {
        if (m[key] === modelValue) {
            settings.density = key;
            break;
        }
    }
    console.log('slider move:', modelValue, settings.density);
};

// 计算属性
const tickValue = computed(() => {
    return m[settings.density];
});
</script>

<template>
    <!-- <v-container class="fluid"> -->
    <div>
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
                    自定义你的侧边栏和导航栏
                    <!-- <v-tooltip activator="parent" location="bottom">
                        自定义你的文档是明亮还是黑暗的主题，或者两者的结合
                    </v-tooltip> -->
                </p>
            </v-list-subheader>

            <v-list-item value="sideBarOrder">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch
                            v-model="settings.sideBarOrder"
                            :true-value="0"
                            :false-value="1"
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

            <v-list-item value="navBarHeight">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch
                            v-model="settings.navBarHeight"
                            true-value="default"
                            false-value="compact"
                            hide-details
                            color="primary"
                        ></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title class="text-subtitle-2 text-medium-emphasis">导航栏高度</v-list-item-title>
                <v-list-item-subtitle class="text-caption"> 增加导航栏的高度 </v-list-item-subtitle>
                <!-- 可以使用span包裹文件，并设置calss=text-truncate实现文本过长展示为省略号的效果 -->
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list lines="three" select-strategy="classic">
            <v-list-subheader>User Controls / 用户设置</v-list-subheader>

            <v-list-item value="silder">
                <!-- <template v-slot="{ isActive }"> -->
                <v-slider
                    :ticks="tickLabels"
                    :max="2"
                    step="1"
                    show-ticks="always"
                    tick-size="4"
                    track-size="4"
                    color="primary"
                    :model-value="tickValue"
                    @update:modelValue="move"
                >
                    <template v-slot:label>
                        <span class="text-subtitle-2 text-medium-emphasis">显示大小</span>
                    </template>
                    <template v-slot:tick-label="data">
                        <!-- 
                            data = {
                                tick: { value: number; position: number; label: string }
                                index: number
                            } 
                        -->
                        <span class="text-caption text-medium-emphasis text-uppercase"> {{ data.tick.label }}</span>
                    </template>
                </v-slider>
                <!-- :model-value="tickValue" -->
                <!-- tick-size 点的粗细 -->
                <!-- rack-size 线的粗细 -->
                <!-- </template> -->
            </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list lines="one" density="compact" select-strategy="classic">
            <v-list-subheader>Others / 其他设置</v-list-subheader>

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
                        <v-switch hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title>Sound</v-list-item-title>
                <v-list-item-subtitle> Auto-update apps at any time. Data charges may apply </v-list-item-subtitle>
            </v-list-item>

            <v-list-item value="widget">
                <template v-slot:prepend="{ isActive }">
                    <v-list-item-action start>
                        <v-switch hide-details color="primary"></v-switch>
                    </v-list-item-action>
                </template>
                <v-list-item-title>Widget</v-list-item-title>
                <v-list-item-subtitle> Auto-update apps at any time. Data charges may apply </v-list-item-subtitle>
            </v-list-item>
        </v-list>
    </div>
    <!-- </v-container> -->
</template>

<style scoped lang="scss"></style>
