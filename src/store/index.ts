import type { User } from '@/models/User';
import { Maybe } from '@/types/common';
import ApiClient, { SuccessResponse } from '@/utils/ApiClient';
import { getLanguage } from '@/utils/common';
import { defineStore } from 'pinia';
import { isObject } from 'radash';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useContinentsStore } from './continents';
import { useCountriesStore } from './countries';
import { useRegionsStore } from './regions';

export const useStore = defineStore('app', () => {
    const continentsStore = useContinentsStore();
    const countriesStore = useCountriesStore();
    const regionsStore = useRegionsStore();

    const router = useRouter();
    const i18n = useI18n();

    const user = ref<Maybe<User>>();
    watch(
        () => user.value?.language,
        (language) => {
            i18n.locale.value = language ?? getLanguage();
            loadMandatoryData();
        }
    );

    const isAuthenticated = ref(!!ApiClient.token);
    const isCurrentUserLoaded = computed(() => isObject(user.value));

    function loadMandatoryData() {
        return Promise.all([
            continentsStore.loadContinents(),
            countriesStore.loadCountries(),
            regionsStore.loadRegions()
        ]);
    }

    async function login(loginData: { name: string; password: string }) {
        if (!(await ApiClient.login(loginData))) {
            throw new Error('Login failed');
        }

        isAuthenticated.value = true;
        await loadCurrentUser();
    }

    async function loadCurrentUser() {
        if (!isAuthenticated.value || isCurrentUserLoaded.value) {
            return;
        }

        const response = await ApiClient.get<SuccessResponse<User>>('/me');
        if (!response.success) {
            logout({ failedToLoadCurrentUser: '1' });
            throw new Error('Failed to load current user');
        }

        console.log('Loaded current user', response.data.data);

        user.value = response.data.data;
    }

    function logout(
        query: { [key: string]: string },
        redirectRouteName: string = 'Home'
    ) {
        isAuthenticated.value = false;
        ApiClient.logout();
        user.value = null;

        router.push({ name: redirectRouteName, query });
    }

    async function updateAccount(data: Partial<User>) {
        if (!isAuthenticated.value || !isCurrentUserLoaded.value) {
            throw new Error('Not authenticated');
        }

        const response = await ApiClient.patch<{
            success: true;
            user: User;
        }>('/me', data);

        if (!response.success) {
            throw new Error('Failed to update current user');
        }

        user.value = response.data.user;
    }

    async function updateAvatar(avatar: User['avatar']) {
        if (!isAuthenticated.value || !isCurrentUserLoaded.value) {
            throw new Error('Not authenticated');
        }

        const response = await ApiClient.patch<{
            success: true;
            user: User;
        }>('/me/avatar', { avatar });

        if (!response.success) {
            throw new Error('Failed to update current user');
        }

        user.value = response.data.user;
    }

    async function deleteAccount() {
        if (!isAuthenticated.value || !isCurrentUserLoaded.value) {
            throw new Error('Not authenticated');
        }

        const response = await ApiClient.delete<{ success: true }>('/me');
        if (!response.success) {
            throw new Error('Failed to delete current user');
        }

        logout({ deletedAccount: '1' });
    }

    return {
        deleteAccount,
        isAuthenticated,
        isCurrentUserLoaded,
        loadCurrentUser,
        loadMandatoryData,
        login,
        logout,
        updateAccount,
        updateAvatar,
        user
    };
});
