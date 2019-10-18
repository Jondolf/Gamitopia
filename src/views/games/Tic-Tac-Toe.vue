<template>
  <div id="tic-tac-toe">
    <h2>Tic-Tac-Toe</h2>
    <div id="tic-tac-toe-container">
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
    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Tic-Tac-Toe or Noughts and Crosses is a game where you put crosses
          (X's) or noughts (O's) onto a grid, traditionally a 3x3 grid.
          <br /><br />On a 3x3 grid your goal is to get 3 crosses/noughts in a
          horizontal, vertical or diagonal row. Whenever a player puts down a
          cross or a nought the turn switches and the other player gets to put
          down a cross or a nought. The player that succeeds wins the game. If
          all squares on the grid are filled and no-one has gotten a row of 3,
          the game will be a tie. <br /><br />For more information about the
          rules check out the instructions in the game itself.<br /><br />Currently
          you can only play the game locally against someone else.
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>HTML</li>
            <li>SCSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: yes</p>
          <br />
          <p>Fullscreen support: no</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Grid from "@/components/games/tic-tac-toe/grid.vue";
import StartMenu from "@/components/games/tic-tac-toe/start-menu.vue";
export default Vue.extend({
  name: "tic-tac-toe",
  components: {
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
    changeGridWidth(value) {
      this.gridWidth = value;
    },
    changeGridHeight(value) {
      this.gridHeight = value;
    },
    changeRowToWin(value) {
      this.amountOfSymbolsNeededInARowToWin = value;
    }
  }
});
</script>

<style lang="scss">
@import "@/global.scss";
#tic-tac-toe {
  padding-top: 66px;
}

#tic-tac-toe-container {
  width: 75vw;
  height: 85vw;
  border: 2px solid;
  border-radius: 5px;
  overflow: hidden;
  margin: auto;
  position: relative;
  cursor: default;
}

.darkMode #tic-tac-toe-container {
  background-color: black;
  color: white;
  border-color: white;
}
@media only screen and (min-width: 600px) {
  #tic-tac-toe-container {
    width: 45vw;
    height: 51vw;
  }
}

@media only screen and (min-width: 1100px) {
  #tic-tac-toe-container {
    width: 33vw;
    height: 37vw;
  }
}

h2 {
  margin: 30px;
}

#tic-tac-toe-container h2 {
  padding: 8%;
  margin: 0;
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
</style>
