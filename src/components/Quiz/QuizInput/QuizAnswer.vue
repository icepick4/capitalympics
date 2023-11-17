<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['change']);
const { t } = useI18n();

const answers = ref<string[]>([]);
const value = ref('');

const addAnswer = () => {
    if (answers.value.includes(value.value)) {
        return;
    }
    answers.value.push(value.value);
    value.value = '';

    emit('change', answers.value);
};

const removeItem = (item: string) => {
    answers.value = answers.value.filter((answer) => answer !== item);

    emit('change', answers.value);
};
</script>

<template>
    <div class="mb-4 flex flex-col gap-2">
        <label
            for="quizQuestion"
            class="block text-sm font-medium text-gray-700"
        >
            {{ t('quizQuestion') }}
        </label>
        <div class="flex flex-wrap gap-1">
            <span
                v-for="answer in answers"
                :key="answer"
                @click="removeItem(answer)"
                class="text-xl inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white cursor-pointer transition-all"
            >
                {{ answer }}
            </span>
        </div>
        <div class="flex flex-row gap-2">
            <input
                v-model="value"
                type="text"
                id="quizQuestion"
                name="quizQuestion"
                class="p-2 w-full border rounded"
                :placeholder="t('quizQuestion')"
            />
            <button
                type="button"
                class="px-4 py-2 bg-blue-500 text-white rounded w-1/2"
                @click="addAnswer"
            >
                {{ t('addAnswer') }}
            </button>
        </div>
    </div>
</template>
