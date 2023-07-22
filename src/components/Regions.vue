<script setup lang="ts">
import { useContinentsStore } from '@/store/continents';
import { IconMapPinFilled } from '@tabler/icons-vue';
import { useVModel } from '@vueuse/core';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Properties {
    modelValue: number;
}

const props = defineProps<Properties>();
const emit = defineEmits(['update:modelValue']);
const region = useVModel(props, 'modelValue', emit);

const continentsStore = useContinentsStore();
const continents = computed(() => {
    let continents = [{ value: 0, label: t('world') }];

    if (!continentsStore.continents) {
        return continents;
    }

    return [
        ...continents,
        ...Object.values(continentsStore.continents).map((continent) => ({
            value: continent.id,
            label: continent.name
        }))
    ];
});
</script>

<template>
    <Select
        v-model="region"
        :label="$t('region')"
        :options="continents"
        :prepend-icon="IconMapPinFilled"
    />
</template>
