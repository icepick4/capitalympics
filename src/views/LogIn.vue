<script setup lang="ts">
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { notify } from '@/plugins/notifications';
import { useStore } from '@/store';
import { IconUser } from '@tabler/icons-vue';
import { computed, onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

const { t } = useI18n();
const route = useRoute();
const query = computed(() => route.query);

const confirm = async () => {
    await useConfirmDialog({
        title: t('warning'),
        description: t('technicalIssue'),
        cancelText: t('confirmDialog.confirm')
    });
};

onBeforeMount(() => {
    confirm();
});

if (query.value.signedUp) {
    notify({
        title: t('success'),
        message: t('signedUpSuccessfully'),
        type: 'success'
    });
} else if (query.value.expiredToken) {
    notify({
        title: t('error'),
        message: t('expiredToken'),
        type: 'warning'
    });
} else if (query.value.loggedOut) {
    notify({
        title: t('success'),
        message: t('loggedOutSuccessfully'),
        type: 'success'
    });
}

const router = useRouter();
const { login: storeLogin } = useStore();

const name = ref('');
const password = ref('');

const isLoading = ref(false);
const isFormFilled = computed(() => name.value.length && password.value.length);
const userNotFound = ref(false);

async function login() {
    if (!isFormFilled.value) {
        return;
    }

    isLoading.value = true;
    try {
        await storeLogin({
            name: name.value,
            password: password.value
        });
        if (router) {
            router.push({ name: 'Profile' });
        }
    } catch (error) {
        console.error(error);
        userNotFound.value = true;
    } finally {
        isLoading.value = false;
    }
}
</script>

<template>
    <Dialog
        v-model="userNotFound"
        :title="$t('error')"
        :description="$t('userNotFound')"
        :buttonDescription="$t('close')"
        type="error"
    />
    <div class="flex h-full w-full justify-center items-center">
        <section
            class="relative py-10 bg-gray-900 sm:py-16 lg:py-24 flex items-center h-full w-full"
        >
            <div class="absolute inset-0">
                <img
                    class="object-cover w-full h-full"
                    src="/signup.jpg"
                    alt="background"
                />
            </div>
            <div class="absolute bottom-0 right-1 text-white z-10">
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

            <div class="relative max-w-lg px-4 mx-auto sm:px-0">
                <div
                    class="overflow-hidden bg-gradient rounded-md shadow-md p-0 sm:p-5 lg:p-8"
                >
                    <div class="px-4 py-6 sm:px-8 sm:py-7">
                        <div class="text-center">
                            <h2 class="text-3xl font-bold text-gray-900">
                                {{ $t('welcomeBack') }}
                            </h2>
                            <p class="mt-2 text-base text-black">
                                {{ $t('noAccount') }}
                                <RouterLink
                                    to="/signup"
                                    class="text-black hover:underline italic"
                                >
                                    {{ $t('createAccount') }}
                                </RouterLink>
                            </p>
                        </div>
                        <div class="mt-5 space-y-5">
                            <TextInput
                                v-model="name"
                                :label="$t('name')"
                                :placeholder="$t('namePlaceholder')"
                                :prepend-icon="IconUser"
                                @keyup="
                                    ($event.key === 'Enter' ||
                                        $event.key === ' ') &&
                                        login()
                                "
                            />
                            <PasswordInput
                                v-model="password"
                                :label="$t('password')"
                                :placeholder="$t('passwordPlaceholder')"
                                revelable
                                @keyup="
                                    ($event.key === 'Enter' ||
                                        $event.key === ' ') &&
                                        login()
                                "
                            />
                            <button
                                type="button"
                                :disabled="!isFormFilled"
                                class="w-full px-4 py-4 flex justify-center items-center text-base font-semibold text-black bg-white rounded-md transition-all duration-200 delay-100 hover:scale-105 focus:scale-105 disabled:hover:scale-100 disabled:opacity-60 disabled:cursor-not-allowed"
                                @click="login"
                            >
                                <span v-if="!isLoading">{{ $t('login') }}</span>
                                <div
                                    v-else
                                    class="h-5 w-5 border-4 rounded-full border-blue-600/75 border-b-blue-600/25 animate-spin"
                                ></div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
