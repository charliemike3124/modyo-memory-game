<template>
  <div class="card-wrapper">
    <div class="card" ref="card">
      <div class="card-face card-front">
        <img :src="frontCard" alt="Front of card" />
      </div>
      <div class="card-face card-back">
        <img :src="backCard" alt="Back of card" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import backCard from '@/assets/back-card.png'
import frontCard from '@/assets/front-card.png'

const card = ref(null)

onMounted(() => {
  card.value.addEventListener('click', () => {
    card.value.classList.toggle('card-flipped')
  })
})
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
  margin: 10px;
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
