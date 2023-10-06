<script setup lang="ts">
import { IconBrandGithub, IconX } from '@tabler/icons-vue';
import { onMounted, ref } from 'vue';

const showComponent = ref(true);
const stars = ref<number>(0);

onMounted(async () => {
    showComponent.value = true;
    const response = await getNumberOfStars();
    stars.value = response;
});

const getNumberOfStars = async (): Promise<number> => {
    const response = await fetch(
        'https://api.github.com/repos/icepick4/capitalympics'
    );
    const data = await response.json();
    return data.stargazers_count;
};

const hideComponent = () => {
    showComponent.value = false;
};
</script>
<template>
    <div
        v-if="showComponent"
        class="fixed bottom-2 left-2 m-2 p-3 px-4 bg-gray-800 text-white border-white rounded-[20px] border-4 shadow-lg z-50 star-container"
    >
        <div class="flex flex-col gap-3 items-center w-full">
            <div
                class="flex flex-row gap-3 justify-between items-center w-full"
            >
                <a
                    href="https://github.com/icepick4/capitalympics"
                    target="_blank"
                >
                    <IconBrandGithub
                        class="w-8 h-8 hover:scale-105 transition-all"
                    />
                </a>
                <a
                    href="https://github.com/icepick4/capitalympics"
                    target="_blank"
                >
                    <p class="text-2xl rainbow-text whitespace-pre-wrap">
                        {{ $t('starRepo', { number: stars }) }}
                    </p>
                </a>
                <button
                    @click="hideComponent"
                    class="text-gray-400 hover:text-white focus:outline-none"
                >
                    <IconX class="w-5 h-5 hover:scale-105 transition-all" />
                </button>
            </div>
            <a href="https://github.com/icepick4/capitalympics" target="_blank">
                <p class="text-lg">{{ $t('giveStrength') }}</p>
            </a>
        </div>
    </div>
</template>

<style scoped>
.rainbow-text {
    text-align: center;

    background: linear-gradient(
        60deg,
        #f79533,
        #f37055,
        #ef4e7b,
        #a166ab,
        #5073b8,
        #1098ad,
        #07b39b,
        #afba6f,
        #f79533
    );
    background-size: 200% auto;

    color: #000;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: rainbow 5s linear infinite;
}
@keyframes rainbow {
    to {
        background-position: 200% center;
    }
}
</style>
