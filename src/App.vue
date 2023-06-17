<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { RouterView, useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from './components/BlurContainer.vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import Loader from './components/Loader.vue';
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

const route = useRoute();

const isHome = () => {
    return route.name === 'Home';
};
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header v-if="!isHome()" />
        <div class="flex flex-col flex-grow justify-evenly">
            <RouterView v-if="isReconnected" />
            <BlurContainer v-else>
                <Loader />
            </BlurContainer>
        </div>
        <Footer v-if="!isHome()" />
    </div>
</template>
