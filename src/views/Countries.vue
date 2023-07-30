<script setup lang="ts">
import CountryLink from '@/components/Country/CountryLink.vue';
import Regions from '@/components/Regions.vue';
import { useCountriesStore } from '@/store/countries';
import { useRegionsStore } from '@/store/regions';
import {
    IconSearch,
    IconSortAscending,
    IconSortDescending
} from '@tabler/icons-vue';
import { ref } from '@vue/reactivity';
import { computed } from 'vue';

const regionsStore = useRegionsStore();
const { countries } = useCountriesStore();
const displayedCountries = computed(() => {
    const _countries = Object.values(countries || {});
    if (!search.value.length && !continent.value) {
        return _countries;
    }

    const s = search.value.toLowerCase();

    return _countries.filter((country) => {
        const region = regionsStore.find(country.region_id);
        const countryName = country.name.toLowerCase();

        return (
            (!s.length || countryName.includes(s)) &&
            (!continent.value || region.continent_id === continent.value)
        );
    });
});

const sortedCountries = computed(() => {
    const unsortedCountries = displayedCountries.value.slice();

    if (currentSort.value === 'name') {
        if (currentSortName.value === 'ASC') {
            return unsortedCountries.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        } else {
            return unsortedCountries.sort((a, b) => {
                if (a.name > b.name) return -1;
                if (a.name < b.name) return 1;
                return 0;
            });
        }
    } else {
        if (currentSortPopulation.value === 'ASC') {
            return unsortedCountries.sort(
                (a, b) => a.population - b.population
            );
        } else {
            return unsortedCountries.sort(
                (a, b) => b.population - a.population
            );
        }
    }
});

type Sort = 'ASC' | 'DESC';

const search = ref('');
const continent = ref(0);
const currentSort = ref<'name' | 'population'>('name');
const currentSortPopulation = ref<Sort>('ASC');
const currentSortName = ref<Sort>('ASC');

const switchSortPopulation = () => {
    currentSortPopulation.value =
        currentSortPopulation.value === 'ASC' ? 'DESC' : 'ASC';

    currentSort.value = 'population';
};

const switchSortName = () => {
    currentSortName.value = currentSortName.value === 'ASC' ? 'DESC' : 'ASC';

    currentSort.value = 'name';
};
</script>

<template>
    <div class="flex flex-col gap-5 m-5 w-4/5 md:w-1/4 mx-auto">
        <h1 class="text-4xl font-bold text-center text-black">
            {{ $t('countries') }}
        </h1>
        <TextInput
            v-model.trim="search"
            :prepend-icon="IconSearch"
            :label="$t('countries')"
            :placeholder="$t('searchPlaceholder')"
        />
        <Regions v-model="continent" />
        <div class="flex flex-row justify-evenly items-center gap-2">
            <div class="flex flex-col items-center gap-1">
                <ActionIcon
                    :icon="
                        currentSortName === 'ASC'
                            ? IconSortAscending
                            : IconSortDescending
                    "
                    :label="
                        currentSortName === 'ASC'
                            ? $t('nameSort.asc')
                            : $t('nameSort.desc')
                    "
                    rounded
                    class="hover:scale-110"
                    @click="switchSortName"
                />
                <span>{{
                    currentSortName === 'ASC'
                        ? $t('nameSort.asc')
                        : $t('nameSort.desc')
                }}</span>
            </div>
            <div class="flex flex-col items-center gap-1">
                <ActionIcon
                    :icon="
                        currentSortPopulation === 'ASC'
                            ? IconSortAscending
                            : IconSortDescending
                    "
                    :label="
                        currentSortPopulation === 'ASC'
                            ? $t('populationSort.asc')
                            : $t('populationSort.desc')
                    "
                    rounded
                    class="hover:scale-110"
                    @click="switchSortPopulation"
                />
                <span>{{
                    currentSortPopulation === 'ASC'
                        ? $t('populationSort.asc')
                        : $t('populationSort.desc')
                }}</span>
            </div>
        </div>
    </div>
    <div class="w-full flex justify-center items-center">
        <div
            class="w-full md:w-3/4 2xl:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 p-10"
        >
            <div v-for="country in sortedCountries" :key="country.id">
                <CountryLink
                    :countryName="country.name"
                    :countryCode="country.code"
                    :countryFlag="country.flag"
                />
            </div>
        </div>
    </div>
</template>
