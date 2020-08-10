<template>
  <div class="newest-game">
    <h2>Newest Game</h2>
    <span>{{ newestGame.name }}</span>
    <router-link :to="newestGame.route">
      <img
        :src="newestGame.thumbnailImgSrc"
        :alt="newestGame.thumbnailImgAlt"
      />
    </router-link>
    <time>{{ newestGame.releaseDate }}</time>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'NewestGame',

  data() {
    return {
      newestGame: useStore().state.games.newestGame
    };
  }
});
</script>

<style lang="scss" scoped>
.newest-game {
  background-color: var(--color-primary);
  text-align: center;
  height: 70vh;
  padding: 5vh;
  color: white;

  h2 {
    margin: 5vh auto 2vh auto;
    font-size: 35px;
  }

  span {
    margin: auto;
    font-size: 18px;
  }

  img {
    width: 45vh;
    max-width: 70vw;
    border-radius: 5px;
    margin: 25px;
    transition: 1s;
    &:hover {
      width: 50vh;
    }
  }

  time {
    font-size: 12px;
  }

  span,
  time {
    display: block;
  }
}

@media only screen and (max-width: 500px) {
  .newest-game {
    img {
      width: 64vw;
      &:hover {
        width: 70vw;
      }
    }
  }
}
</style>
