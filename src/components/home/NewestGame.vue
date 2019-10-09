<template>
  <div id="newest-game">
    <h1>Newest Game</h1>
    <h2>Randomizer</h2>
    <router-link to="/randomizer">
      <img
        src="@/assets/images/randomizer-thumbnail.png"
        alt="Randomizer"
        id="newest-game-img"
      />
    </router-link>
    <h6>31.8.2019</h6>
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
#newest-game {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 20px;
  color: white;
}

#newest-game-img {
  margin: 15px;
  width: 350px;
  max-width: 450px;
  border-radius: 5px;
}

h2 {
  margin: 65px auto 0 auto;
}
@media only screen and (max-width: 645px) {
  #newest-game-img {
    width: 300px;
  }
}

@media only screen and (max-width: 400px) {
  #newest-game-img {
    width: 200px;
  }
  #newest-game-img {
    width: 250px;
  }
}

@media only screen and (max-width: 345px) {
  #newest-game-img {
    width: 200px;
  }
}
</style>
