<script setup>
import { ref } from 'vue'

import FileTab from '../components/FileTab.vue';
import TaskTab from '../components/TaskTab.vue';
import LogTab from '../components/LogTab.vue';

const tab = ref("file")
const snackbar = ref(true)  // notification


</script>


<template>
    <v-container >
        <v-snackbar
            v-model="snackbar"
            timeout="3000"
            location="bottom right"
            vertical
            >
            <div class="text-subtitle-1 pb-2">欢迎</div>

            <p>This is a longer paragraph explaining something</p>

            <template v-slot:actions>
                <!-- <v-btn
                color="primary"
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn> -->
                <v-btn density="compact" icon="mdi-open-in-new"></v-btn>
            </template>
        </v-snackbar>

        <v-row >
            <v-col cols="12" class="justify-center">
                <v-sheet elevation="4" >
                    <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start" >
                        <v-tab value="file">文件</v-tab>
                        <v-tab value="task">上传/下载</v-tab>
                        <v-tab value="log">操作日志</v-tab>
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

