<script setup lang="ts">
defineProps<{
    customComponent: Object;
}>();
</script>

<template>
    <div
        class="absolute backdrop-blur-sm w-screen h-screen z-50 overflow-hidden"
    >
        <component :is="customComponent"></component>
    </div>
</template>
