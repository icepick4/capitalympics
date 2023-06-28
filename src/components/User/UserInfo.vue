<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { Level, User, UserScore } from '../../models/User';
import ApiService from '../../services/apiService';
import { LearningType, Sort } from '../../types/common';
import { getLevelName } from '../../utils/common';
import BlurContainer from '../BlurContainer.vue';
import Loader from '../Loader.vue';
import ScoresDisplay from './ScoresDisplay.vue';
const store = useStore();
const router = useRouter();
export interface CountryDetails {
    name: string;
    alpha3Code: string;
    flag: string;
    level: Level;
}

defineEmits(['close']);

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
const bestCountries = ref<CountryDetails[]>([]);
const worstCountries = ref<CountryDetails[]>([]);
const learningType = ref<LearningType>('flag');
const getScores = async (
    user_id: number,
    sort: Sort,
    scoreType: LearningType
): Promise<UserScore[]> => {
    try {
        const response = await ApiService.getScores(
            user_id,
            token,
            3,
            sort,
            scoreType
        );
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
                if (sort === 'DESC') {
                    bestCountries.value.push(countryDetails);
                } else {
                    worstCountries.value.push(countryDetails);
                }
            });
        });
        return scores;
    } catch (error) {
        return [];
    }
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

const getCurrentLanguage = () => {
    return user.language;
};

const isDateNow = (date: Date) => {
    const now = new Date();
    // 10 minutes max
    return now.getTime() - date.getTime() < 600000;
};

const isDateToday = (date: Date) => {
    const now = new Date();
    return (
        now.getDate() === date.getDate() &&
        now.getMonth() === date.getMonth() &&
        now.getFullYear() === date.getFullYear()
    );
};

const formatDate = (date: Date) => {
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = parseInt(`0${minutes}`);
    }
    if (isDateNow(date)) {
        switch (getCurrentLanguage()) {
            case 'fr':
                return 'Maintenant';
            case 'en':
                return 'Now';
            case 'es':
                return 'Ahora';
            default:
                return 'Now';
        }
    } else if (isDateToday(date)) {
        switch (getCurrentLanguage()) {
            case 'fr':
                return "Aujourd'hui";
            case 'en':
                return 'Today';
            case 'es':
                return 'Hoy';
        }
    }
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()} `;
};

const switchLearningType = () => {
    if (learningType.value === 'flag') {
        learningType.value = 'capital';
    } else {
        learningType.value = 'flag';
    }
    updateScores();
};

const updateScores = () => {
    bestCountries.value = [];
    worstCountries.value = [];
    getScores(user.id, 'DESC', learningType.value);
    getScores(user.id, 'ASC', learningType.value);
};

onMounted(() => {
    updateScores();
});
</script>

<template>
    <BlurContainer v-if="hasLoggedOut">
        <Loader :title="$t('loggingOut')" />
    </BlurContainer>
    <div class="container mx-auto p-8">
        <!-- Informations de l'utilisateur -->
        <div class="bg-gradient rounded-lg shadow-lg p-6 mb-4">
            <div class="flex items-center justify-between mb-4">
                <div class="flex items-center">
                    <img
                        src="/icons/default_profile.png"
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
                            @click="$emit('close')"
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
                {{ $t('lastActivity') }} :
                {{ formatDate(new Date(user.last_activity)) }}
            </p>
            <p class="text-black">
                {{ $t('joined') }} : {{ formatDate(new Date(user.created_at)) }}
            </p>
        </div>
        <div class="w-full flex justify-center items-center">
            <h1 class="text-4xl font-bold text-center mb-4">
                <div
                    v-if="learningType === 'flag'"
                    class="flex flex-row gap-10"
                >
                    <p>
                        {{ $t('flags') }}
                    </p>
                    <p>
                        {{ getLevelName(user.flag_level) }}
                    </p>
                </div>
                <div v-else class="flex flex-row gap-10">
                    <p>
                        {{ $t('capitals') }}
                    </p>
                    <p>
                        {{ getLevelName(user.capital_level) }}
                    </p>
                </div>
            </h1>
        </div>
        <div class="flex flex-col gap-4 mb-5">
            <ScoresDisplay
                :countries="bestCountries"
                :title="$t('topScores')"
            ></ScoresDisplay>
            <ScoresDisplay
                :countries="worstCountries"
                :title="$t('worstScores')"
            ></ScoresDisplay>
        </div>
        <div class="w-full flex justify-center items-center">
            <button
                @click="switchLearningType"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-gradient rounded-md w-1/4 hover:scale-105"
            >
                <p v-if="learningType === 'flag'">
                    {{ $t('seeCapitals') }}
                </p>
                <p v-else>
                    {{ $t('seeFlags') }}
                </p>
            </button>
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
