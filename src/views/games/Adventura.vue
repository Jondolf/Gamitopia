<template>
  <GamePage :game="adventuraState" id="adventura">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <AdventuraGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import AdventuraGame from '@/games/adventura-new/AdventuraGame.vue';

export default defineComponent({
  name: 'Adventura',

  components: {
    GamePage,
    GameContainer,
    AdventuraGame
  },

  setup() {
    return {
      isFullscreen: false,
      adventuraState: useStore().state.games.allGames.adventura
    };
  }
});
</script>
