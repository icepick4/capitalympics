<script setup lang="ts">
import { useConfirmDialog } from '@/composables/confirm-dialog';
import { User } from '@/models/User';
import ApiService from '@/services/apiService';
import { useStore } from '@/store';
import {
    IconChartBar,
    IconListNumbers,
    IconLogout2,
    IconSettings,
    IconUser
} from '@tabler/icons-vue';
import { DateTime } from 'luxon';
import { storeToRefs } from 'pinia';
import { Ref, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { RouterLink } from 'vue-router';
import Badge from '../Badge.vue';
import StatCardContainer from '../Statistics/StatCardContainer.vue';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;
if (!user.value) {
    store.logout({ loggedOut: '1' });
}

const { t } = useI18n();

const flagScore = ref(-2);
const capitalScore = ref(-2);

onMounted(async () => {
    const { capital, flag } = await ApiService.getUserScore();
    flagScore.value = flag;
    capitalScore.value = capital;
});

const isToday = (date: DateTime): boolean => {
    return date.toISODate() === DateTime.local().toISODate();
};

const isNow = (date: DateTime): boolean => {
    return date.diffNow().as('minutes') < 10;
};

const formatDate = (date: DateTime) => {
    if (isToday(date)) {
        return t('today');
    }

    if (isNow(date)) {
        return t('now');
    }

    return date.toLocaleString(DateTime.DATE_MED);
};

async function disconnect() {
    const hasConfirmed = await useConfirmDialog({
        title: t('logOutConfirmation'),
        description: t('loginPageRedirect'),
        cancelText: t('no'),
        confirmText: t('yes')
    });

    if (!hasConfirmed) return;
    store.logout({ loggedOut: '1' });
}
</script>

<template>
    <div
        class="w-full h-full flex flex-col items-center justify-center mt-10 mb-10"
    >
        <div class="w-full md:w-5/6 xl:3/4 2xl:w-2/3 mx-auto p-4 sm:p-8">
            <div class="flex flex-col sm:flex-row justify-end sm:gap-2">
                <div class="flex flex-col items-end justify-end gap-2">
                    <span class="text-2xl xs:text-lg sm:text-2xl font-thin">{{
                        $t('flags')
                    }}</span>
                    <Badge
                        v-if="flagScore !== -2"
                        :score="flagScore"
                        size="md"
                        :progress="true"
                        class="mb-4"
                    />
                </div>
                <div class="flex flex-col items-end justify-end gap-2">
                    <span class="text-2xl xs:text-lg sm:text-2xl font-thin">{{
                        $t('capitals')
                    }}</span>
                    <Badge
                        v-if="capitalScore !== -2"
                        :score="capitalScore"
                        size="md"
                        :progress="true"
                        class="mb-4"
                    />
                </div>
            </div>
            <!-- Informations de l'utilisateur -->
            <div class="bg-gradient rounded-lg shadow-lg p-3 sm:p-6 mb-10">
                <div
                    class="flex column flex-row items-center justify-center mb-4 gap-4"
                >
                    <div class="flex items-center">
                        <IconUser
                            class="w-10 h-10 sm:w-10 sm:h-10 rounded-full mr-4"
                        />
                        <h1 class="text-2xl mr-1 font-bold">
                            {{ user?.name }}
                        </h1>
                    </div>
                    <div
                        class="flex items-center center justify-end gap-4 w-full"
                    >
                        <RouterLink to="/profile/statistics">
                            <IconChartBar
                                class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                                @click="$emit('close')"
                            />
                        </RouterLink>
                        <RouterLink to="/profile/scores">
                            <IconListNumbers
                                class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                            />
                        </RouterLink>
                        <RouterLink to="/profile/edit">
                            <IconSettings
                                class="w-8 h-8 cursor-pointer hover:rotate-180 transition-all duration-500"
                                @click="$emit('close')"
                            />
                        </RouterLink>
                        <IconLogout2
                            class="w-8 h-8 cursor-pointer hover:scale-110 transition-all"
                            @click="disconnect"
                        />
                    </div>
                </div>
                <p class="text-black mb-2">
                    {{ $t('lastActivity') }} :
                    {{ formatDate(DateTime.fromISO(user?.updated_at)) }}
                </p>
                <p class="text-black">
                    {{ $t('joined') }} :
                    {{ formatDate(DateTime.fromISO(user?.created_at)) }}
                </p>
            </div>
        </div>
        <StatCardContainer />
    </div>
</template>

<style scoped>
@keyframes rotate {
    from {
        transform: rotate(-360deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 340px) {
    .column {
        flex-direction: column;
    }

    .center {
        justify-content: center;
    }
}

input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
}
</style>
