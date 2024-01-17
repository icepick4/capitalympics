<script setup lang="ts">
import { User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { personas } from '@dicebear/collection';
import { createAvatar } from '@dicebear/core';
import { Options } from '@dicebear/personas/lib/types';
import { IconDice6Filled, IconUser } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, computed, onBeforeMount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
const props = defineProps<{
    size: 'sm' | 'md' | 'lg';
    editable?: boolean;
}>();

const { t } = useI18n();

const avatar = ref();
const userScoreCapital = ref(0);
const userScoreFlag = ref(0);

const noseList: Options['nose'] = ['mediumRound', 'smallRound', 'wrinkles'];
const currentNose = ref<Options['nose']>([noseList[user.value?.avatar.nose]]);

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
    mouthList[user.value?.avatar.mouth]
]);

const eyesList: Options['eyes'] = [
    'happy',
    'glasses',
    'open',
    'sleep',
    'sunglasses',
    'wink'
];
const currentEyes = ref<Options['eyes']>([eyesList[user.value?.avatar.eyes]]);

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
const currentHair = ref<Options['hair']>([hairList[user.value?.avatar.hair]]);

const skinColorPicker = ref(user.value?.avatar.skin);
const clothingColorPicker = ref(user.value?.avatar.clothes);

watch(user, (newUser) => {
    if (newUser) {
        generateAvatar(newUser);
    }
});

const avatarSize = computed(() => {
    switch (props.size) {
        case 'sm':
            return 48;
        case 'md':
            return 96;
        case 'lg':
            return 128;
    }
});

const generateAvatar = (user: User) => {
    avatar.value = createAvatar(personas, {
        size: avatarSize.value,
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
}, 500);

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

const loading = ref(false);

async function saveProfile(
    noseIndex: number,
    mouthIndex: number,
    eyesIndex: number,
    hairIndex: number
) {
    loading.value = true;
    try {
        await store.updateAvatar({
            skin: skinColorPicker.value,
            clothes: clothingColorPicker.value,
            nose: noseIndex,
            mouth: mouthIndex,
            eyes: eyesIndex,
            hair: hairIndex
        });

        notify({
            type: 'success',
            title: t('success'),
            message: t('profileSaved')
        });
    } catch (e) {
        notify({
            type: 'error',
            title: t('error'),
            message: t('profileNotSaved')
        });
    } finally {
        loading.value = false;
    }
}

const rotation = ref(false);

const randomAvatar = () => {
    const randomNose = Math.floor(Math.random() * noseList.length);
    const randomMouth = Math.floor(Math.random() * mouthList.length);
    const randomEyes = Math.floor(Math.random() * eyesList.length);
    const randomHair = Math.floor(Math.random() * hairList.length);

    currentNose.value = [noseList[randomNose]];
    currentMouth.value = [mouthList[randomMouth]];
    currentEyes.value = [eyesList[randomEyes]];
    currentHair.value = [hairList[randomHair]];

    skinColorPicker.value = `#${Math.floor(Math.random() * 16777215).toString(
        16
    )}`;

    clothingColorPicker.value = `#${Math.floor(
        Math.random() * 16777215
    ).toString(16)}`;

    rotation.value = !rotation.value;
    generateAvatar(user.value);
};
</script>

<template>
    <IconDice6Filled
        v-if="editable"
        :size="avatarSize / 3"
        class="text-gray-800 absolute top-0 right-0 cursor-pointer m-5 select-none transform transition-transform ease duration-300"
        :class="{
            'rotate-180': rotation
        }"
        @click="randomAvatar"
    />
    <div class="flex items-center justify-center">
        <div
            class="flex items-center justify-center rounded-full overflow-hidden border border-gray-500 shadow-lg"
            :class="`${color} rounded-full`"
        >
            <img
                v-if="avatar"
                :src="avatar"
                alt="Avatar"
                class="rounded-full"
            />
            <IconUser v-else :size="avatarSize / 1.2" class="text-gray-800" />
        </div>
    </div>
    <div v-if="editable" class="flex flex-row gap-4 mt-7">
        <div class="flex flex-col justify-center md:flex-row gap-4">
            <div class="flex flex-col justify-center items-center">
                <label for="skinColor" class="text-sm font-medium text-center">
                    {{ $t('skinColor') }}
                </label>
                <input
                    id="skinColor"
                    type="color"
                    v-model="skinColorPicker"
                    @input="updateAvatarColors"
                    class="rounded-md w-12 h-12"
                />
            </div>
            <div class="flex flex-col justify-center items-center">
                <label
                    for="clothingColor"
                    class="text-sm font-medium text-center"
                >
                    {{ $t('clothingColor') }}
                </label>
                <input
                    id="clothingColor"
                    type="color"
                    v-model="clothingColorPicker"
                    @input="updateAvatarColors"
                    class="rounded-md w-12 h-12"
                />
            </div>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
            <Button
                @click="changeNose"
                class="rounded-md bg-gray-200"
                :text="$t('changeNose')"
                type="warning"
            />
            <Button
                @click="changeMouth"
                class="rounded-md bg-gray-200"
                :text="$t('changeMouth')"
                type="warning"
            />
            <Button
                @click="changeEyes"
                class="rounded-md bg-gray-200"
                :text="$t('changeEyes')"
                type="warning"
            />
            <Button
                @click="changeHair"
                class="rounded-md bg-gray-200"
                :text="$t('changeHair')"
                type="warning"
            />
        </div>
    </div>
    <Button
        v-if="editable"
        :text="$t('saveProfile')"
        :disabled="loading"
        :loading="loading"
        type="success"
        class="mt-6 w-5/6 sm:w-1/2 md:w-1/3"
        @click="
            saveProfile(
                noseList.indexOf(currentNose![0]),
                mouthList.indexOf(currentMouth![0]),
                eyesList.indexOf(currentEyes![0]),
                hairList.indexOf(currentHair![0])
            )
        "
    />
</template>

<style scoped>
.color-picker-card label {
    font-size: 0.75rem;
    margin-bottom: 0.25rem;
    color: #4a5568;
}
</style>
