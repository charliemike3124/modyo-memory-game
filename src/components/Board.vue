<template>
  <div class="grid grid-cols-4 gap-4">
    <div v-for="n in columns" :key="n">
      <div v-for="n in rows" :key="n">
        <Card></Card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Card from './Card.vue'

const rows = ref(3)
const columns = ref(4)
</script>
