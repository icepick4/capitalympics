<script setup lang="ts">
import AboutImage from './AboutImage.vue';
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
                >{{ $t('learnMore') }}</RouterLink
            >
            <a
                v-else
                :href="link"
                class="text-primary hover:underline text-lg"
                >{{ $t('learnMore') }}</a
            >
        </div>
        <div class="relative">
            <div class="overflow-hidden">
                <RouterLink
                    v-if="!link.includes('https')"
                    :to="link"
                    class="scale-1"
                >
                    <AboutImage :image="image" :link="link" :alt="alt" />
                </RouterLink>
                <a v-else :href="link" class="scale-1">
                    <AboutImage :image="image" :link="link" :alt="alt" />
                </a>
            </div>
            <span
                class="absolute -bottom-5 right-0 text-black text-sm"
                v-html="alt"
            >
            </span>
        </div>
    </div>
</template>
