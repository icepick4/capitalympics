<script setup lang="ts">
import { CountryDetails } from '@/types/common';
import VLazyImage from 'v-lazy-image';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import Badge from '../Badge.vue';

defineProps<{
    countries: CountryDetails[];
    title: string;
}>();

const getFlag = computed(() => {
    return (country: CountryDetails) => {
        return country.flag.replace('w320', 'w40');
    };
});
</script>

<template>
    <div class="p2">
        <div class="flex flex-row justify-between w-full items-center mb-4">
            <h2 class="text-xl font-bold w-full">{{ title }}</h2>
            <slot></slot>
        </div>
        <div v-if="countries.length === 0">
            <h1 class="text-xl font-bold mb-4">
                {{ $t('noScores') }}
            </h1>
        </div>
        <transition-group
            name="fade"
            tag="div"
            class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4"
        >
            <RouterLink
                v-for="country in countries"
                :key="country.name"
                class="bg-white rounded-lg shadow-md sm:p-4 hover:bg-gray-200 transition-colors duration-300 fade-up flex-row flex justify-between items-center gap-3 sm:gap-0 p-2"
                :to="`/countries/${country.code}`"
            >
                <div class="flex items-center">
                    <VLazyImage
                        :src="getFlag(country)"
                        alt="Country Flag"
                        class="w-6 h-4 mr-2"
                    />
                    <h3 class="font-bold">{{ country.name }}</h3>
                </div>
                <Badge :score="country.score" size="sm"></Badge>
            </RouterLink>
        </transition-group>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition:
        opacity 0.4s,
        transform 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}
</style>
