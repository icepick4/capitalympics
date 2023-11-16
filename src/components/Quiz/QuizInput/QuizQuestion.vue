<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

const question = ref('');
</script>

<template>
    <div class="mb-4">
        <label
            for="quizQuestion"
            class="block text-sm font-medium text-gray-700"
        >
            {{ t('quizQuestion') }}
        </label>
        <input
            v-model="question"
            type="text"
            id="quizQuestion"
            name="quizQuestion"
            class="mt-1 p-2 w-full border rounded"
            :placeholder="t('quizQuestion')"
        />
    </div>
</template>
