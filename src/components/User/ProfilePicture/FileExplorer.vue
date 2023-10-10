<script setup lang="ts">
import { User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import { useStore } from '@/store';
import ApiClient from '@/utils/ApiClient';
import { storeToRefs } from 'pinia';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const { t } = useI18n();

const emit = defineEmits(['imageAvailable']);

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
                    const formData = new FormData();
                    formData.append('image', blob, user.value.id + '.png');
                    const response = await ApiClient.post('/images', formData);

                    if (response.success) {
                        emit('imageAvailable');
                        notify({
                            title: t('success'),
                            message: t('imageUploaded'),
                            type: 'success'
                        });
                    } else {
                        notify({
                            title: t('error'),
                            message: t('imageUploadError'),
                            type: 'error'
                        });
                    }
                };
            };

            reader.readAsDataURL(selectedFile);
        } catch (error) {
            notify({
                title: t('error'),
                message: t('imageUploadError'),
                type: 'error'
            });
        }
    }
};
</script>

<template>
    <input
        type="file"
        id="profile-picture-input"
        accept="image/*"
        class="hidden"
        @change="handleProfilePictureChange"
    />
</template>
