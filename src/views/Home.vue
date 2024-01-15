<script setup lang="ts">
import BuyMeACoffee from '@/components/BuyMeACoffee.vue';
import CTAButton from '@/components/CTAButton.vue';
import CarouselAuto from '@/components/CarouselAuto.vue';
import Loader from '@/components/Loader.vue';
import Planet from '@/components/Planet.vue';
import { CountryI } from '@/models/Country';
import { User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { getLanguage } from '@/utils/common';
import { IconCircleCheckFilled } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, computed, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const countries = ref<CountryI[]>([]);
const router = useRouter();
const planetMouseDown = ref(false);
const currentCountryHovered = ref<CountryI | null>(null);
const planetLoaded = ref(false);
const displayPlanet = ref(window.innerWidth > 1536);
const isDeviceMobile = ref(window.innerWidth < 500);
const finishedWaited = ref(false);
const noCountriesFound = ref(false);
const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const { t } = useI18n();
const route = useRoute();
const query = computed(() => route.query);

if (query.value.loggedOut) {
    notify({
        title: t('success'),
        message: t('loggedOutSuccessfully'),
        type: 'success'
    });
} else if (query.value.deletedAccount) {
    notify({
        title: t('success'),
        message: t('accountDeleted'),
        type: 'success'
    });
} else if (query.value.failedToLoadCurrentUser) {
    notify({
        title: t('error'),
        message: t('failedToLoadCurrentUser'),
        type: 'error'
    });
}

const handlePlanetMouseDown = () => {
    planetMouseDown.value = true;
};

const handlePlanetMouseUp = () => {
    planetMouseDown.value = false;
};

const navigateToCountry = (country: CountryI) => {
    router.push(`/countries/${country.code}`);
};

const scrollTo = (id: string) => {
    const element = document.querySelector(id) as HTMLElement;
    if (element) {
        window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
        });
    } else if (id === 'top') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (id === 'bottom') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
};

onBeforeMount(async () => {
    let lang = getLanguage();
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
    });
    try {
        let fetchedCountries = await ApiService.getCountries(8, lang);
        countries.value = fetchedCountries
            .concat(fetchedCountries)
            .concat(fetchedCountries);
        finishedWaited.value = true;
    } catch (error) {
        console.log(error);
        finishedWaited.value = true;
        noCountriesFound.value = true;
    }
});
</script>

<template>
    <Loader
        v-if="!finishedWaited || (!planetLoaded && displayPlanet)"
        :title="$t('loading')"
    />
    <Dialog
        v-model="noCountriesFound"
        :title="$t('noCountriesFound')"
        :description="$t('checkNetworkConnection')"
        :buttonDescription="$t('close')"
        type="error"
    />
    <div
        class="flex flex-col 2xl:flex-row items-center justify-center h-full gap-5 mt-3 lg:mt-10 xs:mb-20"
    >
        <div class="w-1/3"></div>
        <div class="flex flex-col items-center w-1/3">
            <section>
                <div
                    class="flex w-full flex-col items-center py-10 text-center md:py-24"
                >
                    <h2
                        class="mb-6 flex-col text-4xl font-bold md:mb-10 md:text-5xl lg:mb-12"
                    >
                        {{ $t('welcome') }}
                        <span v-if="user" class="underline"
                            >{{ user.name }}!</span
                        >
                    </h2>
                    <div class="mx-auto">
                        <ul
                            class="mb-6 flex flex-col flex-nowrap gap-3 md:mb-10 md:flex-row lg:mb-12"
                        >
                            <li
                                class="ml-2 mr-2 flex flex-row items-start justify-start md:mx-4"
                            >
                                <IconCircleCheckFilled
                                    class="text-blue-500 mr-2 inline-block h-8 w-8"
                                />
                                <p class="text-start">{{ $t('homeCTA.1') }}</p>
                            </li>
                            <li
                                class="ml-2 mr-2 flex flex-row items-start justify-start md:mx-4"
                            >
                                <IconCircleCheckFilled
                                    class="text-blue-500 mr-2 inline-block h-8 w-8"
                                />
                                <p class="text-start">{{ $t('homeCTA.2') }}</p>
                            </li>
                            <li
                                class="ml-2 mr-2 flex flex-row items-start justify-start md:mx-4"
                            >
                                <IconCircleCheckFilled
                                    class="text-blue-500 mr-2 inline-block h-8 w-8"
                                />
                                <p class="text-start">{{ $t('homeCTA.3') }}</p>
                            </li>
                        </ul>
                    </div>
                    <h3
                        class="mb-6 flex-col text-lg font-bold md:mb-10 md:text-2xl lg:mb-12 max-w-[600px]"
                    >
                        {{ $t('welcomeMessage') }}
                    </h3>
                    <div class="flex flex-row gap-6">
                        <CTAButton
                            to="/learn"
                            :text="$t('play')"
                            color="bluebg"
                            textColor="white"
                        />
                        <CTAButton
                            v-if="user != null"
                            to="/profile/scores"
                            :text="$t('seeScores')"
                        />
                    </div>
                    <p>{{ $t('noCreditCard') }}</p>
                </div>
            </section>
        </div>
        <Planet
            v-if="displayPlanet"
            class="cursor-grab"
            @mousedown="handlePlanetMouseDown"
            @mouseup="handlePlanetMouseUp"
            :class="{ 'cursor-grabbing': planetMouseDown }"
            @finishedLoading="planetLoaded = true"
        />
        <div v-else class="relative w-full mt-14 -z-10">
            <img
                :src="
                    isDeviceMobile
                        ? '/home/landing-phone.jpg'
                        : '/home/landing.jpg'
                "
                :alt="
                    isDeviceMobile
                        ? 'Photo of Thomas Kelley on Unsplash'
                        : 'Photo of Ryan Kim on Unsplash'
                "
                class="w-fit h-[26rem] object-cover transition-all duration-100 ease-linear brightness-75 xs:brightness-100 overflow-hidden"
            />
        </div>
    </div>
    <div
        class="flex justify-center items-center invert xxl:filter-none -translate-y-40 xs:-translate-y-20 xxl:translate-y-0"
    >
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

    <div
        class="w-full h-full flex flex-col justify-center items-center gap-16 mb-20"
        id="home-description"
        :class="{ 'mt-40': !isDeviceMobile }"
    >
        <div
            class="flex flex-col justify-start items-start w-11/12 lg:w-1/2 mt-5"
        >
            <h1
                class="text-3xl mt-4"
                :class="{
                    'xs:text-5xl': !isDeviceMobile
                }"
            >
                {{ $t('homeTitle1') }}
            </h1>
            <h1
                class="text-xl mb-4 mt-2"
                :class="{
                    'xs:text-3xl': !isDeviceMobile
                }"
            >
                {{ $t('homeDescription1') }}
            </h1>
        </div>
        <div
            class="flex flex-col sm:flex-row gap-10 sm:gap-5 items-center justify-center"
        >
            <img
                src="/home/countries-home.svg"
                class="w-2/3 sm:w-2/5 lg:w-1/2 -z-10 scale-110"
                alt="Countries"
            />
            <h1 class="text-2xl sm:text-4xl text-center">
                {{ $t('discoverCountries') }}
            </h1>
        </div>
        <div class="flex flex-col items-center justify-center">
            <CarouselAuto v-if="countries.length > 1 || !noCountriesFound">
                <template v-for="country in countries" :key="country.name">
                    <img
                        :src="country.flag"
                        :alt="country.name"
                        class="carousel-item cursor-pointer w-auto h-auto"
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
            <div v-if="user == null" class="flex justify-center items-center">
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
        v-if="user == null"
        class="w-full h-full flex flex-col justify-center items-center gap-10 lg:gap-20 mt-20 mb-20"
        id="home-buttons"
    >
        <div class="flex flex-col justify-start w-3/4 lg:w-1/2">
            <h1 class="text-3xl sm:text-5xl text-black mt-4">
                {{ $t('homeTitle2') }}
            </h1>
            <h1 class="text-xl sm:text-3xl text-black mb-4 mt-2">
                {{ $t('homeDescription2') }}
            </h1>
        </div>
        <h1 class="text-center text-5xl">{{ $t('ready?') }}</h1>
        <div
            class="w-11/12 lg:w-3/4 flex flex-col lg:flex-row lg:[bg-gradient] rounded-lg gap-10"
        >
            <div
                class="w-full lg:w-1/2 flex flex-row justify-center items-center lg:p-10 gap-3 sm:gap-10"
            >
                <img
                    src="/home/login-home.svg"
                    class="hidden sm:block w-1/2"
                    alt="Login home image"
                />
                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-lg sm:text-xl">
                        {{ $t('loginToStart') }}
                    </p>
                    <CTAButton to="/login" :text="$t('login')" />
                </div>
            </div>
            <div
                class="w-full lg:w-1/2 lg:p-10 flex flex-row justify-center items-center gap-3 sm:gap-10"
            >
                <img
                    src="/home/register-home.svg"
                    class="hidden sm:block w-1/2"
                    alt="Register home image"
                />

                <div class="flex flex-col gap-5 items-center justify-center">
                    <p class="text-center text-lg sm:text-xl">
                        {{ $t('joinUs') }}
                    </p>
                    <CTAButton
                        to="/signup"
                        :text="$t('signup')"
                        color="white"
                        textColor="black"
                    />
                </div>
            </div>
        </div>
    </div>
    <div class="w-full flex flex-col justify-center items-center gap-10">
        <div class="w-1/3 bg-black h-[1px]"></div>
        <div
            class="w-full sm:w-2/3 lg:1/3 xl:w-2/3 2xl:w-2/5 lg:p-10 flex md:flex-row flex-col-reverse justify-center items-center gap-10 p-4"
        >
            <div
                class="flex flex-col gap-5 items-start justify-center w-5/6 md:w-1/2"
            >
                <h1 class="text-center text-xl font-bold">
                    {{ $t('aboutMe') }}
                </h1>
                <p class="text-left text-lg">{{ $t('passionateDev') }}</p>
                <BuyMeACoffee />
            </div>
            <a
                href="https://www.buymeacoffee.com/remijara"
                class="w-3/4 md:w-1/2"
            >
                <img
                    src="/home/me.jpg"
                    class="object-cover rounded-full cursor-pointer hover:scale-105 transition-all duration-100 ease-linear"
                    :alt="$t('aboutMe.imageAlt')"
                />
            </a>
        </div>
    </div>
    <div class="flex justify-center items-center rotate-180 mt-16 mb-16">
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
</template>

<style scoped>
.carousel-item {
    filter: grayscale(100%);
    transition: all 0.25s ease-in-out;
}

.carousel-item:hover {
    transform: scale(0.96);
    filter: grayscale(0%);
}

@media (max-width: 640px) {
    .carousel-item {
        filter: grayscale(0%);
    }
}
</style>
