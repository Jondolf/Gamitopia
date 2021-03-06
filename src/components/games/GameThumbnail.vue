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
  margin: 1.5vw;
  display: inline-block;
  border-radius: var(--border-radius);
  justify-content: center;
  align-items: center;
  color: white;
  transition: 1s;
  padding: 0 0.75vw;

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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
    width: 14vw;
    border-radius: var(--border-radius);
    transition: 1s;
  }

  span,
  time {
    margin: auto;
    display: block;
  }

  span {
    font-size: 18px;
    line-height: 36px;
  }

  time {
    font-size: 16px;
    line-height: 32px;
  }
}

@media only screen and (max-width: 2325px) {
  .game-thumbnail {
    margin: 2vw;
    padding: 0 1vw;

    img {
      width: 17vw;
    }
  }
}

@media only screen and (max-width: 1775px) {
  .game-thumbnail {
    margin: 3.5vw;
    padding: 0 1.5vw;

    img {
      width: 22vw;
    }
  }
}

@media only screen and (max-width: 700px) {
  .game-thumbnail {
    margin: 3vw;
    padding: 0 1.5vw;

    img {
      width: 36vw;
    }
  }
}

@media only screen and (max-width: 500px) {
  .game-thumbnail {
    margin: 2.5vw;
    padding: 0 2vw;

    img {
      width: 58vw;
    }
  }
}
</style>
