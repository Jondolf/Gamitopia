<template>
  <div class="grid-container">
    <TopBar @clicked="restartGame" @start-menu-btn-clicked="toggleStartMenuVisibility" />

    <div class="grid" ref="gridElement">
      <GameEnded v-if="gameEnded" @restart="restartGame" :msg="gameEndMessage" />
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
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import Square from './Square.vue';
import GameEnded from './GameEnded.vue';
import TopBar from './TopBar.vue';
import { useGrid } from '../composables/useGrid';
import { useGameEndDetection } from '../composables/useGameEndDetection';
import { Coord } from '../types/coord';

type Square = '' | 'X' | 'O';

export default defineComponent({
  name: 'Grid',

  components: {
    Square,
    GameEnded,
    TopBar
  },

  props: {
    gridWidth: { type: Number, required: true },
    gridHeight: { type: Number, required: true },
    amountOfSymbolsNeededInARowToWin: { type: Number, required: true }
  },

  setup(props, { emit }) {
    const turn = ref<1 | 2>(1);
    const isFirstMove = ref(true);
    const squareSize = ref('10vw');
    const fontSize = ref('');
    const gameEnded = ref(false);
    const gameEndMessage = ref('');
    const targetSymbolRowLength = computed(() => props.amountOfSymbolsNeededInARowToWin);

    const { grid, gridElement, addSymbol } = useGrid();
    const { result } = useGameEndDetection(turn, grid, targetSymbolRowLength);

    function toggleStartMenuVisibility() {
      emit('open-start-menu-btn-clicked');
    }

    function onClickSquare(coord: Coord) {
      if (grid.value[coord.y][coord.x] === '') {
        addSymbol(turn.value === 1 ? 'X' : 'O', { x: coord.x, y: coord.y });
        changeTurn();
      }
    }

    function changeTurn() {
      turn.value = turn.value === 1 ? 2 : 1;
    }

    function restartGame() {
      turn.value = 1;
      gameEnded.value = false;
      gameEndMessage.value = '';
      for (let i = 0; i < grid.value.length; i++) {
        for (let j = 0; j < grid.value[0].length; j++) {
          grid.value[i][j] = '';
        }
      }
      isFirstMove.value = true;
    }

    function setGridSize() {
      grid.value = [];
      for (let i = 0; i < props.gridHeight; i++) {
        grid.value.push([]);
        for (let j = 0; j < props.gridWidth; j++) {
          grid.value[i].push('');
        }
      }
      setSquareSize();
      setFontSize();
      restartGame();
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

    watch(() => props.gridWidth, setGridSize);
    watch(() => props.gridHeight, setGridSize);
    watch(() => props.amountOfSymbolsNeededInARowToWin, setGridSize);
    watch(result, () => {
      switch (result.value) {
        case 'X':
          gameEnded.value = true;
          gameEndMessage.value = 'Player With X Wins!';
          break;
        case 'O':
          gameEnded.value = true;
          gameEndMessage.value = 'Player With O Wins!';
          break;
        case 'Tie':
          gameEnded.value = true;
          gameEndMessage.value = 'Tie';
      }
    });

    onMounted(() => {
      window.addEventListener('resize', setSquareSize);
      window.addEventListener('resize', setFontSize);
      setGridSize();
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
      toggleStartMenuVisibility,
      onClickSquare,
      addSymbol,
      restartGame
    };
  }
});
</script>

<style lang="scss" scoped>
.grid-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  margin: auto;
  background-color: gray;
  display: flex;
  flex-direction: column;

  .grid {
    height: 100%;
    width: 100%;
    margin: auto;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #0c0f14;
    position: relative;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    .row {
      display: flex;
    }
  }
}

.dark.default-dark .grid-container {
  background-color: rgb(50, 50, 50);

  .grid {
    color: white;
    border-color: white;
  }
}
</style>
