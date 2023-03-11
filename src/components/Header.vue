<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-row w-full justify-between h-auto bg-white">
        <div class="flex flex-row justify-center items-center">
            <RouterLink
                to="/"
                class="w-full h-full flex items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                Home
            </RouterLink>
            <RouterLink
                to="/countries"
                class="w-full h-full flex items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                Countries
            </RouterLink>
            <RouterLink
                to="/learn"
                class="w-full h-full flex items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                Learn
            </RouterLink>
            <RouterLink
                to="/about"
                class="w-full h-full flex items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                About
            </RouterLink>
        </div>
        <RouterLink to="/">
            <div class="flex items-center group">
                <img
                    src="../assets/logo/logo3.png"
                    alt="logo"
                    class="w-28 h-28"
                />
                <h1
                    class="font-medium text-links text-xl group-hover:text-primaryhover group-hover:font-semibold"
                >
                    Capitalympics
                </h1>
            </div>
        </RouterLink>

        <div class="flex flex-row justify-center items-center w-1/4">
            <RouterLink
                to="/"
                class="w-full h-full flex justify-end items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                Sign In</RouterLink
            >
            <RouterLink
                to="/"
                class="w-full h-full flex justify-center items-center p-4 font-medium text-links no-underline hover:text-primaryhover text-xl hover:font-semibold"
            >
                Sign Up</RouterLink
            >
        </div>
    </div>
</template>

<style scoped></style>
