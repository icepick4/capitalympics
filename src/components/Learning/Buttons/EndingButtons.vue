<script setup lang="ts">
import ButtonTemplate from './ButtonTemplate.vue';

const handleClickNext = () => {
    console.log('Next');
};

const handleClickEnd = () => {
    console.log('End Session');
};
</script>

<template>
    <div class="flex flex-row w-full items-center justify-center gap-2">
        <ButtonTemplate
            :title="'Next'"
            :color="'bg-primary'"
            :onClick="handleClickNext"
        />
        <ButtonTemplate
            :title="'End Session'"
            :color="'bg-red-500'"
            :onClick="handleClickEnd"
        />
    </div>
</template>
