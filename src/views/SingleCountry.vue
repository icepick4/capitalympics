<script lang="ts">
import { defineComponent } from 'vue';
import { RouterLink, useRoute } from 'vue-router';
import Country from '../components/Country.vue';
import { CountryObject, Currency } from '../models/Country';
import router from '../router';

export default defineComponent({
    name: 'SingleCountry',
    components: { Country },
    inheritAttrs: false,
    setup() {
        const route = useRoute();
        let country = route.params.countryData;
        if (country == undefined) {
            //go back to countries
            router.replace({ name: 'Countries' });
            return {};
        }
        if (Array.isArray(country)) {
            country = country[0];
        }
        let tempCountryObject = JSON.parse(country);
        if (tempCountryObject.currencies == undefined) {
            tempCountryObject.currencies = [];
        } else {
            for (let i = 0; i < tempCountryObject.currencies.length; i++) {
                tempCountryObject.currencies[i] = new Currency(
                    tempCountryObject.currencies[i].name,
                    tempCountryObject.currencies[i].symbol
                );
            }
        }
        let countryObject: CountryObject = new CountryObject(
            tempCountryObject.name,
            tempCountryObject.officialName,
            tempCountryObject.capital,
            tempCountryObject.region,
            tempCountryObject.subregion,
            new Intl.NumberFormat().format(tempCountryObject.population),
            tempCountryObject.googleMapsLink,
            tempCountryObject.flag,
            tempCountryObject.alpha3Code,
            tempCountryObject.currencies
        );
        return { countryObject };
    }
});
</script>

<template>
    <Transition name="slide-fade" appear>
        <Country v-if="countryObject != undefined" :country="countryObject" />
    </Transition>
    <RouterLink
        :to="{ name: 'Countries' }"
        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/4 mx-auto"
    >
        Back
    </RouterLink>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(80px);
    opacity: 0;
}
</style>
