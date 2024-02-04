<script setup lang="ts">
import { Maybe } from '@/types/common';
import { useConfirmDialog } from '@vueuse/core';
import { ref } from 'vue';
import Dialog from './Dialog.vue';

export interface ConfirmDialogOptions {
    description: string;
    title: string;
    cancelText: string;
    confirmText?: string;
    type?: 'success' | 'warning' | 'error' | 'info';
}

const emit = defineEmits(['cancel', 'confirm']);
const props = defineProps<ConfirmDialogOptions>();
const type = ref(props.type || 'warning');
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
        :type="type"
        :description="description"
        :initial-focus="confirmBtn"
        @update:model-value="dialog.cancel"
    >
        <div class="mt-4 flex items-center justify-start gap-3 rounded-b-lg">
            <Button
                v-if="confirmText"
                ref="confirmBtn"
                :text="confirmText"
                :type="type"
                @click="dialog.confirm"
            />
            <Button :text="cancelText" :type="type" @click="dialog.cancel" />
        </div>
    </Dialog>
</template>
