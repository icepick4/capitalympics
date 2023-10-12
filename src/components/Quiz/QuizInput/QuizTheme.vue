<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['change']);
const { t } = useI18n();

const value = ref('');
</script>

<template>
    <div class="mb-4">
        <label for="quizTheme" class="block text-sm font-medium text-gray-700">
            {{ t('quizTheme') }}
        </label>
        <input
            v-model="value"
            type="text"
            id="quizTheme"
            name="quizTheme"
            class="mt-1 p-2 w-full border rounded"
            :placeholder="t('quizTheme')"
            @input="emit('change', value)"
        />
    </div>
</template>
