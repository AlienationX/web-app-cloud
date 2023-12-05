<script setup>
import { ref } from 'vue'

import FileTab from '../components/FileTab.vue';
import TaskTab from '../components/TaskTab.vue';
import LogTab from '../components/LogTab.vue';

const tab = ref("file")


</script>


<template>
    <v-container >
        <v-row >
            <v-col cols="12" class="justify-center">
                <v-sheet elevation="4" >
                    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start" >
                        <v-tab :value="file">文件</v-tab>
                        <v-tab :value="task">上传/下载</v-tab>
                        <v-tab :value="log">操作日志</v-tab>
                    </v-tabs>
                    <v-divider></v-divider>
                    <v-window v-model="tab">
                        <v-window-item value="file">
                            <FileTab/>
                        </v-window-item>
                        <v-window-item value="task">
                            <TaskTab/>
                        </v-window-item>
                        <v-window-item value="log">
                            <LogTab/>
                        </v-window-item>
                    </v-window>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
</template>

