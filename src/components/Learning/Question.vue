<script setup lang="ts">
import { CountryI } from '@/models/Country';
import { CurrentState, LearningType } from '@/types/common';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{
    country: CountryI;
    state: CurrentState;
    type: LearningType,
}>();

const textDisplayed = computed(() => {
    if (props.state === 'starting') {
        return t(props.type === 'capital' ? 'findCapital' : 'findCountry')
    }

    return props.type === 'capital' ? props.country.capital : props.country.name;
});
</script>

<template>
    <div class="w-full h-full flex flex-col gap-10">
        <div class="flex flex-col sm:flex-row w-full items-center justify-center gap-5 lg:gap-10">
            <h1
                v-if="type === 'capital'"
                class="text-3xl lg:text-5xl text-center"
            >
                {{ country.name }}
            </h1>
            <img
                class="w-36 lg:w-52 h-auto border-2 border-black rounded"
                :src="country.flag"
                :alt="country.name"
            />
        </div>
        <div class="text-center">
            <h1 :class="[state === 'starting' ? 'text-3xl' : 'text-4xl lg:text-6xl']">
                {{ textDisplayed }}
            </h1>
        </div>
    </div>
</template>
