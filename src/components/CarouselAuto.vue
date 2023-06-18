<script setup lang="ts"></script>

<template>
    <div class="carousel-container">
        <div class="carousel-items">
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
        rgb(188, 240, 211) 0%,
        rgba(255, 255, 255, 0) 100%
    );
    content: '';
    height: 100%;
    position: absolute;
    width: 200px;
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
    animation: carousel 12s linear infinite;
    transition: all 0.25s ease-in-out;
}

.carousel-items:hover {
    animation-play-state: paused;
}

@keyframes carousel {
    100% {
        transform: translateX(-2560px);
    }
}
</style>
