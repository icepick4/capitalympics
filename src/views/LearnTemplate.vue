<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import ButtonTemplate from '../components/Learning/Buttons/ButtonTemplate.vue';
import ChoosingButtons from '../components/Learning/Buttons/ChoosingButtons.vue';
import CapitalsQuestion from '../components/Learning/CapitalsQuestion.vue';
import FlagsQuestion from '../components/Learning/FlagsQuestion.vue';
import Loader from '../components/Loader.vue';
import Modal from '../components/Modal.vue';
import { CountryI } from '../models/Country';
import { User } from '../models/User';
import ApiService from '../services/apiService';
import { Redirection } from '../types/Redirection';
import { CurrentState, LearningType, ScoreType } from '../types/common';
import { Redirections } from '../utils/redirections';
const route = useRoute();
const store = useStore();
const currentLearning: LearningType = route.path.split('/')[2] as LearningType;
const currentState = ref<CurrentState>('starting');
const couldNotGetCountry = ref(false);
const fetchingCountry = ref(false);

const redirection: Redirection = Redirections.getRedirectionByLink('/learn');
const user: User = store.getters.user;
const token = store.getters.token;
const country = ref<CountryI>();
const getNewCountry = async () => {
    try {
        fetchingCountry.value = true;
        country.value = await ApiService.getNewCountryToLearn(
            user.id,
            token,
            currentLearning,
            user.language
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
        getNewCountry();
    }
};

const handleClickSee = () => {
    currentState.value = 'choosing';
};

onBeforeMount(() => {
    getNewCountry();
});
</script>

<template>
    <BlurContainer v-if="couldNotGetCountry || fetchingCountry">
        <Modal
            v-if="couldNotGetCountry"
            title="Error while loading the country"
            text="Please try again later"
            message="Sorry for the inconvenience retry later"
            background-color="white"
            title-color="error"
            :redirection="redirection"
            @close="couldNotGetCountry = false"
        />
        <Loader v-else-if="fetchingCountry" />
    </BlurContainer>
    <div
        class="flex flex-col w-full md:w-auto md:h-auto justify-center items-center my-10 gap-10"
    >
        <div
            v-if="country != undefined"
            class="w-5/6 md:w-auto h-full flex flex-col items-center justify-center"
        >
            <div
                class="flex flex-col w-full h-full justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5 md:p-10 lg:p-14 gap-7 md:gap-9 lg:gap-12"
            >
                <div v-if="currentLearning === 'capital'" class="w-full h-full">
                    <CapitalsQuestion
                        :country="country"
                        :currentState="currentState"
                    />
                </div>
                <div v-else-if="currentLearning === 'flag'">
                    <FlagsQuestion
                        :country="country"
                        :currentState="currentState"
                    />
                </div>
                <div class="w-full">
                    <div v-if="currentState === 'starting'">
                        <ButtonTemplate
                            :title="'See'"
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
                :to="{ name: 'Profile' }"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-auto"
            >
                Go back to your profile
            </RouterLink>
            <RouterLink
                :to="{ name: 'Home' }"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-auto"
            >
                Go back home
            </RouterLink>
        </div>
    </div>
</template>
