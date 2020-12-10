<template>
  <GamePage :game="randomizerState" id="randomizer">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <RandomizerGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import RandomizerGame from '@/games/randomizer/RandomizerGame.vue';

export default defineComponent({
  name: 'Randomizer',

  components: {
    GamePage,
    GameContainer,
    RandomizerGame
  },

  setup() {
    return {
      isFullscreen: false,
      randomizerState: useStore().state.games.allGames.randomizer
    };
  }
});
</script>
