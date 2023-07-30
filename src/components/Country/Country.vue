<script setup lang="ts">
import { CountryI } from '@/models/Country';
import Badge from '../Badge.vue';

defineProps<{
    country: CountryI;
    flagScore: number;
    capitalScore: number;
}>();
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
                    <p class="text-gray-500">{{ country.code }}</p>
                    <div class="flex flex-col gap-2">
                        <Badge
                            :score="flagScore"
                            learningType="flag"
                            size="md"
                        />
                        <Badge
                            :score="capitalScore"
                            learningType="capital"
                            size="md"
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
                        <dd class="text-gray-900">
                            {{ country.region.continent.name }}
                        </dd>
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
                            {{ country.region.name }}
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
