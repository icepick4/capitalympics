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
                class="w-1/4 flex items-center justify-center px-4 py-4 text-base font-normal text-black border rounded-md transition-all duration-200 bg-gray-50 hover:bg-gray-200 disabled:hover:bg-gray-50 disabled:opacity-60 disabled:cursor-not-allowed"
            >
                {{ $t('backHome') }}
            </RouterLink>
        </div>
    </div>
</template>
