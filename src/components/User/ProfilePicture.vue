<script setup lang="ts">
import { User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { personas } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Options } from '@dicebear/personas/lib/types';
import { storeToRefs } from 'pinia';
import { Ref, computed, onBeforeMount, ref, watch } from 'vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const props = defineProps<{
    size: 'sm' | 'md' | 'lg';
    editable?: boolean;
}>();

const avatar = ref('');
const userScoreCapital = ref(0);
const userScoreFlag = ref(0);
const skinColorPicker = ref('#21a6ff');
const clothingColorPicker = ref('#000000');

const noseList: Options['nose'] = ['mediumRound', 'smallRound', 'wrinkles'];
const currentNose = ref<Options['nose']>([
    noseList[Math.floor(Math.random() * noseList.length)]
]);

const mouthList: Options['mouth'] = [
    'smile',
    'bigSmile',
    'surprise',
    'smirk',
    'frown',
    'lips',
    'pacifier'
];
const currentMouth = ref<Options['mouth']>([
    mouthList[Math.floor(Math.random() * mouthList.length)]
]);

const eyesList: Options['eyes'] = [
    'happy',
    'glasses',
    'open',
    'sleep',
    'sunglasses',
    'wink'
];
const currentEyes = ref<Options['eyes']>([
    eyesList[Math.floor(Math.random() * eyesList.length)]
]);

const hairList: Options['hair'] = [
    'bald',
    'balding',
    'beanie',
    'bobBangs',
    'bobCut',
    'bunUndercut',
    'buzzcut',
    'cap',
    'curly',
    'curlyBun',
    'curlyHighTop',
    'extraLong',
    'fade',
    'long',
    'mohawk',
    'pigtails',
    'shortCombover',
    'shortComboverChops',
    'sideShave',
    'straightBun'
];
const currentHair = ref<Options['hair']>([
    hairList[Math.floor(Math.random() * hairList.length)]
]);

watch(user, (newUser) => {
    if (newUser) {
        generateAvatar(newUser);
    }
});

const generateAvatar = (user: User) => {
    avatar.value = createAvatar(personas, {
        size: props.size == 'sm' ? 48 : 96,
        seed: user.created_at,
        backgroundColor: ['transparent'],
        mouth: currentMouth.value,
        nose: currentNose.value,
        skinColor: [skinColorPicker.value.slice(1)],
        clothingColor: [clothingColorPicker.value.slice(1)],
        radius: 100,
        hair: currentHair.value,
        eyes: currentEyes.value
    }).toDataUriSync();
};

const changeNose = () => {
    const index = noseList.indexOf(currentNose.value![0]);
    currentNose.value = [noseList[(index + 1) % noseList.length]];
    generateAvatar(user.value);
};

const changeMouth = () => {
    const index = mouthList.indexOf(currentMouth.value![0]);
    currentMouth.value = [mouthList[(index + 1) % mouthList.length]];
    generateAvatar(user.value);
};

const changeEyes = () => {
    const index = eyesList.indexOf(currentEyes.value![0]);
    currentEyes.value = [eyesList[(index + 1) % eyesList.length]];
    generateAvatar(user.value);
};

const changeHair = () => {
    const index = hairList.indexOf(currentHair.value![0]);
    currentHair.value = [hairList[(index + 1) % hairList.length]];
    generateAvatar(user.value);
};

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

const generateBackgroundColors = (
    capitalScore: number,
    flagScore: number
): string => {
    const averageScore = (capitalScore + flagScore) / 2;
    const colorPallete = getColorPallete();
    const colorIndex = Math.floor(averageScore / 8.33);
    return colorPallete[colorIndex];
};

const getColorPallete = () => {
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
};

const color = computed(() => {
    return generateBackgroundColors(
        userScoreCapital.value,
        userScoreFlag.value
    );
});

onBeforeMount(async () => {
    await initUserScore();
});

let timer: ReturnType<typeof setTimeout> | null = null;

const updateAvatarColors = () => {
    if (timer) {
        clearTimeout(timer);
    }

    timer = setTimeout(() => {
        generateAvatar(user.value);
        timer = null;
    }, 100);
};
</script>

<template>
    <div class="flex items-center justify-center mb-6">
        <div
            class="flex items-center justify-center rounded-full overflow-hidden"
            :class="`${color} rounded-full`"
        >
            <img :src="avatar" alt="Avatar" class="rounded-full" />
        </div>
    </div>
    <div v-if="editable" class="flex space-x-4">
        <div class="color-picker-card">
            <label for="skinColor" class="text-sm font-medium"
                >Skin Color</label
            >
            <input
                id="skinColor"
                type="color"
                v-model="skinColorPicker"
                @input="updateAvatarColors"
                class="rounded-md w-12 h-12"
            />
        </div>
        <div class="color-picker-card">
            <label for="clothingColor" class="text-sm font-medium"
                >Clothing Color</label
            >
            <input
                id="clothingColor"
                type="color"
                v-model="clothingColorPicker"
                @input="updateAvatarColors"
                class="rounded-md w-12 h-12"
            />
        </div>
        <div class="flex flex-col space-y-2">
            <button @click="changeNose" class="rounded-md bg-gray-200 p-2">
                Change Nose
            </button>
            <button @click="changeMouth" class="rounded-md bg-gray-200 p-2">
                Change Mouth
            </button>
            <button @click="changeEyes" class="rounded-md bg-gray-200 p-2">
                Change Eyes
            </button>
            <button @click="changeHair" class="rounded-md bg-gray-200 p-2">
                Change Hair
            </button>
        </div>
    </div>
</template>

<style scoped>
.color-picker-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.color-picker-card label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    color: #4a5568;
}
</style>
