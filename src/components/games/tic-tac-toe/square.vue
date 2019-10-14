<template>
  <div class="grid-square">{{ grid }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Grid-Square",
  components: {},
  props: {
    grid: String
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
  width: 25vw;
  height: 25vw;
  outline: 2px solid black;
  font-size: 11vw;
  background-color: rgba(255, 255, 255, 0);
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.4s;
}

.grid-square:hover {
  background-color: rgba(127.5, 127.5, 127.5, 1);
}
.darkMode .grid-square {
  outline: 2px solid white;
}

@media only screen and (min-width: 600px) {
  .grid-square {
    width: 15vw;
    height: 15vw;
    font-size: 8vw;
  }
}

@media only screen and (min-width: 1100px) {
  .grid-square {
    width: 10vw;
    height: 10vw;
    font-size: 5vw;
  }
}
</style>
