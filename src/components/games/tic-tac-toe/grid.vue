<template>
  <div id="grid-container">
    <TicTacToeTopBar @clicked="restartGame" />
    <div id="grid">
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
import Square from "@/components/games/tic-tac-toe/tic-tac-toe-square.vue";
import VictoryScreen from "@/components/games/tic-tac-toe/tic-tac-toe-victory-screen.vue";
import TicTacToeTopBar from "@/components/games/tic-tac-toe/tic-tac-toe-top-bar.vue";

export interface SquareData {
  symbol: string;
}

export default Vue.extend({
  name: "Grid",
  components: {
    Square,
    VictoryScreen,
    TicTacToeTopBar
  },
  methods: {
    addSymbol(square: SquareData) {
      if (square.symbol === "" && this.player1Turn === true) {
        this.addCross(square);
        this.detectVictory();
        console.log("Cross");
        this.changeTurn();
      } else if (square.symbol === "" && this.player2Turn === true) {
        this.addNought(square);
        this.detectVictory();
        this.changeTurn();
        console.log("Not cross");
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
    detectVictory() {
      for (let i = 0; i < this.grid[0].length; i++) {
        if (
          this.grid[0][i].symbol === "X" &&
          this.grid[1][i].symbol === "X" &&
          this.grid[2][i].symbol === "X"
        ) {
          this.gameEnd("X");
        } else if (
          this.grid[i][0].symbol === "X" &&
          this.grid[i][1].symbol === "X" &&
          this.grid[i][2].symbol === "X"
        ) {
          this.gameEnd("X");
        }
      }
      if (
        this.grid[0][0].symbol === "X" &&
        this.grid[1][1].symbol === "X" &&
        this.grid[2][2].symbol === "X"
      ) {
        this.gameEnd("X");
      } else if (
        this.grid[0][2].symbol === "X" &&
        this.grid[1][1].symbol === "X" &&
        this.grid[2][0].symbol === "X"
      ) {
        this.gameEnd("X");
      }
      for (let i = 0; i < this.grid[0].length; i++) {
        if (
          this.grid[0][i].symbol === "O" &&
          this.grid[1][i].symbol === "O" &&
          this.grid[2][i].symbol === "O"
        ) {
          this.gameEnd("O");
        } else if (
          this.grid[i][0].symbol === "O" &&
          this.grid[i][1].symbol === "O" &&
          this.grid[i][2].symbol === "O"
        ) {
          this.gameEnd("O");
        }
      }
      if (
        this.grid[0][0].symbol === "O" &&
        this.grid[1][1].symbol === "O" &&
        this.grid[2][2].symbol === "O"
      ) {
        this.gameEnd("O");
      } else if (
        this.grid[0][2].symbol === "O" &&
        this.grid[1][1].symbol === "O" &&
        this.grid[2][0].symbol === "O"
      ) {
        this.gameEnd("O");
      }

      if (
        this.grid[0][0].symbol !== "" &&
        this.grid[0][1].symbol !== "" &&
        this.grid[0][2].symbol !== "" &&
        this.grid[1][0].symbol !== "" &&
        this.grid[1][1].symbol !== "" &&
        this.grid[1][2].symbol !== "" &&
        this.grid[2][0].symbol !== "" &&
        this.grid[2][1].symbol !== "" &&
        this.grid[2][2].symbol !== "" &&
        this.gameEndMessage === ""
      ) {
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
      this.grid = [
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }],
        [{ symbol: "" }, { symbol: "" }, { symbol: "" }]
      ];
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
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "@/global.scss";

#grid-container {
  width: 75vw;
  height: 80vw;
  border: 2px solid;
  border-radius: 5px;
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
</style>
