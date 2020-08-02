<template>
  <GamePage :game="$store.state.games.allGames.adventura" id="adventura">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <AdventuraGame
        @toggleFullscreen="isFullscreen = !isFullscreen"
        :isFullscreen="isFullscreen"
      />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import Vue from 'vue';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import AdventuraGame from '@/components/games/adventura/AdventuraGame.vue';

export default Vue.extend({
  name: 'Adventura',

  components: {
    GamePage,
    GameContainer,
    AdventuraGame
  },

  data() {
    return {
      isFullscreen: false
    };
  }
});
</script>
