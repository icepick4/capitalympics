<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Level, User, UserScore } from '../models/User';
import ApiService from '../services/apiService';
import { getLevelName } from '../utils/common';
import BlurContainer from './BlurContainer.vue';
import Loader from './Loader.vue';

const store = useStore();
const router = useRouter();
interface CountryDetails {
    name: string;
    alpha3Code: string;
    flag: string;
    level: Level;
}

const hasLoggedOut = ref(false);
const logOut = () => {
    hasLoggedOut.value = true;
    setTimeout(() => {
        store.dispatch('logOut');
        hasLoggedOut.value = false;
        router.push('/');
    }, 500);
};

const token = store.getters.token;
const user: User = store.getters.user;
const countries = ref<CountryDetails[]>([]);

const getBestScores = async (user_id: number): Promise<UserScore[]> => {
    const response = await ApiService.getBestScores(user_id, token, 3);
    let scores: UserScore[] = [];
    if (response) {
        scores = response;
    }
    scores.forEach((element) => {
        let countryDetails: CountryDetails = {
            name: '',
            flag: '',
            alpha3Code: element.country_code,
            level: element.level
        };
        getCountryDetails(element.country_code).then(({ name, flag }) => {
            countryDetails.name = name;
            countryDetails.flag = flag;
            countries.value.push(countryDetails);
        });
    });
    return scores;
};

const getCountryDetails = async (
    country_code: string
): Promise<{ name: string; flag: string }> => {
    const response = await ApiService.getCountry(country_code);
    if (response) {
        let country = response;
        return {
            name: country.name,
            flag: country.flag
        };
    } else {
        return {
            name: 'Unknown',
            flag: 'assets/flags/unknown.png'
        };
    }
};

const isDateNow = (date: Date) => {
    const now = new Date();
    // 10 minutes max
    return now.getTime() - date.getTime() < 600000;
};

const formatDate = (date: Date) => {
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = parseInt(`0${minutes}`);
    }
    if (isDateNow(date)) {
        return `Now`;
    }
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `;
};

getBestScores(12);
</script>

<template>
    <BlurContainer v-if="hasLoggedOut">
        <Loader :title="$t('loggingOut')" />
    </BlurContainer>
    <div class="container mx-auto p-8">
        <!-- Informations de l'utilisateur -->
        <div class="bg-gradient rounded-lg shadow-lg p-6 mb-8">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <img
                        src="public/icons/default_profile.png"
                        alt="User Avatar"
                        class="w-16 h-16 rounded-full mr-4"
                    />
                    <h1 class="text-2xl mr-1 font-bold">{{ user.name }}</h1>
                </div>
                <div class="flex items-center gap-4">
                    <RouterLink to="/profile/edit">
                        <img
                            src="/icons/settings.png"
                            alt="Edit account"
                            class="w-8 h-8 ml-2 cursor-pointer hover:rotate-180 transition-all duration-500"
                        />
                    </RouterLink>
                    <img
                        src="/icons/logout.png"
                        alt="Logout"
                        class="w-8 h-8 ml-auto cursor-pointer hover:scale-110 transition-all"
                        @click="logOut"
                    />
                </div>
            </div>
            <p class="text-black mb-2">
                {{ getLevelName(user.level) }}
            </p>
            <p class="text-black mb-2">
                {{ $t('lastActivity') }} :
                {{ formatDate(new Date(user.last_activity)) }}
            </p>
            <p class="text-black">
                {{ $t('joined') }} : {{ formatDate(new Date(user.created_at)) }}
            </p>
        </div>

        <!-- Scores de pays -->
        <div class="bg-gradient rounded-lg shadow-lg p-6">
            <h2 class="text-xl font-bold mb-4">{{ $t('topScores') }}</h2>
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <RouterLink
                    v-for="country in countries"
                    :key="country.name"
                    class="bg-white rounded-lg shadow-md p-4 hover:bg-gray-200 transition-colors duration-300 fade-up"
                    :to="`/countries/${country.alpha3Code}`"
                >
                    <div class="flex items-center mb-2">
                        <img
                            :src="country.flag"
                            alt="Country Flag"
                            class="w-6 h-4 mr-2"
                        />
                        <h3 class="font-bold">{{ country.name }}</h3>
                    </div>
                    <p class="text-black">
                        {{ getLevelName(country.level) }}
                    </p>
                </RouterLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
@keyframes rotate {
    from {
        transform: rotate(-360deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
