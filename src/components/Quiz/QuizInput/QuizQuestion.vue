<script setup lang="ts">
import { Question } from '@/types/common';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import QuizAnswer from './QuizAnswer.vue';

const emit = defineEmits(['change']);
const { t } = useI18n();

const questions = ref<Question[]>([]);
const question = ref('');
const currentAnswers = ref<string[]>([]);

const addQuestion = () => {
    if (
        question.value.length < 2 ||
        question.value.length > 64 ||
        questions.value.some((q) => q.question === question.value)
    ) {
        return;
    }
    questions.value.push({
        question: question.value,
        answers: currentAnswers.value
    });
    question.value = '';

    emit('change', questions.value);
};

const select = (question: string) => {
    const index = questions.value.findIndex((q) => q.question === question);
    if (index === -1) {
        return;
    }
    questions.value.splice(index, 1);
    emit('change', questions.value);
};
</script>

<template>
    <div class="mb-4">
        <label
            for="quizQuestion"
            class="block text-sm font-medium text-gray-700"
        >
            {{ t('quizQuestion') }}
        </label>
        <QuizAnswer @change="currentAnswers = $event" />
        <div class="flex flex-wrap gap-1">
            <span
                v-for="question in questions"
                :key="question.question"
                @click="select(question.question)"
                class="text-xl inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white cursor-pointer transition-all"
            >
                {{ question.question }}
            </span>
        </div>
        <input
            v-model="question"
            type="text"
            id="quizQuestion"
            name="quizQuestion"
            class="mt-1 p-2 w-full border rounded"
            :placeholder="t('quizQuestion')"
        />
        <button
            type="button"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            @click="addQuestion"
        >
            {{ t('addQuestion') }}
        </button>
    </div>
</template>
