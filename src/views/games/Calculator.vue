<template>
  <GamePage :game="$store.state.games.allGames.calculator" id="calculator">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <CalculatorApp
        @toggle-fullscreen="isFullscreen = !isFullscreen"
        :isFullscreen="isFullscreen"
      />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import Vue from 'vue';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import CalculatorApp from '@/components/games/calculator/CalculatorApp.vue';

export default Vue.extend({
  name: 'Calculator',

  components: {
    GamePage,
    GameContainer,
    CalculatorApp
  },

  data() {
    return {
      isFullscreen: false
    };
  }
});
</script>
