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
    <div class="flex flex-col items-center justify-center h-full">
        <h1 class="text-6xl font-bold text-white">404</h1>
        <h2 class="text-2xl font-bold text-white">Page not found</h2>
        <RouterLink
            to="/"
            class="text-blue-500 hover:text-blue-600 text-4xl mt-10"
            >Go back to home</RouterLink
        >
    </div>
</template>

<style scoped></style>
