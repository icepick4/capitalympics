<script setup lang="ts">
import { User } from '@/models/User';
import { useStore } from '@/store';
import { storeToRefs } from 'pinia';
import { Ref, onBeforeMount, ref, watch } from 'vue';
import { createAvatar } from '@dicebear/core';
import { personas } from '@dicebear/collection';
import ApiService from '@/services/apiService';

const store = useStore();
const user = storeToRefs(store).user as Ref<User>;

const props = defineProps<{
    size: 'sm' | 'md' | 'lg';
}>();

const avatar = ref('');
const userScoreCapital = ref(0);
const userScoreFlag = ref(0);

watch(user, (newUser) => {
  if (newUser) {
    generateAvatar(newUser);
  }
});

function generateAvatar(user: User){
    avatar.value = createAvatar(personas, {
      size: props.size == 'sm' ? 48 : 96,
      seed: user.created_at,
      backgroundColor: generateBackgroundColors(userScoreCapital.value, userScoreFlag.value),
      backgroundType: ['solid'],
      mouth: ['smile', 'bigSmile', 'surprise', 'smirk'],
      nose: ['mediumRound', 'smallRound'],
      skinColor: ['21a6ff'],
      radius: 100
    }).toDataUriSync();
}

const initUserScore = async () => {
    try {
        const { capital, flag } = await ApiService.getUserScore();
        userScoreCapital.value = capital;
        userScoreFlag.value = flag;
    } catch (error) {
        console.log(error);
    }
};

setTimeout(() => {generateAvatar(user.value)}, 200);


function generateBackgroundColors(capitalScore: number, flagScore: number): string[] {
  const averageScore = (capitalScore + flagScore) / 2;
  const colorPallete = getColorPallete();
  const colorIndex = Math.floor(averageScore / 8.33);
  console.log(colorPallete[colorIndex])
  return [colorPallete[colorIndex]];
}

function getColorPallete() {
  return ['eeeeee', 'e0e0e0', 'bdbdbd', 'fff59d', 'fff176', 'ffee58', '81c784', '66bb6a', '4caf50', '42a5f5', '2196f3', 'ce93d8'];
}

onBeforeMount(async () => {
    await initUserScore();
});
</script>

<template>
  <img :src="avatar" alt="Avatar" />
</template>
