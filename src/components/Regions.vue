<script setup lang="ts">
import { getLanguage, regions } from '@/utils/common';
import { ref } from 'vue';
const region = ref('World');
</script>

<template>
    <select
        v-model="region"
        class="w-4/5 md:w-1/4 mx-auto p-2 rounded-md bg-gradient"
    >
        <option
            class="bg-white"
            v-for="region in regions[getLanguage()]"
            :key="region[0]"
            :value="region[1]"
        >
            {{ region[0] }}
        </option>
    </select>
</template>
