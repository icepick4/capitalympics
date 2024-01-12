<script lang="ts" setup>

type Color = 'black' | 'white' | 'bluebg' | 'gradient';

defineProps<{
    text: string;
    textColor: Color;
    to: string;
    color: Color;
}>();

const bg = ['bg-black', 'bg-white', 'bg-bluebg', 'bg-gradient']

</script>

<template>
    <RouterLink :to="to"
        :class="'bg-'+color+' text-'+textColor"
        class="mb-4 flex flex-row items-center rounded-lg px-8 py-4 font-semibold transition [box-shadow:rgb(171,_196,200)-8px_8px] hover:[box-shadow:rgb(171,_196,_245)_0px_0px]">
        <p class="mr-6">{{ text }}</p>
        <svg fill="currentColor" class="h-4 w-4 flex-none" viewBox="0 0 20 21" xmlns="http://www.w3.org/2000/svg">
            <title>Arrow Right</title>
            <polygon
                points="16.172 9 10.101 2.929 11.515 1.515 20 10 19.293 10.707 11.515 18.485 10.101 17.071 16.172 11 0 11 0 9">
            </polygon>
        </svg>
    </RouterLink>
</template>