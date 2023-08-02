<script setup lang="ts">
import UserInfo from '@/components/User/UserInfo.vue';
import UserScores from '@/components/User/UserScores.vue';
import UserSettings from '@/components/User/UserSettings.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const displayUserSettings = computed(
    () => router.currentRoute.value.path === '/profile/edit'
);
const displayUserScores = computed(
    () => router.currentRoute.value.path === '/profile/scores'
);
</script>

<template>
    <UserInfo v-if="!displayUserSettings && !displayUserScores" />
    <UserSettings v-else-if="displayUserSettings" />
    <UserScores v-else-if="displayUserScores" />
</template>

<style scoped>
.flip-container {
    transform: rotateY(180deg);
}
</style>
