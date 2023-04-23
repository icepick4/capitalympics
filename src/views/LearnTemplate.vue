<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import EndingButtons from '../components/Learning/Buttons/EndingButtons.vue';
import StartingButtons from '../components/Learning/Buttons/StartingButtons.vue';
import LearnCapitals from '../components/Learning/Capitals/CapitalsQuestion.vue';
import LearnFlags from '../components/Learning/Flags/FlagsQuestion.vue';
import Modal from '../components/Modal.vue';
import { CountryI } from '../models/Country';
import ApiService from '../services/apiService';
import { Redirection } from '../types/Redirection';
import { CurrentState, LearningType } from '../types/common';
import { Redirections } from '../utils/redirections';
const route = useRoute();
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
        v-else-if="country != undefined"
        class="w-full h-full flex flex-col items-center justify-center"
    >
        <div
            class="flex flex-col w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 h-2/3 justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5"
        >
            <div v-if="currentLearning === 'capitals'" class="w-full h-full">
                <LearnCapitals :country="country" />
            </div>
            <div v-else-if="currentLearning === 'flags'">
                <LearnFlags />
            </div>
            <div class="w-full">
                <div v-if="currentState === 'starting'">
                    <StartingButtons :countryCode="'FRA'" />
                </div>
                <div v-else-if="currentState === 'ending'">
                    <EndingButtons />
                </div>
            </div>
        </div>
    </div>
</template>
