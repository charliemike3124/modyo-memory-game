<template>
  <div class="flex h-screen text-center justify-center items-center">
    <div class="p-4">
      <h1 class="text-3xl font-bold text-white mb-6" data-aos="fade-down">
        Welcome to <br />
        <img :src="modyo" />
        memory game!
      </h1>
      <form
        class="flex flex-col items-center mt-5 mb-40"
        data-aos="fade-up"
        data-aos-delay="500"
        @submit="onSubmit"
      >
        <input
          type="text"
          class="w-full max-w-xs px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500"
          placeholder="Enter your name"
          v-model="gameStore.name"
        />
        <select
          class="w-full max-w-xs px-4 py-2 rounded-md bg-gray-800 text-white placeholder-gray-500 mt-4"
          v-model="gameStore.difficulty"
        >
          <option :value="null" disabled>Select difficulty</option>
          <option :value="{ type: { name: 'Easy', duration: 6 } }">Easy</option>
          <option :value="{ type: { name: 'Medium', duration: 4 } }">Medium</option>
          <option :value="{ type: { name: 'Hard', duration: 2 } }">Hard</option>
        </select>
        <button
          :disabled="playDisabled"
          :class="playDisabled ? 'opacity-50' : ''"
          class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md mt-6 transition-colors duration-200 ease-in-out"
        >
          Play
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import modyo from '@/assets/modyo.png';
import { useGameStore } from '../stores/game';
import router from '@/router';
import { computed } from '@vue/reactivity';

const gameStore = useGameStore();

const playDisabled = computed(() => {
  return !gameStore.name || !gameStore.difficulty;
});

function onSubmit() {
  router.push('/Game');
}
</script>

<style></style>
