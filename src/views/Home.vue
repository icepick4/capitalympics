<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import BlurContainer from '../components/BlurContainer.vue';
import Modal from '../components/Modal.vue';
import { Redirection } from '../types/Redirection';

const store = useStore();
const user = ref(store.getters.user);
// watchEffect(() => {
//     user.value = store.getters.user;
// });
const redirection: Redirection = {
    backgroundColor: 'error',
    redirectionLink: '/countries',
    text: 'Countries',
    textColor: 'black'
};
</script>

<template>
    <!-- <h1 class="text-white text-center text-6xl">Capitalympics !</h1> -->
    <BlurContainer>
        <Modal
            :title="'TEST TITLE'"
            :message="'TEST MESSAGE'"
            :backgroundColor="'white'"
            :titleColor="'primary'"
            :redirection="redirection"
        />
    </BlurContainer>
    <div class="flex flex-col justify-center items-center" v-if="user">
        <h2 class="text-white text-center text-3xl">Welcome {{ user.name }}</h2>
        <h3 class="text-white text-center text-3xl">
            Your score is {{ user.level }}
        </h3>
    </div>
</template>

<style scoped></style>
