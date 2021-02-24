<template>
  <div class="tic-tac-toe-game">
    <StartMenu
      v-if="currentView === 'Start menu'"
      @start-game="startGame"
      @open-instructions="currentView = 'Instructions'"
      @open-settings="currentView = 'Settings'"
      @grid-width-changed="(val) => (gridWidth = val)"
      @grid-height-changed="(val) => (gridHeight = val)"
      @row-to-win-changed="(val) => (amountOfSymbolsNeededInARowToWin = val)"
      @toggle-fullscreen="$emit('toggle-fullscreen')"
    />
    <Game
      v-else-if="currentView === 'Game'"
      @go-back="currentView = 'Start menu'"
      :againstAI="againstAI"
      :grid-width="gridWidth"
      :grid-height="gridHeight"
      :targetSymbolRowLength="targetSymbolRowLength"
      :aiStarts="aiStarts"
    />
    <Instructions v-if="currentView === 'Instructions'" @go-back="currentView = 'Start menu'" />
    <Settings
      v-else-if="currentView === 'Settings'"
      @go-back="currentView = 'Start menu'"
      @set-grid-width="(val) => (gridWidth = val)"
      @set-grid-height="(val) => (gridHeight = val)"
      @set-target-symbol-row-length="(val) => (targetSymbolRowLength = val)"
      @set-ai-starts="(val) => (aiStarts = val)"
      @toggle-fullscreen="$emit('toggle-fullscreen')"
      :gridWidthProp="gridWidth"
      :gridHeightProp="gridHeight"
      :targetSymbolRowLength="targetSymbolRowLength"
      :aiStarts="aiStarts"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import StartMenu from './components/StartMenu.vue';
import Game from './components/Game.vue';
import Instructions from './components/Instructions.vue';
import Settings from './components/Settings.vue';

export default defineComponent({
  name: 'TicTacToeGame',

  components: {
    StartMenu,
    Game,
    Instructions,
    Settings
  },

  setup() {
    const currentView = ref('Start menu');
    const againstAI = ref(false);
    const gridWidth = ref(3);
    const gridHeight = ref(3);
    const targetSymbolRowLength = ref(3);
    const aiStarts = ref(false);

    function startGame(ai: boolean) {
      againstAI.value = ai;
      currentView.value = 'Game';
    }

    return {
      currentView,
      againstAI,
      gridWidth,
      gridHeight,
      targetSymbolRowLength,
      aiStarts,
      startGame
    };
  }
});
</script>

<style lang="scss">
.tic-tac-toe-game {
  background-color: var(--color-light-contrast);
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

  h2 {
    width: 100%;
    padding: 20px 0;
    margin: 0;
    font-size: 26px;
    background-color: rgba(75, 75, 200, 0.5);
    border-bottom: 2px solid var(--color-light-contrast);
  }

  .view {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;
    background-color: white;
    color: var(--color-light-contrast);
    z-index: 2;
  }

  .menu-button {
    width: 100%;
    min-height: 100px;
    height: 150px;
    color: var(--color-light-contrast);
    background-color: transparent;
    font-size: 18px;
    font-weight: bold;
    outline: none;
    border: none;
    border-left: none;
    border-right: none;
    transition: 0.3s;
    &:hover {
      background-color: rgb(230, 230, 240);
    }
  }
}

.dark .tic-tac-toe-game {
  .view {
    background-color: black;
  }

  .menu-button:hover {
    background-color: rgb(15, 15, 20);
  }
}
</style>
