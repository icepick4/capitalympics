<script setup lang="ts">
import { User } from '../models/User';
defineProps<{
    user: User;
}>();
const formatDate = (date: Date) => {
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = parseInt(`0${minutes}`);
    }
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
