<template>
  <GamePage :game="ticTacToeState" id="ticTacToe">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <TicTacToeGame
        @toggle-fullscreen="isFullscreen = !isFullscreen"
        :isFullscreen="isFullscreen"
      />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import TicTacToeGame from '@/components/games/tic-tac-toe/TicTacToeGame.vue';

export default defineComponent({
  name: 'TicTacToe',

  components: {
    GamePage,
    GameContainer,
    TicTacToeGame
  },

  data() {
    return {
      isFullscreen: false,
      ticTacToeState: useStore().state.games.allGames.ticTacToe
    };
  }
});
</script>
