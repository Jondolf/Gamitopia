<template>
  <div class="snake-game">
    <StartMenu
      v-if="currentView === 'Start menu'"
      @change-current-view="changeCurrentView"
    />
    <Statistics
      v-else-if="currentView === 'Statistics'"
      @change-current-view="changeCurrentView"
    />
    <Settings
      v-else-if="currentView === 'Settings'"
      :game="game"
      @change-current-view="changeCurrentView"
      @toggle-fullscreen="$emit('toggle-fullscreen')"
      @small-board="changeBoardSize"
      @medium-board="changeBoardSize"
      @large-board="changeBoardSize"
      @change-tick-speed="changeTickSpeed"
    />
    <GameArea
      :resetGame="resetGame"
      :game="game"
      @go-back="currentView = 'Start menu'"
      @toggle-reset-game="resetGame = false"
      @change-snake-direction="changeSnakeDirection"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import StartMenu from './StartMenu.vue';
import GameArea from './GameArea.vue';
import Statistics from './Statistics.vue';
import Settings from './Settings.vue';
import { Game } from './gameLogic';

export default defineComponent({
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
    changeCurrentView(newView: string) {
      this.currentView = newView;
    },

    changeSnakeDirection(newDirection: string) {
      this.game.snake.facing = newDirection;
    },

    changeBoardSize(newBoard: string[], newSquareSize: number) {
      this.game.gameBoard.board = newBoard;
      this.game.graphics.squareSize = newSquareSize;
      this.resetGame = !this.resetGame;
    },

    changeTickSpeed(newSpeed: number) {
      this.game.tickSpeed = newSpeed;
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
