<template>
  <GamePage :game="state" id="randomizer">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <RandomizerGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="Randomizer" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import RandomizerGame from '@/games/randomizer/RandomizerGame.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.randomizer;
</script>
