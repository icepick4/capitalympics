<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity';
import { onBeforeMount } from 'vue';
import BlurContainer from '../components/BlurContainer.vue';
import CountryLink from '../components/Country/CountryLink.vue';
import Loader from '../components/Loader.vue';
import Modal from '../components/Modal.vue';
import { CountryI } from '../models/Country';
import ApiService from '../services/apiService';
import { Redirection } from '../types/Redirection';
import { getLanguage, regions } from '../utils/common';
import { Redirections } from '../utils/redirections';
interface State {
    countries: CountryI[];
}

const noCountriesRedirection: Redirection =
    Redirections.getRedirectionByLink('/home');

const state: State = reactive({
    countries: []
});

const search = reactive({
    value: ''
});

const region = reactive({
    value: ''
});

const finishedWaited = ref(false);

const filteredCountries = () => {
    if (
        search.value.length > 0 ||
        (region.value.length > 0 && region.value !== 'World')
    ) {
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
};

onBeforeMount(async () => {
    const lang = getLanguage();
    try {
        state.countries = await ApiService.getCountries(0, lang);
    } catch (error) {
        finishedWaited.value = true;
    }
    if (state.countries.length !== 0) {
        finishedWaited.value = true;
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 m-5">
        <h1 class="text-4xl font-bold text-center text-black">
            {{ $t('countries') }}
        </h1>
        <input
            type="text"
            v-model="search.value"
            class="w-4/5 md:w-1/4 mx-auto p-2 placeholder-opacity-50 rounded-md bg-gradient text-black placeholder-black"
            :placeholder="$t('searchPlaceholder')"
        />

        <select
            v-model="region.value"
            class="w-4/5 md:w-1/4 mx-auto p-2 rounded-md bg-gradient"
        >
            <option
                class="bg-white"
                v-for="region in regions[getLanguage()]"
                :key="region[0]"
                :value="region[1]"
            >
                {{ region[0] }}
            </option>
        </select>

        <button
            class="w-4/5 md:w-1/4 mx-auto p-2 rounded-md bg-gradient text-black active:bg-gray-700"
            @click="
                search.value = '';
                region.value = '';
            "
        >
            {{ $t('resetFilters') }}
        </button>
    </div>

    <BlurContainer v-if="!finishedWaited && state.countries.length === 0">
        <Loader :title="$t('loading')" />
    </BlurContainer>
    <BlurContainer v-else-if="finishedWaited && state.countries.length === 0">
        <Modal
            :title="$t('noCountriesFound')"
            :message="$t('checkNetworkConnection')"
            :backgroundColor="`white`"
            :titleColor="`error`"
            :redirection="noCountriesRedirection"
        />
    </BlurContainer>
    <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-16 p-10"
    >
        <div v-for="country in filteredCountries()" :key="country.alpha3Code">
            <CountryLink
                :countryName="country.name"
                :countryCode="country.alpha3Code"
                :countryFlag="country.flag"
            />
        </div>
    </div>
</template>
