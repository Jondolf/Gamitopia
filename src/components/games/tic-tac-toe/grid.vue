<template>
  <div id="grid-container">
    <TopBar
      @clicked="restartGame"
      @startMenuBtnClicked="toggleStartMenuVisibility"
    />
    <div
      id="grid"
      v-bind:class="{
        threeByThreeGrid: threeByThreeGrid,
        fourByFourGrid: fourByFourGrid
      }"
    >
      <VictoryScreen
        v-if="victory"
        v-bind:gameEndMessage="this.gameEndMessage"
        @clicked="restartGame"
      />
      <div v-for="(row, index) in grid" v-bind:key="index">
        <Square
          v-for="(square, index2) in row"
          v-on:click.native="addSymbol(square)"
          v-bind:grid="square.symbol"
          v-bind:key="index2"
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
      const columns: any = [];
      const diagonalRows: any = [];
      const getColumns = function() {
        for (let i = 0; i < rows.length; i++) {
          columns.push([]);
          for (let j = 0; j < rows.length; j++) {
            columns[i].push(rows[j][i]);
          }
        }
      };
      const getDiagonalRows = function(
        grid: any,
        threeByThreeGrid: boolean,
        fourByFourGrid: boolean,
        gameEnd: Function
      ) {
        if (
          (grid[0][0].symbol === "X" &&
            grid[1][1].symbol === "X" &&
            grid[2][2].symbol === "X" &&
            threeByThreeGrid) ||
          (grid[2][0].symbol === "X" &&
            grid[1][1].symbol === "X" &&
            grid[0][2].symbol === "X" &&
            threeByThreeGrid)
        ) {
          gameEnd("X");
        } else if (
          (grid[0][0].symbol === "O" &&
            grid[1][1].symbol === "O" &&
            grid[2][2].symbol === "O" &&
            threeByThreeGrid) ||
          (grid[2][0].symbol === "O" &&
            grid[1][1].symbol === "O" &&
            grid[0][2].symbol === "O" &&
            threeByThreeGrid)
        ) {
          gameEnd("O");
        } else if (fourByFourGrid) {
          if (
            (grid[1][0].symbol === "X" &&
              grid[2][1].symbol === "X" &&
              grid[3][2].symbol === "X" &&
              fourByFourGrid) ||
            (grid[0][0].symbol === "X" &&
              grid[1][1].symbol === "X" &&
              grid[2][2].symbol === "X" &&
              fourByFourGrid) ||
            (grid[0][1].symbol === "X" &&
              grid[1][2].symbol === "X" &&
              grid[2][3].symbol === "X" &&
              fourByFourGrid) ||
            (grid[2][0].symbol === "X" &&
              grid[1][1].symbol === "X" &&
              grid[0][2].symbol === "X" &&
              fourByFourGrid) ||
            (grid[3][0].symbol === "X" &&
              grid[2][1].symbol === "X" &&
              grid[1][2].symbol === "X" &&
              fourByFourGrid) ||
            (grid[3][2].symbol === "X" &&
              grid[2][1].symbol === "X" &&
              grid[1][0].symbol === "X" &&
              fourByFourGrid) ||
            (grid[3][3].symbol === "X" &&
              grid[2][2].symbol === "X" &&
              grid[1][1].symbol === "X" &&
              fourByFourGrid) ||
            (grid[1][3].symbol === "X" &&
              grid[2][2].symbol === "X" &&
              grid[3][1].symbol === "X" &&
              fourByFourGrid) ||
            (grid[0][3].symbol === "X" &&
              grid[1][2].symbol === "X" &&
              grid[2][1].symbol === "X" &&
              fourByFourGrid)
          ) {
            gameEnd("X");
          }

          if (
            (grid[1][0].symbol === "O" &&
              grid[2][1].symbol === "O" &&
              grid[3][2].symbol === "O" &&
              fourByFourGrid) ||
            (grid[0][0].symbol === "O" &&
              grid[1][1].symbol === "O" &&
              grid[2][2].symbol === "O" &&
              fourByFourGrid) ||
            (grid[0][1].symbol === "O" &&
              grid[1][2].symbol === "O" &&
              grid[2][3].symbol === "O" &&
              fourByFourGrid) ||
            (grid[2][0].symbol === "O" &&
              grid[1][1].symbol === "O" &&
              grid[0][2].symbol === "O" &&
              fourByFourGrid) ||
            (grid[3][0].symbol === "O" &&
              grid[2][1].symbol === "O" &&
              grid[1][2].symbol === "O" &&
              fourByFourGrid) ||
            (grid[3][2].symbol === "O" &&
              grid[2][1].symbol === "O" &&
              grid[1][0].symbol === "O" &&
              fourByFourGrid) ||
            (grid[3][3].symbol === "O" &&
              grid[2][2].symbol === "O" &&
              grid[1][1].symbol === "O" &&
              fourByFourGrid) ||
            (grid[1][3].symbol === "O" &&
              grid[2][2].symbol === "O" &&
              grid[3][1].symbol === "O" &&
              fourByFourGrid) ||
            (grid[0][3].symbol === "O" &&
              grid[1][2].symbol === "O" &&
              grid[2][1].symbol === "O" &&
              fourByFourGrid)
          ) {
            gameEnd("O");
          }
        }

        /*for (let i = 0; i < rows.length; i++) {
          diagonalRows.push([]);
          for (let j = 0; j < rows.length; j++) {
            diagonalRows[i].push(rows[i][i]);
          }
        }*/
      };
      getColumns();
      getDiagonalRows(
        this.grid,
        this.threeByThreeGrid,
        this.fourByFourGrid,
        this.gameEnd
      );
      const symbolArrays = [...rows, ...columns, ...diagonalRows];
      const ended = symbolArrays.some(squares =>
        this.sequentialSymbols(squares, 3)
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
      if (this.fourByFourGrid === true) {
        this.grid = [
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }, { symbol: "" }],
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }, { symbol: "" }],
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }, { symbol: "" }],
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }, { symbol: "" }]
        ];
      }
      if (this.threeByThreeGrid === true) {
        this.grid = [
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
          [{ symbol: "" }, { symbol: "" }, { symbol: "" }]
        ];
      }
    }
  },
  data: function() {
    return {
      player1Turn: true,
      player2Turn: false,
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
    threeByThreeGrid: Boolean,
    fourByFourGrid: Boolean
  },
  watch: {
    threeByThreeGrid: function() {
      this.restartGame();
    }
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";

#grid-container {
  width: 75vw;
  height: 80vw;
  overflow: hidden;
  margin: auto;
}

#grid {
  margin: auto;
  overflow: hidden;
  width: 75vw;
  height: 75vw;
  display: flex;
  flex-wrap: wrap;
  background-color: white;
  color: black;
  background-color: white;
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
  background-color: black;
  color: white;
  border-color: white;
}
@media only screen and (min-width: 600px) {
  #grid-container {
    width: 45vw;
    height: 50vw;
  }
  #grid {
    width: 45vw;
    height: 45vw;
  }
}

@media only screen and (min-width: 1100px) {
  #grid-container {
    width: 30vw;
    height: 35vw;
  }
  #grid {
    width: 30vw;
    height: 30vw;
  }
}
.fourByFourGrid div .grid-square {
  width: 18.75vw;
  height: 18.75vw;
  @media only screen and (min-width: 600px) {
    width: 11.25vw;
    height: 11.25vw;
  }
  @media only screen and (min-width: 1100px) {
    width: 7.5vw;
    height: 7.5vw;
  }
}
</style>
