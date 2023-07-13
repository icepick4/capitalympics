<script setup lang="ts">
import { CountryI } from '@/models/Country';
import { useStore } from '@/store';
import { LearningType } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref } from 'vue';
import Badge from '../Badge.vue';

const store = useStore();
const user = storeToRefs(store).user;

const flagScore = ref(-1);
const capitalScore = ref(-1);

const props = defineProps<{
    country: CountryI;
}>();

onBeforeMount(async () => {
    if (!user.value) return;
    Promise.all([loadScore('flag'), loadScore('capital')]);
});

async function loadScore(type: LearningType)
{
    const response = await ApiClient.get<{ score: number|any[] }>(`/users/${user.value?.id}/${props.country.alpha3Code}/${type}/score`);
    if (!response.success) {
        console.log(`An error occured while loading the ${type} score for ${props.country.name}`, response.error);

        if (type === 'capital') {
            capitalScore.value = -1;
        } else {
            flagScore.value = -1;
        }

        return;
    }
    if (type === 'capital') {
        capitalScore.value = Array.isArray(response.data.score) ? 0 : response.data.score;
    } else {
        flagScore.value = Array.isArray(response.data.score) ? 0 : response.data.score;
    }
}
</script>

<template>
    <div class="flex justify-center">
        <div
            class="w-5/6 md:w-3/5 lg:w-2/5 bg-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
            <div
                class="p-2 lg:p-4 flex flex-col justify-center items-center lg:flex-row lg:justify-between gap-3"
            >
                <div class="flex flex-col items-center lg:items-start gap-1">
                    <h1 class="text-4xl font-bold">{{ country.name }}</h1>
                    <p>{{ country.official_name }}</p>
                    <p class="text-gray-500">{{ country.alpha3Code }}</p>
                    <div class="flex flex-col gap-2">
                        <Badge
                            v-if="flagScore !== -1"
                            :score="flagScore"
                            learningType="flag"
                        />
                        <Badge
                            v-if="capitalScore !== -1"
                            :score="capitalScore"
                            learningType="capital"
                        />
                    </div>
                </div>

                <div class="col-span-1">
                    <dt class="text-gray-500 hidden lg:visible">
                        {{ $t('flag') }}
                    </dt>
                    <dd>
                        <img
                            :src="country.flag"
                            alt="Flag"
                            class="w-28 h-auto"
                        />
                    </dd>
                </div>
            </div>
            <div class="px-4 py-2 bg-white">
                <dl class="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div class="col-span-1">
                        <dt class="text-gray-500">{{ $t('capital') }}</dt>
                        <dd class="text-gray-900">{{ country.capital }}</dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">{{ $t('region') }}</dt>
                        <dd class="text-gray-900">{{ country.region }}</dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">{{ $t('population') }}</dt>
                        <dd class="text-gray-900">
                            {{ Intl.NumberFormat().format(country.population) }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">{{ $t('subregion') }}</dt>
                        <dd class="text-gray-900">
                            {{ country.subregion }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">{{ $t('currencies') }}</dt>
                        <dd class="text-gray-900">
                            <ul>
                                <li
                                    v-for="currency in country.currencies"
                                    :key="currency.name"
                                >
                                    {{ currency.name }}
                                    {{ currency.symbol }}
                                </li>
                            </ul>
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">Google Maps</dt>
                        <dd class="text-gray-900">
                            <a
                                :href="country.google_maps_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex flex-row items-center gap-2"
                            >
                                <img
                                    src="/icons/google-maps.png"
                                    alt="Google Maps"
                                    class="w-8 h-8 sm:w-12 sm:h-12"
                                />
                                <p>{{ $t('visitGoogleMaps') }}</p>
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
