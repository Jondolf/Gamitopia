<template>
  <div id="grid-container" ref="appWidth">
    <TopBar
      @clicked="restartGame"
      @startMenuBtnClicked="toggleStartMenuVisibility"
    />

    <div id="grid" ref="grid">
      <VictoryScreen
        v-if="victory"
        v-bind:gameEndMessage="this.gameEndMessage"
        @clicked="restartGame"
      />
      <div v-for="(row, index) in grid" v-bind:key="index" id="row">
        <Square
          v-for="(square, index2) in row"
          v-on:click.native="addSymbol(square)"
          v-bind:grid="square.symbol"
          v-bind:key="index2"
          :squareSize="squareSize"
          :fontSize="fontSize"
        ></Square>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Square from "@/components/games/tic-tac-toe/square.vue";
import VictoryScreen from "@/components/games/tic-tac-toe/tic-tac-toe-victory-screen.vue";
import TopBar from "@/components/games/tic-tac-toe/top-bar.vue";

export interface SquareData {
  symbol: string;
}

export default Vue.extend({
  name: "Grid",
  components: {
    Square,
    VictoryScreen,
    TopBar
  },
  methods: {
    toggleStartMenuVisibility() {
      this.$emit("openStartMenuBtnClicked");
    },
    addSymbol(square: SquareData) {
      if (square.symbol === "" && this.player1Turn === true) {
        this.addCross(square);
        this.detectVictory();
        this.changeTurn();
      } else if (square.symbol === "" && this.player2Turn === true) {
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
      square.symbol = "X";
    },
    addNought: function(square: SquareData) {
      square.symbol = "O";
    },
    /*this.detectXVictory3x3();
      this.detectOVictory3x3();
      this.detectTie3x3();*/
    sequentialSymbols(symbols: SquareData[], count: number) {
      const result: [number, string, number] = symbols.reduce(
        (
          [counter, previousValue, maxSeqLength]: [number, string, number],
          currentSymbol: SquareData
        ) => {
          const newCounter =
            currentSymbol.symbol && currentSymbol.symbol === previousValue
              ? counter + 1
              : 1;
          const newPreviousValue = currentSymbol.symbol;
          const newMaxSeqLength = Math.max(maxSeqLength, newCounter);
          return [newCounter, newPreviousValue, newMaxSeqLength] as [
            number,
            string,
            number
          ];
        },
        [0, "", 0]
      );
      return count <= result[2];
    },
    detectVictory() {
      this.detectTie();
      const rows = this.grid;
      const reversedRows: SquareData[] = [...rows].reverse();
      const reversedDiagonalRows: SquareData[] = [];
      const columns: SquareData[] = [];
      const diagonalRows: SquareData[] = [];
      const getColumns = function() {
        for (let i = 0; i < rows[0].length; i++) {
          columns.push([]);
          for (let j = 0; j < rows.length; j++) {
            columns[i].push(rows[j][i]);
          }
        }
      };
      const getDiagonalRows = function(
        grid: SquareData[],
        gameEnd: Function,
        gridWidth: number,
        gridHeight: number
      ) {
        for (let i = -rows.length + 1; i < columns.length; i++) {
          const diagonalRow: SquareData[] = [];
          diagonalRows.push(diagonalRow);
          for (let j = 0; j < rows.length; j++) {
            if (j + i >= 0 && i + j < columns.length) {
              diagonalRow.push(rows[j][i + j]);
              console.log(diagonalRows);
            }
          }
        }
      };
      const getReversedDiagonalRows = function(
        grid: SquareData[],
        gameEnd: Function,
        gridWidth: number,
        gridHeight: number
      ) {
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
      getDiagonalRows(this.grid, this.gameEnd, this.gridWidth, this.gridHeight);
      getReversedDiagonalRows(
        this.grid,
        this.gameEnd,
        this.gridWidth,
        this.gridHeight
      );
      const symbolArrays = [
        ...rows,
        ...columns,
        ...diagonalRows,
        ...reversedDiagonalRows
      ];
      const ended = symbolArrays.some(
        squares =>
          this.sequentialSymbols(squares, this.amountOfSymbolsNeededInARowToWin) //Amount of symbols in a row needed to win
      );
      if (ended && this.player1Turn) {
        this.gameEnd("X");
      } else if (ended && this.player2Turn) {
        this.gameEnd("O");
      }
    },
    detectTie() {
      const hasEmptySquare =
        this.grid.filter(
          row => row.filter(square => square.symbol === "").length
        ).length === 0;
      if (hasEmptySquare) {
        this.gameEnd("Tie");
      }
    },

    gameEnd(condition: String) {
      this.victory = true;
      if (condition === "X") {
        this.gameEndMessage = "Player With X Wins!";
      } else if (condition === "O") {
        this.gameEndMessage = "Player With O Wins!";
      } else if (condition === "Tie") {
        this.gameEndMessage = "Tie";
      }
    },
    restartGame() {
      this.player1Turn = true;
      this.player2Turn = false;
      this.victory = false;
      this.gameEndMessage = "";
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[0].length; j++) {
          this.grid[i][j].symbol = "";
        }
      }
    },
    setGridSize() {
      this.grid = [];
      for (let i = 0; i < this.gridWidth; i++) {
        this.grid.push([]);
        for (let j = 0; j < this.gridHeight; j++) {
          const square = { symbol: "" };
          this.grid[i].push(square);
        }
      }
      this.getSquareSize();
      this.getFontSize();
      this.restartGame();
    },
    getSquareSize() {
      this.squareSize =
        (
          this.$refs.grid.clientWidth /
          Math.max(this.grid.length, this.grid[0].length)
        ).toString() + "px";
    },
    getFontSize() {
      this.fontSize =
        Math.floor(
          this.$refs.grid.clientWidth /
            Math.max(this.grid.length, this.grid[0].length) -
            20
        ).toString() + "px";
    }
  },
  data: function() {
    return {
      player1Turn: true,
      player2Turn: false,
      squareSize: "10vw",
      fontSize: "",
      victory: false,
      gameEndMessage: "",
      grid: [
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }]
      ]
    };
  },
  props: {
    gridWidth: Number,
    gridHeight: Number,
    amountOfSymbolsNeededInARowToWin: Number
  },
  watch: {
    gridWidth: function() {
      this.setGridSize();
    },
    gridHeight: function() {
      this.setGridSize();
    },
    amountOfSymbolsNeededInARowToWin: function() {
      this.setGridSize();
    }
  },
  created() {
    function setSquareSize() {
      this.setSquareSize();
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener("resize", this.getSquareSize);
      window.addEventListener("resize", this.getFontSize);
    });
    this.setGridSize();
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";

#grid-container {
  width: 75vw;
  height: 85vw;
  overflow: hidden;
  margin: auto;
  background-color: gray;
  display: flex;
  flex-direction: column;
}
.darkMode #grid-container {
  background-color: rgb(50, 50, 50);
}

#grid {
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
  touch-action: manipulation;
}

.darkMode #grid {
  color: white;
  border-color: white;
}
@media only screen and (min-width: 600px) {
  #grid-container {
    width: 45vw;
    height: 51vw;
  }
}

@media only screen and (min-width: 1100px) {
  #grid-container {
    width: 33vw;
    height: 37vw;
  }
}
</style>
