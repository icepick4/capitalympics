<script setup lang="ts">
import { User } from '@/models/User';
import { useStore } from '@/store';
import { CountryDetails, LearningType, Region, Sort } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { getLevelName } from '@/utils/common';
import { storeToRefs } from 'pinia';
import { Ref, computed, onMounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import Badge from '../Badge.vue';
import BlurContainer from '../BlurContainer.vue';
import Modal from '../Modal.vue';
import Regions from '../Regions.vue';
import ScoresDisplay from './ScoresDisplay.vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

defineEmits(['close']);

const confirmingLogOut = ref(false);

const logOutConfirmation = () => {
    confirmingLogOut.value = true;
};

const countries = ref<CountryDetails[]>([]);
const learningType = ref<LearningType>('flag');
const currentMax = ref(3);
const clickedSwitchLearningType = ref(false);
const currentSort = ref<Sort>('DESC');
const isMax = ref(false);
const countriesLength = ref(0);
const region = ref<Region>('World');
const lastRegion = ref<Region>('World');
const flagScore = computed(() => getLevelName(user.value.flag_score));
const capitalScore = computed(() => getLevelName(user.value.capital_score));

const increaseMax = () => {
    if (isMax.value) {
        return;
    }
    currentMax.value += 3;
};

const decreaseMax = () => {
    currentMax.value -= 3;
    if (currentMax.value < 3) {
        currentMax.value = 3;
    }
    isMax.value = false;
};

const resetMax = () => {
    currentMax.value = 3;
    isMax.value = false;
};

const switchSort = () => {
    currentSort.value = currentSort.value === 'ASC' ? 'DESC' : 'ASC';
    resetMax();
    countries.value = countries.value.reverse();
};

async function loadScores() {
    const queryParams = {
        sort: currentSort.value,
        region: region.value,
        lang: user.value.language
    };

    const response = await ApiClient.get<{ scores: CountryDetails[] }>(
        `/users/${user.value.id}/${learningType.value}/scores`,
        queryParams
    );
    if (!response.success) {
        console.log(response.error);
        return;
    }

    const scores = response.data.scores;
    countriesLength.value = scores.length;
    isMax.value = scores.length < currentMax.value;

    countries.value = scores.map((score) => {
        return {
            name: score.name,
            flag: score.flag,
            alpha3Code: score.alpha3Code,
            score: score.score,
            region: score.region
        };
    });

    if (lastRegion.value !== region.value) {
        countries.value = [];
    }

    lastRegion.value = region.value;
}

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
        switch (user.value.language) {
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
        switch (user.value.language) {
            case 'fr':
                return "Aujourd'hui";
            case 'en':
                return 'Today';
            case 'es':
                return 'Hoy';
        }
    }
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} `;
};

const switchLearningType = () => {
    clickedSwitchLearningType.value = !clickedSwitchLearningType.value;
    learningType.value = learningType.value === 'flag' ? 'capital' : 'flag';
    countries.value = [];
    resetMax();
    loadScores();
};

onMounted(() => loadScores());

const filteredCountries = computed(() => {
    if (region.value === 'World') {
        return countries.value.slice(0, currentMax.value);
    }
    return countries.value
        .filter((country: CountryDetails) => {
            return country.region
                .toLowerCase()
                .includes(region.value.toLowerCase());
        })
        .slice(0, currentMax.value);
});

const scoreValues: number[] = [-1, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
</script>

<template>
    <BlurContainer v-if="confirmingLogOut">
        <Modal
            :title="$t('logOutConfirmation')"
            :message="$t('loginPageRedirect')"
            background-color="white"
            title-color="black"
            :confirmationDialog="true"
            @confirm="() => store.logout()"
            @cancel="() => (confirmingLogOut = false)"
        />
    </BlurContainer>
    <div
        class="w-full h-full flex flex-col items-start justify-start mt-10 mb-10"
    >
        <div class="w-full sm:w-full md:w-3/4 2xl:w-7/12 mx-auto p-4 sm:p-8">
            <!-- Informations de l'utilisateur -->
            <div class="bg-gradient rounded-lg shadow-lg p-3 sm:p-6 mb-4">
                <div
                    class="flex column flex-row items-center justify-center mb-4 gap-4"
                >
                    <div class="flex items-center">
                        <img
                            src="/icons/default_profile.png"
                            alt="User Avatar"
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4"
                        />
                        <h1 class="text-2xl mr-1 font-bold">
                            {{ user?.name }}
                        </h1>
                    </div>
                    <div
                        class="flex items-center center justify-end gap-4 w-full"
                    >
                        <RouterLink to="/profile/edit">
                            <img
                                src="/icons/settings.png"
                                alt="Edit account"
                                class="w-8 h-8 cursor-pointer hover:rotate-180 transition-all duration-500"
                                @click="$emit('close')"
                            />
                        </RouterLink>
                        <img
                            src="/icons/logout.png"
                            alt="Logout"
                            class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                            @click="logOutConfirmation"
                        />
                    </div>
                </div>

                <p class="text-black mb-2">
                    {{ $t('lastActivity') }} :
                    {{ formatDate(new Date(user.last_activity)) }}
                </p>
                <p class="text-black">
                    {{ $t('joined') }} :
                    {{ formatDate(new Date(user.created_at)) }}
                </p>
            </div>
            <div
                class="w-full flex flex-col md:flex-row justify-between items-center gap-3 mb-4"
            >
                <div class="flex flex-row gap-5">
                    <h1 class="text-xl md:text-4xl font-bold text-center">
                        <template v-if="learningType === 'flag'">
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-row items-start gap-2">
                                    <p>{{ $t('mode') }} :</p>
                                    <p class="font-normal">{{ $t('flags') }}</p>
                                </div>
                                <div class="flex flex-row gap-2">
                                    <p>{{ $t('level') }} :</p>
                                    <p class="font-normal">{{ flagScore }}</p>
                                </div>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex flex-col gap-5">
                                <div class="flex flex-row gap-2">
                                    <p>{{ $t('mode') }} :</p>
                                    <p class="font-normal">
                                        {{ $t('capitals') }}
                                    </p>
                                </div>
                                <div class="flex flex-row gap-2">
                                    <p>{{ $t('level') }} :</p>
                                    <p class="font-normal">
                                        {{ capitalScore }}
                                    </p>
                                </div>
                            </div>
                        </template>
                    </h1>
                </div>
                <div class="flex flex-row gap-5 justify-center items-center">
                    <Regions
                        v-model="region"
                        class="sm:mr-10 items-center"
                        @change="loadScores"
                    />
                    <div
                        class="flex flex-col gap-2 justify-center items-center"
                    >
                        <button
                            @click="switchLearningType"
                            class="rounded-full bg-white hover:scale-110 transition-all duration-300"
                            :class="{
                                '-rotate-180': clickedSwitchLearningType
                            }"
                        >
                            <img
                                src="/icons/switch.png"
                                alt="switch"
                                class="w-10 h-10"
                            />
                        </button>
                        <span class="text-center text-sm">
                            {{ $t('switch') }}
                        </span>
                    </div>
                    <div
                        class="flex flex-col gap-2 justify-center items-center"
                    >
                        {{ countriesLength }}
                        {{ countries.length }}
                        <button
                            @click="switchSort"
                            class="rounded-full bg-white hover:scale-110 transition-all duration-300"
                            :disabled="countriesLength != countries.length"
                        >
                            <img
                                :src="`/icons/sort_${currentSort}.png`"
                                alt="sort"
                                class="w-10 h-10 rounded-full bg-white hover:scale-110 transition-all duration-300"
                            />
                        </button>
                        <span class="text-center text-sm">
                            {{ $t('sort') }}
                        </span>
                    </div>
                </div>
            </div>
            <div
                class="hidden sm:grid sm:grid-cols-4 grid-rows-6 sm:grid-rows-3 2xl:flex items-center gap-2 justify-center mb-4"
                style="grid-auto-flow: column"
            >
                <Badge
                    v-for="(score, index) in scoreValues"
                    :key="index"
                    :score="score"
                />
            </div>
            <div class="flex flex-col gap-4 mb-5">
                <ScoresDisplay
                    :countries="filteredCountries"
                    :title="$t('scores')"
                ></ScoresDisplay>
            </div>
            <div class="w-full flex flex-row justify-center items-center gap-5">
                <div class="flex flex-col gap-2 justify-center items-center">
                    <button
                        @click="increaseMax"
                        class="rounded-full bg-white hover:scale-110 transition-all duration-300"
                    >
                        <img
                            src="/icons/plus.png"
                            alt="more"
                            class="w-10 h-10"
                        />
                    </button>
                    <span class="text-center text-sm">{{ $t('more') }}</span>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <button
                        @click="decreaseMax"
                        class="rounded-full bg-white hover:scale-110 transition-all duration-300"
                    >
                        <img
                            src="/icons/less.png"
                            alt="less"
                            class="w-10 h-10"
                        />
                    </button>
                    <span class="text-center text-sm">{{ $t('less') }}</span>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <button
                        @click="resetMax"
                        class="rounded-full bg-white hover:scale-110 transition-all duration-300 rotate-45"
                    >
                        <img
                            src="/icons/plus.png"
                            alt="reset"
                            class="w-10 h-10"
                        />
                    </button>
                    <span class="text-center text-sm">{{ $t('reset') }}</span>
                </div>
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

@media (max-width: 340px) {
    .column {
        flex-direction: column;
    }

    .center {
        justify-content: center;
    }
}
</style>
