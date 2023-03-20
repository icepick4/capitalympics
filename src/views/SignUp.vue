<script setup lang="ts">
import axios from 'axios';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
const username = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const numberOfPeople = ref(0);
const router = useRouter();

axios.get('http://localhost:3000/users').then((response) => {
    numberOfPeople.value = response.data.count;
});

const signup = async () => {
    axios
        .post('http://localhost:3000/users', {
            user: {
                name: username.value,
                password: password.value
            }
        })
        .then((response) => {
            router.push('/signin');
        })
        .catch((error) => {
            console.log(error);
        });
};

const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password.value)) {
        return false;
    } else {
        return true;
    }
};

const validatePasswordConfirmation = () => {
    if (password.value !== passwordConfirmation.value) {
        return false;
    } else {
        return true;
    }
};

const validateUsername = () => {
    if (username.value.length < 1) {
        return false;
    } else {
        return true;
    }
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
    <div class="flex justify-center items-center w-full my-20">
        <div class="flex flex-row w-3/5 h-full justify-center items-center">
            <div
                class="flex flex-col bg-white h-full w-full justify-evenly items-center gap-3 py-10 px-6 rounded-l-xl border-2 border-black"
            >
                <h1 class="text-4xl">Discover the world !</h1>
                <img src="../assets/logo.png" alt="logo" class="w-1/2 h-auto" />
                <h1 class="text-2xl underline">By signing up you get :</h1>
                <ul class="flex flex-col gap-2">
                    <li class="flex flex-row gap-5">
                        <img
                            src="../assets/icons/medal.png"
                            alt="medal"
                            class="w-11 h-11"
                        />
                        <p>Access to the capitals learning process</p>
                    </li>
                    <li class="flex flex-row gap-5">
                        <img
                            src="../assets/icons/medal.png"
                            alt="medal"
                            class="w-11 h-11"
                        />
                        <p>Access to the flags learning process</p>
                    </li>
                    <li class="flex flex-row gap-5">
                        <img
                            src="../assets/icons/medal.png"
                            alt="medal"
                            class="w-11 h-11"
                        />
                        <p>Many statistics all along your learning</p>
                    </li>
                </ul>
                <div class="flex justify-end items-end h-full">
                    <h1 class="text-xl">
                        {{ numberOfPeople }} people have already signed up !
                    </h1>
                </div>
            </div>
            <div
                class="flex flex-col bg-background justify-evenly h-full w-full px-10 py-6 gap-0 rounded-r-xl border-2 border-l-0 border-black"
            >
                <h1 class="text-4xl text-center">Sign up to Capitalympics!</h1>
                <div class="flex flex-col items-center">
                    <div class="w-3/4">
                        <p class="ml-2">Username</p>
                        <input
                            class="rounded-md p-2 w-full border-2 border-black"
                            type="text"
                            placeholder="Username"
                            v-model="username"
                            @input="validateUsername()"
                        />
                    </div>
                    <span
                        v-if="!validateUsername()"
                        class="text-error text-sm ml-2 text-center"
                        >Username must be at least 1 character long</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-3/4">
                        <p class="ml-2">Password</p>
                        <input
                            class="rounded-md p-2 w-full border-2 border-black"
                            type="password"
                            placeholder="Password"
                            v-model="password"
                            @input="validatePassword()"
                        />
                    </div>
                    <span
                        v-if="!validatePassword()"
                        class="text-error text-sm ml-2 text-center"
                        >Password must be at least 8 characters long and contain
                        at least one number and one capital letter</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <div class="w-3/4">
                        <p class="ml-2">Confirm Password</p>
                        <input
                            class="rounded-md p-2 w-full border-2 border-black"
                            type="password"
                            placeholder="Confirm Password"
                            v-model="passwordConfirmation"
                            @input="validatePasswordConfirmation()"
                        />
                    </div>
                    <span
                        v-if="!validatePasswordConfirmation()"
                        class="text-error text-center text-sm ml-2"
                        >Passwords do not match</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <button
                        class="bg-primary hover:bg-secondary w-3/4 hover:scale-105 transition-all duration-100 delay-75 text-xl rounded-md p-2 text-center"
                        @click="signup"
                        :disabled="!isFormValid"
                    >
                        Sign Up
                    </button>
                    <RouterLink
                        :to="{ name: 'SignIn' }"
                        class="text-primary text-center hover:text-secondary text-lg marker:traisition-all duration-75"
                        >Already have an account ?</RouterLink
                    >
                </div>
            </div>
        </div>
    </div>
</template>
