<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import UserInfo from '../components/User/UserInfo.vue';
import UserSettings from '../components/User/UserSettings.vue';

const displayUserSettings = ref(false);
const router = useRouter();

function isEditProfileRoute() {
    return router.currentRoute.value.path === '/profile/edit';
}

watch(
    () => router.currentRoute.value,
    (newRoute) => {
        displayUserSettings.value = isEditProfileRoute();
    }
);

onMounted(() => {
    displayUserSettings.value = isEditProfileRoute();
});
</script>

<template>
    <UserInfo
        v-if="!displayUserSettings"
        @close="displayUserSettings = true"
    ></UserInfo>
    <UserSettings v-else @close="displayUserSettings = false"></UserSettings>
</template>

<style scoped>
.flip-container {
    transform: rotateY(180deg);
}
</style>
