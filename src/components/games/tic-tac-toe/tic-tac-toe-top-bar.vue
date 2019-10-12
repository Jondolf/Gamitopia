<template>
  <div class="tic-tac-toe-top-bar">
    <button v-on:click="onClickButton">Restart</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "TicTacToeTopBar",
  components: {},
  methods: {
    onClickButton() {
      this.$emit("clicked");
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.tic-tac-toe-top-bar {
  height: 5vw;
  border-bottom: 2px solid black;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 100%;
    height: 100%;
    background-color: rgba(34, 40, 49, 0.5);
    color: white;
    font-size: 3vw;
    outline: none;
    border: none;
    font-family: Nunito;
  }
  button:hover {
    background-color: rgba(34, 40, 49, 0.75);
  }
}
.darkMode button {
  background-color: rgb(36, 41, 49);
}
.darkMode button:hover {
  background-color: rgb(50, 57, 68);
}
.darkMode .tic-tac-toe-top-bar {
  background-color: black;
  border-bottom: 2px solid white;
}

@media only screen and (min-width: 600px) {
  .tic-tac-toe-top-bar button {
    font-size: 2.5vw;
  }
}

@media only screen and (min-width: 1100px) {
  .tic-tac-toe-top-bar button {
    font-size: 2vw;
  }
}
</style>
