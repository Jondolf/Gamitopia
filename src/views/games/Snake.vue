<template>
  <GamePage :game="snakeState" id="snake">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <SnakeGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import SnakeGame from '@/games/snake/SnakeGame.vue';

export default defineComponent({
  name: 'Snake',

  components: {
    GamePage,
    GameContainer,
    SnakeGame
  },

  setup() {
    return {
      isFullscreen: false,
      snakeState: useStore().state.games.allGames.snake
    };
  }
});
</script>
