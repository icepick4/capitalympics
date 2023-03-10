<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Country from '../components/Country.vue';
import { CountryObject, Currency } from '../models/Country';
export default defineComponent({
    name: 'SingleCountry',
    components: { Country },
    setup() {
        const route = useRoute();
        let country = route.params.countryData;
        if (Array.isArray(country)) {
            country = country[0];
        }
        let tempCountryObject = JSON.parse(country);
        for (let i = 0; i < tempCountryObject.currencies.length; i++) {
            tempCountryObject.currencies[i] = new Currency(
                tempCountryObject.currencies[i].name,
                tempCountryObject.currencies[i].symbol
            );
        }
        let countryObject: CountryObject = new CountryObject(
            tempCountryObject.name,
            tempCountryObject.capital[0],
            tempCountryObject.region,
            tempCountryObject.population,
            tempCountryObject.flag,
            tempCountryObject.alpha3Code,
            tempCountryObject.currencies
        );

        return { countryObject };
    }
});
</script>

<template>
    <Country :country="countryObject" />
    <RouterLink
        :to="{ name: 'Countries' }"
        class="transition ease-in-out delay-100 text-white text-2xl font-bold text-center p-5 bg-blue-500 rounded-md hover:bg-blue-600 hover:scale-105 w-1/4 mx-auto"
    >
        Back
    </RouterLink>
</template>
