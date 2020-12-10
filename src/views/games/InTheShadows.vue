<template>
  <GamePage :game="inTheShadowsState" id="inTheShadows">
    <GameContainer width="80vw" height="80vh" :isFullscreen="false">
      <InTheShadowsGame />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import InTheShadowsGame from '@/games/in-the-shadows/InTheShadowsGame.vue';

export default defineComponent({
  name: 'InTheShadows',

  components: {
    GamePage,
    GameContainer,
    InTheShadowsGame
  },

  setup() {
    return {
      inTheShadowsState: useStore().state.games.allGames.inTheShadows
    };
  }
});
</script>
