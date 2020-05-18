<template>
  <div class="recent-games">
    <h2>Recent Games</h2>
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
import GameThumbnail from '@/components/games/GameThumbnail.vue';
export default Vue.extend({
  name: 'RecentGames',
  components: {
    GameThumbnail
  },
  data() {
    return {
      games: [
        this.$store.state.games.games[0],
        this.$store.state.games.games[1],
        this.$store.state.games.games[2]
      ]
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
  margin: 65px auto 20px auto;
}

.new-img {
  width: 18vw;
  border-radius: 5px;
  margin: 20px, 0;
  transition: 1s;
}

.new-img:hover {
  width: 20vw;
}

.game-container {
  margin: auto;
  padding: initial;
}
</style>
