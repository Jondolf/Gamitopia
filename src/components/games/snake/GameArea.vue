<template>
  <div
    class="game-area"
    ref="gameArea"
    v-hammer:swipe.horizontal.vertical="(e) => changeDirection(e)"
  >
    <div class="game-area-container">
      <TopBar
        @go-back="$emit('go-back')"
        @reset-game="game.resetGame(gameArea, canvas, ctx)"
        :score="game.score"
        :timesMoved="game.timesMoved"
      />
      <div class="canvas-container">
        <p v-if="game.paused">Paused (Press P or move to continue)</p>
        <canvas width="450px" height="450px" ref="canvas" tabindex="1">
        </canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

  data() {
    return {
      gameArea: (null as unknown) as HTMLElement,
      canvas: (null as unknown) as HTMLCanvasElement,
      ctx: (null as unknown) as CanvasRenderingContext2D
    };
  },

  methods: {
    changeDirection(e: Event) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!!;
      let direction = '';
      if (e.type === 'swipeup' && this.game.snake.facing !== 'S') {
        direction = 'N';
      } else if (e.type === 'swiperight' && this.game.snake.facing !== 'W') {
        direction = 'E';
      } else if (e.type === 'swipedown' && this.game.snake.facing !== 'N') {
        direction = 'S';
      } else if (e.type === 'swipeleft' && this.game.snake.facing !== 'E') {
        direction = 'W';
      }
      this.$emit('change-snake-direction', direction);
      this.game.tick(canvas, ctx);
    }
  },

  mounted() {
    const gameArea = this.$refs.gameArea as HTMLElement;
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!!;
    this.gameArea = gameArea;
    this.canvas = canvas;
    this.ctx = ctx;
    if (this.resetGame) {
      this.game.resetGame(gameArea, canvas, ctx);
      this.$emit('toggle-reset-game');
    }
    this.game.graphics.drawGame(canvas, ctx);
    this.game.startGame(gameArea, canvas, ctx);
  },

  beforeUnmount() {
    this.game.pauseGame();
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
