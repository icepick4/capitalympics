<script setup lang="ts">
import { onBeforeMount, reactive } from 'vue';
import { RouterLink } from 'vue-router';
import BlurContainer from '../components/BlurContainer.vue';
import Country from '../components/Country/Country.vue';
import Loader from '../components/Loader.vue';
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

const props = defineProps<{
    countryCode: string;
}>();

onBeforeMount(async () => {
    try {
        state.country = await ApiService.getCountry(props.countryCode);
        state.isLoading = false;
    } catch (error) {
        state.isLoading = false;
    }
});
</script>

<template>
    <BlurContainer v-if="state.isLoading">
        <Loader :title="`Loading ${countryCode}`" />
    </BlurContainer>
    <div class="flex flex-col gap-5 m-5">
        <Transition name="slide-fade" appear>
            <Country
                v-if="state.country != undefined"
                :country="state.country"
            />
        </Transition>
        <RouterLink
            to="/countries"
            class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-gradient scale-[1.01] hover:scale-105 rounded-md w-1/2 md:w-1/4 mx-auto"
        >
            {{ $t('back') }}
        </RouterLink>
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
