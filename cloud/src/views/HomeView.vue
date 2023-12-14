<script setup>
import { ref } from 'vue';

import FileTab from '../components/FileTab.vue';
import TaskTab from '../components/TaskTab.vue';
import LogTab from '../components/LogTab.vue';

import { useSettingsStore } from '../stores/settings';
import { useProfileStore } from '../stores/profile';

const settingsStore = useSettingsStore();
const profileStore = useProfileStore()

const tab = ref('file');
</script>

<template>
  <v-container>
    <v-snackbar
      v-model="settingsStore.settings.showLoginMsg"
      timeout="3000"
      location="top right"
      vertical
    >
      <div class="text-subtitle-1 pb-2">Hi {{ profileStore.info.username }}, 欢迎</div>

      <p>This is a longer paragraph explaining something</p>

      <template v-slot:actions>
        <!-- <v-btn
                color="primary"
                variant="text"
                @click="snackbar = false"
                >
                Close
                </v-btn> -->
        <v-btn density="compact" icon="mdi-close" color="primary"></v-btn>
      </template>
    </v-snackbar>

    <v-row>
      <v-col cols="12" class="justify-center">
        <v-sheet elevation="4">
          <v-tabs v-model="tab" color="deep-purple-accent-4" align-tabs="start">
            <v-tab value="file">文件</v-tab>
            <v-tab value="task">上传/下载</v-tab>
            <v-tab value="log">操作日志</v-tab>
          </v-tabs>
          <v-divider></v-divider>
          <v-window v-model="tab">
            <v-window-item value="file">
              <FileTab />
            </v-window-item>
            <v-window-item value="task">
              <TaskTab />
            </v-window-item>
            <v-window-item value="log">
              <LogTab />
            </v-window-item>
          </v-window>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
