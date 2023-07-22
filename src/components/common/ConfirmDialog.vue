<script setup lang="ts">
import { useVModel } from '@vueuse/core';

const props = defineProps<{
    modelValue: boolean;
    title: string;
    description: string;
    buttonYes: string;
    buttonNo: string;
    type: 'warning' | 'error' | 'success';
}>();

const emit = defineEmits(['update:modelValue', 'confirm', 'cancel']);

const isOpen = useVModel(props, 'modelValue', emit);

const setIsOpen = (value: boolean) => {
    isOpen.value = value;
};

const confirmModal = () => {
    emit('confirm');
};

const cancelModal = () => {
    emit('cancel');
};
</script>

<template>
    <Dialog
        v-model="isOpen"
        :title="title"
        :description="description"
        :type="type"
        @close="setIsOpen"
    >
        <div class="flex flex-row gap-3">
            <div class="mt-4">
                <Button
                    :type="type"
                    :text="buttonYes ?? 'Yes'"
                    @click="confirmModal"
                />
            </div>
            <div class="mt-4">
                <Button
                    :type="type"
                    :text="buttonNo ?? 'No'"
                    @click="cancelModal"
                />
            </div>
        </div>
    </Dialog>
</template>
