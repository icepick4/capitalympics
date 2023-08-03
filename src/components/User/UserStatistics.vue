<script setup lang="ts">
import Doughnut from '@/components/Statistics/Charts/Doughnut.vue';
import Radar from '@/components/Statistics/Charts/Radar.vue';
</script>

<template>
    <div class="flex flex-col w-full justify-center items-center gap-20">
        <div class="flex flex-row gap-10">
            <Radar />
            <!-- <Bar /> -->
        </div>
        <div class="flex flex-row gap-10">
            <Doughnut />
            <!-- <Line /> -->
        </div>
    </div>
</template>
