<template>
  <div>
    <div v-if="loadingCards" class="flex justify-center">
      <Spinner></Spinner>
    </div>
    <div class="grid grid-cols-4 gap-4" v-else>
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
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue';
import Card from './Card.vue';
import Spinner from './Spinner.vue';
import { useGameStore } from '../stores/game';

const rows = ref(3);
const columns = ref(4);
const currentRound = ref(1);
const rounds = (rows.value * columns.value) / 2;
const cardRefs = ref([]);
const cards = ref([]);
const loadingCards = ref(true);
const selectedCards = ref([]);
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
  loadingCards.value = false;
}

function onSelectCard(id: string, imageUrl: string) {
  selectedCards.value.push({ id, imageUrl });
  if (selectedCards.value.length === 2) {
    const [card1, card2] = selectedCards.value;
    setTimeout(() => {
      if (card1.imageUrl === card2.imageUrl) {
        gameStore.positiveScore++;
        cardRefs.value.forEach((card) => {
          const cardFound = card1.id === card.id || card2.id === card.id;
          if (cardFound) {
            card.locked = true;
          }
        });
      } else {
        gameStore.negativeScore++;
        cardRefs.value.forEach((card) => {
          const cardFound = card1.id === card.id || card2.id === card.id;
          if (cardFound) {
            card.flip();
          }
        });
      }
      selectedCards.value = [];
      currentRound.value++;
    }, 500);
  }
  if (currentRound.value === rounds) {
  }
}

onMounted(async () => {
  await initializeBoard();
  flipBoard();
  setTimeout(() => {}, 1000);
});
</script>
