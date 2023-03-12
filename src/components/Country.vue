<script lang="ts">
import { defineComponent } from 'vue';
import { CountryObject } from '../models/Country';
export default defineComponent({
    name: 'Country',
    props: {
        country: {
            type: CountryObject,
            required: true
        }
    }
});
</script>

<template>
    <div class="flex justify-center">
        <div
            class="max-w-lg w-full bg-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
            <div class="p-4 flex flex-row justify-between">
                <div class="flex flex-col">
                    <h1 class="text-4xl font-bold">{{ country.name }}</h1>
                    <p>{{ country.officialName }}</p>
                    <p class="text-gray-500">{{ country.alpha3Code }}</p>
                </div>
                <div class="col-span-1">
                    <dt class="text-gray-500">Flag</dt>
                    <dd>
                        <img
                            :src="country.flag"
                            alt="Flag"
                            class="w-28 h-auto border-2 border-black rounded"
                        />
                    </dd>
                </div>
            </div>
            <div class="px-4 py-2 bg-white">
                <dl class="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div class="col-span-1">
                        <dt class="text-gray-500">Capital</dt>
                        <dd class="text-gray-900">{{ country.capital }}</dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">Region</dt>
                        <dd class="text-gray-900">{{ country.region }}</dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">Population</dt>
                        <dd class="text-gray-900">
                            {{ country.population }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">Subregion</dt>
                        <dd class="text-gray-900">
                            {{ country.subregion }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">Currencies</dt>
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
                                :href="country.googleMapsLink"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex flex-row items-center gap-2"
                            >
                                <img
                                    src="../assets/icons/google-maps.png"
                                    alt="Google Maps"
                                    class="w-12 h-12"
                                />
                                <p>Visit Google Maps</p>
                            </a>
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </div>
</template>
