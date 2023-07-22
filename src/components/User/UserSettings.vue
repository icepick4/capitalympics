<script setup lang="ts">
import { User } from '@/models/User';
import { useStore } from '@/store';
import { languages } from '@/utils/common';
import { IconUserX } from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import { Ref, computed, ref } from 'vue';
import { RouterLink } from 'vue-router';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const hasSaved = ref(false);
const error = ref<string>();

const errorDisplayed = computed({
    get() {
        return !!error.value;
    },
    set(v) {
        if (!v) {
            error.value = undefined;
        }
    }
})

const name = ref(user.value.name);
const language = ref(user.value.language);

const canSave = computed(() =>
    name.value.length > 3 && name.value.length < 20 && (
        name.value !== user.value.name ||
        language.value !== user.value.language
    )
);

const loading = ref(false);
const askDeleteConfirmation = ref(false);

async function saveProfile() {
    loading.value = true;

    try {
        await store.updateAccount({ language: language.value, name: name.value });
        hasSaved.value = true;
    } catch(e) {
        error.value = (e as Error).message;
    } finally {
        loading.value = false;
    }
}

const deleteAccount = async () => {
    await store.deleteAccount();
    askDeleteConfirmation.value = false;
};
</script>

<template>
    <ConfirmDialog
        v-model="askDeleteConfirmation"
        :title="$t('deleteAccount')"
        :description="$t('deleteAccountConfirmation')"
        type="warning"
        @confirm="deleteAccount"
        @cancel="() => (askDeleteConfirmation = false)"
    />
    <ConfirmDialog
        v-model="errorDisplayed"
        :title="$t('error')"
        :description="error ?? ''"
        :buttonDescription="$t('close')"
        type="error"
    />
    <Dialog
        v-model="hasSaved"
        :title="$t('success')"
        :description="$t('profileSaved')"
        :buttonDescription="$t('close')"
        type="success"
    />
    <div
        class="w-11/12 sm:w-5/6 xl:w-3/4 2xl:w-2/3 mx-auto p-0 sm:p-8 flex-col"
    >
        <div
            class="bg-gradient rounded-lg shadow-lg p-4 sm:p-6 mb-8 flex flex-col gap-10"
        >
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row justify-center items-center gap-5">
                    <h1 class="text-xl sm:text-2xl">{{ $t('editProfile') }}</h1>
                    <ActionIcon
                        :label="$t('deleteAccount')"
                        :icon="IconUserX"
                        class="hover:scale-110 focus:scale-110 hover:bg-red-400 focus:bg-red-400 transition-all"
                        @click="askDeleteConfirmation = true"
                    />
                </div>
                <RouterLink to="/profile">
                    <img
                        src="/icons/close.png"
                        alt="Account"
                        class="w-10 h-10 ml-2 cursor-pointer hover:scale-110 transition-all"
                    />
                </RouterLink>
            </div>
            <div class="grid grid-cols-3 gap-x-3 items-end">
                <TextInput v-model="name" :label="$t('name')" />
                <Select v-model="language" :label="$t('language')" :options="languages.map((l) => ({ ...l, label: l.text }))" />
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
