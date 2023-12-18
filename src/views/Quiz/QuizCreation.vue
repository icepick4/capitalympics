<script setup lang="ts">
import QuizDescription from '@/components/Quiz/QuizInput/QuizDescription.vue';
import QuizDifficulty from '@/components/Quiz/QuizInput/QuizDifficulty.vue';
import QuizName from '@/components/Quiz/QuizInput/QuizName.vue';
import QuizQuestion from '@/components/Quiz/QuizInput/QuizQuestion.vue';
import QuizTheme from '@/components/Quiz/QuizInput/QuizTheme.vue';
import { Question } from '@/types/common';
import { IconArrowBigLeft, IconArrowBigRight } from '@tabler/icons-vue';
import { computed, ref } from 'vue';

const quizName = ref('');
const quizDescription = ref('');
const quizDifficulty = ref(0);
const quizThemes = ref<string[]>([]);
const quizQuestions = ref<Question[]>([]);
const currentStep = ref(1);
const failedToGoNext = ref(false);

const canSave = computed(
    () =>
        quizName.value.length >= 3 &&
        quizName.value.length < 20 &&
        quizDescription.value.length >= 3 &&
        quizDescription.value.length < 150 &&
        quizDifficulty.value >= 1 &&
        quizDifficulty.value <= 5 &&
        quizThemes.value.length >= 3 &&
        quizThemes.value.length < 20
);

const canSaveOnCurrentStep = computed(() => {
    switch (currentStep.value) {
        case 1:
            return quizName.value.length >= 3 && quizName.value.length < 20;
        case 2:
            return (
                quizDescription.value.length >= 3 &&
                quizDescription.value.length < 150
            );
        case 3:
            return quizDifficulty.value >= 1 && quizDifficulty.value <= 5;
        case 4:
            return quizThemes.value.length >= 3 && quizThemes.value.length < 20;
        case 5:
            return (
                quizQuestions.value.length >= 3 &&
                quizQuestions.value.length < 20
            );
        default:
            return false;
    }
});

const saveQuiz = () => {
    if (canSave.value) {
        console.log('save quiz');
    } else {
        console.log('cannot save quiz');
    }
};

const nextStep = () => {
    if (!canSaveOnCurrentStep.value) {
        failedToGoNext.value = true;
        return;
    }
    if (currentStep.value < 5) {
        currentStep.value++;
    } else if (currentStep.value === 5) {
        saveQuiz();
    }
};

const previousStep = () => {
    switch (currentStep.value) {
        case 1:
            quizName.value = '';
            break;
        case 2:
            quizDescription.value = '';
            break;
        case 3:
            quizDifficulty.value = 0;
            break;
        case 4:
            quizThemes.value = [];
            break;
        case 5:
            quizQuestions.value = [];
            break;

        default:
            break;
    }

    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const removeItem = (item: string) => {
    quizQuestions.value = quizQuestions.value.filter(
        (question) => question.question !== item
    );
};
</script>

<template>
    <Dialog
        v-if="failedToGoNext"
        :title="$t('error')"
        :description="$t('errorOnStep', { step: currentStep })"
        :buttonDescription="$t('close')"
        type="error"
        v-model="failedToGoNext"
    />
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="bg-white p-6 rounded-md shadow-md w-1/2">
            <h2 class="text-2xl font-bold mb-2">Récapitulatif</h2>
            <div class="grid grid-cols-2 gap-2">
                <div class="flex items-start">
                    <p class="text-gray-600 mr-2">Nom du quiz:</p>
                    <p class="text-lg">{{ quizName }}</p>
                </div>
                <div class="flex items-start">
                    <p class="text-gray-600 mr-2">Description:</p>
                    <p class="text-lg">{{ quizDescription }}</p>
                </div>
                <div class="flex items-start">
                    <p class="text-gray-600 mr-2">Difficulté:</p>
                    <p
                        class="text-lg"
                        :class="{
                            'text-green-600': quizDifficulty === 1,
                            'text-blue-600': quizDifficulty === 2,
                            'text-yellow-600': quizDifficulty === 3,
                            'text-orange-600': quizDifficulty === 4,
                            'text-red-600': quizDifficulty === 5
                        }"
                    >
                        {{ quizDifficulty }}
                    </p>
                </div>
                <div class="flex items-start">
                    <p class="text-gray-600 mr-2">Thèmes:</p>
                    <div class="flex flex-wrap gap-1">
                        <span
                            v-for="theme in quizThemes"
                            :key="theme"
                            @click="removeItem(theme)"
                            class="inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-300"
                        >
                            {{ theme }}
                        </span>
                    </div>
                </div>
                <div class="flex items-start">
                    <p class="text-gray-600 mr-2">Questions:</p>
                    <div class="flex flex-wrap gap-1">
                        <span
                            v-for="question in quizQuestions"
                            :key="question.question"
                            @click="removeItem(question.question)"
                            class="inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-300"
                        >
                            {{ question.question }}
                        </span>
                    </div>
                </div>
            </div>
        </div>
        <div class="w-1/2 h-1/2 flex flex-row items-center justify-evenly">
            <IconArrowBigLeft
                @click="previousStep"
                class="h-10 w-10 cursor-pointer hover:scale-110 transition-all hover:fill-red-500"
            />
            <div class="w-full flex flex-col items-center">
                <div class="flex flex-col gap-10">
                    <form @submit.prevent="saveQuiz" class="space-y-4">
                        <div v-if="currentStep === 1">
                            <QuizName @change="quizName = $event" />
                        </div>
                        <div v-if="currentStep === 2">
                            <QuizDescription
                                @change="quizDescription = $event"
                            />
                        </div>
                        <div v-if="currentStep === 3">
                            <QuizDifficulty @change="quizDifficulty = $event" />
                        </div>
                        <div v-if="currentStep === 4">
                            <QuizTheme @change="quizThemes = $event" />
                        </div>
                        <div v-if="currentStep === 5">
                            <QuizQuestion @change="quizQuestions = $event" />
                        </div>
                    </form>
                </div>
            </div>
            <IconArrowBigRight
                @click="nextStep"
                class="h-10 w-10 cursor-pointer hover:scale-110 transition-all hover:fill-green-500"
            />
        </div>
    </div>
</template>
