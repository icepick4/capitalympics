<script setup lang="ts">
import { getLevelName } from '../../utils/common';
import { CountryDetails } from './UserInfo.vue';

defineProps<{
    countries: CountryDetails[];
    title: string;
}>();
</script>

<template>
    <div class="bg-gradient rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
                <p class="text-black">
                    {{ getLevelName(country.level) }}
                </p>
            </RouterLink>
            <div v-if="countries.length === 0">
                <h1 class="text-xl font-bold mb-4">
                    {{ $t('noScores') }}
                </h1>
            </div>
        </div>
    </div>
</template>
