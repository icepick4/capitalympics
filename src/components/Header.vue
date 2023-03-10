<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-row w-full justify-between h-auto bg-white">
        <div class="flex flex-row justify-center items-center">
            <div class="m-4">
                <RouterLink
                    to="/"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                >
                    Home
                </RouterLink>
            </div>
            <div class="m-4">
                <RouterLink
                    to="/about"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                >
                    About
                </RouterLink>
            </div>
            <div class="m-4">
                <RouterLink
                    to="/countries"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                >
                    Countries
                </RouterLink>
            </div>
            <div class="m-4">
                <RouterLink
                    to="/learn"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                >
                    Learn
                </RouterLink>
            </div>
        </div>
        <RouterLink to="/">
            <div class="flex items-center">
                <img
                    src="../assets/logo/logo3.png"
                    alt="logo"
                    class="w-28 h-28"
                />
                <h1 class="font-medium text-links text-xl">Capitalympics</h1>
            </div>
        </RouterLink>

        <div class="flex flex-row justify-center items-center">
            <div class="m-4">
                <a
                    href="#"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                    >Sign In</a
                >
            </div>
            <div class="m-4">
                <a
                    href="#"
                    class="font-medium text-links no-underline hover:text-blue-600 text-xl"
                    >Sign Up</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped></style>
