<script setup lang="ts">
import { Maybe } from '@/types/common';
import { useConfirmDialog } from '@vueuse/core';
import { ref } from 'vue';
import Dialog from './Dialog.vue';

export interface ConfirmDialogOptions {
    description: string;
    title: string;
    cancelText: string;
    confirmText: string;
}

const emit = defineEmits(['cancel', 'confirm']);
defineProps<ConfirmDialogOptions>();

const isRevealed = ref(true);
const dialog = useConfirmDialog();

const confirmBtn = ref<Maybe<HTMLElement>>(null);

dialog.onConfirm(() => emit('confirm'));
dialog.onCancel(() => emit('cancel'));
</script>

<template>
    <Dialog
        :model-value="isRevealed"
        :title="title"
        type="warning"
        :description="description"
        :initial-focus="confirmBtn"
        @update:model-value="dialog.cancel"
    >
        <div class="mt-4 flex items-center justify-start gap-3 rounded-b-lg">
            <Button :text="cancelText" type="warning" @click="dialog.cancel" />
            <Button ref="confirmBtn" :text="confirmText" type="warning" @click="dialog.confirm" />
        </div>
    </Dialog>
</template>
