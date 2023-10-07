<script setup lang="ts">
import { IconUser } from '@tabler/icons-vue';
import { baseImageURL } from '@/utils/common';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { User } from '@/models/User';
import { useStore } from '@/store';
import ApiService from '@/services/apiService';
import { notify } from '@/plugins/notifications';
import { useI18n } from 'vue-i18n';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const { t } = useI18n();

const openFileExplorer = () => {
    const fileInput = document.getElementById(
        'profile-picture-input'
    ) as HTMLInputElement;
    fileInput.click();
};

const handleProfilePictureChange = async (event: Event) => {
    const fileInput = event.target as HTMLInputElement;
    //limit to 500kb
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
        if (fileInput.files?.[0].size > 500000) {
            notify({
                title: t('error'),
                message: t('imageSizeError'),
                type: 'error'
            });
            return;
        }
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
        console.log(error);
        imageAvailable.value = false;
    }
};

checkImage();
</script>

<template>
    <input
        type="file"
        id="profile-picture-input"
        accept="image/*"
        class="hidden"
        @change="handleProfilePictureChange"
    />

    <IconUser
        class="w-10 h-10 sm:w-10 sm:h-10 rounded-full sm:ml-4 hover:cursor-pointer"
        @click="openFileExplorer"
        v-if="!imageAvailable"
    />
    <img
        crossorigin="anonymous"
        :src="baseImageURL + user.id + '.png'"
        class="w-10 h-10 sm:w-10 sm:h-10 rounded-full sm:ml-4 hover:cursor-pointer"
        @click="openFileExplorer"
        v-else
    />
</template>
