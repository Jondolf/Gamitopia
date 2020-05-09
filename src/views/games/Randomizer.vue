<template>
  <div class="randomizer">
    <h2>Randomizer</h2>
    <div class="game-container" ref="gameContainer">
      <keep-alive>
        <WhatToRandomizeMenu
          v-if="isWhatToRandomizeMenuOpen"
          @changeOption="changeOption"
          @closeWhatToRandomizeMenu="isWhatToRandomizeMenuOpen = false"
        ></WhatToRandomizeMenu>
      </keep-alive>

      <div class="top-container">
        <button
          v-on:click="isWhatToRandomizeMenuOpen = !isWhatToRandomizeMenuOpen"
          class="open-what-to-randomize-menu-button"
        >
          <i class="material-icons">menu</i>
        </button>
        <h2>{{ whatToRandomize }}</h2>
        <button
          v-on:click="toggleFullscreen()"
          class="toggle-fullscreen-button"
        >
          <i class="material-icons">{{ fullscreenIconName }}</i>
        </button>
      </div>

      <RandomizeContent :whatToRandomize="whatToRandomize"></RandomizeContent>
    </div>

    <div class="description">
      <div class="mainDescription">
        <h3>Description</h3>
        <p>
          Press the button in the bottom to randomize. Click the menu button to
          open a small list of things to randomize. Click on a list item and
          press the randomizer button to randomize.
          <br />
          <br />Number Range: Get a random number from 0 to 10 (with default
          settings). You can move the slider below the randomizer button to
          change the range of numbers to randomize, for example 0 to 100 or 0 to
          255.
          <br />
          <br />Heads or Tails: Get either heads or tails. This could be useful
          if you have to decide between two things. For example, should I eat
          pizza or lasagna? Heads or tails?
          <br />
          <br />Roll Dice: Get a random number (shown on the dice) between 1 and
          6. This could be useful, for example, if you want to play board games
          but don't have a dice with you.
        </p>
      </div>
      <div class="otherDescription">
        <div class="madeWith">
          <h3>Made with:</h3>
          <ul>
            <li>Vue.js</li>
            <li>
              <ul>
                <li>HTML</li>
                <li>SCSS</li>
                <li>TypeScript</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="otherInfo">
          <h3>Other Info</h3>
          <p>Dark mode support: no</p>
          <br />
          <p>Fullscreen support: yes</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import RandomizeContent from '@/components/games/randomizer/RandomizeContent.vue';
import WhatToRandomizeMenu from '@/components/games/randomizer/WhatToRandomizeMenu.vue';
export default Vue.extend({
  name: 'Randomizer',

  components: {
    RandomizeContent,
    WhatToRandomizeMenu
  },

  data() {
    return {
      whatToRandomize: 'Number range',
      isFullscreen: false,
      fullscreenIconName: 'fullscreen',
      isWhatToRandomizeMenuOpen: false
    };
  },

  methods: {
    changeOption(optionName: string) {
      this.whatToRandomize = optionName;
    },

    toggleFullscreen() {
      this.isFullscreen = !this.isFullscreen;
      const gameContainer = this.$refs.gameContainer as HTMLElement;
      if (this.isFullscreen) {
        gameContainer.className = 'fullscreen-game-container';
        this.fullscreenIconName = 'fullscreen_exit';
        document.body.style.overflow = 'hidden';
      } else {
        gameContainer.className = 'game-container';
        this.fullscreenIconName = 'fullscreen';
        document.body.style.overflow = 'auto';
      }
    }
  }
});
</script>

<style lang="scss" scoped>
@import '@/global.scss';
@keyframes animategradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@media only screen and (max-width: 500px) {
  .randomizer .game-container .top-container h2,
  .randomizer .fullscreen-game-container .top-container h2 {
    display: none;
  }
}

.dark.default-dark .randomizer h2 {
  color: white;
}

.randomizer {
  padding-top: 66px;

  h2 {
    margin: 30px;
    color: black;
  }

  img {
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
  }

  .game-container {
    text-align: left;
    border: 1px solid black;
    border-radius: 5px;
    width: 70%;
    height: 80vh;
    margin: 30px auto;
    padding: 0;
    touch-action: manipulation;
    font-family: Nunito;
    background: linear-gradient(
      -45deg,
      #124cca,
      #e7623a,
      #a83ae7,
      #124cca,
      #1296ca,
      #1bbb78,
      #1296ca,
      #124cca
    ); // linear-gradient(135deg, #ffa55c, #1099bb, #2c2e83);
    color: white;
    background-size: 900% 900%;
    animation: animategradient 90s infinite;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    h2 {
      color: white;
    }
  }

  .fullscreen-game-container {
    position: fixed;
    z-index: 15;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 0;
    text-align: left;
    padding: 0;
    touch-action: manipulation;
    font-family: Nunito;
    background: linear-gradient(
      -45deg,
      #124cca,
      #e7623a,
      #a83ae7,
      #124cca,
      #1296ca,
      #1bbb78,
      #1296ca,
      #124cca
    ); // linear-gradient(135deg, #ffa55c, #1099bb, #2c2e83);
    background-size: 900% 900%;
    animation: animategradient 90s infinite;
    cursor: default;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: white;
    .top-container {
      z-index: 16;
    }
    h2 {
      color: white;
    }
  }

  .top-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    z-index: 5;
    height: 70px;
    h2 {
      margin: 0;
      width: 100%;
      text-align: center;
    }
    button {
      background: transparent;
      outline: none;
      border: none;
      position: absolute;
      top: 15px;
      width: 45px;
      height: 45px;
      border-radius: 5px;
      transition: 0.4s ease-out;
      display: flex;
      justify-content: center;
      align-items: center;
      &:hover {
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.25);
      }
      &:first-child {
        left: 15px;
      }
      &:last-child {
        right: 15px;
      }
      i {
        font-weight: bold;
        font-size: 40px;
      }
    }
  }

  .dice-img-hide {
    display: none;
  }

  .dice-img-show {
    display: flex;
  }

  #randomizer-container h2 {
    left: -50%;
    position: relative;
    text-align: center;
    margin: auto;
    color: white;
    width: 100%;
  }

  #what-to-randomize-menu-container {
    display: none;
    position: absolute;
    padding: 15px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    width: 30%;
    background-color: rgba(255, 255, 255, 0.5);
    font-weight: lighter;
    color: #505050;
    box-sizing: border-box;
    margin-top: 15%;
  }

  #what-to-randomize-menu-container:hover {
    cursor: default;
  }

  #what-to-randomize-menu-container ul li {
    list-style: none;
  }

  .result {
    width: 60%;
    height: 330px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 100px;
  }

  .result:hover {
    cursor: default;
  }

  .result img {
    width: 20%;
    border: 3px solid black;
    border-radius: 15%;
  }

  #randomizer-settings {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    height: 40px;
    margin: 0 auto 10px auto;
    width: 100%;
  }

  #slider,
  #slider:focus {
    -webkit-appearance: none;
    width: 50%;
    height: 10px;
    opacity: 0.5;
    border-radius: 10px;
    outline: none;
  }

  #slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 25px;
    height: 25px;
    background: rgb(16, 34, 133);
    cursor: pointer;
    border-radius: 50%;
  }

  #slider-value {
    color: white;
  }

  .randomizer-button-container {
    text-align: center;
    margin-bottom: 30px;
  }

  #randomizer-button {
    width: 30%;
    border: none;
    margin: auto;
    padding: 10px;
    border-radius: 8px;
    font-size: 17px;
    font-family: Nunito;
    background-color: rgba(255, 255, 255, 0.5);
  }

  #randomizer-button,
  #randomizer-button:focus,
  #randomizer-button:active {
    outline: none;
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
}

@media only screen and (max-width: 850px) {
  #randomizer-container .header-container {
    font-size: 13px;
    margin-top: 20px;
  }
  .top-img-container img {
    width: 30px;
    height: 30px;
    margin: 20px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 14px;
  }
  .result {
    font-size: 70px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 22px;
    margin-bottom: 25px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 35px;
    height: 35px;
    margin: 25px;
  }
  .fullscreen-randomizer .result {
    font-size: 90px;
  }
}

@media only screen and (max-width: 675px) {
  .header-container {
    font-size: 12px;
  }
  .top-img-container img {
    width: 25px;
    height: 25px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 12px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 28px;
    margin-bottom: 22px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 35px;
    height: 35px;
    margin: 22px;
  }
  .fullscreen-randomizer .result {
    font-size: 85px;
  }
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
  #randomizer-container .header-container {
    font-size: 12px;
    margin-top: 18px;
  }
  .top-img-container img {
    margin: 18px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 11px;
  }
  .result {
    font-size: 65px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 18px;
    margin-bottom: 20px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 30px;
    height: 30px;
    margin: 20px;
  }
  .fullscreen-randomizer .result {
    font-size: 80px;
  }
}

@media only screen and (max-width: 550px) {
  #randomizer-container .header-container {
    font-size: 10px;
    margin-top: 18px;
  }
  .top-img-container img {
    width: 23px;
    height: 23px;
    margin: 18px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 12px;
    border-radius: 0;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 12px;
  }
  .result {
    font-size: 55px;
    height: 250px;
  }
}

@media only screen and (max-width: 500px) {
  #randomizer-container .header-container {
    font-size: 9px;
    margin-top: 16px;
  }
  .top-img-container img {
    width: 20px;
    height: 20px;
    margin: 16px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 11px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 11px;
  }
  .result {
    font-size: 50px;
    height: 225px;
  }
  #randomizer-button {
    font-size: 15px;
    padding: 6px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 16px;
    margin-bottom: 18px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 28px;
    height: 28px;
    margin: 18px;
  }
  .fullscreen-randomizer .result {
    font-size: 75px;
  }
}

@media only screen and (max-width: 440px) {
  #randomizer-container .header-container {
    font-size: 8px;
    margin-top: 10px;
  }
  .top-img-container img {
    width: 18px;
    height: 18px;
    margin: 8px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 10px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 10px;
  }
  .result {
    font-size: 45px;
    height: 220px;
  }
  #randomizer-button {
    font-size: 12px;
    padding: 5px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 14px;
    margin-top: 18px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 28px;
    height: 28px;
    margin: 18px;
  }
  .fullscreen-randomizer .result {
    font-size: 75px;
  }
}

@media only screen and (max-width: 360px) {
  #randomizer-container .header-container {
    font-size: 7px;
    margin-top: 6px;
  }
  .top-img-container img {
    width: 16px;
    height: 16px;
    margin: 6px;
  }
  #what-to-randomize-menu-container {
    width: 100%;
    padding: 8px;
  }
  #what-to-randomize-menu-container ul li {
    font-size: 10px;
  }
  .result {
    font-size: 30px;
    height: 200px;
  }
  #randomizer-button {
    font-size: 10px;
    padding: 5px;
  }
  .fullscreen-randomizer .header-container h2 {
    font-size: 12px;
    margin-bottom: 16px;
  }
  .fullscreen-randomizer .top-img-container img {
    width: 26px;
    height: 26px;
    margin: 16px;
  }
  .fullscreen-randomizer .result {
    font-size: 70px;
  }
}
</style>
