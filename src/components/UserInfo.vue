<script lang="ts">
import { defineComponent } from 'vue';
import { User } from '../models/User';
export default defineComponent({
    name: 'UserInfo',
    props: {
        user: {
            type: User,
            required: true
        }
    }
});
</script>

<template>
    <p>{{ user.name }}</p>
</template>
