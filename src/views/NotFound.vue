<script setup lang="ts"></script>

<template>
    <div class="flex flex-col items-center justify-center h-full gap-20">
        <img
            src="/404-error-animate.svg"
            alt="404"
            class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        />
        <!-- <h1 class="text-6xl font-bold text-white text-center">404</h1>
            <h2 class="text-2xl font-bold text-white text-center">
                Page not found
            </h2> -->
        <div class="flex flex-row w-full justify-center items-center">
            <RouterLink
                to="/"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-white rounded-md hover:scale-105 w-1/4"
            >
                Go back home
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>
