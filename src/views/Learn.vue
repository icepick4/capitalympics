<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import Loader from '../components/Loader.vue';
import ApiService from '../services/apiService';
const router = useRouter();
const store = useStore();
const user = store.getters.user;
const token = store.getters.token;

const userScore = ref(0);
const initFirstTimeScores = ref(false);
const getUserScore = async (): Promise<number> => {
    try {
        const score: number = await ApiService.getUserScore(user.id, token);
        return score;
    } catch (error) {
        console.log(error);
    }
    return 0;
};

const resetScores = async (): Promise<boolean> => {
    initFirstTimeScores.value = true;
    try {
        return await ApiService.resetScores(user.id, token);
    } catch (error) {
        console.log(error);
    } finally {
        initFirstTimeScores.value = false;
        userScore.value = await getUserScore();
    }
    return false;
};

onBeforeMount(async () => {
    if (user === null) {
        router.push('/login');
    } else {
        userScore.value = await getUserScore();
    }
});
</script>

<template>
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-10"
    >
        <h1 class="text-white text-center text-6xl">Hi {{ user.name }} !</h1>
        <BlurContainer v-if="initFirstTimeScores">
            <Loader title="Creating your scores... It may take a few seconds" />
        </BlurContainer>
        <div
            v-if="userScore != -1"
            class="flex flex-col lg:flex-row justify-center items-center w-1/2 gap-5"
        >
            <h1 class="text-white text-center text-4xl">
                Your current score is {{ userScore }} !
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
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/2 cursor-pointer"
                @click="resetScores"
            >
                Rest all your scores by clicking here !
            </div>
        </div>
        <div
            v-else
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/2 cursor-pointer"
            @click="resetScores"
        >
            Init your scores by clicking here !
        </div>
    </div>
</template>
