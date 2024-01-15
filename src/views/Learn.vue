<script setup lang="ts">
import Badge from '@/components/Badge.vue';
import CTAButton from '@/components/CTAButton.vue';
import Loader from '@/components/Loader.vue';
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { IconInfoCircle } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Infos from '../components/Learning/Infos.vue';
import ProfilePicture from '../components/User/ProfilePicture.vue';

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

const userScoreCapital = ref(-2);
const userScoreFlag = ref(-2);
const nextUserFlagLevel = ref(-1);
const nextUserCapitalLevel = ref(-1);
const initFirstTimeScores = ref(false);

const initUserScore = async () => {
    loading.value = true;
    try {
        const { capital, flag } = await ApiService.getUserScore();
        userScoreCapital.value = capital;
        userScoreFlag.value = flag;
        nextUserCapitalLevel.value = capital + 10;
        nextUserFlagLevel.value = flag + 10;
    } catch (error) {
        console.log(error);
    } finally {
        loading.value = false;
    }
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
        userScoreCapital.value = 0;
        userScoreFlag.value = 0;
        notify({
            title: t('resetScoresTitle'),
            message: t('resetScoresSuccess'),
            type: 'success'
        });
    }

    return false;
};

onBeforeMount(async () => {
    await initUserScore();
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
            class="flex flex-col justify-center items-center w-5/6 sm:w-3/4 md:w-2/3 xl:w-2/5 gap-12"
        >
            <ProfilePicture size="lg" />
            <div class="flex flex-row gap-5 items-center">
                <p class="text-3xl">{{ $t('hello') }} {{ user.name }} !</p>
                <IconInfoCircle
                    class="w-16 h-16 cursor-pointer hover:scale-110 transition-all"
                    @click="toggleInfos"
                />
            </div>
            <div
                class="flex flex-col md:flex-row gap-10 bg-gray-100 p-10 rounded-lg"
            >
                <div class="flex flex-col items-center gap-5">
                    <Badge
                        v-if="userScoreCapital != -1"
                        :score="userScoreCapital"
                        size="md"
                        :progress="true"
                    />

                    <RouterLink
                        to="/learn/capital"
                        class="text-white bg-gradient-to-br from-purple-600 to-blue-500 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-4xl px-7 py-4 text-center mr-2 mb-2 hover:scale-105 transition-all"
                    >
                        {{ ($t('play'), $t('capitals')) }}
                    </RouterLink>
                </div>
                <div class="flex flex-col items-center gap-5">
                    <Badge
                        v-if="userScoreFlag != -1"
                        :score="userScoreFlag"
                        size="md"
                        :progress="true"
                    />
                    <RouterLink
                        to="/learn/flag"
                        class="text-white bg-gradient-to-r from-pink-500 to-orange-400 focus:ring-2 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-4xl px-7 py-4 text-center mr-2 mb-2 hover:scale-105 transition-all"
                    >
                        {{ ($t('play'), $t('flags')) }}
                    </RouterLink>
                </div>
            </div>
            <div class="flex flex-col gap-5">
                <CTAButton
                    @click="resetScoresConfirmation"
                    :text="$t('resetScores')"
                />
                <CTAButton
                    to="/profile/scores"
                    :text="$t('seeScores') + ' 🏆'"
                />
            </div>
        </div>
    </div>
</template>
