<template>
    <v-container>

        <v-row class="text-overline" align="center" justify="space-between">
            <p>请选择操作对象: </p>
            <v-btn size="x-small" color="primary" variant="tonal">上传</v-btn>
        </v-row>
        <v-divider></v-divider>
        <v-sheet color="grey-lighten-3">
            <v-row class="text-overline" align="center" max-height="32">
                <v-checkbox-btn :model-value="checkboxValue" :label="choiceNum" density="compact"></v-checkbox-btn>
                <!-- <v-btn size="x-small" class="mr-1 primary" density="compact" icon="mdi-folder"></v-btn> -->
                <v-btn size="x-small" class="mr-1 icon-btn" density="compact" prepend-icon="mdi-folder" variant="text">
                    <template v-slot:prepend>
                        <v-icon color="primary"></v-icon>
                    </template>
                </v-btn>
                <v-breadcrumbs :items="paths" class="pa-1" color="primary">
                    <!-- <template v-slot:prepend>
                    <v-icon size="small" icon="mdi-folder" color="primary"></v-icon>
                </template> -->
                </v-breadcrumbs>

                <v-spacer></v-spacer>
                <v-text-field :loading="loading" density="compact" variant="underlined" placeholder="Search" class="pa-1" style="height:32px"
                    append-inner-icon="mdi-magnify"  @click:append-inner="onClick">
                </v-text-field>

                <v-btn size="x-small" class="ma-1">名字</v-btn>
                <v-btn size="x-small" class="ma-1">时间</v-btn>
                <v-btn size="x-small" class="ma-1">大小</v-btn>

            </v-row>
        </v-sheet>
        <v-row bg-color="red"></v-row>

    </v-container>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 默认是/，点击文件夹后覆盖这个/的内容，后续是追加
const paths = reactive([
    {
        title: '',
        disabled: false,
        href: 'breadcrumbs_dashboard',
    },
    {
        title: 'Link 1',
        disabled: false,
        href: 'breadcrumbs_link_1',
    },
    {
        title: 'Link 2',
        disabled: false,
        href: 'breadcrumbs_link_2',
    },
])

const choiceNum = ref(0)
const checkboxValue = ref("")  // true/false/indeterminate

const files = reactive([
    { id: 1, name: "file1", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 2, name: "file2.csv", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 3, name: "file3.zip", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
    { id: 4, name: "医院数据.tar.gz", icon: "", size: 18374, created: "2023-11-03 06:12:33" },
])


const loaded = ref(false)
const loading = ref(false)

function onClick() {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        loaded.value = true
    }, 2000)
}

</script>

<style scoped>
.hander {
    background-color: gray;
}

.v-row {
    margin: 0px;
}

.icon-btn {
    min-width: 12px;
    padding: 0px;
}

/* 去掉search的边距 */
.v-input--density-compact {
    --v-input-control-height: 40px;
    /* --v-input-padding-top: 0px; */
}
.v-field--no-label {
    --v-field-padding-bottom: 0px;
}


</style>
