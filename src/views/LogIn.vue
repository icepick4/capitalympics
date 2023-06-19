<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import Loader from '../components/Loader.vue';
import Modal from '../components/Modal.vue';
import { getCurrentMySQLDate } from '../utils/common';
const userFound = ref(false);
const signed = ref(false);
const displayErrorForm = ref(false);
const hasLoggedIn = ref(false);
const username = ref('');
const password = ref('');
const router = useRouter();
const store = useStore();
const t = useI18n();

const handleSignInError = () => {
    hasLoggedIn.value = false;
    signed.value = true;
};

const validateForm = () => {
    if (!username.value || !password.value) {
        displayErrorForm.value = true;
        return false;
    }
    return true;
};

const logIn = async () => {
    if (!validateForm()) {
        return;
    }
    try {
        signed.value = false;
        hasLoggedIn.value = true;
        await store.dispatch('logIn', {
            username: username.value,
            password: password.value,
            last_activity: getCurrentMySQLDate()
        });
        t.locale.value = store.getters.user.language;
        setTimeout(() => {
            hasLoggedIn.value = false;
            router.push('/profile');
        }, 2000);
    } catch (e) {
        userFound.value = false;
        signed.value = true;
    }
};
</script>

<template>
    <BlurContainer v-if="hasLoggedIn || displayErrorForm">
        <Loader v-if="!displayErrorForm && !signed" />
        <Modal
            v-else-if="displayErrorForm"
            :title="$t('error')"
            :message="$t('fillAllFields')"
            background-color="white"
            title-color="error"
            :redirection="null"
            @close="displayErrorForm = false"
        />
        <Modal
            v-else-if="!userFound && signed"
            :title="$t('error')"
            message="$t('userNotFound')"
            background-color="white"
            title-color="error"
            :redirection="null"
            @close="handleSignInError"
        />
    </BlurContainer>
    <section
        class="relative py-10 bg-gray-900 sm:py-16 lg:py-24 h-full flex items-center"
    >
        <div class="absolute inset-0">
            <img class="object-cover w-full h-full" src="/signup.jpg" alt="" />
        </div>
        <div class="absolute bottom-0 right-1 text-white z-10">
            Photo of
            <a
                href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                >NASA</a
            >
            on
            <a
                href="https://unsplash.com/fr/photos/6-jTZysYY_U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                >Unsplash</a
            >
        </div>

        <div class="relative max-w-lg px-4 mx-auto sm:px-0">
            <div
                class="overflow-hidden bg-gradient rounded-md shadow-md p-0 sm:p-5 lg:p-8"
            >
                <div class="px-4 py-6 sm:px-8 sm:py-7">
                    <div class="text-center">
                        <h2 class="text-3xl font-bold text-gray-900">
                            {{ $t('welcomeBack') }}
                        </h2>
                        <p class="mt-2 text-base text-black">
                            {{ $t('noAccount') }}
                            <RouterLink
                                to="/signup"
                                class="text-black hover:underline italic"
                            >
                                {{ $t('createAccount') }}</RouterLink
                            >
                            >
                        </p>
                    </div>

                    <form @submit.prevent="logIn" class="space-y-5">
                        <div>
                            <label
                                for=""
                                class="text-base font-medium text-gray-900"
                            >
                                {{ $t('username') }}
                            </label>
                            <div
                                class="mt-2.5 relative text-gray-400 focus-within:text-gray-600"
                            >
                                <div
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                </div>

                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-black"
                                    v-model="username"
                                />
                            </div>
                        </div>
                        <div>
                            <label
                                for=""
                                class="text-base font-medium text-gray-900"
                            >
                                {{ $t('password') }}
                            </label>
                            <div
                                class="mt-2.5 relative text-gray-400 focus-within:text-gray-600"
                            >
                                <div
                                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                                >
                                    <svg
                                        class="w-5 h-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                                        />
                                    </svg>
                                </div>

                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-black"
                                    v-model="password"
                                />
                            </div>
                        </div>

                        <input
                            class="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-black transition-all duration-200 bg-white hover:scale-105 delay-100 rounded-md cursor-pointer"
                            type="submit"
                            value="Log in"
                        />
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
