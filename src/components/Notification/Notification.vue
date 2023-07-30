<script setup lang="ts">
import { IconCircleCheckFilled, IconX } from '@tabler/icons-vue';
import { onMounted, ref } from 'vue';
import Badge from '../Badge.vue';

interface Properties {
    title: string;
    message?: string;
    type: 'success' | 'error' | 'warning';
    country?: {
        name: string;
        flag: string;
    };
    score?: number;
    timeout?: number;
}

const props = defineProps<Properties>();

const enabled = ref(true);
const timeout = props.timeout || 5000;
const close = () => {
    enabled.value = false;
};

const progress = ref(0);
const intervalDuration = 10;

onMounted(() => {
    const interval = setInterval(() => {
        progress.value = ((Date.now() - startTime) / timeout) * 100;
        if (progress.value >= 100) {
            close();
            clearInterval(interval);
        }
    }, intervalDuration);
});
const startTime = Date.now();
</script>

<template>
    <div class="fixed bottom-0 right-0 m-6 z-50">
        <transition name="fade-slide">
            <div v-if="enabled" class="m-auto">
                <div class="relative mt-3">
                    <div
                        class="absolute top-0 left-0 h-[4px] bg-green-300 rounded"
                        :style="{ width: `${progress}%` }"
                    ></div>
                </div>
                <div
                    class="bg-white border-gray-300 border p-3 shadow-lg rounded-md"
                >
                    <div class="flex flex-row">
                        <div class="px-2 flex gap-3 items-center">
                            <IconCircleCheckFilled
                                v-if="!country && !score"
                                class="w-8 h-8 text-green-500"
                            />
                            <template v-if="country && score">
                                <Badge :score="score" />
                                <img
                                    v-if="country"
                                    class="w-9 h-7 border-[1px] border-gray-700 rounded"
                                    :src="country.flag"
                                    :alt="country.name"
                                />
                            </template>
                        </div>
                        <div class="ml-2 mr-6">
                            <span>{{ title }}</span>
                            <span class="block text-gray-500">{{
                                message
                            }}</span>
                            <slot name="badge"></slot>
                        </div>
                        <div class="px-2">
                            <button @click="close">
                                <IconX
                                    class="w-6 h-6 text-gray-500 hover:text-gray-700 transition-all duration-300"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all 0.5s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateX(100px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
    opacity: 1;
    transform: translateX(0px);
}
</style>
