<script setup lang="ts">
defineProps<{
    text?: string;
    size?: 'xs' | 'sm' | 'md' | 'lg';
}>();
</script>

<template>
    <div class="px-2 p-1 border border-white rounded-3xl">
        <p
            class="text-white"
            :class="{
                'text-xs': size === 'xs',
                'text-sm': size === 'sm',
                'text-base': size === 'md',
                'text-xl': size === 'lg'
            }"
        >
            {{ text }}
        </p>
    </div>
</template>
