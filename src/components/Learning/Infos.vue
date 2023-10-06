<script setup lang="ts">
import { IconX } from '@tabler/icons-vue';

defineProps<{
    show: boolean;
}>();

const emit = defineEmits(['close']);
</script>

<template>
    <div
        class="bg-gray-100 p-4 md:p-8 rounded-lg shadow-lg m-5 sm:m-20 md:m-52 fixed top-0 bottom-0 left-0 right-0 z-50 w-auto overflow-y-scroll custom-scroll"
        v-if="show"
    >
        <IconX
            class="w-8 h-8 hover:scale-110 hover:cursor-pointer transition-all absolute top-3 right-3"
            @click="emit('close')"
        />
        <h2 class="text-2xl font-semibold mb-4">Comprendre l'Apprentissage</h2>
        <div class="text-gray-700 mb-4">
            <p>
                L'apprentissage est un processus dynamique qui peut se résumer
                en plusieurs étapes :
            </p>
        </div>
        <div class="mb-4">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    1
                </div>
                <div>
                    <p>
                        Votre objectif est de répondre à une question, dans
                        votre tête dans un premier temps, par exemple, "Trouvez
                        la capitale du Japon".
                    </p>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    2
                </div>
                <div>
                    <p>
                        À ce moment-là, vous évaluez si vous connaissez la
                        réponse ou non (toujours dans votre tête), il y a trois
                        scénarios possibles :
                    </p>
                    <ul class="ml-6 list-disc">
                        <li>Vous connaissez immédiatement la réponse.</li>
                        <li>
                            Vous devez prendre un moment pour réfléchir et
                            trouver la réponse.
                        </li>
                        <li>Vous ne savez pas du tout la réponse.</li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    3
                </div>
                <div>
                    <p>
                        Une fois que vous êtes sûr de votre réponse, vous
                        cliquez sur le bouton "Dévoiler".
                    </p>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    4
                </div>
                <div>
                    <p>
                        Ensuite, vous ajustez votre réponse en fonction de ce
                        que vous pensiez :
                    </p>
                    <ul class="ml-6 list-disc">
                        <li>
                            Si vous pensiez avoir la bonne réponse, mais ce
                            n'était pas le cas, vous pouvez la marquer comme
                            "Difficile".
                        </li>
                        <li>
                            Si votre réponse était correcte, vous la validez
                            comme "Facile".
                        </li>
                        <li>
                            Si vous ne saviez pas du tout la réponse, vous
                            pouvez la classer comme "Difficile".
                        </li>
                        <li>
                            Si vous avez hésitez entre deux vous pouvez utiliser
                            la réponse "Moyen".
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mb-4">
            <div class="flex items-start">
                <div
                    class="rounded-full bg-blue-500 text-white w-6 h-6 flex items-center justify-center mr-4 min-w-[1.5rem]"
                >
                    5
                </div>
                <div>
                    <p>
                        En suivant ce processus et en respectant vos réponses,
                        les éléments sur lesquels vous avez le plus de
                        difficultés seront révisés plus fréquemment pour
                        faciliter votre apprentissage.
                    </p>
                </div>
            </div>
        </div>
        <div class="text-gray-700 mt-4">
            <p>Bon apprentissage !</p>
        </div>
    </div>
</template>

<style scoped>
::-webkit-scrollbar {
    width: 12px;
}

::-webkit-scrollbar-thumb {
    background-color: #4a90e2;
    border-radius: 6px;
}

::-webkit-scrollbar-track {
    background-color: #f1f1f1;
    border-radius: 6px;
}
</style>
