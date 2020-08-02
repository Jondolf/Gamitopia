<template>
  <GamePage :game="$store.state.games.allGames.snake" id="snake">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <SnakeGame
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
import SnakeGame from '@/components/games/snake/SnakeGame.vue';

export default Vue.extend({
  name: 'Snake',

  components: {
    GamePage,
    GameContainer,
    SnakeGame
  },

  data() {
    return {
      isFullscreen: false
    };
  }
});
</script>
