<script setup lang="ts">
import Footer from '@/components/Footer.vue';
import ProgressBadgeSkeleton from '@/components/Skeletons/ProgressBadgeSkeleton.vue';
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import { baseImageURL, isNow, isToday } from '@/utils/common';
import {
    IconChartBar,
    IconListNumbers,
    IconLogout2,
    IconSettings,
    IconUser
} from '@tabler/icons-vue';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { Ref, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Badge from '../Badge.vue';
import StatCardContainer from '../Statistics/StatCardContainer.vue';
import sharp from 'sharp';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
if (!user.value) {
    store.logout({ loggedOut: '1' });
}
const { t } = useI18n();

const flagScore = ref(-2);
const capitalScore = ref(-2);

onMounted(async () => {
    const { capital, flag } = await ApiService.getUserScore();
    flagScore.value = flag;
    capitalScore.value = capital;
});

const formatDate = (date: DateTime) => {
    if (isNow(date)) {
        return t('now');
    }
    if (isToday(date)) {
        return t('today');
    }

    return date.toLocaleString(DateTime.DATE_MED);
};

async function disconnect() {
    const hasConfirmed = await useConfirmDialog({
        title: t('logOutConfirmation'),
        description: t('loginPageRedirect'),
        cancelText: t('no'),
        confirmText: t('yes')
    });

    if (!hasConfirmed) return;
    store.logout({ loggedOut: '1' });
}

const openFileExplorer = () => {
    const fileInput = document.getElementById(
        'profile-picture-input'
    ) as HTMLInputElement;
    fileInput.click();
};

const handleProfilePictureChange = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    //limit to 500ko
    if (fileInput.files?.[0].size > 500000) {
        //notify user TODO
        return;
    }
    const selectedFile = fileInput.files?.[0];

    if (selectedFile) {
        try {
            const reader = new FileReader();

            reader.onload = async () => {
                const image = new Image();
                image.src = reader.result as string;

                // convert to png
                image.onload = async () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = image.width;
                    canvas.height = image.height;
                    const ctx = canvas.getContext('2d');

                    ctx?.drawImage(image, 0, 0);

                    const pngImageData = canvas.toDataURL('image/png');

                    const binaryData = atob(pngImageData.split(',')[1]);
                    const arrayBuffer = new ArrayBuffer(binaryData.length);
                    const uint8Array = new Uint8Array(arrayBuffer);
                    for (let i = 0; i < binaryData.length; i++) {
                        uint8Array[i] = binaryData.charCodeAt(i);
                    }
                    const blob = new Blob([arrayBuffer], { type: 'image/png' });

                    await ApiService.uploadImage(blob, user.value.id).then(
                        () => {
                            imageAvailable.value = true;
                        }
                    );
                };
            };

            reader.readAsDataURL(selectedFile);
        } catch (error) {
            console.log(error);
        }
    }
};

const imageAvailable = ref(false);

const checkImage = async () => {
    try {
        const response = await fetch(baseImageURL + user.value.id + '.png', {
            method: 'HEAD'
        });
        if (response.ok) {
            imageAvailable.value = true;
        }
    } catch (error) {
        imageAvailable.value = false;
    }
};

checkImage();
</script>

<template>
    <div
        class="w-full h-full flex flex-col items-center justify-center mt-10 mb-10"
    >
        <div class="w-full md:w-5/6 xl:3/4 2xl:w-2/3 mx-auto">
            <div
                v-if="flagScore !== -2 && capitalScore !== -2"
                class="flex flex-col sm:flex-row justify-start sm:gap-2"
            >
                <div
                    class="flex flex-col items-center justify-center sm:items-start sm:justify-start gap-2"
                >
                    <span class="text-2xl xs:text-lg sm:text-2xl font-thin">{{
                        $t('flags')
                    }}</span>
                    <Badge
                        v-if="flagScore !== -2"
                        :score="flagScore"
                        size="md"
                        :progress="true"
                        class="mb-4"
                    />
                </div>
                <div
                    class="flex flex-col items-center justify-center sm:items-start sm:justify-start gap-2"
                >
                    <span class="text-2xl xs:text-lg sm:text-2xl font-thin">{{
                        $t('capitals')
                    }}</span>
                    <Badge
                        v-if="capitalScore !== -2"
                        :score="capitalScore"
                        size="md"
                        :progress="true"
                        class="mb-4"
                    />
                </div>
            </div>
            <div v-else class="p-4 w-full flex gap-5 justify-start items-start">
                <ProgressBadgeSkeleton />
                <ProgressBadgeSkeleton />
            </div>
            <!-- Informations de l'utilisateur -->
            <div class="bg-gradient rounded-lg shadow-lg p-3 sm:p-6 mb-5 m-3">
                <div
                    class="flex column flex-row items-center justify-center mb-4 gap-4"
                >
                    <div class="flex items-center">
                        <input
                            type="file"
                            id="profile-picture-input"
                            accept="image/*"
                            class="hidden"
                            @change="handleProfilePictureChange"
                        />
                        <IconUser
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4 hover:cursor-pointer"
                            @click="openFileExplorer"
                            v-if="!imageAvailable"
                        />
                        <img
                            crossorigin="anonymous"
                            :src="baseImageURL + user.id + '.png'"
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4 hover:cursor-pointer"
                            @click="openFileExplorer"
                            v-else
                        />
                        <h1 class="text-2xl mr-1 font-bold">
                            {{ user?.name }}
                        </h1>
                    </div>
                    <div
                        class="flex items-center center justify-end gap-4 w-full"
                    >
                        <RouterLink to="/profile/statistics" title="Statistics">
                            <IconChartBar
                                class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                                @click="$emit('close')"
                            />
                        </RouterLink>
                        <RouterLink to="/profile/scores" title="Scores">
                            <IconListNumbers
                                class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                            />
                        </RouterLink>
                        <RouterLink to="/profile/edit" title="Edit">
                            <IconSettings
                                class="w-8 h-8 cursor-pointer hover:rotate-180 transition-all duration-500"
                                @click="$emit('close')"
                            />
                        </RouterLink>
                        <div title="Disconnect">
                            <IconLogout2
                                class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                                @click="disconnect"
                            />
                        </div>
                    </div>
                </div>
                <p class="text-black mb-2">
                    {{ $t('lastActivity') }} :
                    {{ formatDate(DateTime.fromISO(user?.updated_at)) }}
                </p>
                <p class="text-black">
                    {{ $t('joined') }} :
                    {{ formatDate(DateTime.fromISO(user?.created_at)) }}
                </p>
            </div>
        </div>
        <h1 class="text-3xl mb-5">{{ $t('statistics') }}</h1>
        <StatCardContainer :basicDisplay="true" />
        <RouterLink
            to="/profile/statistics"
            class="hover:underline text-lg mt-5"
            >{{ $t('seeMore') }}</RouterLink
        >
    </div>
    <Footer></Footer>
</template>

<style scoped>
@keyframes rotate {
    from {
        transform: rotate(-360deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 340px) {
    .column {
        flex-direction: column;
    }

    .center {
        justify-content: center;
    }
}

input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
