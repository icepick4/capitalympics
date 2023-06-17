<script setup lang="ts">
import { LearningState } from '../../../types/common';
import ButtonTemplate from './ButtonTemplate.vue';

defineProps<{
    user_id: number;
    token: string;
    click: (type: LearningState) => void;
}>();
</script>

<template>
    <div
        class="flex flex-col sm:flex-row w-full items-center justify-center gap-2 lg:gap-5"
    >
        <ButtonTemplate
            :title="$t('easy')"
            :color="'bg-blue-500'"
            @click="click('succeeded')"
        />
        <ButtonTemplate
            :title="$t('medium')"
            :color="'bg-yellow-500'"
            @click="click('medium')"
        />
        <ButtonTemplate
            :title="$t('hard')"
            :color="'bg-red-500'"
            @click="click('failed')"
        />
    </div>
</template>
