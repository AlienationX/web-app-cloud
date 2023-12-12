<script setup>
import NavBar from './NavBar.vue'
import Sider from './Sider.vue'
import Main from './Main.vue'
</script>
    
<template>
    <v-container>
        <v-row>
            <!-- <v-col>
                <Sider />
            </v-col> -->
            <v-col cols="12">
                <NavBar />
            </v-col>     
            <v-col cols="12">
                <Main></Main>
            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped lang="scss">
</style>