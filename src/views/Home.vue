<script setup lang="ts">
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import CarouselAuto from '../components/CarouselAuto.vue';
import Loader from '../components/Loader.vue';
import Planet from '../components/Planet.vue';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
import ApiService from '../services/apiService';
import { getLanguage } from '../utils/common';

const countries = ref<CountryI[]>([]);
const store = useStore();
const router = useRouter();
const user: User = ref(store.getters.user);
const planetMouseDown = ref(false);
const currentCountryHovered = ref<CountryI | null>(null);
const planetLoaded = ref(false);
const imageScale = ref(1);
const previousScrollTop = ref(0);

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
        imageScale.value = 1;
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
    let lang = getLanguage();
    try {
        let fetchedCountries = await ApiService.getCountries(8, lang);
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
    const scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;
    const scrollDelta = scrollPosition - previousScrollTop.value;
    previousScrollTop.value = scrollPosition;

    let isDeviceMobile = window.innerWidth < 768;
    let scaling = 0.008;
    if (isDeviceMobile) {
        scaling = 0.02;
    }

    if (scrollDelta > 0) {
        // Scrolling down, zoom in
        imageScale.value += scaling;
        if (imageScale.value > 2.5) {
            imageScale.value = 2.5;
        }
    } else {
        // Scrolling up, zoom out
        imageScale.value -= scaling / 2;
        if (imageScale.value < 1) {
            imageScale.value = 1;
        }
    }

    if (scrollPosition == 0) {
        imageScale.value = 1;
    }
};
</script>

<template>
    <BlurContainer v-if="!planetLoaded">
        <Loader />
    </BlurContainer>
    <div
        class="flex flex-col items-center justify-center h-full sm:h-screen gap-10"
    >
        <div class="flex flex-col items-start w-11/12 md:w-5/6 lg:w-1/2">
            <h1 class="text-4xl sm:text-6xl text-black mb-4 mt-4">
                {{ $t('welcome') }}
            </h1>
            <p class="text-black text-xl sm:text-2xl">
                {{ $t('welcomeMessage') }}
            </p>
        </div>
        <Planet
            class="cursor-grab hidden 2xl:block"
            @mousedown="handlePlanetMouseDown"
            @mouseup="handlePlanetMouseUp"
            :class="{ 'cursor-grabbing': planetMouseDown }"
            @finishedLoading="planetLoaded = true"
        />
        <div class="relative w-full mt-20 -z-10 2xl:hidden">
            <img
                src="/home/landing.jpg"
                alt="Photo of Ryan Kim on Unsplash"
                class="w-full h-[35rem] sm:h-[26rem] object-cover transition-all duration-100 ease-linear"
                :style="{ transform: `scale(${imageScale})` }"
            />
        </div>
        <div class="flex justify-center items-center">
            <svg
                class="arrow-icon w-12 h-12 animate-bounce cursor-pointer"
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
        class="w-full h-auto sm:h-screen flex flex-col justify-center items-center gap-16"
        id="home-description"
    >
        <div class="flex flex-col justify-start items-start w-3/4 lg:w-1/2">
            <h1 class="text-3xl sm:text-5xl text-white sm:text-black mt-4">
                Découvrez le monde à travers les capitales et les drapeaux des
                pays.
            </h1>
            <h1 class="text-xl sm:text-3xl text-white sm:text-black mb-4 mt-2">
                Apprenez, jouez et devenez un champion de Capitalympics !
            </h1>
        </div>
        <div
            class="flex flex-col sm:flex-row gap-10 sm:gap-5 items-center justify-center"
        >
            <img
                src="/home/countries-home.svg"
                class="w-2/3 sm:w-2/5 lg:w-1/2 -z-10 scale-110"
            />
            <h1 class="text-2xl sm:text-4xl text-center">
                Découvrez tous les pays !
            </h1>
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
            <h1 class="text-3xl text-black mb-4 mt-4 h-10">
                {{ currentCountryHovered ? currentCountryHovered.name : '' }}
                <h1 class="text-xl" v-if="currentCountryHovered">
                    {{ currentCountryHovered.capital }}
                </h1>
            </h1>
            <div class="flex justify-center items-center">
                <svg
                    class="arrow-icon w-12 h-12 mb-10 mt-10 animate-bounce cursor-pointer"
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
    </div>
    <div
        class="w-full h-full sm:h-screen flex flex-col justify-center items-center gap-10 lg:gap-20"
        id="home-buttons"
    >
        <div class="flex flex-col justify-start w-3/4 lg:w-1/2">
            <h1 class="text-3xl sm:text-5xl text-black mt-4">
                Essayez Capitalympics gratuitement dès maintenant !
            </h1>
            <h1 class="text-xl sm:text-3xl text-black mb-4 mt-2">
                Inscrivez-vous dès maintenant et commencez votre aventure avec
                Capitalympics !
            </h1>
        </div>
        <h1 class="text-center text-5xl">Prêt ?</h1>
        <div
            class="w-4/5 lg:w-3/4 flex flex-col lg:flex-row lg:[bg-gradient] rounded-lg gap-10"
        >
            <div
                class="w-full lg:w-1/2 flex flex-row justify-center items-center lg:p-10 gap-3 sm:gap-10"
            >
                <img src="/home/login-home.svg" class="w-1/2" />
                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-lg sm:text-xl">
                        Connectez-vous pour commencer à vous entrainez !
                    </p>
                    <RouterLink
                        class="bg-white text-black text-2xl sm:text-4xl text-center p-3 xl:p-6 hover:bg-gray-200 rounded-lg shadow-md transition-all hover:scale-95 ease-in-out duration-300"
                        to="/login"
                    >
                        Connexion
                    </RouterLink>
                </div>
            </div>
            <div
                class="w-full lg:w-1/2 lg:p-10 flex flex-row justify-center items-center gap-3 sm:gap-10"
            >
                <img src="/home/register-home.svg" class="w-1/2" />

                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-lg sm:text-xl">
                        Rejoignez nous dès maintenant !
                    </p>
                    <RouterLink
                        class="bg-white text-black text-2xl sm:text-4xl text-center p-3 xl:p-6 hover:bg-gray-200 rounded-lg shadow-md transition-all hover:scale-95 ease-in-out duration-300"
                        to="/signup"
                    >
                        Inscription
                    </RouterLink>
                </div>
            </div>
        </div>
        <div class="flex justify-center items-center rotate-180 mb-10">
            <svg
                class="arrow-icon w-12 h-12 animate-bounce cursor-pointer"
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
    filter: grayscale(100%);
    transition: all 0.25s ease-in-out;
}
.carousel-item:hover {
    transform: scale(0.96);
    filter: grayscale(0%);
    animation-play-state: paused;
}

@media (max-width: 640px) {
    .carousel-item {
        filter: grayscale(0%);
    }
}
</style>
