<script lang="ts">
import { RouterLink } from 'vue-router';
export default {
    name: 'SignUp',
    components: { RouterLink },
    setup() {
        return {};
    }
};
</script>

<template>
    <div class="flex justify-center items-center w-full my-20">
        <div class="flex flex-row w-3/5 h-full justify-center items-center">
            <div
                class="flex flex-col bg-white h-full w-full justify-evenly items-center gap-3 py-14 px-8 rounded-l-xl border-2 border-black"
            >
                <h1 class="text-4xl">Discover the world !</h1>
                <img src="../assets/logo.png" alt="logo" class="w-4/6 h-auto" />
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
                    <h1 class="text-xl">500 people have already signed up !</h1>
                </div>
            </div>
            <div
                class="flex flex-col bg-background justify-evenly h-full w-full px-10 py-6 gap-5 rounded-r-xl border-2 border-l-0 border-black"
            >
                <h1 class="text-4xl text-center">Sign up to Capitalympics!</h1>
                <div class="flex flex-col items-center">
                    <input
                        class="rounded-md p-2 w-3/4"
                        type="text"
                        placeholder="Username"
                    />
                    <span class="text-error text-sm scale-0"
                        >Username already taken</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <input
                        class="rounded-md p-2 w-3/4"
                        type="text"
                        placeholder="Email"
                    />
                    <span class="text-error text-sm scale-0"
                        >Email is not valid</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <input
                        class="rounded-md p-2 w-3/4"
                        type="text"
                        placeholder="Password"
                    />
                    <span class="text-error text-sm scale-0"
                        >Password must be at least 8 characters long and contain
                        at least one number</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <input
                        class="rounded-md p-2 w-3/4"
                        type="text"
                        placeholder="Confirm Password"
                    />
                    <span class="text-error text-sm scale-0"
                        >Passwords do not match</span
                    >
                </div>
                <div class="flex flex-col items-center">
                    <button
                        class="bg-primary hover:bg-secondary w-3/4 hover:scale-105 transition-all duration-100 delay-75 text-xl rounded-md p-2 text-center"
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
