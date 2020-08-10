<template>
  <div class="number-range">
    <p class="result">{{ result }}</p>
    <button @click="getRandomInt()" class="randomize-button">Randomize</button>
    <div class="value-input-container">
      <div class="min-container">
        <input
          v-model="minValue"
          type="text"
          @input="
            minValue = minValue.replace(/[^0-9.]/g, '');
            minValue = minValue.replace(/(\..*)\./g, '$1');
          "
          placeholder="Minimum value"
          name="Min value"
          id="minValue"
        />
        <label for="minValue">Minimum</label>
      </div>
      <div class="min-container">
        <input
          v-model="maxValue"
          type="text"
          @input="
            maxValue = maxValue.replace(/[^0-9.]/g, '');
            maxValue = maxValue.replace(/(\..*)\./g, '$1');
          "
          placeholder="Maximum value"
          name="Max value"
          id="maxValue"
        />
        <label for="maxValue">Maximum</label>
      </div>
    </div>
    <p class="error-message" v-if="isError">{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
  name: 'NumberRange',

  data() {
    return {
      result: 0,
      minValue: 0,
      maxValue: 10,
      isError: false,
      errorMessage: ''
    };
  },

  methods: {
    getRandomInt() {
      if (this.minValue <= this.maxValue) {
        this.minValue = Math.ceil(this.minValue);
        this.maxValue = Math.floor(this.maxValue);
        this.result =
          Math.floor(Math.random() * (this.maxValue - this.minValue + 1)) +
          this.minValue;
      }
    }
  },

  watch: {
    minValue() {
      if (this.minValue > this.maxValue) {
        this.errorMessage =
          'Minimum value has to be smaller than the maximum value';
        this.isError = true;
      } else {
        this.isError = false;
        this.errorMessage = 'Something went wrong';
      }
    },

    maxValue() {
      if (this.maxValue < this.minValue) {
        this.errorMessage =
          'Maximum value has to be smaller than the minimum value';
        this.isError = true;
      } else {
        this.isError = false;
        this.errorMessage = 'Something went wrong';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.number-range {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 40px 10px 50px 10px;
  box-sizing: border-box;
  .result {
    margin: 30px auto;
    font-size: 75px;
    word-break: break-word;
    line-height: 5rem;
  }

  .randomize-button {
    background-color: rgba(255, 255, 255, 0.65);
    font-family: Nunito;
    border: 2px solid black;
    border-radius: 5px;
    padding: 12px;
    outline: none;
    font-size: 18px;
    font-weight: bold;
    transition: 0.2s;
    &:hover {
      background-color: rgba(255, 255, 255, 0.825);
      border-radius: 7px;
    }
    &:active {
      background-color: rgba(255, 255, 255, 1);
      border-radius: 7px;
    }
  }
  .value-input-container {
    display: flex;
    justify-content: space-between;
    width: 80%;
    div {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 44%;
      input {
        background-color: rgba(255, 255, 255, 0.65);
        font-family: Nunito;
        border: 2px solid black;
        border-radius: 5px;
        padding: 7px;
        outline: none;
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 10px;
        width: 100%;
        box-sizing: border-box;
        transition: 0.2s;
        text-align: center;
        &:hover {
          background-color: rgba(255, 255, 255, 0.825);
          border-radius: 7px;
        }
        &:focus {
          background-color: rgba(255, 255, 255, 1);
          border-radius: 7px;
        }
      }
      label {
        text-align: center;
      }
    }
  }

  .error-message {
    color: red;
    font-weight: bold;
    font-size: 12px;
    width: 90%;
    position: absolute;
    bottom: 20px;
    text-align: center;
  }
}
</style>
