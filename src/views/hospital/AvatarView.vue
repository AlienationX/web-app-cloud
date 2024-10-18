<script setup>
import { ref, reactive, toRef, onMounted, computed } from 'vue';
const tab = ref('image');
const files = ref([]);
</script>

<template>
    <v-container>
        <v-sheet>
            <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
                <v-tab value="image">图片头像</v-tab>
                <v-tab value="words">文字头像</v-tab>
            </v-tabs>
            <v-divider></v-divider>
            <v-window v-model="tab">
                <v-window-item value="image">
                    <v-container class="d-flex align-center justify-space-around">
                        <v-avatar size="100">
                            <v-img alt="John" src="https://cdn.vuetifyjs.com/images/john.jpg"></v-img>
                        </v-avatar>
                        <v-avatar>
                            <v-icon icon="mdi-arrow-right"></v-icon>
                        </v-avatar>
                        <v-avatar size="100">
                            <v-icon icon="mdi-account-circle" size="120"></v-icon>
                        </v-avatar>
                    </v-container>

                    <v-container>
                        <v-file-input
                            v-model="files"
                            label="Upload your avatar"
                            variant="underlined"
                            prepend-icon=""
                            append-inner-icon="mdi-camera"
                        >
                            <template v-slot:selection="{ fileNames }">
                                <template v-for="fileName in fileNames" :key="fileName">
                                    <v-chip class="me-2" color="primary" size="small" label>
                                        {{ fileName }}
                                    </v-chip>
                                </template>
                            </template>
                        </v-file-input>
                        <v-select
                            chips
                            color="primary"
                            label="Select"
                            :items="['像素风格', '动漫风格']"
                            variant="underlined"
                        ></v-select>
                        <div class="d-flex align-center justify-space-between">
                            <v-btn variant="tonal" size="small" prepend-icon="mdi-autorenew" color="primary"
                                >转换</v-btn
                            >
                            <p class="text-caption text-medium-emphasis">将图片转换成动漫风格或像素风格</p>
                        </div>
                    </v-container>
                </v-window-item>

                <v-window-item value="words">
                    <v-container>
                        <v-text-field
                            label="请输入你的名字，用来生成文字头像"
                            variant="underlined"
                            append-inner-icon="mdi-code-tags"
                            clearable
                        ></v-text-field>
                        <v-btn variant="tonal" size="small" prepend-icon="mdi-play" color="primary">确定</v-btn>
                        <v-container class="d-flex justify-center">
                            <v-avatar size="240">
                                <v-icon icon="mdi-account-circle" size="240"></v-icon>
                            </v-avatar>
                        </v-container>
                    </v-container>
                </v-window-item>
            </v-window>
        </v-sheet>
    </v-container>
</template>

<style scoped lang="scss"></style>
