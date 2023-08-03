<script setup lang="ts">
import { useContinentsStore } from '@/store/continents';
import { useRegionsStore } from '@/store/regions';
import { UserScore } from '@/types/common';
import ApiClient from '@/utils/ApiClient';

import { useCountriesStore } from '@/store/countries';
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
}

const chartOptions: ChartOptions = {
    responsive: true
};

const loaded = ref(false);
const regionsStore = useRegionsStore();
const countriesStore = useCountriesStore();

onMounted(async () => {
    interface ResponseGetScores {
        success: true;
        scores: UserScore[];
    }

    const flagResponse = await ApiClient.get<ResponseGetScores>('/scores', {
        type: 'flag'
    });
    const capitalResponse = await ApiClient.get<ResponseGetScores>('/scores', {
        type: 'capital'
    });
    if (!flagResponse.success || !capitalResponse.success) {
        return;
    }

    const capitalData = capitalResponse.data.scores;
    const flagData = flagResponse.data.scores;

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
        label: 'Drapeaux',
        backgroundColor: 'rgba(99, 255, 132, 0.6)',
        data: continents.value.map((continent) => {
            const scores = flagData.filter((score) => {
                const _country = countriesStore.find(score.country_id);
                const _region = regionsStore.find(_country.region_id);
                return _region.continent_id == continent.value;
            });

            const scoresSum =
                scores.reduce((a, b) => a + b.score, 0) / scores.length;

            return scoresSum;
        })
    });

    chartData.datasets.push({
        label: 'Capitales',
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        data: continents.value.map((continent) => {
            const scores = capitalData.filter((score) => {
                const _country = countriesStore.find(score.country_id);
                const _region = regionsStore.find(_country.region_id);
                return _region.continent_id == continent.value;
            });

            const scoresSum =
                scores.reduce((a, b) => a + b.score, 0) / scores.length;

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
