<template>
  <div id="game-thumbnails">
    <div class="game-container">
      <ul>
        <li>
          <h3>Randomizer</h3>
          <router-link to="/randomizer">
            <img
              src="@/assets/images/randomizer-thumbnail.png"
              alt="Randomizer"
              class="new-img"
            />
          </router-link>

          <h6>30.9.2019</h6>
        </li>
        <li>
          <h3>Cookie Clicker</h3>
          <router-link to="/cookie-clicker">
            <img
              src="@/assets/images/cookie-clicker-thumbnail.png"
              alt="Cookie Clicker"
              class="new-img"
            />
          </router-link>

          <h6>31.8.2019</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "GameThumbnails"
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";
.new-img {
  width: 90%;
  max-width: 450px;
  border-radius: 5px;
  margin: 20px, 0;
}

.game-container {
  display: flex;
  flex-direction: row;
  margin: auto;
  justify-content: center;
  padding: initial;
}

.game-container li {
  max-width: 300px;
  min-width: 100px;
  min-height: 100px;
  width: 100%;
  background-color: var(--secondary-color);
  margin: 60px;
  display: inline-block;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: white;
}

.game-container li h3,
.game-container li h6 {
  margin: 5px;
}

@media only screen and (max-width: 450px) {
  .game-container li {
    width: 250px;
    margin: 45px;
  }
}

@media only screen and (max-width: 400px) {
  .game-container li {
    width: 200px;
    margin: 40px;
  }
}
</style>
