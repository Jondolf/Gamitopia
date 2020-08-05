<template>
  <div class="color-selection">
    <h1>Colors</h1>
    <div class="color-square-container">
      <button
        v-for="(color, index) in colors"
        :key="index"
        @click="setColor(color)"
        :title="color.name"
        :style="`background-color: ${color.rgba}`"
        class="color-square"
      ></button>
      <div class="recent-colors">
        <h2>Recent colors</h2>
        <button
          v-for="(color, index) in recentColors"
          :key="index"
          @click="setColor(color)"
          :title="color.name"
          :style="`background-color: ${color.rgba}`"
          class="color-square"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

interface Color {
  name: string;
  rgba: string;
}

export default Vue.extend({
  name: 'ColorSelection',

  data() {
    return {
      colors: [
        {
          name: 'Yellow',
          rgba: 'rgba(255, 255, 0, 1)'
        },
        {
          name: 'Orange',
          rgba: 'rgba(255, 127, 0, 1)'
        },
        {
          name: 'Red',
          rgba: 'rgba(255, 0, 0, 1)'
        },
        {
          name: 'Green',
          rgba: 'rgba(0, 255, 0, 1)'
        },
        {
          name: 'Turquoise',
          rgba: 'rgba(0, 255, 255, 1)'
        },
        {
          name: 'Blue',
          rgba: 'rgba(0, 0, 255, 1)'
        },
        {
          name: 'Purple',
          rgba: 'rgba(255, 0, 255, 1)'
        },
        {
          name: 'Pink',
          rgba: 'rgba(255, 127, 255, 1)'
        }
      ] as Color[],

      recentColors: [] as Color[]
    };
  },

  methods: {
    setColor(color: Color) {
      this.$emit('color-changed', color.rgba);
      for (const recentColor of this.recentColors) {
        if (color.rgba === recentColor.rgba) {
          return;
        }
      }
      if (this.recentColors.length >= 4) {
        this.recentColors.pop();
        this.recentColors.unshift({
          name: color.name ? color.name : color.rgba,
          rgba: color.rgba
        } as Color);
      } else {
        this.recentColors.push({
          name: color.name ? color.name : color.rgba,
          rgba: color.rgba
        } as Color);
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.color-selection {
  border: 2px solid black;
  background-color: white;
  color: black;
  border-radius: 5px;
  text-align: left;
  width: 120px;
  margin: 5px;
  .color-square-container {
    width: 100%;
    text-align: left;
    .color-square {
      border: 2px solid black;
      border-radius: 5px;
      width: 20px;
      height: 20px;
      margin-right: 5px;
      margin-bottom: 5px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
</style>
