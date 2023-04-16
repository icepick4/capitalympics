<script setup lang="ts">
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import EndingButtons from './Buttons/EndingButtons.vue';
import StartingButtons from './Buttons/StartingButtons.vue';
import LearnCapitals from './Capitals/CapitalsQuestion.vue';
import LearnFlags from './Flags/FlagsQuestion.vue';
type Learning = 'capitals' | 'flags';
type CurrentState = 'starting' | 'ending';
const route = useRoute();
const currentLearning: Learning = route.path.split('/')[2] as Learning;
const currentState = ref<CurrentState>('starting');
</script>

<template>
    <div class="w-full h-full flex flex-col items-center justify-center">
        <div
            class="flex w-1/3 h-2/3 justify-center items-center border-[3px] border-black rounded-3xl bg-white"
        >
            <div v-if="currentLearning === 'capitals'">
                <LearnCapitals />
            </div>
            <div v-else-if="currentLearning === 'flags'">
                <LearnFlags />
            </div>
            <div v-if="currentState === 'starting'">
                <StartingButtons />
            </div>
            <div v-else-if="currentState === 'ending'">
                <EndingButtons />
            </div>
        </div>
    </div>
</template>
