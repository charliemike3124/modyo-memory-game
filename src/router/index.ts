import { createRouter, createWebHistory } from 'vue-router';
import GameView from '@/views/GameView.vue';
import HomeView from '@/views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Game',
      name: 'Game',
      component: GameView
    },
    {
      path: '/',
      name: 'Home',
      component: HomeView
    }
  ]
});

export default router;
