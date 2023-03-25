<script setup lang="ts">
import { reactive, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import ApiService from '../services/apiService';
interface inputState {
    content: string;
    hasTyped: boolean;
}
const username: inputState = reactive({
    content: '',
    hasTyped: false
});
const password: inputState = reactive({
    content: '',
    hasTyped: false
});
const passwordConfirmation: inputState = reactive({
    content: '',
    hasTyped: false
});
const numberOfPeople = ref(0);
const router = useRouter();

const getNumberOfPeople = async () => {
    const response = await ApiService.getUsersCount();
    numberOfPeople.value = response;
};

getNumberOfPeople();

const signUp = async () => {
    const response = await ApiService.signUp(
        username.content,
        password.content
    );
    if (response) {
        router.push('/login');
    } else {
        alert('Username already taken');
    }
};

const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password.content)) {
        return false;
    } else {
        return true;
    }
};

const typedPassword = () => {
    password.hasTyped = true;
};

const validatePasswordConfirmation = () => {
    if (password.content !== passwordConfirmation.content) {
        return false;
    } else {
        return true;
    }
};

const typedPasswordConfirmation = () => {
    passwordConfirmation.hasTyped = true;
};

const validateUsername = () => {
    console.log(username.content.length);
    console.log(username.hasTyped);
    if (username.content.length < 1) {
        return false;
    } else {
        return true;
    }
};

const typedUsername = () => {
    username.hasTyped = true;
};

const isFormValid = () => {
    if (
        validatePassword() &&
        validatePasswordConfirmation() &&
        validateUsername()
    ) {
        return true;
    } else {
        return false;
    }
};
</script>

<template>
    <section class="bg-primary h-full flex w-full justify-center">
        <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
            <div
                class="relative flex items-center px-4 pb-10 pt-10 sm:pb-16 md:justify-center lg:pb-24 bg-primary sm:px-6 lg:px-8"
            >
                <div class="absolute top-0 right-1 text-white z-40">
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
                <div class="absolute inset-0">
                    <img
                        class="object-cover w-full h-full"
                        src="/signup.jpg"
                        alt=""
                    />
                </div>
                <div
                    class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
                ></div>

                <div class="relative">
                    <div
                        class="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl"
                    >
                        <h3 class="text-4xl font-bold text-white">
                            {{ numberOfPeople }} people are already using
                            <br class="hidden xl:block" />
                            Capitalympics!
                        </h3>
                        <ul
                            class="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4"
                        >
                            <li class="flex items-center space-x-3">
                                <div
                                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full"
                                >
                                    <img src="/icons/medal.png" alt="medal" />
                                </div>
                                <span class="text-xl font-medium text-white">
                                    Play the quiz and learn more
                                </span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <div
                                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full"
                                >
                                    <img src="/icons/medal.png" alt="medal" />
                                </div>
                                <span class="text-xl font-medium text-white">
                                    Access to the capitals learning process
                                </span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <div
                                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full"
                                >
                                    <img src="/icons/medal.png" alt="medal" />
                                </div>
                                <span class="text-xl font-medium text-white">
                                    Access to the flags learning process
                                </span>
                            </li>
                            <li class="flex items-center space-x-3">
                                <div
                                    class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full"
                                >
                                    <img src="/icons/medal.png" alt="medal" />
                                </div>
                                <span class="text-xl font-medium text-white">
                                    Many statistics all along your learning
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <div
                class="flex items-center justify-center px-4 py-10 bg-primary sm:px-6 lg:px-8 sm:py-16 lg:py-24"
            >
                <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                    <h2
                        class="text-3xl font-bold leading-tight text-black sm:text-4xl"
                    >
                        Sign up to Capitalympics
                    </h2>
                    <p class="mt-2 text-base text-black">
                        Already have an account?
                        <RouterLink
                            to="/login"
                            class="font-medium text-black hover:text-blue-500 hover:underline"
                        >
                            Log in
                        </RouterLink>
                    </p>

                    <form action="#" method="POST" class="mt-8">
                        <div class="space-y-5">
                            <div>
                                <label
                                    for=""
                                    class="text-base font-medium text-gray-900"
                                >
                                    Username
                                </label>
                                <span
                                    v-if="
                                        username.hasTyped && !validateUsername()
                                    "
                                    class="text-error text-sm ml-1 text-center"
                                    >Must be at least 1 character long</span
                                >
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
                                        class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-blue-600"
                                        @input="typedUsername"
                                        v-model="username.content"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for=""
                                    class="text-base font-medium text-gray-900"
                                >
                                    Password
                                </label>
                                <span
                                    v-if="
                                        !validatePassword() && password.hasTyped
                                    "
                                    class="text-error text-sm ml-1 text-center"
                                    >Must be at least 8 characters long and
                                    contain at least one number and one capital
                                    letter</span
                                >
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
                                        class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-blue-600"
                                        @input="typedPassword"
                                        v-model="password.content"
                                    />
                                </div>
                            </div>

                            <div>
                                <label
                                    for=""
                                    class="text-base font-medium text-gray-900"
                                >
                                    Confirm password
                                </label>
                                <span
                                    v-if="
                                        !validatePasswordConfirmation &&
                                        password.hasTyped
                                    "
                                    class="text-error text-center text-sm ml-1"
                                >
                                    Does not match
                                </span>
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
                                        placeholder="Confirm your password"
                                        class="block w-full py-4 pl-10 pr-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 caret-blue-600"
                                        @input="typedPasswordConfirmation"
                                        v-model="passwordConfirmation.content"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    class="inline-flex items-center bg-white justify-center w-full px-4 py-4 text-base font-semibold text-black transition-all duration-200 border border-transparent rounded-md bg-gradient-to-r from-fuchsia-600 to-blue-600 focus:outline-none hover:scale-105 delay-100"
                                    @click="signUp"
                                    :disabled="!isFormValid"
                                >
                                    Sign up
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>
