<script setup lang="ts">
import VLazyImage from 'v-lazy-image';
import { RouterLink } from 'vue-router';
defineProps<{
    countryName: string;
    countryFlag: string;
    countryCode: string;
}>();
</script>

<template>
    <RouterLink
        :to="{
            name: 'SingleCountry',
            params: {
                countryCode: countryCode
            }
        }"
    >
        <div
            class="relative flex justify-center items-center h-full hover:scale-105 transition ease-in-out duration-300"
        >
            <VLazyImage
                :src="countryFlag"
                :alt="`Flag of ${countryName}`"
                class="w-full h-auto shadow transition ease-in-out duration-300"
                :title="countryName"
            />
            <span
                class="absolute w-full h-full bottom-0 left-0 right-0 text-white opacity-0 hover:opacity-100 transition ease-in-out duration-200"
            >
                <p class="-translate-y-7 text-black">{{ countryName }}</p>
            </span>
        </div>
    </RouterLink>
</template>
