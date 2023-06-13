<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-col lg:flex-row gap-10 p-10">
        <RouterLink to="/quiz/capitals">Capitals</RouterLink>
        <RouterLink to="/quiz/flags">Flags</RouterLink>
    </div>
</template>
