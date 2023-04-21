<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import {
    getLocalStorageToken,
    getLocalStorageUser,
    isSetToken,
    isSetUser
} from './utils/common';

const reconnect = async () => {
    const store = useStore();
    const user_id: number = getLocalStorageUser();
    const token: string = getLocalStorageToken();
    try {
        await store.dispatch('reconnect', { user_id, token });
    } catch (error) {}
};

if (isSetToken() && isSetUser()) {
    reconnect();
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
