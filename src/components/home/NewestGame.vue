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
  width: 28vw;
  border-radius: 5px;
  margin: 25px;
  transition: 1s;
}

#newest-game-img:hover {
  width: 33vw;
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

@media only screen and (max-width: 700px) {
  #newest-game-img {
    width: 38vw;
  }
  #newest-game-img:hover {
    width: 44vw;
  }
  h3 {
    font-size: 16px;
  }
  h6 {
    font-size: 10px;
    margin: auto 1.5vw;
  }
}

@media only screen and (max-width: 500px) {
  #newest-game-img {
    width: 48vw;
  }
  #newest-game-img:hover {
    width: 55vw;
  }
  h3 {
    font-size: 15px;
  }
  h6 {
    font-size: 9px;
  }
}

@media only screen and (max-width: 350px) {
  #newest-game-img {
    width: 58vw;
  }
  #newest-game-img:hover {
    width: 66vw;
  }
  h3 {
    font-size: 14px;
  }
  h6 {
    font-size: 8px;
  }
}
</style>
