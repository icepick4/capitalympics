<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UserInfo from '../components/UserInfo.vue';
import { User } from '../models/User';

const store = useStore();
const router = useRouter();

const token = store.getters.token;
if (!token) {
    router.push('/login');
}
const user: User = store.getters.user;
</script>

<template>
    <UserInfo v-if="user" :user="user"></UserInfo>
</template>
