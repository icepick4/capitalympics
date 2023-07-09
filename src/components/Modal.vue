<script setup lang="ts">
import { Color } from '@/types/common';

defineProps<{
    title: string;
    message: string;
    backgroundColor: Color;
    titleColor: Color;
    confirmationDialog?: boolean;
}>();
</script>

<template>
    <div
        class="flex flex-col px-10 p-5 justify-center items-center rounded-md gap-7"
        :class="`bg-${backgroundColor}`"
    >
        <h1 class="text-2xl" :class="`text-${titleColor}`">{{ title }}</h1>
        <p>{{ message }}</p>
        <div v-if="confirmationDialog" class="flex flex-row gap-5">
            <button
                class="px-5 p-3 rounded-lg bg-gradient text-black hover:scale-105 transition-all duration-300"
                @click="$emit('confirm')"
            >
                {{ $t('yes') }}
            </button>
            <button
                class="px-5 p-3 rounded-lg bg-gradient text-black hover:scale-105 transition-all duration-300"
                @click="$emit('cancel')"
            >
                {{ $t('no') }}
            </button>
        </div>
        <div v-else>
            <button
                class="px-5 p-3 rounded-lg bg-gradient text-black hover:scale-105 transition-all duration-300"
                @click="$emit('close')"
            >
                {{ $t('close') }}
            </button>
        </div>
    </div>
</template>
