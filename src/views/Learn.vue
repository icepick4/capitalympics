<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import LearnCapitals from '../components/Learning/Buttons/LearnCapitalsButton.vue';
import LearnFlags from '../components/Learning/Buttons/LearnFlagsButton.vue';
const router = useRouter();
const store = useStore();
const user = store.getters.user;
if (user === null) {
    router.push('/login');
}
</script>

<template>
    <div
        v-if="user !== null"
        class="flex flex-col justify-center items-center gap-10"
    >
        <h1 class="text-white text-center text-6xl">Hi {{ user.name }} !</h1>
        <div
            class="flex flex-col lg:flex-row justify-center items-center w-1/2 gap-5"
        >
            <LearnCapitals />
            <LearnFlags />
        </div>
    </div>
</template>
