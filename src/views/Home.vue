<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CarouselAuto from '../components/CarouselAuto.vue';
import Planet from '../components/Planet.vue';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
import ApiService from '../services/apiService';

const countries = ref<CountryI[]>([]);
const store = useStore();
const router = useRouter();
const user: User = ref(store.getters.user);
const planetMouseDown = ref(false);

const handlePlanetMouseDown = () => {
    planetMouseDown.value = true;
};

const handlePlanetMouseUp = () => {
    planetMouseDown.value = false;
};

const navigateToCountry = (country: CountryI) => {
    router.push(`/countries/${country.alpha3Code}`);
};

onBeforeMount(async () => {
    try {
        let fetchedCountries = await ApiService.getCountries(8);
        countries.value = fetchedCountries
            .concat(fetchedCountries)
            .concat(fetchedCountries);
        console.log(countries.value.length);
    } catch (error) {
        console.log(error);
    }
});
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-start">
            <h1 class="text-6xl text-black mb-4 mt-4">
                {{ $t('welcome') }}
            </h1>
            <p class="text-black text-2xl">
                {{ $t('welcomeMessage') }}
            </p>
        </div>
        <Planet
            class="cursor-grab lg:block hidden"
            @mousedown="handlePlanetMouseDown"
            @mouseup="handlePlanetMouseUp"
            :class="{ 'cursor-grabbing': planetMouseDown }"
        />
    </div>
    <CarouselAuto v-if="countries.length > 0">
        <template v-for="country in countries" :key="country.name">
            <img
                :src="country.flag"
                class="carousel-item cursor-pointer"
                @click="navigateToCountry(country)"
            />
        </template>
    </CarouselAuto>
</template>

<style scoped>
.carousel-item {
    filter: grayscale(60%);
    transition: all 0.25s ease-in-out;
    object-fit: cover;
}
.carousel-item:hover {
    filter: grayscale(0%);
    animation-play-state: paused;
}
</style>
