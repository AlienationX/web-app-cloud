<template>
    <v-card width="256">
        <v-layout>
            <v-navigation-drawer permanent absolute>
                <v-list>
                    <v-list-item prepend-avatar="https://cdn.vuetifyjs.com/images/john.png" title="John Leider"
                        subtitle="john@google.com">
                        <template v-slot:append>
                            <v-btn size="small" variant="text" icon="mdi-menu-down"></v-btn>
                        </template>
                    </v-list-item>
                </v-list>

                <v-divider></v-divider>ß

                <v-list :lines="false" density="compact" nav>
                    <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                        <template v-slot:prepend>
                            <v-icon :icon="item.icon"></v-icon>
                        </template>

                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-navigation-drawer>

            <v-main style="height: 354px;"></v-main>
        </v-layout>
    </v-card>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

const { width, mobile, mobileBreakpoint } = useDisplay()

onMounted(() => {
    console.log(width.value) // 960
    console.log(mobile.value) // true
    console.log(mobileBreakpoint.value) // true
})

const items = reactive([
    { text: 'My Files', icon: 'mdi-folder' },
    { text: 'Shared with me', icon: 'mdi-account-multiple' },
    { text: 'Starred', icon: 'mdi-star' },
    { text: 'Recent', icon: 'mdi-history' },
    { text: 'Offline', icon: 'mdi-check-circle' },
    { text: 'Uploads', icon: 'mdi-upload' },
    { text: 'Backups', icon: 'mdi-cloud-upload' },
]
)
</script>