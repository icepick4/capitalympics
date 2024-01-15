<script setup lang="ts">
import NotificationsWrapper from '@/components/Notification/NotificationsWrapper.vue';
import { onBeforeMount, ref } from 'vue';
import { RouterView } from 'vue-router';
import BuyMeACoffee from './components/BuyMeACoffee.vue';
import Header from './components/Header.vue';
import Loader from './components/Loader.vue';
import Star from './components/Star.vue';
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
    <Star class="hidden sm:block"></Star>
    <BuyMeACoffee
        class="hidden sm:block absolute top-0 right-0 mt-5 mr-8"
    ></BuyMeACoffee>
    <Loader v-if="isLoading" />
    <div v-else class="flex flex-col h-screen min-h-screen">
        <NotificationsWrapper />
        <Header />
        <div class="flex flex-col flex-grow justify-between">
            <RouterView />
        </div>
    </div>
</template>
