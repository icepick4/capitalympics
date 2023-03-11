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
        countries.push({
            name: data[i].name.common,
            officialName: data[i].name.official,
            capital: data[i].capital,
            region: data[i].region,
            subregion: data[i].subregion,
            population: data[i].population,
            googleMapsLink: data[i].maps.googleMaps,
            flag: data[i].flags.png,
            alpha3Code: data[i].cca3,
            currencies: data[i].currencies
        });
    }
};

fetchCountries();

export default {
    name: 'Countries',
    components: { RouterLink },
    setup() {
        return { countries };
    }
};
</script>

<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-10"
    >
        <div v-for="country in countries" :key="country.alpha3Code">
            <router-link
                :to="{
                    name: 'SingleCountry',
                    params: {
                        countryName: country.alpha3Code,
                        countryData: JSON.stringify(country)
                    }
                }"
            >
                <div class="relative flex justify-center items-center h-full">
                    <img
                        :src="country.flag"
                        :alt="`Flag of ${country.name}`"
                        class="w-full h-auto object-cover rounded shadow transition ease-in-out duration-300"
                        :title="country.name"
                    />
                    <span
                        class="absolute w-full h-full bottom-0 left-0 right-0 px-2 py-1 text-white opacity-0 hover:opacity-100 transition ease-in-out duration-200"
                    >
                        <p class="-translate-y-7">{{ country.name }}</p>
                    </span>
                </div>
            </router-link>
        </div>
    </div>
</template>
