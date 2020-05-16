<template>
  <div id="snake">
    <h2>Snake</h2>
    <div class="game-container" ref="gameContainer">
      <StartMenu
        v-if="currentView === 'Start menu'"
        @gameArea="currentView = 'Game area'"
        @statistics="currentView = 'Statistics'"
        @settings="currentView = 'Settings'"
      />
      <GameArea
        v-if="currentView === 'Game area'"
        :resetGame="resetGame"
        @startMenu="currentView = 'Start menu'"
        @toggleResetGame="resetGame = false"
      />
      <Statistics
        v-if="currentView === 'Statistics'"
        @startMenu="currentView = 'Start menu'"
      />
      <Settings
        v-if="currentView === 'Settings'"
        @startMenu="currentView = 'Start menu'"
        @toggleFullscreen="fullscreenOn = !fullscreenOn"
        @smallBoard="changeBoardSize"
        @mediumBoard="changeBoardSize"
        @largeBoard="changeBoardSize"
      />
    </div>
    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Snake is a game where you move a snake up, down, left or right and try
          to gather as many fruit as you can whilst trying to avoid hitting
          walls or slithering into your own tail. As you get more fruit, your
          tail grows longer making it more and more difficult to get around
          without hitting your own tail.
          <br />
          Your goal is to get as many fruit as you can. If you hit a wall or
          your own tail, the snake dies and you will have to try again.
          <br />
          <br />
          In the settings of the game you can change the size of the board/game
          area, the speed of your snake, turn on fullscreen and more.
          <br />
          <br />The game works with a keyboard (WASD or arrow keys) or with a
          touch screen (swipe to change direction).
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
          <p>Fullscreen support: yes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import StartMenu from '@/components/games/snake/StartMenu.vue';
import GameArea from '@/components/games/snake/GameArea.vue';
import Statistics from '@/components/games/snake/Statistics.vue';
import Settings from '@/components/games/snake/Settings.vue';
import { Game } from '@/components/games/snake/gameLogic';

export default Vue.extend({
  name: 'snake',
  components: {
    StartMenu,
    GameArea,
    Statistics,
    Settings
  },
  data() {
    return {
      currentView: 'Start menu',
      fullscreenOn: false,
      resetGame: false,
      game: new Game(
        {
          board: [
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
          wallColor: 'white',
          boardColor: 'black'
        },
        false,
        0,
        0,
        500,
        0,
        0,
        false,
        null as ((ev: KeyboardEvent) => void) | null
      )
    };
  },
  methods: {
    changeBoardSize(boardSize: string[], squareSize: number) {
      this.game.gameBoard.board = boardSize;
      this.game.graphics.squareSize = squareSize;
      this.resetGame = !this.resetGame;
    }
  },
  created() {
    if (localStorage.getItem('snakeSpeed')) {
      this.game.tickSpeed = +localStorage.getItem('snakeSpeed')!!;
    }
  },
  watch: {
    fullscreenOn: function() {
      const gameContainer = this.$refs.gameContainer as HTMLElement;
      if (this.fullscreenOn) {
        gameContainer.classList.add('fullscreen');
        gameContainer.classList.remove('game-container');
        document.body.style.overflow = 'hidden';
      } else if (!this.fullscreenOn) {
        gameContainer.classList.add('game-container');
        gameContainer.classList.remove('fullscreen');
        document.body.style.overflow = 'auto';
      }
    },
    currentView() {
      if (this.currentView !== 'Game area') {
        this.game.pauseGame();
      } else {
        //this.game.tick();
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
#snake {
  padding-top: 66px;
}

.dark.default-dark #snake h2 {
  color: white;
}

h2 {
  margin: 30px;
  color: black;
}

.game-container button,
.fullscreen button {
  color: black;
}

.fullscreen {
  background-color: black;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 50;
  margin: auto;
  border: none;
  border-radius: 0;
  padding: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  overflow: hidden;
  color: white;
}

.game-container {
  width: 400px;
  height: 450px;
  margin: auto;
  border-radius: 5px;
  border: 2px solid black;
  overflow: hidden;
  background-color: black;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  touch-action: manipulation;
  color: white;
}

.dark.default-dark .game-container {
  border: 2px solid white;
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
@media only screen and (max-width: 550px) {
  .game-container {
    width: 350px;
    height: 400px;
  }
}
@media only screen and (max-width: 400px) {
  .game-container {
    width: 250px;
    height: 300px;
  }
}
</style>
