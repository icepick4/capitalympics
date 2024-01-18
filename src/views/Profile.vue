<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import UserAvatar from '@/components/User/UserAvatar.vue';
import UserInfo from '@/components/User/UserInfo.vue';
import UserPassword from '@/components/User/UserPassword.vue';
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
const displayUserAvatar = computed(
    () => router.currentRoute.value.path === '/profile/avatar'
);

const displayUserPassword = computed(
    () => router.currentRoute.value.path === '/profile/password'
);
</script>

<template>
    <div class="flex w-full h-full justify-center items-center">
        <UserStatistics v-if="displayUserStatistics" />
        <UserSettings v-else-if="displayUserSettings" />
        <UserScores v-else-if="displayUserScores" />
        <UserAvatar v-else-if="displayUserAvatar" />
        <UserPassword v-else-if="displayUserPassword" />
        <UserInfo v-else />
    </div>
    <Footer></Footer>
</template>

<style scoped>
.flip-container {
    transform: rotateY(180deg);
}
</style>
