<template>
  <div class="game-thumbnails">
    <h2>All games</h2>
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
      <GameThumbnail
        :name="'Randomizer'"
        :link="'/randomizer'"
        :imgSrc="
          require('@/assets/images/game-thumbnails/randomizer_thumbnail.jpg')
        "
        :imgAlt="'Randomizer game'"
        :date="'30.9.2019'"
      />
      <GameThumbnail
        :name="'Cookie Clicker'"
        :link="'/cookie-clicker'"
        :imgSrc="
          require('@/assets/images/game-thumbnails/cookie_clicker_thumbnail.jpg')
        "
        :imgAlt="'Cookie Clicker game'"
        :date="'31.8.2019'"
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
