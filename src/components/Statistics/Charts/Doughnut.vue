<script setup lang="ts">
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { onMounted, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';
ChartJS.register(ArcElement, Tooltip, Legend);
const chartData: {
    labels: string[];
    datasets: {
        label: string;
        backgroundColor: string | string[];
        data: number[];
    }[];
} = {
    labels: [],
    datasets: [
        {
            label: 'Scores',
            backgroundColor: ['#16a34a', '#ea580c', '#dc2626'],
            data: []
        }
    ]
};

interface ChartOptions {
    responsive: boolean;
}

const chartOptions: ChartOptions = {
    responsive: true
};

const loaded = ref(false);

const props = defineProps<{
    scores: {
        country_id: number;
        created_at: string;
        result: 'succeeded' | 'medium' | 'failed';
        learning_type: string;
    }[];
    labels: string[];
}>();

onMounted(async () => {
    const data = props.scores;

    chartData.labels = props.labels;

    let successCount = 0;
    let mediumCount = 0;
    let failureCount = 0;

    data.map((score) => {
        score;
        if (score.result == 'succeeded') {
            successCount++;
        } else if (score.result == 'medium') {
            mediumCount++;
        } else {
            failureCount++;
        }
    });

    chartData.datasets[0].data.push(successCount);
    chartData.datasets[0].data.push(mediumCount);
    chartData.datasets[0].data.push(failureCount);
    loaded.value = true;
});
</script>

<template>
    <Doughnut
        v-if="loaded"
        id="my-chart-id2"
        :data="chartData"
        :options="chartOptions"
        ref="myChart"
    />
</template>
