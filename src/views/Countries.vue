<script setup lang="ts">
import CountryLink from '@/components/Country/CountryLink.vue';
import Regions from '@/components/Regions.vue';
import { useCountriesStore } from '@/store/countries';
import { useRegionsStore } from '@/store/regions';
import { IconZoomFilled } from '@tabler/icons-vue';
import { ref } from '@vue/reactivity';
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
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

        return (!s.length || countryName.includes(s))
            && (!continent.value || region.continent_id === continent.value);
    });
})

const search = ref('');
const continent = ref(0);
</script>

<template>
    <div class="flex flex-col gap-5 m-5 w-4/5 md:w-1/4 mx-auto">
        <h1 class="text-4xl font-bold text-center text-black">
            {{ $t('countries') }}
        </h1>
        <TextInput
            v-model.trim="search"
            :prepend-icon="IconZoomFilled"
            :label="$t('countries')"
            :placeholder="$t('searchPlaceholder')"
        />
        <Regions v-model="continent" />
    </div>
    <div class="w-full flex justify-center items-center">
        <div
            class="w-full md:w-3/4 2xl:w-7/12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16 p-10"
        >
            <div v-for="country in displayedCountries" :key="country.id">
                <CountryLink
                    :countryName="country.name"
                    :countryCode="country.code"
                    :countryFlag="country.flag"
                />
            </div>
        </div>
    </div>
</template>
