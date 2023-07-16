<script setup lang="ts">
import BlurContainer from '@/components/BlurContainer.vue';
import ButtonTemplate from '@/components/Learning/Buttons/ButtonTemplate.vue';
import ChoosingButtons from '@/components/Learning/Buttons/ChoosingButtons.vue';
import Question from '@/components/Learning/Question.vue';
import Loader from '@/components/Loader.vue';
import Modal from '@/components/Modal.vue';
import Regions from '@/components/Regions.vue';
import { CountryI } from '@/models/Country';
import { User } from '@/models/User';
import { useStore } from '@/store';
import { CurrentState, LearningType, Region, ScoreType } from '@/types/common';
import ApiClient from '@/utils/ApiClient';
import { storeToRefs } from 'pinia';
import { Ref, onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const store = useStore();

// This page is protected by a guard, so we can assume that the user is logged in and defined
const user = storeToRefs(store).user as Ref<User>;

const isLoading = ref(false);

const currentLearning: LearningType = route.path.split('/')[2] as LearningType;
const currentState = ref<CurrentState>('starting');
const couldNotGetCountry = ref(false);

const country = ref<CountryI>();
const currentRegion = ref<Region>('World');

async function getNewCountry(region: Region) {
    isLoading.value = true;
    const queryParameters = { lang: user.value.language, region };
    const response = await ApiClient.get<{ country: CountryI }>(
        `/users/${user.value.id}/country/play/${currentLearning}`,
        queryParameters
    );
    isLoading.value = false;
    if (response.success) {
        country.value = response.data.country;
        currentState.value = 'starting';
    } else {
        couldNotGetCountry.value = true;
    }
}

async function handleClick(score: ScoreType) {
    if (!country.value) return;
    const response = await ApiClient.put<any>(
        `/users/${user.value.id}/${country.value.alpha3Code}/${currentLearning}/score/${score}`
    );

    if (response.success) {
        currentState.value = 'starting';
        getNewCountry(currentRegion.value);
    }
}

const handleClickSee = () => {
    currentState.value = 'choosing';
};

onBeforeMount(() => {
    getNewCountry(currentRegion.value);
});

watch(currentRegion, () => {
    getNewCountry(currentRegion.value);
});
</script>

<template>
    <BlurContainer v-if="couldNotGetCountry || isLoading">
        <Modal
            v-if="couldNotGetCountry"
            :title="$t('errorCountry')"
            :message="$t('tryAgain')"
            background-color="white"
            title-color="error"
            @close="couldNotGetCountry = false"
        />
        <Loader v-else-if="isLoading" />
    </BlurContainer>
    <div class="w-full flex flex-col justify-center items-center">
        <div
            class="flex flex-col w-10/12 md:h-auto justify-center items-center gap-10"
        >
            <Regions
                v-model="currentRegion"
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
                        v-if="currentLearning === 'capital'"
                        class="w-full h-full"
                    >
                        <Question
                            :country="country"
                            :state="currentState"
                            :type="'capital'"
                        />
                    </div>
                    <div v-else-if="currentLearning === 'flag'">
                        <Question
                            :country="country"
                            :state="currentState"
                            :type="'flag'"
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
