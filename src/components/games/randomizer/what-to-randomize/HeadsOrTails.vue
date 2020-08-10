<template>
  <div class="heads-or-tails">
    <div class="result">
      <img :src="resultImageSrc" :alt="resultImageAlt" />
      <p>{{ result }}</p>
    </div>
    <button @click="getHeadsOrTails()" class="randomize-button">
      Randomize
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'HeadsOrTails',

  data() {
    return {
      resultImageSrc: require('@/assets/images/randomizer/coin_heads.png'),
      resultImageAlt: 'Heads coin',
      result: 'Heads'
    };
  },

  methods: {
    getHeadsOrTails(): void {
      const randomNumber = Math.random();
      if (randomNumber > 0.5) {
        this.resultImageSrc = require('@/assets/images/randomizer/coin_heads.png');
        this.resultImageAlt = 'Heads coin';
        this.result = 'Heads';
      } else {
        this.resultImageSrc = require('@/assets/images/randomizer/coin_tails.png');
        this.resultImageAlt = 'Tails coin';
        this.result = 'Tails';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.heads-or-tails {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 10px 50px 10px;
  box-sizing: border-box;
  .result {
    padding: 30px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 200px;
      height: 200px;
      margin-bottom: 45px;
      border: 3px solid black;
      border-radius: 50%;
      background-color: white;
    }
    p {
      font-size: 65px;
    }
  }

  .randomize-button {
    background-color: rgba(255, 255, 255, 0.65);
    font-family: Nunito;
    border: 2px solid black;
    border-radius: 5px;
    padding: 12px;
    outline: none;
    font-size: 18px;
    font-weight: bold;
    transition: 0.2s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.825);
      border-radius: 7px;
    }
    &:active {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 7px;
    }
  }
}
</style>
