<template>
  <GamePage :game="state" id="cookieClicker">
    <GameContainer width="80vw" height="80vh" :isFullscreen="isFullscreen">
      <CookieClickerGame @toggle-fullscreen="isFullscreen = !isFullscreen" :isFullscreen="isFullscreen" />
    </GameContainer>
  </GamePage>
</template>

<script setup name="CookieClicker" lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import GamePage from '@/components/games/GamePage.vue';
import GameContainer from '@/components/games/GameContainer.vue';
import CookieClickerGame from '@/games/cookie-clicker/CookieClickerGame.vue';

const isFullscreen = ref(false);
const state = useStore().state.games.allGames.cookieClicker;
</script>
