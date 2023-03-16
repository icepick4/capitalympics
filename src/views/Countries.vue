<script lang="ts">
import { reactive } from '@vue/reactivity';
import { RouterLink } from 'vue-router';
import { CountryObject } from '../models/Country';
const countries = reactive([] as CountryObject[]);

const fetchCountries = async () => {
    const url = 'https://restcountries.com/v3.1/all';
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(response.statusText);
    }
    const data = await response.json();
    for (let i = 0; i < data.length; i++) {
        if (data[i].population > 0 && 'capital' in data[i]) {
            countries.push({
                name: data[i].name.common,
                officialName: data[i].name.official,
                capital:
                    typeof data[i].capital === 'string'
                        ? data[i].capital
                        : data[i].capital[0],
                region: data[i].region,
                subregion: data[i].subregion,
                population: data[i].population,
                googleMapsLink: data[i].maps.googleMaps,
                flag: data[i].flags.png,
                alpha3Code: data[i].cca3,
                currencies: data[i].currencies
            });
        }
    }
};

fetchCountries();
let message = `${countries.length} countries available`;

const regions: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

export default {
    name: 'Countries',
    components: { RouterLink },
    data() {
        return {
            countries,
            search: '',
            region: '',
            regions,
            message
        };
    },
    computed: {
        filteredCountriesByName() {
            if (this.search.length > 0 || this.region.length > 0) {
                return this.countries.filter((country) => {
                    return (
                        country.name
                            .toLowerCase()
                            .includes(this.search.toLowerCase()) &&
                        country.region.includes(this.region)
                    );
                });
            } else {
                return this.countries;
            }
        }
    }
};
</script>

<template>
    <div class="flex flex-col gap-5 m-5">
        <h1 class="text-4xl font-bold text-center text-white">Countries</h1>
        <input
            type="text"
            v-model="search"
            class="w-1/4 mx-auto p-2 placeholder-opacity-50 rounded-md"
            placeholder="Search by name"
        />

        <select v-model="region" class="w-1/4 mx-auto p-2 rounded-md">
            <option value="">All</option>
            <option v-for="region in regions" :key="region" :value="region">
                {{ region }}
            </option>
        </select>

        <button
            class="w-1/4 mx-auto p-2 rounded-md bg-primary hover:bg-primaryhover text-white"
            @click="
                search = '';
                region = '';
            "
        >
            Reset Filters
        </button>
    </div>

    <p class="text-center text-2xl">{{ message }}</p>

    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-10"
    >
        <div
            v-for="country in filteredCountriesByName"
            :key="country.alpha3Code"
        >
            <router-link
                :to="{
                    name: 'SingleCountry',
                    params: {
                        countryName: country.alpha3Code,
                        countryData: JSON.stringify(country)
                    }
                }"
            >
                <div
                    class="relative flex justify-center items-center h-full hover:scale-105 transition ease-in-out duration-300"
                >
                    <img
                        :src="country.flag"
                        :alt="`Flag of ${country.name}`"
                        class="w-full h-auto object-cover rounded shadow transition ease-in-out duration-300 border-2 border-black"
                        :title="country.name"
                    />
                    <span
                        class="absolute w-full h-full bottom-0 left-0 right-0 text-white opacity-0 hover:opacity-100 transition ease-in-out duration-200"
                    >
                        <p class="-translate-y-7">{{ country.name }}</p>
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>
