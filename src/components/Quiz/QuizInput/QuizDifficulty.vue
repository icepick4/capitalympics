<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['change']);
const { t } = useI18n();

const value = ref('');
</script>

<template>
    <div class="mb-4">
        <label
            for="quizDifficulty"
            class="block text-sm font-medium text-gray-700"
        >
            {{ t('quizDifficulty') }}
        </label>
        <input
            v-model="value"
            type="number"
            min="1"
            max="5"
            id="quizDifficulty"
            name="quizDifficulty"
            class="mt-1 p-2 w-full border rounded"
            :placeholder="t('quizDifficulty')"
            @input="emit('change', value)"
        />
    </div>
</template>
