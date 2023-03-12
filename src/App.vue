<script lang="ts">
import { computed } from '@vue/reactivity';
import { useRoute } from 'vue-router';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default {
    name: 'App',
    components: { Header, Footer },
    setup() {
        const route = useRoute();
        const isHome = computed(() => route.path === '/');
        return { isHome };
    }
};
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <router-view />
        </div>
        <div v-if="!isHome">
            <Footer />
        </div>
    </div>
</template>

<style scoped></style>
