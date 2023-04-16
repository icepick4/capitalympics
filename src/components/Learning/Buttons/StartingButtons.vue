<script setup lang="ts">
import ButtonTemplate from './ButtonTemplate.vue';

const handleClickSuccess = () => {
    console.log('Success');
};

const handleClickMedium = () => {
    console.log('Medium');
};

const handleClickFailed = () => {
    console.log('Failed');
};
</script>

<template>
    <div
        class="flex flex-col sm:flex-row w-full items-center justify-center gap-2"
    >
        <ButtonTemplate
            :title="'Easy'"
            :color="'bg-blue-500'"
            :onClick="handleClickSuccess"
        />
        <ButtonTemplate
            :title="'Medium'"
            :color="'bg-yellow-500'"
            :onClick="handleClickMedium"
        />
        <ButtonTemplate
            :title="'Hard'"
            :color="'bg-red-500'"
            :onClick="handleClickFailed"
        />
    </div>
</template>
