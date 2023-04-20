<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EndingButtons from '../components/Learning/Buttons/EndingButtons.vue';
import StartingButtons from '../components/Learning/Buttons/StartingButtons.vue';
import LearnCapitals from '../components/Learning/Capitals/CapitalsQuestion.vue';
import LearnFlags from '../components/Learning/Flags/FlagsQuestion.vue';
type Learning = 'capitals' | 'flags';
type CurrentState = 'starting' | 'ending';
const route = useRoute();
const currentLearning: Learning = route.path.split('/')[2] as Learning;
const currentState = ref<CurrentState>('starting');
</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div
            class="flex flex-col w-4/5 lg:w-2/3 xl:w-1/2 2xl:w-2/5 h-2/3 justify-between items-center border-[3px] border-black rounded-3xl bg-white p-5"
        >
            <div v-if="currentLearning === 'capitals'" class="w-full h-full">
                <LearnCapitals
                    :text="
                        currentState === 'starting'
                            ? 'What is the capital of'
                            : 'What is the capital of'
                    "
                    :countryName="
                        currentState === 'starting' ? 'France' : 'France'
                    "
                    :countryFlag="
                        currentState === 'starting'
                            ? 'https://restcountries.eu/data/fra.svg'
                            : 'https://restcountries.eu/data/fra.svg'
                    "
                />
            </div>
            <div v-else-if="currentLearning === 'flags'">
                <LearnFlags />
            </div>
            <div class="w-full">
                <div v-if="currentState === 'starting'">
                    <StartingButtons />
                </div>
                <div v-else-if="currentState === 'ending'">
                    <EndingButtons />
                </div>
            </div>
        </div>
    </div>
</template>
