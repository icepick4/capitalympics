<script setup lang="ts">
import { useStore } from '@/store';
import { IconUser } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { onMounted, onUnmounted, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { baseImageURL } from '@/utils/common';

const { isAuthenticated } = storeToRefs(useStore());
const { user } = storeToRefs(useStore());

const isDropdownOpen = ref(false);
const clickCount = ref(0);

function toggleDropdown() {
    isDropdownOpen.value = !isDropdownOpen.value;
    if (isDropdownOpen.value) {
        document.addEventListener('click', closeMenuOnClickOutside);
    } else {
        clickCount.value = 0;
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
}

const closeMenuOnClickOutside = (event: MouseEvent) => {
    clickCount.value++;
    if (clickCount.value === 1) {
        return;
    }

    if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        isDropdownOpen.value = false;
        clickCount.value = 0;
        document.removeEventListener('click', closeMenuOnClickOutside);
    }
};

const menuRef = ref<HTMLElement | null>(null);

onMounted(() => {
    menuRef.value = document.querySelector('.menu');
});

onUnmounted(() => {
    document.removeEventListener('click', closeMenuOnClickOutside);
});

const imageAvailable = ref(false);

const checkImage = async () => {
    try {
        const response = await fetch(baseImageURL + user.value?.id + '.png', {
            method: 'HEAD'
        });
        if (response.ok) {
            imageAvailable.value = true;
        }
    } catch (error) {
        imageAvailable.value = false;
    }
};

checkImage();
</script>

<template>
    <div class="flex items-center justify-center w-full">
        <div
            class="header flex flex-row w-full md:w-3/4 2xl:w-7/12 justify-between h-auto relative p-7"
        >
            <RouterLink
                to="/"
                class="w-auto h-full flex justify-center items-center"
            >
                <img
                    src="/logo.png"
                    alt="logo"
                    class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-22 xl:h-22"
                />
            </RouterLink>

            <div class="header flex flex-row justify-center items-center gap-7">
                <RouterLink
                    to="/countries"
                    class="hidden xl:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                >
                    {{ $t('countries') }}
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
                <template v-if="!isAuthenticated">
                    <RouterLink
                        to="/login"
                        class="hidden sm:flex justify-end items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    >
                        {{ $t('login') }}</RouterLink
                    >
                    <RouterLink
                        to="/signup"
                        class="hidden sm:flex justify-center items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    >
                        {{ $t('signup') }}</RouterLink
                    >
                </template>
                <template v-else>
                    <RouterLink
                        to="/learn"
                        class="hidden sm:flex items-center font-medium text-black no-underline center-underline text-xl transition-all duration-75 ease-in-out"
                    >
                        {{ $t('learn') }}
                    </RouterLink>
                    <RouterLink
                        to="/profile"
                        class="hidden sm:flex justify-end items-center font-medium text-black no-underline text-xl transition-all duration-150 ease-in-out hover:scale-110"
                    >
                        <IconUser
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4 hover:cursor-pointer"
                            v-if="!imageAvailable"
                        />
                        <img
                            crossorigin="anonymous"
                            :src="baseImageURL + user?.id + '.png'"
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4 hover:cursor-pointer"
                            v-else
                        />
                    </RouterLink>
                </template>
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
                ref="menu"
            >
                <div class="py-2" @click="toggleDropdown">
                    <RouterLink
                        v-if="isAuthenticated"
                        to="/profile"
                        class="block sm:hidden px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('profile') }}</RouterLink
                    >
                    <RouterLink
                        v-if="!isAuthenticated"
                        to="/login"
                        class="block sm:hidden px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('login') }}</RouterLink
                    >
                    <RouterLink
                        v-if="!isAuthenticated"
                        to="/signup"
                        class="block sm:hidden px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('signup') }}</RouterLink
                    >
                    <RouterLink
                        to="/learn"
                        class="block sm:hidden px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('learn') }}</RouterLink
                    >
                    <RouterLink
                        to="/countries"
                        class="block px-4 py-2 text-black no-underline text-lg transition-all duration-75 ease-in-out hover:text-gray-500"
                    >
                        {{ $t('countries') }}
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
        /* flex-direction: column; */
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
