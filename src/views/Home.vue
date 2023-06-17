<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import Planet from '../components/Planet.vue';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
import ApiService from '../services/apiService';

interface State {
    countries: CountryI[];
}

const state: State = {
    countries: []
};

const store = useStore();
const user: User = ref(store.getters.user);
const planetMouseDown = ref(false);

const handlePlanetMouseDown = () => {
    planetMouseDown.value = true;
};

const handlePlanetMouseUp = () => {
    planetMouseDown.value = false;
};

onBeforeMount(async () => {
    try {
        state.countries = await ApiService.getCountries();
        console.log(state.countries);
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
</template>
