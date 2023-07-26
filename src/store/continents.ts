import { Lang } from '@/types/common';
import type { Continent } from '@/types/models';
import ApiClient from '@/utils/ApiClient';
import LocalStorage from '@/utils/LocalStorage';
import { getLanguage } from '@/utils/common';
import { defineStore } from 'pinia';
import { objectify } from 'radash';
import { computed, ref } from 'vue';

type StoredContinents = {
    continents: Continent[];
    language: Lang;
};

export const useContinentsStore = defineStore('continents', () => {
    const data = ref<StoredContinents | undefined>();
    const continents = computed(() => {
        if (!data.value) {
            return undefined;
        }

        return objectify(data.value.continents, (continent) => continent.id);
    });

    async function fetchContinents() {
        const response = await ApiClient.get<{
            success: true;
            continents: Continent[];
        }>('/continents', { lang: getLanguage() });

        if (!response.success) {
            throw new Error('Failed to fetch continents');
        }

        return response.data.continents;
    }

    async function loadContinents() {
        const language = getLanguage();

        if (
            data.value &&
            data.value.language === language &&
            data.value.continents.length
        ) {
            return; // Already loaded
        }

        const storedContinents = await LocalStorage.get<StoredContinents>(
            'continents'
        );
        if (storedContinents && storedContinents.language === language) {
            data.value = storedContinents;
            return;
        }

        const continents = await fetchContinents();
        data.value = {
            continents,
            language
        };

        LocalStorage.set('continents', data.value);
    }

    function find(id: number) {
        if (!continents.value) {
            throw new Error(`Continents not loaded`);
        }

        if (!continents.value[id]) {
            throw new Error(`Continent with id ${id} not found`);
        }

        return continents.value[id];
    }

    return {
        continents,
        find,
        loadContinents
    };
});
