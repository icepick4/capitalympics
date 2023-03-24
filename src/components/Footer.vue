<script setup lang="ts"></script>

<template>
    <div class="flex flex-col bg-gray-100 items-center">
        <div
            class="flex flex-row justify-evenly w-full h-auto bg-gray-100 border-t-2 border-black"
        >
            <div class="flex flex-col items-center justify-start m-6">
                <h1 class="text-2xl">Infos</h1>
            </div>
            <div class="flex flex-col items-center justify-start m-6">
                <h1 class="text-2xl">Links</h1>
                <div class="flex flex-col items-center justify-center"></div>
            </div>
            <div class="flex flex-col items-center justify-start m-6">
                <h1 class="text-2xl">Follow us</h1>
                <a
                    href="#"
                    class="text-primary no-underline hover:text-secondary"
                    >GitHub</a
                >
                <a
                    href="#"
                    class="text-primary no-underline hover:text-secondary"
                    >Twitter</a
                >
            </div>
            <div class="flex flex-col items-center justify-start m-6">
                <h1 class="text-2xl">Legal notices</h1>
                <div class="flex flex-col items-center justify-center"></div>
            </div>
        </div>
        <div class="h-px w-1/2 bg-black"></div>
        <div class="h-auto m-3">
            <p>2023 - Rémi JARA</p>
        </div>
    </div>
</template>

<style scoped></style>
