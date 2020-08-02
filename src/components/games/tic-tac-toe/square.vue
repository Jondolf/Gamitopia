<template>
  <div class="square" :style="{ width: squareSize, height: squareSize }">
    <p :style="{ fontSize: fontSize }">{{ grid }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Square',

  props: {
    grid: String,
    squareSize: String,
    fontSize: String
  }
});
</script>

<style lang="scss" scoped>
.square {
  outline: 2px solid black;
  font-size: 11vw;
  background-color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  overflow: hidden;
  &:hover {
    background-color: rgba(127.5, 127.5, 127.5, 1);
  }

  p {
    color: black;
    display: flex;
    align-items: center;
  }
}

.dark .square {
  background-color: black;
  outline: 2px solid white;
  &:hover {
    background-color: rgba(127.5, 127.5, 127.5, 1);
  }

  p {
    color: white;
  }
}

@media only screen and (min-width: 600px) {
  .square {
    font-size: 8vw;
  }
}

@media only screen and (min-width: 1100px) {
  .square {
    font-size: 5vw;
  }
}
</style>
