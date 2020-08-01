<template>
  <div class="game-description">
    <div class="main">
      <h2>{{ name }}</h2>
      <h3>Description</h3>
      <p>
        {{ mainDescription }}
      </p>
      <img :src="imgSrc" :alt="imgAlt" />
      <time>Released on {{ releaseDate }}</time>
    </div>
    <div class="other">
      <div class="made-with">
        <h3>Made with:</h3>
        <ul>
          <li v-for="(item, index) in madeWith" :key="index">{{ item }}</li>
        </ul>
      </div>
      <div class="support">
        <h3>Support</h3>
        <p v-for="(item, index) in support" :key="index">{{ item }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { GameInfo } from '../../interfaces/GameInfo';
export default Vue.extend({
  name: 'GameDescription',

  props: {
    game: Object as () => GameInfo // From Vuex store
  },

  data() {
    return {
      name: this.game.name,
      mainDescription: this.game.description.mainDescription,
      imgSrc: this.game.thumbnailImgSrc,
      imgAlt: this.game.thumbnailImgAlt,
      releaseDate: this.game.releaseDate,
      madeWith: this.game.description.madeWith,
      support: this.game.description.support
    };
  }
});
</script>

<style lang="scss" scoped>
.game-description {
  width: 80%;
  display: flex;
  background-color: var(--color-primary);
  border-radius: 5px;
  margin: 50px auto;
  color: white;
  text-align: left;
  position: relative;

  h2 {
    padding: 0;
    margin: 0;
    padding-bottom: 20px;
    color: white;
  }
  h3 {
    margin-bottom: 15px;
  }

  img {
    width: 100%;
    max-width: 400px;
    margin: 10px auto;
    border-radius: 5px;
  }

  time {
    display: block;
  }

  .main,
  .other {
    padding: 20px;
    box-sizing: border-box;
  }

  .main {
    width: 60%;
    border-right: 1px solid;
    p {
      white-space: pre-line;
    }
  }

  .other {
    width: 40%;
    height: 100%;
    ul li {
      list-style: disc inside;
    }
  }

  .made-with {
    height: 100%;
    margin-bottom: 10px;
  }

  .support {
    height: 100%;
  }
}

@media only screen and (max-width: 620px) {
  .game-description {
    flex-direction: column;
    padding: 10px;

    .main {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid;
      padding: 20px;
    }

    .other {
      width: 100%;
    }
  }
}

@media only screen and (max-width: 460px) {
  .game-description p,
  .game-description li {
    font-size: 14px;
  }
}
</style>
