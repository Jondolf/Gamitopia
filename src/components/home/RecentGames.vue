<template>
  <div class="recent-games">
    <h2>Recent Games</h2>
    <div class="game-container">
      <GameThumbnail
        :name="'Snake'"
        :link="'/snake'"
        :imgSrc="require('@/assets/images/game-thumbnails/snake_thumbnail.jpg')"
        :imgAlt="'Snake game'"
        :date="'3.1.2020'"
      />
      <GameThumbnail
        :name="'Adventura'"
        :link="'/adventura'"
        :imgSrc="
          require('@/assets/images/game-thumbnails/adventura_thumbnail.jpg')
        "
        :imgAlt="'Adventura game'"
        :date="'24.12.2019'"
      />
      <GameThumbnail
        :name="'Tic-Tac-Toe'"
        :link="'/tic-tac-toe'"
        :imgSrc="
          require('@/assets/images/game-thumbnails/tic_tac_toe_thumbnail.jpg')
        "
        :imgAlt="'Tic-Tac-Toe game'"
        :date="'12.10.2019'"
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
