<script lang="ts">
import { reactive } from '@vue/reactivity';
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import { CountryI } from '../models/Country';
interface State {
    countries: CountryI[];
    message: string;
}

export default defineComponent({
    name: 'Countries',
    components: { RouterLink },
    setup() {
        const regions: string[] = [
            'Africa',
            'Americas',
            'Asia',
            'Europe',
            'Oceania'
        ];

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

        return {
            filteredCountriesByName,
            regions,
            region,
            search,
            state
        };
    },
    created() {
        axios
            .get('http://localhost:3000/countries')
            .then((response) => {
                this.state.countries = response.data.countries;
                this.state.message = `${this.state.countries.length} countries available`;
            })
            .catch((error) => {
                console.log(error);
            });
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
                        countryCode: country.alpha3Code
                    }
                }"
            >
                <div
                    class="relative flex justify-center items-center h-full hover:scale-105 transition ease-in-out duration-300"
                >
                    <img
                        :src="country.flag"
                        :alt="`Flag of ${country.name}`"
                        class="w-full h-auto I-cover rounded shadow transition ease-in-out duration-300 border-2 border-black"
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
