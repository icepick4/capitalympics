<script setup lang="ts">
import AboutSection from '../components/AboutSection.vue';
</script>

<template>
    <div class="flex flex-col top-0 w-full">
        <div class="relative">
            <img
                src="../assets/about/main.jpg"
                alt="about"
                class="w-full h-96 object-cover"
            />
            <span
                id="title"
                class="left-10 absolute top-10 text-3xl lg:text-6xl text-black p-5 bg-primary rounded-xl"
            >
                Capitalympics
            </span>
            <span class="right-1 bottom-0 text-white absolute text-sm">
                Photo de
                <a
                    href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >NASA</a
                >
                sur
                <a
                    href="https://unsplash.com/fr/photos/Q1p7bh3SHj8?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >Unsplash</a
                >
            </span>
        </div>
        <div
            class="flex flex-col justify-center items-center m-4 lg:flex-row lg:gap-8"
        >
            <h1 class="text-3xl">
                🌎 Learn the Capitals and Flags of the World
            </h1>
            <p class="m-10 text-lg lg:w-1/4">
                At Capitalympics, we believe that learning about different
                cultures and countries can be a fun and rewarding experience.
                That's why we created our app, which allows users to easily
                learn and memorize the capitals and flags of all the world's
                nations.
            </p>
        </div>
        <div class="flex flex-col bg-white">
            <AboutSection
                title="📈 Improve Your Skills with Personalized Learning"
                text="At Capitalympics, we understand that everyone learns at their own pace. That's why our app uses advanced algorithms to track your progress and provide personalized recommendations based on your individual needs. With Capitalympics, you can improve your skills and master the capitals and flags of the world."
                image="../assets/about/learn.jpg"
                alt="learn"
                link="/learn"
            />
            <AboutSection
                title="Play"
                text="Play our fun and challenging games to test your knowledge."
                image="../assets/about/play.jpg"
                alt="play"
                link="/play"
            />
        </div>
    </div>
</template>
