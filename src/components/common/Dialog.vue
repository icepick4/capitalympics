<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionChild,
    TransitionRoot
} from '@headlessui/vue';
import { ref, watch } from 'vue';

type DialogType = 'warning' | 'error' | 'success';

interface Properties {
    title: string;
    isOpen: boolean;
    description: string;
    buttonDescription?: string;
    buttonYes?: string;
    buttonNo?: string;
    type: DialogType;
}

const props = defineProps<Properties>();

const display = ref(props.isOpen);

watch(
    () => props.isOpen,
    (isOpen) => {
        display.value = isOpen;
    }
);

const emit = defineEmits(['close', 'confirm', 'cancel']);

function closeModal() {
    emit('close');
    display.value = false;
}

function confirmModal() {
    closeModal();
    emit('confirm');
}

function cancelModal() {
    closeModal();
    emit('cancel');
}
</script>

<template>
    <TransitionRoot appear :show="display" as="template">
        <Dialog
            as="div"
            @close="closeModal"
            :class="{
                'bg-yellow-100': props.type === 'warning',
                'bg-red-100': props.type === 'error',
                'bg-green-100': props.type === 'success'
            }"
            class="relative z-10"
        >
            <TransitionChild
                as="template"
                enter="duration-300 ease-out"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="duration-200 ease-in"
                leave-from="opacity-100"
                leave-to="opacity-0"
            >
                <div class="fixed inset-0 bg-black bg-opacity-40"></div>
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div
                    class="flex min-h-full items-center justify-center p-4 text-center"
                >
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <DialogPanel
                            :class="{
                                'bg-yellow-50': props.type === 'warning',
                                'bg-red-50': props.type === 'error',
                                'bg-green-50': props.type === 'success'
                            }"
                            class="w-full max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all"
                        >
                            <DialogTitle
                                as="h3"
                                class="text-lg font-medium leading-6 text-gray-900"
                            >
                                {{ title }}
                            </DialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-500">
                                    {{ description }}
                                </p>
                            </div>

                            <div v-if="buttonDescription" class="mt-4">
                                <button
                                    type="button"
                                    :class="{
                                        'bg-yellow-200':
                                            props.type === 'warning',
                                        'bg-red-200': props.type === 'error',
                                        'bg-green-200':
                                            props.type === 'success',
                                        'hover:bg-yellow-300':
                                            props.type === 'warning',
                                        'hover:bg-red-300':
                                            props.type === 'error',
                                        'hover:bg-green-300':
                                            props.type === 'success'
                                    }"
                                    class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                    @click="closeModal"
                                >
                                    {{ buttonDescription }}
                                </button>
                            </div>
                            <div class="flex flex-row gap-3" v-else>
                                <div class="mt-4">
                                    <button
                                        type="button"
                                        :class="{
                                            'bg-yellow-200':
                                                props.type === 'warning',
                                            'bg-red-200':
                                                props.type === 'error',
                                            'bg-green-200':
                                                props.type === 'success',
                                            'hover:bg-yellow-300':
                                                props.type === 'warning',
                                            'hover:bg-red-300':
                                                props.type === 'error',
                                            'hover:bg-green-300':
                                                props.type === 'success'
                                        }"
                                        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                        @click="confirmModal"
                                    >
                                        {{ buttonYes ?? 'Yes' }}
                                    </button>
                                </div>
                                <div class="mt-4">
                                    <button
                                        type="button"
                                        :class="{
                                            'bg-yellow-200':
                                                props.type === 'warning',
                                            'bg-red-200':
                                                props.type === 'error',
                                            'bg-green-200':
                                                props.type === 'success',
                                            'hover:bg-yellow-300':
                                                props.type === 'warning',
                                            'hover:bg-red-300':
                                                props.type === 'error',
                                            'hover:bg-green-300':
                                                props.type === 'success'
                                        }"
                                        class="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium"
                                        @click="cancelModal"
                                    >
                                        {{ buttonNo ?? 'No' }}
                                    </button>
                                </div>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
