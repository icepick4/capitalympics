<script setup lang="ts">
import VLazyImage from 'v-lazy-image';
defineProps<{
    text: string;
    title: string;
    image: string;
    alt: string;
    link: string;
}>();
</script>

<template>
    <div
        class="grid grid-cols-1 sm:grid-cols-2 gap-5 w-5/6 lg:w-4/6 xl:w-1/2 items-center"
    >
        <div class="flex flex-col gap-5">
            <h1 class="text-4xl font-bold">{{ title }}</h1>
            <p class="text-gray-600">{{ text }}</p>
            <RouterLink
                v-if="!link.includes('https')"
                :to="link"
                class="text-primary hover:underline text-lg"
                >Learn more</RouterLink
            >
            <a v-else :href="link" class="text-primary hover:underline text-lg"
                >Learn more</a
            >
        </div>
        <div class="relative">
            <div class="overflow-hidden">
                <RouterLink :to="link" class="scale-1">
                    <div
                        class="bg-background shadow overflow-hidden hover:scale-110 hover:rotate-3 transform hover:shadow-2xl transition ease-in-out duration-300 relative"
                    >
                        <VLazyImage
                            :src="image"
                            :alt="link.substring(1)"
                            class="w-full h-auto I-cover"
                        />
                        <div
                            class="absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition duration-300 z-10 hover:bg-black hover:bg-opacity-50"
                        >
                            Learn more
                        </div>
                    </div>
                </RouterLink>
            </div>
            <span
                class="absolute -bottom-5 right-0 text-black text-sm"
                v-html="alt"
            >
            </span>
        </div>
    </div>
</template>
