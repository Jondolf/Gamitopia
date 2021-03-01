<template>
  <div class="game">
    <TopBar @go-back="$emit('go-back')" @restart="restartGame" />

    <div class="game-container">
      <transition name="fade-height">
        <span v-if="!gameEnded" class="turn">{{
          turn === 1 ? 'Player 1 (X) turn' : againstAI ? 'AI (O) turn' : 'Player 2 (O) turn'
        }}</span>
      </transition>

      <div class="grid" ref="gridElement">
        <div v-for="(row, index) in grid" :key="index" :id="'row' + index" class="row">
          <Square
            v-for="(square, index2) in row"
            @click="onClickSquare({ x: index2, y: index })"
            :grid="square"
            :key="index + index2"
            :squareSize="squareSize"
            :fontSize="fontSize"
          ></Square>
        </div>
      </div>

      <GameEnded v-if="gameEnded" @restart="restartGame" :msg="gameEndMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import Square from './Square.vue';
import GameEnded from './GameEnded.vue';
import TopBar from './TopBar.vue';
import { useGrid } from '../composables/useGrid';
import { Coord } from '../types/coord';
import * as ai from '../tic-tac-toe-ai/pkg/tic_tac_toe_ai';

export default defineComponent({
  name: 'Game',

  components: {
    Square,
    GameEnded,
    TopBar
  },

  props: {
    againstAI: { type: Boolean, required: true },
    gridWidth: { type: Number, required: true },
    gridHeight: { type: Number, required: true },
    targetSymbolRowLength: { type: Number, required: true },
    aiStarts: { type: Boolean, required: true }
  },

  setup(props) {
    const turn = ref<1 | 2>(1);
    const squareSize = ref('10vw');
    const fontSize = ref('');
    const gameEnded = ref(false);
    const gameEndMessage = ref('');

    const { grid, gridElement, setGridSize, addSymbol, emptyGrid } = useGrid();

    const previousMove = ref<Coord>({ x: 0, y: 0 });

    function onClickSquare(coord: Coord) {
      if (grid.value[coord.y][coord.x] === ' ' && (turn.value === 1 || !props.againstAI)) {
        previousMove.value = coord;
        addSymbol(turn.value === 1 ? 'X' : 'O', { x: coord.x, y: coord.y });
        setTimeout(() => {
          checkGameEnded();
          if (!gameEnded.value) {
            changeTurn();
            if (props.againstAI) {
              playAITurn();
            }
          }
        }, 0);
      }
    }

    function playAITurn() {
      const { x, y } = ai.find_best_move(
        cloneValue(grid.value),
        cloneValue(previousMove.value),
        cloneValue(props.targetSymbolRowLength)
      );
      previousMove.value = { x, y };
      addSymbol('O', { x, y });
      setTimeout(() => {
        checkGameEnded();
        if (!gameEnded.value) {
          changeTurn();
        }
      }, 0);
    }

    function checkGameEnded() {
      setTimeout(() => {
        ai.check_game_state_js(
          cloneValue(grid.value),
          cloneValue(previousMove.value),
          cloneValue(props.targetSymbolRowLength)
        );
      }, 0);
      const result = ai.check_game_state_js(
        cloneValue(grid.value),
        cloneValue(previousMove.value),
        cloneValue(props.targetSymbolRowLength)
      );
      switch (result) {
        case 1:
          gameEnded.value = true;
          gameEndMessage.value = 'Player With X Wins!';
          break;
        case 2:
          gameEnded.value = true;
          gameEndMessage.value = 'Player With O Wins!';
          break;
        case 3:
          gameEnded.value = true;
          gameEndMessage.value = 'Tie';
      }
    }

    function changeTurn() {
      turn.value = turn.value === 1 ? 2 : 1;
    }

    function restartGame() {
      gameEnded.value = false;
      gameEndMessage.value = '';
      emptyGrid();
      if (props.againstAI && props.aiStarts) {
        turn.value = 2;
        setTimeout(() => {
          playAITurn();
        }, 300);
      } else {
        turn.value = 1;
      }
    }

    function setSquareSize() {
      if (gridElement.value) {
        squareSize.value =
          (
            Math.min(gridElement.value.clientWidth, gridElement.value.clientHeight) /
            Math.max(grid.value.length, grid.value[0].length)
          ).toString() + 'px';
      }
    }

    function setFontSize() {
      if (gridElement.value) {
        fontSize.value =
          Math.floor(
            Math.min(gridElement.value.clientWidth, gridElement.value.clientHeight) /
              Math.max(grid.value.length, grid.value[0].length) -
              20
          ).toString() + 'px';
      }
    }

    /** Copy a given value without reactiveness. */
    function cloneValue<T>(value: T): T {
      return JSON.parse(JSON.stringify(value));
    }

    watch(
      () => props.gridWidth,
      () => {
        setGridSize(props.gridWidth, props.gridHeight);
        setSquareSize();
        setFontSize();
      }
    );
    watch(
      () => props.gridHeight,
      () => {
        setGridSize(props.gridWidth, props.gridHeight);
        setSquareSize();
        setFontSize();
      }
    );

    onMounted(() => {
      window.addEventListener('resize', setSquareSize);
      window.addEventListener('resize', setFontSize);
      setGridSize(props.gridWidth, props.gridHeight);
      setSquareSize();
      setFontSize();
      if (props.againstAI && props.aiStarts) {
        turn.value = 2;
        setTimeout(() => {
          playAITurn();
        }, 300);
      }
    });

    onUnmounted(() => {
      window.removeEventListener('resize', setSquareSize);
      window.removeEventListener('resize', setFontSize);
    });

    return {
      turn,
      squareSize,
      fontSize,
      gameEnded,
      gameEndMessage,
      grid,
      gridElement,
      onClickSquare,
      addSymbol,
      restartGame
    };
  }
});
</script>

<style lang="scss" scoped>
.game {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: auto;
  background-color: white;
  display: flex;
  flex-direction: column;

  .game-container {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: gray;

    .fade-height-enter-active,
    .fade-height-leave-active {
      transition: 0.3s;
      max-height: 230px;
    }

    .fade-height-enter-from,
    .fade-height-leave-to {
      opacity: 0;
      max-height: 0px;
    }

    .turn {
      display: block;
      width: 100%;
      height: 40px;
      padding-top: 10px;
      color: white;
      text-align: center;
    }

    .grid {
      width: 100%;
      margin: auto;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 50px;
      bottom: 0;
      box-sizing: border-box;
      cursor: default;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
      transition: 0.3s;

      .row {
        display: flex;
      }
    }
  }
}

.dark .game {
  background-color: black;

  .game-container {
    background-color: rgb(50, 50, 50);
  }
}
</style>
