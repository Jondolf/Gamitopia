<template>
  <div class="top-bar">
    <button @click="$emit('go-back')">Open Menu</button>
    <button @click="$emit('restart')">Restart</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TopBar'
});
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  height: 75px;
  margin: 0;
  border-bottom: 2px solid var(--color-light-contrast);
  background-color: rgba(75, 75, 200, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  button {
    width: 50%;
    height: 100%;
    outline: none;
    border: none;
    border-radius: 0;
    font-family: Nunito;
    font-size: 20px;
    font-weight: bold;
    color: var(--color-light-contrast);
    background-color: transparent;
    transition: 0.3s;
  }
}
</style>
