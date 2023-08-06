<script setup lang="ts">
import { useContinentsStore } from '@/store/continents';
import { useRegionsStore } from '@/store/regions';

import { useCountriesStore } from '@/store/countries';
import { UserScore } from '@/types/common';
import {
Chart as ChartJS,
Filler,
Legend,
LineElement,
PointElement,
RadialLinearScale,
Tooltip
} from 'chart.js';
import { computed, onMounted, ref } from 'vue';
import { Radar } from 'vue-chartjs';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

const chartData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string;
        data: number[];
    }[];
} = {
    labels: [],
    datasets: []
};

interface ChartOptions {
    responsive: boolean;
    scale: {
        ticks: {
            beginAtZero: boolean;
            min: number;
            max: number;
            stepSize: number;
        };
    }
}

const chartOptions: ChartOptions = {
    responsive: true,
    scale: {
        ticks: {
            beginAtZero: true,
            min: 0,
            max: 100,
            stepSize: 500
        }
    }
};

const loaded = ref(false);
const regionsStore = useRegionsStore();
const countriesStore = useCountriesStore();

const props = defineProps<{
    flagScores: UserScore[];
    capitalScores: UserScore[];
    labels: string[];
}>();

onMounted(async () => {
    const flagData = props.flagScores;
    const capitalData = props.capitalScores;

    const continentsStore = useContinentsStore();
    const continents = computed(() => {
        let continents: { value: number; label: string }[] = [];

        if (!continentsStore.continents) {
            return continents;
        }

        return [
            ...continents,
            ...Object.values(continentsStore.continents).map((continent) => ({
                value: continent.id,
                label: continent.name
            }))
        ];
    });
    chartData.labels = continents.value.map((continent) => continent.label);
    chartData.datasets.push({
        label: props.labels[0],
        backgroundColor: 'rgba(99, 255, 132)',
        data: continents.value.map((continent) => {
            const scores = flagData.filter((score) => {
                const _country = countriesStore.find(score.country_id);
                const _region = regionsStore.find(_country.region_id);
                return _region.continent_id == continent.value;
            });

            const scoresSum =
                Math.floor(
                    scores.reduce((a, b) => a + b.score, 0) / scores.length
                ) * 10;

            return scoresSum;
        })
    });

    chartData.datasets.push({
        label: props.labels[1],
        backgroundColor: 'rgba(255, 99, 132)',
        data: continents.value.map((continent) => {
            const scores = capitalData.filter((score) => {
                const _country = countriesStore.find(score.country_id);
                const _region = regionsStore.find(_country.region_id);
                return _region.continent_id == continent.value;
            });

            const scoresSum =
                Math.floor(
                    scores.reduce((a, b) => a + b.score, 0) / scores.length
                ) * 10;

            return scoresSum;
        })
    });
    loaded.value = true;
});
</script>

<template>
    <Radar
        v-if="loaded"
        id="my-chart-id"
        :data="chartData"
        :options="chartOptions"
        ref="myChart"
    />
</template>
