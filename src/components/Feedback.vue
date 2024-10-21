<script setup>
const emit = defineEmits(['update:feedbackSwitch']);

const close = () => {
    emit('update:feedbackSwitch', false);
};
</script>

<template>
    <v-card>
        <v-card-title class="d-flex align-center py-1 pl-6" prepend-icon="mdi-message-processing">
            <v-icon color="primary" icon="mdi-message-processing" size="small"></v-icon>
            <div class="text-body-1 text-medium-emphasis font-weight-bold ps-2">Feedback</div>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="close" size="small"></v-btn>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
            <div class="text-medium-emphasis mb-4">Invite collaborators to your network and grow your connections.</div>

            <div class="mb-2">Message (optional)</div>

            <v-textarea :counter="300" class="mb-2" rows="2" variant="outlined" persistent-counter></v-textarea>

            <div class="text-overline mb-2">💎 PREMIUM</div>

            <div class="text-medium-emphasis mb-1">
                Share with unlimited people and get more insights about your network. Try Premium Free for 30 days.
            </div>

            <v-btn
                class="text-none font-weight-bold ms-n4"
                color="success"
                text="Retry Premium Free"
                variant="text"
            ></v-btn>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions class="d-flex justify-end pr-4">
            <v-btn class="text-none" rounded="xl" text="Cancel" @click="close"></v-btn>

            <v-btn class="text-none" color="primary" rounded="xl" text="Send" variant="flat" @click="close"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped lang="scss"></style>
