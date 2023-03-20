<script setup lang="ts">
import { User } from '../models/User';
const props = defineProps({
    user: {
        type: User,
        required: true
    }
});
</script>

<template>
    <p>{{ user.name }}</p>
</template>
