<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import { onBeforeMount, watchEffect } from 'vue';
import BlurContainer from '../components/BlurContainer.vue';
import CountryLink from '../components/Country/CountryLink.vue';
import Loader from '../components/Loader.vue';
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

const finishedWaited = ref(false);

const filteredCountries = () => {
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
};

onBeforeMount(async () => {
    try {
        state.countries = await ApiService.getCountries();
    } catch (error) {
        finishedWaited.value = true;
    }
    if (state.countries.length === 0) {
        state.message = 'No countries found';
    } else {
        state.message = `Found ${state.countries.length} countries`;
    }
});

const numberOfCountries = () => filteredCountries().length;

watchEffect(() => {
    state.message = `Found ${numberOfCountries()} countries.`;
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

    <BlurContainer v-if="filteredCountries().length === 0 && !finishedWaited">
        <Loader />
    </BlurContainer>
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-10"
    >
        <div v-for="country in filteredCountries()" :key="country.alpha3Code">
            <CountryLink
                :countryName="country.name"
                :countryCode="country.alpha3Code"
                :countryFlag="country.flag"
            />
        </div>
    </div>
</template>
