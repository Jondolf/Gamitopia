<template>
  <div class="tic-tac-toe-square">{{ grid }}</div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Tic-Tac-Toe-Square",
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
.tic-tac-toe-square {
  width: 25vw;
  height: 25vw;
  outline: 2px solid black;
  font-size: 11vw;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.darkMode .tic-tac-toe-square {
  outline: 2px solid white;
}

.tic-tac-toe-square:hover {
  background-color: gray;
}

@media only screen and (min-width: 600px) {
  .tic-tac-toe-square {
    width: 15vw;
    height: 15vw;
    font-size: 8vw;
  }
}

@media only screen and (min-width: 1100px) {
  .tic-tac-toe-square {
    width: 10vw;
    height: 10vw;
    font-size: 5vw;
  }
}
</style>
