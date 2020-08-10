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
      v-else-if="currentView === 'Game area'"
      :resetGame="resetGame"
      :game="game"
      @go-back="currentView = 'Start menu'"
      @toggle-reset-game="resetGame = false"
      @change-snake-direction="changeSnakeDirection"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, reactive } from 'vue';
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

  setup() {
    const currentView = ref('Start menu');
    const resetGame = ref(false);
    const game = reactive(
      new Game(
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
    );

    function changeCurrentView(newView: string) {
      currentView.value = newView;
    }

    function changeSnakeDirection(newDirection: string) {
      game.snake.facing = newDirection;
    }

    function changeBoardSize(newBoard: string[], newSquareSize: number) {
      game.gameBoard.board = newBoard;
      game.graphics.squareSize = newSquareSize;
      resetGame.value = !resetGame.value;
    }

    function changeTickSpeed(newSpeed: number) {
      game.tickSpeed = newSpeed;
    }

    if (localStorage.getItem('snakeSpeed')) {
      game.tickSpeed = +localStorage.getItem('snakeSpeed')!!;
    }

    watch(currentView, (currentView) => {
      if (currentView !== 'Game area') {
        game.pauseGame();
      }
    });

    return {
      currentView,
      resetGame,
      game,
      changeCurrentView,
      changeSnakeDirection,
      changeBoardSize,
      changeTickSpeed
    };
  }
});
</script>

<style lang="scss" scoped>
.snake-game {
  width: 100%;
  height: 100%;
}
</style>
