<template>
  <div class="settings">
    <h2>Settings</h2>
    <div class="button-container">
      <button @click="$emit('change-current-view', 'Start menu')">
        Go back
      </button>
      <button @click="$emit('toggle-fullscreen')">Toggle fullscreen</button>
      <h3>Board size</h3>
      <h6>(Changing the board size resets your game)</h6>
      <div class="board-size-modifier-container">
        <button @click="changeBoardSize('small')">Small</button>
        <button @click="changeBoardSize('medium')">Medium</button>
        <button @click="changeBoardSize('large')">Large</button>
      </div>
      <h3>Snake speed</h3>
      <div class="speed-modifier-container">
        <button @click="tickSpeed += 100">-</button>
        <p>{{ speed }}</p>
        <button @click="tickSpeed -= 100">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch } from 'vue';
import { Game } from './gameLogic';

export default defineComponent({
  name: 'Settings',

  props: {
    game: { type: Game, required: true }
  },

  setup(props, { emit }) {
    const boards = reactive({
      smallBoard: [
        // 15x15
        '###############',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '#             #',
        '###############'
      ],

      mediumBoard: [
        // 30x30
        '##############################',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#            ####            #',
        '#            ####            #',
        '#            ####            #',
        '#            ####            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '#                            #',
        '##############################'
      ],

      largeBoard: [
        // 50x50
        '##################################################',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                     ######                     #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '#                                                #',
        '##################################################'
      ]
    });
    const tickSpeed = ref(500);
    const speed = ref(5);

    if (localStorage.getItem('snakeSpeed')) {
      speed.value =
        (1000 - +JSON.parse(localStorage.getItem('snakeSpeed')!)) / 100;
    } else {
      speed.value = (1000 - props.game.tickSpeed) / 100;
    }

    function changeView(view: string) {
      emit(view);
    }

    function changeBoardSize(size: string) {
      if (size === 'small') {
        emit(
          size + '-board',
          boards.smallBoard,
          450 / boards.smallBoard[0].length
        );
      } else if (size === 'medium') {
        emit(
          size + '-board',
          boards.mediumBoard,
          450 / boards.mediumBoard[0].length
        );
      } else if (size === 'large') {
        emit(
          size + '-board',
          boards.largeBoard,
          450 / boards.largeBoard[0].length
        );
      }
    }

    watch(tickSpeed, (tickSpeed) => {
      if (tickSpeed > -100 && tickSpeed < 1000) {
        emit('change-tick-speed', tickSpeed);
        speed.value = (1000 - tickSpeed) / 100;
      } else {
        tickSpeed = props.game.tickSpeed;
      }
      localStorage.setItem('snakeSpeed', JSON.stringify(tickSpeed));
    });

    return {
      tickSpeed,
      speed,
      changeView,
      changeBoardSize
    };
  }
});
</script>

<style lang="scss">
.settings {
  width: 100%;
  height: 100%;
  background-color: black;
  overflow: auto;

  h2 {
    margin: 0;
    padding: 15px;
  }

  .button-container {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin: auto;

    button {
      background-color: rgba(255, 255, 255, 0.7);
      border-radius: 5px;
      font-weight: bold;
      outline: none;
      border: none;
      margin: 15px auto;
      width: 100%;
      padding: 10px;
      font-size: 16px;
      transition: 0.4s;
      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }

    .board-size-modifier-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        height: 40px;
        width: 25%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        font-weight: bold;
      }
    }

    .speed-modifier-container {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      button {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        font-weight: bold;
        padding: 0;
      }

      p {
        width: 25px;
      }
    }
  }
}
</style>
