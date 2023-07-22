<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';
import Header from './components/Header.vue';
import Loader from './components/Loader.vue';
import { useStore } from './store';

const { loadMandatoryData } = useStore();

const isLoading = ref(false);
onBeforeMount(async () => {
    isLoading.value = true;
    await loadMandatoryData();
    isLoading.value = false;
});
</script>

<template>
    <Loader v-if="isLoading" />
    <div v-else class="flex flex-col h-screen min-h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <RouterView />
        </div>
    </div>
</template>
