<script setup lang="ts">
import Country from '@/components/Country/Country.vue';
import Loader from '@/components/Loader.vue';
import { CountryI } from '@/models/Country';
import ApiClient from '@/utils/ApiClient';
import { getLanguage } from '@/utils/common';
import { onBeforeMount, reactive } from 'vue';

interface State {
    country: CountryI | undefined;
    isLoading: boolean;
    flagScore: number;
    capitalScore: number;
}

const state: State = reactive({
    country: undefined,
    isLoading: true,
    flagScore: -1,
    capitalScore: -1
});

const props = defineProps<{
    countryCode: string;
}>();

onBeforeMount(async () => {
    let lang = getLanguage();

    interface CountryResponse {
        success: boolean;
        country: CountryI;
        flagScore?: number;
        capitalScore?: number;
    }

    try {
        const response = await ApiClient.get<CountryResponse>(
            `/countries/${props.countryCode}?lang=${lang}`
        );

        if (!response.success) {
            console.error(response);
            return;
        }

        state.country = response.data.country;
        state.flagScore = response.data.flagScore || -1;
        state.capitalScore = response.data.capitalScore || -1;
        state.isLoading = false;
    } catch (error) {
        state.isLoading = false;
    }
});

const goBack = () => {
    window.history.go(-1);
};
</script>

<template>
    <Loader v-if="state.isLoading" :title="$t('loading') + countryCode" />
    <div class="flex flex-col h-full justify-center gap-10 m-1 sm:m-5">
        <Transition name="slide-fade" appear>
            <Country
                v-if="state.country != undefined"
                :country="state.country"
                :flagScore="state.flagScore"
                :capitalScore="state.capitalScore"
            />
        </Transition>
        <button
            @click="goBack"
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 mb-10 bg-white hover:scale-105 rounded-md w-1/2 md:w-1/4 mx-auto"
        >
            {{ $t('back') }}
        </button>
    </div>
</template>

<style scoped>
.slide-fade-enter-active {
    transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(80px);
    opacity: 0;
}
</style>
