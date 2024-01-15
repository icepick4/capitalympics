<script setup lang="ts">
import { User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { useCountriesStore } from '@/store/countries';
import { useRegionsStore } from '@/store/regions';
import type { UserScore } from '@/types/common';
import { LearningType, Sort } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { getLevelName } from '@/utils/common';
import {
    IconArrowsSort,
    IconMinus,
    IconPlus,
    IconSortAscending,
    IconSortDescending,
    IconX
} from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import Badge from '../Badge.vue';
import CTAButton from '../CTAButton.vue';
import Regions from '../Regions.vue';
import ScoresDisplay from './ScoresDisplay.vue';

interface DisplayedCountry {
    id: number;
    name: string;
    flag: string;
    code: string;
    score: number;
    continent: number;
}

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
if (!user.value) {
    store.logout({ loggedOut: '1' });
}

const countriesStore = useCountriesStore();
const regionsStore = useRegionsStore();
const { t } = useI18n();

const continent = ref(0);
const learningType = ref<LearningType>('flag');
const countries = ref<DisplayedCountry[]>([]);

const currentMax = ref(3);
const clickedSwitchLearningType = ref(false);
const currentSort = ref<Sort>('DESC');
const isMax = ref(false);
const countriesLength = ref(0);

const flagScore = ref(0);
const capitalScore = ref(0);

const currentScore = computed(() =>
    learningType.value === 'flag' ? flagScore.value : capitalScore.value
);

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
};

async function loadScores() {
    const queryParams = {
        type: learningType.value
    };

    interface ResponseGetScores {
        success: true;
        scores: UserScore[];
    }

    const response = await ApiClient.get<ResponseGetScores>(
        '/scores',
        queryParams
    );
    if (!response.success) {
        console.error(response.error);
        return;
    }
    const scores = response.data.scores;

    countriesLength.value = scores.length;
    isMax.value = scores.length < currentMax.value;

    countries.value = scores.map((userScore) => {
        const _country = countriesStore.find(userScore.country_id);
        const _region = regionsStore.find(_country.region_id);
        return {
            id: _country.id,
            name: _country.name,
            flag: _country.flag,
            code: _country.code,
            score: userScore.score,
            continent: _region.continent_id
        };
    });

    const { capital, flag } = await ApiService.getUserScore();
    flagScore.value = flag;
    capitalScore.value = capital;
}

const switchLearningType = () => {
    clickedSwitchLearningType.value = !clickedSwitchLearningType.value;
    learningType.value = learningType.value === 'flag' ? 'capital' : 'flag';
    resetMax();
    loadScores();
};

onMounted(() => loadScores());

const filteredCountries = computed(() => {
    return countries.value
        .filter(
            (country) =>
                !continent.value || continent.value === country.continent
        )
        .sort((a, b) => {
            if (currentSort.value === 'ASC') {
                return a.score - b.score;
            }

            return b.score - a.score;
        });
});

const scoreValues: number[] = [-1, 0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
</script>

<template>
    <div
        class="w-full h-full flex flex-col items-center justify-center gap-10 mt-10 mb-10"
    >
        <Badge :score="currentScore" size="lg" :progress="true" class="mb-4" />
        <div
            class="grid grid-rows-1 sm:grid-cols-4 sm:grid-rows-3 2xl:flex items-center gap-2 justify-center mb-10"
            style="grid-auto-flow: column"
        >
            <Badge
                v-for="(score, index) in scoreValues"
                :key="index"
                :score="score"
                :selected="getLevelName(score) == getLevelName(currentScore)"
                class="sm:block"
                :class="{
                    hidden: getLevelName(score) !== getLevelName(currentScore)
                }"
                size="md"
            />
        </div>
        <div
            class="relative bg-gradient rounded-lg shadow-lg w-11/12 md:w-5/6 xl:3/4 2xl:w-2/3 mx-auto p-2 sm:p-8"
        >
            <CTAButton
                to="/profile"
                :text="$t('back')"
                class="absolute right-0 top-0 m-5"
                :goBack="true"
            >
            </CTAButton>
            <div
                class="w-full flex flex-col md:flex-row justify-center items-center gap-3 mb-10"
            >
                <div class="flex flex-row gap-5">
                    <h1 class="text-4xl font-bold text-center">
                        <div class="flex flex-row sm:flex-row gap-5">
                            <p class="text-2xl sm:text-4xl font-normal">
                                {{ $t(learningType) }}
                            </p>
                            <div
                                class="flex flex-col gap-2 justify-center items-center"
                            >
                                <ActionIcon
                                    :icon="IconArrowsSort"
                                    :label="$t('switch')"
                                    rounded
                                    class="hover:scale-110"
                                    :class="{
                                        '-rotate-180': clickedSwitchLearningType
                                    }"
                                    @click="switchLearningType"
                                />
                            </div>
                        </div>
                    </h1>
                </div>
            </div>

            <div class="flex flex-col gap-4 mb-5">
                <ScoresDisplay
                    :countries="filteredCountries.slice(0, currentMax)"
                    :title="$t('scores')"
                >
                    <Regions
                        v-model="continent"
                        class="items-center xs:w-1/2 lg:w-1/4"
                    />
                </ScoresDisplay>
            </div>
        </div>

        <div
            class="w-11/12 2xl:w-7/12 flex flex-col sm:flex-row justify-center items-center gap-10 lg:gap-20"
        >
            <div class="flex flex-row gap-2 sm:gap-4">
                <div class="flex flex-col gap-2 justify-center items-center">
                    <ActionIcon
                        :icon="IconPlus"
                        :label="$t('more')"
                        :disabled="filteredCountries.length <= currentMax"
                        rounded
                        class="peer hover:scale-110"
                        @click="increaseMax"
                    />
                    <span
                        class="text-center text-sm peer-disabled:opacity-50"
                        >{{ $t('more') }}</span
                    >
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <ActionIcon
                        :icon="IconMinus"
                        :label="$t('less')"
                        :disabled="currentMax <= 3"
                        rounded
                        class="peer hover:scale-110"
                        @click="decreaseMax"
                    />
                    <span
                        class="text-center text-sm peer-disabled:opacity-50"
                        >{{ $t('less') }}</span
                    >
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <input
                        type="number"
                        class="rounded-full bg-white hover:scale-110 transition-all duration-300 w-10 h-10 text-center"
                        v-model="currentMax"
                        @input="isMax = false"
                        max="244"
                        min="0"
                        step="1"
                    />
                    <span class="text-center text-sm">{{ $t('value') }}</span>
                </div>
                <div class="flex flex-col gap-2 justify-center items-center">
                    <ActionIcon
                        :icon="IconX"
                        :label="$t('reset')"
                        rounded
                        class="hover:scale-110"
                        @click="resetMax"
                    />
                    <span class="text-center text-sm">{{ $t('reset') }}</span>
                </div>
            </div>
            <div class="flex flex-row gap-2 sm:gap-4">
                <div class="flex flex-col gap-2 justify-center items-center">
                    <ActionIcon
                        :icon="
                            currentSort === 'ASC'
                                ? IconSortAscending
                                : IconSortDescending
                        "
                        :label="$t('sort')"
                        rounded
                        class="hover:scale-110"
                        @click="switchSort"
                    />
                    <span class="text-center text-sm">{{ $t('sort') }}</span>
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

input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
}
</style>
