<script setup lang="ts">
import UserInfo from '../components/UserInfo.vue';
import { User } from '../models/User';
let user: User = new User(1, 'John Doe', 'image', 1, new Date(), new Date());
</script>

<template>
    <UserInfo :user="user"></UserInfo>
</template>
