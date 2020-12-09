<template>
  <div class="game-description">
    <div class="main">
      <p v-html="parsedMainDescription"></p>
      <img :src="game.thumbnailImgSrc" :alt="game.thumbnailImgAlt" />
      <time>Released on {{ game.releaseDate }}</time>
    </div>
    <div class="other">
      <div class="made-with">
        <h3>Made with:</h3>
        <ul>
          <li v-for="(item, index) in game.description.madeWith" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>
      <div v-if="game.description.support" class="support">
        <h3>Support</h3>
        <p v-for="(item, index) in game.description.support" :key="index">
          {{ item }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { GameInfo } from '../../interfaces/GameInfo';

export default defineComponent({
  name: 'GameDescription',

  props: {
    game: {
      type: Object as () => GameInfo, // From Vuex store
      required: true
    }
  },

  setup(props) {
    const md = require('markdown-it')({
      linkify: true,
      typographer: true
    });
    return {
      parsedMainDescription: md.render(props.game.description.longDescription)
    };
  }
});
</script>

<style lang="scss" scoped>
.game-description {
  width: 80%;
  display: flex;
  flex-direction: column;
  background-color: var(--color-primary);
  border-radius: var(--border-radius);
  padding: 20px;
  margin: 50px auto;
  color: white;
  text-align: left;
  position: relative;
  box-sizing: border-box;

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
    border-radius: var(--border-radius);
  }

  time {
    display: block;
  }

  .main,
  .other {
    width: 100%;
    box-sizing: border-box;
  }

  .main {
    padding-bottom: 20px;
    border-bottom: 1px solid;
  }

  .other {
    padding-top: 20px;

    ul li {
      list-style: disc inside;
    }
  }

  .made-with {
    margin-bottom: 10px;
  }
}

@media only screen and (max-width: 460px) {
  .game-description p,
  .game-description li {
    font-size: 14px;
  }
}
</style>
