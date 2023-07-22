<script setup lang="ts">
defineProps<{
    type: 'warning' | 'error' | 'success';
    text: string;
}>();
</script>
<template>
    <button
        type="button"
        :class="{
            'bg-yellow-200': type === 'warning',
            'bg-red-200': type === 'error',
            'bg-green-200': type === 'success',
            'hover:bg-yellow-300': type === 'warning',
            'hover:bg-red-300': type === 'error',
            'hover:bg-green-300': type === 'success'
        }"
        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium transition-all duration-300"
        @click="$emit('click')"
    >
        {{ text }}
    </button>
</template>
