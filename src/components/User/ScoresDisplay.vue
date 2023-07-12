<script setup lang="ts">
import { CountryDetails } from '@/types/common';
import { RouterLink } from 'vue-router';
import Badge from '../Badge.vue';

defineProps<{
    countries: CountryDetails[];
    title: string;
}>();
</script>

<template>
    <div class="bg-gradient rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <div v-if="countries.length === 0">
            <h1 class="text-xl font-bold mb-4">
                {{ $t('noScores') }}
            </h1>
        </div>
        <transition-group
            name="fade"
            tag="div"
            class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        >
            <RouterLink
                v-for="country in countries"
                :key="country.name"
                class="bg-white rounded-lg shadow-md p-4 hover:bg-gray-200 transition-colors duration-300 fade-up"
                :to="`/countries/${country.alpha3Code}`"
            >
                <div class="flex items-center mb-2">
                    <img
                        :src="country.flag"
                        alt="Country Flag"
                        class="w-6 h-4 mr-2"
                    />
                    <h3 class="font-bold">{{ country.name }}</h3>
                </div>
                <Badge :score="country.score" />
            </RouterLink>
        </transition-group>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s, transform 0.4s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    transform: translateX(-100px);
}
</style>
