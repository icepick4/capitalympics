<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

const isFirefox = ref(false);

onBeforeMount(() => {
    isFirefox.value = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
});
</script>

<template>
    <div class="carousel-container">
        <div class="carousel-items" :class="{ 'no-hover': isFirefox }">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped>
.carousel-container {
    max-width: 1650px;
    margin: 0 auto;
    overflow: hidden;
    position: relative;
}

.carousel-container:before,
.carousel-container:after {
    background: linear-gradient(
        to right,
        rgb(182, 232, 242) 0%,
        rgba(255, 255, 255, 0) 100%
    );
    content: '';
    height: 100%;
    position: absolute;
    width: 300px;
    z-index: 2;
}

.carousel-container:after {
    right: 0;
    top: 0;
    transform: rotateZ(180deg);
}

.carousel-container:before {
    left: 0;
    top: 0;
}

.carousel-items {
    display: flex;
    animation: carousel 10s linear infinite;
    transition: all 0.25s ease-in-out;
}

.carousel-items:not(.no-hover):hover {
    animation-play-state: paused;
}

@keyframes carousel {
    100% {
        transform: translateX(-2560px);
    }
}

@media (max-width: 1250px) {
    .carousel-container:before,
    .carousel-container:after {
        width: 200px;
    }
}

@media (max-width: 1000px) {
    .carousel-container:before,
    .carousel-container:after {
        width: 0px;
    }
}
</style>
