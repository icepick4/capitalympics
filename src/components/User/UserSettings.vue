<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import { useStore } from 'vuex';
import { User } from '../../models/User';
import ApiService from '../../services/apiService';
import BlurContainer from '../BlurContainer.vue';
import Modal from '../Modal.vue';

interface inputState {
    content: string;
    hasFocused: boolean | undefined;
}

defineEmits(['close']);

const store = useStore();
const user: User = store.getters.user;
const firstUsername = user.name;
const username: inputState = reactive({
    content: user.name,
    hasFocused: undefined
});
const language = ref(user.language);
const hasSaved = ref(false);
const displaySaveError = ref(false);
const usernameAlreadyTaken = ref(false);
const t = useI18n();

const validateUsername = () => {
    if (username.content.length < 3 || username.content.length > 20) {
        return false;
    } else {
        return true;
    }
};

const areInputsSame = () => {
    if (username.content === user.name && language.value === user.language) {
        return true;
    } else {
        return false;
    }
};

const typedUsername = () => {
    username.hasFocused = true;
};

const closeUserTakenModal = () => {
    displaySaveError.value = false;
    usernameAlreadyTaken.value = false;
    hasSaved.value = false;
};

const saveProfile = async () => {
    if (validateUsername()) {
        if (user.name != username.content) {
            user.name = username.content;
        }
        user.language = language.value;
        try {
            let response = await ApiService.updateUser(
                user.id,
                store.getters.token,
                user
            );
            hasSaved.value = true;
            if (!response) {
                usernameAlreadyTaken.value = true;
                user.name = firstUsername;
            } else {
                usernameAlreadyTaken.value = false;
                store.commit('setUser', user);
                t.locale.value = language.value;
            }
        } catch (error) {
            displaySaveError.value = true;
        }
    }
};
</script>

<template>
    <BlurContainer v-if="hasSaved">
        <Modal
            v-if="!validateUsername()"
            :title="$t('error')"
            :message="$t('usernameRestriction')"
            background-color="white"
            title-color="error"
            @close="hasSaved = false"
        />
        <Modal
            v-else-if="displaySaveError"
            :title="$t('error')"
            :message="$t('errorSavingProfile')"
            background-color="white"
            title-color="error"
            @close="closeUserTakenModal"
        />
        <Modal
            v-else-if="usernameAlreadyTaken"
            :title="$t('error')"
            :message="$t('usernameTaken')"
            background-color="white"
            title-color="error"
            @close="closeUserTakenModal"
        />
        <Modal
            v-else
            :title="$t('success')"
            :message="$t('profileSaved')"
            background-color="white"
            title-color="primary"
            @close="hasSaved = false"
        />
    </BlurContainer>
    <div
        class="w-11/12 sm:w-5/6 xl:w-3/4 2xl:w-2/3 mx-auto p-0 sm:p-8 flex-col"
    >
        <div
            class="bg-gradient rounded-lg shadow-lg p-4 sm:p-6 mb-8 flex flex-col gap-10"
        >
            <div class="flex flex-row justify-between items-center">
                <h1 class="text-xl sm:text-2xl">{{ $t('editProfile') }}</h1>
                <RouterLink to="/profile">
                    <img
                        src="/icons/close.png"
                        alt="Account"
                        class="w-10 h-10 ml-2 cursor-pointer hover:scale-110 transition-all"
                        @click="$emit('close')"
                    />
                </RouterLink>
            </div>
            <form
                @submit.prevent="saveProfile"
                class="flex flex-col lg:flex-row justify-between"
            >
                <div class="flex items-center justify-between mb-8">
                    <div
                        class="flex flex-col lg:flex-row items-center gap-10 w-full"
                    >
                        <img
                            src="/icons/default_profile.png"
                            alt="User Avatar"
                            class="w-16 h-16 rounded-full mr-4"
                        />
                        <div class="flex flex-col gap-3 w-full md:w-1/2">
                            <label
                                for=""
                                class="text-base font-medium text-gray-900"
                            >
                                {{ $t('username') }}
                            </label>
                            <span
                                v-if="
                                    username.hasFocused === false &&
                                    !validateUsername()
                                "
                                class="text-error text-sm text-center"
                                >{{ $t('usernameRestriction') }}
                            </span>
                            <input
                                class="block w-full p-2 text-black duration-200 border border-gray-200 rounded-md bg-gray-50"
                                @input="typedUsername"
                                v-model="username.content"
                                @focusin="username.hasFocused = true"
                                @focusout="username.hasFocused = false"
                            />
                        </div>
                        <div class="flex flex-col gap-3 w-full md:w-1/2">
                            <label
                                for=""
                                class="text-base font-medium text-gray-900"
                            >
                                {{ $t('language') }}
                            </label>
                            <select
                                class="block w-full p-2 text-black duration-200 border border-gray-200 rounded-md bg-gray-50"
                                v-model="language"
                            >
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Spanish</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <input
                        class="block h-auto p-2 text-black duration-200 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-300"
                        :disabled="areInputsSame()"
                        :value="$t('saveProfile')"
                        type="submit"
                    />
                </div>
            </form>
        </div>
    </div>
</template>
