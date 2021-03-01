<template>
  <GamePage :game="state" id="inTheShadows">
    <GameContainer width="80vw" height="80vh" :isFullscreen="false">
      <InTheShadowsGame />
    </GameContainer>
  </GamePage>
</template>

<script setup name="InTheShadows" lang="ts">
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import InTheShadowsGame from '@/games/in-the-shadows/InTheShadowsGame.vue';

const state = useStore().state.games.allGames.inTheShadows;
</script>
