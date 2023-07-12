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
import ApiService from '@/services/apiService';
import { CurrentState, LearningType, Region, ScoreType } from '@/types/common';
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';

const route = useRoute();
const store = useStore();
const currentLearning: LearningType = route.path.split('/')[2] as LearningType;
const currentState = ref<CurrentState>('starting');
const couldNotGetCountry = ref(false);
const fetchingCountry = ref(false);

const user: User = store.getters.user;
const token = store.getters.token;
const country = ref<CountryI>();
const currentRegion = ref<Region>('World');

const getNewCountry = async (region: Region) => {
    try {
        fetchingCountry.value = true;
        country.value = await ApiService.getNewCountryToLearn(
            user.id,
            token,
            currentLearning,
            user.language,
            region
        );
        // To improve in the future with caching flags images
        setTimeout(() => {
            fetchingCountry.value = false;
        }, 250);
    } catch (error) {
        couldNotGetCountry.value = true;
    }
};

const handleClick = (type: ScoreType) => {
    try {
        if (country.value) {
            ApiService.updateUserLearning(
                user.id,
                country.value.alpha3Code,
                token,
                type,
                currentLearning
            );
        } else {
            throw new Error('Country is undefined');
        }
    } catch (error) {
        console.log(error);
    } finally {
        currentState.value = 'starting';
        getNewCountry(currentRegion.value);
    }
};

const handleClickSee = () => {
    currentState.value = 'choosing';
};

onBeforeMount(() => {
    getNewCountry(currentRegion.value);
});
</script>

<template>
    <BlurContainer v-if="couldNotGetCountry || fetchingCountry">
        <Modal
            v-if="couldNotGetCountry"
            :title="$t('errorCountry')"
            :message="$t('tryAgain')"
            background-color="white"
            title-color="error"
            @close="couldNotGetCountry = false"
        />
        <Loader v-else-if="fetchingCountry" />
    </BlurContainer>
    <div
        class="flex flex-col w-full md:w-auto md:h-auto justify-center items-center my-10 gap-10"
    >
        <Regions
            @change="getNewCountry(currentRegion)"
            v-model="currentRegion"
        />
        <div
            v-if="country != undefined"
            class="w-5/6 md:w-auto h-full flex flex-col items-center justify-center"
        >
            <div
                class="flex flex-col w-full h-full justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5 md:p-10 lg:p-14 gap-7 md:gap-9 lg:gap-12"
            >
                <div v-if="currentLearning === 'capital'" class="w-full h-full">
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
                        <ChoosingButtons
                            :countryCode="'FRA'"
                            :user_id="user.id"
                            :token="token"
                            :click="handleClick"
                        />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row w-full justify-center gap-10 items-center">
            <RouterLink
                to="/learn"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-auto"
            >
                {{ $t('leave') }}
            </RouterLink>
        </div>
    </div>
</template>
