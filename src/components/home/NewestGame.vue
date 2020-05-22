<template>
  <div class="newest-game">
    <h2>Newest Game</h2>
    <span>{{ newestGame.name }}</span>
    <router-link :to="newestGame.route">
      <img
        :src="newestGame.thumbnailImgSrc"
        :alt="newestGame.thumbnailImgAlt"
      />
    </router-link>
    <time>{{ newestGame.releaseDate }}</time>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  name: 'NewestGame',

  data() {
    return {
      newestGame: this.$store.state.games.games[0]
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.newest-game {
  background-color: var(--secondary-color);
  text-align: center;
  padding: 20px;
  color: white;

  h2 {
    margin: 65px auto 20px auto;
    font-size: 35px;
  }
  span {
    margin: 20px auto 10px auto;
    font-size: 18px;
  }

  img {
    width: 28vw;
    border-radius: 5px;
    margin: 25px;
    transition: 1s;
    &:hover {
      width: 33vw;
    }
  }

  time {
    font-size: 12px;
  }

  span,
  time {
    display: block;
  }
}

@media only screen and (max-width: 700px) {
  .newest-game {
    img {
      width: 38vw;
      &:hover {
        width: 44vw;
      }
    }
    span {
      font-size: 16px;
    }
    time {
      font-size: 10px;
      margin: auto 1.5vw;
    }
  }
}

@media only screen and (max-width: 500px) {
  .newest-game {
    img {
      width: 48vw;
      &:hover {
        width: 55vw;
      }
    }
    span {
      font-size: 15px;
    }
    time {
      font-size: 9px;
    }
  }
}

@media only screen and (max-width: 350px) {
  .newest-game {
    img {
      width: 58vw;
      &:hover {
        width: 66vw;
      }
    }
    span {
      font-size: 14px;
    }
    time {
      font-size: 8px;
    }
  }
}
</style>
