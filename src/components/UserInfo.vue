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
    return date.toLocaleDateString();
};
</script>

<template>
    <p>{{ user.name }}</p>
    <p>{{ formatDate(new Date(user.created_at)) }}</p>
</template>
