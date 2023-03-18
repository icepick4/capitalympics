<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';

export default defineComponent({
    name: 'App',
    components: { Header, Footer },
    setup() {}
});
</script>

<template>
    <div class="flex flex-col h-screen">
        <Header />
        <div class="flex flex-col flex-grow justify-evenly">
            <router-view />
        </div>
        <Footer />
    </div>
</template>

<style scoped></style>
