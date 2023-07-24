<script setup lang="ts">
import { SVGProps } from '@tabler/icons-vue';
import { FunctionalComponent } from 'vue';

interface Properties {
    /**
     * As an icon cannot be seen by screen readers, an aria-label must
     * be added to the button to avoid blocking any disabled person.
     */
    label: string;
    icon: FunctionalComponent<SVGProps & { strokeWidth?: number }>;
    disabled?: boolean;
    rounded?: boolean;
}

defineProps<Properties>();
const emit = defineEmits(['click']);
</script>

<template>
    <button
        :aria-label="label"
        :disabled="disabled"
        :title="label"
        type="button"
        class="grid place-items-center bg-white w-10 h-10 outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75 transition-all"
        :class="[
            rounded ? 'rounded-full' : 'rounded-md',
            disabled
                ? 'cursor-not-allowed text-gray-800/50 bg-gray-100/75'
                : 'hover:bg-gray-100 text-gray-800'
        ]"
        @click="emit('click')"
    >
        <slot :icon="icon">
            <component :is="icon" class="" />
        </slot>
    </button>
</template>
