<template>
  <div
    :style="
      isFullscreen ? { width: '100%', height: '100%' } : { width, height }
    "
    :class="isFullscreen ? 'game-container fullscreen' : 'game-container'"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'GameContainer',

  props: {
    width: String,
    height: String,
    isFullscreen: Boolean
  },

  watch: {
    isFullscreen() {
      document.body.style.overflow = this.isFullscreen ? 'hidden' : 'auto';
    }
  }
});
</script>

<style lang="scss" scoped>
.game-container {
  position: relative;
  margin: auto;
  border: 2px solid var(--color-light-contrast);
  border-radius: 5px;
  font-family: 'Nunito', 'Nunito Sans', sans-serif;
  touch-action: manipulation;
  box-sizing: border-box;
  overflow: hidden;
  &.fullscreen {
    border: none;
    border-radius: 0;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 20;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }
}
</style>
