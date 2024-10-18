<script setup>
const props = defineProps(['feedbackSwitch']);
const emit = defineEmits(['update:feedbackSwitch']);

const close = () => {
    emit('update:feedbackSwitch', false);
};
</script>

<template>
    <v-card>
        <v-card-title class="d-flex align-center" prepend-icon="mdi-message-processing">
            <v-icon color="primary" icon="mdi-message-processing"></v-icon>
            <div class="text-title-2 text-medium-emphasis font-weight-bold ps-2">Feedback</div>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-close" variant="text" @click="close"></v-btn>
        </v-card-title>

        <v-divider class="mb-4"></v-divider>

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

        <v-divider class="mt-2"></v-divider>

        <v-card-actions class="my-2 d-flex justify-end">
            <v-btn class="text-none" rounded="xl" text="Cancel" @click="close"></v-btn>

            <v-btn class="text-none" color="primary" rounded="xl" text="Send" variant="flat" @click="close"></v-btn>
        </v-card-actions>
    </v-card>
</template>

<style scoped lang="scss"></style>
