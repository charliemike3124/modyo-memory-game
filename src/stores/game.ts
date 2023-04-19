import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import type { Difficulty } from '@/models/gameModels';

export const useGameStore = defineStore('game', () => {
  const name = ref('');
  const tries = ref(0);
  const endgameText = ref(``);
  const difficulty: Ref<Difficulty | null> = ref(null);

  return { name, tries, endgameText, difficulty };
});
