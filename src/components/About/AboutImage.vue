<script setup lang="ts">
defineProps<{
    image: string;
    link: string;
    alt: string;
}>();

const randomRotation = () => {
    const rotations = ['hover:rotate-3', 'hover:-rotate-3'];
    return rotations[Math.floor(Math.random() * rotations.length)];
};
</script>

<template>
    <div
        class="bg-background shadow overflow-hidden hover:scale-110 transform hover:shadow-2xl transition ease-in-out duration-300 relative"
        :class="randomRotation()"
    >
        <img :src="image" :alt="alt" class="w-full h-auto I-cover" />
        <div
            class="absolute inset-0 flex items-center justify-center text-white opacity-0 hover:opacity-100 transition duration-300 z-10 hover:bg-black hover:bg-opacity-50"
        >
            {{ $t('learnMore') }}
        </div>
    </div>
</template>
