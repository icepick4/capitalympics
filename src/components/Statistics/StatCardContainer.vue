<script setup lang="ts">
import ApiClient from '@/utils/ApiClient';
import { onMounted, ref } from 'vue';
import StatCard from './StatCard.vue';

const numberOfQuestions = ref(0);
const lastStreak = ref(0);
const lastStreakLabel = ref('');
const daysPlayed = ref(0);

const calculateLastStreak = (
    lastResults: ('succeeded' | 'medium' | 'failed')[]
) => {
    let streak = 0;
    let firstType = lastResults[0];
    lastStreakLabel.value = firstType;
    for (let i = 0; i < lastResults.length; i++) {
        if (lastResults[i] == firstType) {
            streak++;
        } else {
            break;
        }
    }
    return streak;
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
    lastStreak.value = calculateLastStreak(scores.map((score) => score.result));
    daysPlayed.value = new Set(
        scores.map((score) => score.created_at.split('T')[0])
    ).size;
});
</script>

<template>
    <h1 class="text-2xl font-bold mb-4">{{ $t('statistics') }}</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        <StatCard :label="$t('numberOfQuestions')" :value="numberOfQuestions" />
        <StatCard
            :label="$t('lastStreak')"
            :value="lastStreak"
            :class="{
                'bg-green-800': lastStreakLabel == 'succeeded',
                'bg-yellow-800': lastStreakLabel == 'medium',
                'bg-red-800': lastStreakLabel == 'failed'
            }"
        />
        <StatCard :label="$t('daysPlayed')" :value="daysPlayed" />
    </div>
</template>
