<template>
  <div id="statistics">
    <h2>Statistics</h2>
    <div class="button-container">
      <button v-on:click="changeView('startMenu')">Go back</button>
    </div>
    <div class="statistics-container">
      <p>
        <strong>Hiscore: {{ hiscore }}</strong>
      </p>
      <p>Most moves made in a single game: {{ mostMoves }}</p>
      <p>Least moves made in a single game: {{ leastMoves }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { game } from './gameLogic';

export default Vue.extend({
  name: 'Statistics',
  data() {
    return {
      hiscore: JSON.parse(localStorage.getItem('snakeHiscore')!!) || 0,
      mostMoves: JSON.parse(localStorage.getItem('snakeMostMoves')!!) || 0,
      leastMoves: JSON.parse(localStorage.getItem('snakeLeastMoves')!!) || 0
    };
  },
  methods: {
    changeView(view: string) {
      this.$emit(view);
    }
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
#statistics {
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: auto;
  h2 {
    margin: 0;
    padding: 15px;
  }
  .button-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    button {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      font-weight: bold;
      outline: none;
      border: none;
      margin: 15px auto;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      transition: 0.4s;
    }
    button:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }
  p {
    text-align: left;
    width: 80%;
    margin: auto;
  }
}
</style>
