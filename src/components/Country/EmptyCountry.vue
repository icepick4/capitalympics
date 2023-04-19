<script setup lang="ts"></script>

<template>
    <div class="flex justify-center w-2/5">
        <div class="w-full bg-gray-300 rounded-lg shadow-lg overflow-hidden">
            <div class="p-3 w-full flex flex-row justify-between items-center">
                <div
                    class="animate-pulse bg-gray-400 h-6 w-32 rounded-full"
                ></div>
                <div
                    class="animate-pulse bg-gray-400 h-20 w-32 rounded-full"
                ></div>
            </div>
            <div class="px-4 py-4 bg-white">
                <div class="grid grid-cols-2 gap-4">
                    <div v-for="i in 6" :key="i" class="flex gap-4 flex-col">
                        <div
                            class="animate-pulse bg-gray-400 h-6 w-full rounded-full"
                        ></div>
                        <div
                            class="animate-pulse bg-gray-400 h-4 w-1/2 rounded-full"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
