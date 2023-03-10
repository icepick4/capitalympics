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
    <div class="flex flex-col items-center justify-center h-full gap-10">
        <div>
            <h1 class="text-6xl font-bold text-white text-center">404</h1>
            <h2 class="text-2xl font-bold text-white text-center">
                Page not found
            </h2>
        </div>
        <RouterLink
            :to="{ name: 'Home' }"
            class="transition ease-in-out delay-100 text-white text-2xl font-bold text-center p-5 bg-primary rounded-md hover:bg-primaryhover hover:scale-105 w-1/4 mx-auto"
        >
            Go back to home
        </RouterLink>
    </div>
</template>

<style scoped></style>
