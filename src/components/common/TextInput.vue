<script setup lang="ts">
import { SVGProps } from '@tabler/icons-vue';
import { useFocus, useVModel } from '@vueuse/core';
import { v4 as uuidv4 } from 'uuid';
import { FunctionalComponent, ref } from 'vue';

interface Properties {
    modelValue: string | null;
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    hint?: string;
    type?: 'text' | 'password';
    error?: string;
    appendIcon?: FunctionalComponent<SVGProps & { strokeWidth?: number }>;
    prependIcon?: FunctionalComponent<SVGProps & { strokeWidth?: number }>;
}

const input = ref();
const { focused } = useFocus(input);

const inputName = `text-input-${uuidv4()}`;
const props = withDefaults(defineProps<Properties>(), {
    disabled: false,
    type: 'text'
});

const emit = defineEmits(['update:modelValue', 'keyup']);
const value = useVModel(props, 'modelValue', emit);

function focusInput() {
    // @ts-ignore
    input.value?.focus();
}
</script>

<template>
    <div class="block w-full font-sans space-y-1">
        <label
            v-if="label"
            :for="inputName"
            class="font-semibold text-gray-800 text-sm"
        >
            {{ label }}
        </label>
        <p v-if="hint" class="text-gray-800/50 text-xs">
            {{ hint }}
        </p>
        <div
            class="bg-white flex items-center gap-x-2 rounded border px-3 py-2 cursor-text peer-disabled:cursor-not-allowed transition-colors outline outline-2 outline-offset-2"
            :class="[
                focused ? 'outline-blue-600/75' : 'outline-transparent',
                error ? 'border-red-600' : 'border-gray-400/50'
            ]"
            @click="focusInput"
        >
            <slot name="prepend">
                <div
                    v-if="prependIcon"
                    aria-hidden="true"
                    class="grid place-items-center h-8 w-8 transition-colors shrink-0"
                    :class="[
                        focused || value?.length
                            ? 'text-black/75'
                            : 'text-gray-400'
                    ]"
                >
                    <component :is="prependIcon" :stroke-width="1.5" />
                </div>
            </slot>
            <input
                v-model.trim="value"
                ref="input"
                :type="type"
                :id="inputName"
                :name="inputName"
                :placeholder="placeholder"
                :disabled="disabled"
                class="peer placeholder:text-gray-400 w-full outline-none"
                :class="[error ? 'text-red-600' : 'text-gray-700']"
                @keyup="emit('keyup', $event)"
            />
            <slot name="append" />
        </div>
        <p v-if="error" class="text-red-600 text-xs">
            {{ error }}
        </p>
    </div>
</template>
