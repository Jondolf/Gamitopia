<template>
  <div class="instructions">
    <h2>Instructions</h2>
    <button v-on:click="toggleInstructionsVisibility">
      Back To Home Menu
    </button>
    <p>
      Two players take turns putting X's or O's (the starting player uses X's)
      onto the grid. The player that gets a row of three (with default settings)
      either horizontally, vertically or diagonally wins the game. If the grid
      is full and nobody has gotten a row of 3, the game will be a tie.
    </p>
    <h3>Variations</h3>
    <p>
      To change how big the grid is and/or how long of a row you need to win, go
      to settings and adjust the sliders. There you can change the width and
      height of the grid and how many X's or O's you need in a row to win the
      game.
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Instructions',
  components: {},
  methods: {
    toggleInstructionsVisibility() {
      this.$emit('toggleInstructionsBtnClicked');
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.dark.default-dark .instructions {
  p,
  h3 {
    color: white;
  }
}
.instructions {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  overflow: auto;
  p,
  h3 {
    color: black;
  }
  button {
    width: 100%;
    height: 20%;
    color: white;
    font-size: 16px;
    outline: none;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    transition: 0.4s;
    background-color: rgb(144, 147, 152);
  }

  button:hover {
    background-color: rgb(91, 97, 112);
  }
  p {
    padding: 0.6vw;
    text-align: left;
    font-size: 1vw;
  }
}
.dark.default-dark h2 {
  background-color: black;
}
.dark.default-dark button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
}
.dark.default-dark button:hover {
  background-color: rgb(50, 57, 68);
}
.dark.default-dark .instructions {
  background-color: black;
}
@media only screen and (max-width: 1100px) {
  .instructions p {
    font-size: 1.4vw;
  }
}
@media only screen and (max-width: 600px) {
  .instructions p {
    font-size: 2vw;
  }
}
</style>
