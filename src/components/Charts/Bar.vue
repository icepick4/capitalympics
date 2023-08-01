<script setup lang="ts">
import { useCountriesStore } from '@/store/countries';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Title,
    Tooltip
} from 'chart.js';
import { onMounted, ref } from 'vue';
import { Bar } from 'vue-chartjs';
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

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
            backgroundColor: ['#41B883', '#E46651', '#DD1B16'],
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
const countriesStore = useCountriesStore();

onMounted(async () => {
    // const learningType: string = 'flag';
    // interface RawScoresResponse {
    //     success: boolean;
    //     scores: {
    //         country_id: number;
    //         created_at: string;
    //         result: 'succeeded' | 'medium' | 'failed';
    //         learning_type: string;
    //     }[];
    // }

    // const response = await ApiClient.get<RawScoresResponse>('/scores/raw', {
    //     type: learningType
    // });
    // if (!response.success) {
    //     console.log(response.error);
    //     return;
    // }

    // const data = response.data.scores;

    // const scoresByCountry: {
    //     [country_id: number]: {
    //         succeeded: number;
    //         medium: number;
    //         failed: number;
    //     };
    // } = {};

    // // Parcourez les données pour regrouper les scores par pays et compter le nombre de succès, moyens et échecs
    // data.forEach((scoreData) => {
    //     const { country_id, result } = scoreData;
    //     if (!scoresByCountry[country_id]) {
    //         scoresByCountry[country_id] = {
    //             succeeded: 0,
    //             medium: 0,
    //             failed: 0
    //         };
    //     }
    //     scoresByCountry[country_id][result]++;
    // });

    // console.log(scoresByCountry[1]);

    // // Créez des tableaux pour les datasets du graphique en barres
    // const countries: string[] = [];
    // const succeededScores: number[] = [];
    // const mediumScores: number[] = [];
    // const failedScores: number[] = [];

    // // Parcourez les résultats par pays et remplissez les tableaux de données
    // for (const country_id in scoresByCountry) {
    //     countries.push(countriesStore.find(parseInt(country_id)).code);
    //     succeededScores.push(scoresByCountry[country_id].succeeded);
    //     mediumScores.push(scoresByCountry[country_id].medium);
    //     failedScores.push(scoresByCountry[country_id].failed);
    // }

    // console.log(countries);
    // console.log(succeededScores);
    // console.log(mediumScores);
    // console.log(failedScores);

    chartData.datasets.push({
        label: 'Succeeded',
        backgroundColor: '#41B883',
        data: [65, 59, 80, 81, 56, 55, 40]
    });

    loaded.value = true;
});
</script>

<template>
    <Bar
        v-if="loaded"
        :data="chartData"
        :options="chartOptions"
        ref="myChart"
    />
</template>
