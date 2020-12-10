<template>
  <div class="what-to-randomize-menu">
    <div class="top-bar">
      <button @click="$emit('close-what-to-randomize-menu')">
        <i class="material-icons">close</i>
      </button>
      <h3>What to randomize</h3>
    </div>

    <button
      v-for="(whatToRandomizeOption, index) in whatToRandomizeOptions"
      @click="changeOption(whatToRandomizeOption)"
      :key="index"
      :class="whatToRandomizeOption.className"
    >
      <img :src="whatToRandomizeOption.imageSrc" :alt="whatToRandomizeOption.imageAlt" />
      <p>{{ whatToRandomizeOption.name }}</p>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Option {
  imageSrc: string;
  imageAlt: string;
  name: string;
  className: string;
}

export default defineComponent({
  name: 'WhatToRandomizeMenu',

  data() {
    return {
      whatToRandomizeOptions: [
        {
          imageSrc: require('@/assets/images/randomizer/num_1_dice.jpg'),
          imageAlt: 'Number range',
          name: 'Number range',
          className: 'selected-option'
        },
        {
          imageSrc: require('@/assets/images/randomizer/num_2_dice.jpg'),
          imageAlt: 'Heads or tails',
          name: 'Heads or tails',
          className: 'option'
        },
        {
          imageSrc: require('@/assets/images/randomizer/num_3_dice.jpg'),
          imageAlt: 'Throw dice',
          name: 'Throw dice',
          className: 'option'
        }
      ] as Option[]
    };
  },

  methods: {
    changeOption(option: Option): void {
      this.$emit('change-option', option.name);
      for (const option of this.whatToRandomizeOptions) {
        if (option.className === 'selected-option') {
          option.className = 'option';
        }
      }
      option.className = 'selected-option';
    }
  }
});
</script>

<style lang="scss">
.randomizer .fullscreen-game-container .what-to-randomize-menu {
  z-index: 17;
}
.what-to-randomize-menu {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.65);
  z-index: 7;
  margin: auto;
  .top-bar {
    padding: 20px;
    display: flex;
    align-items: center;
    width: 100%;
    button {
      background: transparent;
      border: none;
      outline: none;
      width: 45px;
      height: 45px;
      margin-right: 20px;
      border-radius: var(--border-radius);
      transition: 0.4s ease-out;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 40px;
      }
      &:hover {
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.25);
      }
    }
    h3 {
      font-size: 25px;
      text-align: left;
    }
  }

  .option {
    background: transparent;
    border-top: 1px solid white;
    border-bottom: 2px solid white;
    outline: none;
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border-radius: 12px;
      border: 3px solid black;
    }
    p {
      font-size: 25px;
      font-weight: lighter;
      color: white;
    }
  }
  .selected-option {
    background: rgba(255, 255, 255, 0.5);
    border-top: 1px solid white;
    border-bottom: 2px solid white;
    outline: none;
    width: 100%;
    padding: 20px;
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      margin-right: 20px;
      border-radius: 12px;
      border: 3px solid black;
    }
    p {
      font-size: 25px;
      font-weight: lighter;
      color: white;
    }
  }
}
</style>
