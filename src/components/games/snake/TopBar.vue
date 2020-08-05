<template>
  <div class="top-bar">
    <div class="btn-container">
      <button @click="changeView('startMenu')">
        Back
      </button>
      <button @click="resetGame()">Reset</button>
    </div>
    <div class="stats">
      <p>Score: {{ score }}</p>
      <p>Times moved: {{ timesMoved }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TopBar',

  props: {
    score: Number,
    timesMoved: Number
  },

  methods: {
    changeView(view: string) {
      this.$emit(view);
    },

    resetGame() {
      this.$emit('reset-game');
    }
  }
});
</script>

<style lang="scss">
.top-bar {
  height: 50px;
  width: 400px;
  display: flex;
  align-items: center;
  background-color: black;

  .btn-container,
  .stats {
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 0 10px;
  }

  .btn-container button {
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    outline: none;
    border: none;
    margin: 5px 15px 5px 5px;
    padding: 0 15px 0 15px;
    font-size: 16px;
    transition: 0.4s;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    &:hover {
      background-color: rgba(255, 255, 255, 1);
    }
  }

  .stats {
    p {
      font-size: 14px;
    }
  }
}

@media only screen and (max-width: 550px) {
  .top-bar {
    width: 350px;

    .stats p {
      font-size: 12px;
    }

    .btn-container,
    .stats {
      padding: 0 6px 0 6px;
    }
  }
}

@media only screen and (max-width: 400px) {
  .top-bar {
    width: 250px;

    .stats p {
      font-size: 10px;
    }

    .btn-container button {
      padding: 0 8px 0 8px;
      font-size: 13px;
      margin: 3px 10px 3px 3px;
    }

    .btn-container,
    .stats {
      padding: 0 2px 0 2px;
    }
  }
}
</style>
