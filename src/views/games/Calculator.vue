<template>
  <GamePage :game="calculatorState" id="calculator">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <CalculatorApp @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import CalculatorApp from '@/components/games/calculator/CalculatorApp.vue';

export default defineComponent({
  name: 'Calculator',

  components: {
    GamePage,
    GameContainer,
    CalculatorApp
  },

  setup() {
    return {
      isFullscreen: false,
      calculatorState: useStore().state.games.allGames.calculator
    };
  }
});
</script>
