<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CarouselAuto from '../components/CarouselAuto.vue';
import Planet from '../components/Planet.vue';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
import ApiService from '../services/apiService';

const countries = ref<CountryI[]>([]);
const store = useStore();
const router = useRouter();
const user: User = ref(store.getters.user);
const planetMouseDown = ref(false);
const currentCountryHovered = ref<CountryI | null>(null);

const handlePlanetMouseDown = () => {
    planetMouseDown.value = true;
};

const handlePlanetMouseUp = () => {
    planetMouseDown.value = false;
};

const navigateToCountry = (country: CountryI) => {
    router.push(`/countries/${country.alpha3Code}`);
};

const scrollTo = (id: string) => {
    const element = document.querySelector(id) as HTMLElement;
    if (element) {
        document.body.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    } else if (id === 'top') {
        document.body.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (id === 'bottom') {
        document.body.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
};

onBeforeMount(async () => {
    try {
        let fetchedCountries = await ApiService.getCountries(8);
        countries.value = fetchedCountries
            .concat(fetchedCountries)
            .concat(fetchedCountries);
    } catch (error) {
        console.log(error);
    }
    document.body.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    document.body.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    const scrollPosition = document.body.scrollTop;
    const scrollHeight = document.body.scrollHeight;
    const windowHeight = window.innerHeight;
    if (scrollPosition + windowHeight >= scrollHeight) {
        scrollTo('#top');
    } else if (scrollPosition === 0) {
        scrollTo('#bottom');
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-screen relative">
        <div class="flex flex-col items-start w-1/2">
            <h1 class="text-6xl text-black mb-4 mt-4">
                {{ $t('welcome') }}
            </h1>
            <p class="text-black text-2xl">
                {{ $t('welcomeMessage') }}
            </p>
        </div>
        <Planet
            class="cursor-grab lg:block hidden"
            @mousedown="handlePlanetMouseDown"
            @mouseup="handlePlanetMouseUp"
            :class="{ 'cursor-grabbing': planetMouseDown }"
        />
        <div class="absolute bottom-52">
            <svg
                class="arrow-icon w-12 h-12 mt-10 animate-bounce cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="scrollTo('#home-description')"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
            </svg>
        </div>
    </div>
    <div
        class="w-full h-screen flex flex-col justify-center items-center relative gap-32"
        id="home-description"
    >
        <div class="flex flex-col justify-start items-start w-1/2">
            <h1 class="text-5xl text-black mt-4">
                Découvrez le monde à travers les capitales et les drapeaux des
                pays.
            </h1>
            <h1 class="text-3xl text-black mb-4 mt-2">
                Apprenez, jouez et devenez un champion de Capitalympics !
            </h1>
        </div>
        <div class="flex flex-row gap-5 items-center justify-center">
            <img src="/home/countries-home.svg" class="w-2/5" />
            <h1 class="text-4xl">Découvrez tous les pays !</h1>
        </div>
        <div class="flex flex-col items-center justify-center">
            <CarouselAuto v-if="countries.length > 0">
                <template v-for="country in countries" :key="country.name">
                    <img
                        :src="country.flag"
                        class="carousel-item cursor-pointer"
                        @click="navigateToCountry(country)"
                        @mouseover="currentCountryHovered = country"
                        @mouseleave="currentCountryHovered = null"
                    />
                </template>
            </CarouselAuto>
            <h1 class="text-3xl text-black mb-4 mt-4 h-16">
                {{ currentCountryHovered ? currentCountryHovered.name : '' }}
                <h1 class="text-xl" v-if="currentCountryHovered">
                    {{ currentCountryHovered.capital }}
                </h1>
            </h1>
        </div>

        <div class="absolute bottom-10">
            <svg
                class="arrow-icon w-12 h-12 mt-10 animate-bounce cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="scrollTo('#home-buttons')"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
            </svg>
        </div>
    </div>
    <div
        class="w-full h-screen flex flex-col justify-center items-center gap-20 relative"
        id="home-buttons"
    >
        <div class="flex flex-col justify-start w-1/2">
            <h1 class="text-5xl text-black mt-4">
                Essayez Capitalympics gratuitement dès maintenant !
            </h1>
            <h1 class="text-3xl text-black mb-4 mt-2">
                Prêt à explorer le monde ? Inscrivez-vous dès maintenant et
                commencez votre aventure avec Capitalympics !
            </h1>
        </div>
        <h1 class="text-center text-5xl">Prêt ?</h1>
        <div class="w-3/4 flex flex-row bg-gradient rounded-lg">
            <div
                class="w-1/2 flex flex-row justify-center items-center p-10 gap-10"
            >
                <img src="/home/login-home.svg" class="w-1/3" />
                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-xl">
                        Connectez-vous pour commencer à vous entrainez !
                    </p>
                    <RouterLink
                        class="bg-white text-black text-4xl text-center p-6 hover:bg-gray-200 rounded-lg shadow-md transition-all"
                        to="/login"
                    >
                        Se connecter
                    </RouterLink>
                </div>
            </div>
            <div
                class="w-1/2 p-10 flex flex-row justify-center items-center gap-5"
            >
                <img src="/home/register-home.svg" class="w-1/3" />

                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-xl">
                        Rejoignez nous dès maintenant !
                    </p>
                    <RouterLink
                        class="bg-white text-black text-4xl text-center p-6 hover:bg-gray-200 rounded-lg shadow-md transition-all"
                        to="/signup"
                    >
                        S'inscrire
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="absolute bottom-10 rotate-180">
            <svg
                class="arrow-icon w-12 h-12 mt-10 animate-bounce cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                @click="scrollTo('top')"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                ></path>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.carousel-item {
    filter: grayscale(60%);
    transition: all 0.25s ease-in-out;
}
.carousel-item:hover {
    filter: grayscale(0%);
    animation-play-state: paused;
}
</style>
