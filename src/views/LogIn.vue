<script setup lang="ts">
import { ref } from 'vue';
import ApiService from '../services/ApiService';

const userFound = ref(false);
const signedIn = ref(false);
const username = ref('');
const password = ref('');

const handleSignInError = () => {
    userFound.value = false;
    signedIn.value = true;
};

const validateForm = () => {
    if (!username.value || !password.value) {
        alert('Please fill in both username and password fields');
        return false;
    }
    return true;
};

const logIn = async () => {
    if (!validateForm()) {
        return;
    }
    console.log('Logging in...');
    const isLoggedIn = await ApiService.logIn(username.value, password.value);
    console.log(isLoggedIn);
    if (isLoggedIn !== false) {
        console.log('Logged in successfully');
        userFound.value = true;
        signedIn.value = true;
    } else {
        handleSignInError();
    }
};
</script>

<template>
    <h1 v-if="!userFound && signedIn" class="text-2xl text-center m-0">
        User not found
    </h1>
    <div class="flex flex-col justify-center items-center w-full">
        <div
            class="flex flex-col bg-background justify-evenly px-10 py-6 gap-5 rounded-xl border-2 border-black"
        >
            <div class="flex flex-row">
                <h1 class="text-4xl text-center m-5">
                    Sign In to Capitalympics!
                </h1>
                <img src="/logo.png" alt="logo" class="w-20 h-20" />
            </div>
            <div class="flex flex-col items-center">
                <div class="w-3/4">
                    <p class="ml-2">Username</p>
                    <input
                        class="rounded-md p-2 w-full border-2 border-black"
                        type="text"
                        placeholder="Username"
                        v-model="username"
                    />
                </div>
                <span class="text-error text-sm scale-0"
                    >Username doesn't exists</span
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
                    />
                </div>
                <span class="text-error text-sm scale-0">Wrong password</span>
            </div>
            <div class="flex flex-col items-center">
                <button
                    class="bg-primary hover:bg-secondary w-3/4 hover:scale-105 transition-all duration-100 delay-75 text-xl rounded-md p-2 text-center"
                    @click="logIn()"
                >
                    Sign In
                </button>
                <RouterLink
                    to="/signup"
                    class="text-primary text-center hover:text-secondary text-lg marker:traisition-all duration-75"
                >
                    Don't have an account yet ?</RouterLink
                >
            </div>
        </div>
    </div>
</template>
