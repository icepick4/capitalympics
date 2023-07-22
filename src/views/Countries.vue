<script setup lang="ts">
import BlurContainer from '@/components/BlurContainer.vue';
import CountryLink from '@/components/Country/CountryLink.vue';
import Loader from '@/components/Loader.vue';
import Regions from '@/components/Regions.vue';
import Dialog from '@/components/common/Dialog.vue';
import TextInput from '@/components/common/TextInput.vue';
import { CountryI } from '@/models/Country';
import ApiService from '@/services/apiService';
import { getLanguage } from '@/utils/common';
import { reactive, ref } from '@vue/reactivity';
import { onBeforeMount } from 'vue';

interface State {
    countries: CountryI[];
}

const state: State = reactive({
    countries: []
});

const search = ref('');
const region = ref('World');

const finishedWaited = ref(false);
const displaySum41 = ref(false);

const filteredCountries = () => {
    if (search.value.length > 0 || region.value.length > 0) {
        displaySum41.value = search.value === 'sum';
        const currentRegion: string =
            region.value !== 'World' ? region.value : '';

        return state.countries.filter((country) => {
            return (
                country.name
                    .toLowerCase()
                    .includes(search.value.toLowerCase()) &&
                country.region.includes(currentRegion)
            );
        });
    } else {
        return state.countries;
    }
};

onBeforeMount(async () => {
    const lang = getLanguage();

    try {
        state.countries = await ApiService.getCountries(undefined, lang);
    } catch (error) {
        finishedWaited.value = true;
    }
    if (state.countries.length !== 0) {
        finishedWaited.value = true;
    }
});
</script>

<template>
    <div class="flex flex-col gap-5 m-5 w-4/5 md:w-1/4 mx-auto">
        <h1 class="text-4xl font-bold text-center text-black">
            {{ $t('countries') }}
        </h1>

        <TextInput
            v-model="search"
            :label="$t('countries')"
            :placeholder="$t('searchPlaceholder')"
        />

        <Regions v-model="region" />

        <button
            type="button"
            :disabled="search.length === 0 && region === 'World'"
            class="w-full flex items-center justify-center px-4 py-4 text-base font-normal text-black border rounded-md transition-all duration-200 bg-gray-50 hover:bg-gray-200 disabled:hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
            @click="
                search = '';
                region = 'World';
            "
        >
            <span>{{ $t('resetFilters') }}</span>
        </button>
    </div>
    <div v-if="displaySum41" class="flex justify-center">
        <h1 class="text-4xl font-bold text-center text-black">41</h1>
    </div>
    <BlurContainer v-if="!finishedWaited && state.countries.length === 0">
        <Loader :title="$t('loading')" />
    </BlurContainer>
    <template v-else-if="finishedWaited && state.countries.length === 0">
        <Dialog
            :isOpen="true"
            :title="$t('noCountriesFound')"
            :description="$t('checkNetworkConnection')"
            :buttonDescription="$t('close')"
            @close="
                finishedWaited = false;
                $router.push('/');
            "
            type="error"
        />
    </template>
    <div v-else class="w-full flex justify-center items-center">
        <div
            class="w-full md:w-3/4 2xl:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 p-10"
        >
            <div
                v-for="country in filteredCountries()"
                :key="country.alpha3Code"
            >
                <CountryLink
                    :countryName="country.name"
                    :countryCode="country.alpha3Code"
                    :countryFlag="country.flag"
                />
            </div>
        </div>
    </div>
</template>
