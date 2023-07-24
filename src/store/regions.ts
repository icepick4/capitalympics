import { Lang } from '@/types/common';
import type { Region } from '@/types/models';
import ApiClient from '@/utils/ApiClient';
import LocalStorage from '@/utils/LocalStorage';
import { getLanguage } from '@/utils/common';
import { defineStore } from 'pinia';
import { objectify } from 'radash';
import { computed, ref } from 'vue';

type StoredRegions = {
    regions: Region[];
    language: Lang;
};

export const useRegionsStore = defineStore('regions', () => {
    const data = ref<StoredRegions | undefined>();
    const regions = computed(() => {
        if (!data.value) {
            return undefined;
        }

        return objectify(data.value.regions, (region) => region.id);
    });

    async function fetchRegions() {
        const response = await ApiClient.get<{ success: true, regions: Region[] }>(
            '/regions',
            { lang: getLanguage() }
        );

        if (!response.success) {
            throw new Error('Failed to fetch regions');
        }

        return response.data.regions;
    }

    async function loadRegions() {
        const language = getLanguage();

        if (
            data.value &&
            data.value.language === language &&
            data.value.regions.length
        ) {
            return; // Already loaded
        }

        const storedRegions = await LocalStorage.get<StoredRegions>('regions');
        if (storedRegions && storedRegions.language === language) {
            data.value = storedRegions;
            return;
        }

        const regions = await fetchRegions();
        data.value = {
            regions,
            language,
        };

        LocalStorage.set('regions', data.value);
    }

    function find(id: number) {
        if (!regions.value) {
            throw new Error(`Regions not loaded`);
        }

        if (!regions.value[id]) {
            throw new Error(`Region with id ${id} not found`);
        }

        return regions.value[id];
    }

    return {
        find,
        regions,
        loadRegions,
    };
});
