<script setup lang="ts">
import type { Notification, NotificationType } from '@/plugins/notifications';
import {
    IconCircleCheckFilled,
    IconExclamationCircle,
    IconX
} from '@tabler/icons-vue';
import { computed, onMounted, ref } from 'vue';
import Badge from '../Badge.vue';

const props = defineProps<{ notification: Notification }>();
const timeoutMapping: Record<NotificationType, number | undefined> = {
    success: 5000,
    warning: 7500,
    error: undefined
};

const emit = defineEmits(['close']);
const close = () => emit('close');

const timeout = computed(() => timeoutMapping[props.notification.type]);

const progress = ref(0);
const intervalDuration = 10;

onMounted(() => {
    if (!timeout.value) return;
    const interval = setInterval(() => {
        progress.value = ((Date.now() - startTime) / timeout.value!) * 100;
        if (progress.value >= 100) {
            close();
            clearInterval(interval);
        }
    }, intervalDuration);
});
const startTime = Date.now();
</script>

<template>
    <div class="w-full">
        <div class="relative">
            <div
                class="absolute top-0 left-0 h-[4px] rounded"
                :class="{
                    'bg-green-300': notification.type === 'success',
                    'bg-yellow-300': notification.type === 'warning'
                }"
                :style="{ width: `${progress}%` }"
            ></div>
        </div>
        <div class="bg-white border-gray-300 border p-3 shadow-lg rounded-md">
            <div class="flex flex-col gap-2">
                <div class="flex flex-row justify-between">
                    <div class="flex flex-row gap-3 items-center">
                        <div
                            class="flex gap-3 items-center"
                            v-if="!notification.flag && !notification.score"
                        >
                            <IconCircleCheckFilled
                                v-if="notification.type === 'success'"
                                class="w-8 h-8 text-green-500"
                            />
                            <IconExclamationCircle
                                v-else-if="notification.type === 'error'"
                                class="w-8 h-8 text-red-500"
                            />
                        </div>
                        <img
                            v-else
                            class="w-9 h-6 sm:w-12 sm:h-8 border-[1px] border-gray-700 rounded"
                            :src="notification.flag"
                            :alt="notification.title"
                        />
                        <span class="text-base sm:text-lg">{{
                            notification.title
                        }}</span>
                    </div>
                    <div class="px-2">
                        <button @click="close">
                            <IconX
                                class="w-6 h-6 text-gray-500 hover:text-gray-700 transition-all duration-300"
                            />
                        </button>
                    </div>
                </div>
                <div class="flex flex-row justify-start items-center gap-3">
                    <span
                        class="text-sm sm:text-base px-1 block text-gray-500"
                        >{{ notification.message }}</span
                    >
                    <Badge
                        v-if="notification.score"
                        :score="notification.score"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
