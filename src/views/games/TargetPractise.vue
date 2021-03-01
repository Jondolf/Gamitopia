<template>
  <GamePage :game="state" id="targetPractise">
    <GameContainer width="80vw" height="80vh" :isFullscreen="false">
      <TargetPractiseGame />
    </GameContainer>
  </GamePage>
</template>

<script setup name="TargetPractise" lang="ts">
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import TargetPractiseGame from '@/games/target-practise/TargetPractiseGame.vue';

const state = useStore().state.games.allGames.targetPractise;
</script>
