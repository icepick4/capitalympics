<script lang="ts">
import axios from 'axios';
import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';
import Country from '../components/Country.vue';
import { CountryI } from '../models/Country';
interface State {
    country: CountryI | undefined;
}

export default defineComponent({
    name: 'SingleCountry',
    components: { Country },
    inheritAttrs: false,
    data() {
        return {
            state: {
                country: undefined
            } as State
        };
    },
    created() {
        const countryCode = this.$route.params.countryCode;
        axios
            .get(`http://localhost:3000/countries/${countryCode}`)
            .then((response) => {
                this.state.country = response.data.country as CountryI;
            })
            .catch((error) => {
                console.log(error);
            });
    }
});
</script>

<template>
    <Transition name="slide-fade" appear>
        <Country v-if="state.country != undefined" :country="state.country" />
    </Transition>
    <RouterLink
        :to="{ name: 'Countries' }"
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
