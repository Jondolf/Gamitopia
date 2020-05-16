<template>
  <div
    id="gameArea"
    ref="gameArea"
    v-hammer:swipe.horizontal.vertical="(e) => changeDirection(e)"
  >
    <div class="game-area-container">
      <TopBar
        :score="game.score"
        :timesMoved="game.timesMoved"
        @startMenu="changeView('startMenu')"
        @resetGame="game.resetGame(gameArea, canvas, ctx)"
      />
      <div class="canvas-container">
        <p v-if="paused">Paused (Press P or move to continue)</p>
        <canvas
          width="450px"
          height="450px"
          id="canvas"
          ref="canvas"
          tabindex="1"
        >
        </canvas>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import TopBar from './TopBar.vue';
import { Game } from './gameLogic';

export default Vue.extend({
  name: 'GameArea',
  components: {
    TopBar
  },
  props: {
    game: Game,
    resetGame: Boolean
  },
  data() {
    return {
      gameArea: null as unknown,
      canvas: null as unknown,
      ctx: null as unknown
    };
  },
  methods: {
    changeView(view: string) {
      this.$emit(view);
    },
    changeDirection(e: any) {
      const canvas = this.$refs.canvas as HTMLCanvasElement;
      const ctx = canvas.getContext('2d')!!;
      if (e.type === 'swipeup' && this.game.snake.facing !== 'S') {
        this.game.snake.facing = 'N';
      } else if (e.type === 'swiperight' && this.game.snake.facing !== 'W') {
        this.game.snake.facing = 'E';
      } else if (e.type === 'swipedown' && this.game.snake.facing !== 'N') {
        this.game.snake.facing = 'S';
      } else if (e.type === 'swipeleft' && this.game.snake.facing !== 'E') {
        this.game.snake.facing = 'W';
      }
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
      this.$emit('toggleResetGame');
    }
    this.game.graphics.drawGame(canvas, ctx);
    this.game.startGame(gameArea, canvas, ctx);
  },

  computed: {
    paused() {
      return this.game.paused;
    }
  },

  beforeDestroy() {
    this.game.pauseGame();
  }
});
</script>

<style lang="scss">
@import '@/global.scss';
#gameArea {
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
