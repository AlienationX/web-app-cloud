<script setup>
import {ref} from 'vue'
const tab = ref(null)
</script>


<template>
  <v-card max-width="1000">
    <v-tabs
      v-model="tab"
      color="deep-purple-accent-4"
      align-tabs="start"
      mobile-breakpoint="xxl"
    >
      <v-tab :value="1">文件</v-tab>
      <v-tab :value="2">上传/下载</v-tab>
      <v-tab :value="3">操作日志</v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item
        v-for="n in 3"
        :key="n"
        :value="n"
      >
        <v-container fluid>
          <v-row>
            <v-col
              v-for="i in 6"
              :key="i"
              cols="12"
              md="4"
            >
              <v-img
                :src="`https://picsum.photos/500/300?image=${i * n * 5 + 10}`"
                :lazy-src="`https://picsum.photos/10/6?image=${i * n * 5 + 10}`"
                aspect-ratio="1"
              ></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-window-item>
    </v-window>
  </v-card>
  
</template>

