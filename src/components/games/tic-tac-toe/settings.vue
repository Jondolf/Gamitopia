<template>
  <div class="settings">
    <h2>Settings</h2>
    <button v-on:click="this.toggleSettingsVisibility">
      Back To Home Menu
    </button>
    <div class="grid-size-setting-container">
      <div class="sizeInput">
        <input
          type="range"
          max="10"
          min="1"
          :value="gridWidthProp"
          v-on:input="setGridSize"
          ref="gridWidthInput"
          id="gridWidthInput"
        />
        <p>Width</p>
      </div>
      <p>{{ numberToDisplay }}</p>
      <div class="sizeInput">
        <input
          type="range"
          max="10"
          min="1"
          :value="gridHeightProp"
          v-on:input="setGridSize"
          ref="gridHeightInput"
          id="gridHeightInput"
        />
        <p>Height</p>
      </div>
    </div>
    <input
      type="range"
      max="10"
      min="1"
      :value="this.symbolsNeededInARow"
      v-on:input="setRowNeededToWin"
      ref="rowToWinInput"
      id="rowToWinInput"
    />
    <p id="numbersNeededInARowToWin">{{ numbersNeededInARowToWin }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'Start-Menu',
  components: {},
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
  data: function() {
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
  props: {
    symbolsNeededInARow: Number,
    gridWidthProp: Number,
    gridHeightProp: Number
  },
  mounted() {
    this.setGridSize();
    this.setRowNeededToWin();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.settings {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  overflow: auto;
  box-sizing: border-box;

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
  }

  input:hover {
    opacity: 1;
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
  }
  .grid-size-setting-container .sizeInput,
  .grid-size-setting-container {
    #gridWidthInput,
    #gridHeightInput {
      width: 100%;
    }
  }
  #numbersNeededInARowToWin {
    font-size: 13px;
  }

  .sizeInput {
    margin: 0 10px 0 10px;
  }

  button:hover {
    background-color: rgb(91, 97, 112);
  }
}
.darkMode button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
}
.darkMode button:hover {
  background-color: rgb(50, 57, 68);
}
.darkMode .settings {
  background-color: black;
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
