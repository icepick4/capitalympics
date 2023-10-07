<script setup lang="ts">
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { User } from '@/models/User';
import { notify } from '@/plugins/notifications';
import { useStore } from '@/store';
import { languages } from '@/utils/common';
import { IconUserX, IconX, IconUser, IconPhotoEdit } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { baseImageURL } from '@/utils/common';
import ProfilePicture from './ProfilePicture.vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const { t } = useI18n();
const nameAlreadyTaken = ref(false);

const name = ref(user.value?.name);
const language = ref(user.value?.language);

const canSave = computed(
    () =>
        name.value.length >= 3 &&
        name.value.length < 20 &&
        (name.value !== user.value?.name ||
            language.value !== user.value?.language)
);

const loading = ref(false);

async function saveProfile() {
    loading.value = true;
    try {
        await store.updateAccount({
            language: language.value,
            name: name.value
        });

        notify({
            type: 'success',
            title: t('success'),
            message: t('profileSaved')
        });
    } catch (e) {
        nameAlreadyTaken.value = true;
    } finally {
        loading.value = false;
    }
}

const deleteAccount = async () => {
    const hasConfirmed = await useConfirmDialog({
        title: t('deleteAccount'),
        description: t('deleteAccountConfirmation'),
        cancelText: t('confirmDialog.cancel'),
        confirmText: t('confirmDialog.confirm')
    });

    if (!hasConfirmed) return;
    await store.deleteAccount();
};
</script>

<template>
    <Dialog
        v-model="nameAlreadyTaken"
        :title="$t('error')"
        :description="$t('nameTaken')"
        :buttonDescription="$t('close')"
        type="error"
    />
    <div
        class="w-11/12 sm:w-5/6 xl:w-3/4 2xl:w-2/3 mx-auto p-0 sm:p-8 flex-col"
    >
        <div
            class="bg-gradient rounded-lg shadow-lg p-4 sm:p-6 mb-8 flex flex-col gap-10"
        >
            <div
                class="flex flex-row justify-between items-top sm:items-center"
            >
                <div
                    class="w-full flex flex-row justify-between items-top sm:items-center gap-5"
                >
                    <div
                        class="flex flex-col sm:flex-row items-start sm:items-center gap-1"
                    >
                        <h1 class="w-6 sm:w-11/12 text-xl sm:text-2xl">
                            {{ $t('editProfile') }}
                        </h1>
                        <ProfilePicture />
                        <IconPhotoEdit class="w-10 h-10" />
                    </div>
                    <ActionIcon
                        :label="$t('deleteAccount')"
                        :icon="IconUserX"
                        rounded
                        class="hover:scale-110 hover:bg-red-400 transition-all duration-300"
                        @click="deleteAccount"
                    />
                </div>
                <RouterLink to="/profile">
                    <IconX
                        class="w-10 h-10 ml-2 cursor-pointer hover:scale-110 transition-all"
                    />
                </RouterLink>
            </div>
            <div class="grid grid-cols-1 xl:grid-cols-3 gap-5 items-end">
                <TextInput v-model="name" :label="$t('name')" />
                <Select
                    v-model="language"
                    :label="$t('language')"
                    :options="languages.map((l) => ({ ...l, label: l.text }))"
                />
                <Button
                    :text="$t('saveProfile')"
                    :disabled="!canSave || loading"
                    type="success"
                    @click="saveProfile"
                />
            </div>
        </div>
    </div>
</template>
