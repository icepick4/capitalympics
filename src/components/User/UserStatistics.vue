<script setup lang="ts">
import Bar from '../Charts/Bar.vue';
import Doughnut from '../Charts/Doughnut.vue';
import Line from '../Charts/Line.vue';
import Radar from '../Charts/Radar.vue';
</script>

<template>
    <div class="flex flex-col w-full justify-center items-center gap-20">
        <div class="flex flex-row gap-10">
            <Radar />
            <Bar />
        </div>
        <div class="flex flex-row gap-10">
            <Doughnut />
            <Line />
        </div>
    </div>
</template>
