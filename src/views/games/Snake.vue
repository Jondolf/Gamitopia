<template>
  <GamePage :game="state" id="snake">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <SnakeGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="Snake" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import SnakeGame from '@/games/snake/SnakeGame.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.snake;
</script>
