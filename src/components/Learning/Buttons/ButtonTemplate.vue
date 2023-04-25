<script setup lang="ts">
defineProps<{
    title: string;
    color: string;
}>();
</script>

<template>
    <button
        class="transition ease-in-out delay-100 text-black text-2xl lg:text-4xl font-bold text-center p-5 rounded-md hover:scale-105 w-full bg-blue-500"
        :class="color"
    >
        {{ title }}
    </button>
</template>
