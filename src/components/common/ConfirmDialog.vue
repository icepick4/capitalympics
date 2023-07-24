<script setup lang="ts">
import { useVModel } from '@vueuse/core';

interface Properties {
    modelValue: boolean;
    title: string;
    description: string;
    buttonYes?: string;
    buttonNo?: string;
    type: 'warning' | 'error' | 'success';
}

const props = defineProps<Properties>();

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);
const isOpen = useVModel(props, 'modelValue', emit);

const confirmModal = () => emit('confirm');
const cancelModal = () => emit('cancel');
</script>

<template>
    <Dialog
        v-model="isOpen"
        :title="title"
        :description="description"
        :type="type"
        @close="cancelModal"
    >
        <div class="flex flex-row gap-3">
            <div class="mt-4">
                <Button
                    :type="type"
                    :text="buttonYes ?? $t('yes')"
                    @click="confirmModal"
                />
            </div>
            <div class="mt-4">
                <Button
                    :type="type"
                    :text="buttonNo ?? $t('no')"
                    @click="cancelModal"
                />
            </div>
        </div>
    </Dialog>
</template>
