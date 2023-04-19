<template>
  <div class="relative">
    <div v-if="loadingCards" class="flex justify-center">
      <Spinner></Spinner>
    </div>
    <div v-else :class="gameStarted ? 'opacity-100' : 'opacity-20 pointer-events-none'">
      <div class="grid grid-cols-4 gap-4">
        <div v-for="i in columns" :key="i">
          <div v-for="j in rows" :key="j">
            <Card
              ref="cardRefs"
              :image-url="cards[(i - 1) * rows + j - 1].imageUrl"
              :id="cards[(i - 1) * rows + j - 1].id"
              @selectCard="onSelectCard"
            ></Card>
          </div>
        </div>
      </div>
    </div>
    <button
      @click="startGame"
      :class="gameStarted ? 'invisible' : 'visible'"
      class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 ease-in-out absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
    >
      Start
    </button>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from './Card.vue';
import Spinner from './Spinner.vue';
import { useGameStore } from '../stores/game';

const rows = ref(3);
const columns = ref(4);
const cardRefs = ref([]);
const cards = ref([]);
const loadingCards = ref(true);
const selectedCards = ref([]);
const gameStarted = ref(false);
const gameStore = useGameStore();

function flipBoard() {
  cardRefs.value.forEach((card) => {
    card.flip();
  });
}

async function initializeBoard() {
  const imageAmount = 20;
  const response = await fetch(
    `https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=${imageAmount}`
  );
  const json = response.status === 200 ? await response.json() : null;
  if (json) {
    const images = json.entries;
    const cardCount = rows.value * columns.value;

    cards.value = [];
    images.sort(() => Math.random() - 0.5);
    const selectedImages = images.slice(0, cardCount / 2);
    const finalImages = [...selectedImages, ...selectedImages];
    finalImages.sort(() => Math.random() - 0.5);

    for (const img of finalImages) {
      const id = crypto.randomUUID();
      cards.value.push({
        imageUrl: img.fields.image.url,
        id
      });
    }
  } else {
    // Handle error with a popup message
  }
  flipFaceUpCards();
  loadingCards.value = false;
}

function onSelectCard(flip: Function, imageUrl: string) {
  selectedCards.value.push({ flip, imageUrl });

  if (selectedCards.value.length === 2) {
    const [card1, card2] = selectedCards.value;

    // Un-flip selected cards if they do not match
    if (card1.imageUrl !== card2.imageUrl) {
      setTimeout(() => {
        gameStore.tries--;
        card1.flip();
        card2.flip();
        checkLoseCondition();
      }, 500);
    } else {
      checkWinCondition();
    }
    selectedCards.value = [];
  }
}

function checkWinCondition() {
  // Player wins when all cards are flipped before attempts are exhausted
  const playerWon = cardRefs.value.every((card) => card.flipped === true);
  if (playerWon) {
    gameStore.endgameText = 'You win! Well done!';
    gameStarted.value = false;
    initializeBoard();
  }
}

function checkLoseCondition() {
  // Player loses when attempts are exhausted
  if (gameStore.tries === 0) {
    gameStore.endgameText = 'Better luck next time...';
    gameStarted.value = false;
    initializeBoard();
  }
}

function startGame() {
  gameStarted.value = true;
  gameStore.endgameText = '';
  gameStore.tries = gameStore.difficulty?.tries;
  flipBoard();
  setTimeout(() => {
    flipBoard();
  }, gameStore.difficulty?.duration);
}

function flipFaceUpCards() {
  cardRefs.value.forEach((card) => {
    if (card.flipped) {
      card.flip();
    }
  });
}

onMounted(async () => {
  await initializeBoard();
  flipBoard();
});
</script>
