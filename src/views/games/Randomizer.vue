<template>
  <GamePage :game="$store.state.games.allGames.randomizer" id="randomizer">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <RandomizerGame
        @toggleFullscreen="isFullscreen = !isFullscreen"
        :isFullscreen="isFullscreen"
      />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import Vue from 'vue';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import RandomizerGame from '@/components/games/randomizer/RandomizerGame.vue';

export default Vue.extend({
  name: 'Randomizer',

  components: {
    GamePage,
    GameContainer,
    RandomizerGame
  },

  data() {
    return {
      isFullscreen: false
    };
  }
});
</script>
