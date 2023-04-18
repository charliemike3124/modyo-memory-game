<template>
  <div class="spinner"></div>
</template>

<script setup lang="ts">
const props = defineProps({
  color: { type: String, default: 'white' },
  duration: { type: Number, default: 1 }
});
</script>

<style>
.spinner {
  border: 0.3em solid rgba(255, 255, 255, 0.2);
  border-top-color: v-bind('props.color');
  border-radius: 50%;
  width: 2em;
  height: 2em;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
