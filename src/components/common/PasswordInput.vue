<script setup lang="ts">
import { IconEyeCheck, IconEyeOff, IconFingerprint } from '@tabler/icons-vue';
import { useVModel } from '@vueuse/core';
import { ref } from 'vue';
import TextInput from './TextInput.vue';

interface Properties {
    modelValue: string | null;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    hint?: string;
    error?: string;
    revelable?: boolean;
}

const isRevealed = ref(false);
const toggleReveal = () => (isRevealed.value = !isRevealed.value);

const props = defineProps<Properties>();
const emit = defineEmits(['update:modelValue', 'keyup']);
const value = useVModel(props, 'modelValue', emit);
</script>

<template>
    <TextInput
        v-model.trim="value"
        :label="label"
        :placeholder="placeholder"
        :disabled="disabled"
        :hint="hint"
        :type="isRevealed ? 'text' : 'password'"
        :prepend-icon="IconFingerprint"
        :error="error"
        @keyup="emit('keyup', $event)"
    >
        <template #append>
            <button
                v-if="revelable"
                type="button"
                class="bg-transparent hover:bg-gray-100 focus:bg-gray-100 text-gray-400/75 hover:text-black/75 focus:text-black/75 outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75 transition-colors rounded p-1"
                @click.stop="toggleReveal"
            >
                <component :is="isRevealed ? IconEyeOff : IconEyeCheck" />
            </button>
        </template>
    </TextInput>
</template>
