<script setup lang="ts">
import TextBadge from '@/components/TextBadge.vue';
import { IconChevronRight, IconFlagFilled } from '@tabler/icons-vue';
defineProps<{
    name: string;
    themes: string[];
    description: string;
    difficulty: number;
    image: string;
}>();
</script>

<template>
    <div class="w-full flex justify-center backdrop-blur">
        <div class="w-11/12 group hover:cursor-pointer border-y border-black">
            <div class="w-full flex flex-row py-7 gap-10 relative">
                <div class="w-1/3 relative">
                    <IconChevronRight
                        class="w-24 h-24 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    />
                    <img
                        :src="image"
                        alt="Quiz image"
                        class="object-cover group-hover:blur-sm transition-all duration-200"
                    />
                </div>
                <div class="flex flex-col justify-between items-start">
                    <div class="flex flex-row gap-5 p-5 rounded-lg bg-gray-400">
                        <div class="relative">
                            <h1 class="text-3xl">{{ name }}</h1>
                            <div
                                class="h-1 w-0 bg-black group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                        <div class="flex flex-row gap-5 items-center">
                            <TextBadge
                                v-for="theme in themes"
                                :key="theme"
                                :text="theme"
                                :size="'xs'"
                            />
                        </div>
                    </div>
                    <div class="relative">
                        <p>{{ description }}</p>
                        <div
                            class="h-1 w-0 bg-black group-hover:w-full cubic-bezier"
                        ></div>
                    </div>
                </div>
                <IconFlagFilled
                    class="w-10 h-10 absolute top-2 right-2 transform opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                />
            </div>
        </div>
    </div>
</template>

<style scoped>
.cubic-bezier {
    transition: width 0.4s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
</style>
