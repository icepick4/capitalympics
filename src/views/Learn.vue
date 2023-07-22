<script setup lang="ts">
import Badge from '@/components/Badge.vue';
import BlurContainer from '@/components/BlurContainer.vue';
import Loader from '@/components/Loader.vue';
import { Level, User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { Ref, onBeforeMount, ref } from 'vue';
import { RouterLink } from 'vue-router';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const loading = ref(true);

const userScore = ref(-2);
const nextUserLevel = ref(-1);
const noScores = ref(false);
const initFirstTimeScores = ref(false);
const confirmingResetScores = ref(false);

const getUserScore = async (): Promise<number> => {
    loading.value = true;
    let score: number = -1;

    try {
        score = await ApiService.getUserScore(user.value);
        nextUserLevel.value = score + 10;
        noScores.value = score === -1;
        return score;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }

    return score;
};

const resetScoresConfirmation = () => {
    confirmingResetScores.value = true;
};

const resetScores = async (): Promise<boolean> => {
    initFirstTimeScores.value = true;
    confirmingResetScores.value = false;

    try {
        return await ApiService.resetScores(user.value.id);
    } catch (error) {
        console.log(error);
    } finally {
        initFirstTimeScores.value = false;
        userScore.value = (await getUserScore()) as Level;
    }

    return false;
};

onBeforeMount(async () => {
    userScore.value = await getUserScore();
});
</script>

<template>
    <BlurContainer v-if="loading">
        <Loader :title="$t('loading')" />
    </BlurContainer>
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-20 my-5 h-full"
    >
        <BlurContainer
            v-if="
                (initFirstTimeScores ||
                    userScore == -1 ||
                    confirmingResetScores) &&
                (!noScores || initFirstTimeScores)
            "
            class="w-1/2"
        >
            <Dialog
                v-if="confirmingResetScores"
                :isOpen="confirmingResetScores"
                :title="$t('resetScoresConfirmation')"
                :description="$t('resetScoresMessage')"
                :buttonYes="$t('yes')"
                :buttonNo="$t('no')"
                @confirm="resetScores"
                @cancel="confirmingResetScores = false"
                type="warning"
            />
            <Loader v-else-if="initFirstTimeScores" :title="$t('loading')" />
        </BlurContainer>

        <div
            v-if="!noScores"
            class="flex flex-col justify-center items-center w-5/6 sm:w-3/4 md:w-2/3 xl:w-2/5 gap-20"
        >
            <div
                class="flex flex-col gap-5 justify-center items-center"
                v-if="userScore != -1"
            >
                <h1 class="text-center text-4xl">{{ $t('myLevel') }}</h1>
                <Badge v-if="userScore != -2" :score="userScore" size="lg" />
                {{ $t('nextLevel') }}
                <Badge
                    v-if="nextUserLevel != -1"
                    :score="nextUserLevel"
                    size="sm"
                />
            </div>
            <div class="flex flex-col md:flex-row gap-10">
                <div class="flex flex-col items-center gap-5">
                    <h1>{{ $t('capitals') }}</h1>
                    <RouterLink
                        to="/learn/capital"
                        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center bg-white rounded-md hover:scale-105"
                    >
                        <div class="relative w-full h-full">
                            <img
                                src="/learn/capitals.jpg"
                                class="h-auto w-auto"
                                alt="capitals button image"
                            />
                            <span
                                class="absolute -bottom-6 right-0 p-1 text-xs text-white bg-black bg-opacity-50 font-extralight"
                            >
                                Photo of
                                <a
                                    href="https://unsplash.com/@jaeh?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                                    >Jaeh</a
                                >
                                on
                                <a
                                    href="https://unsplash.com/fr/photos/tpdPRCLKvoY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                                    >Unsplash</a
                                >
                            </span>
                        </div>
                    </RouterLink>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <h1>{{ $t('flags') }}</h1>
                    <RouterLink
                        to="/learn/flag"
                        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center bg-white rounded-md hover:scale-105"
                    >
                        <div class="relative w-full h-full">
                            <img
                                src="/learn/flags.jpg"
                                class="h-full w-auto"
                                alt="flags button image"
                            />
                            <span
                                class="absolute -bottom-6 right-0 p-1 text-xs text-white bg-black bg-opacity-50 font-extralight"
                            >
                                Photo of
                                <a
                                    href="https://unsplash.com/@tony_cm__?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                                    >Anthony Choren</a
                                >
                                on
                                <a
                                    href="https://unsplash.com/fr/photos/lYzap0eubDY?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                                    >Unsplash</a
                                >
                            </span>
                        </div>
                    </RouterLink>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div
                    class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                    @click="resetScoresConfirmation"
                >
                    {{ $t('resetScores') }}
                </div>
                <RouterLink
                    to="/profile"
                    class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                >
                    {{ $t('seeScores') }}
                </RouterLink>
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
