<script setup lang="ts">
import UserInfo from '@/components/User/UserInfo.vue';
import UserScores from '@/components/User/UserScores.vue';
import UserSettings from '@/components/User/UserSettings.vue';
import UserStatistics from '@/components/User/UserStatistics.vue';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const displayUserSettings = computed(
    () => router.currentRoute.value.path === '/profile/edit'
);
const displayUserStatistics = computed(
    () => router.currentRoute.value.path === '/profile/statistics'
);
const displayUserScores = computed(
    () => router.currentRoute.value.path === '/profile/scores'
);
</script>

<template>
    <UserStatistics v-if="displayUserStatistics" />
    <UserSettings v-else-if="displayUserSettings" />
    <UserScores v-else-if="displayUserScores" />
    <UserInfo v-else />
</template>

<style scoped>
.flip-container {
    transform: rotateY(180deg);
}
</style>
