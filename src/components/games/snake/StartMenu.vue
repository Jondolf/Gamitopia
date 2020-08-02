<template>
  <div class="start-menu">
    <h2>Snake</h2>
    <div class="button-container">
      <button @click="changeView('gameArea')">Start game</button>
      <button @click="changeView('statistics')">Statistics</button>
      <button @click="changeView('settings')">Settings</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StartMenu',

  methods: {
    changeView(view: string) {
      this.$emit(view);
    }
  }
});
</script>

<style lang="scss">
.start-menu {
  width: 100%;
  height: 100%;
  background-color: black;

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
      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>
