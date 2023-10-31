<script setup lang="ts">
import ApiClient from '@/utils/ApiClient';
import { isNow, isToday } from '@/utils/common';
import { DateTime } from 'luxon';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import StatCard from './StatCard.vue';

defineProps<{
    basicDisplay: boolean;
}>();

const { t } = useI18n();

const numberOfQuestions = ref(0);
const numberOfQuestionsCapitals = ref(0);
const numberOfQuestionsFlags = ref(0);
const bestStreak = ref(0);
const lastStreakFlags = ref(0);
const lastStreakCapitals = ref(0);
const lastStreakCapitalsLabel = ref('');
const lastStreakFlagsLabel = ref('');
const daysPlayed = ref(0);
const lastLearnCapitals = ref('');
const lastLearnFlags = ref('');

const calculateLastStreak = (
    lastResults: ('succeeded' | 'medium' | 'failed')[],
    type: 'flag' | 'capital'
) => {
    let streak = 0;
    let firstType = lastResults[0];
    switch (type) {
        case 'flag':
            lastStreakFlagsLabel.value = firstType;
        case 'capital':
            lastStreakCapitalsLabel.value = firstType;
            break;
    }
    for (let i = 0; i < lastResults.length; i++) {
        if (lastResults[i] == firstType) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
};

const calculateBestSucceededStreak = (
    lastResults: ('succeeded' | 'medium' | 'failed')[]
): number => {
    let bestStreak = 0;
    let currentStreak = 0;

    for (const result of lastResults) {
        if (result === 'succeeded') {
            currentStreak++;
            bestStreak = Math.max(bestStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    return bestStreak;
};

const getDaysAgoFromDate = (date: DateTime): number | string => {
    if (!date.isValid) {
        return t('never');
    }

    const now = DateTime.now();

    if (isNow(date)) {
        return t('now');
    }
    if (isToday(date)) {
        return t('today');
    }

    const diff = now.diff(date, 'days').toObject();
    return (
        Math.abs(Math.ceil(diff.days || 0)) +
        ' ' +
        t('days', Math.abs(Math.ceil(diff.days || 0)))
    );
};

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
    const response = await ApiClient.get<RawScoresResponse>('/scores/raw');

    if (!response.success) {
        console.log(response.error);
        return;
    }

    const scores = response.data.scores;
    numberOfQuestions.value = scores.length;

    numberOfQuestionsFlags.value = scores.filter(
        (score) => score.learning_type == 'flag'
    ).length;

    numberOfQuestionsCapitals.value = scores.filter(
        (score) => score.learning_type == 'capital'
    ).length;

    bestStreak.value = calculateBestSucceededStreak(
        scores.map((score) => score.result)
    );

    const flagScores = scores.filter((score) => score.learning_type == 'flag');
    const capitalScores = scores.filter(
        (score) => score.learning_type == 'capital'
    );

    lastStreakFlags.value = calculateLastStreak(
        flagScores.map((score) => score.result),
        'flag'
    );
    lastStreakCapitals.value = calculateLastStreak(
        capitalScores.map((score) => score.result),
        'capital'
    );

    daysPlayed.value = new Set(
        scores.map((score) => score.created_at.split('T')[0])
    ).size;
    
    if (flagScores.length > 0) {
        lastLearnFlags.value = flagScores[0].created_at;
    }
    if (capitalScores.length > 0) {
        lastLearnCapitals.value = capitalScores[0].created_at;
    }
});
</script>

<template>
    <div class="flex flex-col items-center gap-8">
        <div class="flex flex-col items-center gap-2">
            <h1 class="text-2xl">{{ $t('global') }}</h1>
            <div
                class="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-6 xl:gap-10"
            >
                <StatCard
                    :label="$t('numberOfQuestions')"
                    :value="numberOfQuestions"
                />
                <StatCard
                    :label="$t('bestStreak')"
                    :value="bestStreak"
                    class="bg-green-600"
                />
                <StatCard :label="$t('daysPlayed')" :value="daysPlayed" />
            </div>
        </div>
        <div v-if="!basicDisplay" class="flex flex-col items-center gap-2">
            <h1 class="text-2xl">{{ $t('flags') }}</h1>
            <div
                class="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-6 xl:gap-10"
            >
                <StatCard
                    :label="$t('numberOfQuestions')"
                    :value="numberOfQuestionsFlags"
                />
                <StatCard
                    :label="$t('lastStreak')"
                    :value="lastStreakFlags"
                    :class="{
                        'bg-green-600': lastStreakFlagsLabel == 'succeeded',
                        'bg-orange-600': lastStreakFlagsLabel == 'medium',
                        'bg-red-600': lastStreakFlagsLabel == 'failed'
                    }"
                />
                <StatCard
                    :label="$t('lastActivity')"
                    :value="
                        getDaysAgoFromDate(DateTime.fromISO(lastLearnFlags))
                    "
                />
            </div>
        </div>
        <div v-if="!basicDisplay" class="flex flex-col items-center gap-2">
            <h1 class="text-2xl">{{ $t('capitals') }}</h1>
            <div
                class="grid grid-cols-1 xs:grid-cols-3 gap-3 md:gap-6 xl:gap-10"
            >
                <StatCard
                    :label="$t('numberOfQuestions')"
                    :value="numberOfQuestionsCapitals"
                />
                <StatCard
                    :label="$t('lastStreak')"
                    :value="lastStreakCapitals"
                    :class="{
                        'bg-green-600': lastStreakCapitalsLabel == 'succeeded',
                        'bg-orange-600': lastStreakCapitalsLabel == 'medium',
                        'bg-red-600': lastStreakCapitalsLabel == 'failed'
                    }"
                />
                <StatCard
                    :label="$t('lastActivity')"
                    :value="
                        getDaysAgoFromDate(DateTime.fromISO(lastLearnCapitals))
                    "
                />
            </div>
        </div>
    </div>
</template>
