<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from './BlurContainer.vue';
import Loader from './Loader.vue';

const router = useRouter();
const store = useStore();
const user = ref(store.getters.user);
const displayMobileMenu = ref(false);
watchEffect(() => {
    user.value = store.getters.user;
});
const hasLoggedOut = ref(false);
const logOut = () => {
    hasLoggedOut.value = true;
    setTimeout(() => {
        store.dispatch('logOut');
        hasLoggedOut.value = false;
        router.push('/');
    }, 1000);
};
</script>

<template>
    <BlurContainer v-if="hasLoggedOut">
        <Loader title="Logging out ..." />
    </BlurContainer>
    <div class="flex items-center justify-center w-full">
        <div class="flex flex-row w-1/2 justify-between h-auto">
            <RouterLink to="/" class="w-auto h-full p-4">
                <img src="/logo.png" alt="logo" class="w-28 h-28" />
            </RouterLink>
            <div class="flex flex-row justify-center items-center gap-7">
                <RouterLink
                    to="/countries"
                    class="flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    Countries
                </RouterLink>
                <RouterLink
                    to="/learn"
                    class="flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    Learn
                </RouterLink>
                <RouterLink
                    to="/about"
                    class="flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    About
                </RouterLink>
                <RouterLink
                    to="/quiz"
                    class="flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    Quiz
                </RouterLink>
                <RouterLink
                    to="/login"
                    class="flex justify-end items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user === null"
                >
                    Log In</RouterLink
                >
                <RouterLink
                    to="/signup"
                    class="flex justify-center items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user === null"
                >
                    Sign Up</RouterLink
                >
                <RouterLink
                    to="/profile"
                    class="flex justify-end items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user !== null"
                >
                    Profile</RouterLink
                >
                <div
                    class="flex justify-center items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out cursor-pointer"
                    @click="logOut"
                    v-if="user !== null"
                >
                    Log out
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-underline {
    display: inline-block;
    position: relative;
    text-decoration: none;
}
.center-underline::after {
    content: '';
    background-color: #000;
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 2px;
    transition: all 0.2s ease-in-out;
    transform: scaleX(0);
}

.center-underline:hover::after {
    transform: scaleX(1);
}
</style>
