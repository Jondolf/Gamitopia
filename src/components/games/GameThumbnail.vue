<template>
  <div id="game-thumbnail">
    <h3>{{ name }}</h3>
    <router-link :to="link">
      <img :src="imgSrc" :alt="imgAlt" />
    </router-link>
    <h6>{{ date }}</h6>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'GameThumbnail',
  props: {
    name: String,
    link: String,
    imgSrc: String,
    imgAlt: String,
    date: String
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';

#game-thumbnail {
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

  h3,
  h6 {
    margin: auto 0.5vw;
  }
}

@media only screen and (max-width: 700px) {
  #game-thumbnail {
    margin: 5vw;
    padding: 0 1.5vw 1.5vw 1.5vw;
    img {
      width: 30vw;
    }
    img:hover {
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
  #game-thumbnail {
    margin: 4vw;
    padding: 0 2vw 2vw 2vw;
    img {
      width: 40vw;
    }
    img:hover {
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
  #game-thumbnail {
    margin: 4vw;
    padding: 0 2.5vw 2.5vw 2.5vw;
    img {
      width: 50vw;
    }
    img:hover {
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
