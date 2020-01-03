<template>
  <div class="start-menu">
    <h2>Home Menu</h2>
    <button v-on:click="this.toggleStartMenuVisibility">
      Start Game
    </button>
    <Instructions
      v-if="instructionsVisibility"
      @toggleInstructionsBtnClicked="toggleInstructionsVisibility"
    />
    <Settings
      v-if="this.settingsVisibility"
      @openSettingsBtnClicked="this.toggleSettingsVisibility"
      @gridWidthChanged="changeGridWidth"
      @gridHeightChanged="changeGridHeight"
      @rowToWinChanged="changeRowToWin"
      :symbolsNeededInARow="symbolsNeededInARow"
      :gridWidthProp="gridWidth"
      :gridHeightProp="gridHeight"
    />
    <button v-on:click="toggleInstructionsVisibility">Instructions</button>
    <button v-on:click="toggleSettingsVisibility">Settings</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Settings from '@/components/games/tic-tac-toe/settings.vue';
import Instructions from '@/components/games/tic-tac-toe/instructions.vue';
export default Vue.extend({
  name: 'Start-Menu',
  components: {
    Settings,
    Instructions
  },
  methods: {
    toggleStartMenuVisibility() {
      this.$emit('startMenuBtnClicked');
    },
    toggleSettingsVisibility() {
      this.settingsVisibility = !this.settingsVisibility;
    },
    toggleInstructionsVisibility() {
      this.instructionsVisibility = !this.instructionsVisibility;
    },
    changeGridWidth(value: string) {
      this.$emit('gridWidthChanged', +value);
      this.gridWidth = +value;
    },
    changeGridHeight(value: string) {
      this.$emit('gridHeightChanged', +value);
      this.gridHeight = +value;
    },
    changeRowToWin(value: string) {
      this.$emit('rowToWinChanged', +value);
      this.symbolsNeededInARow = +value;
    }
  },
  data: function() {
    return {
      startMenuVisibility: true,
      settingsVisibility: false,
      instructionsVisibility: false,
      symbolsNeededInARow: 3,
      gridWidth: 3,
      gridHeight: 3
    };
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import '@/global.scss';
.start-menu {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;
  button {
    width: 100%;
    height: 20%;
    color: white;
    font-size: 16px;
    outline: none;
    border: 1px solid black;
    border-left: none;
    border-right: none;
    background-color: rgba(34, 40, 49, 0.5);
    transition: 0.4s;
  }

  button:hover {
    background-color: rgb(91, 97, 112);
  }
}
.darkMode .start-menu {
  background-color: black;
}
.darkMode button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
}
.darkMode button:hover {
  background-color: rgb(50, 57, 68);
}
</style>
