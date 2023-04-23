<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
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
const isReconnected = ref(false);

const reconnect = async () => {
    const store = useStore();
    const user_id: number = getLocalStorageUser();
    const token: string = getLocalStorageToken();
    try {
        await store.dispatch('reconnect', { user_id, token });
    } catch (error) {
    } finally {
        isReconnected.value = true;
    }
};

onBeforeMount(async () => {
    if (isSetUser() && isSetToken()) {
        await reconnect();
    } else {
        isReconnected.value = true;
    }
});
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <RouterView v-if="isReconnected" />
        </div>
        <Footer />
    </div>
</template>
