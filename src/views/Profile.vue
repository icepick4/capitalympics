<script setup lang="ts">
import { useStore } from 'vuex';
import UserInfo from '../components/UserInfo.vue';
import { User } from '../models/User';

const store = useStore();
const user: User = store.getters.user;
</script>

<template>
    <UserInfo></UserInfo>
</template>
