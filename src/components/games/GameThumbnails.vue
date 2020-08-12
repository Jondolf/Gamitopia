<template>
  <div class="game-thumbnails">
    <GameThumbnail v-for="(game, index) in games" :key="index" :game="game" />
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
.game-thumbnails {
  margin: -2.5vw auto 0 auto;
  padding: initial;
}
</style>
