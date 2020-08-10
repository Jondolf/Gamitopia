<template>
  <div class="start-menu">
    <h2>Snake</h2>
    <div class="button-container">
      <button @click="$emit('change-current-view', 'Game area')">
        Start game
      </button>
      <button @click="$emit('change-current-view', 'Statistics')">
        Statistics
      </button>
      <button @click="$emit('change-current-view', 'Settings')">
        Settings
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartMenu'
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
