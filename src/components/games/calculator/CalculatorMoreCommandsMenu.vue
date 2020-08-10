<template>
  <div
    v-hammer:swipe.vertical="
      (e) => $emit(e.type === 'swipedown' ? 'openMenu' : 'closeMenu')
    "
    :style="{ top: isMenuOpen ? '20%' : '-55%' }"
    class="calculator-more-commands-menu"
  >
    <div class="button-container">
      <button @click="$emit('add-symbol-to-calculation', '(')" class="command">
        (
      </button>
      <button @click="$emit('add-symbol-to-calculation', ')')" class="command">
        )
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'mod')"
        class="command"
      >
        mod
      </button>
      <button @click="$emit('add-symbol-to-calculation', '%')" class="command">
        %
      </button>
      <button @click="$emit('add-symbol-to-calculation', '!')" class="command">
        n!
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'sin(')"
        class="command"
      >
        sin
      </button>
      <button @click="$emit('add-symbol-to-calculation', 'cos(')" class="cos">
        cos
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'tan(')"
        class="command"
      >
        tan
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'log(')"
        class="command"
      >
        log
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'ln(')"
        class="command"
      >
        ln
      </button>
      <button
        @click="$emit('add-symbol-to-calculation', 'lg(')"
        class="command"
      >
        lg
      </button>
    </div>

    <div @click="$emit('toggle-menu')" class="swipe-container">
      <i
        :style="{ transform: isMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
        class="material-icons"
        >expand_more</i
      >
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalculatorMoreCommandsMenu',

  props: {
    isMenuOpen: Boolean
  }
});
</script>

<style lang="scss" scoped>
.calculator-more-commands-menu {
  position: absolute;
  height: 80%;
  transition: 0.5s ease;
  width: 100%;
  background-color: #44ccff;
  color: black;
  z-index: 1;

  .button-container {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    height: 93%;
    transition: 0.2s ease-out;
    font-size: 32px;
    font-weight: 800;
    button {
      background-color: transparent;
      color: black;
      border: 1px solid rgba(55, 76, 194, 0.25);
      transition: 0.2s ease-out;
      font-size: 32px;
      font-weight: 800;
      position: relative;
      overflow: hidden;
    }
  }

  .swipe-container {
    height: 7%;
    border-top: 2px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    i {
      color: black;
      transition: transform 0.5s ease;
    }
  }
}
</style>
