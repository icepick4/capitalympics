<script setup lang="ts">
import { RouterView } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>
