<template>
  <GamePage :game="state" id="ticTacToe">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <TicTacToeGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="TicTacToe" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import TicTacToeGame from '@/games/tic-tac-toe/TicTacToeGame.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.ticTacToe;
</script>
