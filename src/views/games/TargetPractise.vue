<template>
  <GamePage :game="targetPractiseState" id="targetPractise">
    <GameContainer width="80vw" height="80vh" :isFullscreen="false">
      <TargetPractiseGame />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import TargetPractiseGame from '@/games/target-practise/TargetPractiseGame.vue';

export default defineComponent({
  name: 'TargetPractise',

  components: {
    GamePage,
    GameContainer,
    TargetPractiseGame
  },

  setup() {
    return {
      targetPractiseState: useStore().state.games.allGames.targetPractise
    };
  }
});
</script>
