<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import { getLocalStorageUser, isSetToken, isSetUser } from './utils/common';

if (isSetToken() && isSetUser()) {
    const store = useStore();
    const user_id: number = getLocalStorageUser();
    //todo connecter avec le token du localStorage le user
}
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
