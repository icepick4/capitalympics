<script setup lang="ts">
import ProfilePicture from '@/components/User/ProfilePicture.vue';
import { useStore } from '@/store';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandReddit,
    IconDeviceDesktop,
    IconFileText,
    IconId,
    IconLogin,
    IconMail,
    IconWorld
} from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';
import BuyMeACoffee from './BuyMeACoffee.vue';

const { isAuthenticated } = storeToRefs(useStore());
</script>
<template>
    <div class="flex flex-col">
        <div class="w-full bg-white p-6 py-8 flex items-center justify-center">
            <div
                class="flex flex-col md:flex-row justify-between items-start w-3/4 gap-10 xl:gap-0"
            >
                <div class="hidden xl:flex flex-row gap-5 items-center">
                    <RouterLink to="/">
                        <img src="/logo.png" class="w-3/4 h-3/4" />
                    </RouterLink>
                </div>
                <div class="flex flex-col gap-5 items-start">
                    <h1 class="text-2xl text-start">{{ $t('contacts') }}</h1>
                    <a
                        href="https://linkedin.com/in/remijara"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconBrandLinkedin class="w-6 h-6" />
                        <div>
                            <p>LinkedIn</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>
                    <a
                        href="mailto:remi.jara4@gmail.com"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconMail class="w-6 h-6" />
                        <div>
                            <p>Email</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>
                    <BuyMeACoffee />
                </div>
                <div class="flex flex-col gap-5 items-start">
                    <h1 class="text-2xl text-start">{{ $t('quickLinks') }}</h1>
                    <RouterLink
                        to="/countries"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconWorld class="w-6 h-6" />
                        <div>
                            <p>{{ $t('countries') }}</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </RouterLink>
                    <RouterLink
                        to="/profile"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                        v-if="isAuthenticated"
                    >
                        <ProfilePicture size="sm" />
                        <div>
                            <p>{{ $t('myProfile') }}</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </RouterLink>
                    <RouterLink
                        to="/login"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                        v-else
                    >
                        <IconLogin class="w-6 h-6" />
                        <div>
                            <p>{{ $t('login') }}</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </RouterLink>
                    <RouterLink
                        to="/legal-notices"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconFileText class="w-6 h-6" />
                        <div>
                            <p>{{ $t('legalNotices') }}</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </RouterLink>
                </div>
                <div class="flex flex-col gap-5 items-start">
                    <h1 class="text-2xl text-start">{{ $t('socials') }}</h1>
                    <a
                        href="https://github.com/icepick4"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconBrandGithub class="w-6 h-6" />
                        <div>
                            <p>Github</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>

                    <a
                        href="https://www.reddit.com/user/IcePick444"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconBrandReddit class="w-6 h-6" />
                        <div>
                            <p>Reddit</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>
                    <a
                        href="https://remi-jara.fr"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconDeviceDesktop class="w-6 h-6" />
                        <div>
                            <p>Portfolio</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>
                    <a
                        href="https://bento.me/remij"
                        class="flex flex-row gap-3 items-center group cursor-pointer"
                    >
                        <IconId class="w-6 h-6" />
                        <div>
                            <p>Bento</p>
                            <div
                                class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                            ></div>
                        </div>
                    </a>
                </div>
            </div>
        </div>
        <div
            class="w-full flex flex-col gap-5 justify-center items-center bg-white p-6"
        >
            <div class="bg-black h-[2px] w-1/2"></div>
            <h1 class="text-lg text-center">
                © Copyright 2024 -
                <a href="https://github.com/icepick4" class="hover:underline"
                    >Rémi JARA</a
                >
            </h1>
        </div>
    </div>
</template>

<style scoped>
.cubic-bezier {
    transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
</style>
