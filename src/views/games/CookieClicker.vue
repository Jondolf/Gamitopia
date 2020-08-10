<template>
  <GamePage :game="cookieClickerState" id="cookieClicker">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <CookieClickerGame
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
import CookieClickerGame from '@/components/games/cookie-clicker/CookieClickerGame.vue';

export default defineComponent({
  name: 'CookieClicker',

  components: {
    GamePage,
    GameContainer,
    CookieClickerGame
  },

  data() {
    return {
      isFullscreen: false,
      cookieClickerState: useStore().state.games.allGames.cookieClicker
    };
  }
});
</script>
