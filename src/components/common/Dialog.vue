<script setup lang="ts">
import {
Dialog,
DialogPanel,
DialogTitle,
TransitionChild,
TransitionRoot
} from '@headlessui/vue';
import { useVModel } from '@vueuse/core';

interface Properties {
    modelValue: boolean;
    title: string;
    description: string;
    buttonDescription?: string;
    type: 'error' | 'info' | 'success' | 'warning';
    initialFocus?: HTMLElement|null;
}

const props = withDefaults(defineProps<Properties>(), {
    type: 'info'
});

const emit = defineEmits(['update:modelValue']);
const isOpen = useVModel(props, 'modelValue', emit);

function close() {
    isOpen.value = false;
}
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog
            as="div"
            :initial-focus="initialFocus"
            class="relative z-10"
            :class="{
                'bg-yellow-100': type === 'warning',
                'bg-red-100': type === 'error',
                'bg-green-100': type === 'success'
            }"
            @close="close"
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
                                'bg-yellow-50': type === 'warning',
                                'bg-red-50': type === 'error',
                                'bg-green-50': type === 'success'
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
                                <Button
                                    :text="buttonDescription"
                                    :type="type"
                                    @click="close"
                                />
                            </div>
                            <slot></slot>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
