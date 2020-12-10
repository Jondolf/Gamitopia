<template>
  <div class="button-container">
    <button button @click="$emit('add-symbol-to-calculation', 1)" class="number one">
      1
    </button>
    <button @click="$emit('add-symbol-to-calculation', 2)" class="number two">
      2
    </button>
    <button @click="$emit('add-symbol-to-calculation', 3)" class="number three">
      3
    </button>
    <button @click="$emit('add-symbol-to-calculation', 4)" class="number four">
      4
    </button>
    <button @click="$emit('add-symbol-to-calculation', 5)" class="number five">
      5
    </button>
    <button @click="$emit('add-symbol-to-calculation', 6)" class="number six">
      6
    </button>
    <button @click="$emit('add-symbol-to-calculation', 7)" class="number seven">
      7
    </button>
    <button @click="$emit('add-symbol-to-calculation', 8)" class="number eight">
      8
    </button>
    <button @click="$emit('add-symbol-to-calculation', 9)" class="number nine">
      9
    </button>
    <button @click="$emit('add-symbol-to-calculation', 0)" class="number zero">
      0
    </button>
    <button @click="$emit('add-symbol-to-calculation', '.')" class="number dot">
      .
    </button>

    <button @click="$emit('clear')" class="command clear">
      C
    </button>
    <button @click="$emit('add-symbol-to-calculation', '(')" class="command opening-parentheses">
      (
    </button>
    <button @click="$emit('add-symbol-to-calculation', ')')" class="command closing-parentheses">
      )
    </button>
    <button @click="$emit('remove-symbol-from-calculation')" class="command backspace">
      <i class="material-icons">backspace</i>
    </button>
    <button @click="$emit('add-symbol-to-calculation', '+')" class="command plus">
      +
    </button>
    <button @click="$emit('add-symbol-to-calculation', '-')" class="command minus">
      -
    </button>
    <button @click="$emit('add-symbol-to-calculation', 'x')" class="command multiply">
      x
    </button>
    <button @click="$emit('add-symbol-to-calculation', '÷')" class="command divide">
      ÷
    </button>
    <button @click="$emit('add-symbol-to-calculation', '=')" class="command equals">
      =
    </button>
    <button @click="$emit('add-symbol-to-calculation', '√')" class="command sqrt medium-grid-button">
      √
    </button>
    <button @click="$emit('add-symbol-to-calculation', '^')" class="command pow medium-grid-button">
      ^
    </button>
    <button @click="$emit('add-symbol-to-calculation', 'π')" class="command pi medium-grid-button">
      π
    </button>
    <button @click="$emit('add-symbol-to-calculation', 'e')" class="command euler medium-grid-button">
      e
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'CalculatorButtonContainer'
});
</script>

<style lang="scss" scoped>
.button-container {
  background-color: #e1e1e1;
  display: grid;
  position: absolute;
  top: 25%;
  right: 0;
  bottom: 0;
  left: 0;
  transition: 0.2s ease-out;
  box-sizing: border-box;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr;

  button {
    padding: 0;
    border: 1px solid rgba(55, 76, 194, 0.25);
    transition: 0.2s ease-out;
    font-size: 29px;
    font-weight: 800;
    font-family: 'Nunito Sans', 'Nunito', sans-serif;
    position: relative;
    overflow: hidden;
  }

  .number {
    background-color: rgba(205, 205, 210, 0.7);
    color: #000000;

    &.one {
      grid-column: 1/2;
      grid-row: 2/3;
    }
    &.two {
      grid-column: 2/3;
      grid-row: 2/3;
    }
    &.three {
      grid-column: 3/4;
      grid-row: 2/3;
    }
    &.four {
      grid-column: 1/2;
      grid-row: 3/4;
    }
    &.five {
      grid-column: 2/3;
      grid-row: 3/4;
    }
    &.six {
      grid-column: 3/4;
      grid-row: 3/4;
    }
    &.seven {
      grid-column: 1/2;
      grid-row: 4/5;
    }
    &.eight {
      grid-column: 2/3;
      grid-row: 4/5;
    }
    &.nine {
      grid-column: 3/4;
      grid-row: 4/5;
    }
    &.zero {
      grid-column: 1/2;
      grid-row: 5/6;
    }
    &.dot {
      grid-column: 2/3;
      grid-row: 5/6;
    }
  }

  .command {
    background-color: rgba(119, 171, 255, 0.7);
    color: #000000;

    &.clear {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    &.opening-parentheses {
      grid-column: 2/3;
      grid-row: 1/2;
    }
    &.closing-parentheses {
      grid-column: 3/4;
      grid-row: 1/2;
    }
    &.backspace {
      grid-column: 4/6;
      grid-row: 1/2;
      i {
        color: #000000;
      }
    }
    &.plus {
      grid-column: 4/5;
      grid-row: 2/3;
    }
    &.minus {
      grid-column: 4/5;
      grid-row: 3/4;
    }
    &.multiply {
      grid-column: 4/5;
      grid-row: 4/5;
    }
    &.divide {
      grid-column: 4/5;
      grid-row: 5/6;
    }
    &.equals {
      grid-column: 3/4;
      grid-row: 5/6;
      background-color: rgba(205, 205, 210, 0.7);
      color: #000000;
      &:hover {
        background-color: rgba(205, 205, 210, 0.85);
      }
      &:active {
        background-color: #cdcdd2;
      }
    }
    &.sqrt {
      grid-column: 5/5;
      grid-row: 2/3;
    }
    &.pow {
      grid-column: 5/5;
      grid-row: 3/4;
    }
    &.pi {
      grid-column: 5/5;
      grid-row: 4/5;
    }
    &.euler {
      grid-column: 5/5;
      grid-row: 5/6;
    }
  }
}
</style>
