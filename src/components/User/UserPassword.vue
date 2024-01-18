<script setup lang="ts">
import { notify } from '@/plugins/notifications';
import { useStore } from '@/store';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const store = useStore();

const password = ref('');
const oldPassword = ref('');
const passwordConfirmation = ref('');

const isLoading = ref(false);

const errors = ref<Record<string, string | undefined>>({
    password: undefined,
    oldPassword: undefined
});

watch(password, () => (errors.value.password = undefined));

const canTryToSignup = computed(
    () =>
        password.value.length >= 8 &&
        password.value === passwordConfirmation.value
);

const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password.value);
};

const validateForm = () => {
    errors.value.password = validatePassword()
        ? undefined
        : t('passwordRestriction');
    errors.value.oldPassword =
        oldPassword.value.length > 0 ? undefined : t('oldPasswordRequired');
};

const signup = async () => {
    validateForm();
    if (errors.value.password || errors.value.oldPassword) return;

    isLoading.value = true;

    try {
        await store.updatePassword({
            newPassword: password.value,
            oldPassword: oldPassword.value
        });

        notify({
            type: 'success',
            title: t('success'),
            message: t('passwordUpdated')
        });
    } catch (e) {
        errors.value.oldPassword = t('wrongPassword');
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="mt-8 space-y-5">
        <PasswordInput
            v-model="oldPassword"
            :label="$t('oldPassword')"
            :placeholder="$t('oldPasswordPlaceholder')"
            :error="errors.oldPassword"
        />
        <PasswordInput
            v-model="password"
            :label="$t('newPassword')"
            :placeholder="$t('newPasswordPlaceholder')"
            :error="errors.password"
            revelable
        />
        <PasswordInput
            v-model="passwordConfirmation"
            :label="$t('newPasswordConfirmation')"
            :placeholder="$t('newPasswordConfirmationPlaceholder')"
        />
        <div class="pt-2">
            <button
                type="button"
                :disabled="!canTryToSignup || isLoading"
                class="w-full flex items-center justify-center px-4 py-4 text-base font-semibold text-black bg-white rounded-md transition-all duration-200 delay-100 hover:scale-105 focus:scale-105 disabled:hover:scale-100 disabled:opacity-60 disabled:cursor-not-allowed outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75"
                @click="signup"
            >
                <span v-if="!isLoading">{{ $t('signup') }}</span>
                <div
                    v-else
                    class="h-5 w-5 border-4 rounded-full border-blue-600/75 border-b-blue-600/25 animate-spin"
                ></div>
            </button>
        </div>
    </div>
</template>
