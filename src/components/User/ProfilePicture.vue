<script setup lang="ts">
import { User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { personas } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { storeToRefs } from 'pinia';
import { Ref, computed, onBeforeMount, ref, watch } from 'vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const props = defineProps<{
    size: 'sm' | 'md' | 'lg';
}>();

const avatar = ref('');
const userScoreCapital = ref(0);
const userScoreFlag = ref(0);

watch(user, (newUser) => {
    if (newUser) {
        generateAvatar(newUser);
    }
});

function generateAvatar(user: User) {
    avatar.value = createAvatar(personas, {
        size: props.size == 'sm' ? 48 : 96,
        seed: user.created_at,
        backgroundColor: ['transparent'],
        mouth: ['smile', 'bigSmile', 'surprise', 'smirk'],
        nose: ['mediumRound', 'smallRound'],
        skinColor: ['21a6ff'],
        radius: 100
    }).toDataUriSync();
}

const initUserScore = async () => {
    try {
        const { capital, flag } = await ApiService.getUserScore();
        userScoreCapital.value = capital;
        userScoreFlag.value = flag;
    } catch (error) {
        console.log(error);
    }
};

setTimeout(() => {
    generateAvatar(user.value);
}, 200);

function generateBackgroundColors(
    capitalScore: number,
    flagScore: number
): string {
    const averageScore = (capitalScore + flagScore) / 2;
    const colorPallete = getColorPallete();
    const colorIndex = Math.floor(averageScore / 8.33);
    return colorPallete[colorIndex];
}

function getColorPallete() {
    return [
        'bg-[#eeeeee]',
        'bg-[#e0e0e0]',
        'bg-[#bdbdbd]',
        'bg-[#fff59d]',
        'bg-[#fff176]',
        'bg-[#ffee58]',
        'bg-[#81c784]',
        'bg-[#66bb6a]',
        'bg-[#4caf50]',
        'bg-[#42a5f5]',
        'bg-[#2196f3]',
        'bg-[#ce93d8]'
    ];
}

const color = computed(() => {
    return generateBackgroundColors(
        userScoreCapital.value,
        userScoreFlag.value
    );
});

onBeforeMount(async () => {
    await initUserScore();
});
</script>

<template>
    <div
        class="flex flex-col items-center justify-center"
        :class="`${color} rounded-full`"
    >
        <img :src="avatar" alt="Avatar" />
    </div>
</template>
