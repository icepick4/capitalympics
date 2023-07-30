<script setup lang="ts">
import ButtonTemplate from '@/components/Learning/Buttons/ButtonTemplate.vue';
import ChoosingButtons from '@/components/Learning/Buttons/ChoosingButtons.vue';
import Question from '@/components/Learning/Question.vue';
import Loader from '@/components/Loader.vue';
import Regions from '@/components/Regions.vue';
import { notify } from '@/plugins/notification';
import { useCountriesStore } from '@/store/countries';
import { CurrentState, LearningType, ScoreType } from '@/types/common';
import type { Country } from '@/types/models';
import ApiClient from '@/utils/ApiClient';
import { onBeforeMount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const contriesStore = useCountriesStore();

const isLoading = ref(false);

const currentLearning: LearningType = route.path.split('/')[2] as LearningType;
const currentState = ref<CurrentState>('starting');
const couldNotGetCountry = ref(false);

const country = ref<Country>();
const continent = ref<number>(0);

async function getNewCountry() {
    isLoading.value = true;

    const queryParameters = {
        continent: continent.value || undefined,
        type: currentLearning
    };

    const response = await ApiClient.get<{ success: true; country: number }>(
        '/questions/next',
        queryParameters
    );

    isLoading.value = false;
    if (!response.success) {
        couldNotGetCountry.value = true;
        return;
    }

    country.value = contriesStore.find(response.data.country);
    currentState.value = 'starting';
}

async function handleClick(score: ScoreType) {
    if (!country.value) return;
    const response = await ApiClient.post<any>(`/questions`, {
        result: score,
        type: currentLearning,
        country_id: country.value.id
    });

    if (!response.success) {
        console.error(response);
        return;
    } else if (response.data.level) {
        notify({
            title:
                response.data.level === 'up'
                    ? t('congratulations')
                    : t('tooBad'),
            message:
                response.data.level === 'up' ? t('levelUp') : t('levelDown'),
            type: response.data.level === 'up' ? 'success' : 'error',
            flag: country.value.flag,
            score: response.data.score,
            timeout: 5000
        });
    }

    currentState.value = 'starting';
    getNewCountry();
}

const handleClickSee = () => {
    currentState.value = 'choosing';
};

onBeforeMount(getNewCountry);
watch(continent, getNewCountry);
</script>

<template>
    <Dialog
        v-model="couldNotGetCountry"
        :title="$t('errorCountry')"
        :description="$t('tryAgain')"
        :buttonDescription="$t('close')"
        type="error"
    />
    <Loader v-if="isLoading" />
    <div class="w-full flex flex-col justify-center items-center">
        <div
            class="flex flex-col w-10/12 md:h-auto justify-center items-center gap-10"
        >
            <Regions
                v-model="continent"
                class="xs:w-1/2 sm:w-1/3 md:w-1/4 mx-4"
            />
            <div
                v-if="country != undefined"
                class="w-5/6 md:w-auto h-full flex flex-col items-center justify-center"
            >
                <div
                    class="flex flex-col w-full h-full justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5 md:p-10 lg:p-14 gap-7 md:gap-9 lg:gap-12"
                >
                    <div
                        v-if="currentLearning"
                        :class="
                            currentLearning === 'capital' && 'w-full h-full'
                        "
                    >
                        <Question
                            :country="country"
                            :state="currentState"
                            :type="currentLearning"
                        />
                    </div>
                    <div class="w-full">
                        <div v-if="currentState === 'starting'">
                            <ButtonTemplate
                                :title="$t('see')"
                                :color="'bg-gradient'"
                                @click="handleClickSee"
                            />
                        </div>
                        <div
                            v-else-if="currentState === 'choosing'"
                            class="text-center flex flex-col gap-5 lg:gap-10"
                        >
                            <ChoosingButtons @click="handleClick" />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex flex-row w-full justify-center gap-10 items-center"
            >
                <RouterLink
                    to="/learn"
                    class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-auto"
                >
                    {{ $t('leave') }}
                </RouterLink>
            </div>
        </div>
    </div>
</template>
