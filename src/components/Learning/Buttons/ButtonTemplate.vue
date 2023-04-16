<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    title: string;
    color: string;
    onClick: () => void;
}>();
</script>

<template>
    <button
        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 rounded-md hover:scale-105 w-full"
        :style="{ backgroundColor: color }"
        @click="onClick"
    >
        {{ title }}
    </button>
</template>
