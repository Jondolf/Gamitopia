<template>
  <div class="tic-tac-toe-game">
    <StartMenu
      v-if="this.startMenuVisibility === true"
      @startMenuBtnClicked="this.toggleStartMenuVisibility"
      @activateThreeByThreeGrid="this.activateThreeByThreeGrid"
      @activateFourByFourGrid="this.activateFourByFourGrid"
      @gridWidthChanged="changeGridWidth"
      @gridHeightChanged="changeGridHeight"
      @rowToWinChanged="changeRowToWin"
      @toggleFullscreen="$emit('toggleFullscreen')"
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
</template>

<script lang="ts">
import Vue from 'vue';
import Grid from '@/components/games/tic-tac-toe/Grid.vue';
import StartMenu from '@/components/games/tic-tac-toe/StartMenu.vue';
export default Vue.extend({
  name: 'TicTacToeGame',

  components: {
    Grid,
    StartMenu
  },

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
      window.dispatchEvent(new Event('resize')); // Trigger grid resize
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
.tic-tac-toe-game {
  background-color: white;
  width: 100%;
  height: 100%;

  p,
  span,
  button,
  i,
  h1,
  h2,
  h3 {
    color: var(--color-light-contrast);
  }
}

.dark .tic-tac-toe-game {
  background-color: black;
}
</style>
