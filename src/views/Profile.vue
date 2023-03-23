<script setup lang="ts">
import { useRouter } from 'vue-router';
import UserInfo from '../components/UserInfo.vue';
import { User } from '../models/User';
import { getToken, getUserData } from '../utils/common';
const router = useRouter();
const token = getToken();
if (!token) {
    router.push('/login');
}
const user: User | null = getUserData();
</script>

<template>
    <UserInfo v-if="user" :user="user"></UserInfo>
</template>
