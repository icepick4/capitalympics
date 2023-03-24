<script setup lang="ts">
const props = defineProps({
    text: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
});
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
                <img
                    :src="image"
                    :alt="link.substring(1)"
                    class="w-full h-auto hover:scale-[1.2] transition-all duration-500"
                />
            </div>
            <span
                class="absolute -bottom-5 right-0 text-black text-sm"
                v-html="alt"
            >
            </span>
        </div>
    </div>
</template>
