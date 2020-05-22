<template>
  <div class="game-thumbnail">
    <span>{{ name }}</span>
    <router-link :to="route">
      <img :src="thumbnailImgSrc" :alt="thumbnailImgAlt" />
    </router-link>
    <time>{{ releaseDate }}</time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'GameThumbnail',
  props: {
    name: String,
    route: String,
    thumbnailImgSrc: String,
    thumbnailImgAlt: String,
    releaseDate: String
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';

.game-thumbnail {
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

  img {
    width: 18vw;
    border-radius: 5px;
    margin: 20px, 0;
    transition: 1s;
  }

  img:hover {
    width: 20vw;
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
    margin: 5vw;
    padding: 0 1.5vw 1.5vw 1.5vw;
    img {
      width: 30vw;
    }
    img:hover {
      width: 34vw;
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
    margin: 4vw;
    padding: 0 2vw 2vw 2vw;
    img {
      width: 40vw;
    }
    img:hover {
      width: 46vw;
    }
    span {
      font-size: 15px;
    }
    time {
      font-size: 9px;
    }
  }
}

@media only screen and (max-width: 350px) {
  .game-thumbnail {
    margin: 4vw;
    padding: 0 2.5vw 2.5vw 2.5vw;
    img {
      width: 50vw;
    }
    img:hover {
      width: 58vw;
    }
    span {
      font-size: 14px;
    }
    time {
      font-size: 8px;
    }
  }
}
</style>
