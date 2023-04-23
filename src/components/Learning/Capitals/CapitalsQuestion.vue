<script setup lang="ts">
import { CountryI } from '../../../models/Country';

defineProps<{
    country: CountryI;
}>();
</script>

<template>
    <div v-if="country" class="w-full h-full flex flex-col">
        <div
            class="flex flex-row w-full h-1/2 items-center justify-center gap-10"
        >
            <h1 class="text-5xl">{{ country.name }}</h1>
            <img class="rounded border-black border-2" :src="country.flag" />
        </div>
        <div class="flex flex-row w-full h-1/2 items-center justify-center">
            <h1 class="text-2xl">Find the capital !</h1>
        </div>
    </div>
</template>
