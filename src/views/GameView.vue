<template>
  <div class="flex-col w-h-screen overflow-y-hidden" data-aos="fade-in">
    <div
      class="border-b-2 border-y-blue-50 text-center overflow-y-hidden p-3"
      data-aos="fade-in"
      data-aos-delay="400"
    >
      <p class="text-xl font-bold text-white">
        {{
          gameStore.endgameText
            ? gameStore.endgameText
            : `Hi ${gameStore.name}, can you memorize the cards? Select two at a time!`
        }}
      </p>
    </div>
    <div class="flex-col m-auto p-4 lg:w-3/5 h-full" data-aos="fade-in" data-aos-delay="800">
      <p class="text-xl font-bold text-white text-center mb-4">attempts: {{ gameStore.tries }}</p>
      <Board></Board>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import Board from '../components/Board.vue';
import { useGameStore } from '../stores/game';
import router from '@/router';

const gameStore = useGameStore();

onMounted(() => {
  if (!gameStore.name || !gameStore.difficulty) {
    router.push('/');
  }
});
</script>
