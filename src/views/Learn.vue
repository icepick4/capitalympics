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

const userScore = ref('');
const noScores = ref(false);
const initFirstTimeScores = ref(false);
const getUserScore = async (): Promise<Level> => {
    try {
        const score: Level = await ApiService.getUserScore(user.id, token);
        if (score === -1) {
            noScores.value = true;
        } else {
            noScores.value = false;
        }
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
        class="flex flex-col justify-center items-center gap-20 my-5 h-full"
    >
        <BlurContainer
            v-if="initFirstTimeScores || userScore == ''"
            class="w-1/2"
        >
            <Loader :title="$t('loading')" />
        </BlurContainer>

        <div
            v-if="!noScores"
            class="flex flex-col justify-center items-center w-5/6 sm:w-2/3 md:w-1/2 lg:w-1/3 gap-20"
        >
            <div
                v-if="userScore != ''"
                class="bg-gradient rounded-lg shadow-lg p-6 mb-8"
            >
                <h1 class="text-black text-center text-4xl">
                    {{ userScore }} !
                </h1>
            </div>
            <div class="flex flex-row gap-10">
                <div class="flex flex-col items-center gap-5">
                    <RouterLink
                        to="/learn/capitals"
                        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center bg-white rounded-md hover:scale-105"
                    >
                        <img src="/learn/capitals.jpg" class="h-full w-auto" />
                    </RouterLink>
                    <h1>{{ $t('capitals') }}</h1>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <RouterLink
                        to="/learn/flags"
                        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center bg-white rounded-md hover:scale-105"
                    >
                        <img src="/learn/flags.jpg" class="h-full w-auto" />
                    </RouterLink>
                    <h1>{{ $t('flags') }}</h1>
                </div>
            </div>
            <div
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                @click="resetScores"
            >
                {{ $t('resetScores') }}
            </div>
        </div>
        <div
            v-else
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/2 cursor-pointer"
            @click="resetScores"
        >
            {{ $t('initScoresTitle') }}
        </div>
    </div>
</template>
