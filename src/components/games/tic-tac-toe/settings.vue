<template>
  <div class="settings">
    <h2>Settings</h2>
    <button @click="this.toggleSettingsVisibility">
      Back To Home Menu
    </button>
    <div class="grid-size-setting-container">
      <div class="size-input">
        <input
          type="range"
          max="10"
          min="1"
          @input="setGridSize"
          :value="gridWidthProp"
          ref="gridWidthInput"
          class="grid-width-input"
        />
        <p>Width</p>
      </div>
      <p>{{ numberToDisplay }}</p>
      <div class="size-input">
        <input
          type="range"
          max="10"
          min="1"
          @input="setGridSize"
          :value="gridHeightProp"
          ref="gridHeightInput"
          class="grid-height-input"
        />
        <p>Height</p>
      </div>
    </div>
    <input
      type="range"
      max="10"
      min="1"
      @input="setRowNeededToWin"
      :value="this.symbolsNeededInARow"
      ref="rowToWinInput"
      class="row-to-win-input"
    />
    <p class="numbers-needed-in-a-row-to-win">{{ numbersNeededInARowToWin }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'StartMenu',

  props: {
    symbolsNeededInARow: Number,
    gridWidthProp: Number,
    gridHeightProp: Number
  },

  data() {
    return {
      gridWidthInput: this.$refs.gridWidthInput as HTMLInputElement,
      gridHeightInput: this.$refs.gridHeightInput as HTMLInputElement,
      settingsVisibility: true,
      numberToDisplay: '3',
      gridWidth: '3',
      gridHeight: '3',
      numbersNeededInARowToWin: 'Numbers in a row required to win: '
    };
  },

  methods: {
    toggleSettingsVisibility() {
      this.$emit('openSettingsBtnClicked');
    },

    setGridWidth(width: number) {
      this.$emit('gridWidthChanged', width);
    },

    setGridHeight(height: number) {
      this.$emit('gridHeightChanged', height);
    },

    displayNum() {
      this.numberToDisplay =
        this.gridWidth.toString() + 'x' + this.gridHeight.toString();
    },

    setGridSize() {
      const gridWidthInput = this.$refs.gridWidthInput as HTMLInputElement;
      const gridHeightInput = this.$refs.gridHeightInput as HTMLInputElement;
      this.gridWidth = gridWidthInput.value;
      this.gridHeight = gridHeightInput.value;
      this.setGridWidth(+this.gridWidth);
      this.setGridHeight(+this.gridHeight);
      this.displayNum();
    },

    setRowNeededToWin() {
      const rowToWinInput = this.$refs.rowToWinInput as HTMLInputElement;
      this.numbersNeededInARowToWin =
        'Numbers needed in a row required to win: ' + rowToWinInput.value;
      this.$emit('rowToWinChanged', rowToWinInput.value);
    }
  },

  mounted() {
    this.setGridSize();
    this.setRowNeededToWin();
  }
});
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: auto;
  box-sizing: border-box;
  background-color: white;
  color: black;

  h2 {
    margin: 15px 0;
  }

  p {
    color: black;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
    width: 33%;
    height: 8px;
    background: #d3d3d3;
    outline: none;
    opacity: 0.7;
    -webkit-transition: 0.2s;
    transition: opacity 0.2s;
    border-radius: 30px;
    &:hover {
      opacity: 1;
    }
  }

  input::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: rgb(95, 95, 255);
    cursor: pointer;
    outline: none;
    border: none;
  }

  input::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: rgb(95, 95, 255);
    cursor: pointer;
    outline: none;
    border: none;
  }

  button {
    width: 100%;
    height: 20%;
    color: white;
    font-size: 16px;
    outline: none;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    background-color: rgba(34, 40, 49, 0.5);
    transition: 0.4s;
    &:hover {
      background-color: rgb(91, 97, 112);
    }
  }

  .grid-size-setting-container {
    display: flex;
    justify-content: space-between;
    padding: 5%;

    h3 {
      border: 1px solid;
      padding: 5px;
      margin-bottom: 15px;
      font-size: 3vw;
    }

    button {
      border: 1px solid;
      margin: 5px;
      padding: 5px;
    }

    .size-input {
      margin: 0 10px 0 10px;

      .grid-width-input,
      .grid-height-input {
        width: 100%;
      }
    }
  }

  .numbers-needed-in-a-row-to-win {
    font-size: 13px;
  }
}

.dark .settings {
  background-color: black;
  color: white;

  p {
    color: white;
  }

  button {
    background-color: rgb(36, 41, 49);
    color: white;
    border-color: white;
    &:hover {
      background-color: rgb(50, 57, 68);
    }
  }
}

@media only screen and (min-width: 600px) {
  .grid-size h3 {
    font-size: 2.4vw;
  }
}

@media only screen and (min-width: 1100px) {
  .grid-size h3 {
    font-size: 1.5vw;
  }
}
</style>
