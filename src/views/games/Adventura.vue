<template>
  <GamePage :game="state" id="adventura">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <AdventuraGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="Adventura" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import AdventuraGame from '@/games/adventura-new/AdventuraGame.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.adventura;
</script>
