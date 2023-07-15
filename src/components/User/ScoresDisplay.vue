<script setup lang="ts">
import { CountryDetails } from '@/types/common';
import VLazyImage from 'v-lazy-image';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';

const props = defineProps<{
    countries: CountryDetails[];
    title: string;
}>();

const getFlag = computed(() => {
    return (country: CountryDetails) => {
        let flag: string[];
        flag = country.flag.split('/');
        console.log(flag);
        flag.splice(flag.length - 2, 1, '16x12');
        console.log(flag);
        return flag.join('/');
    };
});
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
            class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
            <RouterLink
                v-for="country in countries"
                :key="country.name"
                class="bg-white rounded-lg shadow-md sm:p-4 hover:bg-gray-200 transition-colors duration-300 fade-up flex-row flex justify-between items-center gap-3 sm:gap-0 p-2"
                :to="`/countries/${country.alpha3Code}`"
            >
                <div class="flex items-center">
                    <VLazyImage
                        :src="getFlag(country)"
                        alt="Country Flag"
                        class="w-6 h-4 mr-2"
                    />
                    <h3 class="font-bold">{{ country.name }}</h3>
                </div>
                <!-- <Badge :score="country.score" /> -->
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
