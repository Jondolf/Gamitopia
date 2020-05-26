<template>
  <div class="tic-tac-toe">
    <h2>Tic-Tac-Toe</h2>
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

    <GameDescription
      :game="$store.state.games.allGames.ticTacToe"
    ></GameDescription>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import GameDescription from '@/components/games/GameDescription.vue';
import Grid from '@/components/games/tic-tac-toe/grid.vue';
import StartMenu from '@/components/games/tic-tac-toe/start-menu.vue';
export default Vue.extend({
  name: 'tic-tac-toe',
  components: {
    GameDescription,
    Grid,
    StartMenu
  },
  props: {},
  data() {
    return {
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
.dark.default-dark .tic-tac-toe {
  h2 {
    color: white;
  }
}
.tic-tac-toe-container {
  background-color: black;
  color: white;
  border-color: white;
}
.tic-tac-toe {
  padding-top: 66px;

  .tic-tac-toe-container {
    width: 75vw;
    height: 85vw;
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

  h2 {
    margin: 30px;
    color: black;
  }

  .description {
    width: 70%;
    display: flex;
    background-color: var(--secondary-color);
    border-radius: 5px;
    margin: 50px auto;
    color: white;
    text-align: left;
    position: relative;
  }

  .description h3 {
    margin-bottom: 15px;
  }

  .mainDescription,
  .otherDescription {
    padding: 20px;
    list-style: none;
    box-sizing: border-box;
  }

  .mainDescription {
    width: 60%;
    border-right: 1px solid;
  }

  .otherDescription {
    width: 40%;
    height: 100%;
  }

  .otherDescription li {
    list-style: none;
  }

  .madeWith {
    padding: 20px;
    height: 100%;
  }

  .otherInfo {
    padding: 20px;
    height: 100%;
  }

  @media only screen and (max-width: 620px) {
    .description {
      flex-direction: column;
      padding: 10px;
    }
    .mainDescription {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid;
      padding: 20px;
    }
    .otherDescription {
      width: 100%;
      padding: 0;
    }
  }

  @media only screen and (max-width: 460px) {
    .description p {
      font-size: 14px;
    }
  }
}
</style>
