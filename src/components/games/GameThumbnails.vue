<template>
  <div class="game-thumbnails">
    <h2>All games</h2>
    <div class="game-container">
      <GameThumbnail
        v-for="(game, index) in games"
        :key="index"
        :name="game.name"
        :route="game.route"
        :thumbnailImgSrc="game.thumbnailImgSrc"
        :thumbnailImgAlt="game.thumbnailImgAlt"
        :releaseDate="game.releaseDate"
      />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameThumbnail from './GameThumbnail.vue';
export default Vue.extend({
  name: 'GameThumbnails',
  components: {
    GameThumbnail
  },
  data() {
    return {
      games: this.$store.state.games.games
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.light h2 {
  color: black;
}
.dark h2 {
  color: white;
}

h2 {
  padding-top: 50px;
  margin: 0;
}

.game-container {
  margin: auto;
  padding: initial;
}
</style>
