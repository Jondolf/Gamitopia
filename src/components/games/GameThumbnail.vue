<template>
  <div class="game-thumbnail">
    <span>{{ game.name }}</span>
    <router-link :to="game.route">
      <div class="short-description-container">
        <p>{{ game.description.shortDescription }}</p>
      </div>
      <img :src="game.thumbnailImgSrc" :alt="game.thumbnailImgAlt" />
    </router-link>
    <time>{{ game.releaseDate }}</time>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GameInfo } from '@/interfaces/GameInfo';

export default defineComponent({
  name: 'GameThumbnail',

  props: {
    game: {
      type: Object as () => GameInfo,
      required: true
    }
  }
});
</script>

<style lang="scss" scoped>
.game-thumbnail {
  background-color: var(--color-primary);
  margin: 3.5vw;
  display: inline-block;
  border-radius: var(--border-radius);
  justify-content: center;
  align-items: center;
  color: white;
  transition: 1s;
  padding: 0 1vw 0.75vw 1vw;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    margin-bottom: 5px;
    border-radius: var(--border-radius);
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
    width: 22vw;
    border-radius: var(--border-radius);
    transition: 1s;
  }

  span,
  time {
    margin: auto 0.5vw;
    display: block;
  }

  time {
    font-size: 12px;
  }
}

@media only screen and (max-width: 700px) {
  .game-thumbnail {
    margin: 3vw;
    padding: 0 1.5vw 1.5vw 1.5vw;

    img {
      width: 36vw;
    }

    span {
      font-size: 16px;
    }

    time {
      font-size: 10px;
      margin: auto 1.5vw;
    }
  }
}

@media only screen and (max-width: 500px) {
  .game-thumbnail {
    margin: 2.5vw;
    padding: 0 2vw 2vw 2vw;

    img {
      width: 58vw;
    }

    span {
      font-size: 18px;
    }

    time {
      font-size: 12px;
    }
  }
}
</style>
