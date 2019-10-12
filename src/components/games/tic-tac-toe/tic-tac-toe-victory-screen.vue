<template>
  <div class="tic-tac-toe-win-screen">
    <h2>{{ gameEndMessage }}</h2>
    <button v-on:click="onClickButton">Restart</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "Tic-Tac-Toe-Win-Screen",
  components: {},
  props: {
    gameEndMessage: String
  },
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
.tic-tac-toe-win-screen {
  position: absolute;
  padding-top: 15%;
  width: 100%;
  height: 100%;
  background-color: rgba(34, 40, 49, 0.5);
}
h2 {
  color: white;
}

button {
  width: 20vw;
  padding: 10px;
  font-size: 16px;
  outline: none;
  border: none;
  background-color: white;
  font-family: Nunito;
  border-radius: 5px;
}

button:hover {
  background-color: rgb(200, 200, 200);
}

@media only screen and (max-width: 650px) {
  h2 {
    font-size: 14px;
  }
  button {
    width: 25vw;
    padding: 7px;
    font-size: 12px;
  }
}

@media only screen and (max-width: 600px) {
  h2 {
    font-size: 20px;
  }
  button {
    width: 20vw;
    padding: 9px;
    font-size: 16px;
  }
}

@media only screen and (max-width: 400px) {
  h2 {
    font-size: 16px;
  }
  button {
    width: 30vw;
    padding: 8px;
    font-size: 14px;
  }
}
</style>
