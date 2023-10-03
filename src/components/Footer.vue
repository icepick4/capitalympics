<script setup lang="ts">
import { useStore } from '@/store';
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandReddit,
    IconLogin,
    IconMail,
    IconUser,
    IconWorld
} from '@tabler/icons-vue';
import { storeToRefs } from 'pinia';

const { isAuthenticated } = storeToRefs(useStore());
</script>
<template>
    <div class="w-full bg-white p-6 flex items-center justify-center">
        <div class="flex flex-row justify-between items-center w-2/3">
            <div class="flex flex-row gap-5 items-center">
                <RouterLink to="/">
                    <img src="/logo.png" class="w-3/4 h-3/4" />
                </RouterLink>
            </div>
            <div class="flex flex-col gap-5 items-start">
                <h1 class="text-xl text-center">{{ $t('contacts') }}</h1>
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
            </div>
            <div class="flex flex-col gap-5 items-start">
                <h1 class="text-xl text-center">{{ $t('quickLinks') }}</h1>
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
                    <IconUser class="w-6 h-6" />
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
            </div>
            <div class="flex flex-col gap-5 items-start">
                <h1 class="text-xl text-center">{{ $t('socials') }}</h1>
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
            </div>
        </div>
    </div>
    <div
        class="w-full flex flex-col gap-5 justify-center items-center bg-white p-6"
    >
        <div class="bg-black h-[2px] w-1/2"></div>
        <h1 class="text-lg text-center">© Copyright 2023 - Rémi JARA</h1>
    </div>
</template>

<style scoped>
.cubic-bezier {
    transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
</style>
