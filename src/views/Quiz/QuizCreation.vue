<script setup lang="ts">
import QuizDescription from '@/components/Quiz/QuizInput/QuizDescription.vue';
import QuizDifficulty from '@/components/Quiz/QuizInput/QuizDifficulty.vue';
import QuizName from '@/components/Quiz/QuizInput/QuizName.vue';
import QuizTheme from '@/components/Quiz/QuizInput/QuizTheme.vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const quizName = ref('');
const quizDescription = ref('');
const quizDifficulty = ref(1);
const quizTheme = ref('');
const currentStep = ref(1);

const canSave = computed(
    () =>
        quizName.value.length >= 3 &&
        quizName.value.length < 20 &&
        quizDescription.value.length >= 3 &&
        quizDescription.value.length < 150 &&
        quizDifficulty.value >= 1 &&
        quizDifficulty.value <= 5 &&
        quizTheme.value.length >= 3 &&
        quizTheme.value.length < 20
);

const saveQuiz = () => {
    if (canSave.value) {
        console.log('save quiz');
    }
};

const nextStep = () => {
    if (currentStep.value < 4) {
        currentStep.value++;
    }
    if (currentStep.value === 4) {
        saveQuiz();
    }
};

const previousStep = () => {
    if (currentStep.value > 1) {
        currentStep.value--;
    }
};
</script>

<template>
    <div class="flex flex-col w-full">
        <p>{{ quizName }}</p>
        {{ quizDescription }}
        <form @submit.prevent="saveQuiz" class="space-y-4">
            <div v-if="currentStep === 1">
                <QuizName @change="quizName = $event" />
            </div>
            <div v-if="currentStep === 2">
                <QuizDescription v-model="quizDescription" />
            </div>
            <div v-if="currentStep === 3">
                <QuizDifficulty v-model="quizDifficulty" />
            </div>
            <div v-if="currentStep === 4">
                <QuizTheme v-model="quizTheme" />
            </div>

            <div class="flex justify-between">
                <button
                    @click="previousStep"
                    :disabled="currentStep === 1"
                    class="px-4 py-2 bg-gray-400 text-white rounded"
                >
                    {{ t('previous') }}
                </button>
                <button
                    @click="nextStep"
                    class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
                >
                    {{ currentStep === 4 ? t('save') : t('next') }}
                </button>
            </div>
        </form>
    </div>
</template>
