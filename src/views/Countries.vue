<script setup lang="ts">
import { reactive } from '@vue/reactivity';
import { computed, onBeforeMount } from 'vue';
import CountryLink from '../components/CountryLink.vue';
import { CountryI } from '../models/Country';
import ApiService from '../services/apiService';
interface State {
    countries: CountryI[];
    message: string;
}
const regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

const state: State = reactive({
    countries: [],
    message: ''
});

const search = reactive({
    value: ''
});

const region = reactive({
    value: ''
});
const filteredCountriesByName = computed(() => {
    if (search.value.length > 0 || region.value.length > 0) {
        return state.countries.filter((country) => {
            return (
                country.name
                    .toLowerCase()
                    .includes(search.value.toLowerCase()) &&
                country.region.includes(region.value)
            );
        });
    } else {
        return state.countries;
    }
});
onBeforeMount(async () => {
    state.countries = await ApiService.getCountries();
    if (state.countries.length === 0) {
        state.message = 'No countries found';
    } else {
        state.message = `Found ${state.countries.length} countries`;
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 m-5">
        <h1 class="text-4xl font-bold text-center text-white">Countries</h1>
        <input
            type="text"
            v-model="search.value"
            class="w-1/4 mx-auto p-2 placeholder-opacity-50 rounded-md"
            placeholder="Search by name"
        />

        <select v-model="region.value" class="w-1/4 mx-auto p-2 rounded-md">
            <option value="">All</option>
            <option v-for="region in regions" :key="region" :value="region">
                {{ region }}
            </option>
        </select>

        <button
            class="w-1/4 mx-auto p-2 rounded-md bg-primary hover:bg-primaryhover text-white"
            @click="
                search.value = '';
                region.value = '';
            "
        >
            Reset Filters
        </button>
    </div>

    <p class="text-center text-white text-2xl">{{ state.message }}</p>

    <div
        v-if="filteredCountriesByName.length === 0"
        class="flex justify-center items-center w-full h-full gap-5"
    >
        <div
            v-for="i in 3"
            :key="i"
            :style="{ 'animation-delay': `${(i - 1) * 0.2}s` }"
            class="rounded-full h-8 w-8 animate-pulse-fast flex justify-center items-center bg-white"
        ></div>
    </div>
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-10"
    >
        <div
            v-for="country in filteredCountriesByName"
            :key="country.alpha3Code"
        >
            <CountryLink
                :countryName="country.name"
                :countryCode="country.alpha3Code"
                :countryFlag="country.flag"
            />
        </div>
    </div>
</template>
