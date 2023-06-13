<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import Loader from '../components/Loader.vue';
import { Level } from '../models/User';
import ApiService from '../services/apiService';
import { getLevelName } from '../utils/common';
const router = useRouter();
const store = useStore();
const user = store.getters.user;
const token = store.getters.token;

const userScore = ref('...');
const initFirstTimeScores = ref(false);
const getUserScore = async (): Promise<Level> => {
    try {
        const score: Level = await ApiService.getUserScore(user.id, token);
        return score;
    } catch (error) {
        console.log(error);
    }
    return -1;
};

const resetScores = async (): Promise<boolean> => {
    initFirstTimeScores.value = true;
    try {
        return await ApiService.resetScores(user.id, token);
    } catch (error) {
        console.log(error);
    } finally {
        initFirstTimeScores.value = false;
        userScore.value = getLevelName(await getUserScore());
    }
    return false;
};

onBeforeMount(async () => {
    if (user === null) {
        router.push('/login');
    } else {
        userScore.value = getLevelName(await getUserScore());
    }
});
</script>

<template>
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-10 my-5"
    >
        <h1 class="text-white text-center text-6xl">Hi {{ user.name }} !</h1>
        <BlurContainer v-if="initFirstTimeScores">
            <Loader title="Creating your scores... It may take a few seconds" />
        </BlurContainer>
        <div
            v-if="userScore != 'No score'"
            class="flex flex-col justify-center items-center w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 gap-5"
        >
            <h1 class="text-white text-center text-4xl">
                Your current score status is {{ userScore }} !
            </h1>
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
            <div
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                @click="resetScores"
            >
                Rest all your scores ❌
            </div>
        </div>
        <div
            v-else
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/2 cursor-pointer"
            @click="resetScores"
        >
            Init your scores ✅
        </div>
    </div>
</template>
