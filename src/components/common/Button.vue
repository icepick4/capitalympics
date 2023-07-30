<script setup lang="ts">
interface Properties {
    type: 'warning' | 'error' | 'success';
    text: string;
    disabled?: boolean;
}

withDefaults(defineProps<Properties>(), {
    disabled: false,
    type: 'success'
});
</script>
<template>
    <button
        type="button"
        :disabled="disabled"
        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75 transition-all duration-300"
        :class="{
            'bg-yellow-200': type === 'warning',
            'bg-red-200': type === 'error',
            'bg-green-200': type === 'success',
            'hover:bg-yellow-300': type === 'warning',
            'hover:bg-red-300': type === 'error',
            'hover:bg-green-300': type === 'success'
        }"
    >
        {{ text }}
    </button>
</template>
