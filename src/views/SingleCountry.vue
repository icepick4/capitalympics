<script setup lang="ts">
import BlurContainer from '@/components/BlurContainer.vue';
import Country from '@/components/Country/Country.vue';
import Loader from '@/components/Loader.vue';
import { CountryI } from '@/models/Country';
import ApiService from '@/services/apiService';
import { getLanguage } from '@/utils/common';
import { onBeforeMount, reactive } from 'vue';

interface State {
    country: CountryI | undefined;
    isLoading: boolean;
}

const state: State = reactive({
    country: undefined,
    isLoading: true
});

const props = defineProps<{
    countryCode: string;
}>();

onBeforeMount(async () => {
    let lang = getLanguage();
    try {
        state.country = await ApiService.getCountry(props.countryCode, lang);
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
    <BlurContainer v-if="state.isLoading">
        <Loader :title="$t('loading') + countryCode" />
    </BlurContainer>
    <div class="flex flex-col gap-5 m-1 sm:m-5">
        <Transition name="slide-fade" appear>
            <Country
                v-if="state.country != undefined"
                :country="state.country"
            />
        </Transition>
        <button
            @click="goBack"
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-gradient hover:scale-105 rounded-md w-1/2 md:w-1/4 mx-auto"
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
