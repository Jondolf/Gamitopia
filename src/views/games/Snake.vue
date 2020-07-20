<template>
  <div id="snake">
    <GameHeader :game="snakeInfo" />

    <div class="game-container" ref="gameContainer">
      <StartMenu
        v-if="currentView === 'Start menu'"
        @gameArea="currentView = 'Game area'"
        @statistics="currentView = 'Statistics'"
        @settings="currentView = 'Settings'"
      />
      <GameArea
        v-if="currentView === 'Game area'"
        :resetGame="resetGame"
        :game="game"
        @startMenu="currentView = 'Start menu'"
        @toggleResetGame="resetGame = false"
      />
      <Statistics
        v-if="currentView === 'Statistics'"
        @startMenu="currentView = 'Start menu'"
      />
      <Settings
        v-if="currentView === 'Settings'"
        :game="game"
        @startMenu="currentView = 'Start menu'"
        @toggleFullscreen="fullscreenOn = !fullscreenOn"
        @smallBoard="changeBoardSize"
        @mediumBoard="changeBoardSize"
        @largeBoard="changeBoardSize"
      />
    </div>

    <GameDescription :game="snakeInfo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameHeader from '@/components/games/GameHeader.vue';
import GameDescription from '@/components/games/GameDescription.vue';

import StartMenu from '@/components/games/snake/StartMenu.vue';
const GameArea = () => import('@/components/games/snake/GameArea.vue');
const Statistics = () => import('@/components/games/snake/Statistics.vue');
const Settings = () => import('@/components/games/snake/Settings.vue');
import { Game } from '@/components/games/snake/gameLogic';

export default Vue.extend({
  name: 'snake',
  components: {
    GameHeader,
    GameDescription,
    StartMenu,
    GameArea,
    Statistics,
    Settings
  },
  data() {
    return {
      snakeInfo: this.$store.state.games.allGames.snake,

      currentView: 'Start menu',
      fullscreenOn: false,
      resetGame: false,
      game: new Game(
        {
          board: [
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
          wallColor: 'white',
          boardColor: 'black'
        },
        false,
        0,
        0,
        500,
        0,
        0,
        false,
        null as ((ev: KeyboardEvent) => void) | null
      )
    };
  },
  methods: {
    changeBoardSize(boardSize: string[], squareSize: number) {
      this.game.gameBoard.board = boardSize;
      this.game.graphics.squareSize = squareSize;
      this.resetGame = !this.resetGame;
    }
  },
  created() {
    if (localStorage.getItem('snakeSpeed')) {
      this.game.tickSpeed = +localStorage.getItem('snakeSpeed')!!;
    }
  },
  watch: {
    fullscreenOn: function() {
      const gameContainer = this.$refs.gameContainer as HTMLElement;
      if (this.fullscreenOn) {
        gameContainer.classList.add('fullscreen');
        gameContainer.classList.remove('game-container');
        document.body.style.overflow = 'hidden';
      } else if (!this.fullscreenOn) {
        gameContainer.classList.add('game-container');
        gameContainer.classList.remove('fullscreen');
        document.body.style.overflow = 'auto';
      }
    },
    currentView() {
      if (this.currentView !== 'Game area') {
        this.game.pauseGame();
      } else {
        //this.game.tick();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
#snake {
  padding-top: 66px;
}

.game-container button,
.fullscreen button {
  color: black;
}

.fullscreen {
  background-color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
  margin: auto;
  border: none;
  border-radius: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  overflow: hidden;
  color: white;
}

.game-container {
  width: 400px;
  height: 450px;
  margin: auto;
  border-radius: 5px;
  border: 2px solid black;
  overflow: hidden;
  background-color: black;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  color: white;
}

.dark.default-dark .game-container {
  border: 2px solid white;
}

@media only screen and (max-width: 550px) {
  .game-container {
    width: 350px;
    height: 400px;
  }
}
@media only screen and (max-width: 400px) {
  .game-container {
    width: 250px;
    height: 300px;
  }
}
</style>
