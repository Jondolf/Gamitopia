<template>
  <div id="recent-games">
    <h2>Recent Games</h2>
    <div class="game-container">
      <ul>
        <GameThumbnail
          :name="'Snake'"
          :link="'/snake'"
          :imgSrc="require('@/assets/images/snake-thumbnail.jpg')"
          :imgAlt="'Snake game'"
          :date="'3.1.2020'"
        />
        <GameThumbnail
          :name="'Adventura'"
          :link="'/adventura'"
          :imgSrc="require('@/assets/images/adventura-thumbnail.png')"
          :imgAlt="'Adventura game'"
          :date="'24.12.2019'"
        />
        <GameThumbnail
          :name="'Tic-Tac-Toe'"
          :link="'/tic-tac-toe'"
          :imgSrc="require('@/assets/images/tic-tac-toe-light-thumbnail.jpg')"
          :imgAlt="'Tic-Tac-Toe game'"
          :date="'12.10.2019'"
        />
      </ul>
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

h2 {
  margin: 40px auto 0 auto;
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

.game-container li {
  background-color: var(--secondary-color);
  margin: 5vw;
  display: inline-block;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: white;
  transition: 1s;
  max-height: 50vw;
  padding: 0 1vw 0.75vw 1vw;
}

.game-container li h3,
.game-container li h6 {
  margin: auto 0.5vw;
}

@media only screen and (max-width: 700px) {
  .game-container li {
    margin: 5vw;
    padding: 0 1.5vw 1.5vw 1.5vw;
    .new-img {
      width: 30vw;
    }
    .new-img:hover {
      width: 34vw;
    }
    h3 {
      font-size: 16px;
    }
    h6 {
      font-size: 10px;
      margin: auto 1.5vw;
    }
  }
}

@media only screen and (max-width: 500px) {
  .game-container li {
    margin: 4vw;
    padding: 0 2vw 2vw 2vw;
    .new-img {
      width: 40vw;
    }
    .new-img:hover {
      width: 46vw;
    }
    h3 {
      font-size: 15px;
    }
    h6 {
      font-size: 9px;
    }
  }
}

@media only screen and (max-width: 350px) {
  .game-container li {
    margin: 4vw;
    padding: 0 2.5vw 2.5vw 2.5vw;
    .new-img {
      width: 50vw;
    }
    .new-img:hover {
      width: 58vw;
    }
    h3 {
      font-size: 14px;
    }
    h6 {
      font-size: 8px;
    }
  }
}
</style>
