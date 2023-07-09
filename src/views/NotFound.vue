<template>
    <div class="flex flex-col items-center justify-center h-full gap-20">
        <img
            src="/404-error-animate.svg"
            alt="404"
            class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4"
        />
        <div class="flex flex-row w-full justify-center items-center">
            <RouterLink
                to="/"
                class="transition ease-in-out delay-100 text-black text-2xl font-bold text-center p-5 bg-gradient rounded-md w-1/4"
            >
                {{ $t('backHome') }}
            </RouterLink>
        </div>
    </div>
</template>
