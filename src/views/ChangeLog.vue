<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import { ref } from 'vue';

const releases = ref([
    {
        version: '2.1.0',
        changes: [
            '🚀 Unveiling Capitalympics Web App v2.1!',
            '🔍 Supercharged SEO for an even better online presence.',
            '🎨 Now introducing avatar customization - express yourself in style!',
            '📊 Dive into detailed statistics on a new page, complete with interactive graphs to track your progress.',
            '🔄 Refractored score calculation algorithm for more accurate and insightful results.',
            '🗺️ Explore and learn a new language - Korean is now available!',
            '👨‍💻 Solo mission accomplished! This version is a result of solo efforts, making it even more special.',
            '🙌 Special shoutout to the community for support and feedback!',
            '🚀 Experience the enhanced Capitalympics journey in version 2.1!'
        ]
    },
    {
        version: '2.0.0',
        changes: [
            '🚀 Introducing Capitalympics Web App v2.0!',
            '🏎️ Improved performance with stored data like countries, regions, and continents, reducing reliance on API calls.',
            '🔔 Instant notifications for level ups and downs - enhancing the gaming experience.',
            '🔐 Upgraded authentication system with features like token refreshing and middlewares for a more secure app.',
            '🙌 Special thanks to @Moonzerk for their outstanding contributions in making Capitalympics Web App v2.0 a reality!',
            '🎮 Enjoy the game and explore the exciting new features! 🏆'
        ]
    },
    {
        version: '1.0.0',
        changes: [
            '🚀 First version ready for production!',
            '🌐 The website is now live at https://capitalympics.com',
            '🚩 Features include learning flags, capitals, viewing countries worldwide, and creating an account.',
            "👉 Enjoy the experience and don't forget to provide your valuable feedback!"
        ]
    }
]);
</script>

<template>
    <div class="container mx-auto p-8">
        <h1 class="text-4xl font-bold mb-6">Release Notes</h1>
        <div v-for="release in releases" :key="release.version" class="mb-8">
            <div class="bg-white rounded-lg p-3 sm:p-6 shadow-md">
                <h2
                    class="text-2xl font-bold mb-4 underline underline-offset-4"
                >
                    {{ release.version }}
                </h2>
                <div class="ml-3">
                    <p
                        v-for="change in release.changes"
                        :key="change"
                        class="mb-2"
                    >
                        {{ change }}
                    </p>
                </div>
            </div>
        </div>
    </div>
    <Footer />
</template>
