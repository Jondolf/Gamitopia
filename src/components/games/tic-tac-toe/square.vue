<template>
  <div class="grid-square" :style="{ width: squareSize, height: squareSize }">
    <p :style="{ fontSize: fontSize }">{{ grid }}</p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Grid-Square",
  components: {},
  props: {
    grid: String,
    squareSize: String,
    fontSize: String
  },

  methods: {},
  data: function() {
    return {};
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.grid-square {
  outline: 2px solid black;
  font-size: 11vw;
  background-color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s;
  overflow: hidden;
  p {
    display: flex;
    align-items: center;
  }
}

.grid-square:hover {
  background-color: rgba(127.5, 127.5, 127.5, 1);
}
.darkMode .grid-square {
  background-color: black;
  outline: 2px solid white;
}
.darkMode .grid-square:hover {
  background-color: rgba(127.5, 127.5, 127.5, 1);
}

@media only screen and (min-width: 600px) {
  .grid-square {
    font-size: 8vw;
  }
}

@media only screen and (min-width: 1100px) {
  .grid-square {
    font-size: 5vw;
  }
}
</style>
