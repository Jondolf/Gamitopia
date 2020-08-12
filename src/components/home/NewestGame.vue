<template>
  <div class="newest-game">
    <div class="description-container">
      <h2>Newest Game</h2>
      <router-link :to="newestGame.route">
        <h3>{{ newestGame.name }}</h3>
      </router-link>
      <p>{{ newestGame.description.shortDescription }}</p>
      <time>Released on {{ newestGame.releaseDate }}</time>
    </div>

    <div class="thumbnail-container">
      <router-link :to="newestGame.route">
        <img :src="newestGame.thumbnailImgSrc" :alt="newestGame.thumbnailImgAlt" />
      </router-link>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { GameInfo } from '@/interfaces/GameInfo';

export default defineComponent({
  name: 'NewestGame',

  setup() {
    const newestGame: GameInfo = useStore().state.games.newestGame;
    return { newestGame };
  }
});
</script>

<style lang="scss" scoped>
.newest-game {
  width: 95vw;
  min-height: 40vh;
  margin: auto;
  padding: 20px 5vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: var(--color-primary-tint);
  border-radius: 5px;
  box-sizing: border-box;

  .description-container {
    width: 50%;
    padding-right: 10px;
    text-align: left;
    box-sizing: border-box;

    h2 {
      font-size: 32px;
      margin: 0 auto 1.5vh auto;
    }

    h3 {
      display: inline-block;
      font-size: 24px;
      font-style: normal;
    }

    p {
      text-align: justify;
    }

    time {
      font-size: 17px;
      font-weight: bold;
      margin-top: 20px;
    }

    span,
    time {
      display: block;
    }
  }

  .thumbnail-container {
    width: 50%;
    height: 100%;
    padding-left: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;

    img {
      width: 45vh;
      max-width: 45vw;
      border-radius: 5px;
    }
  }
}

@media only screen and (max-width: 575px) {
  .newest-game {
    padding: 20px 0;
    flex-direction: column;

    .description-container {
      width: 64vw;
      max-width: 64vw;
      padding-bottom: 20px;
      text-align: center;

      h2 {
        font-size: 9vw;
      }

      h3 {
        font-size: 6vw;
      }

      time {
        font-size: 3.5vw;
      }
    }

    .thumbnail-container {
      width: 100%;
      padding: 0;
      justify-content: center;

      img {
        width: 64vw;
        max-width: 64vw;
      }
    }
  }
}
</style>
