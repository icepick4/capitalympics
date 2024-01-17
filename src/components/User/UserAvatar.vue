<script setup lang="ts">
import CTAButton from '../CTAButton.vue';
import ProfilePicture from './ProfilePicture.vue';
</script>

<template>
    <div class="flex flex-col gap-10 items-center justify-center mt-10 mb-10">
        <div
            class="flex flex-col items-center justify-center p-4 rounded-lg shadow-md bg-gray-100 mb-10 relative w-11/12 xl:w-auto"
        >
            <ProfilePicture size="lg" :editable="true" />
        </div>
        <CTAButton
            :text="$t('back')"
            :goBack="true"
            class="w-1/2 sm:w-1/3 xl:w-1/4 mx-auto"
        />
    </div>
</template>
