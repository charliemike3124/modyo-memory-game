import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import type { Difficulty } from '@/models/gameModels';

export const useGameStore = defineStore('game', () => {
  const name = ref('');
  const positiveScore = ref(0);
  const negativeScore = ref(0);
  const difficulty: Ref<Difficulty | null> = ref(null);

  return { name, positiveScore, negativeScore, difficulty };
});
