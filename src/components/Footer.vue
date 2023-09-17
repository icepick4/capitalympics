<script setup lang="ts">
import {
    IconBrandGithub,
    IconBrandLinkedin,
    IconBrandReddit,
    IconMail
} from '@tabler/icons-vue';
</script>
<template>
    <div class="w-full bg-white">
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-col gap-5 items-center">
                <a
                    href="https://github.com/icepick4"
                    class="flex flex-row gap-3 items-center group cursor-pointer"
                >
                    <div>
                        <p>Github</p>
                        <div
                            class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                        ></div>
                    </div>
                    <IconBrandGithub class="w-6 h-6" />
                </a>
                <a
                    href="https://linkedin.com/in/remijara"
                    class="flex flex-row gap-3 items-center group cursor-pointer"
                >
                    <div>
                        <p>LinkedIn</p>
                        <div
                            class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                        ></div>
                    </div>
                    <IconBrandLinkedin class="w-6 h-6" />
                </a>
                <a
                    href="mailto:remi.jara4@gmail.com"
                    class="flex flex-row gap-3 items-center group cursor-pointer"
                >
                    <div>
                        <p>Email</p>
                        <div
                            class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                        ></div>
                    </div>
                    <IconMail class="w-6 h-6" />
                </a>
                <a
                    href="https://www.reddit.com/user/IcePick444"
                    class="flex flex-row gap-3 items-center group cursor-pointer"
                >
                    <div>
                        <p>Reddit</p>
                        <div
                            class="bg-black h-[1px] w-0 transition-all duration-300 group-hover:w-full cubic-bezier"
                        ></div>
                    </div>
                    <IconBrandReddit class="w-6 h-6" />
                </a>
            </div>
            <div class="flex flex-row gap-5 items-center">
                <IconGithub class="w-10 h-10" />
                <IconLinkedin class="w-10 h-10" />
            </div>
        </div>
    </div>
</template>

<style scoped>
.cubic-bezier {
    transition: width 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67);
    transition-timing-function: cubic-bezier(0.17, 0.67, 0.83, 0.67);
}
</style>
