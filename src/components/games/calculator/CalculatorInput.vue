<template>
  <div class="calculator-input">
    <button @click="$emit('toggle-is-deg')">
      {{ isDeg ? 'DEG' : 'RAD' }}
    </button>
    <div class="calculation-container">
      <p class="calculation" ref="calculation">{{ calculation }}</p>
      <p class="current-result">{{ currentResult }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'CalculatorInput',

  props: {
    calculation: String,
    currentResult: String,
    isDeg: Boolean
  },

  watch: {
    calculation() {
      setTimeout(() => {
        const calculationElement = this.$refs
          .calculation as HTMLParagraphElement;
        if (this.calculation[0] === '=') {
          calculationElement.scrollLeft = 0;
        } else {
          calculationElement.scrollLeft = calculationElement.scrollWidth;
        }
      }, 1);
    }
  }
});
</script>

<style lang="scss" scoped>
.calculator-input {
  background-color: white;
  transition: 0.2s;
  box-sizing: border-box;
  padding: 0 60px 0 0;
  height: 20%;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  font-weight: 800;
  z-index: 2;
  box-shadow: 0px 5px 10px -5px rgba(255, 255, 255, 0.75);
  overflow: auto;

  button {
    width: 64px;
    height: 32px;
    margin-left: 4px;
    margin-right: 10px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 5px;
    outline: none;
    font-size: 16px;
    font-weight: 900;
    color: #44ccff;
    background-color: transparent;
    transition: 0.2s;
    &:active {
      background-color: rgba(68, 204, 255, 0.25);
    }
  }

  .calculation-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: left;
    position: absolute;
    top: 10px;
    right: 50px;
    bottom: 10px;
    left: 74px;
    p {
      margin: 0;
      text-align: left;
      display: flex;
      align-items: center;
      transition: 0.2s ease-out;
      white-space: nowrap;
      -webkit-user-drag: none;
      &.calculation {
        color: black;
        font-size: 5.5vh;
        width: 100%;
        height: 5.5vh;
        overflow-x: auto;
        overflow-y: hidden;
        box-sizing: border-box;
      }
      &.current-result {
        color: gray;
        font-size: 3vh;
        height: 3vh;
      }
    }
  }
}
</style>
