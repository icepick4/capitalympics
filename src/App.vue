<script setup lang="ts">
import { RouterView } from 'vue-router';
import { useStore } from 'vuex';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

const store = useStore();
const user = store.getters.user;
console.log(user);
if (user === 'guest') {
    store.dispatch('logOut');
}
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly relative">
            <RouterView />
        </div>
        <Footer />
    </div>
</template>
