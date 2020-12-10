<template>
  <div class="grid-container">
    <TopBar @clicked="restartGame" @start-menu-btn-clicked="toggleStartMenuVisibility" />

    <div class="grid" ref="grid">
      <VictoryScreen v-if="victory" @restart="restartGame" :gameEndMessage="this.gameEndMessage" />
      <div v-for="(row, index) in grid" :key="index" :id="'row' + index">
        <Square
          v-for="(square, index2) in row"
          @click="addSymbol(square)"
          :grid="square.symbol"
          :key="index2"
          :squareSize="squareSize"
          :fontSize="fontSize"
        ></Square>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Square from './Square.vue';
import VictoryScreen from './TicTacToeVictoryScreen.vue';
import TopBar from './TopBar.vue';

export interface SquareData {
  symbol: string;
}

export default defineComponent({
  name: 'Grid',

  components: {
    Square,
    VictoryScreen,
    TopBar
  },

  props: {
    gridWidth: { type: Number, required: true },
    gridHeight: { type: Number, required: true },
    amountOfSymbolsNeededInARowToWin: { type: Number, required: true }
  },

  data() {
    return {
      player1Turn: true,
      player2Turn: false,
      squareSize: '10vw',
      fontSize: '',
      victory: false,
      gameEndMessage: '',
      grid: [
        [{ symbol: '' }, { symbol: '' }, { symbol: '' }],
        [{ symbol: '' }, { symbol: '' }, { symbol: '' }],
        [{ symbol: '' }, { symbol: '' }, { symbol: '' }]
      ]
    };
  },

  methods: {
    toggleStartMenuVisibility() {
      this.$emit('open-start-menu-btn-clicked');
    },

    addSymbol(square: SquareData) {
      if (square.symbol === '' && this.player1Turn === true) {
        this.addCross(square);
        this.detectVictory();
        this.changeTurn();
      } else if (square.symbol === '' && this.player2Turn === true) {
        this.addNought(square);
        this.detectVictory();
        this.changeTurn();
      }
    },

    changeTurn() {
      this.player1Turn = !this.player1Turn;
      this.player2Turn = !this.player2Turn;
    },

    addCross: function(square: SquareData) {
      square.symbol = 'X';
    },

    addNought: function(square: SquareData) {
      square.symbol = 'O';
    },

    sequentialSymbols(symbols: SquareData[], count: number) {
      const result: [number, string, number] = symbols.reduce(
        ([counter, previousValue, maxSeqLength]: [number, string, number], currentSymbol: SquareData) => {
          const newCounter = currentSymbol.symbol && currentSymbol.symbol === previousValue ? counter + 1 : 1;
          const newPreviousValue = currentSymbol.symbol;
          const newMaxSeqLength = Math.max(maxSeqLength, newCounter);
          return [newCounter, newPreviousValue, newMaxSeqLength] as [number, string, number];
        },
        [0, '', 0]
      );
      return count <= result[2];
    },

    detectVictory() {
      this.detectTie();
      const rows = this.grid;
      const reversedRows: any = [...rows].reverse();
      const reversedDiagonalRows: any = [];
      const columns: any = [];
      const diagonalRows: SquareData[] = [];
      const getColumns = function() {
        for (let i = 0; i < rows[0].length; i++) {
          columns.push([]);
          for (let j = 0; j < rows.length; j++) {
            columns[i].push(rows[j][i]);
          }
        }
      };
      const getDiagonalRows = () => {
        for (let i = -rows.length + 1; i < columns.length; i++) {
          const diagonalRow: any = [];
          diagonalRows.push(diagonalRow);
          for (let j = 0; j < rows.length; j++) {
            if (j + i >= 0 && i + j < columns.length) {
              diagonalRow.push(rows[j][i + j]);
            }
          }
        }
      };
      const getReversedDiagonalRows = () => {
        for (let i = -rows.length + 1; i < columns.length; i++) {
          const diagonalRow: SquareData[] = [];
          reversedDiagonalRows.push(diagonalRow);
          for (let j = 0; j < reversedRows.length; j++) {
            if (j + i >= 0 && i + j < columns.length) {
              diagonalRow.push(reversedRows[j][i + j]);
            }
          }
        }
      };
      getColumns();
      getDiagonalRows();
      getReversedDiagonalRows();
      const symbolArrays = [...rows, ...columns, ...diagonalRows, ...reversedDiagonalRows];
      const ended = symbolArrays.some(
        (squares) => this.sequentialSymbols(squares, this.amountOfSymbolsNeededInARowToWin) //Amount of symbols in a row needed to win
      );
      if (ended && this.player1Turn) {
        this.gameEnd('X');
      } else if (ended && this.player2Turn) {
        this.gameEnd('O');
      }
    },

    detectTie() {
      const hasEmptySquare =
        this.grid.filter((row) => row.filter((square) => square.symbol === '').length).length === 0;
      if (hasEmptySquare) {
        this.gameEnd('Tie');
      }
    },

    gameEnd(condition: string) {
      this.victory = true;
      if (condition === 'X') {
        this.gameEndMessage = 'Player With X Wins!';
      } else if (condition === 'O') {
        this.gameEndMessage = 'Player With O Wins!';
      } else if (condition === 'Tie') {
        this.gameEndMessage = 'Tie';
      }
    },

    restartGame() {
      this.player1Turn = true;
      this.player2Turn = false;
      this.victory = false;
      this.gameEndMessage = '';
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          this.grid[i][j].symbol = '';
        }
      }
    },

    setGridSize() {
      this.grid = [];
      for (let i = 0; i < this.gridWidth; i++) {
        this.grid.push([]);
        for (let j = 0; j < this.gridHeight; j++) {
          const square = { symbol: '' };
          this.grid[i].push(square);
        }
      }
      this.getSquareSize();
      this.getFontSize();
      this.restartGame();
    },

    getSquareSize() {
      const gridElement = this.$refs.grid as HTMLElement;
      this.squareSize =
        (
          Math.min(gridElement.clientWidth, gridElement.clientHeight) / Math.max(this.grid.length, this.grid[0].length)
        ).toString() + 'px';
    },

    getFontSize() {
      const gridElement = this.$refs.grid as HTMLElement;
      this.fontSize =
        Math.floor(
          Math.min(gridElement.clientWidth, gridElement.clientHeight) /
            Math.max(this.grid.length, this.grid[0].length) -
            20
        ).toString() + 'px';
    }
  },

  watch: {
    gridWidth() {
      this.setGridSize();
    },

    gridHeight() {
      this.setGridSize();
    },

    amountOfSymbolsNeededInARowToWin() {
      this.setGridSize();
    }
  },

  mounted() {
    window.addEventListener('resize', this.getSquareSize);
    window.addEventListener('resize', this.getFontSize);
    this.setGridSize();
  },

  unmounted() {
    window.removeEventListener('resize', this.getSquareSize);
    window.removeEventListener('resize', this.getFontSize);
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
    justify-content: center;
    align-items: center;
    display: flex;
    color: #0c0f14;
    position: relative;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
