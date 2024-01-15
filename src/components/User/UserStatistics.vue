<script setup lang="ts">
import ChartSkeleton from '@/components/Skeletons/ChartSkeleton.vue';
import Doughnut from '@/components/Statistics/Charts/Doughnut.vue';
import Radar from '@/components/Statistics/Charts/Radar.vue';
import StatCard from '@/components/Statistics/StatCard.vue';
import StatCardContainer from '@/components/Statistics/StatCardContainer.vue';
import { UserScore } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import CTAButton from '../CTAButton.vue';

const rawScores = ref<
    {
        country_id: number;
        created_at: string;
        result: 'succeeded' | 'medium' | 'failed';
        learning_type: string;
    }[]
>([]);

const flagScores = ref<UserScore[]>([]);
const capitalScores = ref<UserScore[]>([]);
const scoreTypeLabels = ref<string[]>([]);
const learningTypeLabels = ref<string[]>([]);

const { t } = useI18n();

scoreTypeLabels.value = [t('easy'), t('medium'), t('hard')];
learningTypeLabels.value = [t('flags'), t('capitals')];

onMounted(async () => {
    interface RawScoresResponse {
        success: boolean;
        scores: {
            country_id: number;
            created_at: string;
            result: 'succeeded' | 'medium' | 'failed';
            learning_type: string;
        }[];
    }

    interface ResponseGetScores {
        success: true;
        scores: UserScore[];
    }

    const response = await ApiClient.get<RawScoresResponse>('/scores/raw');
    if (!response.success) {
        console.log(response.error);
        return;
    } else {
        rawScores.value = response.data.scores;
    }

    const flagResponse = await ApiClient.get<ResponseGetScores>('/scores', {
        type: 'flag'
    });
    const capitalResponse = await ApiClient.get<ResponseGetScores>('/scores', {
        type: 'capital'
    });
    if (!flagResponse.success || !capitalResponse.success) {
        return;
    } else {
        capitalScores.value = capitalResponse.data.scores;
        flagScores.value = flagResponse.data.scores;
    }
});
</script>

<template>
    <div class="flex flex-col w-full justify-center items-center gap-10">
        <div class="w-full flex flex-col items-center gap-3">
            <h1 class="text-3xl mb-5">{{ $t('charts') }}</h1>
            <div
                class="flex flex-col md:flex-row justify-center items-center gap-16"
            >
                <div class="w-full h-full flex flex-col items-center gap-10">
                    <Doughnut
                        v-if="rawScores && rawScores.length > 0"
                        :scores="rawScores"
                        :labels="scoreTypeLabels"
                    />
                    <ChartSkeleton v-else />
                    <StatCard :label="$t('doughnutChartDescription')" />
                </div>
                <div
                    class="w-full h-full flex flex-col justify-between items-center gap-10"
                >
                    <Radar
                        v-if="
                            flagScores &&
                            capitalScores &&
                            flagScores.length > 0 &&
                            capitalScores.length > 0
                        "
                        :flagScores="flagScores"
                        :capitalScores="capitalScores"
                        :labels="learningTypeLabels"
                    />
                    <ChartSkeleton v-else />
                    <StatCard :label="$t('radarChartDescription')" />
                </div>
            </div>
        </div>
        <div class="flex flex-col items-center gap-3">
            <h1 class="text-3xl mb-5">{{ $t('statistics') }}</h1>
            <StatCardContainer :basicDisplay="false" />
        </div>
        <CTAButton
            :goBack="true"
            :text="$t('back')"
            color="bluebg"
            textColor="white"
            class="mb-10"
        />
    </div>
</template>
