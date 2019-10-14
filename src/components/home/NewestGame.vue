<template>
  <div id="newest-game">
    <h1>Newest Game</h1>
    <h3>Tic-Tac-Toe</h3>
    <router-link to="/tic-tac-toe">
      <img
        src="@/assets/images/tic-tac-toe-light-thumbnail.jpg"
        alt="Tic-Tac-Toe"
        id="newest-game-img"
      />
    </router-link>
    <h6>12.10.2019</h6>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "NewestGame"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
#newest-game-img {
  width: 30vw;
  border-radius: 5px;
  margin: 25px;
  transition: 1s;
}

#newest-game-img:hover {
  width: 35vw;
}
#newest-game {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 20px;
  color: white;
}

h2 {
  margin: 65px auto 20px auto;
}
h3 {
  margin: 20px auto 10px auto;
}
</style>
