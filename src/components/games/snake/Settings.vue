<template>
  <div id="settings">
    <h2>Settings</h2>
    <div class="button-container">
      <button v-on:click="changeView('startMenu')">Go back</button>
      <button v-on:click="toggleFullscreen()">Toggle fullscreen</button>
      <h3>Board size</h3>
      <h6>(Changing the board size resets your game)</h6>
      <div class="board-size-modifier-container">
        <button v-on:click="changeBoardSize('small')">Small</button>
        <button v-on:click="changeBoardSize('medium')">Medium</button>
        <button v-on:click="changeBoardSize('large')">Large</button>
      </div>
      <h3>Snake speed</h3>
      <div class="speed-modifier-container">
        <button v-on:click="tickSpeed += 100">-</button>
        <p>{{ speed }}</p>
        <button v-on:click="tickSpeed -= 100">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { game } from './gameLogic';

export default Vue.extend({
  name: 'Settings',
  data() {
    return {
      smallBoard: [
        // 15x15
        '###############',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '###############'
      ],

      mediumBoard: [
        // 30x30
        '##############################',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#            ####            #',
        '#            ####            #',
        '#            ####            #',
        '#            ####            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '##############################'
      ],

      largeBoard: [
        // 50x50
        '##################################################',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '##################################################'
      ],
      tickSpeed: 500,
      speed: 5
    };
  },
  methods: {
    changeView(view: string) {
      this.$emit(view);
    },
    changeBoardSize(size: string) {
      if (size === 'small') {
        this.$emit(
          size + 'Board',
          this.smallBoard,
          450 / this.smallBoard[0].length
        );
      } else if (size === 'medium') {
        this.$emit(
          size + 'Board',
          this.mediumBoard,
          450 / this.mediumBoard[0].length
        );
      } else if (size === 'large') {
        this.$emit(
          size + 'Board',
          this.largeBoard,
          450 / this.largeBoard[0].length
        );
      }
    },
    toggleFullscreen() {
      this.$emit('toggleFullscreen');
      console.log('emitted');
    }
  },
  created() {
    if (localStorage.getItem('snakeSpeed')) {
      this.speed = (1000 - +localStorage.getItem('snakeSpeed')!!) / 100;
    } else {
      this.speed = (1000 - game.tickSpeed) / 100;
    }
  },
  watch: {
    tickSpeed() {
      if (this.tickSpeed > -100 && this.tickSpeed < 1000) {
        game.tickSpeed = this.tickSpeed;
        this.speed = (1000 - this.tickSpeed) / 100;
      } else {
        this.tickSpeed = game.tickSpeed;
      }
      localStorage.setItem('snakeSpeed', JSON.stringify(this.tickSpeed));
    }
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
#settings {
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: auto;
  h2 {
    margin: 0;
    padding: 15px;
  }
  .button-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto;
    button {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      font-weight: bold;
      outline: none;
      border: none;
      margin: 15px auto;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      transition: 0.4s;
    }
    button:hover {
      background-color: rgba(255, 255, 255, 1);
    }
    .board-size-modifier-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        height: 40px;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
      }
    }
    .speed-modifier-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        padding: 0;
      }
      p {
        width: 25px;
      }
    }
  }
}
</style>
