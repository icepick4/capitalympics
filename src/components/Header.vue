<script lang="ts">
import { RouterLink } from 'vue-router';
export default {
    name: 'Header',
    setup() {
        return {};
    }
};
</script>

<template>
    <div
        class="flex flex-row w-full justify-between h-auto bg-gray-100 border-b-2 border-black"
    >
        <div class="flex flex-row justify-center items-center">
            <RouterLink
                to="/"
                class="w-full h-full flex items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                Home
            </RouterLink>
            <RouterLink
                to="/countries"
                class="w-full h-full flex items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                Countries
            </RouterLink>
            <RouterLink
                to="/learn"
                class="w-full h-full flex items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                Learn
            </RouterLink>
            <RouterLink
                to="/about"
                class="w-full h-full flex items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                About
            </RouterLink>
        </div>
        <RouterLink to="/">
            <div class="flex items-center group">
                <img src="../assets/logo.png" alt="logo" class="w-28 h-28" />
                <h1
                    class="font-medium text-primary text-xl group-hover:text-secondary group- transition-all duration-75 ease-in-out"
                >
                    Capitalympics
                </h1>
            </div>
        </RouterLink>

        <div class="flex flex-row justify-center items-center w-1/4">
            <RouterLink
                to="/signin"
                class="w-full h-full flex justify-end items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                Sign In</RouterLink
            >
            <RouterLink
                to="/signup"
                class="w-full h-full flex justify-center items-center p-4 font-medium text-primary no-underline hover:text-secondary text-xl transition-all duration-75 ease-in-out"
            >
                Sign Up</RouterLink
            >
        </div>
    </div>
</template>

<style scoped></style>
