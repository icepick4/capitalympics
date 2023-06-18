<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import UserInfo from '../components/User/UserInfo.vue';
import UserSettings from '../components/User/UserSettings.vue';
import { User } from '../models/User';

const store = useStore();
const user: User = store.getters.user;
const displayUserSettings = ref(false);
</script>

<template>
    <!-- <div :class="{ 'flip-container': !displayUserSettings }"></div> -->
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
