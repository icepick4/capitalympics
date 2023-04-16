<script setup lang="ts">
import { useRoute } from 'vue-router';
import LearnCapitals from './Capitals/CapitalsQuestion.vue';
import LearnFlags from './Flags/FlagsQuestion.vue';
type Learning = 'capitals' | 'flags';

const route = useRoute();
const currentLearning: Learning = route.path.split('/')[2] as Learning;
</script>

<template>
    <div
        class="flex w-1/4 h-full justify-center items-center border-4 border-black"
    >
        <div v-if="currentLearning === 'capitals'">
            <LearnCapitals />
        </div>
        <div v-else-if="currentLearning === 'flags'">
            <LearnFlags />
        </div>
    </div>
</template>
