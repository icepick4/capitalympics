<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
    text: string;
    countryName: string;
    countryFlag: string;
}>();
</script>

<template>
    <div class="w-full h-full flex flex-col">
        <div
            class="flex flex-row w-full h-1/2 items-center justify-center gap-10"
        >
            <h1 class="text-5xl">{{ countryName }}</h1>
            <img :src="countryFlag" />
        </div>
        <div class="flex flex-row w-full h-1/2 items-center justify-center">
            <h1 class="text-2xl">{{ text }}</h1>
        </div>
    </div>
</template>
