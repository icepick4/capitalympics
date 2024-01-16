<script setup lang="ts">
import ApiService from '@/services/apiService';
import { languages } from '@/utils/common';
import { IconLanguage, IconUser } from '@tabler/icons-vue';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink, useRouter } from 'vue-router';

const { t } = useI18n();
const router = useRouter();

const name = ref('');
const password = ref('');
const passwordConfirmation = ref('');
const language = ref('en');

const isLoading = ref(false);
const signedUpFailed = ref(false);

const errors = ref<Record<string, string | undefined>>({
    name: undefined,
    password: undefined
});

watch(name, () => (errors.value.name = undefined));
watch(password, () => (errors.value.password = undefined));

// We retrieve the users count from the API
const numberOfPeople = ref(0);
(async () => {
    const response = await ApiService.getUsersCount();
    numberOfPeople.value = response;
})();

async function signup() {
    validateForm();
    if (errors.value.name || errors.value.password) {
        return;
    }

    isLoading.value = true;

    try {
        await ApiService.signUp(name.value, password.value, language.value);
        router.push({
            path: '/login',
            query: { signedUp: '1' }
        });
    } catch (error) {
        signedUpFailed.value = true;
    } finally {
        isLoading.value = false;
    }
}

const canTryToSignup = computed(() => {
    return (
        name.value?.length &&
        password.value?.length &&
        password.value === passwordConfirmation.value
    );
});

const validatePassword = () => {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(password.value);
};

const validateUsername = () => {
    return name.value.length >= 3 && name.value.length <= 20;
};

const validateForm = () => {
    errors.value.password = validatePassword()
        ? undefined
        : t('passwordRestriction');
    errors.value.name = validateUsername() ? undefined : t('nameRestriction');
};
</script>

<template>
    <Dialog
        v-model="signedUpFailed"
        :title="$t('error')"
        :description="$t('nameTaken')"
        :buttonDescription="$t('close')"
        type="error"
    />
    <div class="flex h-full w-full justify-center items-center">
        <section class="h-full flex w-full justify-center">
            <div class="grid grid-cols-1 lg:grid-cols-2 w-full">
                <div
                    class="relative flex items-center px-4 pb-10 pt-10 sm:pb-16 md:justify-center lg:pb-24 sm:px-6 lg:px-8"
                >
                    <div class="absolute top-0 right-1 text-white z-40">
                        Photo of
                        <a
                            href="https://unsplash.com/@nasa?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                            >NASA</a
                        >
                        on
                        <a
                            href="https://unsplash.com/fr/photos/6-jTZysYY_U?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
                            >Unsplash</a
                        >
                    </div>
                    <div class="absolute inset-0">
                        <img
                            class="object-cover w-full h-full"
                            src="/signup.jpg"
                            alt="background"
                        />
                    </div>
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black to-transparent"
                    ></div>

                    <div class="relative">
                        <div
                            class="w-full max-w-xl xl:w-full xl:mx-auto xl:pr-24 xl:max-w-xl"
                        >
                            <h3 class="text-4xl font-bold text-white">
                                {{ numberOfPeople }} {{ $t('peopleUsing') }}
                                <br class="hidden xl:block" />
                                Capitalympics!
                            </h3>
                            <ul
                                class="grid grid-cols-1 mt-10 sm:grid-cols-2 gap-x-8 gap-y-4"
                            >
                                <li class="flex items-center space-x-3">
                                    <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full"
                                    >
                                        <img
                                            src="/icons/medal.png"
                                            alt="medal"
                                        />
                                    </div>
                                    <span
                                        class="text-xl font-medium text-white"
                                    >
                                        {{ $t('signUpText1') }}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3">
                                    <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full"
                                    >
                                        <img
                                            src="/icons/medal.png"
                                            alt="medal"
                                        />
                                    </div>
                                    <span
                                        class="text-xl font-medium text-white"
                                    >
                                        {{ $t('signUpText2') }}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3">
                                    <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full"
                                    >
                                        <img
                                            src="/icons/medal.png"
                                            alt="medal"
                                        />
                                    </div>
                                    <span
                                        class="text-xl font-medium text-white"
                                    >
                                        {{ $t('signUpText3') }}
                                    </span>
                                </li>
                                <li class="flex items-center space-x-3">
                                    <div
                                        class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full"
                                    >
                                        <img
                                            src="/icons/medal.png"
                                            alt="medal"
                                        />
                                    </div>
                                    <span
                                        class="text-xl font-medium text-white"
                                    >
                                        {{ $t('signUpText4') }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div
                    class="flex items-center justify-center px-4 py-10 sm:px-6 lg:px-8 sm:py-16 lg:py-24 bg-gradient"
                >
                    <div class="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                        <h2
                            class="text-3xl font-bold leading-tight text-black sm:text-4xl"
                        >
                            {{ $t('signUpTo') }} Capitalympics
                        </h2>
                        <p class="mt-2 text-base text-black">
                            {{ $t('alreadyHaveAccount') }}
                            <RouterLink
                                to="/login"
                                class="font-medium text-black italic hover:underline"
                            >
                                {{ $t('login') }}
                            </RouterLink>
                        </p>
                        <div class="mt-8 space-y-5">
                            <TextInput
                                v-model="name"
                                :label="$t('name')"
                                :placeholder="$t('namePlaceholder')"
                                :prepend-icon="IconUser"
                                :error="errors.name"
                            />
                            <PasswordInput
                                v-model="password"
                                :label="$t('password')"
                                :placeholder="$t('passwordPlaceholder')"
                                :error="errors.password"
                                revelable
                            />
                            <PasswordInput
                                v-model="passwordConfirmation"
                                :label="$t('passwordConfirmation')"
                                :placeholder="
                                    $t('passwordConfirmationPlaceholder')
                                "
                            />
                            <Select
                                v-model="language"
                                :label="$t('language')"
                                :options="
                                    languages.map((lang) => ({
                                        ...lang,
                                        label: lang.text
                                    }))
                                "
                                :prepend-icon="IconLanguage"
                            />
                            <div class="pt-2">
                                <button
                                    type="button"
                                    :disabled="!canTryToSignup || isLoading"
                                    class="w-full flex items-center justify-center px-4 py-4 text-base font-semibold text-black bg-white rounded-md transition-all duration-200 delay-100 hover:scale-105 focus:scale-105 disabled:hover:scale-100 disabled:opacity-60 disabled:cursor-not-allowed outline outline-2 outline-offset-2 outline-transparent focus-visible:outline-blue-600/75"
                                    @click="signup"
                                >
                                    <span v-if="!isLoading">{{
                                        $t('signup')
                                    }}</span>
                                    <div
                                        v-else
                                        class="h-5 w-5 border-4 rounded-full border-blue-600/75 border-b-blue-600/25 animate-spin"
                                    ></div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
