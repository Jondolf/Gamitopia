<template>
  <div class="newest-game">
    <h2>Newest Game</h2>
    <div class="thumbnail-container">
      <span>{{ newestGame.name }}</span>
      <router-link :to="newestGame.route">
        <div class="short-description-container">
          <p>{{ newestGame.description.shortDescription }}</p>
        </div>
        <img :src="newestGame.thumbnailImgSrc" :alt="newestGame.thumbnailImgAlt" />
      </router-link>
      <time>{{ newestGame.releaseDate }}</time>
    </div>
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

  .thumbnail-container {
    display: inline-flex;
    flex-direction: column;

    span {
      margin: auto;
      font-size: 18px;
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      border-radius: 5px;
      margin: 25px;
    }

    .short-description-container {
      background-color: rgba(0, 0, 0, 0.5);
      padding: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
      transition: 0.5s;
      &:hover {
        opacity: 1;
      }

      p {
        color: white;
        text-align: left;
        font-weight: normal;
        font-style: normal;
      }
    }

    img {
      width: 45vh;
      max-width: 70vw;
      border-radius: 5px;
    }

    time {
      font-size: 12px;
    }

    span,
    time {
      display: block;
    }
  }
}

@media only screen and (max-width: 500px) {
  .newest-game {
    img {
      width: 64vw;
    }
  }
}
</style>
