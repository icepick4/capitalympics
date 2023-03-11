<script lang="ts">
export default {
    name: 'NotFound',
    components: {},
    setup() {
        return {};
    }
};
</script>

<template>
    <div class="flex flex-col items-center justify-center h-full gap-20">
        <div class="flex flex-col items-center justify-center">
            <img src="../assets/logo/logo3.png" alt="logo" class="w-28 h-28" />
            <h1 class="text-6xl font-bold text-white text-center">404</h1>
            <h2 class="text-2xl font-bold text-white text-center">
                Page not found
            </h2>
        </div>
        <div class="flex flex-row w-full justify-evenly items-center">
            <RouterLink
                :to="{ name: 'Home' }"
                class="transition ease-in-out delay-100 text-white text-2xl font-bold text-center p-5 bg-primary rounded-md hover:bg-primaryhover hover:scale-105 w-1/4"
            >
                Go back to home
            </RouterLink>
            <RouterLink
                :to="{ name: 'Countries' }"
                class="transition ease-in-out delay-100 text-white text-2xl font-bold text-center p-5 bg-primary rounded-md hover:bg-primaryhover hover:scale-105 w-1/4"
            >
                Go back to countries
            </RouterLink>
        </div>
    </div>
</template>

<style scoped></style>
