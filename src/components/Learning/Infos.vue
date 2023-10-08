<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';

defineProps<{
    show: boolean;
}>();

const emit = defineEmits(['close']);
</script>

<template>
    <div
        class="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg m-5 sm:m-20 md:m-52 fixed top-0 bottom-0 left-0 right-0 z-50 overflow-y-scroll custom-scroll"
        v-if="show"
    >
        <IconX
            class="w-8 h-8 hover:scale-110 hover:cursor-pointer transition-all absolute top-3 right-3"
            @click="emit('close')"
        />
        <h2 class="text-4xl font-semibold mb-6">{{ $t('infosTitle') }}</h2>
        <div class="text-gray-700 mb-6">
            <p class="text-xl">
                {{ $t('infos1') }}
            </p>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    1
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos2') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    2
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos3') }}
                    </p>
                    <ul class="ml-6 list-disc">
                        <li class="text-lg">
                            {{ $t('infos4') }}
                        </li>
                        <li class="text-lg">
                            {{ $t('infos5') }}
                        </li>
                        <li class="text-lg">
                            {{ $t('infos6') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    3
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos7') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    4
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos8') }}
                    </p>
                    <ul class="ml-6 list-disc">
                        <li class="text-lg">
                            {{ $t('infos9') }}
                        </li>
                        <li class="text-lg">
                            {{ $t('infos10') }}
                        </li>
                        <li class="text-lg">
                            {{ $t('infos11') }}
                        </li>
                        <li class="text-lg">
                            {{ $t('infos12') }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    5
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos13') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="mb-6">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    6
                </div>
                <div>
                    <p class="text-lg">
                        {{ $t('infos14') }}
                    </p>
                </div>
            </div>
        </div>
        <div class="text-gray-700 mt-4">
            <p class="text-lg">
                {{ $t('infos15') }}
            </p>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: #4a90e2;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 6px;
}
</style>
