<script lang="ts">
import { reactive } from '@vue/reactivity';
import { RouterLink } from 'vue-router';
import { CountryObject } from '../models/Country';
export default {
    name: 'Countries',
    components: { RouterLink },
    setup() {
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
                    capital: data[i].capital,
                    flag: data[i].flags.png,
                    population: data[i].population,
                    region: data[i].region,
                    alpha3Code: data[i].cca3,
                    currencies: data[i].currencies
                });
            }
        };

        fetchCountries();

        return { countries };
    }
};
</script>

<template>
    <h1 class="text-white">Hello Countries !</h1>
    <p class="text-white">Number of countries : {{ countries.length }}</p>
    <div class="grid grid-cols-4 gap-10 m-5">
        <div
            v-for="country in countries"
            :key="country.alpha3Code"
            class="flex flex-col items-center justify-center"
        >
            <RouterLink
                :to="{
                    name: 'SingleCountry',
                    params: {
                        countryData: JSON.stringify(country),
                        countryName: country.alpha3Code
                    }
                }"
            >
                <img :src="country.flag" alt="flag" class="w-auto h-20" />
            </RouterLink>
        </div>
    </div>
</template>
