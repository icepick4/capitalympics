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
    <div class="grid grid-rows-2 gap-5">
        <div class="flex flex-col justify-center items-center">
            <img :src="image" :alt="alt" class="w-1/2" />
            <h1 class="text-2xl font-bold text-center text-black">
                {{ title }}
            </h1>
        </div>
        <p class="text-center text-black">{{ text }}</p>
        <div class="flex justify-center">
            <Routerlink :to="link">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
                >
                    Learn more
                </button>
            </Routerlink>
        </div>
    </div>
</template>
