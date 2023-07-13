import type { User } from '@/models/User';
import { Maybe } from '@/types/common';
import ApiClient, { SuccessResponse } from '@/utils/ApiClient';
import { defineStore } from 'pinia';
import { isObject } from 'radash';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

export const useStore = defineStore('app', () => {
    const router = useRouter();
    const i18n = useI18n();

    const user = ref<Maybe<User>>();

    const isAuthenticated = ref(!!ApiClient.token);
    const isCurrentUserLoaded = computed(() => isObject(user.value));

    async function login(loginData: { username: string, password: string })
    {
        if (!(await ApiClient.login(loginData))) {
            throw new Error('Login failed');
        }

        isAuthenticated.value = true;
        await loadCurrentUser();
        i18n.locale.value = (user.value as User).language ?? 'en';
    }

    async function loadCurrentUser()
    {
        if (!isAuthenticated.value || isCurrentUserLoaded.value) {
            return;
        }

        const response = await ApiClient.get<SuccessResponse<User>>('/me');
        if (!response.success) {
            throw new Error('Failed to load current user');
        }

        user.value = response.data.data;
    }

    async function logout()
    {
        user.value = null;
        isAuthenticated.value = false;
        ApiClient.logout();

        router.push({ name: 'Home' });
    }

    return {
        isAuthenticated,
        isCurrentUserLoaded,
        loadCurrentUser,
        login,
        logout,
        user,
    };
});
