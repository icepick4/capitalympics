<script setup lang="ts">
import { ScoreType } from '@/types/common';
import ButtonTemplate from './ButtonTemplate.vue';
const emit = defineEmits(['click']);
type Button = {
    title: string;
    color: string;
    type: ScoreType;
};
const buttons: Button[] = [
    { title: 'easy', color: 'bg-blue-500', type: 'succeeded' },
    { title: 'medium', color: 'bg-yellow-500', type: 'medium' },
    { title: 'hard', color: 'bg-red-500', type: 'failed' }
];
</script>

<template>
    <div
        class="flex flex-col sm:flex-row w-full items-center justify-center gap-2 lg:gap-5"
    >
        <ButtonTemplate
            v-for="(button, btnIndex) in buttons"
            :key="btnIndex"
            :title="$t(button.title)"
            :color="button.color"
            @click="emit('click', button.type)"
        />
    </div>
</template>
