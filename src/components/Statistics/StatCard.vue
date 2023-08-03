<script setup lang="ts">
defineProps<{
    label: string;
    value: number;
}>();
</script>

<template>
    <div
        class="flex flex-col items-center justify-center bg-gray-600 p-4 px-14 rounded-lg"
    >
        <h2 class="text-4xl text-white">{{ value }}</h2>
        <h1 class="text-sm font-thin text-gray-400">{{ label }}</h1>
    </div>
</template>
