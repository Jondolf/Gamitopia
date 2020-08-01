<template>
  <GamePage
    :game="$store.state.games.allGames.cookieClicker"
    id="cookieClicker"
  >
    <GameContainer width="80vw" height="80vh" :isFullscreen="false">
      <CookieClickerGame />
    </GameContainer>
  </GamePage>
</template>

<script lang="ts">
import Vue from 'vue';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import CookieClickerGame from '@/components/games/cookie-clicker/CookieClickerGame.vue';

export default Vue.extend({
  name: 'CookieClicker',

  components: {
    GamePage,
    GameContainer,
    CookieClickerGame
  }
});
</script>
