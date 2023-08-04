<script setup lang="ts">
import { CountryI } from '@/models/Country';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Badge from '../Badge.vue';

defineProps<{
    country: CountryI;
    flagScore: number;
    capitalScore: number;
}>();

const { t } = useI18n();

const seeBack = ref(false);

const switchCard = () => {
    seeBack.value = !seeBack.value;
};

const switchText = computed(() => {
    return seeBack.value ? t('seeInformations') : t('seeProgression');
});
</script>

<template>
    <div class="flex justify-center">
        <div
            class="relative w-5/6 md:w-3/5 lg:w-2/5 bg-gray-300 rounded-lg shadow-lg overflow-hidden"
        >
            <div
                class="p-2 lg:p-4 flex flex-row justify-center items-start lg:flex-row lg:justify-between gap-3"
            >
                <div
                    class="w-full flex flex-col items-start lg:items-start gap-1"
                >
                    <h1 class="text-4xl font-bold">{{ country.name }}</h1>
                    <p>{{ country.official_name }}</p>
                    <p class="text-gray-500">{{ country.code }}</p>
                    <div class="flex flex-col items-start gap-2">
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
                    <span
                        class="text-lg mt-2 hover:underline cursor-pointer select-none"
                        @click="switchCard"
                    >
                        {{ switchText }}
                    </span>
                </div>

                <div class="absolute top-0 right-0 m-3 xs:block col-span-1">
                    <dt class="text-gray-500 hidden lg:visible">
                        {{ $t('flag') }}
                    </dt>
                    <dd>
                        <img
                            :src="country.flag"
                            alt="Flag"
                            class="w-14 xs:w-20 md:w-28 h-auto"
                        />
                    </dd>
                </div>
            </div>
            <div v-if="!seeBack" class="px-4 py-2 bg-white">
                <dl class="mt-2 grid grid-cols-2 gap-x-4 gap-y-2">
                    <div class="col-span-1">
                        <dt class="text-gray-500">
                            {{ $t('capital') }}
                        </dt>
                        <dd class="text-gray-900">
                            {{ country.capital }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">
                            {{ $t('region') }}
                        </dt>
                        <dd class="text-gray-900">
                            {{ country.region.continent.name }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">
                            {{ $t('population') }}
                        </dt>
                        <dd class="text-gray-900">
                            {{ Intl.NumberFormat().format(country.population) }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">
                            {{ $t('subregion') }}
                        </dt>
                        <dd class="text-gray-900">
                            {{ country.region.name }}
                        </dd>
                    </div>
                    <div class="col-span-1">
                        <dt class="text-gray-500">
                            {{ $t('currencies') }}
                        </dt>
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
            <div
                class="bg-gradient p-2 lg:p-6 flex flex-col items-start xl:flex-row lg:justify-between gap-3"
                v-if="seeBack"
            >
                <div class="flex flex-col h-full justify-between gap-4">
                    <h1 class="text-lg xl:text-2xl font-bold">
                        {{ $t('flags') }}
                    </h1>
                    <Badge
                        :score="flagScore"
                        learningType="flag"
                        size="md"
                        :progress="true"
                    />
                </div>
                <div class="flex flex-col h-full justify-between gap-4">
                    <h1
                        class="text-lg xl:text-2xl font-bold text-left xl:text-right"
                    >
                        {{ $t('capitals') }}
                    </h1>
                    <Badge
                        :score="capitalScore"
                        learningType="capital"
                        size="md"
                        :progress="true"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease;
    transition-delay: 0.3s;
}

.slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
    opacity: 0;
    transform: translateY(10px);
}

.slide-fade-enter-to {
    opacity: 1;
    transform: translateX(0);
}
</style>
