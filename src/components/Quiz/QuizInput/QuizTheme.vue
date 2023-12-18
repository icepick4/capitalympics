<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['change']);
const { t } = useI18n();

const themes = ref<string[]>([]);
const value = ref('');

const addTheme = () => {
    if (
        value.value.length < 2 ||
        value.value.length > 40 ||
        themes.value.includes(value.value)
    ) {
        return;
    }
    themes.value.push(value.value);
    value.value = '';

    emit('change', themes.value);
};

const removeItem = (item: string) => {
    themes.value = themes.value.filter((answer) => answer !== item);

    emit('change', themes.value);
};
</script>

<template>
    <div class="mb-4">
        <label for="quizTheme" class="block text-sm font-medium text-gray-700">
            {{ t('quizTheme') }}
        </label>
        <div class="flex flex-wrap gap-1">
            <span
                v-for="theme in themes"
                :key="theme"
                @click="removeItem(theme)"
                class="text-xl inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap bg-gray-100 text-gray-800 hover:bg-red-500 hover:text-white cursor-pointer transition-all"
            >
                {{ theme }}
            </span>
        </div>
        <input
            v-model="value"
            type="text"
            id="quizTheme"
            name="quizTheme"
            class="mt-1 p-2 w-full border rounded"
            :placeholder="t('quizTheme')"
        />
        <button
            type="button"
            class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
            @click="addTheme"
        >
            {{ t('addAnswer') }}
        </button>
    </div>
</template>
