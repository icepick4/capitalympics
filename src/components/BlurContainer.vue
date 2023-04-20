<script setup lang="ts">
// defineProps<{
//     customComponent: Object;
// }>();
</script>

<template>
    <div
        class="absolute backdrop-blur-sm w-screen h-screen z-50 overflow-hidden"
    >
        <div class="flex justify-center items-center h-full w-full">
            <slot></slot>
        </div>
    </div>
</template>
