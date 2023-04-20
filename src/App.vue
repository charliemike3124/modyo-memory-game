<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <div class="custom-bg min-h-screen">
    <RouterView />
  </div>
</template>

<style>
body,
html {
  overflow-y: hidden;
}

.custom-bg {
  background-image: radial-gradient(
    circle 1005px at 1.5% 0%,
    rgba(76, 82, 255, 1) 0%,
    rgba(44, 47, 98, 1) 50.1%,
    rgba(26, 28, 61, 1) 95.9%
  );
}
</style>
