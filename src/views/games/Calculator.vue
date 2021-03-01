<template>
  <GamePage :game="state" id="calculator">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <CalculatorApp @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="Calculator" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import CalculatorApp from '@/games/calculator/CalculatorApp.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.calculator;
</script>
