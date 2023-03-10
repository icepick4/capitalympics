<script lang="ts">
import { reactive } from '@vue/reactivity';
import { RouterLink } from 'vue-router';
export default {
    name: 'Countries',
    components: { RouterLink },
    setup() {
        const countries = reactive([] as string[][]);

        const fetchCountries = async () => {
            const url = 'https://restcountries.com/v3.1/all';
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            for (let i = 0; i < data.length; i++) {
                countries.push([
                    data[i].name.common,
                    data[i].capital,
                    data[i].flags.png,
                    data[i].cca3,
                    data[i].region,
                    data[i].population
                ]);
            }
            console.log(countries);
        };

        fetchCountries();

        return { countries };
    }
};
</script>

<template>
    <h1 class="text-white">Hello Countries !</h1>
    <p>Number of countries : {{ countries.length }}</p>
    <div class="grid grid-cols-6 gap-10">
        <div
            v-for="country in countries"
            :key="country[3]"
            class="flex flex-col items-center justify-center"
        >
            <RouterLink
                :to="{
                    name: 'Country',
                    params: { countryData: country, country: country[3] }
                }"
            >
                <img :src="country[2]" alt="flag" class="w-auto h-20" />
            </RouterLink>
        </div>
    </div>
</template>
