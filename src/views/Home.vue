<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { User } from '../models/User';
import { Redirection } from '../types/Redirection';

const store = useStore();
const user: User = ref(store.getters.user);
console.log(user);
// watchEffect(() => {
//     user.value = store.getters.user;
// });
const redirection: Redirection = {
    backgroundColor: 'primary',
    redirectionLink: '/countries',
    text: "Refaire l'inscription",
    textColor: 'black'
};
</script>

<template>
    <h1 class="text-white text-center text-6xl">Capitalympics !</h1>
    <!-- <BlurContainer>
        <Modal
            :title="'Utilisateur déjà existant'"
            :message="'Veuillez choisir un autre pseudo'"
            :backgroundColor="'white'"
            :titleColor="'error'"
            :redirection="redirection"
        /
        <Loader />
    </BlurContainer> -->
    <div class="flex flex-col justify-center items-center" v-if="user">
        <h2 class="text-white text-center text-3xl">Welcome {{ user.name }}</h2>
        <h3 class="text-white text-center text-3xl">
            Your score is {{ user.level }}
        </h3>
    </div>
</template>

<style scoped></style>
