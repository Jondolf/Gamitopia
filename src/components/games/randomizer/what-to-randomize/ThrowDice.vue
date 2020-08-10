<template>
  <div class="throw-dice">
    <img :src="resultImageSrc" :alt="resultImageAlt" class="result" />
    <p>{{ statusMessage }}</p>
    <button @click="throwDice()" class="randomize-button">
      Randomize
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'ThrowDice',

  data() {
    return {
      resultImageSrc: require('@/assets/images/randomizer/num_1_dice.jpg'),
      resultImageAlt: 'Number 1 dice',
      amountOfDice: 6,
      statusMessage: ''
    };
  },

  methods: {
    getRandomInt(minValue: number, maxValue: number): number {
      if (minValue <= maxValue) {
        minValue = Math.ceil(minValue);
        maxValue = Math.floor(maxValue);
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
      } else {
        throw new Error('Minimum value must be smaller than maximum value');
      }
    },

    throwDice() {
      for (let i = 0; i <= 7; i++) {
        setTimeout(() => {
          if (i < 7) {
            this.statusMessage = 'Rolling...';
          } else {
            this.statusMessage = '';
          }
          const rnd = this.getRandomInt(1, 6);
          this.resultImageSrc = require(`@/assets/images/randomizer/num_${rnd}_dice.jpg`);
          this.resultImageAlt = `Number ${rnd} dice`;
        }, 100 * 2 * i + 100);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.throw-dice {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  .result {
    width: 125px;
    height: 125px;
    border: 6px solid black;
    border-radius: 25px;
    background-color: white;
    margin-top: 80px;
  }

  p {
    height: 8vw;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: Nunito;
    font-size: 18px;
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
