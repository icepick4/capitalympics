<script setup lang="ts">
import Badge from '@/components/Badge.vue';
import Loader from '@/components/Loader.vue';
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { Level, User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { IconInfoCircle } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Infos from '../components/Learning/Infos.vue';
import ProfilePicture from '../components/User/ProfilePicture/ProfilePicture.vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
const { t } = useI18n();

const loading = ref(true);

const showInfos = ref(false);

const hideInfos = () => {
    showInfos.value = false;
};

const toggleInfos = () => {
    showInfos.value = !showInfos.value;
};

const userScore = ref(-2);
const nextUserLevel = ref(-1);
const initFirstTimeScores = ref(false);

const getUserScore = async (): Promise<number> => {
    loading.value = true;
    let score: number = -1;
    try {
        const { capital, flag } = await ApiService.getUserScore();
        const score = (capital + flag) / 2;
        nextUserLevel.value = score + 10;
        return score;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }

    return score;
};

const resetScoresConfirmation = async () => {
    const hasConfirmed = await useConfirmDialog({
        title: t('resetScoresConfirmation'),
        description: t('resetScoresMessage'),
        cancelText: t('no'),
        confirmText: t('yes')
    });
    if (hasConfirmed) {
        resetScores();
    }
};

const resetScores = async (): Promise<boolean> => {
    initFirstTimeScores.value = true;

    try {
        return await ApiService.resetScores();
    } catch (error) {
        console.log(error);
    } finally {
        initFirstTimeScores.value = false;
        userScore.value = (await getUserScore()) as Level;
        notify({
            title: t('resetScoresTitle'),
            message: t('resetScoresSuccess'),
            type: 'success'
        });
    }

    return false;
};

onBeforeMount(async () => {
    userScore.value = await getUserScore();
});
</script>

<template>
    <Loader v-if="loading" :title="$t('loading')" />

    <Infos :show="showInfos" @close="hideInfos" />
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-20 my-5 h-full"
    >
        <Loader v-if="initFirstTimeScores" :title="$t('loading')" />
        <div
            class="flex flex-col justify-center items-center w-5/6 sm:w-3/4 md:w-2/3 xl:w-2/5 gap-10"
        >
            <ProfilePicture :fileExplorer="false" size="lg" />
            <p class="text-3xl">{{ $t('hello') }} {{ user.name }} !</p>

            <div
                class="flex flex-row gap-6 justify-center items-center"
                v-if="userScore != -1"
            >
                <Badge
                    v-if="userScore != -2"
                    :score="userScore"
                    size="lg"
                    :progress="true"
                />
                <div class="flex flex-col gap-1 justify-center items-center">
                    <span class="text-lg">{{ $t('nextLevel') }}</span>
                    <Badge
                        v-if="nextUserLevel != -1"
                        :score="nextUserLevel"
                        size="md"
                    />
                </div>
                <IconInfoCircle
                    class="w-16 h-16 cursor-pointer hover:scale-110 transition-all"
                    @click="toggleInfos"
                />
            </div>
            <div class="flex flex-col md:flex-row gap-10">
                <div class="flex flex-col items-center gap-5">
                    <RouterLink
                        to="/learn/capital"
                        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-4xl px-7 py-4 text-center mr-2 mb-2"
                    >
                        {{ ($t('learn'), $t('capitals')) }}
                    </RouterLink>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <RouterLink
                        to="/learn/flag"
                        class="text-white bg-gradient-to-r from-pink-500 to-orange-400 focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-4xl px-7 py-4 text-center mr-2 mb-2"
                    >
                        {{ ($t('learn'), $t('flags')) }}
                    </RouterLink>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <div
                    class="transition ease-in-out delay-100 text-black text-lg font-bold text-center p-3 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                    @click="resetScoresConfirmation"
                >
                    {{ $t('resetScores') }}
                </div>
                <RouterLink
                    to="/profile/scores"
                    class="transition ease-in-out delay-100 text-black text-lg font-bold text-center p-3 bg-white rounded-md hover:scale-105 w-full cursor-pointer"
                >
                    {{ $t('seeScores') }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>
