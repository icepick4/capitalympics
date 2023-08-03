<script setup lang="ts">
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
import { computed, ref } from 'vue';

const props = defineProps<{
    score: number;
    learningType?: LearningType;
    selected?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg';
    progress?: boolean;
}>();

const size = ref(props.size ?? 'md');

const level = computed(() => fromScoreToLevel(props.score));
const text = computed(() => getLevelName(props.score));

const icon = computed(() => {
    const defaultIcon = IconSparkles;

    return (
        {
            [-1]: IconUserQuestion,
            [0]: IconSparkles,
            [1]: IconSchool,
            [2]: IconMapPin,
            [3]: IconMapPinStar,
            [4]: IconMap,
            [5]: IconCompass,
            [6]: IconGlobe,
            [7]: IconWorld,
            [8]: IconWorldStar,
            [9]: IconCrown,
            [10]: IconPlanet
        }[level.value] ?? defaultIcon
    );
});

const color = computed(() => {
    const defaultColor = 'bg-gray-100 text-gray-700';

    return (
        {
            [-1]: 'bg-gray-100 text-gray-700',
            [0]: 'bg-gray-200 text-gray-800',
            [1]: 'bg-gray-300 text-gray-900',
            [2]: 'bg-yellow-100 text-yellow-700',
            [3]: 'bg-yellow-200 text-yellow-800',
            [4]: 'bg-yellow-300 text-yellow-900',
            [5]: 'bg-green-200 text-green-700',
            [6]: 'bg-green-300 text-green-800',
            [7]: 'bg-green-400 text-green-900',
            [8]: 'bg-blue-300 text-blue-800',
            [9]: 'bg-blue-400 text-blue-900',
            [10]: 'bg-gradient text-purple-700'
        }[level.value] ?? defaultColor
    );
});

const isMaxScore = computed(() => props.score === 100);

const offset = computed(() => {
    if (isMaxScore.value) return 0;
    const percent = props.score;
    return circumference.value - (percent / 100) * circumference.value;
});

const circumference = computed(() => 2 * Math.PI * 30);
</script>

<template>
    <div v-if="!progress" class="flex justify-start items-center select-none">
        <p class="w-28 text-center lg:text-start" v-if="learningType">
            {{ $t(learningType) }}
        </p>
        <span
            class="inline-flex items-center rounded-md px-2 py-1 font-medium ring-1 ring-inset ring-purple-700/10 whitespace-nowrap"
            :class="[
                color,
                {
                    'sm:shadow-[0_2px_20px_rgba(128,_49,232,_0.8)]': selected
                },
                {
                    'text-xs': size === 'xs',
                    'text-sm': size === 'sm',
                    'text-base': size === 'md',
                    'text-xl': size === 'lg'
                }
            ]"
        >
            <component
                :is="icon"
                class="mr-2"
                :class="{
                    'w-3 h-3': size === 'xs',
                    'w-4 h-4': size === 'sm',
                    'w-6 h-6': size === 'md',
                    'w-8 h-8': size === 'lg'
                }"
            />
            {{ text }}
        </span>
    </div>
    <div
        v-else-if="progress"
        class="relative flex flex-row items-center justify-center gap-2"
    >
        <div class="flex flex-col items-center justify-center gap-1">
            <svg class="w-20 h-20 -rotate-90">
                <circle
                    class="text-white"
                    stroke-width="5"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
                <circle
                    :class="color"
                    stroke-width="5"
                    :stroke-dasharray="circumference"
                    :stroke-dashoffset="offset"
                    stroke="currentColor"
                    fill="transparent"
                    r="30"
                    cx="40"
                    cy="40"
                />
            </svg>
            <span class="absolute text-xl"
                ><component :is="icon" class="w-8 h-8"
            /></span>
        </div>
        <div class="flex flex-col items-start justify-start">
            <span
                class="text-2xl font-bold bg-transparent p-1 rounded-lg"
                :class="color"
            >
                {{ text }}
            </span>
            <span class="text-2xl font-bold text-gray-800 p-1">{{
                score * 10
            }}</span>
        </div>
    </div>
</template>
