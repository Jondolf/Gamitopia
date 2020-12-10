<template>
  <div class="statistics">
    <h2>Statistics</h2>
    <div class="button-container">
      <button @click="$emit('change-current-view', 'Start menu')">
        Go back
      </button>
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Statistics',

  setup() {
    return {
      hiscore: JSON.parse(localStorage.getItem('snakeHiscore')!!) || 0,
      mostMoves: JSON.parse(localStorage.getItem('snakeMostMoves')!!) || 0,
      leastMoves: JSON.parse(localStorage.getItem('snakeLeastMoves')!!) || 0
    };
  }
});
</script>

<style lang="scss">
.statistics {
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
      border-radius: var(--border-radius);
      font-weight: bold;
      outline: none;
      border: none;
      margin: 15px auto;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      transition: 0.4s;
      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }

  p {
    text-align: left;
    width: 80%;
    margin: auto;
  }
}
</style>
