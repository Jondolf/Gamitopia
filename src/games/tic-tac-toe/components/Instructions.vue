<template>
  <div class="view instructions">
    <h2>Instructions</h2>
    <button @click="$emit('go-back')" class="menu-button">
      Back To Home Menu
    </button>
    <p>
      Two players take turns putting X's or O's (the starting player uses X's) onto the grid. The player that gets a row
      of three (with default settings) either horizontally, vertically or diagonally wins the game. If the grid is full
      and nobody has gotten a row of 3, the game will be a tie.
    </p>
    <h3>Variations</h3>
    <p>
      To change how big the grid is and/or how long of a row you need to win, go to settings and adjust the sliders.
      There you can change the width and height of the grid and how many X's or O's you need in a row to win the game.
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Instructions'
});
</script>

<style lang="scss" scoped>
.instructions {
  p {
    text-align: left;
    width: 90%;
    max-width: 50em;
  }
}
</style>
