<script lang="ts">
import { defineComponent } from 'vue';
import UserInfo from '../components/UserInfo.vue';
import { User } from '../models/User';
let user: User = new User(1, 'John Doe', 'image', 1, new Date(), new Date());
export default defineComponent({
    name: 'Profile',
    components: { UserInfo },
    setup() {
        return { user };
    }
});
</script>

<template>
    <UserInfo :user="user"></UserInfo>
</template>
