<script setup lang="ts">
defineProps<{
    text: string;
    learningType: string;
}>();
</script>

<template>
    <div class="flex flex-row gap-3">
        <p v-if="learningType == 'flag'" class="w-28">
            {{ $t('flag') }}
        </p>
        <p v-if="learningType == 'capital'" class="w-28">
            {{ $t('capital') }}
        </p>
        <span
            class="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-purple-700/10"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                class="icon icon-tabler icon-tabler-crown h-5 pr-1"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M12 6l4 6l5 -4l-2 10h-14l-2 -10l5 4z"></path>
            </svg>
            {{ text }}
        </span>
    </div>
</template>
