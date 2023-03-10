<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="flex flex-row w-screen justify-between h-auto bg-white">
        <div class="flex flex-row justify-center items-center">
            <div class="m-4">
                <RouterLink
                    to="/"
                    class="font-medium text-blue-900 no-underline hover:text-blue-600 text-xl"
                >
                    Home
                </RouterLink>
            </div>
            <div class="m-4">
                <RouterLink
                    to="/about"
                    class="font-medium text-blue-900 no-underline hover:text-blue-600 text-xl"
                >
                    About
                </RouterLink>
            </div>
            <div class="m-4">
                <a
                    href="#"
                    class="font-medium text-blue-900 no-underline hover:text-blue-600 text-xl"
                    >Countries</a
                >
            </div>
        </div>
        <div class="flex items-center">
            <RouterLink to="/">
                <img
                    src="../assets/logo/logo1.png"
                    alt="logo"
                    class="w-28 h-28"
                />
            </RouterLink>
        </div>
        <div class="flex flex-row justify-center items-center">
            <div class="m-4">
                <a
                    href="#"
                    class="font-medium text-blue-900 no-underline hover:text-blue-600 text-xl"
                    >Sign In</a
                >
            </div>
            <div class="m-4">
                <a
                    href="#"
                    class="font-medium text-blue-900 no-underline hover:text-blue-600 text-xl"
                    >Sign Up</a
                >
            </div>
        </div>
    </div>
</template>

<style scoped></style>
