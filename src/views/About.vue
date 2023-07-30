<script setup lang="ts">
import AboutSection from '@/components/About/AboutSection.vue';
import Loader from '@/components/Loader.vue';
import { onBeforeMount, onMounted, onUnmounted, ref } from 'vue';

const imagesLoaded = ref(false);

const imageScale = ref(1);
const previousScrollTop = ref(0);

onMounted(() => {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
            imagesLoaded.value = true;
        }
    };

    images.forEach((image) => {
        if (image.complete) {
            handleImageLoad();
        } else {
            image.addEventListener('load', handleImageLoad);
        }
    });
});

onBeforeMount(async () => {
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
});

const handleScroll = () => {
    const sections = document.querySelectorAll('.section-fade-in');
    const scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - windowHeight / 4) {
            section.classList.add('show');
        } else {
            section.classList.remove('show');
        }
    });

    const scrollDelta = scrollTop - previousScrollTop.value;
    previousScrollTop.value = scrollTop;

    if (scrollDelta > 0) {
        // Scrolling down, zoom in
        imageScale.value += 0.005;
        if (imageScale.value > 1.75) {
            imageScale.value = 1.75;
        }
    } else {
        // Scrolling up, zoom out
        imageScale.value -= 0.005;
        if (imageScale.value < 1) {
            imageScale.value = 1;
        }
    }
};
</script>

<template>
    <Loader v-if="!imagesLoaded" :title="$t('loading')" />
    <div class="flex flex-col top-0 w-full">
        <div class="relative overflow-hidden">
            <img
                src="/about/main.jpg"
                alt="about"
                class="w-full h-96 object-cover"
                :style="{ transform: `scale(${imageScale})` }"
            />
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
            class="flex flex-col justify-center items-center lg:flex-row lg:gap-8 bg-gradient"
        >
            <h1 class="text-3xl m-8 text-center">
                {{ $t('aboutTitle') }}
            </h1>
            <p class="m-8 text-lg lg:w-1/4">
                {{ $t('aboutText') }}
            </p>
        </div>
        <div
            class="flex flex-col bg-white justify-center items-center gap-20 pt-10 pb-10 w-full"
        >
            <AboutSection
                :title="$t('aboutSection1Title')"
                :text="$t('aboutSection1Text')"
                image="/about/learn.jpg"
                alt='Photo of Lukas on <a href="https://www.pexels.com/fr-fr/photo/personne-tenant-un-stylo-pointant-sur-le-graphique-590020/">Pexels</a>'
                link="/learn"
                class="section-fade-in show"
            />
            <AboutSection
                :title="$t('aboutSection2Title')"
                :text="$t('aboutSection2Text')"
                image="/about/countries.jpg"
                alt='Photo of <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/fr/photos/BAZejJdZ57w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/countries"
                class="section-fade-in"
            />
            <AboutSection
                :title="$t('aboutSection3Title')"
                :text="$t('aboutSection3Text')"
                image="/about/quiz.jpg"
                alt='Photo of <a href="https://unsplash.com/@ingvar_erik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Igor Karimov 🇺🇦 </a> on <a href="https://unsplash.com/fr/photos/M1nZU61xTK4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/quiz"
                class="section-fade-in"
            />
            <AboutSection
                :title="$t('aboutSection4Title')"
                :text="$t('aboutSection4Text')"
                image="/about/trophy.jpg"
                alt='Photo of RODNAE Productions on <a href="https://www.pexels.com/fr-fr/photo/concept-succes-premier-meilleur-7005687/"> Pexels</a>'
                link="/profile"
                class="section-fade-in"
            />
            <AboutSection
                :title="$t('aboutSection5Title')"
                :text="$t('aboutSection5Text')"
                image="/about/developer.jpg"
                alt='Photo of Lukas on <a href="https://www.pexels.com/fr-fr/photo/stylo-retractable-bleu-574070/">Pexels</a> '
                link="https://github.com/icepick4"
                class="section-fade-in"
            />
            <AboutSection
                :title="$t('aboutSection6Title')"
                :text="$t('aboutSection6Text')"
                image="/about/github.jpg"
                alt='Photo of Soumil Kumar on <a href="https://www.pexels.com/fr-fr/photo/photo-de-personne-tapant-sur-le-clavier-de-l-ordinateur-735911/">Pexels</a>'
                link="https://github.com/icepick4/capitalympics"
                class="section-fade-in"
            />
        </div>
        <div class="w-full h-auto flex justify-center items-center bg-gradient">
            <h1 class="text-3xl text-center lg:w-1/2 m-8">
                {{ $t('aboutFooter') }}
            </h1>
        </div>
    </div>
</template>

<style scoped>
.section-fade-in {
    opacity: 0;
    transform: translateY(50px);
    transition:
        opacity 0.5s ease,
        transform 0.5s ease;
}

.section-fade-in.show {
    opacity: 1;
    transform: translateY(0);
}
</style>
