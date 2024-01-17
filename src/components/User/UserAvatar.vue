<script setup lang="ts">
import ProfilePicture from './ProfilePicture.vue';
</script>

<template>
    <div
        class="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-100 mb-10 relative w-11/12 xl:w-auto"
    >
        <ProfilePicture size="lg" :editable="true" />
    </div>
</template>
