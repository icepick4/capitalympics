<script setup lang="ts">
import VLazyImage from 'v-lazy-image';
import { RouterLink } from 'vue-router';
const props = defineProps({
    countryName: {
        type: String,
        required: true
    },
    countryFlag: {
        type: String,
        required: true
    },
    countryCode: {
        type: String,
        required: true
    }
});
</script>

<template>
    <RouterLink
        :to="{
            name: 'SingleCountry',
            params: {
                countryCode: countryCode
            }
        }"
    >
        <div
            class="relative flex justify-center items-center h-full hover:scale-105 transition ease-in-out duration-300"
        >
            <v-lazy-image
                :src="countryFlag"
                :alt="`Flag of ${countryName}`"
                class="w-full h-auto I-cover rounded shadow transition ease-in-out duration-300 border-2 border-black"
                :title="countryName"
            />
            <span
                class="absolute w-full h-full bottom-0 left-0 right-0 text-white opacity-0 hover:opacity-100 transition ease-in-out duration-200"
            >
                <p class="-translate-y-7">{{ countryName }}</p>
            </span>
        </div>
    </RouterLink>
</template>

<style scoped>
.v-lazy-image {
    filter: blur(8px);
    transition: filter 0.5s;
}

.v-lazy-image-loaded {
    filter: blur(0);
}
</style>
