<script lang="ts">
export default {
    name: 'SignIn',
    components: {},
    setup() {
        return {};
    }
};
</script>

<template>
    <div class="flex flex-col justify-center items-center w-full">
        <div
            class="flex flex-col bg-background justify-evenly px-10 py-6 gap-5 rounded-xl border-2 border-black"
        >
            <div class="flex flex-row">
                <h1 class="text-4xl text-center m-5">
                    Sign In to Capitalympics!
                </h1>
                <img src="../assets/logo.png" alt="logo" class="w-20 h-20" />
            </div>
            <div class="flex flex-col items-center">
                <input
                    class="rounded-md p-2 w-3/4"
                    type="text"
                    placeholder="Username"
                />
                <span class="text-error text-sm scale-0"
                    >Username doesn't exists</span
                >
            </div>
            <div class="flex flex-col items-center">
                <input
                    class="rounded-md p-2 w-3/4"
                    type="text"
                    placeholder="Password"
                />
                <span class="text-error text-sm scale-0">Wrong password</span>
            </div>
            <div class="flex flex-col items-center">
                <button
                    class="bg-primary hover:bg-secondary w-3/4 hover:scale-105 transition-all duration-100 delay-75 text-xl rounded-md p-2 text-center"
                >
                    Sign In
                </button>
                <RouterLink
                    :to="{ name: 'SignUp' }"
                    class="text-primary text-center hover:text-secondary text-lg marker:traisition-all duration-75"
                >
                    Don't have an account yet ?</RouterLink
                >
            </div>
        </div>
    </div>
</template>
