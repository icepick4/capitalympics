<script setup lang="ts">
defineProps<{
    title?: string;
}>();
</script>

<template>
    <div
        class="absolute backdrop-blur-sm w-screen h-screen z-10 overflow-hidden top-0"
    >
        <div class="flex justify-center items-center h-full w-full">
            <div
                class="flex flex-col justify-center items-center h-full w-full"
            >
                <div
                    class="flex flex-col justify-center items-center rounded-full bg-gray-600 w-48 h-48"
                >
                    <span class="loader"></span>
                    <div class="flex justify-center items-center w-full gap-5">
                        <div
                            v-for="i in 3"
                            :key="i"
                            :style="{ 'animation-delay': `${(i - 1) * 0.2}s` }"
                            class="rounded-full h-3 w-3 animate-pulse-fast flex justify-center items-center bg-white"
                        ></div>
                    </div>
                </div>
                <h1 v-if="title" class="text-2xl rounded-lg p-4">
                    {{ title }}
                </h1>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loader {
    width: 120px;
    height: 140px;
    background-image: radial-gradient(circle 30px, #fff 100%, transparent 0),
        radial-gradient(circle 5px, #fff 100%, transparent 0),
        radial-gradient(circle 5px, #fff 100%, transparent 0),
        linear-gradient(#fff 20px, transparent 0);
    background-position:
        center 127px,
        94px 102px,
        16px 18px,
        center 114px;
    background-size:
        60px 60px,
        10px 10px,
        10px 10px,
        4px 14px;
    background-repeat: no-repeat;
    z-index: 10;
    perspective: 500px;
    transform: translateY(-20px);
}
.loader::before {
    content: '';
    position: absolute;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 3px solid #fff;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -55%) rotate(-45deg);
    border-right-color: transparent;
    box-sizing: border-box;
}
.loader::after {
    content: '';
    position: absolute;
    height: 80px;
    width: 80px;
    transform: translate(-50%, -55%) rotate(-45deg) rotateY(0deg);
    left: 50%;
    top: 50%;
    box-sizing: border-box;
    border: 7px solid #0d8c5d;
    border-radius: 50%;
    animation: rotate 1s linear infinite;
}

@keyframes rotate {
    to {
        transform: translate(-50%, -55%) rotate(-45deg) rotateY(360deg);
    }
}
</style>
