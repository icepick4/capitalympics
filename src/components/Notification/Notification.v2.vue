<script setup lang="ts">
import type { Notification, NotificationType } from '@/plugins/notifications';
import { IconCircleCheckFilled, IconX } from '@tabler/icons-vue';
import { computed, onMounted, ref } from 'vue';
import Badge from '../Badge.vue';

const props = defineProps<{ notification: Notification }>();
const timeoutMapping: Record<NotificationType, number> = {
    success: 5000,
    warning: 7500,
    error: 15000,
}

const emit = defineEmits(['close']);
const close = () => emit('close');

const timeout = computed(() => timeoutMapping[props.notification.type])

const progress = ref(0);
const intervalDuration = 10;

onMounted(() => {
    const interval = setInterval(() => {
        progress.value = ((Date.now() - startTime) / timeout.value) * 100;
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
                class="absolute top-0 left-0 h-[4px] bg-green-300 rounded"
                :style="{ width: `${progress}%` }"
            ></div>
        </div>
        <div
            class="bg-white border-gray-300 border p-3 shadow-lg rounded-md"
        >
            <div class="flex flex-row">
                <div
                    class="px-2 flex gap-3 items-center"
                    v-if="!notification.flag && !notification.score"
                >
                    <IconCircleCheckFilled
                        class="w-8 h-8 text-green-500"
                    />
                </div>
                <div class="ml-3 mr-3">
                    <div
                        class="flex flex-row justify-between items-center mb-2"
                    >
                        <span>{{ notification.title }}</span>
                        <template v-if="notification.flag && notification.score">
                            <Badge :score="notification.score" />
                            <img
                                v-if="notification.flag"
                                class="w-12 h-8 border-[1px] border-gray-700 rounded"
                                :src="notification.flag"
                                :alt="notification.title"
                            />
                        </template>
                    </div>
                    <span class="block text-gray-500">{{
                        notification.message
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
</template>

