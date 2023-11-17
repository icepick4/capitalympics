<script setup lang="ts">
import QuizAnswer from '@/components/Quiz/QuizInput/QuizAnswer.vue';
import QuizDescription from '@/components/Quiz/QuizInput/QuizDescription.vue';
import QuizDifficulty from '@/components/Quiz/QuizInput/QuizDifficulty.vue';
import QuizName from '@/components/Quiz/QuizInput/QuizName.vue';
import QuizTheme from '@/components/Quiz/QuizInput/QuizTheme.vue';
import { IconArrowBigLeft, IconArrowBigRight } from '@tabler/icons-vue';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const quizName = ref('');
const quizDescription = ref('');
const quizDifficulty = ref(0);
const quizThemes = ref<string[]>([]);
const quizAnswers = ref<string[]>([]);
const currentStep = ref(1);

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

const saveQuiz = () => {
    if (canSave.value) {
        console.log('save quiz');
    } else {
        console.log('cannot save quiz');
    }
};

const nextStep = () => {
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
            quizAnswers.value = [];
            break;

        default:
            break;
    }

    if (currentStep.value > 1) {
        currentStep.value--;
    }
};

const removeItem = (item: string) => {
    quizAnswers.value = quizAnswers.value.filter((answer) => answer !== item);
};
</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div class="bg-white p-6 rounded-md shadow-md w-1/2">
            <h2 class="text-2xl font-bold mb-2">Récapitulatif</h2>
            <div class="grid grid-cols-2 gap-2">
                <div class="flex items-center">
                    <p class="text-gray-600 mr-2">Nom du quiz:</p>
                    <p class="text-lg">{{ quizName }}</p>
                </div>
                <div class="flex items-center">
                    <p class="text-gray-600 mr-2">Description:</p>
                    <p class="text-lg">{{ quizDescription }}</p>
                </div>
                <div class="flex items-center">
                    <p class="text-gray-600 mr-2">Difficulté:</p>
                    <p class="text-lg">{{ quizDifficulty }}</p>
                </div>
                <div class="flex items-center">
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
                <div class="flex items-center">
                    <p class="text-gray-600 mr-2">Réponses:</p>
                    <div class="flex flex-wrap gap-1">
                        <span
                            v-for="answer in quizAnswers"
                            :key="answer"
                            @click="removeItem(answer)"
                            class="inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-300"
                        >
                            {{ answer }}
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
                            <QuizAnswer @change="quizAnswers = $event" />
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
