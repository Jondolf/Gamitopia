<template>
  <div class="start-menu">
    <h2>Home Menu</h2>
    <button @click="this.toggleStartMenuVisibility">
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
    <button @click="toggleInstructionsVisibility">Instructions</button>
    <button @click="toggleSettingsVisibility">Settings</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Settings from '@/components/games/tic-tac-toe/Settings.vue';
import Instructions from '@/components/games/tic-tac-toe/Instructions.vue';

export default Vue.extend({
  name: 'StartMenu',

  components: {
    Settings,
    Instructions
  },

  data() {
    return {
      startMenuVisibility: true,
      settingsVisibility: false,
      instructionsVisibility: false,
      symbolsNeededInARow: 3,
      gridWidth: 3,
      gridHeight: 3
    };
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
  }
});
</script>

<style lang="scss" scoped>
.start-menu {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 2;

  h2 {
    margin: 15px 0;
  }

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
    &:hover {
      background-color: rgb(91, 97, 112);
    }
  }
}

.dark .start-menu {
  background-color: black;
}

.dark button {
  background-color: rgb(36, 41, 49);
  color: white;
  border-color: white;
  &:hover {
    background-color: rgb(50, 57, 68);
  }
}
</style>
