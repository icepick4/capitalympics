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

export default {
    name: 'Countries',
    components: { RouterLink },
    setup() {
        return { countries };
    }
};
</script>

<template>
    <div class="grid grid-cols-4 gap-16 p-10">
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
                <div class="relative">
                    <img
                        :src="country.flag"
                        :alt="`Flag of ${country.name}`"
                        class="w-full h-36 object-cover rounded shadow transition ease-in-out duration-300"
                        :title="country.name"
                    />
                    <span
                        class="absolute w-full h-full bottom-7 left-0 right-0 px-2 py-1 text-white opacity-0 hover:opacity-100 transition ease-in-out duration-200"
                        >{{ country.name }}</span
                    >
                </div>
            </router-link>
        </div>
    </div>
</template>
