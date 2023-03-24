<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import Country from '../components/Country.vue';
import EmptyCountry from '../components/EmptyCountry.vue';
import { CountryI } from '../models/Country';
import ApiService from '../services/apiService';
interface State {
    country: CountryI | undefined;
    isLoading: boolean;
}

const state: State = reactive({
    country: undefined,
    isLoading: true
});

const props = defineProps({
    countryCode: {
        type: String,
        required: true
    }
});

onBeforeMount(async () => {
    state.country = await ApiService.getCountry(props.countryCode);
    state.isLoading = false;
});
</script>

<template>
    <div
        v-if="state.isLoading"
        class="flex justify-center items-center h-full w-full"
    >
        <EmptyCountry />
    </div>
    <Transition name="slide-fade" appear>
        <Country v-if="state.country != undefined" :country="state.country" />
    </Transition>
    <RouterLink
        to="/countries"
        class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/4 mx-auto"
    >
        Back
    </RouterLink>
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
