<script setup lang="ts">
import { getLanguage, regions } from '@/utils/common';
import { IconMapPinFilled } from '@tabler/icons-vue';
import { ref } from 'vue';
const region = ref('World');
</script>

<template>
    <Select
        v-model="region"
        :label="$t('region')"
        :options="
            regions[getLanguage()].map((region) => ({
                label: region[0],
                value: region[1]
            }))
        "
        :prepend-icon="IconMapPinFilled"
    >
    </Select>
</template>
