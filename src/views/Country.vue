<script lang="ts">
import { defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import { CountryObject } from '../models/Country';
export default defineComponent({
    name: 'Country',
    components: {},
    setup() {
        const route = useRoute();
        const country = route.params.country;
        const countryData = route.params.countryData;
        let countryObject: CountryObject = {
            name: countryData[0],
            capital: countryData[1],
            region: countryData[4],
            population: parseInt(countryData[5]),
            flag: countryData[2],
            alpha3Code: countryData[3]
        };
        return { country, countryObject };
    }
});
</script>

<template>
    <h1 class="text-white">Hello {{ country }} !</h1>
    <p>Capital : {{ countryObject.capital }}</p>
</template>
