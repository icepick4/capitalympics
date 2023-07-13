<script setup lang="ts">
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
</script>

<template>
    <div class="flex flex-col h-screen min-h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <RouterView />
        </div>
    </div>
</template>
