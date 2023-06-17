<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AboutSection from '../components/AboutSection.vue';
import BlurContainer from '../components/BlurContainer.vue';
import Loader from '../components/Loader.vue';

const haveImagesLoaded = ref(false);

onMounted(() => {
    const images = document.querySelectorAll('img');
    let loadedCount = 0;

    const handleImageLoad = () => {
        loadedCount++;
        if (loadedCount === images.length) {
            haveImagesLoaded.value = true;
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
</script>

<template>
    <BlurContainer v-if="!haveImagesLoaded">
        <Loader title="Loading page ..." />
    </BlurContainer>
    <div class="flex flex-col top-0 w-full">
        <div class="relative">
            <img
                src="/about/main.jpg"
                alt="about"
                class="w-full h-96 object-cover"
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
            <h1 class="text-3xl">
                {{ $t('aboutTitle') }}
            </h1>
            <p class="m-10 text-lg lg:w-1/4">
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
            />
            <AboutSection
                :title="$t('aboutSection2Title')"
                :text="$t('aboutSection2Text')"
                image="/about/countries.jpg"
                alt='Photo of <a href="https://unsplash.com/@jannerboy62?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Nick Fewings</a> on <a href="https://unsplash.com/fr/photos/BAZejJdZ57w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/countries"
            />
            <AboutSection
                :title="$t('aboutSection3Title')"
                :text="$t('aboutSection3Text')"
                image="/about/quiz.jpg"
                alt='Photo of <a href="https://unsplash.com/@ingvar_erik?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Igor Karimov 🇺🇦 </a> on <a href="https://unsplash.com/fr/photos/M1nZU61xTK4?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>'
                link="/quiz"
            />
            <AboutSection
                :title="$t('aboutSection4Title')"
                :text="$t('aboutSection4Text')"
                image="/about/trophy.jpg"
                alt='Photo of RODNAE Productions on <a href="https://www.pexels.com/fr-fr/photo/concept-succes-premier-meilleur-7005687/"> Pexels</a>'
                link="/profile"
            />
            <AboutSection
                :title="$t('aboutSection5Title')"
                :text="$t('aboutSection5Text')"
                image="/about/developer.jpg"
                alt='Photo of Lukas on <a href="https://www.pexels.com/fr-fr/photo/stylo-retractable-bleu-574070/">Pexels</a> '
                link="https://github.com/icepick4"
            />
            <AboutSection
                :title="$t('aboutSection6Title')"
                :text="$t('aboutSection6Text')"
                image="/about/github.jpg"
                alt='Photo of Soumil Kumar on <a href="https://www.pexels.com/fr-fr/photo/photo-de-personne-tapant-sur-le-clavier-de-l-ordinateur-735911/">Pexels</a>'
                link="https://github.com/icepick4/capitalympics"
            />
        </div>
        <div class="w-full h-52 flex justify-center items-center bg-gradient">
            <h1 class="text-3xl text-center lg:w-1/2">
                {{ $t('aboutFooter') }}
            </h1>
        </div>
    </div>
</template>
