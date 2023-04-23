<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import ButtonTemplate from '../components/Learning/Buttons/ButtonTemplate.vue';
import ChoosingButtons from '../components/Learning/Buttons/ChoosingButtons.vue';
import LearnCapitals from '../components/Learning/Capitals/CapitalsQuestion.vue';
import LearnFlags from '../components/Learning/Flags/FlagsQuestion.vue';
import Modal from '../components/Modal.vue';
import { CountryI } from '../models/Country';
import ApiService from '../services/apiService';
import { Redirection } from '../types/Redirection';
import { CurrentState, LearningState, LearningType } from '../types/common';
import { Redirections } from '../utils/redirections';
const route = useRoute();
const router = useRouter();
const store = useStore();
const currentLearning: LearningType = route.path.split('/')[2] as LearningType;
const currentState = ref<CurrentState>('starting');
const couldNotGetCountry = ref(false);

const redirection: Redirection = Redirections.getRedirectionByLink('/learn');
const user = store.getters.user;
const token = store.getters.token;
const country = ref<CountryI>();
const getNewCountry = async () => {
    try {
        country.value = await ApiService.getNewCountryToLearn(
            user.id,
            token,
            currentLearning
        );
    } catch (error) {
        couldNotGetCountry.value = true;
    }
};

const handleClick = (type: LearningState) => {
    try {
        if (country.value) {
            ApiService.updateUserLearning(
                user.id,
                country.value.alpha3Code,
                token,
                type
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
    <BlurContainer v-if="couldNotGetCountry">
        <Modal
            title="Error while loading the country"
            text="Please try again later"
            message="Sorry for the inconvenience retry later"
            background-color="white"
            title-color="error"
            :redirection="redirection"
            @close="couldNotGetCountry = false"
        />
    </BlurContainer>
    <div
        class="flex flex-col w-full md:w-auto md:h-auto justify-center items-center gap-20"
    >
        <div
            v-if="country != undefined"
            class="w-5/6 md:w-auto h-full flex flex-col items-center justify-center"
        >
            <div
                class="flex flex-col w-full h-full justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5 md:p-10 lg:p-14 gap-5 md:gap-7 lg:gap-10"
            >
                <div
                    v-if="currentLearning === 'capitals'"
                    class="w-full h-full"
                >
                    <LearnCapitals
                        :country="country"
                        :currentState="currentState"
                    />
                </div>
                <div v-else-if="currentLearning === 'flags'">
                    <LearnFlags />
                </div>
                <div class="w-full">
                    <div v-if="currentState === 'starting'">
                        <ButtonTemplate
                            :title="'See'"
                            :color="'bg-primary'"
                            @click="handleClickSee"
                        />
                    </div>
                    <div
                        v-else-if="currentState === 'choosing'"
                        class="text-center flex flex-col gap-5 lg:gap-10"
                    >
                        <h1 class="text-3xl">It was :</h1>
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
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/4"
            >
                Go back to your profile
            </RouterLink>
            <RouterLink
                :to="{ name: 'Home' }"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/4"
            >
                Go back home
            </RouterLink>
        </div>
    </div>
</template>
