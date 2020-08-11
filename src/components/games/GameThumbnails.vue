<template>
  <div class="game-thumbnails">
    <h2>All games</h2>
    <div class="game-container">
      <GameThumbnail v-for="(game, index) in games" :key="index" :game="game" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import GameThumbnail from './GameThumbnail.vue';

export default defineComponent({
  name: 'GameThumbnails',

  components: {
    GameThumbnail
  },

  data() {
    return {
      games: useStore().state.games.allGames
    };
  }
});
</script>

<style lang="scss" scoped>
h2 {
  padding-top: 50px;
  margin: 0;
  color: var(--color-light-contrast);
}

.game-container {
  margin: auto;
  padding: initial;
}
</style>
