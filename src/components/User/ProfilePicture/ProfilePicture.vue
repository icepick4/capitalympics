<script setup lang="ts">
import { User } from '@/models/User';
import { useStore } from '@/store';
import { baseImageURL } from '@/utils/common';
import { IconUser } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, onMounted, ref } from 'vue';
import FileExplorer from './FileExplorer.vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
const { isAuthenticated } = storeToRefs(useStore());

const props = defineProps<{
    fileExplorer: boolean;
    size: 'sm' | 'md' | 'lg';
}>();

onMounted(() => {
    checkImage();
});

const imageAvailable = ref(false);

const checkImage = async () => {
    try {
        while (!user.value?.id || !isAuthenticated.value) {
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
        const response = await fetch(baseImageURL + user.value?.id + '.png', {
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

const openFileExplorer = () => {
    if (!props.fileExplorer) {
        return;
    }
    const fileInput = document.getElementById(
        'profile-picture-input'
    ) as HTMLInputElement;
    fileInput.click();
};
</script>

<template>
    <FileExplorer v-if="fileExplorer" @imageAvailable="checkImage" />

    <IconUser
        class="w-10 h-10 rounded-full hover:cursor-pointer"
        @click="openFileExplorer"
        v-if="!imageAvailable"
    />
    <img
        crossorigin="anonymous"
        :src="baseImageURL + user?.id + '.png'"
        class="rounded-full hover:cursor-pointer object-cover"
        :class="{
            'w-10 h-10': size === 'sm',
            'w-16 h-w-16': size === 'md',
            'w-28 h-28': size === 'lg'
        }"
        @click="openFileExplorer"
        v-else
    />
</template>
