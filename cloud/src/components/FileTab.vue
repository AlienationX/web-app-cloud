<template>
    <v-container>
        <v-row class="text-overline" align="center"  justify="space-between">
            <p >请选择操作对象</p>
            <v-btn size="x-small" variant="outlined">上传</v-btn>
        </v-row>

    </v-container>
  
</template>

<script setup>
import { ref, reactive } from 'vue'

const files = reactive([
    { id: 1, name: "file1", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 2, name: "file2.csv", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 3, name: "file3.zip", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 4, name: "医院数据.tar.gz", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
])


</script>

<style scoped>

</style>
