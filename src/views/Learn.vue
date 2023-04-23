<script setup lang="ts">
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();
const user = store.getters.user;
if (user === null) {
    router.push('/login');
}
</script>

<template>
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-10"
    >
        <h1 class="text-white text-center text-6xl">Hi {{ user.name }} !</h1>
        <div
            class="flex flex-col lg:flex-row justify-center items-center w-1/2 gap-5"
        >
            <RouterLink
                to="/learn/capitals"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full"
                >Learn Capitals 📍</RouterLink
            >
            <RouterLink
                to="/learn/flags"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full"
                >Learn Flags 🇫🇷</RouterLink
            >
        </div>
    </div>
</template>
