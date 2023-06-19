<script setup lang="ts">
import { reactive, ref } from 'vue';
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
const username: inputState = reactive({
    content: user.name,
    hasFocused: undefined
});
const language = ref(user.language);
const hasSaved = ref(false);
const displaySaveError = ref(false);

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
    hasSaved.value = false;
};

const saveProfile = () => {
    hasSaved.value = true;
    if (validateUsername()) {
        user.name = username.content;
        try {
            ApiService.updateUser(user.id, store.getters.token, user);
            store.commit('setUser', user);
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
            :redirection="null"
            @close="hasSaved = false"
        />
        <Modal
            v-else-if="displaySaveError"
            :title="$t('error')"
            :message="$t('usernameTaken')"
            background-color="white"
            title-color="error"
            :redirection="null"
            @close="closeUserTakenModal"
        />
        <Modal
            v-else
            :title="$t('success')"
            :message="$t('profileSaved')"
            background-color="white"
            title-color="primary"
            :redirection="null"
            @close="hasSaved = false"
        />
    </BlurContainer>
    <div class="container mx-auto p-8">
        <!-- Informations de l'utilisateur -->
        <div
            class="bg-gradient rounded-lg shadow-lg p-6 mb-8 flex flex-col gap-10"
        >
            <div class="flex flex-row justify-between items-center">
                <h1 class="text-2xl">{{ $t('editProfile') }}</h1>
                <RouterLink to="/profile">
                    <img
                        src="/icons/default_profile.png"
                        alt="Account"
                        class="w-10 h-10 ml-2 cursor-pointer hover:scale-110 transition-all"
                        @click="$emit('close')"
                    />
                </RouterLink>
            </div>
            <div class="flex flex-row justify-between">
                <div class="flex items-center justify-between mb-4">
                    <div class="flex items-center gap-10">
                        <img
                            src="/icons/default_profile.png"
                            alt="User Avatar"
                            class="w-16 h-16 rounded-full mr-4"
                        />
                        <div class="flex flex-col gap-3">
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
                        <div class="flex flex-col gap-3">
                            <label
                                for=""
                                class="text-base font-medium text-gray-900"
                            >
                                {{ $t('language') }}
                            </label>
                            <select
                                class="block w-full p-2 text-black duration-200 border border-gray-200 rounded-md bg-gray-50"
                            >
                                <option value="en">English</option>
                                <option value="fr">Français</option>
                                <option value="es">Español</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center">
                    <button
                        class="block h-auto p-2 text-black duration-200 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-300"
                        @click="saveProfile"
                        :disabled="areInputsSame()"
                    >
                        {{ $t('saveProfile') }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>