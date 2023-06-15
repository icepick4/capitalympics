<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { User } from '../models/User';

const store = useStore();
const user: User = ref(store.getters.user);
</script>

<template>
    <h1 class="text-white text-center text-6xl">Capitalympics !</h1>
    <div class="flex flex-col justify-center items-center" v-if="user">
        <h2 class="text-white text-center text-3xl">Welcome {{ user.name }}</h2>
    </div>
</template>

<style scoped></style>
