import { Lang } from '@/types/common';
import type { Country } from '@/types/models';
import ApiClient from '@/utils/ApiClient';
import LocalStorage from '@/utils/LocalStorage';
import { getLanguage } from '@/utils/common';
import { defineStore } from 'pinia';
import { objectify } from 'radash';
import { computed, ref } from 'vue';

type StoredCountries = {
    countries: Country[];
    language: Lang;
};

export const useCountriesStore = defineStore('countries', () => {
    const data = ref<StoredCountries | undefined>();
    const countries = computed(() => {
        if (!data.value) {
            return undefined;
        }

        return objectify(data.value.countries, (country) => country.id);
    });

    async function fetchCountries() {
        const response = await ApiClient.get<{
            success: true;
            countries: Country[];
        }>('/countries', { lang: getLanguage() });

        if (!response.success) {
            throw new Error('Failed to fetch countries');
        }

        return response.data.countries;
    }

    async function loadCountries() {
        const language = getLanguage();

        if (
            data.value &&
            data.value.language === language &&
            data.value.countries.length
        ) {
            return; // Already loaded
        }

        const storedCountries = await LocalStorage.get<StoredCountries>(
            'countries'
        );
        if (storedCountries && storedCountries.language === language) {
            data.value = storedCountries;
            return;
        }

        const countries = await fetchCountries();
        data.value = {
            countries,
            language
        };

        LocalStorage.set('countries', data.value);
    }

    function find(id: number) {
        if (!countries.value) {
            throw new Error(`Countries not loaded`);
        }

        if (!countries.value[id]) {
            throw new Error(`Country with id ${id} not found`);
        }

        return countries.value[id];
    }

    return {
        countries,
        find,
        loadCountries
    };
});
