<template>
  <div class="snake-game">
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
      @toggleFullscreen="$emit('toggleFullscreen')"
      @smallBoard="changeBoardSize"
      @mediumBoard="changeBoardSize"
      @largeBoard="changeBoardSize"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StartMenu from '@/components/games/snake/StartMenu.vue';
const GameArea = () => import('@/components/games/snake/GameArea.vue');
const Statistics = () => import('@/components/games/snake/Statistics.vue');
const Settings = () => import('@/components/games/snake/Settings.vue');
import { Game } from '@/components/games/snake/gameLogic';

export default Vue.extend({
  name: 'SnakeGame',

  components: {
    StartMenu,
    GameArea,
    Statistics,
    Settings
  },

  data() {
    return {
      currentView: 'Start menu',
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
    currentView() {
      if (this.currentView !== 'Game area') {
        this.game.pauseGame();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
.snake-game {
  width: 100%;
  height: 100%;
}
</style>
