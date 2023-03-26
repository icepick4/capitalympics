<script setup lang="ts">
import { PropType } from 'vue';
import { User } from '../models/User';
const props = defineProps({
    user: {
        type: Object as PropType<User>,
        required: true
    }
});
const formatDate = (date: Date) => {
    return `The ${date.getDate()} of ${date.toLocaleString('default', {
        month: 'long'
    })} of ${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}`;
};
</script>

<template>
    <p>{{ user.name }}</p>
    <p>{{ formatDate(new Date(user.created_at)) }}</p>
    <p>Last activity at {{ formatDate(new Date(user.last_activity)) }}</p>
</template>
