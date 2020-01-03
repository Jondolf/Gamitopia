<template>
  <div id="recent-games">
    <h2>Recent Games</h2>
    <div class="game-container">
      <ul>
        <li>
          <h3>Snake</h3>
          <router-link to="/snake">
            <img
              src="@/assets/images/snake-thumbnail.jpg"
              alt="Snake game"
              class="new-img"
            />
          </router-link>
          <h6>3.1.2020</h6>
        </li>
        <li>
          <h3>Adventura</h3>
          <router-link to="/adventura">
            <img
              src="@/assets/images/adventura-thumbnail.png"
              alt="Adventura game"
              class="new-img"
            />
          </router-link>
          <h6>24.12.2019</h6>
        </li>
        <li>
          <h3>Tic-Tac-Toe</h3>
          <router-link to="/tic-tac-toe">
            <img
              src="@/assets/images/tic-tac-toe-light-thumbnail.jpg"
              alt="Tic-Tac-Toe"
              class="new-img"
            />
          </router-link>
          <h6>12.10.2019</h6>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'RecentGames'
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';

h2 {
  margin: 65px auto 20px auto;
}

.new-img {
  width: 18vw;
  border-radius: 5px;
  margin: 20px, 0;
  transition: 1s;
}

.new-img:hover {
  width: 20vw;
}

.game-container {
  margin: auto;
  padding: initial;
}

.game-container li {
  background-color: var(--secondary-color);
  margin: 5vw;
  display: inline-block;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  color: white;
  transition: 1s;
  max-height: 50vw;
  padding: 0 1vw 0.75vw 1vw;
}

.game-container li h3,
.game-container li h6 {
  margin: auto 0.5vw;
}

@media only screen and (max-width: 700px) {
  .game-container li {
    margin: 5vw;
    padding: 0 1.5vw 1.5vw 1.5vw;
    .new-img {
      width: 30vw;
    }
    .new-img:hover {
      width: 34vw;
    }
    h3 {
      font-size: 16px;
    }
    h6 {
      font-size: 10px;
      margin: auto 1.5vw;
    }
  }
}

@media only screen and (max-width: 500px) {
  .game-container li {
    margin: 4vw;
    padding: 0 2vw 2vw 2vw;
    .new-img {
      width: 40vw;
    }
    .new-img:hover {
      width: 46vw;
    }
    h3 {
      font-size: 15px;
    }
    h6 {
      font-size: 9px;
    }
  }
}

@media only screen and (max-width: 350px) {
  .game-container li {
    margin: 4vw;
    padding: 0 2.5vw 2.5vw 2.5vw;
    .new-img {
      width: 50vw;
    }
    .new-img:hover {
      width: 58vw;
    }
    h3 {
      font-size: 14px;
    }
    h6 {
      font-size: 8px;
    }
  }
}
</style>
