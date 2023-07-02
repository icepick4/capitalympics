<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '../models/User';

const store = useStore();
const user = ref<User | null>(store.getters.user);
watchEffect(() => {
    user.value = store.getters.user;
});

const isDropdownOpen = ref(false);

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
}
</script>

<template>
    <div class="flex items-center justify-center w-full">
        <div
            class="header flex flex-row w-full sm:w-full md:w-3/4 2xl:w-1/2 justify-between h-auto relative p-7"
        >
            <RouterLink
                to="/"
                class="w-auto h-full flex justify-center items-center"
            >
                <img
                    src="/logo2.png"
                    alt="logo"
                    class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22"
                />
                <!-- <h1 class="text-4xl font-bold">Capitalympics</h1> -->
            </RouterLink>

            <div class="header flex flex-row justify-center items-center gap-7">
                <RouterLink
                    to="/countries"
                    class="hidden xl:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    {{ $t('countries') }}
                </RouterLink>
                <RouterLink
                    to="/learn"
                    class="hidden xl:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    {{ $t('learn') }}
                </RouterLink>
                <RouterLink
                    to="/about"
                    class="hidden xl:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    {{ $t('about') }}
                </RouterLink>
                <RouterLink
                    to="/quiz"
                    class="hidden xl:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    {{ $t('quiz') }}
                </RouterLink>
                <RouterLink
                    to="/login"
                    class="flex justify-end items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user === null"
                >
                    {{ $t('login') }}</RouterLink
                >
                <RouterLink
                    to="/signup"
                    class="flex justify-center items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user === null"
                >
                    {{ $t('signup') }}</RouterLink
                >
                <RouterLink
                    to="/profile"
                    class="flex justify-end items-center font-medium text-black no-underline text-xl transition-all duration-150 ease-in-out hover:scale-110"
                    v-if="user !== null"
                >
                    <img
                        src="/icons/default_profile.png"
                        alt="avatar"
                        class="w-10 h-10 rounded-full"
                    />
                </RouterLink>
                <RouterLink
                    to="/learn"
                    class="xl:hidden flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    v-if="user !== null"
                >
                    {{ $t('learn') }}
                </RouterLink>
            </div>
            <div
                class="flex flex-row justify-center items-center gap-7 xl:hidden"
            >
                <button
                    @click="toggleDropdown"
                    class="focus:scale-75 hover:scale-110 transition-all duration-150 ease-in-out"
                    v-if="!isDropdownOpen"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"
                        ></path>
                    </svg>
                </button>
                <button
                    @click="toggleDropdown"
                    class="focus:scale-75 hover:scale-110 transition-all duration-150 ease-in-out"
                    v-if="isDropdownOpen"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                        ></path>
                    </svg>
                </button>
            </div>
            <div
                class="menu w-40 bg-white rounded-lg shadow-lg xl:hidden z-50 absolute top-16 sm:top-20 right-3 sm:right-0"
                v-show="isDropdownOpen"
                :class="{
                    'fade-left': isDropdownOpen
                }"
            >
                <div class="py-2">
                    <RouterLink
                        to="/countries"
                        class="block px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('countries') }}
                    </RouterLink>
                    <RouterLink
                        to="/learn"
                        class="block px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                        v-if="user === null"
                    >
                        {{ $t('learn') }}
                    </RouterLink>
                    <RouterLink
                        to="/about"
                        class="block px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('about') }}
                    </RouterLink>
                    <RouterLink
                        to="/quiz"
                        class="block px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('quiz') }}
                    </RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.center-underline {
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

@media (max-width: 375px) {
    .header {
        flex-direction: column;
        gap: 2rem;
    }

    .menu {
        width: 100%;
        height: auto;
        right: 0;
        top: 100%;
    }
}
</style>
