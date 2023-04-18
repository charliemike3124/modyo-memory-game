import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
  const name = ref('')
  const positiveScore = ref(0)
  const negativeScore = ref(0)

  return { name, positiveScore, negativeScore }
})
