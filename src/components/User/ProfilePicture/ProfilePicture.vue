<script setup lang="ts">
import { IconUser } from '@tabler/icons-vue';
import { baseImageURL } from '@/utils/common';
import { ref, Ref } from 'vue';
import { storeToRefs } from 'pinia';
import { User } from '@/models/User';
import { useStore } from '@/store';
import ApiService from '@/services/apiService';
import { notify } from '@/plugins/notifications';
import { useI18n } from 'vue-i18n';
import FileExplorer from './FileExplorer.vue';

defineProps<{
    fileExplorer: boolean;
}>();

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const { t } = useI18n();

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

const openFileExplorer = () => {
    const fileInput = document.getElementById(
        'profile-picture-input'
    ) as HTMLInputElement;
    fileInput.click();
};
</script>

<template>
    <FileExplorer v-if="fileExplorer" @imageAvailable="checkImage" />

    <IconUser
        class="w-10 h-10 sm:w-10 sm:h-10 rounded-full sm:ml-4 hover:cursor-pointer"
        @click="openFileExplorer"
        v-if="!imageAvailable"
    />
    <img
        crossorigin="anonymous"
        :src="baseImageURL + user.id + '.png'"
        class="w-10 h-10 sm:w-10 sm:h-10 rounded-full sm:ml-4 hover:cursor-pointer object-cover"
        @click="openFileExplorer"
        v-else
    />
</template>
