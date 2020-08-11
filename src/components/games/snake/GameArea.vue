<template>
  <div
    class="game-area"
    ref="gameArea"
    v-hammer:swipe.horizontal.vertical="(e) => changeDirection(e)"
  >
    <div class="game-area-container">
      <TopBar
        @go-back="$emit('go-back')"
        @reset-game="
          gameArea && canvas && ctx ? game.resetGame(gameArea, canvas, ctx) : ''
        "
        :score="game.score"
        :timesMoved="game.timesMoved"
      />
      <div class="canvas-container">
        <p v-if="game.paused">Paused (Press P or move to continue)</p>
        <canvas width="450" height="450" ref="canvas" tabindex="1"> </canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import TopBar from './TopBar.vue';
import { Game } from './gameLogic';

export default defineComponent({
  name: 'GameArea',

  components: {
    TopBar
  },

  props: {
    game: { type: Game, required: true },
    resetGame: Boolean
  },

  setup(props, { emit }) {
    const gameArea = ref<HTMLElement>(null!);
    const canvas = ref<HTMLCanvasElement>(null!);
    const ctx = ref<CanvasRenderingContext2D>(null!);

    function changeDirection(e: Event) {
      if (canvas.value && ctx.value) {
        let direction = '';
        if (e.type === 'swipeup' && props.game.snake.facing !== 'S') {
          direction = 'N';
        } else if (e.type === 'swiperight' && props.game.snake.facing !== 'W') {
          direction = 'E';
        } else if (e.type === 'swipedown' && props.game.snake.facing !== 'N') {
          direction = 'S';
        } else if (e.type === 'swipeleft' && props.game.snake.facing !== 'E') {
          direction = 'W';
        }
        emit('change-snake-direction', direction);
        props.game.tick(canvas.value, ctx.value);
      }
    }

    onMounted(() => {
      ctx.value = canvas.value.getContext('2d')!;
      if (props.resetGame) {
        props.game.resetGame(gameArea.value, canvas.value, ctx.value!);
        emit('toggle-reset-game');
      }
      props.game.graphics.drawGame(canvas.value, ctx.value!);
      props.game.startGame(gameArea.value, canvas.value, ctx.value!);
    });

    onBeforeUnmount(() => {
      props.game.pauseGame();
    });

    return {
      gameArea,
      canvas,
      ctx,
      changeDirection
    };
  }
});
</script>

<style lang="scss">
.game-area {
  height: 100%;
  border: none;

  .game-area-container {
    width: 100%;
    height: 100%;
    margin: auto;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  canvas,
  .canvas-container {
    width: 400px;
    height: 400px;
    position: relative;

    p {
      position: absolute;
      top: 20px;
      left: 20px;
      color: white;
      z-index: 2;
    }
  }

  @media only screen and (max-width: 550px) {
    .game-area-container canvas,
    .canvas-container {
      width: 350px;
      height: 350px;
    }
  }

  @media only screen and (max-width: 400px) {
    .game-area-container canvas,
    .canvas-container {
      width: 250px;
      height: 250px;
    }
  }
}
</style>
