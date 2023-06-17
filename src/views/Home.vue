<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import Planet from '../components/Planet.vue';
import { User } from '../models/User';

const store = useStore();
const user: User = ref(store.getters.user);
const planetMouseDown = ref(false);

const handlePlanetMouseDown = () => {
    planetMouseDown.value = true;
};

const handlePlanetMouseUp = () => {
    planetMouseDown.value = false;
};
</script>

<template>
    <div class="flex flex-col items-center justify-center">
        <div class="flex flex-col items-start">
            <h1 class="text-6xl text-black mb-4 mt-4">
                Welcome to Capitalympics!
            </h1>
            <p class="text-black text-2xl">
                Learn capitals and flags of the world.
            </p>
        </div>
        <Planet
            class="cursor-grab lg:block hidden"
            @mousedown="handlePlanetMouseDown"
            @mouseup="handlePlanetMouseUp"
            :class="{ 'cursor-grabbing': planetMouseDown }"
        />
    </div>
</template>
