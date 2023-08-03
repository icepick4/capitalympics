<script setup lang="ts">
defineProps<{
    label: string;
    value?: number | string;
}>();
</script>

<template>
    <div
        class="flex flex-col items-center justify-center bg-gray-600 p-2 md:p-4 px-4 md:px-10 lg:px-20 rounded-lg"
        style="max-width: 300px"
    >
        <h2 class="text-lg md:text-2xl lg:text-4xl text-white overflow-hidden">
            {{ value }}
        </h2>
        <h1 class="text-xs md:text-sm text-center font-thin text-gray-300">
            {{ label }}
        </h1>
    </div>
</template>
