<script setup lang="ts">
import ApiClient from '@/utils/ApiClient';
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip
} from 'chart.js';
import { onMounted, ref } from 'vue';
import { Line } from 'vue-chartjs';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
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
    datasets: [
        {
            label: 'Nombre de parties',
            backgroundColor: 'rgba(54, 162, 235, 0.8)',
            data: []
        }
    ]
};

interface ChartOptions {
    responsive: boolean;
    scales: {
        x: {
            grid: {
                offset: boolean;
            };
        };
        y: {
            ticks: {
                stepSize: number;
            };
            min: number;
            title: {
                display: boolean;
                text: string;
            };
        };
    };
}

const chartOptions: ChartOptions = {
    responsive: true,
    scales: {
        x: {
            grid: {
                offset: true
            }
        },
        y: {
            ticks: {
                stepSize: 1
            },
            min: 0,
            title: {
                display: true,
                text: 'Nombre de parties'
            }
        }
    }
};

const loaded = ref(false);

onMounted(async () => {
    const learningType: string = 'flag';
    interface RawScoresResponse {
        success: boolean;
        scores: {
            created_at: string;
            result: number;
            learning_type: string;
        }[];
    }

    const response = await ApiClient.get<RawScoresResponse>('/scores/raw', {
        type: learningType
    });

    if (!response.success) {
        console.log(response.error);
        return;
    }

    const data = response.data.scores;

    data.map((score) => {
        const date = new Date(score.created_at);
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        const label = `${month} ${year}`;
        const index = chartData.labels.indexOf(label);
        if (index === -1) {
            chartData.labels.push(label);
            chartData.datasets[0].data.push(1);
        } else {
            chartData.datasets[0].data[index]++;
        }
    });
    loaded.value = true;
});
</script>

<template>
    <Line
        v-if="loaded"
        id="my-chart-id"
        :data="chartData"
        :options="chartOptions"
        ref="myChart"
    />
</template>
