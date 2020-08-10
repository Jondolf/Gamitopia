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
import { defineComponent } from 'vue';

export default defineComponent({
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
  background-color: black;
  border: 2px solid var(--color-light-contrast);
  border-radius: 5px;
  font-family: 'Nunito', 'Nunito Sans', sans-serif;
  box-sizing: border-box;
  overflow: hidden;
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
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
