<script setup lang="ts">
import AboutSection from '../components/AboutSection.vue';
</script>

<template>
    <div class="flex flex-col top-0 w-full">
        <div class="relative">
            <img
                src="/about/main.jpg"
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
                Photo of
                <a
                    href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                    >NASA</a
                >
                on
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
        <div
            class="flex flex-col bg-white justify-center items-center gap-20 pt-10 pb-10 w-full"
        >
            <AboutSection
                title="📈 Improve Your Skills with Personalized Learning (soon)"
                text="At Capitalympics, we understand that everyone learns at their own pace. That's why our app uses advanced algorithms to track your progress and provide personalized recommendations based on your individual needs. With Capitalympics, you can improve your skills and master the capitals and flags of the world."
                image="/about/learn.jpg"
                alt='Photo of Lukas on <a href="https://www.pexels.com/fr-fr/photo/personne-tenant-un-stylo-pointant-sur-le-graphique-590020/">Pexels</a>'
                link="/learn"
            />
            <AboutSection
                title="🔍 Filter and Sort Countries to Learn More"
                text="Our app features powerful search and filtering capabilities that allow users to find the information they need quickly and easily. Whether you're looking for a specific country or want to explore a particular region of the world, Capitalympics makes it simple."
                image="/about/countries.jpg"
                alt='Photo of <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/fr/photos/BAZejJdZ57w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/countries"
            />
            <AboutSection
                title="🎮 Play the Capitalympics Quiz Game (soon)"
                text="Learning doesn't have to be boring! That's why we've created a fun and engaging quiz game that lets you test your knowledge of the world's capitals and flags. With multiple difficulty levels you can track your progress, the Capitalympics Quiz Game is the perfect way to add some excitement to your learning experience."
                image="/about/quiz.jpg"
                alt='Photo of <a href="https://unsplash.com/@ingvar_erik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Igor Karimov 🇺🇦 </a> on <a href="https://unsplash.com/fr/photos/M1nZU61xTK4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/quiz"
            />
            <AboutSection
                title="🏆 Become a Capitalympics Champion"
                text="Our app is designed to help you achieve your learning goals and become a Capitalympics champion. With each correct answer, you'll earn points and increase your overall score."
                image="/about/trophy.jpg"
                alt='Photo of RODNAE Productions on <a href="https://www.pexels.com/fr-fr/photo/concept-succes-premier-meilleur-7005687/"> Pexels</a>'
                link="/profile"
            />
            <AboutSection
                title="👨‍💻 Meet the Developer"
                text="Capitalympics was created by a passionate student developer who loves learning about different countries and cultures. As someone who has always been fascinated by flags and capitals, he wanted to create an app that would make it easy for others to learn as well."
                image="/about/developer.jpg"
                alt='Photo of Lukas on <a href="https://www.pexels.com/fr-fr/photo/stylo-retractable-bleu-574070/">Pexels</a> '
                link="https://github.com/icepick4"
            />
            <AboutSection
                title="💻 Open-Source Development"
                text="If you're interested in checking out the code behind Capitalympics or contributing to the project, you can find the repo on GitHub. The app is built using a variety of cutting-edge technologies, and the developer is always looking for ways to improve it and make it even more fun and engaging for users."
                image="/about/github.jpg"
                alt='Photo of Soumil Kumar on <a href="https://www.pexels.com/fr-fr/photo/photo-de-personne-tapant-sur-le-clavier-de-l-ordinateur-735911/">Pexels</a>'
                link="https://github.com/icepick4/capitalympics"
            />
            <h1 class="text-3xl text-center mt-10 lg:w-1/2">
                We hope you enjoy using Capitalympics as much as we enjoyed
                creating it. Happy learning! 🌍🚀
            </h1>
        </div>
    </div>
</template>
