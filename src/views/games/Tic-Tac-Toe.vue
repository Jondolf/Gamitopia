<template>
  <div class="tic-tac-toe">
    <GameHeader :game="ticTacToeInfo" />

    <div class="tic-tac-toe-container">
      <StartMenu
        v-if="this.startMenuVisibility === true"
        @startMenuBtnClicked="this.toggleStartMenuVisibility"
        @activateThreeByThreeGrid="this.activateThreeByThreeGrid"
        @activateFourByFourGrid="this.activateFourByFourGrid"
        @gridWidthChanged="changeGridWidth"
        @gridHeightChanged="changeGridHeight"
        @rowToWinChanged="changeRowToWin"
      />
      <Grid
        @openStartMenuBtnClicked="this.toggleStartMenuVisibility"
        :threeByThreeGrid="this.threeByThreeGridActive"
        :fourByFourGrid="this.fourByFourGridActive"
        :gridWidth="gridWidth"
        :gridHeight="gridHeight"
        :amountOfSymbolsNeededInARowToWin="amountOfSymbolsNeededInARowToWin"
      />
    </div>

    <GameDescription :game="ticTacToeInfo" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameHeader from '@/components/games/GameHeader.vue';
import GameDescription from '@/components/games/GameDescription.vue';
import { GameInfo } from '../../interfaces/GameInfo';

import Grid from '@/components/games/tic-tac-toe/grid.vue';
import StartMenu from '@/components/games/tic-tac-toe/start-menu.vue';
export default Vue.extend({
  name: 'tic-tac-toe',

  components: {
    GameHeader,
    GameDescription,
    Grid,
    StartMenu
  },

  data() {
    return {
      ticTacToeInfo: this.$store.state.games.allGames.ticTacToe as GameInfo,

      startMenuVisibility: true,
      threeByThreeGridActive: true,
      fourByFourGridActive: false,
      gridWidth: 3,
      gridHeight: 3,
      amountOfSymbolsNeededInARowToWin: 3
    };
  },

  methods: {
    toggleStartMenuVisibility() {
      this.startMenuVisibility = !this.startMenuVisibility;
    },

    activateThreeByThreeGrid() {
      this.threeByThreeGridActive = true;
      this.fourByFourGridActive = false;
    },

    activateFourByFourGrid() {
      this.fourByFourGridActive = true;
      this.threeByThreeGridActive = false;
    },

    changeGridWidth(value: number) {
      this.gridWidth = value;
    },

    changeGridHeight(value: number) {
      this.gridHeight = value;
    },

    changeRowToWin(value: number) {
      this.amountOfSymbolsNeededInARowToWin = value;
    }
  }
});
</script>

<style lang="scss">
@import '@/global.scss';

.tic-tac-toe {
  padding-top: 66px;

  .tic-tac-toe-container {
    width: 75vw;
    height: 85vw;
    color: black;
    border: 2px solid black;
    border-radius: 5px;
    overflow: hidden;
    margin: auto;
    position: relative;
    cursor: default;
    p {
      color: black;
    }
  }

  @media only screen and (min-width: 600px) {
    .tic-tac-toe-container {
      width: 45vw;
      height: 51vw;
    }
  }

  @media only screen and (min-width: 1100px) {
    .tic-tac-toe-container {
      width: 33vw;
      height: 37vw;
    }
  }
}

.dark .tic-tac-toe-container {
  background-color: black;
  color: white;
  border: 2px solid white;
}
</style>
