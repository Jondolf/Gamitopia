<template>
  <div class="view settings">
    <h2>Settings</h2>
    <button @click="$emit('go-back')" class="menu-button">
      Back To Home Menu
    </button>
    <div class="grid-size-setting-container">
      <div class="size-input">
        <input
          type="range"
          max="10"
          min="1"
          @input="(e) => $emit('set-grid-width', +e.target.value)"
          :value="gridWidthProp"
          class="grid-width-input range"
        />
        <p>Width</p>
      </div>
      <p class="grid-size">{{ gridWidthProp }}x{{ gridHeightProp }}</p>
      <div class="size-input">
        <input
          type="range"
          max="10"
          min="1"
          @input="(e) => $emit('set-grid-height', +e.target.value)"
          :value="gridHeightProp"
          class="grid-height-input range"
        />
        <p>Height</p>
      </div>
    </div>
    <input
      type="range"
      max="10"
      min="1"
      @input="(e) => $emit('set-target-symbol-row-length', +e.target.value)"
      :value="targetSymbolRowLength"
      class="target-symbol-row-length-input range"
    />
    <p class="target-symbol-row-length">Crosses or noughts needed in a row to win: {{ targetSymbolRowLength }}</p>
    <div class="ai-starts">
      <label for="aiStarts">AI starts</label>
      <input
        type="checkbox"
        @input="(e) => $emit('set-ai-starts', e.target.checked)"
        :checked="aiStarts"
        class="checkbox"
        id="aiStarts"
      />
    </div>
    <button @click="$emit('toggle-fullscreen')" class="toggle-fullscreen-button">
      Toggle fullscreen
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StartMenu',

  props: {
    gridWidthProp: Number,
    gridHeightProp: Number,
    targetSymbolRowLength: Number,
    aiStarts: Boolean
  }
});
</script>

<style lang="scss" scoped>
.view.settings {
  display: block;

  input.range {
    -webkit-appearance: none;
    appearance: none;
    width: 33%;
    max-width: 550px;
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

  input.range::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 18px;
    height: 18px;
    background: rgb(95, 95, 255);
    cursor: pointer;
    outline: none;
    border: none;
  }

  input.range::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: rgb(95, 95, 255);
    cursor: pointer;
    outline: none;
    border: none;
  }

  .grid-size-setting-container {
    display: flex;
    justify-content: space-between;
    padding: 5%;

    .size-input {
      width: 100%;
      padding: 0 15px 0 15px;

      .grid-width-input,
      .grid-height-input {
        width: 100%;
      }
    }

    .grid-size {
      min-width: 50px;
    }
  }

  .target-symbol-row-length-input.range {
    width: 100%;
  }

  .target-symbol-row-length {
    font-size: 13px;
  }

  .ai-starts {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5%;

    label {
      margin-right: 10px;
      color: var(--color-light-contrast);
    }
  }

  .toggle-fullscreen-button {
    padding: 10px;
    width: auto;
    height: auto;
    background-color: transparent;
    border: 2px solid var(--color-light-contrast);
    border-radius: var(--border-radius);
    color: var(--color-light-contrast);
    font-weight: normal;
    margin-top: 5%;
    &:hover {
      background-color: transparent;
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
