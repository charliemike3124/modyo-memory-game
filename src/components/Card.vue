<template>
  <div class="card-wrapper">
    <div class="card" ref="card">
      <div class="card-face card-back">
        <img :src="backCard" alt="Back of card" />
      </div>
      <div class="card-face card-front">
        <img :src="imageUrl || frontCard" alt="Front of card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import backCard from '@/assets/back-card.png';
import frontCard from '@/assets/front-card.png';

const card = ref(null);
const flipped = ref(true);

const emit = defineEmits<{
  (e: 'selectCard', flip: Function, imageUrl: string): void;
}>();

const props = defineProps({
  imageUrl: String,
  id: String
});

function flip() {
  card.value.classList.toggle('card-flipped');
  flipped.value = !flipped.value;
}

function selectCard() {
  if (!flipped.value) {
    flip();
    emit('selectCard', flip, props.imageUrl || frontCard);
  }
}

defineExpose({
  flip,
  id: props.id,
  flipped
});

onMounted(() => {
  card.value.addEventListener('click', () => selectCard());
});
</script>

<style>
.card-wrapper {
  perspective: 1000px;
}

.card {
  position: relative;
  width: 150px;
  height: 220px;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  margin-bottom: 10px;
}

@media screen and (max-width: 640px) {
  .card {
    width: 75px;
    height: 110px;
  }
}

.card img {
  width: 100%;
  height: 100%;
}

.card-front,
.card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 5px;
}
.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg) rotateX(25deg);
}

.card-flipped {
  transform: rotateY(180deg) rotateX(25deg);
}
</style>
