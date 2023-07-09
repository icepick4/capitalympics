<script setup lang="ts">
import { CountryI } from '@/models/Country';
import { CurrentState } from '@/types/common';

defineProps<{
    country: CountryI;
    currentState: CurrentState;
}>();
</script>

<template>
    <div v-if="country" class="w-full h-full flex flex-col gap-10">
        <div
            class="flex flex-col sm:flex-row w-full items-center justify-center gap-5 lg:gap-10"
        >
            <h1 class="text-3xl lg:text-5xl text-center">{{ country.name }}</h1>
            <img
                class="w-36 lg:w-52 h-auto border-2 border-black rounded"
                :src="country.flag"
                :alt="country.name"
            />
        </div>
        <div class="text-center">
            <h1 v-if="currentState == 'starting'" class="text-3xl">
                {{ $t('findCapital') }}
            </h1>
            <h1 v-else class="text-4xl lg:text-6xl">
                {{ country.capital }}
            </h1>
        </div>
    </div>
</template>
