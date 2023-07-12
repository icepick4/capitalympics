<script setup lang="ts">
import { Level } from '@/models/User';
import { LearningType } from '@/types/common';
import { fromScoreToLevel, getLevelName } from '@/utils/common';
import {
    IconCompass,
    IconCrown,
    IconGlobe,
    IconMap,
    IconMapPin,
    IconMapPinStar,
    IconPlanet,
    IconSchool,
    IconSparkles,
    IconUserQuestion,
    IconWorld,
    IconWorldStar
} from '@tabler/icons-vue';

const props = defineProps<{
    score: number;
    learningType: LearningType;
}>();

const level = fromScoreToLevel(props.score);
const text = getLevelName(props.score);

const icon = (level: Level) => {
    switch (level) {
        case -1:
            return IconUserQuestion;
        case 0:
            return IconSparkles;
        case 1:
            return IconSchool;
        case 2:
            return IconMapPin;
        case 3:
            return IconMapPinStar;
        case 4:
            return IconMap;
        case 5:
            return IconCompass;
        case 6:
            return IconWorld;
        case 7:
            return IconWorldStar;
        case 8:
            return IconGlobe;
        case 9:
            return IconCrown;
        case 10:
            return IconPlanet;
        default:
            return IconUserQuestion;
    }
};
</script>

<template>
    <div class="flex flex-col lg:flex-row justify-start items-center">
        <p v-if="learningType == 'flag'" class="w-28 text-center lg:text-start">
            {{ $t('flag') }}
        </p>
        <p
            v-if="learningType == 'capital'"
            class="w-28 text-center lg:text-start"
        >
            {{ $t('capital') }}
        </p>
        <span
            class="inline-flex items-center rounded-md bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
        >
            <component :is="icon(level)" class="w-6 h-6 mr-1" />
            {{ text }}
        </span>
    </div>
</template>
