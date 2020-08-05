<template>
  <GamePage :game="$store.state.games.allGames.ticTacToe" id="ticTacToe">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <TicTacToeGame
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
import TicTacToeGame from '@/components/games/tic-tac-toe/TicTacToeGame.vue';

export default Vue.extend({
  name: 'TicTacToe',

  components: {
    GamePage,
    GameContainer,
    TicTacToeGame
  },

  data() {
    return {
      isFullscreen: false
    };
  }
});
</script>
