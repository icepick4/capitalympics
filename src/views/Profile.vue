<script setup lang="ts">
import UserInfo from '@/components/User/UserInfo.vue';
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
</script>

<template>
    <UserInfo v-if="!displayUserSettings && !displayUserStatistics" />
    <UserStatistics v-else-if="displayUserStatistics" />
    <UserSettings v-else />
</template>

<style scoped>
.flip-container {
    transform: rotateY(180deg);
}
</style>
